import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag, MessageCircle, Check, X } from 'lucide-react';
import { Product } from '../types/database';
import { getProducts, getCategories } from '../services/dataService';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { generateProductWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { MOTORCYCLE_BRANDS } from '../lib/seedData';
import { updatePageSEO } from '../utils/seo';

const PAGE_SIZE = 12;

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addItem } = useCart();
  const { siteSettings, categories } = useSettings();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'all';
  const currentBrand = searchParams.get('brand') || 'ALL';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    updatePageSEO({
      title: 'Motorcycle & Spare Parts Product Catalogue',
      description: 'Browse complete motorcycles, engine parts, absorbers, clutch plates, lubricants, tyres, and genuine accessories at Bright Okeyson Nigeria Enterprises.'
    });
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * PAGE_SIZE;
        const res = await getProducts({
          search: currentSearch,
          categorySlug: currentCategory,
          brand: currentBrand,
          limit: PAGE_SIZE,
          offset
        });
        setProducts(res.products);
        setTotal(res.total);
      } catch (err) {
        console.warn('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentSearch, currentCategory, currentBrand, currentPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set('search', searchInput.trim());
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleCategorySelect = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleBrandSelect = (brand: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (brand === 'ALL') {
      newParams.delete('brand');
    } else {
      newParams.set('brand', brand);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  const handleAddToCart = (product: Product) => {
    addItem(product.id, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-1.5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-red-500 font-semibold">Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Motorcycles & Genuine Spare Parts Catalogue
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Original equipment components and complete commercial motorcycles. Instant price and stock verification via WhatsApp.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded p-4 mb-8 space-y-4">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by product name, brand, SKU, or part..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded shrink-0 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Interactive Category Filter Controls (Buttons/Tabs per Anti-Slop Discipline) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
              <Filter className="w-3.5 h-3.5 text-red-500" />
              <span>Category:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentCategory === 'all'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                    currentCategory === cat.slug
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Brand Filter Tabs */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80">
            <span className="text-xs text-neutral-400 font-medium block">Brand:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleBrandSelect('ALL')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  currentBrand === 'ALL'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                All Brands
              </button>
              {MOTORCYCLE_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                    currentBrand === brand
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-neutral-950 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(currentSearch || currentCategory !== 'all' || currentBrand !== 'ALL') && (
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span>Active filters:</span>
                {currentSearch && <span className="text-white bg-neutral-800 px-2 py-0.5 rounded">Search: "{currentSearch}"</span>}
                {currentCategory !== 'all' && <span className="text-white bg-neutral-800 px-2 py-0.5 rounded">Category: {currentCategory}</span>}
                {currentBrand !== 'ALL' && <span className="text-white bg-neutral-800 px-2 py-0.5 rounded">Brand: {currentBrand}</span>}
              </div>
              <button
                onClick={clearAllFilters}
                className="text-red-400 hover:text-red-300 underline font-medium"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>Showing <strong className="text-white tabular-nums">{products.length}</strong> of <strong className="text-white tabular-nums">{total}</strong> products</span>
          <span className="text-neutral-500">Prices provided upon live inquiry</span>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded p-4 h-80 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-950 flex items-center justify-center text-neutral-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-['Barlow_Condensed'] tracking-wide">
              No products found. Try another search.
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              We stock hundreds of spare parts that may not be displayed yet. Chat with our sales desk directly on WhatsApp to check stock in Ikare Akoko or Kabba warehouse.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Clear Search Filters
              </button>
              <a
                href={getWhatsAppUrl(siteSettings.primary_whatsapp, `Hello ${siteSettings.business_name}, I am looking for a motorcycle part: ${currentSearch || 'General inquiry'}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-green-700 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const waUrl = getWhatsAppUrl(
                siteSettings.primary_whatsapp,
                generateProductWhatsAppMessage(product.name, product.brand, product.sku)
              );

              return (
                <div
                  key={product.id}
                  className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded overflow-hidden flex flex-col justify-between transition-all duration-200"
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="relative aspect-4/3 bg-neutral-950 overflow-hidden block"
                  >
                    <img
                      src={product.main_image_url || '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg'}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-950/80 text-emerald-400 border border-neutral-800">
                      {product.availability}
                    </div>
                    {product.brand && (
                      <div className="absolute top-2.5 right-2.5 text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-700 text-white">
                        {product.brand}
                      </div>
                    )}
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                        {product.category_name || 'Genuine Spare Part'}
                      </div>
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-bold text-base text-white hover:text-red-400 line-clamp-1 mt-0.5 transition-colors"
                      >
                        {product.name}
                      </Link>
                      {product.short_description && (
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {product.short_description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-neutral-800 mt-4 space-y-2.5">
                      <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                        <span>Price:</span>
                        <span className="text-red-400 font-medium">Contact for price</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-2 bg-green-700 hover:bg-green-600 text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </a>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="py-2.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                        >
                          {addedId === product.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-12">
            <button
              disabled={currentPage <= 1}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', (currentPage - 1).toString());
                setSearchParams(newParams);
              }}
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 text-xs font-semibold rounded text-white"
            >
              Previous
            </button>
            <span className="text-xs text-neutral-400 px-3">
              Page <strong className="text-white tabular-nums">{currentPage}</strong> of <strong className="text-white tabular-nums">{totalPages}</strong>
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', (currentPage + 1).toString());
                setSearchParams(newParams);
              }}
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 text-xs font-semibold rounded text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
