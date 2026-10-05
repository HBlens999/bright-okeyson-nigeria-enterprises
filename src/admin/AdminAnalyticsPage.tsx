import React, { useState, useEffect } from 'react';
import { AnalyticsSettings } from '../types/database';
import { getAnalyticsSettings, updateAnalyticsSettings } from '../services/dataService';
import { CheckCircle2, BarChart3 } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [formData, setFormData] = useState<AnalyticsSettings>({
    id: '',
    meta_pixel_id: '',
    google_analytics_id: '',
    google_ads_id: ''
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getAnalyticsSettings();
      setFormData(data);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAnalyticsSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error saving analytics:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Advertising Tracking & Analytics IDs
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure Meta Pixel, Google Analytics, and Google Ads conversion IDs to monitor paid ad traffic on your landing pages.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Tracking settings saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Meta Pixel ID (Facebook / Instagram Ads)
          </label>
          <input
            type="text"
            placeholder="e.g. 123456789012345"
            value={formData.meta_pixel_id || ''}
            onChange={(e) => setFormData({ ...formData, meta_pixel_id: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
          />
          <span className="text-[11px] text-neutral-500 block mt-1">
            Tracks page views and WhatsApp inquiry click events from Meta Ads.
          </span>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Google Analytics 4 Measurement ID
          </label>
          <input
            type="text"
            placeholder="e.g. G-XXXXXXXXXX"
            value={formData.google_analytics_id || ''}
            onChange={(e) => setFormData({ ...formData, google_analytics_id: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Google Ads Conversion Tracking ID
          </label>
          <input
            type="text"
            placeholder="e.g. AW-XXXXXXXXX"
            value={formData.google_ads_id || ''}
            onChange={(e) => setFormData({ ...formData, google_ads_id: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Tracking IDs'}
          </button>
        </div>
      </form>
    </div>
  );
};
