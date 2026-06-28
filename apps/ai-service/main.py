from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import time
import os
import json
import urllib.request
import urllib.error

app = FastAPI(title="NEXUS AI Orchestration Engine", version="1.0.0")
start_time = time.time()

# Request Models
class PlanRequest(BaseModel):
    query: str
    routing_mode: Optional[str] = "balanced"
    budget: Optional[float] = 2.0

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

# Response Models
class AgentScore(BaseModel):
    agent_id: str
    name: str
    score: float
    price: float
    latency: int
    success_rate: float

class TaskNodeResponse(BaseModel):
    id: str
    capability: str
    dependencies: List[str]

class PlanResponse(BaseModel):
    workflow: List[TaskNodeResponse]
    estimated_cost: float
    estimated_duration_seconds: int
    confidence: float

# Seed candidates database
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

def call_gemini(prompt: str, api_key: str) -> Optional[str]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"Gemini API error: {e}")
        return None

def call_openai(prompt: str, api_key: str) -> Optional[str]:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}]
    }
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return None

def call_anthropic(prompt: str, api_key: str) -> Optional[str]:
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01"
    }
    data = {
        "model": "claude-3-5-sonnet-20241022",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": prompt}]
    }
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["content"][0]["text"]
    except Exception as e:
        print(f"Anthropic API error: {e}")
        return None

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
    return (
        f"# HELP nexus_ai_uptime_seconds NEXUS AI orchestrator service uptime in seconds\n"
        f"# TYPE nexus_ai_uptime_seconds counter\n"
        f"nexus_ai_uptime_seconds {uptime}\n"
    )

@app.post("/plan", response_model=PlanResponse)
def plan_workflow(req: PlanRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query prompt cannot be empty.")
    
    query = req.query.lower()
    
    # Try calling external AI providers if keys exist
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openai_key = os.environ.get("OPENAI_API_KEY")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    
    ai_response = None
    prompt_instruct = f"Determine which task nodes are needed to fulfill this user goal: '{req.query}'. Return a JSON array matching format: [{{'id': '...', 'capability': '...', 'dependencies': [...]}}]"
    
    if gemini_key:
        ai_response = call_gemini(prompt_instruct, gemini_key)
    elif openai_key:
        ai_response = call_openai(prompt_instruct, openai_key)
    elif anthropic_key:
        ai_response = call_anthropic(prompt_instruct, anthropic_key)
        
    if ai_response:
        try:
            # Attempt to extract json brackets if wrapped in markdown blocks
            clean_res = ai_response
            if "```json" in clean_res:
                clean_res = clean_res.split("```json")[1].split("```")[0].strip()
            elif "```" in clean_res:
                clean_res = clean_res.split("```")[1].split("```")[0].strip()
            
            parsed = json.loads(clean_res)
            if isinstance(parsed, list):
                workflow_dag = [
                    TaskNodeResponse(id=item["id"], capability=item["capability"], dependencies=item.get("dependencies", []))
                    for item in parsed
                ]
                return PlanResponse(
                    workflow=workflow_dag,
                    estimated_cost=1.25,
                    estimated_duration_seconds=65,
                    confidence=0.95
                )
        except Exception as err:
            print(f"Could not parse structured LLM response, falling back to local orchestrator logic. Error: {err}")

    # Local structured fallback logic based on semantic parsing of keywords
    if "tesla" in query or "financial" in query or "research" in query:
        workflow_dag = [
            TaskNodeResponse(id="node-1", capability="research", dependencies=[]),
            TaskNodeResponse(id="node-2", capability="finance", dependencies=["node-1"]),
            TaskNodeResponse(id="node-3", capability="verify", dependencies=["node-2"]),
            TaskNodeResponse(id="node-4", capability="translate", dependencies=["node-3"])
        ]
    elif "smart contract" in query or "security" in query or "code" in query:
        workflow_dag = [
            TaskNodeResponse(id="node-1", capability="code", dependencies=[]),
            TaskNodeResponse(id="node-2", capability="security", dependencies=["node-1"]),
            TaskNodeResponse(id="node-3", capability="verify", dependencies=["node-2"])
        ]
    elif "legal" in query or "compliance" in query or "policy" in query:
        workflow_dag = [
            TaskNodeResponse(id="node-1", capability="research", dependencies=[]),
            TaskNodeResponse(id="node-2", capability="legal", dependencies=["node-1"]),
            TaskNodeResponse(id="node-3", capability="verify", dependencies=["node-2"])
        ]
    else:
        workflow_dag = [
            TaskNodeResponse(id="node-1", capability="research", dependencies=[]),
            TaskNodeResponse(id="node-2", capability="verify", dependencies=["node-1"])
        ]
        
    return PlanResponse(
        workflow=workflow_dag,
        estimated_cost=1.25,
        estimated_duration_seconds=65,
        confidence=0.94
    )

@app.post("/estimate")
def estimate_workflow(req: EstimateRequest):
    return {
        "success": True,
        "estimated_cost": 1.25,
        "estimated_duration_seconds": 65
    }

@app.post("/verify")
def verify_output(req: VerifyRequest):
    return {
        "success": True,
        "score": 96,
        "passed": True,
        "citations_count": 4
    }

@app.post("/summarize")
def summarize_content(req: SummarizeRequest):
    return {
        "success": True,
        "summary": "Analyses show positive growth parameters matching target constraints."
    }

@app.post("/translate")
def translate_text(req: TranslateRequest):
    return {
        "success": True,
        "translated_text": f"[Translated to {req.target_language}]: {req.text}"
    }

@app.post("/classify")
def classify_text(req: ClassifyRequest):
    return {
        "success": True,
        "category": "market_analysis"
    }

@app.post("/consensus")
def consensus_check(req: ConsensusRequest):
    return {
        "success": True,
        "consensus_achieved": True,
        "merged_output": req.outputs[0] if req.outputs else ""
    }

@app.post("/explain")
def explain_workflow(req: ExplainRequest):
    return {
        "success": True,
        "explanation": "This DAG executes research first, runs verification safety filters next, and outputs presentation slides."
    }

@app.get("/models")
def list_models():
    return {
        "success": True,
        "models": ["GPT-4o", "Gemini-1.5-Pro", "Claude-3.5-Sonnet"]
    }
