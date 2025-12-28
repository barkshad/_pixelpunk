
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sourcing: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const inputClasses = "w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-600 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all font-medium text-base";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-darker relative overflow-hidden">
      {/* Background decoration */}
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
                <span className="text-xs font-bold uppercase tracking-widest">Personal Shopping</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1] uppercase">We'll Find It <br />For You</h2>
              <p className="text-xl text-slate-300 font-medium max-w-md leading-relaxed">
                Looking for a specific item? Our team of experts will search their global network to find it just for you.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Trusted Experts', desc: 'Every item we find is checked by hand to make sure it is real and in great shape.', icon: '🤝' },
                { title: 'Fast Results', desc: 'We usually find what you are looking for within 7 to 14 days.', icon: '⚡' }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 shadow-sm group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform border border-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-base text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-[4rem] bg-slate-900/50 border border-white/10 shadow-2xl backdrop-blur-md relative"
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
                  <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center text-6xl border border-success/30 shadow-lg">
                    👍
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-extrabold tracking-tight">Got Your Request!</h3>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                      Our team is already starting the search. <br />Check your email for an update within 24 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1"
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
                      <label className="text-sm font-bold text-slate-400 ml-2">Your Name</label>
                      <input type="text" required placeholder="Name" className={inputClasses} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-400 ml-2">Your Email</label>
                      <input type="email" required placeholder="Email" className={inputClasses} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 ml-2">What should we find?</label>
                    <textarea required rows={4} placeholder="Tell us about the piece you want (e.g. Vintage leather jacket, size Medium)..." className={inputClasses}></textarea>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <input type="checkbox" required className="w-6 h-6 rounded-lg bg-dark border-white/10 text-primary focus:ring-primary" />
                    <span className="text-xs font-bold text-slate-500">I'm ready to have PixelPunk find this for me.</span>
                  </div>

                  <button type="submit" className="w-full btn-primary py-6 rounded-3xl font-bold text-white text-lg transition-all shadow-xl active:scale-95">
                    Start My Search
                  </button>
                  
                  <div className="flex items-center justify-center gap-3">
                     <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                     <p className="text-[11px] text-center text-slate-500 font-bold uppercase tracking-widest">
                       Securely connected to our team
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
