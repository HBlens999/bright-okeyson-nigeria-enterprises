import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateSiteSettings } from '../services/dataService';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export const AdminWhatsAppPage: React.FC = () => {
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
      console.error('Error updating WhatsApp settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          WhatsApp Integration & Checkout Settings
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure the primary Nigerian WhatsApp ordering number, floating pulse animation, and pre-formatted inquiry message template.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>WhatsApp settings updated across all buttons and checkout flows!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="font-bold text-sm text-white block uppercase">Floating WhatsApp Widget</span>
            <span className="text-neutral-400 text-xs">Show the floating customer support button in the viewport</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.whatsapp_enabled}
              onChange={(e) => setFormData({ ...formData, whatsapp_enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Primary WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={formData.primary_whatsapp}
              onChange={(e) => setFormData({ ...formData, primary_whatsapp: e.target.value })}
              placeholder="e.g. 08069382393"
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono font-bold"
            />
            <span className="text-[11px] text-neutral-500 mt-1 block">
              Automatically converted to Nigerian format (234...) in chat links.
            </span>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Widget Screen Position
            </label>
            <select
              value={formData.whatsapp_position}
              onChange={(e) => setFormData({ ...formData, whatsapp_position: e.target.value as any })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            >
              <option value="bottom-right">Bottom Right (Standard)</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Tooltip Greeting Text
          </label>
          <input
            type="text"
            value={formData.whatsapp_tooltip}
            onChange={(e) => setFormData({ ...formData, whatsapp_tooltip: e.target.value })}
            placeholder="Need help? Chat with us on WhatsApp"
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.whatsapp_pulse}
              onChange={(e) => setFormData({ ...formData, whatsapp_pulse: e.target.checked })}
              className="rounded bg-neutral-950 border-neutral-700 text-green-600"
            />
            <span>Enable subtle pulse / radar wave animation</span>
          </label>
        </div>

        <div className="pt-2 border-t border-neutral-800">
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Cart WhatsApp Message Template
          </label>
          <textarea
            rows={6}
            value={formData.whatsapp_template}
            onChange={(e) => setFormData({ ...formData, whatsapp_template: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono text-[11px] leading-relaxed"
          />
          <div className="text-[11px] text-neutral-500 mt-1 space-x-2">
            <span>Supported tokens:</span>
            <code className="text-red-400">&#123;ITEMS&#125;</code>
            <code className="text-red-400">&#123;NAME&#125;</code>
            <code className="text-red-400">&#123;PHONE&#125;</code>
            <code className="text-red-400">&#123;LOCATION&#125;</code>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save WhatsApp Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
