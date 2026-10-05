import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, X } from 'lucide-react';
import { Branch } from '../types/database';
import { getBranches, saveBranch, deleteBranch } from '../services/dataService';
import { useSettings } from '../context/SettingsContext';

export const AdminBranchesPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { refreshSettings } = useSettings();

  const [formData, setFormData] = useState<Partial<Branch>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    is_main: false,
    is_active: true,
    display_order: 1
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (err) {
      console.error('Error loading branches:', err);
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
      name: '',
      address: '',
      phone: '',
      email: '',
      is_main: false,
      is_active: true,
      display_order: branches.length + 1
    });
    setIsModalOpen(true);
  };

  const openEdit = (b: Branch) => {
    setEditingId(b.id);
    setFormData(b);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.address?.trim()) return;

    await saveBranch({
      ...formData,
      id: editingId || undefined,
      name: formData.name.trim(),
      address: formData.address.trim()
    } as any);

    setIsModalOpen(false);
    await refreshSettings();
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this branch?')) return;
    await deleteBranch(id);
    await refreshSettings();
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Branch Locations & Warehouses
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your physical distribution offices in Ikare Akoko (Ondo State) and Kabba (Kogi State).
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Branch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div
            key={b.id}
            className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-red-400">
                  {b.is_main ? 'Main Headquarters' : 'Branch Office'}
                </span>
                <MapPin className="w-4 h-4 text-red-500" />
              </div>

              <h3 className="font-bold text-base text-white font-['Barlow_Condensed'] uppercase tracking-tight">
                {b.name}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                {b.address}
              </p>
              {b.phone && (
                <div className="text-xs text-neutral-400 font-mono mt-2">
                  Tel: {b.phone}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Order: {b.display_order}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEdit(b)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-md w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-base font-bold uppercase font-['Barlow_Condensed']">
                {editingId ? 'Edit Branch' : 'Add Branch'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Branch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Branch Office 1 - Ilepa Street"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase">Physical Street Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 1: L/128 Ilepa Street, Ikare Akoko, Ondo State"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase">Phone Line</label>
                  <input
                    type="tel"
                    placeholder="07042938148"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              </div>

              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_main || false}
                    onChange={(e) => setFormData({ ...formData, is_main: e.target.checked })}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600"
                  />
                  <span>Is Main Headquarters</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600"
                  />
                  <span>Active Branch</span>
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
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
