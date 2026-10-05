import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateAnnouncement } from '../services/dataService';
import { Bell, CheckCircle2 } from 'lucide-react';
import { AnnouncementFrequency } from '../types/database';

export const AdminAnnouncementsPage: React.FC = () => {
  const { announcement, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(announcement);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAnnouncement(formData);
      await refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error updating announcement:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Welcome Announcement Popup CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure the greeting modal that welcomes first-time visitors and highlights your Bethel Plaza address and WhatsApp channel.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Announcement configuration saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="font-bold text-sm text-white block uppercase">Popup Active Status</span>
            <span className="text-neutral-400 text-xs">Enable or disable welcome popup on visitor entry</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_enabled}
              onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Announcement Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Body Text *
          </label>
          <textarea
            rows={4}
            required
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Button Label
            </label>
            <input
              type="text"
              value={formData.button_text}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Button URL (WhatsApp or Link)
            </label>
            <input
              type="text"
              value={formData.button_url}
              onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Display Frequency
            </label>
            <select
              value={formData.display_frequency}
              onChange={(e) => setFormData({ ...formData, display_frequency: e.target.value as AnnouncementFrequency })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            >
              <option value="every_visit">Every Visit</option>
              <option value="once_per_session">Once Per Session</option>
              <option value="once_per_day">Once Per Day (Recommended)</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Delay Before Appearing (ms)
            </label>
            <input
              type="number"
              value={formData.delay}
              onChange={(e) => setFormData({ ...formData, delay: parseInt(e.target.value, 10) || 1500 })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};
