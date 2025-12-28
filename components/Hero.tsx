
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 3);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = dropDate.getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/60 border border-white/10 mb-10 shadow-xl backdrop-blur-xl"
          >
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            </span>
            <span className="text-xs font-bold text-slate-100 uppercase tracking-widest">New Items Added Today</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] mb-10"
          >
            Cool Clothes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Easy to Find.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 mb-14 font-medium leading-relaxed"
          >
            We find the best rare vintage items so you don't have to. 
            Checked for quality, professionally cleaned, and delivered to your door.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10"
          >
            <div className="grid grid-cols-4 gap-4 p-6 rounded-[2.5rem] bg-slate-900/60 border border-white/5 backdrop-blur-2xl shadow-2xl">
              {Object.entries(timeLeft).map(([label, val]) => (
                <div key={label} className="flex flex-col items-center min-w-[70px] md:min-w-[80px]">
                  <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums tracking-tighter">{val.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>

            <a 
              href="#vault"
              className="btn-primary px-12 py-6 rounded-3xl text-lg font-bold text-white w-full md:w-auto shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-4 group"
            >
              Start Shopping
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
