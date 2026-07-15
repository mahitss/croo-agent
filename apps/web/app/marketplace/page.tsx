'use client';

import { useState, useEffect } from 'react';
import { useNexusStore } from '../../store/nexusStore';
import { useMode } from '../../providers/ModeProvider';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../lib/api-client';
import { Search, Award, Layers, Sparkles, Star, SlidersHorizontal, ArrowUpDown, ShieldCheck, Download, Plus, Eye, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../components/Toast';
import { SkeletonCard } from '../../components/Skeleton';
import dynamic from 'next/dynamic';

const AgentDetailModal = dynamic(() => import('../../components/AgentDetailModal'), {
  loading: () => <div className="text-gray-500 font-mono text-xs p-4 bg-black/40 border border-border-dark rounded-xl">Loading Swarm Overlay Details...</div>
});

export default function MarketplacePage() {
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const initializationState = useAuthStore((state) => state.initializationState);
  const { isDemoMode } = useMode();

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [minTrustScore, setMinTrustScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0.50);
  const [sortBy, setSortBy] = useState('trustScore');
  const [marketplaceTab, setMarketplaceTab] = useState<'all' | 'trending' | 'featured' | 'verified'>('all');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [installed, setInstalled] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Backend Paginated Loading
  const [agentsList, setAgentsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalAgentsCount, setTotalAgentsCount] = useState(0);

  // Selected agent for details overlay modal
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  // Matchmaker State
  const [matchmakerPrompt, setMatchmakerPrompt] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchedStack, setMatchedStack] = useState<any | null>(null);

  // Publish Form State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [pubName, setPubName] = useState('');
  const [pubDesc, setPubDesc] = useState('');
  const [pubCategory, setPubCategory] = useState('Research');
  const [pubSkills, setPubSkills] = useState('');
  const [pubPrice, setPubPrice] = useState(0.10);
  const [pubLatency, setPubLatency] = useState(1000);
  const [pubEndpoint, setPubEndpoint] = useState('');
  const [pubLogoUrl, setPubLogoUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const categories = ['All', 'Research', 'Finance', 'Legal', 'Coding', 'Security', 'Translation'];

  // Load agents list from backend dynamically
  const fetchAgents = async (pageToLoad: number, append = false) => {
    const authState = useAuthStore.getState();
    if (!isDemoMode && authState.initializationState !== 'AUTHENTICATED') {
      console.log('[MARKETPLACE_PAGE] Bypassing protected agents query for guest user.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const qParams: any = {
        page: pageToLoad,
        limit: 6,
        search: searchTerm,
        category: selectedCategory,
        sortBy: sortBy,
        verifiedOnly: onlyVerified ? 'true' : 'false',
      };
      
      // Pass user ID if logged in to get favorite / install states
      if (user) {
        qParams.userId = user.id;
      }

      const searchStr = new URLSearchParams(qParams).toString();
      const res = await apiClient.get<any>(`/api/v1/agents?${searchStr}`);
      if (res.success && res.data) {
        if (append) {
          setAgentsList(prev => {
            const existingIds = prev.map(a => a.id);
            const filtered = res.data.filter((a: any) => !existingIds.includes(a.id));
            return [...prev, ...filtered];
          });
        } else {
          setAgentsList(res.data);
        }
        setTotalAgentsCount(res.pagination?.total || res.data.length);
        setHasMore(pageToLoad < (res.pagination?.pages || 1));
      }
    } catch (err: any) {
      toast(`Failed to load agents: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Triggers loading when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchAgents(1, false);
  }, [searchTerm, selectedCategory, onlyVerified, sortBy, marketplaceTab, showOnlyFavorites, user, isDemoMode, initializationState]);

  // Load more handler
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchAgents(nextPage, true);
  };

  // Sync favorites & installed sets
  useEffect(() => {
    const favs = agentsList.filter(a => a.isFavorite).map(a => a.id);
    const insts = agentsList.filter(a => a.isInstalled).map(a => a.id);
    setFavorites(favs);
    setInstalled(insts);
  }, [agentsList]);

  // Favorite toggle endpoint call
  const handleToggleFavorite = async (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast('Please login to add favorites', 'error');
      return;
    }
    try {
      const res = await apiClient.post<any>(`/api/v1/agents/${agentId}/favorite`);
      if (res.success) {
        if (res.isFavorite) {
          setFavorites(prev => [...prev, agentId]);
          toast('Added to favorites!', 'success');
        } else {
          setFavorites(prev => prev.filter(id => id !== agentId));
          toast('Removed from favorites', 'info');
        }
        setAgentsList(prev => prev.map(a => a.id === agentId ? { ...a, isFavorite: res.isFavorite } : a));
      }
    } catch (err: any) {
      toast(`Favorite update error: ${err.message}`, 'error');
    }
  };

  // Install toggle endpoint call
  const handleToggleInstall = async (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast('Please login to install agents', 'error');
      return;
    }
    try {
      const res = await apiClient.post<any>(`/api/v1/agents/${agentId}/install`);
      if (res.success) {
        if (res.isInstalled) {
          setInstalled(prev => [...prev, agentId]);
          toast('Agent installed in workspace successfully!', 'success');
        } else {
          setInstalled(prev => prev.filter(id => id !== agentId));
          toast('Agent uninstalled from workspace', 'info');
        }
        setAgentsList(prev => prev.map(a => a.id === agentId ? { 
          ...a, 
          isInstalled: res.isInstalled, 
          downloads: res.isInstalled ? a.downloads + 1 : Math.max(0, a.downloads - 1) 
        } : a));
      }
    } catch (err: any) {
      toast(`Installation error: ${err.message}`, 'error');
    }
  };

  // Publish agent request
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast('Please login to publish agents', 'error');
      return;
    }
    setIsPublishing(true);
    try {
      const res = await apiClient.post<any>('/api/v1/agents', {
        name: pubName,
        description: pubDesc,
        category: pubCategory,
        skills: pubSkills.split(',').map(s => s.trim()).filter(Boolean),
        price: Number(pubPrice),
        latency: Number(pubLatency),
        endpoint: pubEndpoint,
        logoUrl: pubLogoUrl,
        ownerId: user.id,
      });

      if (res.success) {
        toast('Agent published successfully!', 'success');
        setIsPublishModalOpen(false);
        setPubName('');
        setPubDesc('');
        setPubSkills('');
        setPubEndpoint('');
        setPubLogoUrl('');
        fetchAgents(1, false);
      } else {
        toast(res.message || 'Failed to publish agent', 'error');
      }
    } catch (err: any) {
      toast(`Publishing error: ${err.message}`, 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  // Matchmaker Engine
  const handleMatchmaker = async () => {
    console.log('[MATCHMAKER] Button clicked');
    console.log('[MATCHMAKER] Prompt text:', matchmakerPrompt);

    if (!matchmakerPrompt || !matchmakerPrompt.trim()) {
      console.warn('[MATCHMAKER] Validation failed: Prompt is empty');
      toast('Validation failed: Please enter a valid task prompt for matchmaking.', 'error');
      return;
    }

    console.log('[MATCHMAKER] Validation passed');
    setIsMatching(true);
    setMatchedStack(null);

    try {
      console.log('[MATCHMAKER] Planner request started');
      const planRes = await apiClient.post<any>('/api/v1/ai/plan', {
        query: matchmakerPrompt,
        routingMode: 'balanced',
        budget: 2.0
      });
      console.log('[MATCHMAKER] Planner response received', planRes);

      if (!planRes) {
        throw new Error('Planner API returned an empty response.');
      }

      if (!planRes.success) {
        throw new Error(planRes.message || 'Planner API returned failure.');
      }

      const resData = planRes.data;
      if (resData && Array.isArray(resData.nodes) && resData.nodes.length > 0) {
        const chainItems = resData.nodes.map((node: any) => ({
          nodeId: node.id,
          stageName: node.label || node.task || node.id.toUpperCase(),
          capability: node.capability,
          agentId: node.agentId || `agent-${node.capability}-1`,
          agentName: node.label || node.id.toUpperCase(),
          reason: 'Best match capability',
          cost: node.cost || 0.10,
          time: '1s',
          trustScore: 95
        }));

        setMatchedStack({
          chain: chainItems,
          cost: resData.estimated_cost || 0.30,
          time: `${resData.estimated_duration_seconds || 5}s`,
          intent: resData.intent || 'General task execution',
          complexity: resData.complexity || 'Medium',
          riskAssessment: resData.riskAssessment || 'None',
          thought: resData.thought || ''
        });
        console.log('[MATCHMAKER] Workflow rendered');
      } else {
        console.log('[MATCHMAKER] Planner API succeeded but no workflow appeared:');
        console.log('- response data:', planRes);
        console.log('- parsed agents:', resData?.nodes?.map((n: any) => n.agentId || n.id) || []);
        console.log('- parsed edges:', resData?.edges || []);
        console.log('- workflow nodes count:', resData?.nodes?.length || 0);
        throw new Error('No workflow nodes returned in the planner response data.');
      }
    } catch (err: any) {
      console.error('[MATCHMAKER] Error:', err);
      toast(`Matchmaker calculation failed: ${err.message}`, 'error');
    } finally {
      setIsMatching(false);
    }
  };

  // Local matching filters
  const displayedAgents = agentsList.filter(agent => {
    const matchesFavorites = !showOnlyFavorites || favorites.includes(agent.id);
    const matchesTrust = agent.trustScore >= minTrustScore;
    const matchesPrice = agent.price <= maxPrice;
    
    // Tab filters
    let matchesTab = true;
    if (marketplaceTab === 'trending') {
      matchesTab = agent.downloads >= 5 || agent.verificationCount >= 10;
    } else if (marketplaceTab === 'featured') {
      matchesTab = agent.rating >= 4.5;
    } else if (marketplaceTab === 'verified') {
      matchesTab = agent.verificationStatus === 'verified';
    }

    return matchesFavorites && matchesTrust && matchesPrice && matchesTab;
  });

  const avgTrustScore = agentsList.length > 0 
    ? (agentsList.reduce((sum, a) => sum + Number(a.trustScore), 0) / agentsList.length).toFixed(1) 
    : '96.5';

  return (
    <div className="flex-grow max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Header banner */}
      <div className="relative glass-card p-8 rounded-3xl border border-border-dark bg-gradient-to-br from-bg-dark via-black/80 to-primary-neon/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,163,0.05),transparent_45%)]"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <Layers className="w-8 h-8 text-primary-neon" />
            Agent App Store
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Discover, evaluate, and install verified autonomous swarms. Lock secure USDC pricing channels.
          </p>
        </div>
        <div className="flex gap-4 relative z-10 shrink-0">
          <button
            onClick={() => {
              if (!user) {
                toast('Please login to publish agents', 'error');
                return;
              }
              setIsPublishModalOpen(true);
            }}
            className="bg-primary-neon text-black text-xs font-bold px-5 py-3 rounded-xl hover:brightness-110 flex items-center gap-1.5 transition-all font-mono"
          >
            <Plus className="w-4 h-4" />
            Publish Swarm Node
          </button>
        </div>
      </div>

      {/* AI Swarm Matchmaker */}
      <div className="glass-card p-6 rounded-2xl border border-primary-neon/20 bg-primary-neon/5 flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-neon/5 blur-[100px] rounded-full"></div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-neon animate-pulse" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            AI Swarm Matchmaker
          </h2>
          <span className="text-[9px] bg-primary-neon text-black font-extrabold px-1.5 py-0.5 rounded font-mono uppercase">
            Optimization Engine
          </span>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl font-mono leading-relaxed relative z-10">
          Describe your task prompt below. The matching engine dynamically sequences best-suited agent layers, calculates SLA latencies, and locks CAP USDC pricing channels.
        </p>

        <div className="flex flex-col md:flex-row gap-3 relative z-10">
          <input
            type="text"
            className="flex-grow bg-black/60 border border-border-dark focus:border-primary-neon/50 px-4 py-3 rounded-xl text-xs text-white outline-none font-mono placeholder-gray-600"
            placeholder="e.g. Compile a quarterly report for Tesla and audit contract compliance limits..."
            value={matchmakerPrompt}
            onChange={(e) => setMatchmakerPrompt(e.target.value)}
          />
          <button
            onClick={handleMatchmaker}
            disabled={isMatching || !matchmakerPrompt.trim()}
            className="bg-primary-neon text-black text-xs font-bold px-6 py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono shrink-0"
          >
            {isMatching ? 'Calculating Stack...' : 'Find Optimal Swarm Stack'}
          </button>
        </div>

        {matchedStack && (
          <div className="border border-border-dark bg-black/85 p-6 rounded-2xl flex flex-col gap-6 mt-3 transition-all relative z-10 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-dark/50 pb-4 gap-4">
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary-neon animate-pulse" />
                  OPTIMAL SWARM STACK COMPILATION
                </h3>
              </div>
              <div className="flex items-center gap-6 shrink-0 font-mono text-xs w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Total Swarm Cost</span>
                  <span className="text-secondary-neon font-bold text-sm mt-0.5">{matchedStack.cost.toFixed(2)} USDC</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Max Pipeline Latency</span>
                  <span className="text-white font-bold text-sm mt-0.5">{matchedStack.time}</span>
                </div>
                <Link
                  href={`/workflow?prompt=${encodeURIComponent(matchmakerPrompt)}`}
                  className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all font-sans"
                >
                  Create Workflow &rarr;
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-primary-neon/10 border border-primary-neon/30 text-primary-neon px-2.5 py-1 rounded-lg">
                Intent: {matchedStack.intent}
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${
                matchedStack.complexity === 'Enterprise' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                matchedStack.complexity === 'Large' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
                matchedStack.complexity === 'Medium' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                'bg-green-500/10 border-green-500/30 text-green-400'
              }`}>
                Complexity: {matchedStack.complexity}
              </span>
            </div>

            {matchedStack.thought && (
              <div className="bg-white/5 border border-border-dark/50 p-4 rounded-xl flex flex-col gap-2 font-mono text-[11px] leading-relaxed">
                <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider">AI Planning Thoughts</span>
                <p className="text-gray-300 whitespace-pre-wrap">{matchedStack.thought}</p>
              </div>
            )}

            {matchedStack.riskAssessment && matchedStack.riskAssessment !== 'None' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex flex-col gap-1 font-mono text-[11px]">
                <span className="text-yellow-400 uppercase text-[9px] font-bold tracking-wider">Risk & Fallback Assessment</span>
                <p className="text-yellow-200">{matchedStack.riskAssessment}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {matchedStack.chain.map((step: any, idx: number) => (
                <div key={step.nodeId || idx} className="flex flex-col gap-2">
                  <div className="bg-white/5 border border-border-dark p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary-neon/20 transition-all">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-primary-neon/10 border border-primary-neon/20 px-2 py-0.5 rounded text-primary-neon font-mono font-bold">{step.nodeId}</span>
                        <span className="text-xs font-extrabold text-white">{step.stageName}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">Capability: {step.capability}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 shrink-0">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-gray-500">STAGE FEE</span>
                        <span className="text-primary-neon font-bold">{step.cost.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] text-gray-500">LATENCY</span>
                        <span className="text-white font-bold">{step.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Advanced Filters Panel */}
        <div className="lg:col-span-1 glass-card p-5 rounded-2xl border border-border-dark flex flex-col gap-6">
          <div className="flex justify-between items-center pb-3 border-b border-border-dark">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-neon" />
              Advanced Filters
            </h3>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setOnlyVerified(false);
                setMinTrustScore(0);
                setMaxPrice(0.5);
                setShowOnlyFavorites(false);
              }}
              className="text-[10px] text-gray-500 hover:text-white font-mono"
            >
              Reset
            </button>
          </div>

          {/* Search bar */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500">Keyword Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                className="w-full bg-black/40 border border-border-dark focus:border-primary-neon/40 pl-9 pr-3 py-2.5 rounded-xl text-xs text-white outline-none"
                placeholder="Search name, skills, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500">Category</label>
            <div className="flex flex-wrap gap-1">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-mono transition-all ${
                    selectedCategory === c 
                      ? 'bg-primary-neon/10 border-primary-neon/40 text-primary-neon' 
                      : 'bg-black/20 border-border-dark text-gray-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300">
              <input 
                type="checkbox" 
                checked={onlyVerified} 
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-border-dark text-primary-neon focus:ring-primary-neon bg-black/60 w-4 h-4"
              />
              <span>Only CAP Verified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300">
              <input 
                type="checkbox" 
                checked={showOnlyFavorites} 
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                className="rounded border-border-dark text-primary-neon focus:ring-primary-neon bg-black/60 w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                Only Favorites
              </span>
            </label>
          </div>

          {/* Max Price Range Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Max Service Fee</span>
              <span className="text-white font-bold">{maxPrice.toFixed(2)} USDC</span>
            </div>
            <input 
              type="range" 
              min={0.01} 
              max={0.50} 
              step={0.01} 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="accent-primary-neon w-full cursor-pointer h-1 bg-border-dark rounded-lg"
            />
          </div>

          {/* Min Trust Score */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
              <span>Min Trust Score</span>
              <span className="text-white font-bold">{minTrustScore}%</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={100} 
              step={5} 
              value={minTrustScore} 
              onChange={(e) => setMinTrustScore(parseInt(e.target.value))}
              className="accent-primary-neon w-full cursor-pointer h-1 bg-border-dark rounded-lg"
            />
          </div>

          {/* Sorting */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-mono text-gray-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary-neon" />
              Sort Results
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-black/60 border border-border-dark px-3 py-2 rounded-xl text-xs text-white outline-none cursor-pointer font-mono"
            >
              <option value="trustScore">Highest Trust Score</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="latency">Fastest Latency</option>
            </select>
          </div>
        </div>

        {/* Agents Grid List */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* App-Store tabs selector */}
          <div className="flex flex-wrap gap-2 border-b border-border-dark pb-3">
            {[
              { id: 'all', label: 'All Nodes' },
              { id: 'trending', label: '🔥 Trending Swarms' },
              { id: 'featured', label: '💎 Featured Bids' },
              { id: 'verified', label: '🛡️ CAP Verified' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setMarketplaceTab(t.id as any)}
                className={`text-xs px-4 py-2 rounded-xl font-mono border transition-all ${
                  marketplaceTab === t.id
                    ? 'bg-primary-neon/15 border-primary-neon/40 text-primary-neon font-bold shadow-[0_0_8px_rgba(0,255,204,0.05)]'
                    : 'bg-white/5 border-border-dark text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
            <span>Found {displayedAgents.length} active swarm agent nodes</span>
            <span>Sorted by {sortBy}</span>
          </div>

          {isLoading && currentPage === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : displayedAgents.length === 0 ? (
            <div className="glass-card py-20 text-center text-gray-500 italic rounded-2xl border border-border-dark flex flex-col items-center gap-2">
              <span className="text-sm">No agents match your active search filters.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedAgents.map((agent) => {
                  if (!agent) return null;
                  const isFav = favorites.includes(agent.id);
                  const isInst = installed.includes(agent.id);
                  return (
                    <div 
                      key={agent.id} 
                      onClick={() => setSelectedAgent(agent)}
                      className="glass-card glass-card-hover p-6 rounded-2xl border border-border-dark flex flex-col justify-between h-[410px] relative overflow-hidden cursor-pointer transition-all duration-300"
                    >
                      {/* Top Info */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] bg-white/5 border border-border-dark px-2.5 py-1 rounded-md text-gray-400 font-mono uppercase tracking-wider">
                            {agent.category}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleToggleFavorite(agent.id, e)}
                              className="text-gray-500 hover:text-yellow-500 transition-all p-1 hover:bg-white/5 rounded-md"
                            >
                              <Star className={`w-4 h-4 ${isFav ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                            </button>
                            {agent.verificationStatus === 'verified' && (
                              <span className="text-primary-neon bg-primary-neon/10 border border-primary-neon/20 px-2 py-0.5 rounded text-[8px] font-mono font-extrabold uppercase tracking-wide flex items-center gap-0.5">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                VERIFIED
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-base font-extrabold text-white mb-0.5 flex items-center gap-1.5 leading-tight">
                          {agent.name}
                          <span className="text-[10px] text-gray-500 font-mono font-normal">v{agent.version}</span>
                        </h3>
                        
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4 mt-2">
                          {agent.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {agent.skills && agent.skills.slice(0, 3).map((skill: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="text-[9px] bg-black/40 border border-border-dark text-gray-300 px-2.5 py-1 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats details */}
                      <div className="pt-4 border-t border-border-dark">
                        <div className="grid grid-cols-2 gap-3 mb-4 text-[10px] font-mono">
                          <div className="flex flex-col">
                            <span className="text-gray-500">Trust Score</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.trustScore}%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Latency (SLA)</span>
                            <span className="text-white font-extrabold mt-0.5">{agent.latency}ms</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5 text-gray-500" />
                            DOWNLOADS:
                          </span>
                          <span className="text-white font-bold">{agent.downloads || 0}</span>
                        </div>

                        {/* Install / Uninstall Actions */}
                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-border-dark gap-2">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-gray-500 font-mono">Service Fee</span>
                            <span className="text-sm font-extrabold text-primary-neon font-mono mt-0.5">
                              {Number(agent.price || 0).toFixed(2)} <span className="text-[10px] text-gray-400 font-normal">USDC</span>
                            </span>
                          </div>
                          <button
                            onClick={(e) => handleToggleInstall(agent.id, e)}
                            className={`text-[10px] font-bold px-4 py-2 rounded-xl transition-all font-mono flex items-center gap-1 ${
                              isInst 
                                ? 'bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500/25' 
                                : 'bg-primary-neon text-black hover:brightness-110'
                            }`}
                          >
                            {isInst ? 'Uninstall' : 'Install'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center items-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="bg-white/5 border border-border-dark hover:bg-white/10 px-8 py-3.5 rounded-xl text-white font-mono text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Loading Swarms...' : 'Load More Swarm Nodes'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>

      {/* Publish Agent Modal Form */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <form 
            onSubmit={handlePublish}
            className="glass-card border border-border-dark w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col p-6 gap-4 bg-gradient-to-b from-bg-dark to-black text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-border-dark pb-3">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5 uppercase font-mono">
                <Plus className="w-5 h-5 text-primary-neon" />
                Publish Swarm Node
              </h2>
              <button 
                type="button" 
                onClick={() => setIsPublishModalOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">AGENT NAME</label>
                <input 
                  type="text" 
                  required
                  value={pubName} 
                  onChange={(e) => setPubName(e.target.value)}
                  placeholder="e.g. LegalSwarm Pro"
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">CATEGORY</label>
                <select 
                  value={pubCategory}
                  onChange={(e) => setPubCategory(e.target.value)}
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                >
                  <option value="Research">Research</option>
                  <option value="Finance">Finance</option>
                  <option value="Legal">Legal</option>
                  <option value="Coding">Coding</option>
                  <option value="Security">Security</option>
                  <option value="Translation">Translation</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gray-500 font-mono">DESCRIPTION</label>
              <textarea 
                required
                value={pubDesc}
                onChange={(e) => setPubDesc(e.target.value)}
                placeholder="Detailed capabilities, execution limits, and agent profiles description..."
                className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none resize-none h-[75px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-gray-500 font-mono">CAPABILITIES / SKILLS (comma-separated)</label>
              <input 
                type="text" 
                required
                value={pubSkills}
                onChange={(e) => setPubSkills(e.target.value)}
                placeholder="e.g. contracts, verification, audit"
                className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">BASE COST (USDC)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={pubPrice}
                  onChange={(e) => setPubPrice(parseFloat(e.target.value))}
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">SLA LATENCY LIMIT (ms)</label>
                <input 
                  type="number" 
                  required
                  value={pubLatency}
                  onChange={(e) => setPubLatency(parseInt(e.target.value))}
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">ENDPOINT URL</label>
                <input 
                  type="text" 
                  required
                  value={pubEndpoint}
                  onChange={(e) => setPubEndpoint(e.target.value)}
                  placeholder="https://swarm.api/v1"
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono">LOGO IMAGE URL</label>
                <input 
                  type="text" 
                  value={pubLogoUrl}
                  onChange={(e) => setPubLogoUrl(e.target.value)}
                  placeholder="https://image-source.com/logo.png"
                  className="bg-black/60 border border-border-dark focus:border-primary-neon/50 p-2.5 rounded-lg text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPublishing}
              className="bg-primary-neon text-black font-extrabold py-3 rounded-xl hover:brightness-110 transition-all font-mono uppercase tracking-wider mt-2"
            >
              {isPublishing ? 'Publishing Swarm Node...' : 'Register Swarm Node'}
            </button>
          </form>
        </div>
      )}

      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}

    </div>
  );
}
