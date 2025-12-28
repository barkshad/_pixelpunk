
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ItemStatus, Product } from '../types';

interface VaultProps {
  onAddToCart: (product: Product) => void;
}

const Vault: React.FC<VaultProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Outerwear', 'Vests', 'Tops', 'Bottoms'];
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="vault" className="py-24 sm:py-32 bg-darker overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary"
            >
              <span className="w-12 h-px bg-primary/30"></span>
              <span className="text-xs font-bold uppercase tracking-widest">Our Collection</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">The Shop</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Authentic vintage gems. Every piece is cleaned, checked for quality, and ready for a new home.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-2 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-[3rem] overflow-hidden group shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row h-full min-h-[450px]">
                  {/* Image Section */}
                  <div className="relative w-full md:w-[45%] aspect-[4/5] md:aspect-auto overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-darker/70 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">ID: {product.id}</span>
                      </div>
                    </div>
                    {product.status === ItemStatus.SOLD && (
                      <div className="absolute inset-0 bg-darker/60 backdrop-blur-md flex items-center justify-center p-10 text-center">
                        <div className="border-4 border-white/10 p-10 rounded-full rotate-[-12deg] flex flex-col items-center">
                          <span className="text-2xl font-black text-white uppercase tracking-tight mb-1">Found a Home</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sold Out</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-800/20 to-transparent">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">{product.category}</span>
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-2xl font-extrabold text-slate-100">{product.price}</div>
                      </div>

                      <div className="p-5 rounded-2xl bg-darker/40 border border-white/5 italic text-slate-400 text-sm leading-relaxed border-l-4 border-l-primary">
                        "{product.provenance}"
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {product.details.map((detail, idx) => (
                          <div key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-300 font-bold uppercase tracking-wide">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10">
                      <button 
                        onClick={() => product.status === ItemStatus.AVAILABLE && onAddToCart(product)}
                        disabled={product.status === ItemStatus.SOLD}
                        className={`w-full py-5 rounded-2xl font-bold text-base transition-all shadow-xl active:scale-95 ${
                          product.status === ItemStatus.AVAILABLE 
                            ? 'btn-primary text-white' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {product.status === ItemStatus.AVAILABLE ? 'Add to Bag' : 'Sold Out'}
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
