
import React from 'react';
import { ARCHIVE_ITEMS } from '../constants';

const Archive: React.FC = () => {
  return (
    <section id="archive" className="py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <span className="font-mono text-accent text-[11px] tracking-[0.5em] block uppercase">// HISTORICAL_LOGS</span>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">THE ARCHIVE</h2>
          </div>
          <button className="font-mono text-[11px] tracking-[0.4em] border-b-2 border-accent pb-2 hover:bg-accent hover:text-void px-4 transition-all uppercase">
            EXPLORE_ALL_RECORDS
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-16 hide-scrollbar snap-x">
        <div className="flex gap-12 pl-6 md:pl-[10%]">
          {ARCHIVE_ITEMS.map((item) => (
            <div key={item.id} className="min-w-[340px] md:min-w-[550px] snap-center group">
              <div className="relative aspect-[16/10] mb-8 overflow-hidden border border-white/10 group-hover:border-accent transition-all duration-500">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="flex gap-3 mb-3">
                    {item.tags.map(tag => (
                      <span key={tag} className="font-mono text-[8px] text-accent border border-accent/40 px-2 py-0.5 uppercase">{tag}</span>
                    ))}
                  </div>
                  <h4 className="text-4xl font-black tracking-tighter uppercase">{item.title}</h4>
                  <span className="font-mono text-[10px] text-white/40 tracking-[0.4em] block mt-2">{item.date}</span>
                </div>
              </div>
              <p className="font-sans text-sm text-gray-500 font-bold uppercase tracking-tight px-1 max-w-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
          <div className="min-w-[100px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Archive;
