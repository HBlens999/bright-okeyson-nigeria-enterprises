import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { MOTORCYCLE_BRANDS } from '../../lib/seedData';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const { siteSettings, branding, branches } = useSettings();

  const footerWhatsAppUrl = getWhatsAppUrl(
    siteSettings.primary_whatsapp,
    `Hello ${siteSettings.business_name}, I am reaching out from your website footer to inquire about your complete motorcycles and spare parts inventory.`
  );

  return (
    <footer className="bg-brand-navy text-white border-t border-[#2C7F9C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-[#064B6B] border border-[#2C7F9C] rounded p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-brand-gold font-semibold tracking-wider text-xs uppercase">
              Official Motorcycle Dealership & Distribution
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Barlow_Condensed'] uppercase tracking-tight">
              Looking for Complete Motorcycles or Genuine Spare Parts?
            </h3>
            <p className="text-sm text-[#D9F3F8] max-w-xl">
              Talk directly with our Ikare Akoko or Kabba technical desk on WhatsApp for instant price quotes and fast fulfillment.
            </p>
          </div>
          <a
            href={footerWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-white text-brand-navy font-bold text-sm tracking-wider uppercase rounded shadow-lg transition-transform active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1 & 2: Business Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {branding.footer_logo_url || branding.logo_url ? (
                <img
                  src={branding.footer_logo_url || branding.logo_url}
                  alt={siteSettings.business_name}
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-brand-teal flex items-center justify-center text-white font-extrabold text-base tracking-tighter shrink-0 border border-brand-teal">
                  {branding.brand_symbol_text || 'BONE'}
                </div>
              )}
              <div>
                <h4 className="font-extrabold text-lg text-white uppercase font-['Barlow_Condensed'] tracking-tight leading-none">
                  {siteSettings.business_name}
                </h4>
                <div className="text-xs text-brand-gold font-semibold uppercase mt-0.5">
                  Registration BN: {siteSettings.registration_number}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#D9F3F8] leading-relaxed max-w-md">
              <strong className="text-white">{siteSettings.tagline}.</strong> {siteSettings.description}
            </p>

            <div className="pt-2 text-xs text-[#D9F3F8] space-y-1.5">
              <div className="flex items-center gap-2 text-[#EAF8FC] font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Authorized Dealership & Certified Nigerian Business</span>
              </div>
              <p className="pl-6 text-[#BFE4EC] text-[11px]">
                Supplying verified original equipment components and complete motorbikes across Southwest & North-Central Nigeria.
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Contact & Branches
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Cart & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/landing" className="text-[#D9F3F8] hover:text-brand-gold transition-colors">
                  Ad Campaign Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Motorcycle Brands */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
              Brands We Deal In
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {MOTORCYCLE_BRANDS.map((brand) => (
                <Link
                  key={brand}
                  to={`/products?brand=${brand}`}
                  className="px-2.5 py-1.5 rounded bg-[#064B6B] border border-[#2C7F9C] text-[#EAF8FC] hover:text-brand-gold hover:border-brand-gold transition-colors text-center font-bold tracking-wider"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 5: Branches & Official Contacts */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-gold pl-2">
              Our Locations
            </h5>
            <div className="space-y-3.5 text-xs text-[#D9F3F8]">
              {branches.map((b) => (
                <div key={b.id} className="border-b border-[#245F77] pb-2.5 last:border-0 last:pb-0">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>{b.name}</span>
                  </div>
                  <div className="pl-5 text-[#D9F3F8] text-[11px] mt-0.5 leading-snug">
                    {b.address}
                  </div>
                  {b.phone && (
                    <div className="pl-5 text-[#D9F3F8] text-[11px] mt-0.5">
                      Tel: <a href={`tel:${b.phone}`} className="hover:text-brand-gold">{b.phone}</a>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#EAF8FC]">
                  <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <a href={`mailto:${siteSettings.email}`} className="hover:underline">
                    {siteSettings.email}
                  </a>
                </div>
                <div className="flex items-start gap-1.5 text-[#EAF8FC]">
                  <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  <div className="text-[11px] space-y-0.5">
                    {siteSettings.phone_numbers.map((ph) => (
                      <div key={ph}>
                        <a href={`tel:${ph}`} className="hover:underline">{ph}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2C7F9C] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BFE4EC]">
          <div>
            &copy; {new Date().getFullYear()} {siteSettings.business_name}. All rights reserved. BN {siteSettings.registration_number}.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-[#D9F3F8]">Products</Link>
            <Link to="/about" className="hover:text-[#D9F3F8]">About</Link>
            <Link to="/contact" className="hover:text-[#D9F3F8]">Contact</Link>
            <span className="opacity-30">|</span>
            <Link to="/admin" className="text-[#D9F3F8] hover:text-brand-gold flex items-center gap-1 font-medium">
              <span>Admin CMS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
