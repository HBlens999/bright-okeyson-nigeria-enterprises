import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { NavigationItem } from '../types/database';
import { getNavigationItems, saveNavigationItems } from '../services/dataService';

export const AdminNavigationPage: React.FC = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getNavigationItems();
      setItems(data);
    }
    load();
  }, []);

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, is_active: !i.is_active } : i))
    );
  };

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleAdd = () => {
    if (!newLabel.trim() || !newUrl.trim()) return;
    const newItem: NavigationItem = {
      id: 'nav_' + Math.random().toString(36).substring(2, 7),
      label: newLabel.trim(),
      url: newUrl.trim(),
      display_order: items.length + 1,
      is_active: true
    };
    setItems(prev => [...prev, newItem]);
    setNewLabel('');
    setNewUrl('');
  };

  const handleSaveAll = async () => {
    await saveNavigationItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Navigation Bar CMS
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Edit header navigation items, labels, URLs, and active states.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-green-950 border border-green-800 rounded flex items-center gap-2 text-green-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Navigation bar links updated!</span>
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-4 text-xs">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-neutral-950 border border-neutral-800 rounded flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-white uppercase font-['Barlow_Condensed'] text-sm">
                  {item.label}
                </span>
                <span className="font-mono text-neutral-400">{item.url}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                    item.is_active
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {item.is_active ? 'Active' : 'Disabled'}
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 text-neutral-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Nav Item */}
        <div className="pt-3 border-t border-neutral-800 flex gap-2">
          <input
            type="text"
            placeholder="Label (e.g. Services)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            placeholder="URL (e.g. /services)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white font-mono"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-semibold inline-flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold uppercase rounded shadow-sm"
          >
            Save Navigation Items
          </button>
        </div>
      </div>
    </div>
  );
};
