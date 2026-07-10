'use client';

import { useState, useEffect } from 'react';
import { useNexusStore } from '../store/nexusStore';
import { X, Mail, Lock, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';

export default function AuthModal() {
  const isAuthModalOpen = useNexusStore((state) => state.isAuthModalOpen);
  const authModalTab = useNexusStore((state) => state.authModalTab);
  const setAuthModal = useNexusStore((state) => state.setAuthModal);
  const loginUser = useNexusStore((state) => state.loginUser);
  const registerUser = useNexusStore((state) => state.registerUser);
  const loginOAuth = useNexusStore((state) => state.loginOAuth);
  const loginWithGoogle = useNexusStore((state) => state.loginWithGoogle);
  const forgotPassword = useNexusStore((state) => state.forgotPassword);
  const verifyEmail = useNexusStore((state) => state.verifyEmail);
  const { toast } = useToast();

  const [tab, setTab] = useState<'login' | 'register' | 'forgot' | 'verify'>(authModalTab as any);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'user' | 'creator' | 'admin'>('user');
  const [verifyCode, setVerifyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthModalOpen) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const google = (window as any).google;
        if (google?.accounts?.id) {
          google.accounts.id.initialize({
            client_id: '1084209538416-g2uh2qbf3p8q2eb2e84vhrghf477n6q8.apps.googleusercontent.com',
            callback: (res: any) => {
              if (res.credential) {
                handleGoogleLoginSuccess(res.credential);
              }
            }
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [isAuthModalOpen]);

  const handleGoogleLoginSuccess = async (credential: string) => {
    setIsLoading(true);
    try {
      const ok = await loginWithGoogle(credential);
      if (ok) {
        toast('Successfully signed in with Google!', 'success');
        setAuthModal(false);
      }
    } catch (err: any) {
      toast(`Google login failed: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleOAuthClick = () => {
    const google = (window as any).google;
    if (google?.accounts?.id) {
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          triggerMockGoogleLogin();
        }
      });
    } else {
      triggerMockGoogleLogin();
    }
  };

  const triggerMockGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const mockPayload = {
        sub: `google-mock-${Date.now()}`,
        email: `google.user.${Math.floor(Math.random() * 1000)}@gmail.com`,
        name: 'Nexus Google User',
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'
      };
      const idToken = `mock-google-token-${Buffer.from(JSON.stringify(mockPayload)).toString('base64')}`;
      const ok = await loginWithGoogle(idToken);
      if (ok) {
        toast('Successfully signed in with Google (Demo Mode)!', 'success');
        setAuthModal(false);
      }
    } catch (err: any) {
      toast(`Google login failed: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (tab === 'login') {
        const ok = await loginUser(email, password);
        if (ok) {
          toast('Successfully signed in to Orbit!', 'success');
          setAuthModal(false);
        }
      } else if (tab === 'register') {
        const ok = await registerUser(email, username, password, displayName, role);
        if (ok) {
          toast('Registration successful! Please verify your email.', 'success');
          setTab('verify');
        }
      } else if (tab === 'forgot') {
        await forgotPassword(email);
        toast('Password reset credentials sent successfully!', 'success');
        setTab('login');
      } else if (tab === 'verify') {
        await verifyEmail(verifyCode);
        toast('Email address successfully verified!', 'success');
        setAuthModal(false);
      }
    } catch (err: any) {
      toast(err.message || 'Authentication error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      await loginOAuth(provider);
      toast(`Successfully connected via ${provider === 'google' ? 'Google' : 'GitHub'} OAuth!`, 'success');
      setAuthModal(false);
    } catch (err: any) {
      toast(`OAuth connection failed: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-card border border-border-dark w-full max-w-md p-6 rounded-2xl relative shadow-2xl overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-neon/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-neon/10 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button 
          onClick={() => setAuthModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center font-bold text-black text-xl mb-3 shadow-[0_0_15px_rgba(0,255,204,0.3)]">
            O
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-wide">
            {tab === 'login' && 'Welcome to Orbit'}
            {tab === 'register' && 'Create Your Account'}
            {tab === 'forgot' && 'Reset Password'}
            {tab === 'verify' && 'Verify Email Address'}
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {tab === 'login' && 'Access the Autonomous Agent OS'}
            {tab === 'register' && 'Join the Decentralized Agent Economy'}
            {tab === 'forgot' && 'Provide your registered email address'}
            {tab === 'verify' && 'Enter the validation code sent to your inbox'}
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          {tab === 'register' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 pl-10 pr-3 py-2.5 rounded-xl text-xs text-white outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 pl-10 pr-3 py-2.5 rounded-xl text-xs text-white outline-none font-mono"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {tab !== 'verify' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 pl-10 pr-3 py-2.5 rounded-xl text-xs text-white outline-none font-mono"
                  required
                />
              </div>
            </div>
          )}

          {(tab === 'login' || tab === 'register') && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 pl-10 pr-3 py-2.5 rounded-xl text-xs text-white outline-none font-mono"
                  required
                />
              </div>
            </div>
          )}

          {tab === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Account Role</label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none font-mono cursor-pointer"
              >
                <option value="user">User (Standard Orchestrator)</option>
                <option value="creator">Creator (Agent Developer)</option>
                <option value="admin">Admin (Systems Operator)</option>
              </select>
            </div>
          )}

          {tab === 'verify' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Verification Code</label>
              <input
                type="text"
                placeholder="123456"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="w-full bg-black/60 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-xs text-white outline-none text-center font-mono text-lg font-bold tracking-widest"
                required
              />
            </div>
          )}

          {tab === 'login' && (
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => setTab('forgot')}
                className="text-[10px] text-primary-neon font-mono hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary-neon to-accent-blue text-black font-extrabold py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all font-mono text-xs shadow-[0_0_15px_rgba(0,255,204,0.15)]"
          >
            {isLoading ? 'Processing...' : (
              tab === 'login' ? 'Sign In' :
              tab === 'register' ? 'Register Account' :
              tab === 'forgot' ? 'Send Reset Link' : 'Confirm Verification'
            )}
          </button>
        </form>

        {/* OAuth Dividers & Buttons */}
        {(tab === 'login' || tab === 'register') && (
          <div className="mt-6 flex flex-col gap-4 relative z-10 border-t border-border-dark pt-5">
            <div className="flex items-center justify-center gap-2">
              <div className="flex-1 h-[1px] bg-border-dark"></div>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-[1px] bg-border-dark"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleOAuthClick}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/5 border border-border-dark hover:border-white/10 px-4 py-2.5 rounded-xl text-xs text-white font-mono hover:bg-white/10 transition-all"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuth('github')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/5 border border-border-dark hover:border-white/10 px-4 py-2.5 rounded-xl text-xs text-white font-mono hover:bg-white/10 transition-all"
              >
                GitHub
              </button>
            </div>
          </div>
        )}

        {/* Switch Auth Flow Mode Links */}
        <div className="mt-6 text-center text-xs text-gray-400 font-sans">
          {tab === 'login' && (
            <>
              Don't have an account?{' '}
              <button onClick={() => setTab('register')} className="text-primary-neon hover:underline font-bold">
                Register
              </button>
            </>
          )}
          {tab === 'register' && (
            <>
              Already have an account?{' '}
              <button onClick={() => setTab('login')} className="text-primary-neon hover:underline font-bold">
                Login
              </button>
            </>
          )}
          {tab === 'forgot' && (
            <button onClick={() => setTab('login')} className="text-primary-neon hover:underline font-bold">
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
