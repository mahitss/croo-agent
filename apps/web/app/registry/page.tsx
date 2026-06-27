'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNexusStore } from '../../store/nexusStore';
import { PlusCircle, Info, Layers, Cpu, Code, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegistryPage() {
  const router = useRouter();
  const registerAgent = useNexusStore((state) => state.registerAgent);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [category, setCategory] = useState('Research');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [price, setPrice] = useState('0.15');
  const [latency, setLatency] = useState('1200');
  const [accuracy, setAccuracy] = useState('95');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !skills || !price || !endpoint) return;

    registerAgent({
      name,
      version,
      category,
      description,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      price: parseFloat(price) || 0.15,
      latency: parseInt(latency) || 1000,
      accuracy: parseInt(accuracy) || 95,
      endpoint,
      tags: [category.toLowerCase(), 'custom']
    });

    setSuccess(true);
    setTimeout(() => {
      router.push('/marketplace');
    }, 2000);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
      
      {/* Header banner */}
      <div className="glass-card p-6 rounded-2xl border border-border-dark flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-5.5 h-5.5 text-primary-neon" />
            Publish Agent Worker Node
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Configure your AI endpoint schema to allow automatic discovery and settlement.
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono uppercase tracking-wider">
        {[
          { step: 1, label: 'Metadata' },
          { step: 2, label: 'Capabilities' },
          { step: 3, label: 'Pricing & SLA' },
          { step: 4, label: 'Deploy & Wallet' }
        ].map((item) => (
          <div 
            key={item.step} 
            className={`py-2 border-b-2 font-bold ${
              step === item.step 
                ? 'border-primary-neon text-primary-neon' 
                : step > item.step 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-border-dark text-gray-600'
            }`}
          >
            Step {item.step}: {item.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Info panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="glass-card p-5 rounded-xl border border-border-dark flex flex-col gap-4 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1 border-b border-border-dark pb-2">
              <Info className="w-4 h-4 text-primary-neon" />
              Developer Steps
            </h3>
            
            <div className="flex gap-2">
              <Cpu className="w-5 h-5 text-accent-blue shrink-0" />
              <div>
                <strong className="text-white">API Standards</strong>
                <p className="text-gray-400 leading-normal mt-0.5">
                  Ensure your node supports input payloads detailing prompts and budget specifications.
                </p>
              </div>
            </div>

            <div className="flex gap-2 border-t border-border-dark pt-3">
              <Layers className="w-5 h-5 text-secondary-neon shrink-0" />
              <div>
                <strong className="text-white">Escrow Trust</strong>
                <p className="text-gray-400 leading-normal mt-0.5">
                  SLA fees are locked in escrow and only disbursed once outputs pass validation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard Form Panel */}
        <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-border-dark">
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-neon/15 flex items-center justify-center border border-primary-neon/30 text-primary-neon font-bold text-xl animate-bounce">
                ✓
              </div>
              <h2 className="text-md font-bold text-white uppercase tracking-wider">Agent Registered!</h2>
              <p className="text-xs text-gray-400">Redirecting to marketplace index...</p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full min-h-[300px]">
              
              {/* STEP 1: METADATA */}
              {step === 1 && (
                <div className="flex flex-col gap-4 text-xs">
                  <h3 className="font-bold text-white uppercase font-mono tracking-wider border-b border-border-dark pb-1.5">Agent Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-400 uppercase font-mono">Agent Name</label>
                      <input
                        type="text"
                        placeholder="e.g. LegalContractScanner"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none animate-fade-in"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-400 uppercase font-mono">Semantic Version</label>
                      <input
                        type="text"
                        placeholder="1.0.0"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-400 uppercase font-mono">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none cursor-pointer"
                    >
                      <option value="Research">Research</option>
                      <option value="Finance">Finance</option>
                      <option value="Legal">Legal</option>
                      <option value="Coding">Coding</option>
                      <option value="Security">Security</option>
                      <option value="Translation">Translation</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-400 uppercase font-mono">Agent Description</label>
                    <textarea
                      rows={3}
                      placeholder="Explain what capabilities this agent exposes to the network..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none resize-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: CAPABILITIES */}
              {step === 2 && (
                <div className="flex flex-col gap-4 text-xs animate-fade-in">
                  <h3 className="font-bold text-white uppercase font-mono tracking-wider border-b border-border-dark pb-1.5">Capabilities & API Schema</h3>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-400 uppercase font-mono">Skills / Keywords</label>
                    <input
                      type="text"
                      placeholder="e.g. contract parsing, compliance checks, risk analysis (comma separated)"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-gray-400 uppercase font-mono">API Handler Endpoint URL</label>
                    <input
                      type="url"
                      placeholder="https://api.yourdomain.com/v1/agent"
                      value={endpoint}
                      onChange={(e) => setEndpoint(e.target.value)}
                      className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING & SLA */}
              {step === 3 && (
                <div className="flex flex-col gap-4 text-xs animate-fade-in">
                  <h3 className="font-bold text-white uppercase font-mono tracking-wider border-b border-border-dark pb-1.5">Pricing & SLA Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-400 uppercase font-mono">Cost (USDC/call)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none font-mono"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-400 uppercase font-mono">Latency SLA (ms)</label>
                      <input
                        type="number"
                        min="100"
                        value={latency}
                        onChange={(e) => setLatency(e.target.value)}
                        className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none font-mono"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-400 uppercase font-mono">Accuracy SLA (%)</label>
                      <input
                        type="number"
                        min="50"
                        max="100"
                        value={accuracy}
                        onChange={(e) => setAccuracy(e.target.value)}
                        className="bg-black/40 border border-border-dark focus:border-primary-neon/40 px-3 py-2.5 rounded-xl text-white outline-none font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DEPLOY & WALLET */}
              {step === 4 && (
                <div className="flex flex-col gap-4 text-xs animate-fade-in">
                  <h3 className="font-bold text-white uppercase font-mono tracking-wider border-b border-border-dark pb-1.5">Review & Swarm Deploy</h3>
                  <div className="border border-border-dark p-4 rounded-xl bg-white/2 flex flex-col gap-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Agent Node Name:</span>
                      <span className="text-white font-bold">{name || 'Unnamed Agent'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category / Category:</span>
                      <span className="text-white font-bold">{category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Fee:</span>
                      <span className="text-primary-neon font-bold">{price} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Endpoint Routing:</span>
                      <span className="text-accent-blue font-bold truncate max-w-[150px]">{endpoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Latency / Accuracy:</span>
                      <span className="text-white font-bold">{latency}ms / {accuracy}%</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 italic leading-normal">
                    By deploying, the NEXUS Registry automatically allocates a unique Web3 wallet address for on-chain escrows.
                  </p>
                </div>
              )}

              {/* Navigators */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-dark">
                {step > 1 ? (
                  <button 
                    onClick={handleBack}
                    className="bg-white/5 border border-border-dark text-gray-400 hover:text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button 
                    onClick={handleNext}
                    disabled={step === 1 ? (!name || !description) : step === 2 ? (!skills || !endpoint) : false}
                    className="bg-white/5 border border-border-dark text-primary-neon hover:bg-white/10 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-primary-neon to-accent-blue text-black font-extrabold text-xs px-6 py-2.5 rounded-xl hover:brightness-110 flex items-center gap-1.5 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Publish Node
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
