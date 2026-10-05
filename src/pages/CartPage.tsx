import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { generateCartWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { submitInquiry } from '../services/dataService';
import { updatePageSEO } from '../utils/seo';

export const CartPage: React.FC = () => {
  const { cartItemsWithProducts, updateQuantity, removeItem, clearCart, totalItemCount } = useCart();
  const { siteSettings } = useSettings();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    updatePageSEO({
      title: 'Inquiry Cart & Order Dispatch',
      description: 'Review your selected motorcycles and spare parts for WhatsApp inquiry and price quotes.'
    });
  }, []);

  const handleWhatsAppCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItemsWithProducts.length === 0) return;

    setSubmitting(true);
    try {
      // 1. Record inquiry in Supabase database
      await submitInquiry({
        customer_name: customerName.trim() || 'WhatsApp Customer',
        phone: customerPhone.trim() || 'Not Provided',
        location: customerLocation.trim() || 'Not Specified',
        source: 'cart_page',
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

      setSubmitted(true);

      // 3. Open WhatsApp in new tab
      const url = getWhatsAppUrl(siteSettings.primary_whatsapp, msg);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Inquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-red-500 font-semibold">Inquiry Cart</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight mb-8">
          Motorcycle & Spare Parts Inquiry Cart ({totalItemCount})
        </h1>

        {cartItemsWithProducts.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-950 flex items-center justify-center text-neutral-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed']">
              Your Inquiry Cart is Empty
            </h2>
            <p className="text-xs text-neutral-400">
              Add complete motorcycles or genuine spare parts from our catalogue to request current live prices.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Itemized List (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded divide-y divide-neutral-800">
                {cartItemsWithProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-950 rounded shrink-0 overflow-hidden border border-neutral-800">
                      <img
                        src={product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-red-500 font-bold uppercase">{product.brand}</div>
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-bold text-base text-white hover:text-red-400 truncate block transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        Price: <span className="text-neutral-200">Contact for current price</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-neutral-700 bg-neutral-950 rounded">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1 text-neutral-300 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1 text-neutral-300 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-2 text-neutral-500 hover:text-red-400 transition-colors ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
                <Link to="/products" className="hover:text-white flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Browsing Catalogue</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 underline font-medium"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Right Column: Checkout & WhatsApp Dispatch Form (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-900 border border-neutral-800 rounded p-6 sm:p-7 space-y-5 sticky top-24">
                <div>
                  <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed'] text-white">
                    Submit WhatsApp Inquiry
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Provide your contact details so our sales team can address you directly with current pricing and branch pickup options.
                  </p>
                </div>

                {submitted && (
                  <div className="p-3.5 bg-green-950/80 border border-green-800 rounded flex items-center gap-2.5 text-green-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Inquiry submitted to database and opened on WhatsApp!</span>
                  </div>
                )}

                <form onSubmit={handleWhatsAppCheckout} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                      Your Full Name / Mechanic Workshop
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Samuel Adeyemi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08069382393"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                      Delivery Location / Town
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ikare Akoko, Kabba, Akure, Lokoja"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-6 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{submitting ? 'Connecting...' : `INQUIRE VIA WHATSAPP (${totalItemCount} ITEMS)`}</span>
                    </button>
                  </div>
                </form>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                    <span>Direct WhatsApp Inquiry Guarantee</span>
                  </div>
                  <p>
                    Your inquiry message is generated instantly with your selected items, quantities, and contact details. No payment is taken online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
