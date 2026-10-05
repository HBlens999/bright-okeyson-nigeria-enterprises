import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <span className="text-red-500 font-extrabold text-sm uppercase tracking-widest mb-2 font-mono">
        404 - Page Not Found
      </span>
      <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Barlow_Condensed'] tracking-tight mb-4">
        Page Does Not Exist
      </h1>
      <p className="text-neutral-400 text-sm max-w-md mb-8">
        The page you are looking for may have been relocated or removed. Explore our product catalogue or return to the homepage.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded border border-neutral-700 inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Product Catalogue</span>
        </Link>
      </div>
    </div>
  );
};
