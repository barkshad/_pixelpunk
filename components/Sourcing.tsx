
import React from 'react';
import { motion } from 'framer-motion';

const Sourcing: React.FC = () => {
  const inputClasses = "w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-medium text-sm";

  return (
    <section id="services" className="py-24 sm:py-32 bg-darker relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none uppercase">Need a <br />Unique Piece?</h2>
              <p className="text-xl text-slate-300 font-medium max-w-md leading-relaxed">
                Tell us what you're looking for, and our global network of experts will track it down for you.
              </p>
            </div>
            
            <div className="grid gap-8">
              {[
                { title: 'Trusted Network', desc: 'We source directly from trusted collectors and high-end estates.', icon: '🌍' },
                { title: 'Fast Recovery', desc: 'Average sourcing time is 7-14 days for most archival requests.', icon: '⚡' }
              ].map(item => (
                <div key={item.title} className="flex gap-6 p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 shadow-sm">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-[4rem] bg-slate-900/50 border border-white/5 shadow-2xl backdrop-blur-md"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-2">Your Name</label>
                  <input type="text" placeholder="Type your name here" className={inputClasses} />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-2">Email Address</label>
                  <input type="email" placeholder="example@email.com" className={inputClasses} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-2">What are you looking for?</label>
                <textarea rows={4} placeholder="Tell us about the piece you want (e.g. Vintage leather jacket, size Medium)..." className={inputClasses}></textarea>
              </div>

              <button type="submit" className="w-full btn-primary py-6 rounded-[1.5rem] font-extrabold text-white text-base uppercase tracking-widest shadow-lg">
                Submit Request
              </button>
              
              <p className="text-[11px] text-center text-slate-500 font-bold tracking-wider uppercase opacity-80">
                We'll get back to you within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sourcing;
