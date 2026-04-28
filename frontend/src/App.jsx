import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductDetails from './components/ProductDetails';
import AiChatWidget from './components/AiChatWidget';
import LanguageToggle from './components/LanguageToggle';
import { fetchProduct } from './services/api';
import { AlertCircle } from 'lucide-react';

function App() {
  const { i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    fetchProduct()
      .then(data => {
        if (data) {
          setProduct(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-[#fdfaf6]">
      <div className="card p-8 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-[#e6b3b3]" />
        <h2 className="text-xl font-semibold">Service temporarily unavailable</h2>
        <p className="text-premium-600">Please try again later.</p>
      </div>
    </div>
  );

  if (!product) return <div className="flex justify-center items-center h-screen text-[#e6b3b3] animate-pulse font-medium tracking-wide">Loading premium experience...</div>;

  return (
    <div className="min-h-screen pb-16">
      <header className="bg-white/80 backdrop-blur-md py-4 px-6 md:px-12 shadow-sm flex justify-between items-center sticky top-0 z-50">
        <div className="font-display font-bold text-2xl text-[#d99c9c] tracking-tight">
          MumzWorld <span className="font-light text-premium-400">Advisor</span>
        </div>
        <LanguageToggle />
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <ProductDetails product={product} />
        </div>
        <div className="lg:col-span-4 relative">
          <div className="sticky top-28">
            <AiChatWidget productId={product.id} productName={product.product_name} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
