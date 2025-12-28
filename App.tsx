
import React, { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Vault from './components/Vault';
import Archive from './components/Archive';
import Sourcing from './components/Sourcing';
import Footer from './components/Footer';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import { Product } from './types';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

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
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
    <div className="min-h-screen bg-darker text-white selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      {/* Background Decor */}
      <motion.div 
        className="hidden lg:block fixed top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-[1]"
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
        }}
        transition={{ type: "spring", damping: 60, stiffness: 120 }}
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent z-[200] origin-left shadow-lg"
        style={{ scaleX }}
      />

      {/* Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <Header 
        cartCount={cart.length} 
        onCartOpen={() => setIsCartOpen(true)} 
        onLoginOpen={() => setIsLoginOpen(true)} 
      />
      
      <main className="relative z-10">
        <Hero />
        
        {/* News Marquee */}
        <div className="py-6 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md overflow-hidden whitespace-nowrap shadow-2xl border-y border-white/10">
          <div className="inline-block animate-[marquee_45s_linear_infinite]">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <span className="font-bold text-xs sm:text-sm tracking-[0.2em] mx-12 text-white uppercase flex items-center gap-4">
                  <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                  PROTOCOL V2.4: 12 NEW PIECES AUTHENTICATED
                </span>
                <span className="font-bold text-xs sm:text-sm tracking-[0.2em] mx-12 text-white uppercase flex items-center gap-4">
                  <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  GLOBAL SHIPMENTS TRACKED SECURELY
                </span>
                <span className="font-bold text-xs sm:text-sm tracking-[0.2em] mx-12 text-white uppercase flex items-center gap-4">
                  <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse"></span>
                  EXCLUSIVE SOURCING: TOKYO NIGHT ARCHIVE DROP
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Vault onAddToCart={addToCart} />
        
        <Process />
        
        <Archive />

        <Testimonials />

        <Sourcing />
      </main>
      
      <Footer />

      {/* Modal Systems */}
      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
          />
        )}
        {isLoginOpen && (
          <LoginModal 
            onClose={() => setIsLoginOpen(false)} 
          />
        )}
      </AnimatePresence>

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
