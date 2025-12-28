
import React from 'react';
import { ARCHIVE_ITEMS } from '../constants';

const Archive: React.FC = () => {
  return (
    <section id="archive" className="py-24 sm:py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-accent text-xs font-bold tracking-[0.4em] uppercase">// Historical Records</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">The Archive</h2>
            <p className="text-slate-400 font-medium">A curated history of drops, styling, and archival research.</p>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-slate-900 border border-white/10 text-sm font-bold text-slate-200 hover:bg-slate-800 transition-all uppercase tracking-widest">
            View All Logs
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-12 hide-scrollbar snap-x scroll-smooth">
        <div className="flex gap-10 px-6 md:pl-[10%]">
          {ARCHIVE_ITEMS.map((item) => (
            <div key={item.id} className="min-w-[300px] md:min-w-[480px] snap-center group">
              <div className="relative aspect-[4/3] mb-8 overflow-hidden rounded-[3rem] border border-white/5 group-hover:border-primary/50 transition-all duration-500 shadow-soft">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-accent bg-darker/60 backdrop-blur-md border border-accent/30 px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                  <div className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">{item.date}</div>
                </div>
              </div>
              <p className="text-slate-400 font-medium px-4 max-w-md leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
          <div className="min-w-[50px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Archive;
