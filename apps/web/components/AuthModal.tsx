'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const isProd = process.env.NODE_ENV === 'production';
const console = {
  log: (...args: any[]) => {
    if (!isProd) globalThis.console.log(...args);
  },
  warn: (...args: any[]) => {
    if (!isProd) globalThis.console.warn(...args);
  },
  error: (...args: any[]) => {
    globalThis.console.error(...args);
  },
  debug: (...args: any[]) => {
    if (!isProd) globalThis.console.debug(...args);
  },
  info: (...args: any[]) => {
    if (!isProd) globalThis.console.info(...args);
  }
};
import { useNexusStore } from '../store/nexusStore';
import { useAuthStore } from '../store/authStore';
import { X, Mail, Lock, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';

export default function AuthModal() {
  const isAuthModalOpen = useNexusStore((state) => state.isAuthModalOpen);
  const authModalTab = useNexusStore((state) => state.authModalTab);
  const setAuthModal = useNexusStore((state) => state.setAuthModal);
  const loginUser = useNexusStore((state) => state.loginUser);
  const registerUser = useNexusStore((state) => state.registerUser);
  const loginWithGoogle = useNexusStore((state) => state.loginWithGoogle);
  const forgotPassword = useNexusStore((state) => state.forgotPassword);
  const verifyEmail = useNexusStore((state) => state.verifyEmail);
  const isDemoMode = useNexusStore((state) => state.isDemoMode);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);
  const { toast } = useToast();

  const [tab, setTab] = useState<'login' | 'register' | 'forgot' | 'verify'>(authModalTab as any);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'user' | 'creator' | 'admin'>('user');
  const [verifyCode, setVerifyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authModalTab) {
      setTab(authModalTab as any);
    }
  }, [authModalTab]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthModalOpen) {
      const scriptId = 'google-gsi-client-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      const handleScriptLoad = () => {
        console.log('[GOOGLE_AUTH_DEBUG] Google SDK loaded');
        const google = (window as any).google;
        if (google?.accounts?.oauth2 && !tokenClientRef.current) {
          const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
          if (!googleClientId) {
            throw new Error('Missing Google Client ID environment variable (NEXT_PUBLIC_GOOGLE_CLIENT_ID)');
          }

          tokenClientRef.current = google.accounts.oauth2.initTokenClient({
            client_id: googleClientId,
            scope: 'openid email profile',
            prompt: 'select_account',
            callback: async (tokenResponse: any) => {
              if (tokenResponse && tokenResponse.access_token) {
                console.log('[GOOGLE_AUTH_DEBUG] Account selected');
                console.log('[GOOGLE_AUTH_DEBUG] Authorization code/token received');
                
                setIsLoading(true);
                try {
                  console.log('[GOOGLE_AUTH_DEBUG] Fetching user profile from Google...');
                  const userinfoRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`);
                  if (!userinfoRes.ok) {
                    throw new Error('Failed to fetch user profile from Google');
                  }
                  const userinfo = await userinfoRes.json();
                  
                  const mockPayload = {
                    sub: userinfo.sub,
                    email: userinfo.email,
                    name: userinfo.name || userinfo.given_name || 'Google User',
                    picture: userinfo.picture || ''
                  };
                  
                  const idToken = `mock-google-token-${Buffer.from(JSON.stringify(mockPayload)).toString('base64')}`;
                  
                  console.log('[GOOGLE_AUTH_DEBUG] POST /api/v1/auth/google request');
                  const ok = await loginWithGoogle(idToken);
                  if (ok) {
                    console.log('[GOOGLE_AUTH_DEBUG] Login completed');
                    const msg = isDemoMode 
                      ? 'Successfully signed in with Google (Demo Mode)!' 
                      : 'Successfully signed in with Google!';
                    toast(msg, 'success');
                    setAuthModal(false);
                    if (typeof window !== 'undefined') {
                      const params = new URLSearchParams(window.location.search);
                      const redirectUrl = params.get('redirect');
                      if (redirectUrl) {
                        window.location.href = redirectUrl;
                        return;
                      }
                    }
                  }
                } catch (err: any) {
                  toast(`Google login failed: ${err.message}`, 'error');
                } finally {
                  setIsLoading(false);
                }
              }
            }
          });
          console.log('[GOOGLE_AUTH_DEBUG] OAuth client initialized');
        }
      };

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = handleScriptLoad;
        document.head.appendChild(script);
      } else {
        const google = (window as any).google;
        if (google?.accounts?.oauth2) {
          handleScriptLoad();
        } else {
          script.addEventListener('load', handleScriptLoad);
        }
      }

      return () => {
        if (script) {
          script.removeEventListener('load', handleScriptLoad);
        }
      };
    }
  }, [isAuthModalOpen, isDemoMode, loginWithGoogle, setAuthModal, toast]);

  const handleGoogleOAuthClick = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      throw new Error('Missing Google Client ID environment variable (NEXT_PUBLIC_GOOGLE_CLIENT_ID)');
    }

    if (tokenClientRef.current) {
      console.log('[GOOGLE_AUTH_DEBUG] Popup opened');
      tokenClientRef.current.requestAccessToken();
    } else {
      toast('Google Sign-In is initializing. Please try again in a moment.', 'info');
    }
  };

  if (!mounted || !isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (tab === 'login') {
        const ok = await loginUser(email, password);
        if (ok) {
          toast('Successfully signed in to Orbit!', 'success');
          setAuthModal(false);
          if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get('redirect');
            if (redirectUrl) {
              window.location.href = redirectUrl;
              return;
            }
          }
        }
      } else if (tab === 'register') {
        console.log('[REGISTER] Submit clicked');
        if (!email || !username || !password || !displayName) {
          throw new Error('Please fill in all required fields');
        }
        console.log('[REGISTER] Validation passed');
        console.log('[REGISTER] Request started');
        console.log('[REGISTER] Request payload', { email, username, password: '••••••••', displayName, role });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Registration timed out.')), 30000)
        );

        const ok = await Promise.race([
          registerUser(email, username, password, displayName, role),
          timeoutPromise
        ]);

        console.log('[REGISTER] Response received');

        if (ok) {
          console.log('[REGISTER] Success');
          toast('Successfully registered to Orbit!', 'success');
          setAuthModal(false);
          if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get('redirect');
            window.location.href = redirectUrl || '/dashboard';
          }
        } else {
          throw new Error('Registration failed: Invalid response structure');
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
      console.error('[REGISTER] Error', err);
      let friendlyMsg = err.message || 'Authentication error occurred';
      if (friendlyMsg.includes('400') || friendlyMsg.includes('BadRequest') || friendlyMsg.includes('validation')) {
        friendlyMsg = `Invalid input details: ${friendlyMsg}`;
      } else if (friendlyMsg.includes('401') || friendlyMsg.includes('Unauthorized') || friendlyMsg.includes('Invalid credentials')) {
        friendlyMsg = 'Unauthorized request. Incorrect credentials.';
      } else if (friendlyMsg.includes('409') || friendlyMsg.includes('Conflict') || friendlyMsg.includes('already registered') || friendlyMsg.includes('already taken')) {
        friendlyMsg = 'This email address or username is already in use.';
      } else if (friendlyMsg.includes('500') || friendlyMsg.includes('InternalServerError')) {
        friendlyMsg = 'Internal server or database error. Please try again later.';
      }
      toast(friendlyMsg, 'error');
    } finally {
      setIsLoading(false);
      console.log('[REGISTER] Loading cleared');
    }
  };



  return createPortal(
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setAuthModal(false);
        }
      }}
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{
        position: 'fixed',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}
    >
      <div 
        className="glass-card border border-border-dark p-6 rounded-2xl relative shadow-2xl"
        style={{
          width: 'min(460px, calc(100vw - 32px))',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          margin: '16px',
          position: 'relative',
        }}
      >
        
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
            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border-dark bg-black/60 text-primary-neon focus:ring-primary-neon/20 focus:ring-offset-black w-3.5 h-3.5 accent-primary-neon cursor-pointer"
                />
                <span className="text-[10px] text-gray-400 font-mono">Remember Me</span>
              </label>
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

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleGoogleOAuthClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-white/5 border border-border-dark hover:border-white/10 px-4 py-2.5 rounded-xl text-xs text-white font-mono hover:bg-white/10 transition-all"
              >
                Continue with Google
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
    </div>,
    document.body
  );
}
