
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { startCuratorSession, generateArchiveConcept, analyzeVintageItem } from '../services/aiService';
import { uploadToCloudinary } from '../services/cloudinary';

const AICurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'home' | 'live' | 'concept' | 'identify'>('home');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [conceptImage, setConceptImage] = useState<string | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const sessionRef = useRef<any>(null);

  const stopLive = useCallback(() => {
    if (sessionRef.current) {
      // In a real env, we'd close the session properly. 
      // The SDK doesn't have a direct close on the returned object yet, 
      // but we cleanup our side.
      setIsLiveActive(false);
      setMode('home');
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  }, []);

  const initLive = async () => {
    try {
      setIsProcessing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const sessionPromise = startCuratorSession({
        onopen: () => {
          setIsLiveActive(true);
          setIsProcessing(false);
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
            const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
            sessionPromise.then(s => s.sendRealtimeInput({ 
              media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
            }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioData && audioContextRef.current) {
            const binary = atob(audioData);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            
            const dataInt16 = new Int16Array(bytes.buffer);
            const buffer = audioContextRef.current.createBuffer(1, dataInt16.length, 24000);
            const channelData = buffer.getChannelData(0);
            for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
            
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);
            
            const now = audioContextRef.current.currentTime;
            const startTime = Math.max(now, nextStartTimeRef.current);
            source.start(startTime);
            nextStartTimeRef.current = startTime + buffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => console.error("Curator Error", e),
        onclose: () => setIsLiveActive(false)
      });
      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const handleIdentify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const analysis = await analyzeVintageItem(base64, file.type);
        setResult(analysis);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsProcessing(false);
    }
  };

  const handleConcept = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = (e.currentTarget.elements.namedItem('prompt') as HTMLInputElement).value;
    if (!prompt) return;
    setIsProcessing(true);
    setConceptImage(null);
    try {
      const img = await generateArchiveConcept(prompt);
      setConceptImage(img);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[150] w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-darker"
      >
        <span className="text-2xl">🏛️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-end justify-start md:items-center md:justify-center p-4 md:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isLiveActive) setIsOpen(false); }}
              className="absolute inset-0 bg-darker/80 backdrop-blur-xl pointer-events-auto"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(129,140,248,0.1)] overflow-hidden pointer-events-auto"
            >
              <div className="p-10 md:p-14">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-xl font-serif italic">
                      {isLiveActive ? '●' : 'p.p'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif italic text-white">The Curator</h3>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {isLiveActive ? 'Live Consultation Active' : 'Archive Intelligence Engine'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (isLiveActive) stopLive();
                      setIsOpen(false);
                    }} 
                    className="p-3 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="min-h-[400px] flex flex-col">
                  {mode === 'home' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button onClick={() => { setMode('live'); initLive(); }} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary transition-all group">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary transition-colors">🎙️</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Voice Consult</span>
                      </button>
                      <button onClick={() => setMode('identify')} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary transition-all group">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary transition-colors">📷</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Identify Item</span>
                      </button>
                      <button onClick={() => setMode('concept')} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary transition-all group">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary transition-colors">🧠</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Concept Lab</span>
                      </button>
                    </div>
                  )}

                  {mode === 'live' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-10">
                      <div className="relative">
                        <div className="w-32 h-32 bg-primary rounded-full animate-pulse-slow opacity-20 absolute inset-0 scale-150"></div>
                        <div className="w-32 h-32 bg-primary/40 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-4xl relative z-10">🏛️</div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-2xl font-serif italic text-white">"I am listening..."</h4>
                        <p className="text-zinc-500 font-medium max-w-xs mx-auto">Ask me about fashion history, provenance, or how to style your latest find.</p>
                      </div>
                      <button onClick={stopLive} className="px-10 py-4 rounded-full border border-red-500/30 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all">End Session</button>
                    </div>
                  )}

                  {mode === 'concept' && (
                    <div className="flex-1 space-y-8">
                      <button onClick={() => setMode('home')} className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white">← Back</button>
                      <form onSubmit={handleConcept} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Describe the Vision</label>
                          <input name="prompt" required placeholder="e.g. A 1950s naval jacket with digital patterns..." className="w-full bg-zinc-800 border border-white/5 p-5 rounded-2xl text-white" />
                        </div>
                        <button disabled={isProcessing} className="w-full btn-vintage py-5 rounded-full uppercase font-bold tracking-widest text-sm disabled:opacity-50">
                          {isProcessing ? 'Visualizing...' : 'Generate Concept'}
                        </button>
                      </form>
                      {conceptImage && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-black">
                          <img src={conceptImage} className="w-full h-full object-cover" alt="AI Generated Concept" />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {mode === 'identify' && (
                    <div className="flex-1 space-y-8">
                       <button onClick={() => setMode('home')} className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white">← Back</button>
                       <div className="space-y-6">
                         <div className="p-10 border-2 border-dashed border-white/5 rounded-[2.5rem] text-center space-y-6 bg-zinc-800/20 group hover:border-primary/50 transition-all cursor-pointer relative">
                           <input type="file" accept="image/*" onChange={handleIdentify} className="absolute inset-0 opacity-0 cursor-pointer" />
                           <div className="text-5xl">📷</div>
                           <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Drop a photo or click to upload</p>
                         </div>
                         {isProcessing && <div className="text-center text-primary font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Analyzing Historical Markers...</div>}
                         {result && (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-800/50 p-8 rounded-[2rem] border border-white/5 max-h-[300px] overflow-y-auto hide-scrollbar">
                             <div className="prose prose-invert prose-sm">
                               {result.split('\n').map((line, i) => <p key={i} className="mb-4 text-zinc-300 leading-relaxed font-medium">{line}</p>)}
                             </div>
                           </motion.div>
                         )}
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICurator;
