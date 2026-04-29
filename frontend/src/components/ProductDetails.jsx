import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Star, ShieldCheck, Heart, PlaneTakeoff, Truck } from 'lucide-react';

export default function ProductDetails({ product }) {
  const { t } = useTranslation();

  const [openSections, setOpenSections] = useState({
    whyLove: true,
    safetyFeatures: false,
    specs: false,
    compatibility: false,
    reviews: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-[2rem] aspect-[4/5] flex items-center justify-center shadow-sm border border-premium-100 relative overflow-hidden group">
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#fceeee]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>

            {/* Real Product Image */}
            <img
              src={product.image_url || "https://imgs.search.brave.com/E09dh23zZVf4ffldAj9iqF2xbkofv0GSWQ0NIUDePqM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZXZlbmZsby5jb20v/Y2RuL3Nob3AvZmls/ZXMvc3hpZ3c4ZjVh/a25laG5ubWFmdmUu/anBnP3Y9MTc2MTA3/OTgwOCZ3aWR0aD01/MzM"}
              alt={product.product_name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#d99c9c] font-bold mb-3">{product.brand}</h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-premium-900 leading-[1.1] mb-5">{product.product_name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-premium-500 text-sm font-medium border-l border-premium-200 pl-3">(4.9 based on {product.customer_reviews?.length || 0} reviews)</span>
          </div>

          <div className="text-3xl font-light text-premium-900 mb-8 flex items-baseline gap-2">
            <span className="text-xl font-medium text-premium-400">{product.currency}</span>
            {product.price}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="badge-trust">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safety First
            </div>
            <div className="badge-trust">
              <Heart className="w-4 h-4 text-[#d99c9c]" /> Parent Approved
            </div>
            <div className="badge-trust">
              <Truck className="w-4 h-4 text-blue-600" /> Fast Delivery
            </div>
          </div>

          <button className="btn-primary w-full md:w-auto text-lg py-4 shadow-xl shadow-[#d99c9c]/20">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Accordions */}
      <div className="card p-8 lg:p-10">

        {/* Why Parents Love It */}
        <div>
          <button onClick={() => toggleSection('whyLove')} className="expandable-header">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#d99c9c]" />
              Why Parents Love It
            </div>
            {openSections.whyLove ? <ChevronUp className="w-5 h-5 text-premium-400" /> : <ChevronDown className="w-5 h-5 text-premium-400" />}
          </button>
          {openSections.whyLove && (
            <div className="py-6 text-premium-700 leading-relaxed animate-fade-in">
              <p className="mb-4">Designed for modern parents on the go, this seamless system transitions from car seat to stroller in seconds. It eliminates the need to carry an extra stroller in your trunk, making quick trips to the supermarket or navigating busy airports completely effortless.</p>
            </div>
          )}
        </div>

        {/* Key Safety Features */}
        <div className="border-t border-premium-50">
          <button onClick={() => toggleSection('safetyFeatures')} className="expandable-header">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Key Safety Features
            </div>
            {openSections.safetyFeatures ? <ChevronUp className="w-5 h-5 text-premium-400" /> : <ChevronDown className="w-5 h-5 text-premium-400" />}
          </button>
          {openSections.safetyFeatures && (
            <div className="py-6 space-y-4 text-premium-700 animate-fade-in">
              <div className="flex items-start gap-3 bg-red-50/50 p-5 rounded-2xl border border-red-100">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-900 text-sm leading-relaxed">{product.safety_notes}</p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-emerald-500" /> 5-point harness</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-emerald-500" /> Side-impact protection</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-emerald-500" /> Anti-rebound bar crash tech</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-emerald-500" /> Baby-safe materials</li>
              </ul>
            </div>
          )}
        </div>

        {/* Travel Friendly Benefits */}
        <div className="border-t border-premium-50">
          <button onClick={() => toggleSection('compatibility')} className="expandable-header">
            <div className="flex items-center gap-3">
              <PlaneTakeoff className="w-5 h-5 text-blue-500" />
              Travel & Compatibility
            </div>
            {openSections.compatibility ? <ChevronUp className="w-5 h-5 text-premium-400" /> : <ChevronDown className="w-5 h-5 text-premium-400" />}
          </button>
          {openSections.compatibility && (
            <div className="py-6 space-y-5 text-premium-700 animate-fade-in">
              <div className="grid grid-cols-2 gap-6 bg-premium-50 p-6 rounded-2xl">
                <div>
                  <span className="text-xs uppercase tracking-widest text-premium-500 block mb-1">ISOFIX Support</span>
                  <span className="font-semibold text-lg">{product.compatibility?.isofix_support ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-premium-500 block mb-1">Airplane Cabin</span>
                  <span className="font-semibold text-lg">{product.compatibility?.airplane_friendly ? 'Approved' : 'Not Approved'}</span>
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-premium-500 block mb-3">Supported Cars (Examples):</span>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility?.cars_supported_examples?.map(car => (
                    <span key={car} className="bg-white border border-premium-200 px-4 py-1.5 rounded-full text-sm shadow-sm">{car}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technical Specifications */}
        <div className="border-t border-premium-50">
          <button onClick={() => toggleSection('specs')} className="expandable-header">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-premium-400 text-lg">⚙</span>
              Technical Specs
            </div>
            {openSections.specs ? <ChevronUp className="w-5 h-5 text-premium-400" /> : <ChevronDown className="w-5 h-5 text-premium-400" />}
          </button>
          {openSections.specs && (
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {Object.entries(product.technical_specs || {}).map(([key, value]) => (
                <div key={key} className="border-b border-premium-100 pb-3 last:border-0">
                  <span className="text-premium-400 text-xs uppercase tracking-wider block mb-1">{key.replace(/_/g, ' ')}</span>
                  <span className="text-premium-800 font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real Customer Highlights */}
        <div className="border-t border-premium-50">
          <button onClick={() => toggleSection('reviews')} className="expandable-header">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400" />
              Real Customer Highlights
            </div>
            {openSections.reviews ? <ChevronUp className="w-5 h-5 text-premium-400" /> : <ChevronDown className="w-5 h-5 text-premium-400" />}
          </button>
          {openSections.reviews && (
            <div className="py-6 space-y-4 animate-fade-in">
              {product.customer_reviews?.map((review, idx) => (
                <div key={idx} className="bg-white border border-premium-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex text-amber-400 mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-premium-700 leading-relaxed italic text-sm">"{review}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
