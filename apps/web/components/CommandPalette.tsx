'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useNexusStore } from '../store/nexusStore';
import { Search, Sparkles, Navigation, Wallet, Settings, Terminal } from 'lucide-react';

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const depositUserWallet = useNexusStore((state) => state.depositUserWallet);
  const agents = useNexusStore((state) => state.agents);

  const navigationCommands = [
    { title: 'Go to Portal', description: 'Run intentions and watch swarms', path: '/', icon: Navigation },
    { title: 'Go to Marketplace', description: 'Browse all active agent nodes', path: '/marketplace', icon: Sparkles },
    { title: 'Go to Workflow Builder', description: 'Construct visual node structures', path: '/workflow', icon: Terminal },
    { title: 'Go to Dashboard', description: 'View analytics and earnings', path: '/dashboard', icon: Settings },
    { title: 'Go to Wallet', description: 'Audit USDC transactions and credits', path: '/wallet', icon: Wallet },
  ];

  const quickActionCommands = [
    { title: 'Deposit Sandbox Credits', description: 'Instantly add 50.00 USDC credits to user wallet', action: () => depositUserWallet(50.0), icon: Wallet }
  ];

  // Filter commands
  const filteredNav = navigationCommands.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  ).map(a => ({
    title: `Hire: ${a.name}`,
    description: `${a.category} agent • Fee: ${a.price} USDC`,
    path: `/marketplace?search=${a.name}`,
    icon: Sparkles
  }));

  const filteredActions = quickActionCommands.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const allCommands = [...filteredNav, ...filteredAgents, ...filteredActions];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = (cmd: any) => {
    if (cmd.path) {
      router.push(cmd.path);
    } else if (cmd.action) {
      cmd.action();
    }
    setIsOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allCommands.length) % allCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allCommands[selectedIndex]) {
        handleSelect(allCommands[selectedIndex]);
      }
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-card-dark border border-border-dark hover:border-primary-neon/40 hover:bg-white/5 text-gray-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all duration-300 shadow-lg"
      >
        <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Ctrl K</span>
        <span>Command Palette</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="glass-card border border-border-dark w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-dark">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
            placeholder="Type a command or search agents..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="text-[10px] text-gray-500 bg-white/5 border border-border-dark px-2 py-0.5 rounded font-mono">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          {allCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500 italic">
              No command matches your search term.
            </div>
          ) : (
            allCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(cmd)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                    isSelected 
                      ? 'bg-primary-neon/10 border border-primary-neon/20 text-white' 
                      : 'hover:bg-white/2 text-gray-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-primary-neon/20 text-primary-neon' : 'bg-white/5 text-gray-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold leading-tight truncate">{cmd.title}</h4>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{cmd.description}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
