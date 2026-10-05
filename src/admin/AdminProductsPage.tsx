import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Check, X, Image as ImageIcon, PlusCircle } from 'lucide-react';
import { Product, Category, ProductSpecification } from '../types/database';
import { getProducts, saveProduct, deleteProduct, getCategories, uploadFile } from '../services/dataService';
import { MOTORCYCLE_BRANDS } from '../lib/seedData';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    brand: 'BAJAJ',
    category_id: '',
    category_name: '',
    sku: '',
    availability: 'In Stock',
    featured: false,
    is_new: false,
    short_description: '',
    description: '',
    main_image_url: '',
    display_order: 1,
    is_active: true,
    specifications: []
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catData] = await Promise.all([
        getProducts({ activeOnly: false }),
        getCategories()
      ]);
      setProducts(prodRes.products);
      setCategories(catData);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      brand: 'BAJAJ',
      category_id: categories[0]?.id || '',
      category_name: categories[0]?.name || '',
      sku: `BONE-${Math.floor(100 + Math.random() * 900)}`,
      availability: 'In Stock',
      featured: false,
      is_new: false,
      short_description: '',
      description: '',
      main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
      display_order: products.length + 1,
      is_active: true,
      specifications: [
        { id: 'sp1', spec_key: 'Compatibility', spec_value: 'Universal Commercial Fit' }
      ]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      ...p,
      specifications: p.specifications || []
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.brand) return;

    try {
      await saveProduct({
        ...formData,
        id: editingId || undefined,
        name: formData.name.trim(),
        brand: formData.brand
      } as any);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
    loadData();
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'product-images');
      setFormData(prev => ({ ...prev, main_image_url: url }));
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    const newSpec: ProductSpecification = {
      id: 'spec_' + Math.random().toString(36).substring(2, 7),
      spec_key: newSpecKey.trim(),
      spec_value: newSpecVal.trim()
    };
    setFormData(prev => ({
      ...prev,
      specifications: [...(prev.specifications || []), newSpec]
    }));
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const removeSpecification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: (prev.specifications || []).filter(s => s.id !== id)
    }));
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Product Catalogue Management
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create, edit, and organize complete motorcycles, genuine parts, and workshop lubricants.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Stats Strip */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by name, brand, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 rounded pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="text-xs text-neutral-400">
          Total Products: <strong className="text-white font-mono">{filteredProducts.length}</strong>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-500">
                    Loading product records...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-500">
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-950/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-950 rounded shrink-0 overflow-hidden border border-neutral-800">
                          <img
                            src={p.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate max-w-xs">{p.name}</div>
                          <div className="text-neutral-500 text-[11px] truncate max-w-xs font-mono">{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold uppercase text-red-400">{p.brand}</td>
                    <td className="py-3 px-4 text-neutral-300">{p.category_name || 'General'}</td>
                    <td className="py-3 px-4 font-mono text-neutral-400">{p.sku || '—'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-950 text-emerald-400 border border-neutral-800">
                        {p.availability}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {p.featured ? (
                        <span className="text-emerald-400 font-semibold">Yes</span>
                      ) : (
                        <span className="text-neutral-600">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {p.is_active ? (
                        <span className="text-emerald-400">Active</span>
                      ) : (
                        <span className="text-neutral-500">Draft</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === p.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(p.id)}
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
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-2xl w-full p-6 text-white my-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-lg font-bold uppercase font-['Barlow_Condensed']">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Front Absorber F/C"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Motorcycle Brand *
                  </label>
                  <select
                    value={formData.brand || 'BAJAJ'}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    {MOTORCYCLE_BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={formData.category_id || ''}
                    onChange={(e) => {
                      const selectedCat = categories.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        category_id: e.target.value,
                        category_name: selectedCat?.name || ''
                      });
                    }}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. BONE-ABS-01"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                  Short Summary
                </label>
                <input
                  type="text"
                  value={formData.short_description || ''}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="1-line quick summary of compatibility and build"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                  Full Technical Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed mechanical overview, materials, and road longevity..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Main Image & Upload */}
              <div className="space-y-2">
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
                  Product Image URL or Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.main_image_url || ''}
                    onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                    placeholder="/src/assets/... or https://..."
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                  <label className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded cursor-pointer shrink-0 font-medium">
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.main_image_url && (
                  <div className="w-16 h-16 bg-neutral-950 rounded border border-neutral-800 overflow-hidden">
                    <img
                      src={formData.main_image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Specifications Sub-Table */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
                  Product Specifications (Key-Value)
                </label>
                <div className="space-y-1.5">
                  {(formData.specifications || []).map((spec) => (
                    <div key={spec.id} className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-neutral-800">
                      <span><strong className="text-neutral-400">{spec.spec_key}:</strong> {spec.spec_value}</span>
                      <button
                        type="button"
                        onClick={() => removeSpecification(spec.id)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Key (e.g. Compatibility)"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-2.5 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. Bajaj Boxer BM100)"
                    value={newSpecVal}
                    onChange={(e) => setNewSpecVal(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded px-2.5 py-1.5 text-white"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-semibold"
                  >
                    Add Spec
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-neutral-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600 focus:ring-red-500"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new || false}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600 focus:ring-red-500"
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded bg-neutral-950 border-neutral-700 text-red-600 focus:ring-red-500"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-600 text-white font-bold uppercase rounded shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
