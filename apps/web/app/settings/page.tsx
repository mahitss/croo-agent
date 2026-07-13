'use client';

import { useState, useEffect } from 'react';
import { useMode } from '../../providers/ModeProvider';
import { useAuthStore } from '../../store/authStore';
import { Settings, Shield, Key, Eye, EyeOff, Check, RefreshCw, Database, Search, Plus, Compass, Sliders, ArrowRight } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { isDemoMode, toggleMode: toggleDemoMode } = useMode();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const logoutEverywhere = useAuthStore((state) => state.logoutEverywhere);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'memory' | 'security'>('profile');
  const [displayName, setDisplayName] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('nx_live_51h4b9c82f0d912e847c5d0124f923b0d26');
  const [isSaving, setIsSaving] = useState(false);

  // Memory Panel States
  const [memoryInput, setMemoryInput] = useState('');
  const [memoryId, setMemoryId] = useState('');
  const [memoryType, setMemoryType] = useState('knowledge');
  const [memoryMeta, setMemoryMeta] = useState('{"source": "user-settings"}');
  const [searchQuery, setSearchQuery] = useState('');
  const [similarityThreshold, setSimilarityThreshold] = useState(0.05);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isStoring, setIsStoring] = useState(false);

  // Preference Panel States
  const [prefKey, setPrefKey] = useState('');
  const [prefVal, setPrefVal] = useState('');
  const [allPrefs, setAllPrefs] = useState<Record<string, string>>({});
  const [isSavingPref, setIsSavingPref] = useState(false);

  // Compression Panel States
  const [sessionId, setSessionId] = useState('session-default');
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionResult, setCompressionResult] = useState('');

  useEffect(() => {
    setMounted(true);
    if (user) {
      setDisplayName(user.displayName || user.username || '');
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch(`/api/v1/memory/preferences?userId=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const body = await res.json();
        if (body.success && body.data) {
          setAllPrefs(body.data);
        }
      }
    } catch (e) {
      console.error('Failed to load preferences:', e);
    }
  };

  if (!mounted) {
    return (
      <div className="flex-1 bg-bg-dark flex items-center justify-center font-mono text-xs text-gray-500">
        Loading system configuration...
      </div>
    );
  }

  // Auth Guard
  if (!token || !user) {
    return (
      <div className="flex-1 bg-bg-dark flex items-center justify-center p-6 font-mono">
        <div className="glass-card max-w-md w-full border border-border-dark p-8 rounded-2xl text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">Access Restrained</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            Authentication is required to view your node configurations and API credentials. Please sign in to proceed.
          </p>
          <button
            onClick={() => setAuthModal(true, 'login')}
            className="w-full bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold py-2.5 rounded-xl hover:brightness-110 transition-all font-mono"
          >
            Authorize Session
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast('Profile identity changes successfully stored.', 'success');
    }, 850);
  };

  const handleRegenerateKey = () => {
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`nx_live_${randomHex}`);
    toast('API Key successfully regenerated.', 'info');
  };

  // Memory Actions
  const handleStoreMemory = async () => {
    if (!memoryInput.trim()) {
      toast('Memory content cannot be blank.', 'error');
      return;
    }
    setIsStoring(true);
    const mId = memoryId.trim() || `mem-${Date.now()}`;
    let meta = {};
    try {
      meta = JSON.parse(memoryMeta);
    } catch(e) {
      toast('Invalid JSON metadata syntax. Bypassing metadata properties.', 'warn');
    }

    try {
      const res = await fetch('/api/v1/memory/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: mId,
          user_id: user.id,
          memory_type: memoryType,
          content: memoryInput,
          metadata: meta
        })
      });
      const data = await res.json();
      if (data.success) {
        toast('New long-term fact record stored into semantic memory.', 'success');
        setMemoryInput('');
        setMemoryId('');
      } else {
        toast(data.message || 'Failed to save memory.', 'error');
      }
    } catch(e: any) {
      toast(`Memory storage failed: ${e.message}`, 'error');
    } finally {
      setIsStoring(false);
    }
  };

  const handleSearchMemory = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch('/api/v1/memory/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          query: searchQuery,
          limit: 5
        })
      });
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.data || []);
        toast(`Retrieved ${data.data?.length || 0} matching semantic memories.`, 'success');
      }
    } catch(e: any) {
      toast(`Semantic query failed: ${e.message}`, 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSavePref = async () => {
    if (!prefKey.trim() || !prefVal.trim()) {
      toast('Preference key and value are required.', 'error');
      return;
    }
    setIsSavingPref(true);
    try {
      const res = await fetch('/api/v1/memory/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          pref_key: prefKey,
          pref_value: prefVal
        })
      });
      const data = await res.json();
      if (data.success) {
        toast('Preference value successfully updated.', 'success');
        setPrefKey('');
        setPrefVal('');
        loadPreferences();
      }
    } catch(e: any) {
      toast(`Failed to save preference: ${e.message}`, 'error');
    } finally {
      setIsSavingPref(false);
    }
  };

  const handleCompressMemory = async () => {
    setIsCompressing(true);
    setCompressionResult('');
    try {
      const res = await fetch('/api/v1/memory/compress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        setCompressionResult(data.summary || 'Summary generated.');
        toast('Conversation successfully summarized and archived into long-term context.', 'success');
      } else {
        toast('Failed to compress conversation history.', 'error');
      }
    } catch(e: any) {
      toast(`Compression request failed: ${e.message}`, 'error');
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex-grow bg-bg-dark text-gray-300 font-mono text-xs p-6 md:p-10 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-border-dark">
          <div className="w-10 h-10 rounded-xl bg-primary-neon/10 border border-primary-neon/20 flex items-center justify-center text-primary-neon">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white uppercase tracking-widest leading-none">System Settings</h1>
            <p className="text-[10px] text-gray-500 mt-1 uppercase">Configure profiles, memories, and credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Navigation */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="glass-card border border-border-dark p-5 rounded-2xl flex flex-col gap-1.5 shadow-lg">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Workspace</span>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-2 px-3 rounded-lg font-bold transition-all ${
                  activeTab === 'profile' ? 'bg-white/5 border border-primary-neon/20 text-primary-neon' : 'hover:bg-white/5 hover:text-white text-gray-400'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('memory')}
                className={`w-full text-left py-2 px-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'memory' ? 'bg-white/5 border border-primary-neon/20 text-primary-neon' : 'hover:bg-white/5 hover:text-white text-gray-400'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Persistent Memory
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left py-2 px-3 rounded-lg font-bold transition-all ${
                  activeTab === 'security' ? 'bg-white/5 border border-primary-neon/20 text-primary-neon' : 'hover:bg-white/5 hover:text-white text-gray-400'
                }`}
              >
                Security Credentials
              </button>
            </div>
          </div>

          {/* Right Dashboard Settings Area */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* TABS 1: PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="flex flex-col gap-6">
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-neon/5 rounded-full filter blur-3xl pointer-events-none" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark">User Identity</h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-black/60 border border-border-dark focus:border-primary-neon/40 hover:border-white/10 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                      placeholder="Enter your system handle"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Username</label>
                      <input
                        type="text"
                        disabled
                        value={user.username || ''}
                        className="bg-black/20 border border-border-dark/50 text-gray-500 rounded-xl px-4 py-2.5 font-mono text-xs cursor-not-allowed"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Role Hierarchy</label>
                      <input
                        type="text"
                        disabled
                        value={(user.role || 'user').toUpperCase()}
                        className="bg-black/20 border border-border-dark/50 text-gray-500 rounded-xl px-4 py-2.5 font-mono text-xs cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Primary Email</label>
                    <input
                      type="email"
                      disabled
                      value={user.email || ''}
                      className="bg-black/20 border border-border-dark/50 text-gray-500 rounded-xl px-4 py-2.5 font-mono text-xs cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Runtime Controls */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark">Runtime Controls</h3>
                  
                  <div className="flex items-center justify-between bg-black/40 border border-border-dark/60 rounded-xl p-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-white uppercase text-[10px]">Development Demo Mode</span>
                      <span className="text-[9px] text-gray-500 leading-normal uppercase">Locks wallet balances and simulates agent node transactions locally</span>
                    </div>
                    <button
                      onClick={toggleDemoMode}
                      className={`text-[9px] font-bold uppercase px-3 py-1.5 rounded-md border tracking-wider transition-all duration-300 ${
                        isDemoMode
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 hover:bg-yellow-400/30'
                          : 'bg-primary-neon/20 border-primary-neon text-primary-neon hover:bg-primary-neon/30'
                      }`}
                    >
                      {isDemoMode ? 'Demo Mode Active' : 'Live Mode Enabled'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={isSaving}
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-6 py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono shadow-md flex items-center gap-1.5"
                  >
                    {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Commit Identity Changes
                  </button>
                </div>
              </div>
            )}

            {/* TABS 2: PERSISTENT MEMORY CONSOLE */}
            {activeTab === 'memory' && (
              <div className="flex flex-col gap-6">
                
                {/* Fact Base Manager */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary-neon" /> Write Long-term Knowledge Memory
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Memory ID (optional)</label>
                      <input
                        type="text"
                        value={memoryId}
                        onChange={(e) => setMemoryId(e.target.value)}
                        placeholder="Unique reference key (auto-generated if empty)"
                        className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Type</label>
                      <select
                        value={memoryType}
                        onChange={(e) => setMemoryType(e.target.value)}
                        className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                      >
                        <option value="knowledge">Knowledge Base</option>
                        <option value="agent">Agent Memory</option>
                        <option value="long-term">Long-term Memory</option>
                        <option value="workflow">Workflow History</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Memory Content (Facts, FAQs, Docs)</label>
                    <textarea
                      value={memoryInput}
                      onChange={(e) => setMemoryInput(e.target.value)}
                      rows={3}
                      placeholder="Insert semantic sentences (e.g. 'Tesla Q1 revenue hit 21.3 billion dollars. Margins dropped by 12% due to price adjustments.')"
                      className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Metadata JSON PROPERTIES</label>
                    <input
                      type="text"
                      value={memoryMeta}
                      onChange={(e) => setMemoryMeta(e.target.value)}
                      className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleStoreMemory}
                      disabled={isStoring}
                      className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center gap-1.5"
                    >
                      {isStoring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
                      Index Fact Passage
                    </button>
                  </div>
                </div>

                {/* Semantic Vector Retriever Test */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark flex items-center gap-2">
                    <Search className="w-4 h-4 text-accent-blue" /> TF-IDF Semantic Vector Retriever
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter semantic query to search memory database..."
                      className="flex-grow bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                    />
                    <button
                      onClick={handleSearchMemory}
                      disabled={isSearching}
                      className="bg-white/10 hover:bg-white/15 border border-border-dark text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all font-mono flex items-center gap-1.5"
                    >
                      {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sliders className="w-3.5 h-3.5" />}
                      Search Index
                    </button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-3 mt-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Vector Search Results:</span>
                      {searchResults.map((res, i) => (
                        <div key={i} className="border border-border-dark/60 bg-black/30 rounded-xl p-3.5 flex flex-col gap-2 relative overflow-hidden">
                          <div className="absolute top-0 right-0 px-2 py-0.5 bg-accent-blue/10 border-l border-b border-accent-blue/30 text-[9px] text-accent-blue font-bold tracking-widest uppercase">
                            Similarity: {res.similarity}
                          </div>
                          <span className="text-[10px] font-bold text-white">{res.id} ({res.memory_type.toUpperCase()})</span>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{res.content}</p>
                          {res.metadata && Object.keys(res.metadata).length > 0 && (
                            <span className="text-[9px] text-gray-600 font-mono mt-1">META: {JSON.stringify(res.metadata)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    searchQuery.trim() && !isSearching && (
                      <span className="text-[10px] text-gray-500 mt-2 text-center block">No semantic matches found above threshold</span>
                    )
                  )}
                </div>

                {/* Key-Value User Preferences */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-yellow-400" /> User Preferences Manager
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Preference Key</label>
                      <input
                        type="text"
                        value={prefKey}
                        onChange={(e) => setPrefKey(e.target.value)}
                        placeholder="e.g. default_llm"
                        className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 uppercase font-bold">Preference Value</label>
                      <input
                        type="text"
                        value={prefVal}
                        onChange={(e) => setPrefVal(e.target.value)}
                        placeholder="e.g. gpt-4o-mini"
                        className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSavePref}
                      disabled={isSavingPref}
                      className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center gap-1.5"
                    >
                      {isSavingPref ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Save Preference
                    </button>
                  </div>

                  {Object.keys(allPrefs).length > 0 && (
                    <div className="mt-4 border-t border-border-dark/60 pt-4">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Stored Preferences:</span>
                      <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-xl p-3 border border-border-dark/40">
                        {Object.entries(allPrefs).map(([k, v]) => (
                          <div key={k} className="flex justify-between border-b border-border-dark/30 py-1.5 text-[10px]">
                            <span className="text-gray-500">{k}:</span>
                            <span className="text-white font-bold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Conversation Memory Compression Console */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark flex items-center gap-2">
                    <Compass className="w-4 h-4 text-purple-400" /> Short-term Memory Compression
                  </h3>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Session / Thread ID</label>
                    <input
                      type="text"
                      value={sessionId}
                      onChange={(e) => setSessionId(e.target.value)}
                      className="bg-black/60 border border-border-dark focus:border-primary-neon/40 rounded-xl px-4 py-2.5 outline-none transition-all text-white font-mono text-xs"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleCompressMemory}
                      disabled={isCompressing}
                      className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all font-mono flex items-center gap-1.5"
                    >
                      {isCompressing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      Compress Thread History
                    </button>
                  </div>

                  {compressionResult && (
                    <div className="mt-4 bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Semantic Compressed Summary:</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{compressionResult}</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TABS 3: SECURITY KEYS */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-6">
                
                {/* API Credentials */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark">API Access Credentials</h3>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Secret Authentication Key</label>
                    <div className="relative flex items-center">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        readOnly
                        value={apiKey}
                        className="w-full bg-black/60 border border-border-dark rounded-xl pl-4 pr-20 py-2.5 outline-none text-white font-mono text-xs selection:bg-primary-neon/20 selection:text-white"
                      />
                      <div className="absolute right-2 flex items-center gap-1">
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none"
                        >
                          {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={handleRegenerateKey}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none"
                          title="Issue New Credentials Key"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-500 leading-normal mt-1 uppercase">
                      Do not share this key. Treat it like a password to access node interfaces programmatically.
                    </span>
                  </div>
                </div>

                {/* Session Security */}
                <div className="glass-card border border-border-dark p-6 rounded-2xl flex flex-col gap-5 shadow-lg">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-border-dark">Session Security</h3>
                  
                  <div className="flex items-center justify-between bg-black/40 border border-border-dark/60 rounded-xl p-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-white uppercase text-[10px]">Logout Everywhere</span>
                      <span className="text-[9px] text-gray-500 leading-normal uppercase">Terminate all active token sessions across all devices</span>
                    </div>
                    <button
                      onClick={async () => {
                        try {
                          await logoutEverywhere();
                          toast('Successfully logged out of all devices.', 'success');
                          setAuthModal(true, 'login');
                        } catch (err: any) {
                          toast(`Failed to logout everywhere: ${err.message}`, 'error');
                        }
                      }}
                      className="bg-red-500/20 border border-red-500 text-red-500 text-[9px] font-bold uppercase px-3 py-1.5 rounded-md hover:bg-red-500/30 tracking-wider transition-all duration-300"
                    >
                      Revoke All Sessions
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
