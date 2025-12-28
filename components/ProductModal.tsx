import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { optimizeCloudinaryUrl } from '../services/cloudinary';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/95 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
      >
        {/* Left Side: Large Image */}
        <div className="w-full lg:w-1/2 relative bg-zinc-800 h-64 lg:h-auto">
          <img 
            src={optimizeCloudinaryUrl(product.imageUrl, 1200)} 
            alt={product.name} 
            className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-primary px-4 py-2 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
              Verified Original
            </span>
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="flex-1 p-8 lg:p-14 overflow-y-auto hide-scrollbar flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-serif italic text-xl">{product.category} — {product.era}</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-tight">{product.name}</h2>
              <div className="text-3xl font-serif text-zinc-400 italic">{product.price}</div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">The Story Behind the Piece</h4>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  {product.provenance}
                </p>
                <p className="text-zinc-400 text-sm italic">
                  "This item was selected because its silhouette is more relevant today than when it was first made. It's the ultimate 'if you know, you know' addition to your wardrobe."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-800/30 border border-white/5">
                  <div className="text-2xl mb-2">🌿</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Planet Impact</div>
                  <div className="text-lg font-bold text-success">{product.carbonSaved} Carbon Saved</div>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-800/30 border border-white/5">
                  <div className="text-2xl mb-2">🧵</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Wearability</div>
                  <div className="text-lg font-bold text-white">Daily Ready</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Archive Details</h4>
                <div className="flex flex-wrap gap-2">
                  {product.details.map((detail, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-zinc-800 border border-white/5 text-xs font-medium text-zinc-300">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="w-full btn-vintage py-6 rounded-full text-lg shadow-2xl active:scale-95 transition-all"
              >
                Claim This Unique Item
              </button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  Secure Checkout • Worldwide Express Shipping
                </p>
                <p className="text-[10px] text-zinc-400 font-medium">
                  Once sold, this specific item will never return to the shop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;