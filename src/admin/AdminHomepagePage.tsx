import React, { useState } from 'react';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

export const AdminHomepagePage: React.FC = () => {
  const [sections, setSections] = useState([
    { id: 'hero', name: 'Hero Carousel Slider', desc: 'Primary dynamic banner with CTA', visible: true },
    { id: 'brands', name: 'Authorized Brands Ribbon', desc: 'Bajaj, TVS, Keke, Haojue, etc.', visible: true },
    { id: 'featured', name: 'Featured Products Grid', desc: 'Lead products with WhatsApp order actions', visible: true },
    { id: 'categories', name: 'Categories Showcase', desc: 'Interactive parts departments', visible: true },
    { id: 'why_choose', name: 'Why Choose Bright Okeyson', desc: 'Dealership & Healing Center strengths', visible: true },
    { id: 'branches', name: 'Dealership Branches Section', desc: 'Bethel Plaza Ikare Akoko and Kabba Kogi locations', visible: true }
  ]);

  const [saved, setSaved] = useState(false);

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  };

  const handleSave = () => {
    localStorage.setItem('bo_homepage_sections_cms', JSON.stringify(sections));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Homepage Layout & Sections CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Enable, disable, or reorganize customer-facing homepage sections in real-time.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Homepage layout saved successfully!</span>
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded divide-y divide-neutral-800">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-500 text-xs">0{idx + 1}.</span>
                <span className="font-bold text-sm text-white uppercase font-['Barlow_Condensed']">
                  {sec.name}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">{sec.desc}</p>
            </div>

            <button
              onClick={() => toggleSection(sec.id)}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                sec.visible
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{sec.visible ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded shadow-sm"
        >
          Save Homepage Layout
        </button>
      </div>
    </div>
  );
};
