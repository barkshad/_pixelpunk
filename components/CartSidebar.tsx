
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface CartSidebarProps {
  cart: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, onClose, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-dark border-l border-white/10 shadow-2xl flex flex-col"
      >
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
             </div>
             <div>
               <h3 className="text-xl font-black uppercase italic tracking-tighter">Your Bag</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cart.length} Items Locked</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="text-6xl opacity-20">🛒</div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Your archive bag is empty</p>
              <button onClick={onClose} className="text-primary text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1">Continue Finding</button>
            </div>
          ) : (
            cart.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id} 
                className="flex gap-6 group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-primary/30 transition-all">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-all line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-black">{item.price}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-darker border-t border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Vault Processing</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-2xl font-black italic tracking-tighter">
                <span>Estimated Total</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full btn-primary py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all">
              Initialize Secure Checkout
            </button>
            <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
              By proceeding, you agree to our Archive Acquisition Protocol. <br />Final payment calculated at sync.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartSidebar;
