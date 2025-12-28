
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onLoginOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartOpen, onLoginOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', href: '#vault' },
    { name: 'The Protocol', href: '#process' },
    { name: 'Archive', href: '#archive' },
    { name: 'Sourcing', href: '#services' },
  ];

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-darker/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center font-bold text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            P
          </div>
          <span className="text-2xl font-black tracking-tighter font-display uppercase italic">
            pixelpunk
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 mr-4 border-r border-white/10 pr-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={onCartOpen}
              className="relative p-2.5 text-slate-300 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5 hover:border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-darker text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={onLoginOpen}
              className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all shadow-md active:scale-95"
            >
              Access ID
            </button>
          </div>
        </nav>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            onClick={onCartOpen}
            className="relative p-2 text-slate-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-darker text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-300"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-darker border-b border-white/5 p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter text-slate-100"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <button 
                onClick={() => { onLoginOpen(); setIsMenuOpen(false); }}
                className="w-full btn-primary py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
              >
                Sync Identity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
