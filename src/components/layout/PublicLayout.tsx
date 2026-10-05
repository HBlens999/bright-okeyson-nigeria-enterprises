import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp';
import { AnnouncementPopup } from '../common/AnnouncementPopup';
import { CartDrawer } from '../cart/CartDrawer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100">
      {/* Welcome Announcement Modal */}
      <AnnouncementPopup />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Primary 3-Zone Header */}
      <Header />

      {/* Main Page Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating Animated WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Comprehensive Official Dealership Footer */}
      <Footer />
    </div>
  );
};
