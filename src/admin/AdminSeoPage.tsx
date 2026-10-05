import React, { useState, useEffect } from 'react';
import { SeoSettings } from '../types/database';
import { getSeoSettings, updateSeoSettings } from '../services/dataService';
import { CheckCircle2, Search } from 'lucide-react';

export const AdminSeoPage: React.FC = () => {
  const [formData, setFormData] = useState<SeoSettings>({
    id: '',
    home_title: '',
    home_description: '',
    keywords: '',
    social_image_url: ''
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getSeoSettings();
      setFormData(data);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSeoSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error saving SEO settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          SEO & Social Metadata Settings
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure search engine titles, descriptions, and OpenGraph social share cards.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>SEO settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Homepage Meta Title (30-60 Characters) *
          </label>
          <input
            type="text"
            required
            value={formData.home_title}
            onChange={(e) => setFormData({ ...formData, home_title: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
          <span className="text-[11px] text-neutral-500 block mt-1">
            Current length: <strong className="text-neutral-300 font-mono">{formData.home_title.length}</strong> characters
          </span>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Meta Description (120-160 Characters) *
          </label>
          <textarea
            rows={3}
            required
            value={formData.home_description}
            onChange={(e) => setFormData({ ...formData, home_description: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white leading-relaxed"
          />
          <span className="text-[11px] text-neutral-500 block mt-1">
            Current length: <strong className="text-neutral-300 font-mono">{formData.home_description.length}</strong> characters
          </span>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Keywords / Search Terms
          </label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            placeholder="motorcycles, spare parts, Bajaj, TVS, Ikare Akoko..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Social Share Image URL (OpenGraph / Twitter)
          </label>
          <input
            type="text"
            value={formData.social_image_url || ''}
            onChange={(e) => setFormData({ ...formData, social_image_url: e.target.value })}
            placeholder="/src/assets/... or https://..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save SEO Metadata'}
          </button>
        </div>
      </form>
    </div>
  );
};
