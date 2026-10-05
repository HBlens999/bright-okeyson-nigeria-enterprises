import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateBranding, uploadFile } from '../services/dataService';
import { Palette, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export const AdminBrandingPage: React.FC = () => {
  const { branding, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(branding);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateBranding(formData);
      await refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error updating branding:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (field: keyof typeof formData, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const url = await uploadFile(file, 'logos');
      setFormData(prev => ({ ...prev, [field]: url }));
    } catch (err) {
      console.error('Logo upload error:', err);
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Brand Identity & Logo CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Upload custom logos for header and footer or configure the text brand symbol badge.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Branding settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Brand Symbol Badge Text (Fallback Wordmark)
          </label>
          <input
            type="text"
            value={formData.brand_symbol_text || 'BONE'}
            onChange={(e) => setFormData({ ...formData, brand_symbol_text: e.target.value })}
            className="w-full sm:w-48 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono font-bold"
          />
          <span className="text-[11px] text-neutral-500 block mt-1">
            Displayed in red badge whenever image logos are not uploaded.
          </span>
        </div>

        {/* Main Logo URL */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
            Primary Header Logo URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.logo_url || ''}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://... or /src/assets/..."
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            />
            <label className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded cursor-pointer shrink-0 font-medium">
              <span>{uploadingField === 'logo_url' ? 'Uploading...' : 'Upload File'}</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload('logo_url', e)} className="hidden" />
            </label>
          </div>
          {formData.logo_url && (
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded inline-block">
              <img src={formData.logo_url} alt="Logo Preview" className="h-10 w-auto object-contain" />
            </div>
          )}
        </div>

        {/* Footer Logo */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
            Footer Logo URL (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.footer_logo_url || ''}
              onChange={(e) => setFormData({ ...formData, footer_logo_url: e.target.value })}
              placeholder="Leave empty to use primary logo"
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            />
            <label className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded cursor-pointer shrink-0 font-medium">
              <span>{uploadingField === 'footer_logo_url' ? 'Uploading...' : 'Upload'}</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload('footer_logo_url', e)} className="hidden" />
            </label>
          </div>
        </div>

        {/* Favicon URL */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
            Browser Favicon URL
          </label>
          <input
            type="text"
            value={formData.favicon_url || ''}
            onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
            placeholder="https://..."
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Branding'}
          </button>
        </div>
      </form>
    </div>
  );
};
