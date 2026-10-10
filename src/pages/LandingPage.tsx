import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, MapPin, Phone, Mail, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { LandingPage as LandingPageType, Product } from '../types/database';
import { getLandingPageBySlug, getProducts, submitInquiry } from '../services/dataService';
import { useSettings } from '../context/SettingsContext';
import { getWhatsAppUrl, generateProductWhatsAppMessage } from '../utils/whatsapp';
import { MOTORCYCLE_BRANDS } from '../lib/seedData';
import { updatePageSEO } from '../utils/seo';

export const LandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const [landingPage, setLandingPage] = useState<LandingPageType | null>(null);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { siteSettings, branches, branding } = useSettings();

  // Extract and preserve UTM parameters for advertising tracking
  const utm_source = searchParams.get('utm_source') || '';
  const utm_medium = searchParams.get('utm_medium') || '';
  const utm_campaign = searchParams.get('utm_campaign') || '';
  const utm_content = searchParams.get('utm_content') || '';
  const utm_term = searchParams.get('utm_term') || '';

  const activeSlug = slug || 'default';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [pageData, prodData] = await Promise.all([
          getLandingPageBySlug(activeSlug),
          getProducts({ featuredOnly: true, limit: 6 })
        ]);
        setLandingPage(pageData);
        setPopularProducts(prodData.products);

        if (pageData) {
          updatePageSEO({
            title: pageData.seo_title || pageData.title,
            description: pageData.seo_description || pageData.hero_supporting_text,
            image: pageData.hero_image
          });
        }
      } catch (err) {
        console.warn('Error loading landing page:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeSlug]);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen text-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!landingPage) {
    return (
      <div className="bg-neutral-950 min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold uppercase font-['Barlow_Condensed'] mb-2">
          Campaign Page Not Found
        </h1>
        <p className="text-neutral-400 text-sm mb-6 max-w-md">
          This advertising campaign may have concluded or the URL is incorrect. Visit our official homepage or contact us on WhatsApp.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  // Construct primary WhatsApp campaign URL
  const campaignMessage =
    landingPage.whatsapp_custom_message ||
    `Hello ${siteSettings.business_name}, I saw your ad campaign for "${landingPage.title}". Please send me current prices and product availability.`;

  const primaryWaUrl = getWhatsAppUrl(siteSettings.primary_whatsapp, campaignMessage);

  const handleHeroWhatsAppClick = async () => {
    // Record lead in database before opening
    try {
      await submitInquiry({
        customer_name: 'Ad Traffic Visitor',
        phone: 'WhatsApp Click',
        source: `landing_${activeSlug}`,
        utm_source,
        utm_medium,
        utm_campaign,
        items: [{ product_name_snapshot: landingPage.title, quantity: 1 }]
      });
    } catch (e) {
      console.warn('UTM inquiry tracking fallback:', e);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      {/* Minimal Advertising Header (High Conversion, Minimal Distraction) */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 py-4 px-4 sm:px-8 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {branding.logo_url ? (
              <img
                src={branding.logo_url}
                alt={siteSettings.business_name}
                className="h-9 w-auto object-contain"
              />
            ) : (
              <div className="w-9 h-9 rounded bg-red-700 flex items-center justify-center text-white font-black text-sm tracking-tight border border-red-500">
                {branding.brand_symbol_text || 'BONE'}
              </div>
            )}
            <div>
              <span className="font-extrabold text-base uppercase font-['Barlow_Condensed'] tracking-tight block leading-none">
                {siteSettings.business_name}
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                BN {siteSettings.registration_number}
              </span>
            </div>
          </div>

          <a
            href={primaryWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleHeroWhatsAppClick}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <img
            src={landingPage.hero_image || '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg'}
            alt={landingPage.title}
            className="w-full h-full object-cover opacity-100"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/15 to-neutral-950/10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-extrabold uppercase tracking-widest">
            <span>OFFICIAL NIGERIAN MOTORCYCLE DEALERSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Barlow_Condensed'] tracking-tight leading-[0.95] text-balance">
            {landingPage.hero_headline || 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS'}
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {landingPage.hero_supporting_text || 'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.'}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={primaryWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleHeroWhatsAppClick}
              className="w-full sm:w-auto px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-black text-sm uppercase tracking-wider rounded inline-flex items-center justify-center gap-2 shadow-xl transform active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{landingPage.primary_cta_text || 'INQUIRE ON WHATSAPP'}</span>
            </a>

            <Link
              to="/products"
              className="w-full sm:w-auto px-7 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider rounded border border-neutral-700 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>{landingPage.secondary_cta_text || 'VIEW PRODUCTS'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-2 text-xs text-neutral-400 flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-red-500" /> BN {siteSettings.registration_number}</span>
            <span>·</span>
            <span>Ikare Akoko, Ondo State</span>
            <span>·</span>
            <span>Kabba, Kogi State</span>
          </div>
        </div>
      </section>

      {/* 2. Brands We Deal In */}
      <section className="py-12 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-1">
            Certified Distribution
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight mb-8">
            BRANDS WE DEAL IN
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {MOTORCYCLE_BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-neutral-950 border border-neutral-800 rounded p-4 flex flex-col items-center justify-center"
              >
                <span className="font-black text-base font-['Barlow_Condensed'] uppercase tracking-wider text-neutral-200">
                  {brand}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase mt-0.5">Dealer Stock</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Products */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-neutral-950 border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-1">
                High Demand Stock
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
                POPULAR PRODUCTS
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Request instant live prices and availability on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProducts.map((p) => {
                const itemWa = getWhatsAppUrl(
                  siteSettings.primary_whatsapp,
                  generateProductWhatsAppMessage(p.name, p.brand, p.sku)
                );

                return (
                  <div
                    key={p.id}
                    className="bg-neutral-900 border border-neutral-800 rounded overflow-hidden flex flex-col justify-between"
                  >
                    <div className="aspect-16/10 bg-neutral-950 relative overflow-hidden">
                      <img
                        src={p.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-red-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                        {p.brand}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-base text-white font-['Barlow_Condensed'] uppercase tracking-tight">
                          {p.name}
                        </h4>
                        {p.short_description && (
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                            {p.short_description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-neutral-800 mt-4 flex items-center justify-between">
                        <span className="text-xs text-red-400 font-semibold">Contact for price</span>
                        <a
                          href={itemWa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-green-700 hover:bg-green-600 text-white text-xs font-bold uppercase rounded inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Why Choose Bright Okeyson */}
      <section className="py-16 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-1">
              Dealership Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
              WHY CHOOSE BRIGHT OKEYSON
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded p-6 space-y-2">
              <ShieldCheck className="w-6 h-6 text-red-500 mb-2" />
              <h3 className="font-bold text-base font-['Barlow_Condensed'] uppercase">
                100% Genuine Motorcycle Parts
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct distribution for Bajaj, TVS, Keke, Haojue, Jeely, Shiroro, Besty, and Jieng. Zero counterfeit parts.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded p-6 space-y-2">
              <MapPin className="w-6 h-6 text-red-500 mb-2" />
              <h3 className="font-bold text-base font-['Barlow_Condensed'] uppercase">
                Dual State Warehouses
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Headquarters in Bethel Plaza Ikare Akoko (Ondo State) and Branch Hub in Obaro Way Kabba (Kogi State).
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded p-6 space-y-2">
              <MessageCircle className="w-6 h-6 text-red-500 mb-2" />
              <h3 className="font-bold text-base font-['Barlow_Condensed'] uppercase">
                Direct WhatsApp Parts Desk
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Quick technical response and exact price verification for mechanics, distributors, and riders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visit Our Locations */}
      <section className="py-16 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-1">
              Storefront & Offices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
              VISIT OUR LOCATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div key={b.id} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-2">
                <div className="text-[11px] font-bold uppercase text-red-500">
                  {b.is_main ? 'Main Office' : 'Branch Office'}
                </div>
                <h3 className="font-bold text-base uppercase font-['Barlow_Condensed'] text-white">
                  {b.name}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {b.address}
                </p>
                {b.phone && (
                  <div className="pt-2 text-xs text-neutral-400">
                    Phone: <span className="font-mono text-neutral-200">{b.phone}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. High Impact WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-b from-neutral-900 to-neutral-950 text-center border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400 block">
            Instant Technical Assistance & Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Barlow_Condensed'] tracking-tight">
            Ready to Inquire or Order Parts?
          </h2>
          <p className="text-sm text-neutral-300">
            Our WhatsApp desk is active. Click below to message our sales team directly with your parts list or complete bike inquiries.
          </p>
          <a
            href={primaryWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleHeroWhatsAppClick}
            className="px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-extrabold text-sm uppercase tracking-wider rounded inline-flex items-center gap-2 shadow-2xl transition-transform active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>INQUIRE ON WHATSAPP NOW</span>
          </a>
        </div>
      </section>

      {/* 7. Contact Information & Minimal Footer */}
      <footer className="py-10 bg-neutral-950 text-center text-xs text-neutral-500 border-t border-neutral-900 space-y-4">
        <div className="max-w-md mx-auto space-y-1 text-neutral-400">
          <p className="font-bold text-white uppercase">{siteSettings.business_name}</p>
          <p>Registration BN: {siteSettings.registration_number}</p>
          <p>Email: {siteSettings.email} · Phone: {siteSettings.primary_whatsapp}</p>
        </div>
        <div className="flex items-center justify-center gap-4 text-neutral-400 pt-2">
          <Link to="/" className="hover:text-white">Full Website</Link>
          <span>·</span>
          <Link to="/products" className="hover:text-white">All Products</Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-white">Contact & Branches</Link>
        </div>
        <p className="text-[11px] text-neutral-600 pt-2">
          &copy; {new Date().getFullYear()} {siteSettings.business_name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
