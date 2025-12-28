
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-extrabold font-display">pixelpunk</h3>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              Curating the future by reclaiming the past. The world's most trusted source for archival apparel and luxury artifacts.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'TikTok'].map(social => (
                <a key={social} href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">{social}</a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-[0.3em]">Resources</h5>
            <ul className="space-y-4">
              {['Authentication', 'Shipping Policy', 'Care Guide'].map(item => (
                <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-[0.3em]">Lab Status</h5>
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center">
              <div className="text-2xl font-bold text-primary mb-1">98.4%</div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Circular Success Rate</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-600 font-medium uppercase tracking-widest">© 2024 PixelPunk Archives. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-slate-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-white transition-colors font-bold uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
