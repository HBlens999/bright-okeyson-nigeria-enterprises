import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Shield, Droplet, Disc, Package, Layers } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const CategoryShowcase: React.FC = () => {
  const { categories } = useSettings();

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'complete-motorcycles':
        return <Disc className="w-5 h-5 text-red-500" />;
      case 'spare-parts':
        return <Wrench className="w-5 h-5 text-red-500" />;
      case 'engine-parts':
        return <Layers className="w-5 h-5 text-red-500" />;
      case 'lubricants-oils':
        return <Droplet className="w-5 h-5 text-red-500" />;
      case 'motorcycle-accessories':
        return <Shield className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-red-500" />;
    }
  };

  const activeCategories = categories.filter((c) => c.is_active);

  return (
    <section className="bg-neutral-900 text-white py-16 sm:py-20 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
              Organized Parts Inventory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group bg-neutral-950 border border-neutral-800 hover:border-red-600 rounded p-5 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-red-400 font-['Barlow_Condensed'] uppercase tracking-tight transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-red-400 transition-colors">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
