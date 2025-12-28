
import React from 'react';
import { motion } from 'framer-motion';

interface PolicyModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/98 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-3xl bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-3xl font-serif italic text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12 text-zinc-400 leading-relaxed space-y-6 font-medium text-sm md:text-base">
          {content}
        </div>
        <div className="p-6 bg-zinc-950/50 border-t border-white/5 text-center">
          <button onClick={onClose} className="btn-vintage px-10 py-3 rounded-full text-xs uppercase tracking-widest font-bold">
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PolicyModal;
