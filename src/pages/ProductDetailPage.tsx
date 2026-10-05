import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ShoppingBag, Check, ArrowLeft, ShieldCheck, Truck, Package, Share2 } from 'lucide-react';
import { Product } from '../types/database';
import { getProductBySlug } from '../services/dataService';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { generateProductWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { updatePageSEO } from '../utils/seo';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  const { addItem } = useCart();
  const { siteSettings } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        if (data) {
          const mainImg = data.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg';
          setActiveImage(mainImg);
          updatePageSEO({
            title: `${data.name} (${data.brand})`,
            description: data.short_description || data.description || `Inquire for genuine ${data.name} at Bright Okeyson Nigeria Enterprises.`
          });
        }
      } catch (err) {
        console.warn('Error loading product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-4/3 bg-neutral-900 rounded animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-neutral-900 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-neutral-900 rounded w-1/2 animate-pulse" />
              <div className="h-32 bg-neutral-900 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-neutral-950 min-h-screen py-24 text-white text-center px-4">
        <h2 className="text-2xl font-bold uppercase font-['Barlow_Condensed'] mb-2">
          Product Not Found
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          The requested product could not be located in our catalogue.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const waUrl = getWhatsAppUrl(
    siteSettings.primary_whatsapp,
    generateProductWhatsAppMessage(product.name, product.brand, product.sku)
  );

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/products" className="hover:text-white">Catalogue</Link>
          <span aria-hidden="true">/</span>
          <span className="text-red-500 font-semibold truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-4/3 sm:aspect-16/10 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden relative shadow-xl">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-neutral-950/80 border border-neutral-800 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                {product.availability}
              </div>
              <div className="absolute top-4 right-4 bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded">
                {product.brand}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImage(product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg')}
                className={`w-20 h-20 rounded bg-neutral-900 border-2 overflow-hidden ${
                  activeImage === (product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg')
                    ? 'border-red-600'
                    : 'border-neutral-800'
                }`}
              >
                <img
                  src={product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                  alt="Thumb 1"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Specification Module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand and SKU Metadata */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider">
                <span className="text-red-400 font-bold">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category_name || 'Genuine Part'}</span>
                {product.sku && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-neutral-500">SKU: {product.sku}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              {/* Price Notice (Never fake or fixed prices) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded p-4">
                <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  Price Policy
                </div>
                <div className="text-lg font-bold text-red-400 mt-0.5">
                  Contact us for current price
                </div>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Due to frequent exchange rate fluctuations in Nigeria, prices are quoted on live inquiry to ensure exact accuracy.
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="space-y-1.5 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Product Description
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Specifications Table */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Technical Specifications
                  </h3>
                  <div className="bg-neutral-900 border border-neutral-800 rounded divide-y divide-neutral-800 text-xs">
                    {product.specifications.map((spec) => (
                      <div key={spec.id || spec.spec_key} className="p-2.5 flex justify-between gap-4">
                        <span className="text-neutral-400 font-medium">{spec.spec_key}</span>
                        <span className="text-neutral-200 font-semibold text-right">{spec.spec_value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="pt-2 flex items-center gap-4">
                <label htmlFor="qty-input" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Quantity:
                </label>
                <div className="flex items-center border border-neutral-700 bg-neutral-900 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="qty-input"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-12 text-center text-xs font-bold font-mono bg-transparent text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-neutral-300 hover:text-white text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-green-700 hover:bg-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>INQUIRE NOW ON WHATSAPP</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Added to Inquiry Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO INQUIRY CART ({quantity})</span>
                  </>
                )}
              </button>

              {/* Dealership Trust Callout */}
              <div className="pt-2 text-xs text-neutral-400 space-y-2 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>100% Genuine factory motorcycle components</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Pickup available at Ikare Akoko (Ondo) & Kabba (Kogi)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
