import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { updateSiteSettings, uploadFile } from '../services/dataService';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';

export const AdminBusinessPage: React.FC = () => {
  const { siteSettings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState(siteSettings);
  const [newPhone, setNewPhone] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingManagerImage, setUploadingManagerImage] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Site settings load asynchronously. Keep the form in sync with the saved database row.
  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      await updateSiteSettings(formData);
      await refreshSettings();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error updating business settings:', err);
      setSaveError(err instanceof Error ? err.message : 'Could not save business information. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleManagerImageUpload = async (file?: File) => {
    if (!file) return;
    setUploadingManagerImage(true);
    try {
      const imageUrl = await uploadFile(file, 'product-images');
      setFormData(prev => ({ ...prev, manager_image_url: imageUrl }));
    } catch (err) {
      console.error('Manager photo upload failed:', err);
      window.alert(err instanceof Error ? err.message : 'Could not upload manager photo.');
    } finally {
      setUploadingManagerImage(false);
    }
  };

  const addPhone = () => {
    if (!newPhone.trim()) return;
    setFormData(prev => ({
      ...prev,
      phone_numbers: [...prev.phone_numbers, newPhone.trim()]
    }));
    setNewPhone('');
  };

  const removePhone = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      phone_numbers: prev.phone_numbers.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Business Information CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Manage your official corporate registration, business tagline, Bethel Plaza office address, and verified telephone lines.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Business information updated across public website!</span>
        </div>
      )}
      {saveError && (
        <div role="alert" className="p-3.5 bg-red-950 border border-red-800 rounded text-red-200 text-xs">
          Business information could not be saved: {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-5 text-xs">
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Official Business Name *
          </label>
          <input
            type="text"
            required
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              CAC Registration Number (BN) *
            </label>
            <input
              type="text"
              required
              value={formData.registration_number}
              onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Official Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Business Tagline *
          </label>
          <input
            type="text"
            required
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Scope / Description *
          </label>
          <textarea
            rows={2}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Main Headquarters Address *
          </label>
          <input
            type="text"
            required
            value={formData.main_office}
            onChange={(e) => setFormData({ ...formData, main_office: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-medium"
          />
        </div>

        {/* Manager Profile - optional public About and Contact page section */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200">Manager Profile (Optional)</h2>
            <p className="text-[11px] text-neutral-400 mt-1">These details appear on the public About Us and Contact pages. Leave fields empty to hide the manager profile.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">Manager Name</label>
              <input type="text" value={formData.manager_name || ''} onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })} placeholder="Enter manager's name" className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">Job Title</label>
              <input type="text" value={formData.manager_title || ''} onChange={(e) => setFormData({ ...formData, manager_title: e.target.value })} placeholder="e.g. Manager" className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">Manager Bio / Information</label>
            <textarea rows={3} value={formData.manager_bio || ''} onChange={(e) => setFormData({ ...formData, manager_bio: e.target.value })} placeholder="Enter the manager's approved biography or introduction" className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">Manager Photo</label>
            <input type="file" accept="image/*" disabled={uploadingManagerImage} onChange={(e) => { const file = e.target.files?.[0]; void handleManagerImageUpload(file); e.currentTarget.value = ''; }} className="block w-full text-xs text-neutral-300 file:mr-3 file:rounded file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-white" />
            <p className="text-[11px] text-neutral-400 mt-1">{uploadingManagerImage ? 'Uploading and optimizing photo…' : 'Upload a photo. It will be optimized when possible before storage.'}</p>
            {formData.manager_image_url && (
              <div className="mt-3 flex items-start gap-3">
                <img src={formData.manager_image_url} alt="Manager preview" className="w-24 h-28 object-cover rounded border border-neutral-700" />
                <div className="space-y-2">
                  <span className="block text-[11px] text-green-300">Photo ready. Save business information to publish it.</span>
                  <button type="button" onClick={() => setFormData({ ...formData, manager_image_url: '' })} className="text-xs text-red-400 hover:text-red-300">Remove photo</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Official Telephone Lines */}
        <div className="space-y-2 pt-2 border-t border-neutral-800">
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
            Official Telephone Lines
          </label>
          <div className="space-y-1.5">
            {formData.phone_numbers.map((phone, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-neutral-800">
                <span className="font-mono text-white font-bold">{phone}</span>
                <button
                  type="button"
                  onClick={() => removePhone(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="e.g. 08069382393"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-1.5 text-white font-mono"
            />
            <button
              type="button"
              onClick={addPhone}
              className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-semibold inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Phone</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold uppercase rounded shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Business Information'}
          </button>
        </div>
      </form>
    </div>
  );
};
