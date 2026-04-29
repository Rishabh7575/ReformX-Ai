import React from 'react';
import LanguageToggle from './LanguageToggle';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ setView }) {
  const { cartCount, setIsDrawerOpen } = useCart();

  return (
    <header className="bg-white/80 backdrop-blur-md py-4 px-6 md:px-12 shadow-sm flex justify-between items-center sticky top-0 z-50">
      <div 
        className="font-display font-bold text-2xl text-[#d99c9c] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setView('grid')}
      >
        MumzWorld <span className="font-light text-premium-400">Advisor</span>
      </div>
      
      <div className="flex items-center gap-6">
        <LanguageToggle />
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="relative p-2 text-premium-600 hover:text-[#d99c9c] transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#d99c9c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transform translate-x-1 -translate-y-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
