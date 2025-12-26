
import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ItemStatus } from '../types';
import TiltCard from './TiltCard';

const Vault: React.FC = () => {
  return (
    <section id="vault" className="py-20 sm:py-40 bg-void relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-32 gap-8 sm:gap-12"
        >
          <div className="space-y-4 sm:space-y-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-[12px] tracking-[0.4em] sm:tracking-[0.6em] text-accent">
              <span className="bg-accent text-void px-3 sm:px-4 py-1 font-bold rounded-full">LIVE_RECORDS</span>
              <span className="animate-pulse whitespace-nowrap">● SIGNAL_CONNECTED</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8]">THE VAULT</h2>
          </div>
          <div className="md:text-right font-mono text-[10px] sm:text-[12px] text-gray-500 space-y-2 sm:space-y-3 uppercase tracking-[0.2em] sm:tracking-[0.4em] max-w-sm">
            <p>Every piece is a singular artifact from the global network.</p>
            <p className="text-accent font-bold">RECOVERED_01 OF 01</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-24 sm:gap-y-40">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx % 2 * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group">
                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                  {/* Image Part */}
                  <div className="w-full xl:w-3/5 relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl glass-panel group-hover:shadow-[0_20px_80px_-20px_rgba(223,255,0,0.3)] transition-all duration-700">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                    />
                    
                    {/* Glass Overlays */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 glass-panel px-4 sm:px-6 py-1 sm:py-2 rounded-full font-mono text-[9px] sm:text-[11px] font-bold text-accent">
                      #{product.id}
                    </div>

                    {product.status === ItemStatus.SOLD && (
                      <div className="absolute inset-0 bg-void/80 backdrop-blur-md flex items-center justify-center">
                        <div className="glass-panel p-8 sm:p-16 rounded-full rotate-[-15deg] border-accent/50">
                          <span className="text-2xl sm:text-4xl font-black text-accent tracking-tighter uppercase italic">ARCHIVED</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 glass-panel p-3 sm:p-4 rounded-xl sm:rounded-2xl flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="font-mono text-[8px] sm:text-[10px] text-accent font-bold tracking-widest uppercase">ECO_REDUCTION: {product.carbonSaved}</span>
                      <span className="font-mono text-[8px] sm:text-[10px] text-white/50">{product.era}</span>
                    </div>
                  </div>

                  {/* Text Part */}
                  <div className="w-full xl:w-2/5 flex flex-col justify-between py-2 sm:py-4">
                    <div className="space-y-6 sm:space-y-10">
                      <div className="space-y-3 sm:space-y-4">
                        <span className="font-mono text-[9px] sm:text-[11px] text-accent tracking-[0.4em] sm:tracking-[0.5em] block uppercase opacity-60">
                          [{product.category.toUpperCase()}]
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-none group-hover:text-accent transition-colors duration-500">
                          {product.name}
                        </h3>
                        <div className="text-2xl sm:text-3xl font-black text-white/90 font-mono tracking-tighter">
                          {product.price}
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed italic opacity-80">
                          "{product.provenance}"
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {product.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-3 sm:gap-4 font-mono text-[9px] sm:text-[11px] text-white/60 uppercase group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover/item:scale-150 transition-transform"></span>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 sm:mt-16">
                      {product.status === ItemStatus.AVAILABLE ? (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 sm:py-6 glass-panel bg-white text-void font-bold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] hover:bg-accent transition-all uppercase rounded-full"
                        >
                          SECURE_TRANSACTION
                        </motion.button>
                      ) : (
                        <div className="w-full py-4 sm:py-6 glass-panel text-gray-600 font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-center uppercase rounded-full">
                          LOCKED_BY_OWNER
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vault;
