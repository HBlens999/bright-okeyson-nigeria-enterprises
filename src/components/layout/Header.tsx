import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Menu, X, Shield } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useCart } from '../../context/CartContext';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export const Header: React.FC = () => {
  const { siteSettings, branding } = useSettings();
  const { totalItemCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const quickWhatsAppUrl = getWhatsAppUrl(
    siteSettings.primary_whatsapp,
    `Hello ${siteSettings.business_name}, I am contacting you from your website. Please I would like to inquire about motorcycles and spare parts availability.`
  );

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar Announcement / Contact Strip */}
      <div className="bg-teal-700 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide uppercase">BN {siteSettings.registration_number}</span>
            <span className="opacity-50">|</span>
            <span className="truncate">{siteSettings.tagline}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Call/WhatsApp: <a href={`tel:${siteSettings.primary_whatsapp}`} className="font-bold underline decoration-white/40 hover:decoration-white">{siteSettings.primary_whatsapp}</a></span>
            <span className="opacity-50">|</span>
            <span className="hidden md:inline">Ikare Akoko, Ondo & Kabba, Kogi</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          >
            {branding.logo_url ? (
              <img
                src={branding.logo_url}
                alt={siteSettings.business_name}
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-red-700 flex items-center justify-center text-white font-extrabold text-base tracking-tighter shadow-inner shrink-0 border border-red-500">
                {branding.brand_symbol_text || 'BONE'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-slate-900 font-['Barlow_Condensed'] leading-none">
                {siteSettings.business_name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wider uppercase mt-0.5 hidden xs:block">
                Motorcycle Healing Center
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                isActive(link.path)
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </Link>
          ))}
          <Link
            to="/landing"
            className="text-slate-500 hover:text-teal-700 text-xs uppercase tracking-wider transition-colors px-2 py-1 rounded bg-slate-50 border border-slate-200"
          >
            Ad Landing
          </Link>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick WhatsApp Inquiry */}
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-green-700 hover:bg-green-600 active:scale-95 transition-all rounded"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center justify-center p-2.5 text-slate-700 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-neutral-300" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Admin shortcut icon */}
          <Link
            to="/admin"
            className="hidden md:flex items-center justify-center p-2 text-slate-500 hover:text-slate-800 transition-colors"
            title="Admin CMS"
            aria-label="Admin CMS"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-700 bg-slate-50 rounded border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/landing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Ad Campaign Landing Page
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded text-sm font-medium text-neutral-300 hover:bg-neutral-900 flex items-center justify-between"
            >
              <span>Shopping Cart & Inquiry</span>
              {totalItemCount > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">
                  {totalItemCount}
                </span>
              )}
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-700 text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
            <div className="text-center text-xs text-slate-500 pt-1">
              Main Office: {siteSettings.main_office}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
