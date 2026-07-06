'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, WifiOff } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isOffline: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    isOffline: typeof window !== 'undefined' ? !window.navigator.onLine : false,
  };

  private handleOnlineStatus = () => {
    this.setState({ isOffline: !window.navigator.onLine });
  };

  public componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnlineStatus);
      window.addEventListener('offline', this.handleOnlineStatus);
    }
  }

  public componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnlineStatus);
      window.removeEventListener('offline', this.handleOnlineStatus);
    }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, isOffline: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled runtime error captured:', error, errorInfo);
  }

  public render() {
    if (this.state.isOffline) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black min-h-screen text-center font-sans">
          <div className="glass-card max-w-md w-full p-8 border border-border-dark rounded-2xl flex flex-col items-center gap-6">
            <div className="bg-yellow-400/10 p-4 rounded-full border border-yellow-400/20 text-yellow-400 animate-pulse">
              <WifiOff className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Network Disconnected</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-mono">
                Orbit OS has lost connection to the server. Please check your internet credentials.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-white/5 border border-border-dark hover:bg-white/10 px-5 py-2.5 rounded-xl text-xs text-white font-mono transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-Establish Connection
            </button>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black min-h-screen text-center font-sans">
          <div className="glass-card max-w-md w-full p-8 border border-red-500/20 rounded-2xl flex flex-col items-center gap-6 shadow-2xl">
            <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20 text-red-500">
              <ShieldAlert className="w-12 h-12 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Something Went Wrong</h2>
              <p className="text-[11px] text-gray-400 font-mono leading-relaxed max-h-32 overflow-y-auto scrollbar-thin bg-black/40 p-3 rounded-lg border border-border-dark text-left">
                {this.state.error?.toString()}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-neon to-accent-blue text-black font-extrabold px-6 py-2.5 rounded-xl text-xs font-mono hover:brightness-110 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
