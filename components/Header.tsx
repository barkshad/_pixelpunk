
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { name: 'VAULT', href: '#vault' },
    { name: 'ARCHIVE', href: '#archive' },
    { name: 'BOUNTY', href: '#services' },
    { name: 'WA', href: 'https://wa.me/yournumber', external: true },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] max-w-7xl z-[100] transition-all duration-500 rounded-full ${isScrolled ? 'glass-panel px-8 py-4' : 'px-4 py-4 bg-transparent'}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <a href="#" className="text-2xl font-black tracking-tighter hover:text-accent transition-all flex items-center gap-2 group">
            <span className="bg-accent text-void px-2 rounded-lg group-hover:rotate-12 transition-transform">_</span>
            PIXELPUNK
          </a>
          
          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-10 font-mono text-[10px] text-gray-500 uppercase tracking-[0.5em]">
            <div className="relative">
              <div className="w-2 h-2 bg-accent rounded-full animate-ping absolute inset-0"></div>
              <div className="w-2 h-2 bg-accent rounded-full relative"></div>
            </div>
            ARCHIVE_SYNC: {time}
          </div>
        </div>
        
        <nav className="flex items-center space-x-4 md:space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : '_self'}
              rel={link.external ? 'noopener noreferrer' : ''}
              className="font-mono text-[11px] tracking-[0.5em] text-white/70 hover:text-accent transition-all relative group py-2"
            >
              {link.name}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </a>
          ))}
          
          <button className="hidden md:block glass-panel px-6 py-2 rounded-full font-mono text-[10px] tracking-widest text-accent border-accent/20 hover:bg-accent/10 transition-colors">
            LOGIN_ID
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
