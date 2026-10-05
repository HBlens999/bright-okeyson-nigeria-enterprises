import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Sliders, Image as ImageIcon } from 'lucide-react';
import { HeroSlide, HeroTransition } from '../types/database';
import { getHeroSlides, saveHeroSlide, deleteHeroSlide, uploadFile } from '../services/dataService';

export const AdminHeroPage: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    title: '',
    subtitle: '',
    badge: '',
    desktop_image: '',
    mobile_image: '',
    primary_button_text: 'INQUIRE ON WHATSAPP',
    primary_button_url: 'https://wa.me/2348069382393',
    secondary_button_text: 'VIEW PRODUCTS',
    secondary_button_url: '/products',
    overlay_opacity: 0.65,
    text_alignment: 'left',
    transition: 'fade',
    duration: 5000,
    display_order: 1,
    is_active: true
  });

  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getHeroSlides(false);
      setSlides(data);
    } catch (err) {
      console.error('Error loading hero slides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      badge: 'OFFICIAL DEALERSHIP',
      desktop_image: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
      mobile_image: '',
      primary_button_text: 'INQUIRE ON WHATSAPP',
      primary_button_url: 'https://wa.me/2348069382393',
      secondary_button_text: 'VIEW PRODUCTS',
      secondary_button_url: '/products',
      overlay_opacity: 0.65,
      text_alignment: 'left',
      transition: 'fade',
      duration: 5000,
      display_order: slides.length + 1,
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setFormData(slide);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.desktop_image?.trim()) return;

    await saveHeroSlide({
      ...formData,
      id: editingId || undefined,
      title: formData.title.trim(),
      desktop_image: formData.desktop_image.trim()
    } as any);

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteHeroSlide(id);
    setDeleteConfirmId(null);
    loadData();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'hero-images');
      setFormData(prev => ({ ...prev, desktop_image: url }));
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Homepage Hero Slides Manager
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure dynamic carousel slides, high-priority images, transition effects, and direct WhatsApp CTAs.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((s) => (
          <div
            key={s.id}
            className="bg-neutral-900 border border-neutral-800 rounded overflow-hidden flex flex-col justify-between"
          >
            {/* Visual Preview */}
            <div className="relative aspect-16/9 bg-neutral-950 overflow-hidden">
              <img
                src={s.desktop_image}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-neutral-950"
                style={{ opacity: s.overlay_opacity || 0.65 }}
              />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                {s.badge && (
                  <span className="text-[10px] font-bold uppercase bg-red-600 px-2 py-0.5 rounded w-max mb-1">
                    {s.badge}
                  </span>
                )}
                <h3 className="font-bold text-lg uppercase font-['Barlow_Condensed'] line-clamp-2">
                  {s.title}
                </h3>
                {s.subtitle && (
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                    {s.subtitle}
                  </p>
                )}
              </div>

              <div className="absolute top-3 right-3 bg-neutral-950/80 px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 border border-neutral-800">
                Order: {s.display_order} · {s.transition}
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    s.is_active ? 'bg-emerald-500' : 'bg-neutral-600'
                  }`}
                />
                <span className="text-neutral-300">{s.is_active ? 'Active' : 'Disabled'}</span>
                <span className="text-neutral-500 font-mono">({s.duration / 1000}s)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                {deleteConfirmId === s.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-[10px] font-bold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(s.id)}
                    className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 max-h-screen overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-xl w-full p-6 text-white my-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-base font-bold uppercase font-['Barlow_Condensed']">
                {editingId ? 'Edit Hero Slide' : 'Create Hero Slide'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Slide Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. HOME OF ALL MOTORCYCLE HEALING CENTER"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Subtitle / Supporting Text</label>
                <textarea
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. OFFICIAL DEALERSHIP"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Transition Effect</label>
                  <select
                    value={formData.transition || 'fade'}
                    onChange={(e) => setFormData({ ...formData, transition: e.target.value as HeroTransition })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  >
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="zoom">Zoom</option>
                    <option value="crossfade">Crossfade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Desktop Hero Image URL or Upload *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.desktop_image || ''}
                    onChange={(e) => setFormData({ ...formData, desktop_image: e.target.value })}
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded cursor-pointer shrink-0">
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Primary Button Text</label>
                  <input
                    type="text"
                    value={formData.primary_button_text || ''}
                    onChange={(e) => setFormData({ ...formData, primary_button_text: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Primary Button URL</label>
                  <input
                    type="text"
                    value={formData.primary_button_url || ''}
                    onChange={(e) => setFormData({ ...formData, primary_button_url: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Duration (ms)</label>
                  <input
                    type="number"
                    value={formData.duration || 5000}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value, 10) || 5000 })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order || 1}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active !== false}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded bg-neutral-950 border-neutral-700 text-red-600"
                    />
                    <span>Active Slide</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white font-bold uppercase rounded"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
