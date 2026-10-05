import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/categories" replace />;
  }

  // Redirect to products with category query param for unified filtering experience
  return <Navigate to={`/products?category=${slug}`} replace />;
};
