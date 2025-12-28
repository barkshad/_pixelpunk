
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-darker">
      {/* Subtle Grainy Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.05)_0%,transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="font-serif italic text-lg text-accent tracking-wide">ESTABLISHED 2024</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-serif font-medium tracking-tight leading-[0.85] mb-12 text-zinc-50"
          >
            Rare items, <br />
            <span className="italic font-normal serif-italic text-zinc-400">found for you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-16 font-medium leading-relaxed"
          >
            We explore the world to find unique clothes with a story. 
            Every piece is carefully checked and ready for its next chapter.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a 
              href="#vault"
              className="btn-vintage px-14 py-5 rounded-full text-base font-bold w-full sm:w-auto text-center"
            >
              Explore the Shop
            </a>
            <a 
              href="#process"
              className="px-10 py-5 rounded-full text-zinc-400 hover:text-white font-bold text-base transition-colors flex items-center gap-3"
            >
              How it Works
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Visual bottom hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-px h-12 bg-white/20"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
