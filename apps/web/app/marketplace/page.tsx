'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Cpu, 
  Layers, 
  Download, 
  Clock, 
  BookOpen, 
  CheckCircle2,
  Code,
  Box,
  Database,
  Terminal,
  Key,
  RefreshCw,
  Trash2,
  Check,
  UserCheck,
  Zap,
  Package,
  Wrench,
  FileCode,
  Share2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/Toast';
import { useNexusStore } from '../../store/nexusStore';
import { 
  MarketplaceEcosystemService, 
  EcosystemAsset, 
  EcosystemCategory 
} from '../../services/marketplace-ecosystem.service';

const CATEGORIES: { id: string; label: string; icon: any }[] = [
  { id: 'all', label: 'All Ecosystem Assets', icon: Package },
  { id: 'agents', label: 'AI Agents', icon: Cpu },
  { id: 'models', label: 'Foundation Models', icon: Zap },
  { id: 'plugins', label: 'Plugins', icon: Wrench },
  { id: 'knowledge', label: 'Knowledge Packs', icon: Database },
  { id: 'tools', label: 'Security & QA Tools', icon: Code },
  { id: 'connectors', label: 'DB Connectors', icon: Share2 },
  { id: 'templates', label: 'Swarm Templates', icon: Layers },
  { id: 'mcp', label: 'MCP Servers', icon: Terminal },
];

export default function MarketplacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [catalog, setCatalog] = useState<EcosystemAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocAsset, setSelectedDocAsset] = useState<EcosystemAsset | null>(null);

  const fetchCatalog = async () => {
    setLoading(true);
    try {
      const items = await MarketplaceEcosystemService.getCatalog(selectedCategory, search);
      setCatalog(items);
    } catch (e) {
      console.warn('[MARKETPLACE] Failed to fetch catalog:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory, search]);

  const handleInstall = async (asset: EcosystemAsset) => {
    const res = await MarketplaceEcosystemService.installAsset(asset.id);
    toast(res.message, 'success');
    setCatalog(prev => prev.map(a => a.id === asset.id ? { ...a, isInstalled: true } : a));
  };

  const handleUpdate = async (asset: EcosystemAsset) => {
    const res = await MarketplaceEcosystemService.updateAsset(asset.id);
    toast(res.message, 'success');
    setCatalog(prev => prev.map(a => a.id === asset.id ? { ...a, version: a.latestVersion, hasUpdate: false } : a));
  };

  const handleRemove = async (asset: EcosystemAsset) => {
    const res = await MarketplaceEcosystemService.removeAsset(asset.id);
    toast(res.message, 'info');
    setCatalog(prev => prev.map(a => a.id === asset.id ? { ...a, isInstalled: false } : a));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 select-none animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Enterprise AI Ecosystem & Marketplace</span>
            <Sparkles className="w-5 h-5 text-[#4EA3FF]" />
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Install verified AI agents, foundation models, MCP servers, knowledge packs, and connectors directly into Workflow Builder.
          </p>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search ecosystem assets, MCP servers, models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#232323] focus:border-[#4EA3FF] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none"
          />
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isActive 
                  ? 'bg-white/10 text-white border-white/20 shadow-lg' 
                  : 'bg-[#111111] text-gray-400 border-[#232323] hover:text-white hover:border-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4EA3FF]' : 'text-gray-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Catalog Grid */}
      {catalog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {catalog.map((asset) => (
            <div
              key={asset.id}
              className="bg-[#111111] border border-[#232323] hover:border-[#4EA3FF]/30 p-6 rounded-2xl flex flex-col justify-between gap-5 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-3">
                {/* Header Category & Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4EA3FF]/10 text-[#4EA3FF] border border-[#4EA3FF]/20">
                      {asset.category}
                    </span>
                    {asset.verified && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{asset.version}</span>
                </div>

                {/* Title & Author */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-bold text-white group-hover:text-[#4EA3FF] transition-colors">
                    {asset.name}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                    <span>by</span>
                    <strong className="text-gray-300">{asset.author.name}</strong>
                    {asset.author.verified && <UserCheck className="w-3 h-3 text-[#4EA3FF]" />}
                  </span>
                </div>

                <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-2">
                  {asset.description}
                </p>

                {/* Compatibility Tags */}
                <div className="flex items-center gap-1 flex-wrap">
                  {asset.compatibility.map((comp, i) => (
                    <span key={i} className="text-[9px] font-mono text-gray-400 bg-[#050505] px-1.5 py-0.5 rounded border border-[#232323]">
                      {comp}
                    </span>
                  ))}
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-[#232323] text-[10px] font-mono">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Rating</span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" /> {asset.rating} ({asset.reviewsCount})
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Installs</span>
                    <span className="text-white font-bold">{asset.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Price</span>
                    <span className="text-emerald-400 font-bold">{asset.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                <button
                  onClick={() => setSelectedDocAsset(asset)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white cursor-pointer font-mono"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Docs & Specs</span>
                </button>

                <div className="flex items-center gap-2">
                  {asset.isInstalled ? (
                    <>
                      {asset.hasUpdate && (
                        <button
                          onClick={() => handleUpdate(asset)}
                          className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-semibold px-2.5 py-1.5 rounded-xl cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" /> Update
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(asset)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl cursor-pointer"
                        title="Uninstall Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                        <Check className="w-3.5 h-3.5" /> Installed
                      </span>
                    </>
                  ) : (
                    <button
                      onClick={() => handleInstall(asset)}
                      className="flex items-center gap-1.5 bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer border-0 shadow"
                    >
                      <span>Install Asset</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#111111] border border-[#232323] rounded-2xl space-y-2 font-mono text-xs text-gray-500">
          <div className="text-white font-bold text-sm font-sans">No Ecosystem Assets Found</div>
          <div>No items matching category &quot;{selectedCategory}&quot; or search &quot;{search}&quot;.</div>
        </div>
      )}

      {/* Specs & Documentation Modal */}
      {selectedDocAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in font-sans">
          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#232323]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#4EA3FF]" />
                <h3 className="text-lg font-bold text-white">{selectedDocAsset.name}</h3>
              </div>
              <button
                onClick={() => setSelectedDocAsset(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">Documentation & Spec</span>
                <p className="text-gray-300 mt-1 leading-relaxed">{selectedDocAsset.docs}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">Required Permissions</span>
                <div className="flex gap-1.5 mt-1 flex-wrap font-mono">
                  {selectedDocAsset.permissions.map((p, i) => (
                    <span key={i} className="bg-[#050505] text-amber-400 border border-[#232323] px-2 py-0.5 rounded text-[10px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">Developer Trust Profile</span>
                <div className="bg-[#050505] p-3 rounded-xl border border-[#232323] mt-1 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-white font-bold">{selectedDocAsset.author.name}</span>
                  <span className="text-emerald-400 font-bold">{selectedDocAsset.author.trustScore}% Trust Score</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedDocAsset(null)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl cursor-pointer text-xs transition-all"
            >
              Close Specifications
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
