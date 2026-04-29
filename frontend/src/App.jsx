import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductDetails from './components/ProductDetails';
import AiChatWidget from './components/AiChatWidget';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AlertCircle, ArrowLeft } from 'lucide-react';

function AppContent() {
  const { i18n } = useTranslation();
  const [currentView, setCurrentView] = useState('grid'); // 'grid' | 'product'
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setCurrentView('grid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-16 bg-[#FAF8F5]">
      <Navbar setView={handleBackToGrid} />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {currentView === 'grid' ? (
          <ProductGrid onSelectProduct={handleSelectProduct} />
        ) : (
          <div className="animate-fade-in">
            <button 
              onClick={handleBackToGrid}
              className="mb-6 flex items-center gap-2 text-premium-500 hover:text-[#d99c9c] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              Back to Catalog
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                {selectedProduct && <ProductDetails product={selectedProduct} />}
              </div>
              <div className="lg:col-span-4 relative">
                <div className="sticky top-28">
                  {selectedProduct && <AiChatWidget productId={selectedProduct.id} productName={selectedProduct.product_name} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
