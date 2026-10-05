import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Inbox,
  Sliders,
  FileSpreadsheet,
  MapPin,
  Clock,
  ArrowRight,
  PlusCircle,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Layers
} from 'lucide-react';
import {
  getDashboardStats,
  getInquiries,
  updateInquiryStatus
} from '../services/dataService';
import { Inquiry, InquiryStatus } from '../types/database';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    featuredProducts: 0,
    totalCategories: 0,
    totalInquiries: 0,
    newInquiries: 0,
    processingInquiries: 0,
    completedInquiries: 0,
    landingPages: 0,
    heroSlides: 0,
    branches: 0
  });

  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashStats, inqData] = await Promise.all([
          getDashboardStats(),
          getInquiries()
        ]);

        setStats(dashStats);
        setRecentInquiries(inqData.slice(0, 5));
      } catch (err) {
        console.warn('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    setRecentInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, sub: `${stats.activeProducts} active in catalogue`, icon: Package, link: '/admin/products' },
    { label: 'Categories', value: stats.totalCategories, sub: 'Inventory classifications', icon: Layers, link: '/admin/categories' },
    { label: 'Customer Inquiries', value: stats.totalInquiries, sub: `${stats.newInquiries} new pending leads`, icon: Inbox, link: '/admin/orders', highlight: true },
    { label: 'Active Hero Slides', value: stats.heroSlides, sub: 'Homepage carousel banners', icon: Sliders, link: '/admin/hero' },
    { label: 'Dealership Branches', value: stats.branches, sub: 'Ikare & Kabba locations', icon: MapPin, link: '/admin/branches' },
    { label: 'Ad Landing Pages', value: stats.landingPages, sub: 'Published campaigns', icon: FileSpreadsheet, link: '/admin/landing-pages' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time management summary for Bright Okeyson Nigeria Enterprises.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="px-3.5 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5 border border-neutral-700"
          >
            <Inbox className="w-4 h-4" />
            <span>All Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Primary Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className={`p-5 rounded border transition-all duration-200 flex flex-col justify-between ${
                card.highlight
                  ? 'bg-neutral-900 border-red-800/80 hover:border-red-600'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase text-neutral-400">
                  {card.label}
                </span>
                <Icon className={`w-5 h-5 ${card.highlight ? 'text-red-500' : 'text-neutral-400'}`} />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono tabular-nums">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center justify-between">
                  <span>{card.sub}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Secondary Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-900/60 border border-neutral-800 rounded p-4 text-xs">
        <div>
          <span className="text-neutral-500 block">Featured Products</span>
          <span className="text-lg font-bold text-white font-mono">{stats.featuredProducts}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">Processing Inquiries</span>
          <span className="text-lg font-bold text-amber-400 font-mono">{stats.processingInquiries}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">Completed Orders</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">{stats.completedInquiries}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">Dealership Branches</span>
          <span className="text-lg font-bold text-white font-mono">{stats.branches}</span>
        </div>
      </div>

      {/* Recent Inquiries / WhatsApp Leads */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold uppercase font-['Barlow_Condensed'] text-white">
              Recent Customer Inquiries
            </h2>
            <p className="text-xs text-neutral-400">
              Orders and price inquiries submitted through web and WhatsApp checkout.
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs text-red-400 hover:text-red-300 font-semibold"
          >
            View All ({stats.totalInquiries})
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="text-center py-8 text-neutral-500 text-xs">
            No customer inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-800 text-neutral-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Customer / Phone</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Inquired Items</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-950/40">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{inq.customer_name}</div>
                      <div className="text-neutral-400 font-mono text-[11px]">{inq.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-300">
                      {inq.location || '—'}
                    </td>
                    <td className="py-3 px-3">
                      {inq.items && inq.items.length > 0 ? (
                        <div className="space-y-0.5">
                          {inq.items.map((itm, i) => (
                            <div key={i} className="text-neutral-200">
                              {itm.product_name_snapshot} <span className="text-neutral-500 font-mono">x{itm.quantity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-neutral-400">{inq.message || 'General inquiry'}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-neutral-400 font-mono text-[11px]">
                      {inq.source || 'website'}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className="bg-neutral-950 border border-neutral-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-red-500"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right text-neutral-500 font-mono text-[11px]">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
