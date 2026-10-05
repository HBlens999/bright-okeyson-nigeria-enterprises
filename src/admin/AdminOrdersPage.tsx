import React, { useState, useEffect } from 'react';
import { Inbox, MessageCircle, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Inquiry, InquiryStatus } from '../types/database';
import { getInquiries, updateInquiryStatus } from '../services/dataService';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const AdminOrdersPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Error loading inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await updateInquiryStatus(id, status);
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)));
  };

  const filtered = inquiries.filter(i => {
    if (statusFilter === 'ALL') return true;
    return i.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Customer Inquiries & Orders
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time inquiries received via website cart checkout and advertising landing pages.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded text-xs">
        {['ALL', 'New', 'Contacted', 'Processing', 'Completed', 'Cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              statusFilter === st
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {st} ({st === 'ALL' ? inquiries.length : inquiries.filter(i => i.status === st).length})
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-neutral-500 text-xs">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded p-12 text-center text-xs text-neutral-500">
            No inquiries matching the selected filter.
          </div>
        ) : (
          filtered.map((inq) => {
            const customerWaUrl = inq.phone
              ? getWhatsAppUrl(
                  inq.phone,
                  `Hello ${inq.customer_name}, this is Bright Okeyson Nigeria Enterprises regarding your motorcycle and spare parts inquiry.`
                )
              : null;

            return (
              <div
                key={inq.id}
                className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 font-bold font-mono">
                      INQ
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base font-['Barlow_Condensed'] uppercase tracking-tight">
                        {inq.customer_name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                        <span className="font-mono text-neutral-300">{inq.phone}</span>
                        {inq.location && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{inq.location}</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-500 font-mono text-[11px]">
                          {new Date(inq.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                      className="bg-neutral-950 border border-neutral-700 text-white rounded px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-red-500"
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Processing">Status: Processing</option>
                      <option value="Completed">Status: Completed</option>
                      <option value="Cancelled">Status: Cancelled</option>
                    </select>

                    {customerWaUrl && (
                      <a
                        href={customerWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Items Inquired */}
                {inq.items && inq.items.length > 0 ? (
                  <div className="bg-neutral-950 border border-neutral-800 rounded p-3 text-xs space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-neutral-400 block tracking-wider">
                      Inquired Products:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {inq.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-neutral-900 rounded border border-neutral-800">
                          <span className="font-semibold text-white truncate">{item.product_name_snapshot}</span>
                          <span className="font-mono text-red-400 font-bold ml-2">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  inq.message && (
                    <div className="bg-neutral-950 border border-neutral-800 rounded p-3 text-xs text-neutral-300">
                      <span className="text-neutral-500 block text-[11px] font-bold uppercase">Customer Message:</span>
                      {inq.message}
                    </div>
                  )
                )}

                {/* Lead Tracking Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 pt-1">
                  <span>Source: <strong className="text-neutral-300 font-mono">{inq.source || 'website'}</strong></span>
                  {inq.utm_source && <span>UTM Source: <strong className="text-neutral-300 font-mono">{inq.utm_source}</strong></span>}
                  {inq.utm_campaign && <span>Campaign: <strong className="text-neutral-300 font-mono">{inq.utm_campaign}</strong></span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
