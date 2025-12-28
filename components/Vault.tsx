
import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ItemStatus } from '../types';

const Vault: React.FC = () => {
  return (
    <section id="vault" className="py-24 sm:py-32 bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">The Vault</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Discover unique pieces found in secret archives around the world. 
              Verified quality, professional cleaning, and fast shipping.
            </p>
          </div>
          <div className="flex gap-3 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
            <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-800 text-white shadow-sm transition-all">Trending</button>
            <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">Newest</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="glass-card rounded-[3rem] overflow-hidden group shadow-soft transition-all"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full md:w-[45%] aspect-[4/5] md:aspect-auto overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-darker/70 backdrop-blur-md text-[10px] font-extrabold text-white px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10 shadow-sm">
                      ID: {product.id}
                    </span>
                    {product.status === ItemStatus.SOLD && (
                      <span className="bg-rose-500 text-[10px] font-extrabold text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-10 flex flex-col justify-between bg-gradient-to-br from-slate-800/50 to-transparent">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <span className="text-primary text-xs font-extrabold uppercase tracking-[0.2em]">{product.category}</span>
                      <h3 className="text-3xl font-extrabold tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                      <div className="text-2xl font-black text-slate-200">{product.price}</div>
                    </div>

                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                      {product.provenance}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {product.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    disabled={product.status === ItemStatus.SOLD}
                    className={`mt-12 w-full py-5 rounded-[1.5rem] font-extrabold text-sm tracking-widest uppercase transition-all shadow-lg ${
                      product.status === ItemStatus.AVAILABLE 
                        ? 'btn-primary text-white' 
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {product.status === ItemStatus.AVAILABLE ? 'Secure This Piece' : 'Sold to Collector'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vault;
