import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-premium-900/40 backdrop-blur-sm z-[60] transition-opacity animate-fade-in"
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-out border-l border-premium-100">
        
        <div className="p-6 border-b border-premium-100 flex justify-between items-center bg-[#FAF8F5]">
          <h2 className="text-xl font-bold text-premium-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#d99c9c]" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-premium-400 hover:text-premium-900 bg-white rounded-full shadow-sm hover:shadow transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-premium-400 gap-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="mt-4 px-6 py-2 border border-premium-200 rounded-full text-premium-600 hover:text-premium-900 hover:border-premium-900 transition-colors text-sm font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-[#FAF8F5] rounded-2xl border border-premium-100">
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm text-premium-900 leading-tight">{item.product_name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-premium-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="font-bold text-premium-900 text-sm">{item.currency} {item.price}</div>
                      
                      <div className="flex items-center gap-3 bg-white rounded-lg border border-premium-100 px-2 py-1 shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-premium-400 hover:text-premium-900 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-premium-400 hover:text-premium-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-premium-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-premium-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-premium-900">AED {cartTotal.toLocaleString()}</span>
            </div>
            <button className="w-full btn-primary py-4 text-lg shadow-lg shadow-[#d99c9c]/30">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}
