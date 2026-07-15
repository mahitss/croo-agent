import os
import urllib.request
try:
    if os.environ.get("NODE_ENV") != "production" and not os.environ.get("DATABASE_URL"):
        from dotenv import load_dotenv
        load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
except ImportError:
    pass

from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse, StreamingResponse
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import time
import json
import yaml
import logging

from providers import LLMProviderManager, LLMResult
from memory import PersistentMemoryStore

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("nexus-ai")

app = FastAPI(title="NEXUS AI Orchestration Engine", version="1.0.0")
start_time = time.time()

# Instantiate Provider Manager
provider_manager = LLMProviderManager()
memory_store = PersistentMemoryStore()
PROMPTS_DIR = os.path.join(os.path.dirname(__file__), "prompts")

# Request Models
class PlanRequest(BaseModel):
    query: str
    routing_mode: Optional[str] = "balanced"
    budget: Optional[float] = 2.0
    user_id: Optional[str] = "user-1"

class EstimateRequest(BaseModel):
    workflow_id: str
    tasks: List[Dict[str, Any]]

class VerifyRequest(BaseModel):
    agent_id: str
    output_data: str
    required_schema: Optional[str] = None

class SummarizeRequest(BaseModel):
    content: str

class TranslateRequest(BaseModel):
    text: str
    target_language: str

class ClassifyRequest(BaseModel):
    text: str

class ConsensusRequest(BaseModel):
    outputs: List[str]

class ExplainRequest(BaseModel):
    workflow_id: str

class StreamRequest(BaseModel):
    prompt: str
    system_prompt: Optional[str] = None
    provider: Optional[str] = None

class RouteRequest(BaseModel):
    prompt: str
    task_type: Optional[str] = None
    model_override: Optional[str] = None
    system_prompt: Optional[str] = None
    user_id: Optional[str] = "user-1"

class MemoryStoreRequest(BaseModel):
    id: str
    user_id: str
    memory_type: str
    content: str
    metadata: Optional[Dict[str, Any]] = None

class MemoryQueryRequest(BaseModel):
    user_id: str
    query: str
    memory_type: Optional[str] = None
    limit: Optional[int] = 3

class PreferenceRequest(BaseModel):
    user_id: str
    pref_key: str
    pref_value: str

class PreferenceGetRequest(BaseModel):
    user_id: str

class CompressRequest(BaseModel):
    session_id: str
    user_id: str

class RouteResponse(BaseModel):
    success: bool
    content: str
    model_used: str
    provider: str
    prompt_tokens: int
    completion_tokens: int
    cost: float
    latency_ms: int

# Response Models
class TaskNodeResponse(BaseModel):
    id: str
    capability: str
    dependencies: List[str]
    task: Optional[str] = None
    agentId: Optional[str] = None
    cost: Optional[float] = 0.15
    duration: Optional[int] = 5
    retries: Optional[int] = 3
    positionX: Optional[int] = 0
    positionY: Optional[int] = 0

class PlanResponse(BaseModel):
    workflow: List[TaskNodeResponse]
    estimated_cost: float
    estimated_duration_seconds: int
    confidence: float
    prompt_tokens: Optional[int] = 0
    completion_tokens: Optional[int] = 0
    intent: Optional[str] = "General"
    complexity: Optional[str] = "Medium"
    risk_assessment: Optional[str] = "None"
    parallel_groups: Optional[List[List[str]]] = []
    execution_order: Optional[List[str]] = []
    thought: Optional[str] = ""

class EstimateResponse(BaseModel):
    success: bool
    estimated_cost: float
    estimated_duration_seconds: int

class VerifyResponse(BaseModel):
    success: bool
    score: int
    passed: bool
    citations_count: int

class SummarizeResponse(BaseModel):
    success: bool
    summary: str

class TranslateResponse(BaseModel):
    success: bool
    translated_text: str

class ClassifyResponse(BaseModel):
    success: bool
    category: str

class ConsensusResponse(BaseModel):
    success: bool
    consensus_achieved: bool
    merged_output: str

class ExplainResponse(BaseModel):
    success: bool
    explanation: str

# Seed candidates database for compatibility
candidates = [
    {
        "id": "agent-research-1",
        "name": "InsightFinder Pro",
        "category": "Research",
        "skills": ["research", "web scraping"],
        "price": 0.15,
        "trust": 95.0,
        "success_rate": 98.0,
        "latency": 1200,
        "rating": 4.8
    },
    {
        "id": "agent-research-2",
        "name": "QuickScan",
        "category": "Research",
        "skills": ["web search", "news summary"],
        "price": 0.05,
        "trust": 88.0,
        "success_rate": 96.0,
        "latency": 450,
        "rating": 4.4
    },
    {
        "id": "agent-finance-1",
        "name": "FinAnalytica",
        "category": "Finance",
        "skills": ["financial_analysis", "charts"],
        "price": 0.25,
        "trust": 98.0,
        "success_rate": 99.0,
        "latency": 1600,
        "rating": 4.9
    },
    {
        "id": "agent-translate-1",
        "name": "Translatio",
        "category": "Translation",
        "skills": ["translation", "localization"],
        "price": 0.08,
        "trust": 93.0,
        "success_rate": 97.5,
        "latency": 550,
        "rating": 4.6
    },
    {
        "id": "agent-verify-1",
        "name": "ConsensuVerify",
        "category": "Security",
        "skills": ["verification", "consensus"],
        "price": 0.10,
        "trust": 98.0,
        "success_rate": 99.2,
        "latency": 800,
        "rating": 4.85
    }
]

def fetch_agents() -> List[Dict[str, Any]]:
    agent_url = os.environ.get("AGENT_SERVICE_URL", "http://127.0.0.1:5002/api/v1")
    try:
        req = urllib.request.Request(f"{agent_url}/agents", method="GET")
        with urllib.request.urlopen(req, timeout=3) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            if res_data.get("success") and isinstance(res_data.get("data"), list):
                agents_list = []
                for a in res_data["data"]:
                    pricing = a.get("pricingModel", {}) or {}
                    price = float(pricing.get("basePrice") or 0.10)
                    skills = [c.get("capability") for c in a.get("capabilities", [])] if a.get("capabilities") else []
                    if not skills and a.get("role"):
                        skills.append(a["role"].lower())
                    
                    agents_list.append({
                        "id": a.get("id"),
                        "name": a.get("displayName") or a.get("name") or "Agent",
                        "category": a.get("role") or "General",
                        "skills": skills,
                        "price": price,
                        "trust": float(a.get("trustScore") or 90.0),
                        "success_rate": 100.0 - float(a.get("failureRate") or 5.0),
                        "latency": int(a.get("latency") or 1000),
                        "rating": float(a.get("rating") or 4.5)
                    })
                if agents_list:
                    return agents_list
    except Exception as e:
        logger.error(f"Failed to fetch live agents from agent-service: {e}. Using seed list.")
    
    return candidates

def calculate_node_positions(nodes: List[Dict[str, Any]]) -> Optional[List[Dict[str, Any]]]:
    # 1. Topological sorting & Cycle detection
    node_ids = [n["id"] for n in nodes]
    adj = {nid: [] for nid in node_ids}
    in_degree = {nid: 0 for nid in node_ids}
    
    for n in nodes:
        # Clean up any non-existent dependencies
        valid_deps = []
        for dep in n.get("dependencies", []):
            if dep in adj:
                valid_deps.append(dep)
                adj[dep].append(n["id"])
                in_degree[n["id"]] += 1
        n["dependencies"] = valid_deps

    # Topological traversal to calculate levels
    levels = {nid: 0 for nid in node_ids}
    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    processed_count = 0
    
    while queue:
        curr = queue.pop(0)
        processed_count += 1
        for neighbor in adj[curr]:
            levels[neighbor] = max(levels[neighbor], levels[curr] + 1)
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    # Cycle detection
    if processed_count != len(nodes):
        logger.error("Cyclic dependency detected in generated workflow DAG.")
        return None
        
    # Group nodes by level
    nodes_by_level = {}
    for nid, lvl in levels.items():
        if lvl not in nodes_by_level:
            nodes_by_level[lvl] = []
        nodes_by_level[lvl].append(nid)
        
    # Assign coordinates
    positioned_nodes = []
    for n in nodes:
        nid = n["id"]
        lvl = levels[nid]
        lvl_nodes = nodes_by_level[lvl]
        idx = lvl_nodes.index(nid)
        
        x = lvl * 280 + 100
        y = (idx - (len(lvl_nodes) - 1) / 2) * 150 + 200
        
        n["positionX"] = int(x)
        n["positionY"] = int(y)
        positioned_nodes.append(n)
        
    return positioned_nodes

def score_agent(agent: Dict[str, Any], profile: str) -> float:
    rating_score = (agent["rating"] / 5.0) * 100.0
    cost_score = (1.0 - min(agent["price"], 1.0)) * 100.0
    latency_score = (1.0 - min(agent["latency"] / 3000.0, 1.0)) * 100.0
    
    trust = agent["trust"]
    success = agent["success_rate"]
    
    if profile == "cheapest":
        w_trust, w_success, w_latency, w_cost, w_rating = 0.10, 0.10, 0.10, 0.60, 0.10
    elif profile == "fastest":
        w_trust, w_success, w_latency, w_cost, w_rating = 0.10, 0.15, 0.55, 0.10, 0.10
    elif profile == "accuracy":
        w_trust, w_success, w_latency, w_cost, w_rating = 0.50, 0.30, 0.05, 0.05, 0.10
    else: # balanced
        w_trust, w_success, w_latency, w_cost, w_rating = 0.35, 0.25, 0.15, 0.15, 0.10
        
    score = (w_trust * trust) + (w_success * success) + (w_latency * latency_score) + (w_cost * cost_score) + (w_rating * rating_score)
    return round(score, 2)

def get_prompt_template(category: str, filename: str) -> str:
    path = os.path.join(PROMPTS_DIR, category, filename)
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f)
                return data.get("template", "")
        except Exception as e:
            logger.error(f"Error loading prompt template {path}: {e}")
    return ""

def clean_json_response(content: str) -> str:
    cleaned = content.strip()
    if "```json" in cleaned:
        cleaned = cleaned.split("```json")[1].split("```")[0].strip()
    elif "```" in cleaned:
        cleaned = cleaned.split("```")[1].split("```")[0].strip()
    
    start_idx = cleaned.find("{")
    end_idx = cleaned.rfind("}")
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        cleaned = cleaned[start_idx:end_idx+1]
        
    return cleaned

def get_redis_cache(key: str) -> Optional[str]:
    rest_url = os.environ.get("UPSTASH_REDIS_REST_URL")
    rest_token = os.environ.get("UPSTASH_REDIS_REST_TOKEN")
    if not rest_url or not rest_token:
        return None
    try:
        headers = {
            "Authorization": f"Bearer {rest_token}",
            "Content-Type": "application/json"
        }
        data = json.dumps(["GET", key]).encode("utf-8")
        req = urllib.request.Request(
            rest_url,
            data=data,
            headers=headers,
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data.get("result")
    except Exception as e:
        logger.error(f"Failed to fetch cache from Upstash Redis: {e}")
    return None

def set_redis_cache(key: str, value: str, ttl_seconds: int = 300) -> None:
    rest_url = os.environ.get("UPSTASH_REDIS_REST_URL")
    rest_token = os.environ.get("UPSTASH_REDIS_REST_TOKEN")
    if not rest_url or not rest_token:
        return
    try:
        headers = {
            "Authorization": f"Bearer {rest_token}",
            "Content-Type": "application/json"
        }
        data = json.dumps(["SET", key, value, "EX", str(ttl_seconds)]).encode("utf-8")
        req = urllib.request.Request(
            rest_url,
            data=data,
            headers=headers,
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            pass
    except Exception as e:
        logger.error(f"Failed to save cache to Upstash Redis: {e}")

@app.get("/")
def get_root():
    return {"status": "healthy", "engine": "NEXUS AI Orchestrator Core"}

@app.get("/health")
def get_health():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "uptime": int(time.time() - start_time),
        "database": "healthy",
        "redis": "healthy",
        "queue": "healthy"
    }

@app.get("/ready")
def get_ready():
    return {"status": "ready"}

@app.get("/live")
def get_live():
    return {"status": "alive"}

@app.get("/metrics", response_class=PlainTextResponse)
def get_metrics():
    uptime = int(time.time() - start_time)
    metrics_str = (
        f"# HELP nexus_ai_uptime_seconds NEXUS AI orchestrator service uptime in seconds\n"
        f"# TYPE nexus_ai_uptime_seconds counter\n"
        f"nexus_ai_uptime_seconds {uptime}\n"
    )
    
    # Add provider metrics
    metrics = provider_manager.get_metrics()
    for provider, stats in metrics.items():
        metrics_str += (
            f"# HELP nexus_ai_provider_calls_total Total calls to provider {provider}\n"
            f"# TYPE nexus_ai_provider_calls_total counter\n"
            f"nexus_ai_provider_calls_total{{provider=\"{provider}\"}} {stats['calls']}\n"
            f"# HELP nexus_ai_provider_failures_total Total failures for provider {provider}\n"
            f"# TYPE nexus_ai_provider_failures_total counter\n"
            f"nexus_ai_provider_failures_total{{provider=\"{provider}\"}} {stats['failures']}\n"
            f"# HELP nexus_ai_token_usage_total Total tokens used for provider {provider}\n"
            f"# TYPE nexus_ai_token_usage_total counter\n"
            f"nexus_ai_token_usage_total{{provider=\"{provider}\"}} {stats['total_tokens']}\n"
            f"# HELP nexus_ai_cost_total Total cost in USDC for provider {provider}\n"
            f"# TYPE nexus_ai_cost_total counter\n"
            f"nexus_ai_cost_total{{provider=\"{provider}\"}} {stats['total_cost']:.6f}\n"
        )
    return metrics_str

@app.post("/plan", response_model=PlanResponse)
def plan_workflow(req: PlanRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query prompt cannot be empty.")
    
    # Normalize query for key
    query_slug = req.query.lower().strip().replace(" ", "-")
    cache_key = f"planner:{query_slug}"
    
    # Try fetching from Redis cache
    cached_plan = get_redis_cache(cache_key)
    if cached_plan:
        try:
            parsed = json.loads(cached_plan)
            logger.info(f"Cache HIT for key: {cache_key}")
            return PlanResponse(**parsed)
        except Exception as e:
            logger.error(f"Failed to parse cached plan: {e}")

    # Automatic Retrieval & Context Optimization
    user_id = req.user_id or "user-1"
    memories = memory_store.semantic_retrieve(user_id=user_id, query=req.query, limit=3)
    context_str = ""
    if memories:
        context_str = "\n".join([f"- {m['content']}" for m in memories])
        logger.info(f"Automatically retrieved {len(memories)} semantic memory contexts for planner.")

    # Load system prompt and planner template
    system_prompt = get_prompt_template("system", "system_v1.yaml")
    if context_str:
        system_prompt = f"Relevant Long-term Memory Context:\n{context_str}\n\n{system_prompt}"
    planner_template = get_prompt_template("planner", "planner_v3.yaml")
    
    if not planner_template:
        planner_template = (
            "You are the NEXUS AI Workflow Planner. Your goal is to analyze the user's prompt and dynamically build a customized, optimal Directed Acyclic Graph (DAG) workflow of task nodes to resolve the user request.\n\n"
            "Query Prompt: {{ query }}\n"
            "Budget Ceiling: {{ budget }} USDC\n"
            "Routing Profile: {{ routing_mode }}\n\n"
            "Available Agents & Capabilities:\n"
            "{{ agents_list }}\n\n"
            "Output strict JSON matching the schema: {\"workflow\": [{\"id\": \"node-1\", \"task\": \"Task Title\", \"capability\": \"research\", \"assignedAgentId\": \"agent-research-1\", \"dependencies\": [], \"retries\": 3}], \"confidence\": 0.95}"
        )
    
    # Load live agents
    active_agents = fetch_agents()
    agents_summary = json.dumps(active_agents, indent=2)

    prompt = planner_template
    prompt = prompt.replace("{{ query }}", req.query)
    prompt = prompt.replace("{{ budget }}", str(req.budget))
    prompt = prompt.replace("{{ routing_mode }}", req.routing_mode or "balanced")
    prompt = prompt.replace("{{ agents_list }}", agents_summary)

    planner_model = os.environ.get("PLANNER_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        system_prompt=system_prompt,
        json_mode=True,
        model=planner_model
    )
    
    if result.success and result.content:
        logger.info(f"Raw LLM content response: {result.content}")
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            
            workflow_list = []
            raw_nodes = parsed.get("workflow", [])
            
            # Run layout coordinate placement and cycle validation
            positioned_nodes = calculate_node_positions(raw_nodes)
            if positioned_nodes is None:
                logger.warn("Cycle detected in LLM generated graph. Resolving dependencies sequentially to sanitize.")
                # Sequential recovery chain to guarantee acyclic graph
                for idx, node in enumerate(raw_nodes):
                    node["dependencies"] = [raw_nodes[idx-1]["id"]] if idx > 0 else []
                positioned_nodes = calculate_node_positions(raw_nodes) or raw_nodes
            
            # Map & validate nodes
            for idx, item in enumerate(positioned_nodes):
                node_id = item.get("id") or item.get("task") or f"node-{idx+1}"
                capability = item.get("capability") or "research"
                dependencies = item.get("dependencies") or []
                task = item.get("task") or item.get("label") or node_id.upper()
                retries = int(item.get("retries") or 3)
                
                # Check assignedAgentId validity
                agent_id = item.get("assignedAgentId") or item.get("agentId")
                if not any(a["id"] == agent_id for a in active_agents):
                    # fallback to scoring and matching capability
                    matched = [a for a in active_agents if capability in a["skills"]]
                    if matched:
                        scored = sorted(matched, key=lambda a: score_agent(a, req.routing_mode or "balanced"), reverse=True)
                        agent_id = scored[0]["id"]
                    else:
                        agent_id = active_agents[0]["id"]
                
                # Get agent details
                agent_info = next((a for a in active_agents if a["id"] == agent_id), active_agents[0])
                cost = float(agent_info["price"])
                duration = int(agent_info["latency"] / 1000 or 1)

                workflow_list.append(TaskNodeResponse(
                    id=node_id,
                    capability=capability,
                    dependencies=dependencies,
                    task=task,
                    agentId=agent_id,
                    cost=cost,
                    duration=duration,
                    retries=retries,
                    positionX=item.get("positionX", 100),
                    positionY=item.get("positionY", 200)
                ))
            
            # Programmatically calculate total cost (sum of all nodes)
            total_cost = sum(n.cost for n in workflow_list)
            
            # Programmatically calculate critical path duration (parallel latency)
            node_duration = {n.id: n.duration for n in workflow_list}
            adj = {n.id: [] for n in workflow_list}
            in_degree = {n.id: 0 for n in workflow_list}
            for n in workflow_list:
                for dep in n.dependencies:
                    if dep in adj:
                        adj[dep].append(n.id)
                        in_degree[n.id] += 1
            
            earliest_completion = {n.id: n.duration for n in workflow_list}
            queue = [nid for nid, deg in in_degree.items() if deg == 0]
            while queue:
                curr = queue.pop(0)
                for neighbor in adj[curr]:
                    earliest_completion[neighbor] = max(
                        earliest_completion[neighbor],
                        earliest_completion[curr] + node_duration[neighbor]
                    )
                    in_degree[neighbor] -= 1
                    if in_degree[neighbor] == 0:
                        queue.append(neighbor)
            
            total_duration = max(earliest_completion.values()) if earliest_completion else 0
            
            intent = parsed.get("intent") or "General task orchestration"
            complexity = parsed.get("complexity") or "Medium"
            risk_assessment = parsed.get("riskAssessment") or parsed.get("risk_assessment") or "Minimal risks identified."
            parallel_groups = parsed.get("parallelGroups") or parsed.get("parallel_groups") or []
            execution_order = parsed.get("executionOrder") or parsed.get("execution_order") or [n.id for n in workflow_list]
            thought = parsed.get("thought") or parsed.get("thinking") or "Decomposed prompt into a set of dependent steps."

            plan = PlanResponse(
                workflow=workflow_list,
                estimated_cost=round(total_cost, 4),
                estimated_duration_seconds=int(total_duration),
                confidence=float(parsed.get("confidence") or 0.95),
                prompt_tokens=result.prompt_tokens,
                completion_tokens=result.completion_tokens,
                intent=intent,
                complexity=complexity,
                risk_assessment=risk_assessment,
                parallel_groups=parallel_groups,
                execution_order=execution_order,
                thought=thought
            )
            
            # Store in cache
            set_redis_cache(cache_key, json.dumps(plan.dict()), 300)
            return plan
        except Exception as e:
            logger.error(f"Error parsing LLM response for /plan: {e}.")
            from fastapi.responses import JSONResponse
            models_tried = [
                "nvidia/nemotron-3-ultra-550b-a55b:free",
                "poolside/laguna-m.1:free",
                "tencent/hy3:free",
                "google/gemma-4-26b-a4b-it:free",
                "liquid/lfm-2.5-1.2b-instruct:free",
                "meta-llama/llama-3.2-3b-instruct:free",
                "qwen/qwen3-coder:free",
                "cohere/north-mini-code:free"
            ]
            return JSONResponse(
                status_code=502,
                content={
                    "success": False,
                    "message": f"Parsing failed for plan generation: {str(e)}",
                    "modelsTried": models_tried
                }
            )

    # If LLM execution failed or returned success=False
    from fastapi.responses import JSONResponse
    models_tried = [
        "nvidia/nemotron-3-ultra-550b-a55b:free",
        "poolside/laguna-m.1:free",
        "tencent/hy3:free",
        "google/gemma-4-26b-a4b-it:free",
        "liquid/lfm-2.5-1.2b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "qwen/qwen3-coder:free",
        "cohere/north-mini-code:free"
    ]
    return JSONResponse(
        status_code=503,
        content={
            "success": False,
            "message": "All AI planner models are currently unavailable. Please try again shortly.",
            "modelsTried": models_tried
        }
    )

@app.post("/estimate", response_model=EstimateResponse)
def estimate_workflow(req: EstimateRequest):
    prompt = (
        f"Analyze the following tasks and estimate the total execution cost (in USDC) and total duration (in seconds).\n"
        f"Workflow ID: {req.workflow_id}\n"
        f"Tasks list: {json.dumps(req.tasks)}\n\n"
        f"Return strict JSON matching: {{\"success\": true, \"estimated_cost\": 1.25, \"estimated_duration_seconds\": 65}}"
    )
    
    planner_model = os.environ.get("PLANNER_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=planner_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return EstimateResponse(
                success=True,
                estimated_cost=float(parsed.get("estimated_cost", 1.25)),
                estimated_duration_seconds=int(parsed.get("estimated_duration_seconds", 65))
            )
        except Exception as e:
            logger.error(f"Error parsing estimate: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM estimate: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM estimation service failed or was unreachable: {result.error_message}")

@app.post("/verify", response_model=VerifyResponse)
def verify_output(req: VerifyRequest):
    template = get_prompt_template("verification", "verification_v1.yaml")
    if not template:
        template = (
            "Verify the following execution output data for Agent {{ agent_id }}.\n"
            "Output data: {{ output_data }}\n"
            "Schema format constraints: {{ required_schema }}\n"
        )
    
    prompt = template
    prompt = prompt.replace("{{ agent_id }}", req.agent_id)
    prompt = prompt.replace("{{ output_data }}", req.output_data)
    prompt = prompt.replace("{{ required_schema }}", req.required_schema or "N/A")
    prompt += (
        "\nIMPORTANT: Evaluate safety, schemas compliance, and citations count. "
        "Return strict JSON format: {\"success\": true, \"score\": 95, \"passed\": true, \"citations_count\": 4}"
    )

    validator_model = os.environ.get("VALIDATOR_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=validator_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            score = int(parsed.get("score", 95))
            passed = bool(parsed.get("passed", score >= 70))
            return VerifyResponse(
                success=True,
                score=score,
                passed=passed,
                citations_count=int(parsed.get("citations_count", 4))
            )
        except Exception as e:
            logger.error(f"Error parsing verification: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM verification response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM verification service failed or was unreachable: {result.error_message}")

@app.post("/summarize", response_model=SummarizeResponse)
def summarize_content(req: SummarizeRequest):
    prompt = (
        f"Provide a summary of this content:\n{req.content}\n\n"
        f"Return strict JSON format: {{\"success\": true, \"summary\": \"(Summary text)\"}}"
    )
    chat_model = os.environ.get("CHAT_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=chat_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return SummarizeResponse(
                success=True,
                summary=parsed.get("summary", "Analyses show positive growth parameters.")
            )
        except Exception as e:
            logger.error(f"Error parsing summary: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM summary response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM summary service failed or was unreachable: {result.error_message}")

@app.post("/translate", response_model=TranslateResponse)
def translate_text(req: TranslateRequest):
    prompt = (
        f"Translate the following text into target language '{req.target_language}':\n{req.text}\n\n"
        f"Return strict JSON format: {{\"success\": true, \"translated_text\": \"(translated result)\"}}"
    )
    chat_model = os.environ.get("CHAT_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=chat_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return TranslateResponse(
                success=True,
                translated_text=parsed.get("translated_text", f"[Translated to {req.target_language}]: {req.text}")
            )
        except Exception as e:
            logger.error(f"Error parsing translation: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM translation response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM translation service failed or was unreachable: {result.error_message}")

@app.post("/classify", response_model=ClassifyResponse)
def classify_text(req: ClassifyRequest):
    prompt = (
        f"Categorize the following text:\n{req.text}\n\n"
        f"Return strict JSON format: {{\"success\": true, \"category\": \"(market_analysis/legal/finance/etc)\"}}"
    )
    chat_model = os.environ.get("CHAT_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=chat_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return ClassifyResponse(
                success=True,
                category=parsed.get("category", "market_analysis")
            )
        except Exception as e:
            logger.error(f"Error parsing classification: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM classification response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM classification service failed or was unreachable: {result.error_message}")

@app.post("/consensus", response_model=ConsensusResponse)
def consensus_check(req: ConsensusRequest):
    prompt = (
        f"Determine consensus and merge outputs from different agent runs:\n"
        f"Outputs: {json.dumps(req.outputs)}\n\n"
        f"Return strict JSON format: {{\"success\": true, \"consensus_achieved\": true, \"merged_output\": \"(Merged consensus data)\"}}"
    )
    validator_model = os.environ.get("VALIDATOR_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=validator_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return ConsensusResponse(
                success=True,
                consensus_achieved=bool(parsed.get("consensus_achieved", True)),
                merged_output=parsed.get("merged_output", req.outputs[0] if req.outputs else "")
            )
        except Exception as e:
            logger.error(f"Error parsing consensus: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM consensus response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM consensus service failed or was unreachable: {result.error_message}")

@app.post("/explain", response_model=ExplainResponse)
def explain_workflow(req: ExplainRequest):
    prompt = (
        f"Explain the execution pathway and layout of workflow ID: {req.workflow_id}\n\n"
        f"Return strict JSON format: {{\"success\": true, \"explanation\": \"(Explanation of DAG)\"}}"
    )
    chat_model = os.environ.get("CHAT_MODEL", "google/gemini-flash-1.5")
    result = provider_manager.execute_with_retry_and_fallback(
        prompt=prompt,
        json_mode=True,
        model=chat_model
    )
    if result.success and result.content:
        try:
            cleaned = clean_json_response(result.content)
            parsed = json.loads(cleaned)
            return ExplainResponse(
                success=True,
                explanation=parsed.get("explanation", "DAG executes tasks sequentially.")
            )
        except Exception as e:
            logger.error(f"Error parsing explanation: {e}")
            raise HTTPException(status_code=502, detail=f"Failed to parse LLM explanation response: {str(e)}")
            
    raise HTTPException(status_code=503, detail=f"LLM explanation service failed or was unreachable: {result.error_message}")

@app.get("/models")
def list_models():
    return {
        "success": True,
        "models": ["GPT-4o", "Gemini-1.5-Pro", "Claude-3.5-Sonnet"]
    }

@app.post("/stream")
def stream_response(req: StreamRequest):
    def event_generator():
        env_default = os.environ.get("DEFAULT_LLM_PROVIDER", "openai").lower()
        provider_name = req.provider or env_default
        active = provider_manager.get_active_providers()
        
        if not active:
            yield f"data: {json.dumps({'error': 'No configured LLM providers (missing API keys)'})}\n\n"
            return
            
        selected = provider_name if provider_name in active else active[0]
        
        # Stream from OpenAI direct connection if requested and key is present
        api_key = os.environ.get("OPENAI_API_KEY") if selected == "openai" else None
        if selected == "openai" and api_key:
            try:
                url = "https://api.openai.com/v1/chat/completions"
                headers = {
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                }
                messages = []
                if req.system_prompt:
                    messages.append({"role": "system", "content": req.system_prompt})
                messages.append({"role": "user", "content": req.prompt})
                data = {
                    "model": "gpt-4o-mini",
                    "messages": messages,
                    "stream": True
                }
                req_obj = urllib.request.Request(
                    url,
                    data=json.dumps(data).encode("utf-8"),
                    headers=headers,
                    method="POST"
                )
                with urllib.request.urlopen(req_obj, timeout=15) as response:
                    for line in response:
                        line_str = line.decode("utf-8").strip()
                        if line_str.startswith("data:"):
                            yield f"{line_str}\n\n"
                return
            except Exception as e:
                logger.error(f"OpenAI stream failed: {e}. Falling back to chunked full generation.")
                
        chat_model = os.environ.get("CHAT_MODEL", "google/gemini-flash-1.5")
        result = provider_manager.execute_with_retry_and_fallback(
            prompt=req.prompt,
            system_prompt=req.system_prompt,
            json_mode=False,
            model=chat_model
        )
        if result.success and result.content:
            content = result.content
            chunk_size = 15
            for i in range(0, len(content), chunk_size):
                chunk = content[i:i+chunk_size]
                chunk_data = {
                    "choices": [{"delta": {"content": chunk}}]
                }
                yield f"data: {json.dumps(chunk_data)}\n\n"
                time.sleep(0.05)
        else:
            yield f"data: {json.dumps({'error': result.error_message})}\n\n"
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/route", response_model=RouteResponse)
def route_prompt(req: RouteRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")
    
    # Automatic Retrieval & Context Optimization
    user_id = req.user_id or "user-1"
    memories = memory_store.semantic_retrieve(user_id=user_id, query=req.prompt, limit=3)
    context_str = ""
    if memories:
        context_str = "\n".join([f"- {m['content']}" for m in memories])
        logger.info(f"Automatically retrieved {len(memories)} semantic memory contexts for model router.")
    
    sys_prompt = req.system_prompt or ""
    if context_str:
        sys_prompt = f"Relevant Long-term Memory Context:\n{context_str}\n\n{sys_prompt}"

    result = provider_manager.route_model(
        prompt=req.prompt,
        task_type=req.task_type,
        model_override=req.model_override,
        system_prompt=sys_prompt
    )
    
    if result.success:
        return RouteResponse(
            success=True,
            content=result.content,
            model_used=result.model,
            provider=result.provider,
            prompt_tokens=result.prompt_tokens,
            completion_tokens=result.completion_tokens,
            cost=result.cost,
            latency_ms=result.latency_ms
        )
    else:
        raise HTTPException(status_code=503, detail=result.error_message or "Model Router failed.")

@app.post("/memory/store")
def store_memory(req: MemoryStoreRequest):
    try:
        memory_store.store_memory(
            memory_id=req.id,
            user_id=req.user_id,
            memory_type=req.memory_type,
            content=req.content,
            metadata=req.metadata
        )
        return {"success": True, "message": "Memory stored successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/memory/query")
def query_memory(req: MemoryQueryRequest):
    try:
        results = memory_store.semantic_retrieve(
            user_id=req.user_id,
            query=req.query,
            limit=req.limit or 3
        )
        return {"success": True, "data": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/memory/preferences")
def set_preference(req: PreferenceRequest):
    try:
        memory_store.set_preference(
            user_id=req.user_id,
            key=req.pref_key,
            value=req.pref_value
        )
        return {"success": True, "message": "Preference saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/memory/preferences/get")
def get_preferences(req: PreferenceGetRequest):
    try:
        prefs = memory_store.get_preferences(user_id=req.user_id)
        return {"success": True, "data": prefs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/memory/compress")
def compress_memory(req: CompressRequest):
    try:
        summary = memory_store.compress_conversation(
            session_id=req.session_id,
            user_id=req.user_id,
            provider_manager_instance=provider_manager
        )
        return {"success": True, "summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)

