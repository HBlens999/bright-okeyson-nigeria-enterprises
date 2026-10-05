import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateSiteSettings } from '../services/dataService';
import { CheckCircle2 } from 'lucide-react';

export const AdminFooterPage: React.FC = () => {
  const { siteSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(siteSettings);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(formData);
      await refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error saving footer settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Footer Content & Disclaimers CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Manage footer brand summary, legal notices, CAC registration notice, and contact prompts.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Footer settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-4 text-xs">
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Footer Tagline
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Footer Bio & Scope
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Registered CAC Business Number
          </label>
          <input
            type="text"
            value={formData.registration_number}
            onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Footer Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
