import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export const BranchesSection: React.FC = () => {
  const { branches, siteSettings } = useSettings();

  const activeBranches = branches.filter((b) => b.is_active);

  return (
    <section className="bg-neutral-900 text-white py-16 sm:py-20 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
            Convenient Storefronts & Warehouses
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Our Physical Dealership Locations
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Visit our offices in Ondo State and Kogi State for complete motorcycles, spare parts purchase, and mechanical consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeBranches.map((branch) => {
            const branchWa = getWhatsAppUrl(
              branch.phone || siteSettings.primary_whatsapp,
              `Hello Bright Okeyson Nigeria Enterprises, I am contacting your ${branch.name} regarding parts/motorcycle availability.`
            );

            return (
              <div
                key={branch.id}
                className="bg-neutral-950 border border-neutral-800 rounded p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60">
                      {branch.is_main ? 'Main Headquarters' : 'Branch Office'}
                    </span>
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>

                  <h3 className="font-bold text-lg text-white font-['Barlow_Condensed'] uppercase tracking-tight mb-2">
                    {branch.name}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {branch.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 space-y-3">
                  {branch.phone && (
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <a href={`tel:${branch.phone}`} className="hover:text-white font-mono">
                        {branch.phone}
                      </a>
                    </div>
                  )}

                  <a
                    href={branchWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-green-700 text-neutral-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 border border-neutral-800 hover:border-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat With Branch Desk</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
