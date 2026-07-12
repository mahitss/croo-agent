'use client';

import { useState, useEffect } from 'react';
import { useMode } from '../../providers/ModeProvider';
import { useAuthStore } from '../../store/authStore';
import { Settings, Shield, Key, Eye, EyeOff, Check, RefreshCw } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { isDemoMode, toggleMode: toggleDemoMode } = useMode();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('nx_live_51h4b9c82f0d912e847c5d0124f923b0d26');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setDisplayName(user.displayName || user.username || '');
    }
  }, [user]);

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast('Settings preferences updated successfully.', 'success');
    }, 800);
  };

  const handleRegenerateKey = () => {
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`nx_live_${randomHex}`);
    toast('API Key successfully regenerated.', 'info');
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
            <p className="text-[10px] text-gray-500 mt-1 uppercase">Configure profiles, node parameters and credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Navigation sections */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="glass-card border border-border-dark p-5 rounded-2xl flex flex-col gap-1.5 shadow-lg">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Workspace</span>
              <button className="w-full text-left py-2 px-3 bg-white/5 border border-primary-neon/20 text-primary-neon rounded-lg font-bold transition-all">
                Profile Settings
              </button>
              <button className="w-full text-left py-2 px-3 hover:bg-white/5 hover:text-white rounded-lg transition-all text-gray-400">
                Node Connections
              </button>
              <button className="w-full text-left py-2 px-3 hover:bg-white/5 hover:text-white rounded-lg transition-all text-gray-400">
                Security Keys
              </button>
            </div>
          </div>

          {/* Right Column: Settings contents */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Profile Config */}
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

            {/* Execution preferences */}
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

            {/* Save Buttons */}
            <div className="flex justify-end gap-3">
              <button
                disabled={isSaving}
                onClick={handleSave}
                className="bg-gradient-to-r from-primary-neon to-accent-blue text-black text-xs font-extrabold px-6 py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono shadow-md flex items-center gap-1.5"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Updating config...
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Commit Configuration
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
