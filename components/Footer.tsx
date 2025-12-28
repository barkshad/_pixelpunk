
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darker pt-32 pb-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-10">
            <h3 className="text-4xl font-serif font-medium tracking-tight">pixelpunk</h3>
            <p className="text-zinc-500 max-w-sm font-medium leading-relaxed text-lg">
              Curating high-quality archives for collectors who appreciate history and good craft. 
              Found with care, delivered with respect.
            </p>
            <div className="flex gap-10">
              {['Instagram', 'Newsletter', 'Archive Logs'].map(link => (
                <a key={link} href="#" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.3em]">{link}</a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Resource Gallery</h5>
            <ul className="space-y-5">
              {['Authenticity Protocol', 'Care & Repairs', 'Shipping Policy'].map(item => (
                <li key={item}><a href="#" className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors font-medium">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Current Status</h5>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 text-center space-y-2">
              <div className="text-3xl font-serif italic text-primary">Active</div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Global Network Online</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em]">© 2024 PixelPunk Archive Collections</p>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold uppercase tracking-[0.4em]">Privacy</a>
            <a href="#" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold uppercase tracking-[0.4em]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
