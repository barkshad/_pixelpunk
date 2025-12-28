
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ItemStatus, Product } from '../types';

interface VaultProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Vault: React.FC<VaultProps> = ({ onAddToCart, onViewProduct }) => {
  const { content } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Outerwear', 'Vests', 'Tops', 'Bottoms'];
  const filteredProducts = activeCategory === 'All' 
    ? content.products 
    : content.products.filter(p => p.category === activeCategory);

  return (
    <section id="vault" className="py-24 sm:py-32 bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-primary font-serif italic text-lg block">Curated Selection</span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">The Latest Finds</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
              Clothes that look great today and carry a piece of history. 
              Each item is one-of-a-kind. When it's gone, it truly is gone forever.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-zinc-900 border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-zinc-800 text-white shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="vintage-card rounded-[2rem] overflow-hidden group transition-all duration-500 border border-white/5 hover:border-primary/20"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Section */}
                  <div 
                    className="relative w-full sm:w-[45%] aspect-[4/5] sm:aspect-auto overflow-hidden cursor-pointer"
                    onClick={() => onViewProduct(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-[2s] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    
                    {/* Urgency Badge Overlay */}
                    {product.status === ItemStatus.AVAILABLE && (
                      <div className="absolute top-6 right-6">
                        <div className="bg-red-500/90 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">
                          1 Unit Remaining
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-zinc-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                        View Story
                      </span>
                    </div>
                    <div className="absolute top-6 left-6">
                      <div className="bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest font-mono">{product.era}</span>
                      </div>
                    </div>
                    {product.status === ItemStatus.SOLD && (
                      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                        <div className="border border-white/20 px-8 py-6 rounded-lg rotate-[-10deg]">
                          <span className="text-2xl font-serif italic text-white tracking-wide">In Private Collection</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-accent text-[11px] font-bold uppercase tracking-widest">{product.category}</span>
                          <span className="text-zinc-500 text-[10px] font-bold">{Math.floor(Math.random() * 20) + 5} Active Views</span>
                        </div>
                        <h3 
                          className="text-3xl font-serif font-medium leading-tight text-zinc-100 group-hover:text-primary transition-colors cursor-pointer"
                          onClick={() => onViewProduct(product)}
                        >
                          {product.name}
                        </h3>
                        <div className="text-2xl font-serif text-zinc-400 italic">{product.price}</div>
                      </div>

                      <p className="text-zinc-500 text-sm font-medium leading-relaxed italic line-clamp-2">
                        {product.provenance}
                      </p>

                      <button 
                        onClick={() => onViewProduct(product)}
                        className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border-b border-primary/30 pb-1 self-start hover:border-primary transition-all"
                      >
                        Read Full Story →
                      </button>
                    </div>

                    <div className="mt-12">
                      <button 
                        onClick={() => product.status === ItemStatus.AVAILABLE && onAddToCart(product)}
                        disabled={product.status === ItemStatus.SOLD}
                        className={`w-full py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 ${
                          product.status === ItemStatus.AVAILABLE 
                            ? 'btn-vintage' 
                            : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        }`}
                      >
                        {product.status === ItemStatus.AVAILABLE ? 'Secure this item' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Vault;
