
import React from 'react';
import { motion } from 'framer-motion';

const Sourcing: React.FC = () => {
  const inputClasses = "w-full glass-panel bg-void/20 border-white/5 p-6 font-mono text-[11px] tracking-widest focus:border-accent focus:outline-none transition-all text-white placeholder-gray-700 focus:bg-accent/[0.02] rounded-2xl";

  return (
    <section id="services" className="py-48 bg-void relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="font-mono text-accent text-[12px] tracking-[0.8em] block uppercase">// GLOBAL_BOUNTY_NETWORK</span>
              <h2 className="text-7xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8]">THE BOUNTY</h2>
              <p className="text-gray-500 font-sans text-xl font-medium tracking-tight leading-relaxed uppercase max-w-lg">
                Your vision is our directive. Submit a custom search for the world's most elusive archival artifacts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { id: '01', title: 'GLOBAL SOURCING', text: 'Direct access to verified collectors and secret archives.' },
                { id: '02', title: 'MODIFICATION', text: 'Industrial-grade rework tailored to your body geometry.' }
              ].map(card => (
                <div key={card.id} className="glass-panel p-10 rounded-3xl space-y-4 group hover:border-accent/30 transition-all">
                  <span className="font-mono text-accent text-[12px] font-bold">{card.id} // SECURED</span>
                  <h4 className="font-black text-lg tracking-tight uppercase">{card.title}</h4>
                  <p className="text-[11px] font-mono text-gray-500 leading-relaxed uppercase">{card.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent blur-2xl opacity-50"></div>
            <form className="relative glass-panel p-12 md:p-16 rounded-[40px] space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-mono text-[9px] text-accent/60 tracking-[0.5em] uppercase px-2">USER_IDENT</label>
                  <input type="text" placeholder="NAME" className={inputClasses} />
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[9px] text-accent/60 tracking-[0.5em] uppercase px-2">COMM_LINK</label>
                  <input type="email" placeholder="EMAIL" className={inputClasses} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="font-mono text-[9px] text-accent/60 tracking-[0.5em] uppercase px-2">SCALE_COORD</label>
                   <select className={inputClasses}>
                     <option>SIZE_SMALL</option>
                     <option>SIZE_MEDIUM</option>
                     <option>SIZE_LARGE</option>
                   </select>
                </div>
                <div className="space-y-3">
                  <label className="font-mono text-[9px] text-accent/60 tracking-[0.5em] uppercase px-2">BUDGET_ALLOCATION</label>
                  <input type="text" placeholder="ALLOCATION_USD" className={inputClasses} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-[9px] text-accent/60 tracking-[0.5em] uppercase px-2">AESTHETIC_PARAMETERS</label>
                <textarea rows={4} placeholder="DESCRIBE THE TARGET AESTHETIC..." className={inputClasses}></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-8 bg-white text-void font-bold text-xs tracking-[0.8em] rounded-full hover:bg-accent transition-all group overflow-hidden relative"
              >
                <span className="relative z-10">INITIALIZE_BOUNTY</span>
              </motion.button>
              
              <div className="text-center pt-4">
                 <span className="font-mono text-[9px] text-gray-600 tracking-[0.2em] uppercase">CONSULTATION_FEE_APPLIES_ON_RECOVERY</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sourcing;
