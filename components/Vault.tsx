
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
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-20 gap-12">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary"
            >
              <span className="w-12 h-px bg-primary/30"></span>
              <span className="text-xs font-black uppercase tracking-[0.4em]">Current Supply</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none italic">The Vault</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Authentic archival artifacts. Every piece is cleaned, verified, and secured for the next generation of collectors.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2.5 p-2 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-[4rem] overflow-hidden group shadow-2xl hover:border-primary/20 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row h-full min-h-[500px]">
                  {/* Image Section */}
                  <div className="relative w-full md:w-[45%] aspect-[4/5] md:aspect-auto overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute top-8 left-8">
                      <div className="bg-darker/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Archive ID: {product.id}</span>
                      </div>
                    </div>
                    {product.status === ItemStatus.SOLD && (
                      <div className="absolute inset-0 bg-darker/70 backdrop-blur-md flex items-center justify-center p-12 text-center">
                        <div className="border-4 border-white/10 p-10 rounded-full rotate-[-12deg] flex flex-col items-center">
                          <span className="text-3xl font-black text-white uppercase tracking-tighter mb-1">ARCHIVED</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sold out</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                       <span className="bg-primary/20 backdrop-blur-xl border border-primary/30 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary">
                         ERA: {product.era}
                       </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-10 md:p-14 flex flex-col justify-between relative bg-gradient-to-br from-slate-800/20 to-transparent">
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">{product.category}</span>
                          <span className="w-8 h-px bg-white/10"></span>
                          <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest italic">{product.era}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-2xl font-black text-slate-100 flex items-center gap-3">
                          {product.price}
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Secure USD</span>
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-darker/40 border border-white/5 italic text-slate-400 text-sm leading-relaxed border-l-4 border-l-primary shadow-inner">
                        "{product.provenance}"
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {product.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-[10px] text-slate-300 font-bold uppercase tracking-wider group/item">
                            <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform shadow-lg shadow-primary/50"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-14 space-y-4">
                      <button 
                        onClick={() => product.status === ItemStatus.AVAILABLE && onAddToCart(product)}
                        disabled={product.status === ItemStatus.SOLD}
                        className={`w-full py-6 rounded-[2rem] font-black text-sm tracking-widest uppercase transition-all shadow-xl active:scale-95 ${
                          product.status === ItemStatus.AVAILABLE 
                            ? 'btn-primary text-white hover:shadow-primary/40' 
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed grayscale'
                        }`}
                      >
                        {product.status === ItemStatus.AVAILABLE ? 'Secure Ownership' : 'Archive Locked'}
                      </button>
                      <div className="flex justify-center items-center gap-2 opacity-40">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Encrypted checkout</span>
                      </div>
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
