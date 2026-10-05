import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { generateCartWhatsAppMessage, getWhatsAppUrl } from '../../utils/whatsapp';
import { submitInquiry } from '../../services/dataService';

export const CartDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    cartItemsWithProducts,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemCount
  } = useCart();
  const { siteSettings } = useSettings();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isDrawerOpen) return null;

  const handleWhatsAppCheckout = async () => {
    if (cartItemsWithProducts.length === 0) return;

    setSubmitting(true);
    try {
      // 1. Record inquiry in Supabase / Local database
      await submitInquiry({
        customer_name: customerName.trim() || 'WhatsApp Customer',
        phone: customerPhone.trim() || 'Not Provided',
        location: customerLocation.trim() || 'Not Specified',
        source: 'cart_drawer',
        items: cartItemsWithProducts.map(i => ({
          product_id: i.product.id,
          product_name_snapshot: i.product.name,
          quantity: i.quantity
        }))
      });

      // 2. Generate WhatsApp message
      const msg = generateCartWhatsAppMessage({
        items: cartItemsWithProducts.map(i => ({
          name: i.product.name,
          quantity: i.quantity
        })),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerLocation: customerLocation.trim()
      });

      // 3. Open WhatsApp
      const url = getWhatsAppUrl(siteSettings.primary_whatsapp, msg);
      window.open(url, '_blank');
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="font-extrabold text-base uppercase font-['Barlow_Condensed'] tracking-wide">
                Product Inquiry Cart ({totalItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded bg-neutral-800/80 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItemsWithProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-neutral-400 text-sm">Your inquiry cart is empty.</p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Browse Motorcycle Parts
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItemsWithProducts.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="bg-neutral-950 border border-neutral-800 rounded p-3 flex gap-3 items-center"
                    >
                      <div className="w-14 h-14 bg-neutral-800 rounded shrink-0 overflow-hidden border border-neutral-800 flex items-center justify-center">
                        {product.main_image_url ? (
                          <img
                            src={product.main_image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[10px] text-neutral-400 font-bold uppercase">{product.brand}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-red-500 font-bold uppercase">{product.brand}</div>
                        <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          Price: <span className="text-neutral-200">Contact for current price</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="p-1 text-neutral-500 hover:text-red-400 ml-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Customer Info for WhatsApp dispatch */}
                <div className="bg-neutral-950 border border-neutral-800 rounded p-3.5 space-y-2.5 mt-4">
                  <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Your Contact Info (Optional)
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name / Workshop"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="Your City/State (e.g. Ikare Akoko, Kabba)"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {cartItemsWithProducts.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-2.5">
              <button
                disabled={submitting}
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>INQUIRE VIA WHATSAPP ({totalItemCount} ITEMS)</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={clearCart}
                  className="text-neutral-500 hover:text-neutral-300 underline"
                >
                  Clear all items
                </button>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="text-neutral-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <span>Full Cart Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
