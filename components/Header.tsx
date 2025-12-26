
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] md:w-[85%] max-w-7xl z-[100] transition-all duration-500 rounded-2xl sm:rounded-full ${isScrolled || isMenuOpen ? 'glass-panel px-4 sm:px-8 py-3 sm:py-4' : 'px-4 py-4 bg-transparent'}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-10">
            <a href="#" className="text-xl sm:text-2xl font-black tracking-tighter hover:text-accent transition-all flex items-center gap-2 group">
              <span className="bg-accent text-void px-1.5 sm:px-2 rounded-md sm:rounded-lg group-hover:rotate-12 transition-transform">_</span>
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
          
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : ''}
                className="font-mono text-[10px] lg:text-[11px] tracking-[0.4em] lg:tracking-[0.5em] text-white/70 hover:text-accent transition-all relative group py-2"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ))}
            
            <button className="glass-panel px-4 lg:px-6 py-2 rounded-full font-mono text-[10px] tracking-widest text-accent border-accent/20 hover:bg-accent/10 transition-colors">
              LOGIN_ID
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6 pt-8 pb-4 px-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className="font-mono text-[12px] tracking-[0.6em] text-white/80 hover:text-accent border-b border-white/5 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="w-full py-4 glass-panel rounded-xl font-mono text-[10px] tracking-[0.4em] text-accent border-accent/30 bg-accent/5">
                  INITIALIZE_LOGIN
                </button>
                <div className="pt-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest text-center">
                   SYNC_ID: {time}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
