import React from 'react';
import { ShieldCheck, Truck, Wrench, CheckCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const WhyChooseUs: React.FC = () => {
  const { siteSettings } = useSettings();

  const points = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
      title: 'Genuine Dealer Stock',
      desc: 'We deal strictly in verified factory components for Bajaj, TVS, Keke, Haojue, Jeely, Shiroro, Besty, and Jieng.'
    },
    {
      icon: <Wrench className="w-6 h-6 text-red-500" />,
      title: 'Motorcycle Healing Center',
      desc: 'Built specifically to diagnose, heal, and keep commercial motorcycles running with durable mechanical replacement parts.'
    },
    {
      icon: <Truck className="w-6 h-6 text-red-500" />,
      title: 'Multi-Location Warehousing',
      desc: 'Stocked branches in Ikare Akoko (Ondo State) and Kabba (Kogi State) for rapid walk-in pickup and regional dispatch.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-red-500" />,
      title: 'Registered Enterprise',
      desc: `Officially registered in Nigeria under registration number BN ${siteSettings.registration_number}.`
    }
  ];

  return (
    <section className="bg-neutral-950 text-white py-16 sm:py-20 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
            Reliability & Integrity
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Why Bright Okeyson Nigeria Enterprises
          </h2>
          <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
            {siteSettings.tagline}. {siteSettings.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-4">
                  {pt.icon}
                </div>
                <h3 className="font-bold text-lg text-white font-['Barlow_Condensed'] uppercase tracking-tight">
                  {pt.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
