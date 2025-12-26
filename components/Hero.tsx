
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ dd: 0, hh: 0, mm: 0, ss: 0 });

  useEffect(() => {
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 3);
    dropDate.setHours(18, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = dropDate.getTime() - now;
      setTimeLeft({
        dd: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hh: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mm: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        ss: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Animated Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 mb-10"
        >
           <span className="font-mono text-accent text-[11px] tracking-[0.8em] border border-accent/20 bg-accent/5 backdrop-blur-md px-8 py-2 uppercase rounded-full">
             ENCRYPTED_STREAM_V4.0
           </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[14vw] md:text-[12rem] font-black tracking-tighter leading-[0.8] uppercase text-center mb-16 select-none"
        >
          <span className="block text-white">TAILORING</span>
          <span className="block text-accent text-glow">REALITY</span>
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block glass-panel p-8 rounded-2xl"
          >
            <span className="font-mono text-[10px] text-accent/60 tracking-widest uppercase mb-4 block">// PROTOCOL_001</span>
            <p className="font-sans text-xl font-bold uppercase tracking-tight leading-tight">
              CURATING THE <br/> UNSEEN ARCHIVE <br/> OF MODERN SOCIETY.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-12"
          >
             <div className="glass-panel px-12 py-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                
                <div className="flex gap-8 md:gap-12 relative z-10">
                  {Object.entries(timeLeft).map(([label, val]) => (
                    <div key={label} className="flex flex-col items-center">
                      <motion.span 
                        key={val}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white"
                      >
                        {val.toString().padStart(2, '0')}
                      </motion.span>
                      <span className="font-mono text-[10px] text-accent tracking-[0.3em] font-bold mt-2">{label.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
             </div>

             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="group relative px-20 py-6 bg-accent text-void font-bold text-sm tracking-[0.6em] rounded-full hover:shadow-[0_0_40px_rgba(223,255,0,0.4)] transition-all overflow-hidden"
             >
                <span className="relative z-10">DECODE_VAULT</span>
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-white/30 skew-x-12"
                />
             </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden md:block text-right"
          >
            <div className="glass-panel p-8 rounded-2xl inline-block">
              <span className="font-mono text-[10px] text-accent/60 tracking-widest uppercase mb-4 block text-left">// SYSTEM_LOG</span>
              <div className="font-mono text-[11px] text-gray-400 space-y-2 uppercase text-left">
                <p className="flex justify-between gap-8"><span>USER</span> <span className="text-white">GUEST_041</span></p>
                <p className="flex justify-between gap-8"><span>LINK</span> <span className="text-accent">ENCRYPTED</span></p>
                <p className="flex justify-between gap-8"><span>SEC</span> <span className="text-white">TIER_1</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-24 h-24 border border-accent/10 rounded-lg backdrop-blur-sm pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-10 w-32 h-32 border border-accent/10 rounded-full backdrop-blur-sm pointer-events-none"
      />
    </section>
  );
};

export default Hero;
