
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ItemStatus, Product } from '../types';
import { uploadToCloudinary } from '../services/cloudinary';

const AdminPanel: React.FC = () => {
  const { content, isLoading, updateHero, updateMarquee, updateFomo, upsertProduct, deleteProduct, resetToDefaults } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'hero' | 'inventory' | 'social'>('hero');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "12345") {
      setIsAuth(true);
    } else {
      alert("Incorrect Archive Access Code.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadToCloudinary(file);
        callback(url);
      } catch (err) {
        alert("Failed to upload image to CDN.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCommit = async (fn: () => Promise<void>) => {
    setIsSaving(true);
    try {
      await fn();
    } catch (err) {
      alert("Failed to sync with database.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'hero', name: 'Identity & Hero', icon: '✨' },
    { id: 'inventory', name: 'Archive Inventory', icon: '📦' },
    { id: 'social', name: 'Psychology & FOMO', icon: '🧠' },
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[5000] w-14 h-14 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-xl shadow-2xl hover:bg-primary transition-all group"
      >
        🛠️
        {isLoading && <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></span>}
      </button>
    );
  }

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-[6000] bg-darker/95 backdrop-blur-xl flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md vintage-card p-12 rounded-[2.5rem] text-center space-y-8">
          <div className="text-5xl">🔐</div>
          <h2 className="text-3xl font-serif italic text-white">Administrator Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter System Password" 
              className="w-full bg-zinc-950 border border-white/10 p-5 rounded-2xl text-center text-xl tracking-widest"
              autoFocus
            />
            <div className="flex gap-4">
              <button type="button" onClick={() => setIsOpen(false)} className="flex-1 px-6 py-4 rounded-full bg-zinc-800 text-sm font-bold uppercase tracking-widest text-zinc-400">Cancel</button>
              <button type="submit" className="flex-1 btn-vintage py-4 rounded-full text-sm font-bold uppercase tracking-widest">Authorize</button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[6000] bg-darker flex flex-col lg:flex-row overflow-hidden">
      {isSaving && (
        <div className="absolute inset-0 z-[8000] bg-darker/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Syncing with Cloud Archives...</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-zinc-950 border-r border-white/5 p-8 flex flex-col gap-12 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif italic text-primary">Command</h1>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="space-y-2">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-zinc-500 hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button onClick={resetToDefaults} className="w-full py-4 text-[10px] font-bold text-red-500/50 hover:text-red-500 transition-colors uppercase tracking-[0.3em]">
            Wipe & Factory Reset
          </button>
          <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
            Cloud Network Connected
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-16 bg-darker">
        <AnimatePresence mode="wait">
          {activeTab === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif italic">Hero Configuration</h2>
                <p className="text-zinc-500">Edit the primary landing message that greets high-end collectors.</p>
              </div>

              <div className="grid gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Main Slogan</label>
                  <input 
                    type="text" 
                    value={content.hero.slogan} 
                    onChange={e => updateHero({ ...content.hero, slogan: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-white font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Archive Title</label>
                  <input 
                    type="text" 
                    value={content.hero.title} 
                    onChange={e => updateHero({ ...content.hero, title: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-white text-3xl font-serif italic" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sub-Text Description</label>
                  <textarea 
                    rows={4}
                    value={content.hero.subtitle} 
                    onChange={e => updateHero({ ...content.hero, subtitle: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 p-5 rounded-2xl text-zinc-400 font-medium leading-relaxed" 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div key="inventory" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif italic">Cloud Inventory</h2>
                  <p className="text-zinc-500">Manage items stored in Firestore. Changes are live for all visitors.</p>
                </div>
                <button 
                  onClick={() => setEditingProduct({ id: 'PX-' + Date.now(), status: ItemStatus.AVAILABLE, details: [], carbonSaved: '0kg', category: 'Outerwear' })}
                  className="btn-vintage px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  Log New Find
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {content.products.map(product => (
                  <div key={product.id} className="vintage-card p-6 rounded-3xl flex gap-6 group hover:border-primary/30 transition-all">
                    <img src={product.imageUrl} className="w-24 h-24 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <h4 className="text-xl font-serif text-white">{product.name}</h4>
                      <p className="text-zinc-500 text-xs mb-4">{product.category} • {product.price}</p>
                      <div className="flex gap-4">
                        <button onClick={() => setEditingProduct(product)} className="text-[10px] font-bold text-primary uppercase tracking-widest border-b border-primary/20">Edit Record</button>
                        <button onClick={() => handleCommit(() => deleteProduct(product.id))} className="text-[10px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-widest">Purge</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {editingProduct && (
                  <div className="fixed inset-0 z-[7000] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl bg-zinc-900 rounded-[2.5rem] p-12 overflow-y-auto max-h-[90vh] space-y-10 relative shadow-2xl">
                      <button onClick={() => setEditingProduct(null)} className="absolute top-8 right-8 text-zinc-500 p-2 hover:bg-white/5 rounded-full">✕</button>
                      <h3 className="text-3xl font-serif italic">Archive Log Editor</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Item Name</label>
                            <input value={editingProduct.name || ""} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-4 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Price Tag</label>
                            <input value={editingProduct.price || ""} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-4 rounded-xl" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Era & Origin</label>
                            <input value={editingProduct.era || ""} onChange={e => setEditingProduct({...editingProduct, era: e.target.value})} className="w-full bg-zinc-950 border border-white/10 p-4 rounded-xl" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Visual Asset (CDN Storage)</label>
                          <div className="relative group">
                            <div className="w-full aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-white/10">
                              {isUploading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-[8px] font-bold text-white uppercase tracking-widest">Uploading to Cloudinary...</span>
                                  </div>
                                </div>
                              ) : (
                                <img src={editingProduct.imageUrl || "https://picsum.photos/400/500"} className="w-full h-full object-cover grayscale-[0.5]" />
                              )}
                            </div>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={e => handleImageUpload(e, (url) => setEditingProduct({...editingProduct, imageUrl: url}))}
                              className="mt-4 block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-primary transition-all cursor-pointer" 
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        disabled={isUploading}
                        onClick={() => handleCommit(async () => {
                          if (!editingProduct.name || !editingProduct.imageUrl) {
                            alert("Name and Image are mandatory.");
                            return;
                          }
                          await upsertProduct(editingProduct as Product);
                          setEditingProduct(null);
                        })}
                        className="w-full btn-vintage py-6 rounded-full font-bold uppercase tracking-widest shadow-2xl disabled:opacity-50"
                      >
                        Commit Record to Firestore
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div key="social" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-3xl space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif italic">Neuromarketing Engine</h2>
                <p className="text-zinc-500">Tune psychological triggers stored in the cloud.</p>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-[0.3em]">FOMO Notification Pool</h4>
                  <div className="space-y-4">
                    {content.fomoMessages.map((msg, idx) => (
                      <div key={idx} className="flex gap-4">
                        <input 
                          value={msg} 
                          onChange={e => {
                            const newFomo = [...content.fomoMessages];
                            newFomo[idx] = e.target.value;
                            updateFomo(newFomo);
                          }}
                          className="flex-1 bg-zinc-900 border border-white/5 p-4 rounded-xl text-sm" 
                        />
                        <button onClick={() => updateFomo(content.fomoMessages.filter((_, i) => i !== idx))} className="text-red-500/30 hover:text-red-500 p-2">✕</button>
                      </div>
                    ))}
                    <button onClick={() => updateFomo([...content.fomoMessages, "A new shopper is viewing..."])} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white">+ Add New Trigger</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;
