
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
import ProductModal from './components/ProductModal';
import { Product } from './types';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        try {
          const element = document.querySelector(href);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        } catch (error) {
          console.warn(`Could not navigate to selector: ${href}`, error);
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
    <div className="min-h-screen bg-darker text-zinc-100 selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] origin-left"
        style={{ scaleX }}
      />

      <Header 
        cartCount={cart.length} 
        onCartOpen={() => setIsCartOpen(true)} 
        onLoginOpen={() => setIsLoginOpen(true)} 
      />
      
      <main className="relative z-10">
        <Hero />
        
        {/* News Marquee - Welcoming and Convincing */}
        <div className="py-4 bg-zinc-900 border-y border-white/5 overflow-hidden whitespace-nowrap shadow-inner">
          <div className="inline-block animate-[marquee_50s_linear_infinite]">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <span className="font-serif italic text-sm tracking-wide mx-12 text-zinc-400 flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Sustainable Fashion: Why buying old is better for the planet
                </span>
                <span className="font-serif italic text-sm tracking-wide mx-12 text-zinc-400 flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Safe Shipping: We deliver happiness, anywhere in the world
                </span>
                <span className="font-serif italic text-sm tracking-wide mx-12 text-zinc-400 flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  Verified Authenticity: Every piece is double-checked by our team
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <Vault 
          onAddToCart={addToCart} 
          onViewProduct={(product) => setSelectedProduct(product)}
        />
        
        <Process />
        
        <Archive />

        <Testimonials />

        <Sourcing />
      </main>
      
      <Footer />

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
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
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
