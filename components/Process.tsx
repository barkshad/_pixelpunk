
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Global Scan',
      desc: 'Our network monitors private estate sales and archival warehouses in major cultural hubs.',
      icon: '🔍'
    },
    {
      id: '02',
      title: 'Verification',
      desc: '12-point authenticity check performed by our lab specialists including fabric DNA and era marking.',
      icon: '🛡️'
    },
    {
      id: '03',
      title: 'Archive Restoration',
      desc: 'Professional cleaning and structural reinforcement using era-accurate materials.',
      icon: '✨'
    },
    {
      id: '04',
      title: 'Secure Release',
      desc: 'Items are logged into the Vault and released via encrypted protocols to new owners.',
      icon: '📦'
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">System Logic</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">The Protocol</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            How we ensure every artifact in our collection is authentic, rare, and ready for your collection.
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
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black group-hover:scale-110 transition-transform">
                {step.id}
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner border border-primary/20">
                {step.icon}
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-2xl font-black uppercase tracking-tight">{step.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed uppercase tracking-tight">
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
