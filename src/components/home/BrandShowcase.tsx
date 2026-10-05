import React from 'react';
import { Link } from 'react-router-dom';
import { MOTORCYCLE_BRANDS } from '../../lib/seedData';

export const BrandShowcase: React.FC = () => {
  return (
    <section className="bg-neutral-900 border-b border-neutral-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
            Authorized Brands & Major Stockists
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-['Barlow_Condensed'] text-white tracking-tight mt-1">
            Motorcycles & Genuine Spare Parts We Deal In
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {MOTORCYCLE_BRANDS.map((brand) => (
            <Link
              key={brand}
              to={`/products?brand=${brand}`}
              className="group bg-neutral-950/70 hover:bg-neutral-950 border border-neutral-800 hover:border-red-600 rounded p-4 flex flex-col items-center justify-center transition-all duration-200 text-center"
            >
              <span className="text-sm sm:text-base font-black uppercase text-neutral-300 group-hover:text-red-400 font-['Barlow_Condensed'] tracking-wider">
                {brand}
              </span>
              <span className="text-[10px] text-neutral-500 uppercase mt-0.5 tracking-tight group-hover:text-neutral-400">
                Dealer Stock
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
