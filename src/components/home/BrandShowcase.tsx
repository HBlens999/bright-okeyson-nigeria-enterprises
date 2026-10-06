import React from 'react';
import { Link } from 'react-router-dom';
import { MOTORCYCLE_BRANDS } from '../../lib/seedData';

export const BrandShowcase: React.FC = () => {
  return (
    <section className="brand-showcase bg-white border-b border-brand-sky py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">
            Authorized Brands & Major Stockists
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-heading text-brand-navy tracking-tight mt-1">
            Motorcycles & Genuine Spare Parts We Deal In
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {MOTORCYCLE_BRANDS.map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=${brand}`}
              className="group bg-brand-sky/30 hover:bg-brand-navy border border-brand-sky hover:border-brand-gold rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 text-center"
            >
              <span className="text-sm sm:text-base font-black uppercase text-brand-navy group-hover:text-white font-heading tracking-wider transition-colors">
                {brand}
              </span>
              <span className="text-[10px] text-[#315D70] uppercase mt-0.5 tracking-tight group-hover:text-[#EAF8FC] transition-colors">
                Dealer Stock
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
