import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { MOTORCYCLE_BRANDS } from '../lib/seedData';
import { updatePageSEO } from '../utils/seo';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  const { siteSettings, branches } = useSettings();

  useEffect(() => {
    updatePageSEO({
      title: 'About Us | Home of All Motorcycle Healing Center',
      description: `${siteSettings.business_name} (BN ${siteSettings.registration_number}) is a motorcycle and spare-parts dealership/distributor dealing in complete motorcycles and genuine spare parts.`
    });
  }, [siteSettings]);

  const waUrl = getWhatsAppUrl(
    siteSettings.primary_whatsapp,
    `Hello ${siteSettings.business_name}, I am reaching out after reading your About page.`
  );

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-1.5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-red-500 font-semibold">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-['Barlow_Condensed'] tracking-tight text-white leading-tight">
            Bright Okeyson Nigeria Enterprises
          </h1>
          <div className="text-red-500 font-bold uppercase tracking-wider text-sm mt-1">
            {siteSettings.tagline}
          </div>
        </div>

        {/* Factual Core Profile Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed'] text-white">
            Enterprise Profile & Scope of Operations
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            <strong>Bright Okeyson Nigeria Enterprises</strong> is a registered Nigerian motorcycle dealership and distributor dealing in all kinds of complete motorcycles and genuine spare parts.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Registered with the Corporate Affairs Commission under Business Registration Number <strong>BN {siteSettings.registration_number}</strong>, the enterprise serves commercial motorcycle operators, private riders, fleet managers, and mechanical technicians across Ondo State, Kogi State, and surrounding regions.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <div className="px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">
              Registered BN: <span className="text-white font-mono font-bold">{siteSettings.registration_number}</span>
            </div>
            <div className="px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">
              Headquarters: <span className="text-white">Bethel Plaza, Ikare Akoko</span>
            </div>
          </div>
        </div>

        {/* Authorized Brands We Deal In */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed'] text-white">
            Motorcycle & Product Brands We Deal In
          </h2>
          <p className="text-xs text-neutral-400">
            We distribute and supply complete units, engine overhaul components, and replacement parts for:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOTORCYCLE_BRANDS.map((brand) => (
              <div
                key={brand}
                className="bg-neutral-900 border border-neutral-800 rounded p-4 text-center font-black uppercase text-neutral-200 font-['Barlow_Condensed'] tracking-wider text-base"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Branch Offices */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed'] text-white">
            Verified Operational Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {branches.map((b) => (
              <div key={b.id} className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-2">
                <div className="text-[11px] font-bold uppercase text-red-500">
                  {b.is_main ? 'Main Office' : 'Branch Office'}
                </div>
                <h3 className="font-bold text-white text-base font-['Barlow_Condensed'] uppercase">
                  {b.name}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {b.address}
                </p>
                {b.phone && (
                  <div className="pt-2 text-xs text-neutral-400">
                    Phone: <span className="text-neutral-200 font-mono">{b.phone}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-neutral-900 border border-neutral-800 rounded p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold uppercase text-white font-['Barlow_Condensed']">
              Ready to Order or Inquire About Prices?
            </h3>
            <p className="text-xs text-neutral-400">
              Our sales desks in Ikare Akoko and Kabba respond promptly on WhatsApp.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2 shrink-0 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
