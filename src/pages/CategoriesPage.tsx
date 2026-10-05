import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Disc, Wrench, Layers, Droplet, Shield, Package } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { updatePageSEO } from '../utils/seo';

export const CategoriesPage: React.FC = () => {
  const { categories } = useSettings();

  useEffect(() => {
    updatePageSEO({
      title: 'Motorcycle & Parts Categories',
      description: 'Explore Complete Motorcycles, Engine Parts, Lubricants & Oils, Tyres, and Accessories at Bright Okeyson Nigeria Enterprises.'
    });
  }, []);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'complete-motorcycles':
        return <Disc className="w-6 h-6 text-red-500" />;
      case 'spare-parts':
        return <Wrench className="w-6 h-6 text-red-500" />;
      case 'engine-parts':
        return <Layers className="w-6 h-6 text-red-500" />;
      case 'lubricants-oils':
        return <Droplet className="w-6 h-6 text-red-500" />;
      case 'motorcycle-accessories':
        return <Shield className="w-6 h-6 text-red-500" />;
      default:
        return <Package className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-1.5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-red-500 font-semibold">Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Motorcycle & Spare Parts Classifications
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Explore our specialized inventories tailored for individual riders, commercial motorcycle fleets, and mechanical workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group bg-neutral-900 border border-neutral-800 hover:border-red-600 rounded p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="font-bold text-xl text-white group-hover:text-red-400 font-['Barlow_Condensed'] uppercase tracking-tight transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-red-400 transition-colors">
                <span>Browse Products in Category</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
