import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, X, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LandingPage } from '../types/database';
import { getLandingPages, saveLandingPage, deleteLandingPage } from '../services/dataService';

export const AdminLandingPagesPage: React.FC = () => {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<LandingPage>>({
    slug: '',
    title: '',
    subtitle: '',
    hero_headline: 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    hero_supporting_text: 'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.',
    hero_image: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
    primary_cta_text: 'INQUIRE ON WHATSAPP',
    secondary_cta_text: 'VIEW PRODUCTS',
    whatsapp_custom_message: '',
    seo_title: '',
    seo_description: '',
    is_published: true
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getLandingPages();
      setPages(data);
    } catch (err) {
      console.error('Error loading landing pages:', err);
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
      slug: '',
      title: '',
      subtitle: '',
      hero_headline: 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
      hero_supporting_text: 'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.',
      hero_image: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
      primary_cta_text: 'INQUIRE ON WHATSAPP',
      secondary_cta_text: 'VIEW PRODUCTS',
      whatsapp_custom_message: '',
      seo_title: '',
      seo_description: '',
      is_published: true
    });
    setIsModalOpen(true);
  };

  const openEdit = (lp: LandingPage) => {
    setEditingId(lp.id);
    setFormData(lp);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug?.trim() || !formData.title?.trim() || !formData.hero_headline?.trim()) return;

    await saveLandingPage({
      ...formData,
      id: editingId || undefined,
      slug: formData.slug.trim(),
      title: formData.title.trim(),
      hero_headline: formData.hero_headline.trim()
    } as any);

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this landing page?')) return;
    await deleteLandingPage(id);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Advertising Landing Pages CMS
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create high-converting landing pages tailored for Facebook, Instagram, Google, and TikTok ad campaigns.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Landing Page</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((lp) => {
          const publicUrl = lp.slug === 'default' ? '/landing' : `/landing/${lp.slug}`;

          return (
            <div
              key={lp.id}
              className="bg-neutral-900 border border-neutral-800 rounded p-5 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-neutral-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    /{lp.slug === 'default' ? 'landing' : `landing/${lp.slug}`}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      lp.is_published
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {lp.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white font-['Barlow_Condensed'] uppercase tracking-tight">
                  {lp.title}
                </h3>
                {lp.subtitle && (
                  <p className="text-xs text-neutral-400 mt-0.5">{lp.subtitle}</p>
                )}

                <div className="text-xs text-neutral-300 mt-3 p-2.5 bg-neutral-950 rounded border border-neutral-800/80">
                  <div className="text-[10px] uppercase text-neutral-500 font-bold">Hero Headline:</div>
                  <div className="font-medium truncate">{lp.hero_headline}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                <Link
                  to={publicUrl}
                  target="_blank"
                  className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                >
                  <span>Test Ad Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(lp)}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(lp.id)}
                    className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 max-h-screen overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-xl w-full p-6 text-white my-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-base font-bold uppercase font-['Barlow_Condensed']">
                {editingId ? 'Edit Landing Page' : 'Create Landing Page'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Slug (URL path) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. bajaj or spare-parts"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Campaign Internal Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bajaj Boxer Promotion"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Ad Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. COMPLETE MOTORCYCLES & GENUINE SPARE PARTS"
                  value={formData.hero_headline || ''}
                  onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Supporting Copy</label>
                <textarea
                  rows={2}
                  value={formData.hero_supporting_text || ''}
                  onChange={(e) => setFormData({ ...formData, hero_supporting_text: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Primary CTA Text</label>
                  <input
                    type="text"
                    value={formData.primary_cta_text || 'INQUIRE ON WHATSAPP'}
                    onChange={(e) => setFormData({ ...formData, primary_cta_text: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Custom WhatsApp Message</label>
                  <input
                    type="text"
                    placeholder="Pre-fills customer WhatsApp text"
                    value={formData.whatsapp_custom_message || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp_custom_message: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Hero Background Image URL</label>
                <input
                  type="text"
                  value={formData.hero_image || ''}
                  onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="lp-published"
                  checked={formData.is_published !== false}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="rounded bg-neutral-950 border-neutral-700 text-red-600"
                />
                <label htmlFor="lp-published" className="text-neutral-300 cursor-pointer">
                  Publish this landing page immediately
                </label>
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
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
