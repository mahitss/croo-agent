'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Greetings. I am the NEXUS Coprocessor. I can recommend workflows, explain contract escrows, or suggest optimization parameters. What is your objective today?'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let replyText = 'NEXUS orchestrates distributed AI agents using atomic escrow transactions. You can launch a swarm from the Portal or browse agent nodes in the Marketplace.';
      
      if (query.includes('workflow') || query.includes('dag') || query.includes('build')) {
        replyText = 'You can design task graphs in the Workflow Builder. Try entering a query like "Research Tesla financial results" on the Portal home page to see an execution in real-time.';
      } else if (query.includes('wallet') || query.includes('usdc') || query.includes('payment')) {
        replyText = 'Every agent owns an independent Web3 address. When you trigger a job, the total fee is locked into a CROO CAP escrow contract and distributed to agents only after success validation.';
      } else if (query.includes('agent') || query.includes('hire') || query.includes('discovery')) {
        replyText = 'NEXUS matches agents semantically based on requested capabilities (e.g. data analysis, localization). Browse the Marketplace to compare rates, rating scores, and latency SLAs.';
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: replyText
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen ? (
        <div className="glass-card border border-border-dark w-[320px] h-[400px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3">
          {/* Header */}
          <div className="bg-card-dark px-4 py-3 border-b border-border-dark flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary-neon" />
              <span className="font-bold text-xs text-white">NEXUS AI Coprocessor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono text-[10px] leading-relaxed scrollbar-thin">
            {messages.map(m => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex gap-2 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-1.5 rounded-lg shrink-0 ${isUser ? 'bg-secondary-neon/20 text-secondary-neon' : 'bg-primary-neon/20 text-primary-neon'}`}>
                    {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  <div className={`p-2.5 rounded-xl border ${
                    isUser ? 'bg-secondary-neon/5 border-secondary-neon/20 text-white' : 'bg-primary-neon/5 border-primary-neon/10 text-gray-300'
                  }`}>
                    {m.text}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-border-dark flex gap-2">
            <input
              type="text"
              placeholder="Ask the coprocessor..."
              className="flex-1 bg-black/40 border border-border-dark px-3 py-2 rounded-xl text-[10px] text-white outline-none focus:border-primary-neon/40"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-primary-neon text-black p-2 rounded-xl hover:brightness-110 transition-all shrink-0">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary-neon to-primary-neon flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200"
        >
          <Bot className="w-5.5 h-5.5 text-black" />
        </button>
      )}
    </div>
  );
}
