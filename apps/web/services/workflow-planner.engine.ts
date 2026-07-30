import { Workflow, TaskNode } from '@nexus-ai/types';

export interface PlannedNode extends Partial<TaskNode> {
  id: string;
  name: string;
  task: string;
  capability: string;
  assignedAgentId: string;
  assignedAgent: string;
  nodeType?: 'task' | 'branch' | 'parallel' | 'loop' | 'human_approval';
  condition?: string;
  maxIterations?: number;
  requiredRoles?: string[];
  retryPolicy?: { maxRetries: number; backoffMs: number };
  tools?: string[];
  dependencies?: string[];
}

export interface PlannerOutput {
  intent: string;
  domain: string;
  complexity: 'simple' | 'medium' | 'complex' | 'enterprise';
  executionStrategy: string;
  estimatedTokens: { prompt: number; completion: number; total: number };
  estimatedCost: number;
  estimatedLatencyMs: number;
  workflow: Workflow;
}

/**
 * Enterprise 10-Stage Intent Detection & Workflow Generation Engine.
 * 
 * Pipeline:
 * 1. Intent Detection
 * 2. Task Classification
 * 3. Capability Matching
 * 4. Node Planning
 * 5. Dependency Resolution
 * 6. Parallelization
 * 7. Execution Strategy
 * 8. Validation
 * 9. Cost Estimation
 * 10. Output Graph
 */
export class WorkflowPlannerEngine {
  
  public static plan(query: string, routingMode: string = 'balanced', budget: number = 5.0): PlannerOutput {
    // Stage 0: Prompt Injection & Adversarial Jailbreak Guardrail Check
    const sanitizedQuery = this.sanitizePrompt(query);
    const normalizedQuery = sanitizedQuery.toLowerCase();
    
    // Step 1: Intent Detection & Domain Classification
    const domain = this.detectDomain(normalizedQuery);
    const intent = this.extractIntent(sanitizedQuery, domain);
    const complexity = this.assessComplexity(normalizedQuery);
    
    // Step 2, 3, 4: Task Classification, Capability Matching & Node Planning
    const rawNodes = this.planDomainNodes(domain, normalizedQuery, routingMode);
    
    // Step 5 & 6: Dependency Resolution & Parallelization Layout
    const { nodes, edges } = this.resolveDependenciesAndLayout(rawNodes);
    
    // Step 7: Execution Strategy
    const executionStrategy = this.determineExecutionStrategy(nodes, domain);
    
    // Step 8: Graph Validation (DAG integrity check)
    this.validateGraph(nodes, edges);
    
    // Step 9: Cost & Token Estimation
    const { cost, tokens, latencyMs } = this.estimateMetrics(nodes, routingMode, budget);
    
    // Step 10: Final Output Graph Construction
    const workflow: Workflow = {
      id: `wf-plan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: `${this.capitalize(domain)}: ${intent.slice(0, 35)}`,
      query,
      nodes,
      edges,
      budget,
      routingMode: routingMode as any,
      retryCount: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    return {
      intent,
      domain,
      complexity,
      executionStrategy,
      estimatedTokens: tokens,
      estimatedCost: cost,
      estimatedLatencyMs: latencyMs,
      workflow
    };
  }

  // --- STAGE 1: INTENT DETECTION ---
  private static detectDomain(query: string): string {
    if (/cyber|security|sast|dast|vulnerability|audit|patch|exploit|penetration/i.test(query)) return 'cybersecurity';
    if (/legal|contract|gdpr|compliance|liability|indemnity|clause|law/i.test(query)) return 'legal';
    if (/finance|portfolio|risk|sharpe|var|monte carlo|volatility|trading|stock/i.test(query)) return 'finance';
    if (/marketing|copy|ad|social|content|seo|campaign|brand/i.test(query)) return 'marketing';
    if (/health|clinical|ehr|fhir|patient|icd-10|doctor|medical|drug/i.test(query)) return 'healthcare';
    if (/sales|lead|prospect|crm|enrichment|icp|outreach|deal/i.test(query)) return 'sales';
    if (/code|engineering|github|build|test|lint|deploy|pr|repo|bug/i.test(query)) return 'engineering';
    if (/paper|research|citation|fact|study|gather|summarize|news/i.test(query)) return 'research';
    
    return 'research'; // default general intent
  }

  private static sanitizePrompt(prompt: string): string {
    if (!prompt) return 'General Research Task';
    // Neutralize prompt injection patterns (e.g. "ignore previous instructions", "system prompt", "override rules")
    let cleaned = prompt.replace(/(ignore\s+(all\s+)?previous\s+instructions|system\s+prompt\s*:|override\s+safety\s+rules|reveal\s+secret\s+keys)/gi, '[REDACTED_ADVERSARIAL_INSTRUCTION]');
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    return cleaned.trim();
  }

  private static extractIntent(query: string, domain: string): string {
    if (query.trim().length > 5) return query;
    return `Automated ${domain} orchestration & intelligence execution`;
  }

  private static assessComplexity(query: string): 'simple' | 'medium' | 'complex' | 'enterprise' {
    const len = query.length;
    if (/enterprise|multi-stage|compliance|parallel|audit|full/i.test(query) || len > 100) return 'enterprise';
    if (/advanced|compare|verify|optimize/i.test(query) || len > 50) return 'complex';
    if (/check|find|analyze/i.test(query)) return 'medium';
    return 'simple';
  }

  // --- STAGE 2, 3, 4: NODE PLANNING & CAPABILITY MATCHING ---
  private static planDomainNodes(domain: string, query: string, routingMode: string): PlannedNode[] {
    switch (domain) {
      case 'cybersecurity':
        return [
          {
            id: 'n1',
            name: 'Target Recon & Scope Analyzer',
            task: 'Perform network recon & define attack surface boundary.',
            capability: 'cyber_recon',
            assignedAgentId: 'agent-cyber-recon-1',
            assignedAgent: 'CyberRecon Node',
            nodeType: 'task',
            tools: ['nmap_wrapper', 'dns_enum', 'scope_validator'],
            retryPolicy: { maxRetries: 2, backoffMs: 500 }
          },
          {
            id: 'n2_sast',
            name: 'SAST Static Code Analysis',
            task: 'Scan source code repository for secret leakage & hardcoded credentials.',
            capability: 'cyber_sast',
            assignedAgentId: 'agent-sast-scanner',
            assignedAgent: 'SAST Static Scanner',
            nodeType: 'parallel',
            tools: ['semgrep_engine', 'secret_finder'],
            retryPolicy: { maxRetries: 3, backoffMs: 1000 }
          },
          {
            id: 'n2_dast',
            name: 'DAST Vulnerability Probe',
            task: 'Execute dynamic vulnerability fuzzing on exposed HTTP API endpoints.',
            capability: 'cyber_dast',
            assignedAgentId: 'agent-dast-probe',
            assignedAgent: 'DAST Fuzzer',
            nodeType: 'parallel',
            tools: ['zap_proxy', 'sql_fuzzer'],
            retryPolicy: { maxRetries: 1, backoffMs: 2000 }
          },
          {
            id: 'n3',
            name: 'Risk Matrix Aggregator',
            task: 'Correlate CVSS severity scores and calculate exposure probability.',
            capability: 'risk_assessment',
            assignedAgentId: 'agent-risk-matrix',
            assignedAgent: 'CVSS Risk Matrix Evaluator',
            nodeType: 'task',
            tools: ['cvss_v3_calculator', 'vector_scoring']
          },
          {
            id: 'n4_gate',
            name: 'CISO Security Approval Gate',
            task: 'Require explicit human approval for high-severity vulnerability remediation patches.',
            capability: 'human_approval',
            assignedAgentId: 'agent-human-gate',
            assignedAgent: 'CISO Security Gate',
            nodeType: 'human_approval',
            requiredRoles: ['security_admin', 'ciso']
          },
          {
            id: 'n5',
            name: 'Remediation Patch Generator',
            task: 'Generate automated pull request with vulnerability patches.',
            capability: 'patch_gen',
            assignedAgentId: 'agent-patch-bot',
            assignedAgent: 'Patch Generation Swarm',
            nodeType: 'task',
            tools: ['git_pr_creator', 'code_fixer']
          }
        ];

      case 'legal':
        return [
          {
            id: 'n1',
            name: 'Contract Document Ingestion',
            task: 'Extract text, clauses, and metadata from uploaded PDF/Docx contracts.',
            capability: 'doc_ingestion',
            assignedAgentId: 'agent-legal-ocr',
            assignedAgent: 'Legal OCR Ingestion Node',
            nodeType: 'task',
            tools: ['pdf_parser', 'ocr_text_extractor']
          },
          {
            id: 'n2_clause',
            name: 'Liability Clause Classifier',
            task: 'Classify clauses into Indemnification, IP Ownership, Limitation of Liability.',
            capability: 'legal_classification',
            assignedAgentId: 'agent-clause-classifier',
            assignedAgent: 'Clause Classifier AI',
            nodeType: 'task',
            tools: ['nlp_clause_matcher']
          },
          {
            id: 'n3_branch',
            name: 'Liability Risk Branching',
            task: 'Branch workflow depending on whether uncapped liability is detected.',
            capability: 'conditional_branch',
            assignedAgentId: 'agent-branch-evaluator',
            assignedAgent: 'Risk Condition Branch',
            nodeType: 'branch',
            condition: 'uncappedLiability > 0 ? HIGH_RISK : STANDARD'
          },
          {
            id: 'n4_gdpr',
            name: 'EU GDPR & Data Privacy Audit',
            task: 'Verify data processing addendum compliance against EU GDPR Article 28.',
            capability: 'gdpr_audit',
            assignedAgentId: 'agent-gdpr-auditor',
            assignedAgent: 'GDPR Compliance Auditor',
            nodeType: 'parallel',
            tools: ['gdpr_rulebook_v2']
          },
          {
            id: 'n4_indemnity',
            name: 'Indemnity Exposure Calculator',
            task: 'Calculate maximum financial risk exposure under cross-indemnification terms.',
            capability: 'financial_legal',
            assignedAgentId: 'agent-indemnity-calc',
            assignedAgent: 'Indemnity Risk Node',
            nodeType: 'parallel',
            tools: ['exposure_modeler']
          },
          {
            id: 'n5_gate',
            name: 'General Counsel Sign-Off Gate',
            task: 'Require legal team signature before contract execution.',
            capability: 'human_approval',
            assignedAgentId: 'agent-legal-gate',
            assignedAgent: 'General Counsel Gate',
            nodeType: 'human_approval',
            requiredRoles: ['legal_counsel']
          }
        ];

      case 'finance':
        return [
          {
            id: 'n1',
            name: 'Portfolio Data Feed Ingestion',
            task: 'Fetch live price feeds, position weights, and wallet transactions.',
            capability: 'fin_feed',
            assignedAgentId: 'agent-fin-feed-1',
            assignedAgent: 'Price Feed Ingestion Node',
            nodeType: 'task',
            tools: ['coingecko_api', 'pyth_oracle', 'chainlink_feed']
          },
          {
            id: 'n2_sharpe',
            name: 'Sharpe & Sortino Ratio Engine',
            task: 'Compute risk-adjusted returns and downside volatility metrics.',
            capability: 'sharpe_calculator',
            assignedAgentId: 'agent-sharpe-calc',
            assignedAgent: 'Sharpe Ratio Engine',
            nodeType: 'parallel',
            tools: ['numpy_finance', 'volatility_matrix']
          },
          {
            id: 'n2_var',
            name: 'Monte Carlo VaR Simulation',
            task: 'Run 10,000 Monte Carlo iterations to compute 99% Value-at-Risk (VaR).',
            capability: 'monte_carlo_var',
            assignedAgentId: 'agent-var-sim',
            assignedAgent: 'Monte Carlo VaR Simulator',
            nodeType: 'parallel',
            tools: ['monte_carlo_gpu', 'normal_dist_engine']
          },
          {
            id: 'n3_loop',
            name: 'Iterative Rebalancing Optimizer',
            task: 'Loop portfolio asset weights until target volatility threshold (<12%) is satisfied.',
            capability: 'portfolio_optimizer',
            assignedAgentId: 'agent-rebalance-loop',
            assignedAgent: 'Portfolio Optimization Loop',
            nodeType: 'loop',
            maxIterations: 5,
            tools: ['scipy_optimize']
          },
          {
            id: 'n4',
            name: 'Settlement & Execution Brief',
            task: 'Output structured transaction rebalance batch for wallet execution.',
            capability: 'fin_settlement',
            assignedAgentId: 'agent-settlement-brief',
            assignedAgent: 'Financial Settlement Node',
            nodeType: 'task',
            tools: ['tx_batch_builder']
          }
        ];

      case 'marketing':
        return [
          {
            id: 'n1',
            name: 'Campaign Brief & ICP Segmenter',
            task: 'Parse campaign goals, target audience personas, and brand voice guidelines.',
            capability: 'mkt_strategy',
            assignedAgentId: 'agent-mkt-strat-1',
            assignedAgent: 'Campaign Strategy Node',
            nodeType: 'task',
            tools: ['persona_analyzer', 'brand_voice_eval']
          },
          {
            id: 'n2_copy',
            name: 'Multi-Variant Copy Scribe',
            task: 'Generate ad headline variants, email copy, and social media posts.',
            capability: 'copywriter',
            assignedAgentId: 'agent-copy-scribe',
            assignedAgent: 'Copywriting AI Scribe',
            nodeType: 'parallel',
            tools: ['gpt4o_creative', 'headline_scorer']
          },
          {
            id: 'n2_image',
            name: 'Visual Brand Asset Generator',
            task: 'Generate high-converting banner images and social graphics.',
            capability: 'image_gen',
            assignedAgentId: 'agent-image-gen-1',
            assignedAgent: 'Visual Asset Generator Node',
            nodeType: 'parallel',
            tools: ['flux_pro_api', 'canvas_renderer']
          },
          {
            id: 'n3',
            name: 'A/B Test Conversion Predictor',
            task: 'Evaluate click-through rate (CTR) prediction scores across all generated variants.',
            capability: 'ctr_predictor',
            assignedAgentId: 'agent-ctr-predictor',
            assignedAgent: 'CTR Analytics Predictor',
            nodeType: 'task',
            tools: ['ctr_model_v3']
          },
          {
            id: 'n4',
            name: 'Omnichannel Publishing Scheduler',
            task: 'Schedule selected winning creative assets to Twitter, LinkedIn, and Email CRM.',
            capability: 'social_publisher',
            assignedAgentId: 'agent-social-pub',
            assignedAgent: 'Social Publishing Engine',
            nodeType: 'task',
            tools: ['twitter_api_v2', 'linkedin_publisher']
          }
        ];

      case 'healthcare':
        return [
          {
            id: 'n1',
            name: 'Raw Clinical EHR Note Ingestion',
            task: 'Ingest unstructured clinical notes and anonymize HIPAA PII data.',
            capability: 'hipaa_anonymizer',
            assignedAgentId: 'agent-hipaa-cleaner',
            assignedAgent: 'HIPAA Anonymizer Node',
            nodeType: 'task',
            tools: ['pii_scrubber_v2', 'de_identifier']
          },
          {
            id: 'n2_fhir',
            name: 'FHIR JSON Standard Converter',
            task: 'Convert clinical observations into standardized HL7 FHIR v4 resource objects.',
            capability: 'fhir_converter',
            assignedAgentId: 'agent-fhir-parser',
            assignedAgent: 'HL7 FHIR v4 Mapper',
            nodeType: 'parallel',
            tools: ['fhir_schema_validator']
          },
          {
            id: 'n2_icd',
            name: 'ICD-10 Diagnostic Code Classifier',
            task: 'Map clinical diagnostic findings to exact ICD-10-CM billing codes.',
            capability: 'icd10_classifier',
            assignedAgentId: 'agent-icd10-mapper',
            assignedAgent: 'ICD-10 Clinical Mapper',
            nodeType: 'parallel',
            tools: ['icd10_lookup_engine']
          },
          {
            id: 'n3_gate',
            name: 'Attending Physician Validation Gate',
            task: 'Require licensed medical practitioner review before updating patient chart.',
            capability: 'human_approval',
            assignedAgentId: 'agent-doc-gate',
            assignedAgent: 'Physician Review Gate',
            nodeType: 'human_approval',
            requiredRoles: ['licensed_physician']
          }
        ];

      case 'sales':
        return [
          {
            id: 'n1',
            name: 'ICP Target Query Definition',
            task: 'Specify ideal customer profile parameters (industry, revenue, headcount).',
            capability: 'icp_builder',
            assignedAgentId: 'agent-icp-builder',
            assignedAgent: 'ICP Strategy Builder',
            nodeType: 'task',
            tools: ['firmographic_filter']
          },
          {
            id: 'n2_scrape',
            name: 'Domain Scraper & Contact Harvester',
            task: 'Scrape domain profiles and discover executive email contacts.',
            capability: 'domain_scraper',
            assignedAgentId: 'agent-domain-scraper',
            assignedAgent: 'Domain Contact Harvester',
            nodeType: 'parallel',
            tools: ['apollo_scraper', 'clearbit_api']
          },
          {
            id: 'n2_verify',
            name: 'Email Deliverability Verifier',
            task: 'Ping SMTP servers to verify zero bounce rate for identified emails.',
            capability: 'email_verifier',
            assignedAgentId: 'agent-email-verifier',
            assignedAgent: 'SMTP Deliverability Node',
            nodeType: 'parallel',
            tools: ['neverbounce_api', 'smtp_checker']
          },
          {
            id: 'n3_score',
            name: 'Lead Intent Fit Scorer',
            task: 'Score leads 0-100 based on buyer intent signals and technographic fit.',
            capability: 'lead_scorer',
            assignedAgentId: 'agent-lead-scorer',
            assignedAgent: 'Lead Intent Scoring Engine',
            nodeType: 'task',
            tools: ['intent_matrix_v1']
          },
          {
            id: 'n4_branch',
            name: 'High-Intent Outreach Branching',
            task: 'Branch qualified leads (score >= 80) to personalized outreach versus nurture list.',
            capability: 'conditional_branch',
            assignedAgentId: 'agent-outreach-branch',
            assignedAgent: 'Lead Qualification Branch',
            nodeType: 'branch',
            condition: 'fitScore >= 80 ? IMMEDIATE_OUTREACH : NURTURE'
          }
        ];

      case 'engineering':
        return [
          {
            id: 'n1',
            name: 'Git Commit & PR Diff Ingestion',
            task: 'Fetch changed files, pull request diffs, and updated dependencies.',
            capability: 'git_ingest',
            assignedAgentId: 'agent-git-ingest',
            assignedAgent: 'Git PR Ingestion Node',
            nodeType: 'task',
            tools: ['octokit_diff_parser']
          },
          {
            id: 'n2_lint',
            name: 'Static Lint & Typecheck Runner',
            task: 'Run ESLint and TypeScript compiler typecheck across changed workspace files.',
            capability: 'typecheck_runner',
            assignedAgentId: 'agent-typechecker',
            assignedAgent: 'TypeScript Compiler Node',
            nodeType: 'parallel',
            tools: ['tsc_noemit', 'eslint_cli']
          },
          {
            id: 'n2_test',
            name: 'Automated Unit & Integration Test Suite',
            task: 'Execute Jest/Vitest test suites with code coverage validation (>85%).',
            capability: 'test_runner',
            assignedAgentId: 'agent-test-runner',
            assignedAgent: 'Jest Coverage Runner',
            nodeType: 'parallel',
            tools: ['jest_cli', 'istanbul_coverage']
          },
          {
            id: 'n3_build',
            name: 'Production Bundle Compiler',
            task: 'Build optimized client bundle and verify chunk asset sizes.',
            capability: 'build_compiler',
            assignedAgentId: 'agent-build-compiler',
            assignedAgent: 'Next.js Production Compiler',
            nodeType: 'task',
            tools: ['next_build', 'bundle_analyzer']
          },
          {
            id: 'n4_deploy',
            name: 'Canary Deployment Release Node',
            task: 'Deploy build artifact to canary environment and verify health endpoints.',
            capability: 'deploy_release',
            assignedAgentId: 'agent-deploy-node',
            assignedAgent: 'Canary Release Deployment Node',
            nodeType: 'task',
            tools: ['vercel_deploy_api', 'healthcheck_ping']
          }
        ];

      default: // Research & General
        return [
          {
            id: 'n1',
            name: 'Multi-Engine Web Search Swarm',
            task: 'Query Google, DuckDuckGo, and Bing APIs for primary domain research.',
            capability: 'web_search',
            assignedAgentId: 'agent-web-search-1',
            assignedAgent: 'Web Research Swarm',
            nodeType: 'task',
            tools: ['serp_api', 'brave_search'],
            retryPolicy: { maxRetries: 3, backoffMs: 500 }
          },
          {
            id: 'n2_academic',
            name: 'Academic & arXiv Document Parser',
            task: 'Parse technical whitepapers and extract quantitative benchmark tables.',
            capability: 'paper_parser',
            assignedAgentId: 'agent-arxiv-parser',
            assignedAgent: 'arXiv Technical Parser',
            nodeType: 'parallel',
            tools: ['arxiv_api', 'pdf_table_extractor']
          },
          {
            id: 'n2_citations',
            name: 'Citation Trust & Fact Verifier',
            task: 'Verify claim citations against peer-reviewed sources and compute trust score.',
            capability: 'fact_checker',
            assignedAgentId: 'agent-fact-checker',
            assignedAgent: 'Citation Trust Verifier',
            nodeType: 'parallel',
            tools: ['domain_trust_rank']
          },
          {
            id: 'n3_loop',
            name: 'Refinement & Synthesis Loop',
            task: 'Loop summary synthesis until citation coverage exceeds 95%.',
            capability: 'synthesis_loop',
            assignedAgentId: 'agent-synth-loop',
            assignedAgent: 'Executive Synthesis Loop',
            nodeType: 'loop',
            maxIterations: 3
          },
          {
            id: 'n4',
            name: 'Executive Brief & Markdown Exporter',
            task: 'Generate final formatted executive intelligence report with active citations.',
            capability: 'report_gen',
            assignedAgentId: 'agent-report-gen',
            assignedAgent: 'Markdown Report Exporter',
            nodeType: 'task',
            tools: ['markdown_formatter']
          }
        ];
    }
  }

  // --- STAGE 5 & 6: DEPENDENCY RESOLUTION & PARALLELIZATION LAYOUT ---
  private static resolveDependenciesAndLayout(rawNodes: PlannedNode[]): { nodes: TaskNode[]; edges: any[] } {
    const edges: any[] = [];
    let edgeCounter = 1;

    // Detect parallel nodes vs sequential nodes
    const sequentialNodes = rawNodes.filter(n => n.nodeType !== 'parallel');
    const parallelNodes = rawNodes.filter(n => n.nodeType === 'parallel');

    // Layout configuration
    let currentX = 100;
    const startY = 220;

    const finalNodes: TaskNode[] = rawNodes.map((rn, idx) => {
      // Cost & time jittering per routing strategy
      const costEstimate = Math.round((0.04 + (idx * 0.05) + Math.random() * 0.12) * 100) / 100;
      const timeEstimate = Math.floor(300 + Math.random() * 900);
      const trustScore = Math.floor(90 + Math.random() * 9);

      let posX = currentX;
      let posY = startY;

      if (rn.nodeType === 'parallel') {
        const pIndex = parallelNodes.findIndex(pn => pn.id === rn.id);
        const totalP = parallelNodes.length || 1;
        const offset = (pIndex - (totalP - 1) / 2) * 160;
        posX = currentX;
        posY = startY + offset;
      } else {
        if (idx > 0 && rawNodes[idx - 1].nodeType === 'parallel') {
          currentX += 260;
        } else if (idx > 0) {
          currentX += 220;
        }
        posX = currentX;
        posY = startY;
      }

      return {
        id: rn.id,
        name: rn.name,
        task: rn.task,
        description: `${rn.task} (Node Type: ${rn.nodeType || 'task'})`,
        capability: rn.capability,
        costEstimate,
        timeEstimate,
        trustScore,
        status: 'pending',
        assignedAgentId: rn.assignedAgentId,
        assignedAgent: rn.assignedAgent,
        positionX: posX,
        positionY: posY
      };
    });

    // Wire dependencies cleanly
    for (let i = 0; i < rawNodes.length - 1; i++) {
      const curr = rawNodes[i];
      const next = rawNodes[i + 1];

      if (curr.nodeType === 'parallel' && next.nodeType === 'parallel') {
        // Parallel siblings -> connect predecessor sequential to both
        continue;
      }

      if (next.nodeType === 'parallel') {
        // Sequential precursor connects to all parallel siblings
        const pSiblings = rawNodes.filter(n => n.nodeType === 'parallel');
        pSiblings.forEach(ps => {
          edges.push({
            id: `edge-${edgeCounter++}`,
            source: curr.id,
            target: ps.id
          });
        });
      } else if (curr.nodeType === 'parallel') {
        // Connect all parallel siblings to the next sequential node
        const pSiblings = rawNodes.filter(n => n.nodeType === 'parallel');
        pSiblings.forEach(ps => {
          if (!edges.some(e => e.source === ps.id && e.target === next.id)) {
            edges.push({
              id: `edge-${edgeCounter++}`,
              source: ps.id,
              target: next.id
            });
          }
        });
      } else {
        // Direct sequential edge
        edges.push({
          id: `edge-${edgeCounter++}`,
          source: curr.id,
          target: next.id
        });
      }
    }

    return { nodes: finalNodes, edges };
  }

  // --- STAGE 7: EXECUTION STRATEGY ---
  private static determineExecutionStrategy(nodes: TaskNode[], domain: string): string {
    const hasParallel = nodes.some(n => n.description?.includes('parallel'));
    const hasBranch = nodes.some(n => n.description?.includes('branch'));
    const hasLoop = nodes.some(n => n.description?.includes('loop'));
    const hasApproval = nodes.some(n => n.description?.includes('human_approval'));

    const parts: string[] = [];
    if (hasParallel) parts.push('Parallel Fan-Out/Fan-In');
    if (hasBranch) parts.push('Conditional Branching');
    if (hasLoop) parts.push('Iterative Loop');
    if (hasApproval) parts.push('Human Approval Gate');

    if (parts.length === 0) parts.push('Sequential DAG Execution');

    return `${this.capitalize(domain)} Subgraph Strategy: ${parts.join(' + ')}`;
  }

  // --- STAGE 8: DAG VALIDATION ---
  private static validateGraph(nodes: TaskNode[], edges: any[]): void {
    if (!nodes || nodes.length === 0) {
      throw new Error('Planner Error: Output graph contains no planned nodes');
    }
    const nodeIds = new Set(nodes.map(n => n.id));
    edges.forEach(e => {
      if (!nodeIds.has(e.source) || !nodeIds.has(e.target)) {
        throw new Error(`Planner Error: Edge references invalid node ID (${e.source} -> ${e.target})`);
      }
    });
  }

  // --- STAGE 9: METRICS & COST ESTIMATION ---
  private static estimateMetrics(nodes: TaskNode[], routingMode: string, budget: number): {
    cost: number;
    tokens: { prompt: number; completion: number; total: number };
    latencyMs: number;
  } {
    const nodeCount = nodes.length;
    const basePromptTokens = nodeCount * 1450;
    const baseCompletionTokens = nodeCount * 650;
    const totalTokens = basePromptTokens + baseCompletionTokens;

    let multiplier = 1.0;
    if (routingMode === 'fastest') multiplier = 0.8;
    if (routingMode === 'accuracy') multiplier = 1.3;
    if (routingMode === 'cheapest') multiplier = 0.5;

    const computedCost = Math.round(
      Math.min(budget, (totalTokens * 0.00008 * multiplier) + (nodeCount * 0.04)) * 100
    ) / 100;

    const latencyMs = Math.floor(400 + nodeCount * 220 * multiplier);

    return {
      cost: computedCost > 0 ? computedCost : 0.25,
      tokens: {
        prompt: basePromptTokens,
        completion: baseCompletionTokens,
        total: totalTokens
      },
      latencyMs
    };
  }

  private static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
