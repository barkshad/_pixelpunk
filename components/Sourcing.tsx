
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sourcing: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const inputClasses = "w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-medium text-sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-darker relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-accent"
              >
                <span className="w-12 h-px bg-accent/30"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Network Search</span>
              </motion.div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.85] uppercase italic">Bespoke <br />Sourcing</h2>
              <p className="text-xl text-slate-400 font-medium max-w-md leading-relaxed">
                Looking for a specific grail? Our team has direct access to private collectors in Tokyo, London, and Berlin.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Verified Condition', desc: 'Every sourced piece is inspected and authenticated by our lab experts.', icon: '🔍' },
                { title: 'Fast Global Search', desc: 'Average recovery time is 7-14 days for most rare archival requests.', icon: '⚡' }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-8 rounded-[2.5rem] bg-slate-900/30 border border-white/5 hover:border-white/10 transition-all shadow-sm group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-[4rem] bg-slate-900/50 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-success/30">
                    ✅
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Bounty Initialized</h3>
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                      Our sourcing protocol has started. <br />We will contact you via secure link within 24 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Arvhist Name</label>
                      <input type="text" required placeholder="Name" className={inputClasses} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Direct Email</label>
                      <input type="email" required placeholder="Email" className={inputClasses} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Artifact Parameters</label>
                    <textarea required rows={4} placeholder="Brand, era, size, or specific reference link..." className={inputClasses}></textarea>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <input type="checkbox" required className="w-5 h-5 rounded-lg bg-dark border-white/10 text-primary focus:ring-primary" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">I agree to the sourcing protocol fees.</span>
                  </div>

                  <button type="submit" className="w-full btn-primary py-6 rounded-[1.5rem] font-black text-white text-base uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                    Start Search Bountry
                  </button>
                  
                  <div className="flex items-center justify-center gap-3">
                     <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                     <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest">
                       Secure encrypted connection established
                     </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sourcing;
