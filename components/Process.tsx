
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Searching Everywhere',
      desc: 'We look through vintage collections and markets all over the world to find the best items.',
      icon: '🌍'
    },
    {
      id: '02',
      title: 'Checking Quality',
      desc: 'Our experts check every item to make sure it is 100% real and in great condition.',
      icon: '✅'
    },
    {
      id: '03',
      title: 'Carefully Cleaning',
      desc: 'Every item is professionally cleaned and fixed up so it feels like new for you.',
      icon: '✨'
    },
    {
      id: '04',
      title: 'Shipping to You',
      desc: 'We pack your items safely and ship them fast so you can start wearing them.',
      icon: '📦'
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">How it Works</span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">Our Simple Way</h2>
          <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed">
            We handle everything from finding the clothes to checking their quality, so you can shop with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 rounded-[3rem] space-y-8 group hover:border-primary/40 transition-all border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-black">
                {step.id}
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-primary/20">
                {step.icon}
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-2xl font-bold tracking-tight">{step.title}</h4>
                <p className="text-base text-slate-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
