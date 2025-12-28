
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
    { name: 'Our Process', href: '#process' },
    { name: 'Style Gallery', href: '#archive' },
    { name: 'Request a Find', href: '#services' },
  ];

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-darker/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-4 group">
          <div className="text-2xl font-serif italic text-primary">p.p</div>
          <span className="text-2xl font-serif font-medium tracking-tight text-white group-hover:text-primary transition-colors">
            pixelpunk
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-6 ml-6 pl-10 border-l border-white/10">
            <button 
              onClick={onCartOpen}
              className="relative text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">View Bag</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={onLoginOpen}
              className="text-xs font-bold text-zinc-200 uppercase tracking-widest border-b-2 border-primary pb-0.5 hover:text-white transition-colors"
            >
              Account
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-6">
           <button onClick={onCartOpen} className="relative text-zinc-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[9px] font-bold text-white flex items-center justify-center">{cartCount}</span>}
           </button>
           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-400">
              {isMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>}
           </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-zinc-950 p-10 space-y-8 border-b border-white/5"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-3xl font-serif text-zinc-100"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { onLoginOpen(); setIsMenuOpen(false); }}
              className="w-full btn-vintage py-5 rounded-full"
            >
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
