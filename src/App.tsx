import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboardPage } from './admin/AdminDashboardPage';
import { AdminProductsPage } from './admin/AdminProductsPage';
import { AdminCategoriesPage } from './admin/AdminCategoriesPage';
import { AdminOrdersPage } from './admin/AdminOrdersPage';
import { AdminHeroPage } from './admin/AdminHeroPage';
import { AdminHomepagePage } from './admin/AdminHomepagePage';
import { AdminLandingPagesPage } from './admin/AdminLandingPagesPage';
import { AdminAnnouncementsPage } from './admin/AdminAnnouncementsPage';
import { AdminBrandingPage } from './admin/AdminBrandingPage';
import { AdminBusinessPage } from './admin/AdminBusinessPage';
import { AdminBranchesPage } from './admin/AdminBranchesPage';
import { AdminWhatsAppPage } from './admin/AdminWhatsAppPage';
import { AdminNavigationPage } from './admin/AdminNavigationPage';
import { AdminFooterPage } from './admin/AdminFooterPage';
import { AdminThemePage } from './admin/AdminThemePage';
import { AdminSeoPage } from './admin/AdminSeoPage';
import { AdminAnalyticsPage } from './admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './admin/AdminSettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <CartProvider>
          <AuthProvider>
            <Routes>
              {/* Public Storefront Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:slug" element={<CategoryDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Dedicated Advertising Landing Pages (Minimal Header, High Conversion) */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing/:slug" element={<LandingPage />} />

              {/* Admin Portal Authentication */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin CMS Protected Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="hero" element={<AdminHeroPage />} />
                <Route path="homepage" element={<AdminHomepagePage />} />
                <Route path="landing-pages" element={<AdminLandingPagesPage />} />
                <Route path="announcements" element={<AdminAnnouncementsPage />} />
                <Route path="branding" element={<AdminBrandingPage />} />
                <Route path="business" element={<AdminBusinessPage />} />
                <Route path="branches" element={<AdminBranchesPage />} />
                <Route path="whatsapp" element={<AdminWhatsAppPage />} />
                <Route path="navigation" element={<AdminNavigationPage />} />
                <Route path="footer" element={<AdminFooterPage />} />
                <Route path="theme" element={<AdminThemePage />} />
                <Route path="seo" element={<AdminSeoPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </CartProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
