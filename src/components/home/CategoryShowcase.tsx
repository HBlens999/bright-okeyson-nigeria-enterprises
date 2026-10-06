import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Shield, Droplet, Disc, Package, Layers } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const CategoryShowcase: React.FC = () => {
  const { categories } = useSettings();

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'complete-motorcycles':
        return <Disc className="w-5 h-5 text-brand-teal" />;
      case 'spare-parts':
        return <Wrench className="w-5 h-5 text-brand-teal" />;
      case 'engine-parts':
        return <Layers className="w-5 h-5 text-brand-teal" />;
      case 'lubricants-oils':
        return <Droplet className="w-5 h-5 text-brand-teal" />;
      case 'motorcycle-accessories':
        return <Shield className="w-5 h-5 text-brand-teal" />;
      default:
        return <Package className="w-5 h-5 text-brand-teal" />;
    }
  };

  const activeCategories = categories.filter((c) => c.is_active);

  return (
    <section className="category-showcase bg-brand-navy text-white py-16 sm:py-20 border-b border-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1 block">
              Organized Parts Inventory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-heading tracking-tight text-white">
              Explore By Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-sky hover:text-brand-gold transition-colors"
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
              className="group category-card bg-white border border-brand-sky hover:border-brand-gold rounded-xl p-5 flex flex-col justify-between transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-sky/60 border border-brand-sky flex items-center justify-center mb-4 group-hover:bg-brand-gold transition-colors">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="font-bold text-lg text-brand-navy group-hover:text-brand-navy font-heading uppercase tracking-tight transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-[#315D70] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-brand-sky flex items-center justify-between text-xs font-semibold text-[#315D70] group-hover:text-brand-navy transition-colors">
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
