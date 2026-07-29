'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout';
import { 
  PlusCircle, 
  Sparkles, 
  Play, 
  Globe, 
  Share2, 
  Code, 
  Layers, 
  Sliders, 
  Copy, 
  Check, 
  CheckCircle2, 
  Terminal, 
  Database, 
  Activity, 
  ShieldCheck, 
  Table, 
  MessageSquare,
  Bot,
  Zap,
  TrendingUp,
  X
} from 'lucide-react';
import { useToast } from '../../../components/Toast';
import { 
  AppStudioService, 
  AppProject, 
  AppUIComponent 
} from '../../../services/app-studio.service';

export default function AppStudioBuilderPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'prompt' | 'canvas' | 'backend' | 'deploy' | 'themes'>('prompt');
  const [prompt, setPrompt] = useState('Build a Customer Support & SAST Security Portal with live pgvector RAG search and automated agent escalation.');
  const [projects, setProjects] = useState<AppProject[]>([]);
  const [activeProject, setActiveProject] = useState<AppProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedWidget, setCopiedWidget] = useState(false);

  useEffect(() => {
    fetchStudioData();
  }, []);

  const fetchStudioData = async () => {
    try {
      const list = await AppStudioService.getProjects();
      setProjects(list);
      if (list.length > 0) setActiveProject(list[0]);
    } catch (e) {
      console.warn('[STUDIO] Load warning:', e);
    }
  };

  const handleGenerateApp = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const proj = await AppStudioService.generateAppFromPrompt(prompt);
      setProjects(prev => [proj, ...prev]);
      setActiveProject(proj);
      setActiveTab('canvas');
      toast(`AI App Studio generated "${proj.name}"!`, 'success');
    } catch (e) {
      toast('App generation error.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyWidget = () => {
    if (!activeProject?.embedSnippet) return;
    navigator.clipboard.writeText(activeProject.embedSnippet);
    setCopiedWidget(true);
    toast('Copied embeddable JS widget script to clipboard!', 'success');
    setTimeout(() => setCopiedWidget(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans select-none animate-fade-in px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-[#4EA3FF]" /> Enterprise AI Application Studio & Visual Builder
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Build production-grade AI web apps, chat portals, and automation tools visually from plain English prompts with zero backend code.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#111111] border border-[#232323] px-3.5 py-2 rounded-xl">
          <span className="text-gray-400">Studio Engine:</span>
          <span className="text-emerald-400 font-bold">READY (v0 / Retool / FlutterFlow Hybrid)</span>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 border-b border-[#232323] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'prompt', label: 'AI App Generator & Prompt Studio', icon: Sparkles },
          { id: 'canvas', label: 'Visual Canvas & Page Builder', icon: Layers },
          { id: 'backend', label: 'Backend APIs & Data Bindings', icon: Code },
          { id: 'deploy', label: 'One-Click Deploy & Embed Widget', icon: Globe },
          { id: 'themes', label: 'Themes & Branding Studio', icon: Sliders },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-white/10 text-white border-white/20 font-bold' 
                  : 'bg-transparent text-gray-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AI APP GENERATOR & PROMPT STUDIO */}
      {activeTab === 'prompt' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Synthesize Full-Stack AI Application from Text
            </h3>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Describe your desired AI application layout, agents, workflows, and database bindings in natural language.
            </p>

            <div className="space-y-3">
              <textarea
                rows={3}
                placeholder="Describe your AI web app layout and functionality..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-[#050505] border border-[#232323] focus:border-[#4EA3FF] rounded-xl p-4 text-white outline-none font-sans text-sm resize-none"
              />

              <button
                onClick={handleGenerateApp}
                disabled={isGenerating}
                className="px-6 py-3 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black font-bold rounded-xl cursor-pointer text-xs border-0 font-mono flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing UI, APIs & Swarm Bindings...' : 'Generate Full-Stack AI Application'}</span>
              </button>
            </div>
          </div>

          {projects.length > 0 && (
            <div className="bg-[#111111] border border-[#232323] p-5 rounded-2xl space-y-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Existing Studio App Projects ({projects.length})</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => { setActiveProject(p); setActiveTab('canvas'); }}
                    className={`bg-[#050505] border p-4 rounded-xl space-y-2 cursor-pointer transition-all ${
                      activeProject?.id === p.id ? 'border-[#4EA3FF]' : 'border-[#232323] hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{p.name}</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {p.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-sans">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VISUAL CANVAS & PAGE BUILDER */}
      {activeTab === 'canvas' && activeProject && (
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#232323] pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{activeProject.name} (Visual Drag &amp; Drop Canvas)</h3>
                <span className="text-[10px] text-gray-500">Live preview of auto-synthesized AI UI components bound to Orbit services.</span>
              </div>
              <span className="text-[#4EA3FF] font-bold text-[10px] bg-[#4EA3FF]/10 border border-[#4EA3FF]/20 px-2.5 py-0.5 rounded">
                CANVAS ACTIVE
              </span>
            </div>

            {/* Synthesized Component Cards */}
            <div className="space-y-4">
              {activeProject.components.map(comp => (
                <div key={comp.id} className="bg-[#050505] border border-[#232323] p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#232323] pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#4EA3FF]" /> {comp.title}
                    </span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-bold uppercase">
                      Component: {comp.type}
                    </span>
                  </div>

                  {comp.type === 'chat' && (
                    <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl space-y-3 font-sans">
                      <div className="text-xs text-gray-300 bg-[#050505] p-3 rounded-lg border border-[#232323]">
                        <strong>AI Employee:</strong> Ready to process inter-agent requests and run SAST vulnerability audits.
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={comp.props.placeholder || 'Type message...'}
                          disabled
                          className="flex-1 bg-[#050505] border border-[#232323] rounded-lg px-3 py-2 text-xs text-gray-400"
                        />
                        <button disabled className="px-3 py-2 bg-[#4EA3FF]/20 text-[#4EA3FF] rounded-lg text-xs font-mono">
                          Send
                        </button>
                      </div>
                    </div>
                  )}

                  {comp.type === 'workflow_trigger' && (
                    <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl font-mono">
                      <button disabled className="px-4 py-2 bg-[#4EA3FF] text-black font-bold rounded-lg text-xs">
                        {comp.props.buttonText || 'Execute Workflow'}
                      </button>
                    </div>
                  )}

                  {comp.type === 'data_table' && (
                    <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl font-mono text-[11px] text-gray-400">
                      <span>Bound to PostgreSQL Financial Transactions Ledger</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BACKEND APIS & DATA BINDINGS */}
      {activeTab === 'backend' && activeProject && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-[#4EA3FF]" /> Auto-Generated REST &amp; GraphQL API Bindings
          </h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Orbit automatically generates production API endpoints for every component in your app project.
          </p>

          <div className="space-y-2 bg-[#050505] p-4 rounded-xl border border-[#232323]">
            <div className="text-[#4EA3FF] font-bold">POST https://api.orbit.ai/v1/apps/{activeProject.id}/chat</div>
            <div className="text-emerald-400 font-bold">POST https://api.orbit.ai/v1/apps/{activeProject.id}/trigger-workflow</div>
          </div>
        </div>
      )}

      {/* TAB 4: ONE-CLICK DEPLOY & EMBED WIDGET */}
      {activeTab === 'deploy' && activeProject && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" /> Production Deployment &amp; Embeddable Widget
            </h3>
            <button
              onClick={handleCopyWidget}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl cursor-pointer text-xs"
            >
              {copiedWidget ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedWidget ? 'Copied' : 'Copy JS Widget Script'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-500 uppercase block font-bold text-[10px]">Live Production Web App URL</span>
              <a href={activeProject.deploymentUrl} target="_blank" rel="noreferrer" className="text-[#4EA3FF] font-bold hover:underline text-sm block mt-0.5">
                {activeProject.deploymentUrl}
              </a>
            </div>

            <div className="pt-2">
              <span className="text-gray-500 uppercase block font-bold text-[10px]">Embeddable HTML JavaScript Widget Snippet</span>
              <pre className="bg-[#050505] border border-[#232323] p-3 rounded-xl text-amber-300 text-xs overflow-x-auto mt-1">
{activeProject.embedSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: THEMES & BRANDING STUDIO */}
      {activeTab === 'themes' && (
        <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl space-y-4 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" /> Themes &amp; Custom Branding Studio
          </h3>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { name: 'Enterprise Dark Mode', bg: '#050505', text: 'White/Blue' },
              { name: 'Cyberpunk Neon', bg: '#090514', text: 'Purple/Cyan' },
              { name: 'Modern Minimalist', bg: '#121212', text: 'Monochrome' }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#050505] border border-[#232323] p-4 rounded-xl space-y-2">
                <span className="font-bold text-white block text-xs">{t.name}</span>
                <span className="text-[10px] text-gray-400 block font-sans">Palette: {t.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
