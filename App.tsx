
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Vault from './components/Vault';
import Archive from './components/Archive';
import Sourcing from './components/Sourcing';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-void text-white selection:bg-accent selection:text-void overflow-x-hidden">
      {/* Premium Mouse Follower Glow */}
      <motion.div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[1]"
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 200 }}
      />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Premium Data Marquee */}
        <div className="py-6 bg-accent border-y-4 border-void overflow-hidden whitespace-nowrap shadow-[0_0_50px_rgba(223,255,0,0.2)]">
          <div className="inline-block animate-[marquee_25s_linear_infinite]">
            {[1, 2, 3, 4, 5].map(i => (
              <React.Fragment key={i}>
                <span className="font-mono text-[12px] font-black tracking-[0.8em] mx-16 text-void uppercase">SYSTEM_STABLE_SIGNAL_RECOVERED</span>
                <span className="font-mono text-[12px] font-black tracking-[0.8em] mx-16 text-void uppercase">1_OF_1_ARCHIVE_PROTOCOL_ACTIVE</span>
                <span className="font-mono text-[12px] font-black tracking-[0.8em] mx-16 text-void uppercase border-x-2 border-void px-8">SECURED_VAULT_00</span>
                <span className="font-mono text-[12px] font-black tracking-[0.8em] mx-16 text-void uppercase">AUTHENTIC_RECORDS_ONLY</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Vault />
        
        {/* Luxury Divider */}
        <div className="h-px bg-white/5 w-full relative mb-20">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel px-16 py-3 rounded-full border-accent/30 font-mono text-[11px] text-accent tracking-[1em] uppercase"
           >
             CONTINUE_RECOVERY
           </motion.div>
        </div>
        
        <Archive />
        <Sourcing />
      </main>
      
      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
