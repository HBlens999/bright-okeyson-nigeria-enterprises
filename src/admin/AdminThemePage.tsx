import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateThemeSettings } from '../services/dataService';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const AdminThemePage: React.FC = () => {
  const { theme, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(theme);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(theme);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const savedTheme = await updateThemeSettings(formData);
      setFormData(savedTheme);
      await refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      console.error('Error saving theme settings:', err);
      setError(err?.message || 'Could not save theme settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Visual Theme & Styling
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Customize Dealership Deep Red and Bright Red palettes, border radiuses, and button colors.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-950 border border-red-800 rounded flex items-center gap-2 text-red-300 text-xs">
          <span>{error}</span>
        </div>
      )}

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Theme CSS variables updated live across the application!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Primary Brand Red
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.primary_color || '#dc2626'}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                className="w-10 h-10 rounded border border-neutral-700 bg-neutral-950 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={formData.primary_color || '#dc2626'}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Primary Hover Red
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.primary_hover || '#b91c1c'}
                onChange={(e) => setFormData({ ...formData, primary_hover: e.target.value })}
                className="w-10 h-10 rounded border border-neutral-700 bg-neutral-950 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={formData.primary_hover || '#b91c1c'}
                onChange={(e) => setFormData({ ...formData, primary_hover: e.target.value })}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Accent Red Highlight
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.accent_color || '#ef4444'}
                onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                className="w-10 h-10 rounded border border-neutral-700 bg-neutral-950 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={formData.accent_color || '#ef4444'}
                onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Border Radius
            </label>
            <select
              value={formData.border_radius || '0.375rem'}
              onChange={(e) => setFormData({ ...formData, border_radius: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2.5 text-white"
            >
              <option value="0rem">Sharp (0px)</option>
              <option value="0.25rem">Slightly Rounded (4px)</option>
              <option value="0.375rem">Balanced Dealership (6px)</option>
              <option value="0.5rem">Subtle Rounded (8px)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Updating...' : 'Apply Theme Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
