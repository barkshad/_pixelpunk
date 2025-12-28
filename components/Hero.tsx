
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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 border border-white/10 mb-10 shadow-sm"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">New Arrivals Dropping Soon</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] mb-10 text-balance"
          >
            Find Rare. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Wear unique.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-14 font-medium leading-relaxed"
          >
            The easiest way to find and collect one-of-a-kind clothing. 
            Verified authenticity and professional sourcing for everyone.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <div className="grid grid-cols-4 gap-4 p-5 rounded-[2.5rem] bg-slate-900/60 border border-white/5 backdrop-blur-xl shadow-soft">
              {Object.entries(timeLeft).map(([label, val]) => (
                <div key={label} className="flex flex-col items-center min-w-[70px]">
                  <div className="text-3xl font-extrabold text-white tabular-nums">{val.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>

            <button className="btn-primary px-12 py-6 rounded-3xl text-lg font-extrabold text-white w-full md:w-auto shadow-lg hover:shadow-primary/20 transition-all">
              Start Exploring
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
