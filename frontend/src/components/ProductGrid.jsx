import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function ProductGrid({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-[#d99c9c]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-premium-900 mb-2">Premium Baby Gear</h1>
          <p className="text-premium-500">Curated essentials for your little one's safety and comfort.</p>
        </div>
        <div className="text-sm font-medium text-premium-400 bg-white px-4 py-2 rounded-full shadow-sm border border-premium-100">
          Showing {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelect={onSelectProduct} 
          />
        ))}
      </div>
    </div>
  );
}
