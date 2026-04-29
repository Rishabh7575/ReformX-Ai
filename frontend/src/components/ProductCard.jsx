import React from 'react';
import { Star, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart();

  return (
    <div className="card group flex flex-col h-full animate-fade-in bg-white hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image_url} 
          alt={product.product_name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#d99c9c] shadow-sm">
          {product.brand}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="font-bold text-premium-900 text-lg leading-tight line-clamp-2 cursor-pointer hover:text-[#d99c9c] transition-colors"
            onClick={() => onSelect(product)}
          >
            {product.product_name}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-premium-600">{product.rating}</span>
        </div>
        
        <p className="text-sm text-premium-500 line-clamp-2 mb-4 flex-grow">
          {product.short_description}
        </p>
        
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-premium-50">
          <div className="flex flex-col">
            <span className="text-xs text-premium-400 font-medium">{product.currency}</span>
            <span className="text-xl font-bold text-premium-900 leading-none">{product.price}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onSelect(product)}
              className="p-2.5 rounded-xl border border-[#d99c9c] text-[#d99c9c] hover:bg-[#fceeee] transition-colors flex items-center justify-center tooltip-trigger group/btn"
              title="Ask AI Advisor"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="px-4 py-2.5 bg-[#d99c9c] text-white rounded-xl font-medium hover:bg-[#c68989] transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
