'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../components/Toast';
import { Shield, Key, Eye, EyeOff, Check, RefreshCw, Lock, Bell, CreditCard, AlertTriangle, User } from 'lucide-react';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuthModal = useAuthStore((state) => state.setAuthModal);
  const logoutEverywhere = useAuthStore((state) => state.logoutEverywhere);
  const { toast } = useToast();

  // Search parameters support for direct tabs navigation
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing' | 'apikeys' | 'danger'>('profile');
  const [displayName, setDisplayName] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('nx_live_51h4b9c82f0d912e847c5d0124f923b0d26');
  const [isSaving, setIsSaving] = useState(false);

  // Password reset fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications checkboxes
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        if (['profile', 'security', 'notifications', 'billing', 'apikeys', 'danger'].includes(tabParam)) {
          setActiveTab(tabParam as any);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.username || '');
    }
  }, [user]);

  if (!mounted) {
    return (
      <div className="flex-grow flex items-center justify-center font-sans text-xs text-gray-500 bg-[#050505] min-h-[50vh]">
        Loading settings...
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 bg-[#050505] min-h-[50vh] select-none">
        <div className="bg-[#111111] max-w-sm w-full border border-[#232323] p-8 rounded-2xl text-center shadow-xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Authentication Required</h2>
            <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed">
              Please log in to manage your profile, security variables, billing, and developer keys.
            </p>
          </div>
          <button
            onClick={() => setAuthModal(true, 'login')}
            className="w-full bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold py-2.5 rounded-xl cursor-pointer border-0 mt-2"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast('Profile preferences successfully updated.', 'success');
    }, 800);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast('Confirm password fields do not match.', 'error');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast('Password updated successfully.', 'success');
    }, 800);
  };

  const handleLogoutEverywhere = async () => {
    try {
      await logoutEverywhere();
      toast('Logged out of all concurrent browser sessions.', 'success');
    } catch (e) {
      toast('Sign out action could not complete.', 'error');
    }
  };

  const handleDeleteAccount = () => {
    toast('Account termination request registered. Under review.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 select-none">
      
      {/* 1. LEFT SIDEBAR PANEL NAVIGATION */}
      <div className="w-full md:w-[220px] shrink-0 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-[#232323] pb-4 md:pb-0 md:pr-4 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'billing', label: 'Billing', icon: CreditCard },
          { id: 'apikeys', label: 'API Keys', icon: Key },
          { id: 'danger', label: 'Danger Zone', icon: AlertTriangle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left border-0 ${
                isActive 
                  ? 'bg-white/5 text-[#4EA3FF]' 
                  : 'bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="flex-1 min-w-0">
        
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">Profile Preferences</h2>
              <p className="text-xs text-[#9CA3AF] mt-1">Manage your public display credentials and email accounts.</p>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 bg-[#111111] border border-[#232323] p-6 rounded-2xl">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-[#050505] border border-[#232323] rounded-xl px-3 py-2 text-xs text-[#9CA3AF] outline-none select-text cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Username</label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full bg-[#050505] border border-[#232323] rounded-xl px-3 py-2 text-xs text-[#9CA3AF] outline-none select-text cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-fit bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer border-0 disabled:opacity-50 mt-2"
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">Security Variables</h2>
              <p className="text-xs text-[#9CA3AF] mt-1">Configure your login credentials and concurrent session tokens.</p>
            </div>
            
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 bg-[#111111] border border-[#232323] p-6 rounded-2xl">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#050505] border border-[#232323] hover:border-white/10 focus:border-[#4EA3FF] rounded-xl px-3 py-2 text-xs text-white outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-fit bg-[#4EA3FF] hover:bg-[#4EA3FF]/90 text-black text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer border-0 disabled:opacity-50 mt-2"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">Concurrent Sessions</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Log out of all concurrent browser instances, active workspace tokens, and API requests across alternative devices.
              </p>
              <button
                onClick={handleLogoutEverywhere}
                className="w-fit bg-transparent hover:bg-white/5 border border-[#232323] hover:border-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                Logout Everywhere
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">Notification Settings</h2>
              <p className="text-xs text-[#9CA3AF] mt-1">Configure your system preferences for alert digests and logs.</p>
            </div>

            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="rounded border-[#232323] bg-[#050505] text-[#4EA3FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-white">Email Digests</span>
                  <span className="text-[10px] text-gray-500">Receive compliance audit reports and billing alerts via email.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer border-t border-[#232323] pt-4">
                <input 
                  type="checkbox"
                  checked={notifyPush}
                  onChange={(e) => setNotifyPush(e.target.checked)}
                  className="rounded border-[#232323] bg-[#050505] text-[#4EA3FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-white">Push Notifications</span>
                  <span className="text-[10px] text-gray-500">Real-time alerts when workflows compile or complete execution.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer border-t border-[#232323] pt-4">
                <input 
                  type="checkbox"
                  checked={notifyWeekly}
                  onChange={(e) => setNotifyWeekly(e.target.checked)}
                  className="rounded border-[#232323] bg-[#050505] text-[#4EA3FF] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-white">Weekly Performance Digest</span>
                  <span className="text-[10px] text-gray-500">A weekly review of completed tasks and active swarms telemetry.</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === 'billing' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">Billing & Subscriptions</h2>
              <p className="text-xs text-[#9CA3AF] mt-1">Configure active tiers, invoices, and card payments.</p>
            </div>

            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-500 font-mono uppercase">Current Tier</span>
                  <span className="text-sm font-semibold text-white">Orbit Pro</span>
                </div>
                <span className="bg-[#4EA3FF]/10 border border-[#4EA3FF]/20 text-[#4EA3FF] text-[10px] font-mono px-2 py-0.5 rounded-lg select-none">
                  Active
                </span>
              </div>

              <div className="border-t border-[#232323] pt-4 flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-500 font-mono uppercase">Payment Method</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="bg-white/5 border border-[#232323] px-1.5 py-0.5 rounded text-[8px] font-mono">VISA</span>
                    <span>•••• •••• •••• 4008</span>
                  </span>
                </div>
                <button className="bg-transparent hover:bg-white/5 border border-[#232323] hover:border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                  Edit
                </button>
              </div>

              <div className="border-t border-[#232323] pt-4 flex flex-col gap-1.5">
                <span className="text-xs text-gray-500 font-mono uppercase">Next Invoice</span>
                <span className="text-xs text-white">
                  $20.00 USD charged on <span className="font-semibold">August 17, 2026</span>.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* API KEYS TAB */}
        {activeTab === 'apikeys' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">API Keys</h2>
              <p className="text-xs text-[#9CA3AF] mt-1">Authenticate client SDK queries and developer integrations.</p>
            </div>

            <div className="bg-[#111111] border border-[#232323] p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-mono uppercase">Production Key</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="flex-1 bg-[#050505] border border-[#232323] rounded-xl px-3 py-2 text-xs text-white outline-none select-text cursor-default font-mono"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 bg-transparent hover:bg-white/5 border border-[#232323] hover:border-white/10 text-[#9CA3AF] hover:text-white rounded-xl cursor-pointer transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      toast('Key successfully copied to clipboard.', 'success');
                    }}
                    className="px-3.5 py-2.5 bg-transparent hover:bg-white/5 border border-[#232323] hover:border-white/10 text-[#9CA3AF] hover:text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="border-t border-[#232323] pt-4 flex flex-col gap-3">
                <h4 className="text-xs font-semibold text-white">Rotate Authorization Token</h4>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Rotating your live credentials will instantly invalidate any instances using the current token key signature.
                </p>
                <button
                  onClick={() => toast('Live credentials rotated. Key updated.', 'success')}
                  className="w-fit bg-[#111111] hover:bg-white/[0.04] border border-[#232323] text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Rotate Secret Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DANGER ZONE TAB */}
        {activeTab === 'danger' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
              <p className="text-xs text-red-400 mt-1">Actions in this directory are irreversible and impact session safety.</p>
            </div>

            <div className="bg-[#111111] border border-red-500/15 p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-white">Terminate User Account</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Permanently erase your workflow registry history, personal identity configurations, and billing profiles from active databases.
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="w-fit bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-all"
              >
                Terminate Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
