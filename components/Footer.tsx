
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-void border-t border-white/5 pt-20 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20 mb-20 sm:mb-32">
          <div className="sm:col-span-2 space-y-8 sm:space-y-10">
            <h3 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase">
              <span className="text-accent">_</span>PIXELPUNK
            </h3>
            <p className="text-gray-500 font-sans text-lg sm:text-xl font-bold max-w-lg tracking-tight leading-tight uppercase">
              THE INTERSECTION OF <br className="hidden md:block"/> ARCHIVAL APPAREL & <br className="hidden md:block"/> HIGH-CONTRAST LIFESTYLE.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-10">
              {['INSTAGRAM', 'THREADS', 'TWITTER', 'ARCHIVE_DATA'].map((social) => (
                <a key={social} href="#" className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-white/40 hover:text-accent transition-colors uppercase whitespace-nowrap">{social}</a>
              ))}
            </div>
          </div>
          
          <div className="space-y-8 sm:space-y-10">
            <h5 className="font-mono text-[10px] sm:text-[11px] text-accent tracking-[0.4em] sm:tracking-[0.5em] uppercase">// COMMS_CENTRAL</h5>
            <a 
              href="https://wa.me/yournumber" 
              className="inline-flex flex-row sm:flex-col items-center sm:items-start gap-4 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent flex items-center justify-center text-void group-hover:bg-white transition-all rounded-lg sm:rounded-none">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-white group-hover:text-accent transition-colors">INITIALIZE_CHAT</span>
                <span className="block font-mono text-[8px] sm:text-[9px] text-white/30 tracking-widest uppercase">WA_SECURE_CHANNEL</span>
              </div>
            </a>
          </div>

          <div className="p-6 sm:p-8 border border-white/10 bg-void/50 flex flex-col justify-center items-center text-center rounded-2xl">
             <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent text-accent flex items-center justify-center font-bold mb-4 sm:mb-6 text-xs sm:text-sm">
                ECO
             </div>
             <h6 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4 tracking-tighter uppercase">SUSTAINABILITY_LOG</h6>
             <p className="font-mono text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
               EVERY_PIECE_SAVED_EMITS_APPROX_14KG_LESS_CO2. THRIFTING_IS_REVOLUTION.
             </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <p className="font-mono text-[8px] sm:text-[10px] text-white/20 tracking-[0.3em] sm:tracking-[0.5em] uppercase text-center sm:text-left">© 2024 _PIXELPUNK ARCHIVE_SYSTEMS</p>
          <div className="flex gap-6 sm:gap-8 font-mono text-[8px] sm:text-[9px] text-white/20 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            <a href="#" className="hover:text-accent transition-colors">TERMS</a>
            <a href="#" className="hover:text-accent transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-accent transition-colors">V:2.4.2</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
