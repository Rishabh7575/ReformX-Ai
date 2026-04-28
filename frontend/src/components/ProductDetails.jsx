import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function ProductDetails({ product }) {
  const { t } = useTranslation();

  return (
    <div className="card p-6 h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-premium-100 rounded-xl aspect-square flex items-center justify-center">
          <div className="text-premium-400 font-medium">Product Image Placeholder</div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-premium-500 font-semibold mb-1">{product.brand}</h3>
            <h1 className="text-3xl font-bold text-premium-800">{product.name}</h1>
            <p className="text-premium-600 mt-2">{product.category}</p>
          </div>
          
          <div className="prose prose-premium mt-4">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto">
            <button className="btn-primary w-full md:w-auto">Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-premium-100 pt-6">
        <div>
          <h2 className="text-xl font-semibold text-premium-800 mb-4">Specifications</h2>
          <ul className="space-y-3 text-premium-700">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key} className="flex items-start">
                <span className="font-medium w-1/2 capitalize">{key.replace(/_/g, ' ')}:</span>
                <span className="w-1/2">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
           <h2 className="text-xl font-semibold text-premium-800 mb-4">Safety Information</h2>
           <ul className="space-y-3">
            {product.safety_warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-premium-700 bg-pastel-pink/30 p-3 rounded-lg border border-pastel-pink">
                <AlertTriangle className="w-5 h-5 text-premium-500 shrink-0 mt-0.5" />
                <span className="text-sm">{warning}</span>
              </li>
            ))}
           </ul>
        </div>
      </div>
    </div>
  );
}
