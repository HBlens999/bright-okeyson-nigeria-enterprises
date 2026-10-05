import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Inbox,
  Sliders,
  Home,
  FileSpreadsheet,
  Bell,
  Palette,
  Building2,
  MapPin,
  MessageCircle,
  MenuSquare,
  PanelBottom,
  Sparkles,
  Search,
  BarChart3,
  Settings,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { siteSettings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Protected route check
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuSections = [
    {
      title: 'Catalogue & Orders',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Products', path: '/admin/products', icon: Package },
        { label: 'Categories', path: '/admin/categories', icon: FolderTree },
        { label: 'Orders / Inquiries', path: '/admin/orders', icon: Inbox }
      ]
    },
    {
      title: 'Marketing & Content',
      items: [
        { label: 'Hero Slides', path: '/admin/hero', icon: Sliders },
        { label: 'Homepage CMS', path: '/admin/homepage', icon: Home },
        { label: 'Landing Pages', path: '/admin/landing-pages', icon: FileSpreadsheet },
        { label: 'Announcements', path: '/admin/announcements', icon: Bell }
      ]
    },
    {
      title: 'Identity & Dealership',
      items: [
        { label: 'Branding & Logo', path: '/admin/branding', icon: Palette },
        { label: 'Business Info', path: '/admin/business', icon: Building2 },
        { label: 'Branches', path: '/admin/branches', icon: MapPin },
        { label: 'WhatsApp Settings', path: '/admin/whatsapp', icon: MessageCircle }
      ]
    },
    {
      title: 'Structure & Engine',
      items: [
        { label: 'Navigation', path: '/admin/navigation', icon: MenuSquare },
        { label: 'Footer CMS', path: '/admin/footer', icon: PanelBottom },
        { label: 'Theme Styling', path: '/admin/theme', icon: Sparkles },
        { label: 'SEO Settings', path: '/admin/seo', icon: Search },
        { label: 'Analytics & UTM', path: '/admin/analytics', icon: BarChart3 },
        { label: 'Supabase Database', path: '/admin/settings', icon: Database }
      ]
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname === path) return true;
    return false;
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded bg-neutral-800 text-neutral-300"
            aria-label="Toggle Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-extrabold text-sm uppercase font-['Barlow_Condensed']">
            Admin CMS · {siteSettings.business_name}
          </span>
        </div>
        <Link to="/" target="_blank" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1">
          <span>Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm uppercase font-['Barlow_Condensed'] text-white tracking-wide">
                BONE Control Portal
              </span>
              <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/80 px-1.5 py-0.5 rounded font-mono font-bold">
                {user?.role || 'admin'}
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1 truncate">
              {user?.email}
            </div>
            {/* Supabase status indicator */}
            <div className="mt-2 text-[10px] flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span className="text-neutral-400">
                {isSupabaseConfigured ? 'Supabase Connected' : 'Local Store Active'}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuSections.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold tracking-wide transition-colors ${
                        active
                          ? 'bg-red-700 text-white font-bold'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <Link
            to="/"
            target="_blank"
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 p-1.5 rounded"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 p-1.5 rounded hover:bg-neutral-900"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
