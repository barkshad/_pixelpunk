
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg glass-card rounded-[3.5rem] p-10 md:p-14 shadow-2xl overflow-hidden border border-white/10"
      >
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="text-center space-y-6 mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-4xl mx-auto shadow-inner border border-primary/20">
            👤
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter">
              {isRegister ? 'New Identity' : 'Sync Protocol'}
            </h3>
            <p className="text-slate-400 font-medium text-sm">
              {isRegister ? 'Join the archive network' : 'Enter your credentials to access the vault'}
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {isRegister && (
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Display Name</label>
              <input type="text" placeholder="ARCHIVIST_01" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
            </div>
          )}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Secure Email</label>
            <input type="email" placeholder="identity@network.link" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Access Key</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
          </div>

          <button className="w-full btn-primary py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 mt-4 active:scale-95 transition-all">
            {isRegister ? 'Initialize Access' : 'Authenticate ID'}
          </button>
        </form>

        <div className="mt-12 text-center space-y-6">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            {isRegister ? 'Already have an ID? Sync here' : 'New to the archive? Register Identity'}
          </button>
          <div className="flex justify-center items-center gap-3">
             <div className="h-px w-12 bg-white/10"></div>
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Global Network Sec</span>
             <div className="h-px w-12 bg-white/10"></div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            By syncing, you agree to the <br />Archive Data Security Protocol V2.1
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
