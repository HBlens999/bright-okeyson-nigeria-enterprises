import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Product } from '../../types/database';
import { getProducts } from '../../services/dataService';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { generateProductWhatsAppMessage, getWhatsAppUrl } from '../../utils/whatsapp';

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addItem } = useCart();
  const { siteSettings } = useSettings();

  useEffect(() => {
    async function load() {
      try {
        const { products: data } = await getProducts({ featuredOnly: true, limit: 8 });
        setProducts(data);
      } catch (err) {
        console.warn('Error loading featured products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleAddToCart = (p: Product) => {
    addItem(p.id, 1);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="bg-neutral-950 text-white py-16 sm:py-20 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-1">
              <span>Verified Genuine Catalogue</span>
              <span aria-hidden="true">·</span>
              <span>Fast Fulfilment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
              Featured Motorcycles & Genuine Parts
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-neutral-900 border border-neutral-800 rounded p-4 h-80 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded p-8 text-center max-w-md mx-auto">
            <p className="text-neutral-400 text-sm mb-4">
              Products are currently being updated. Please contact us on WhatsApp for assistance.
            </p>
            <a
              href={`https://wa.me/2348069382393`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const waUrl = getWhatsAppUrl(
                siteSettings.primary_whatsapp,
                generateProductWhatsAppMessage(product.name, product.brand, product.sku)
              );

              return (
                <div
                  key={product.id}
                  className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded overflow-hidden flex flex-col transition-all duration-200"
                >
                  {/* Lead with imagery */}
                  <Link
                    to={`/products/${product.slug}`}
                    className="relative aspect-4/3 bg-neutral-950 overflow-hidden block"
                  >
                    <img
                      src={product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock Status Tag */}
                    <div className="absolute top-2.5 left-2.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-950/80 text-emerald-400 border border-neutral-800">
                      {product.availability}
                    </div>

                    {product.brand && (
                      <div className="absolute top-2.5 right-2.5 text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-700 text-white">
                        {product.brand}
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                        {product.category_name || 'Genuine Part'}
                      </div>
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-bold text-base text-white hover:text-red-400 line-clamp-1 mt-0.5 transition-colors"
                      >
                        {product.name}
                      </Link>
                      {product.short_description && (
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {product.short_description}
                        </p>
                      )}
                    </div>

                    {/* Pricing & Order Actions */}
                    <div className="pt-4 border-t border-neutral-800 mt-4 space-y-2.5">
                      <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                        <span>Price:</span>
                        <span className="text-red-400 font-medium">Inquire for current price</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-2 bg-green-700 hover:bg-green-600 text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </a>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="py-2.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
