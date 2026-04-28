import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function ProductDetails({ product }) {
  const { t } = useTranslation();
  
  const [openSections, setOpenSections] = useState({
    specs: true,
    safety: true,
    compatibility: false,
    reviews: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-3xl aspect-[4/5] flex items-center justify-center shadow-sm border border-premium-100 p-8">
            <div className="text-premium-300 font-medium text-center border-2 border-dashed border-premium-200 rounded-2xl w-full h-full flex items-center justify-center">
              [ High Quality <br/> {product.brand} Placeholder ]
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h3 className="text-sm uppercase tracking-widest text-[#d99c9c] font-semibold mb-2">{product.brand}</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-premium-800 leading-tight mb-4">{product.product_name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-premium-500 text-sm">(4.9 based on {product.customer_reviews?.length || 0} reviews)</span>
          </div>

          <div className="text-3xl font-light text-premium-900 mb-8">
            {product.currency} {product.price}
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-premium-700">
              <CheckCircle className="w-5 h-5 text-[#e6b3b3]" /> Free Shipping & Returns
            </li>
            <li className="flex items-center gap-3 text-premium-700">
              <CheckCircle className="w-5 h-5 text-[#e6b3b3]" /> 2-Year Brand Warranty
            </li>
            <li className="flex items-center gap-3 text-premium-700">
              <CheckCircle className="w-5 h-5 text-[#e6b3b3]" /> Airplane Friendly
            </li>
          </ul>

          <div className="mt-auto pt-4 border-t border-premium-100">
            <button className="btn-primary w-full py-4 text-lg">Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="card p-6 md:p-10">
        
        {/* Specifications Section */}
        <div>
          <button onClick={() => toggleSection('specs')} className="expandable-header">
            Specifications
            {openSections.specs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.specs && (
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-premium-700">
              {Object.entries(product.technical_specs || {}).map(([key, value]) => (
                <div key={key} className="flex flex-col border-b border-premium-50 pb-2">
                  <span className="text-xs uppercase tracking-wider text-premium-400 font-semibold">{key.replace(/_/g, ' ')}</span>
                  <span className="font-medium mt-1">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Safety & Climate Section */}
        <div>
          <button onClick={() => toggleSection('safety')} className="expandable-header">
            Safety & Climate Notes
            {openSections.safety ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.safety && (
            <div className="py-6 space-y-4">
              <div className="bg-[#fceeee]/50 p-5 rounded-2xl border border-[#fceeee]">
                <h4 className="flex items-center gap-2 font-semibold text-[#d99c9c] mb-2">
                  <AlertTriangle className="w-5 h-5" /> Safety Notes
                </h4>
                <p className="text-premium-700 text-sm leading-relaxed">{product.safety_notes}</p>
              </div>
              <div className="bg-[#eaf4f4]/50 p-5 rounded-2xl border border-[#eaf4f4]">
                <h4 className="flex items-center gap-2 font-semibold text-teal-600 mb-2">
                  Climate Notes
                </h4>
                <p className="text-premium-700 text-sm leading-relaxed">{product.climate_notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Compatibility Section */}
        <div>
          <button onClick={() => toggleSection('compatibility')} className="expandable-header">
            Compatibility
            {openSections.compatibility ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.compatibility && (
            <div className="py-6 space-y-4 text-premium-700">
               <p><span className="font-semibold">ISOFIX Support:</span> {product.compatibility?.isofix_support ? 'Yes' : 'No'}</p>
               <p><span className="font-semibold">Airplane Friendly:</span> {product.compatibility?.airplane_friendly ? 'Yes' : 'No'}</p>
               <div className="mt-4">
                 <span className="font-semibold block mb-2">Supported Cars (Examples):</span>
                 <div className="flex flex-wrap gap-2">
                    {product.compatibility?.cars_supported_examples?.map(car => (
                      <span key={car} className="bg-premium-100 px-3 py-1 rounded-full text-sm">{car}</span>
                    ))}
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Customer Reviews Section */}
        <div>
          <button onClick={() => toggleSection('reviews')} className="expandable-header border-b-0">
            Customer Reviews
            {openSections.reviews ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.reviews && (
            <div className="py-6 space-y-4">
              {product.customer_reviews?.map((review, idx) => (
                <div key={idx} className="bg-white border border-premium-100 p-4 rounded-xl shadow-sm">
                  <div className="flex text-yellow-400 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-premium-700 italic text-sm">"{review}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
