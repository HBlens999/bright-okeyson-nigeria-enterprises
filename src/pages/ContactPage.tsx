import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { submitContact } from '../services/dataService';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { updatePageSEO } from '../utils/seo';

export const ContactPage: React.FC = () => {
  const { siteSettings, branches } = useSettings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    updatePageSEO({
      title: 'Contact Us & Dealership Branches',
      description: `Contact ${siteSettings.business_name} in Ikare Akoko (Ondo State) and Kabba (Kogi State). Call ${siteSettings.primary_whatsapp} or chat on WhatsApp.`
    });
  }, [siteSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setStatus('submitting');
    try {
      await submitContact({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim()
      });
      setStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  const mainWaUrl = getWhatsAppUrl(
    siteSettings.primary_whatsapp,
    `Hello ${siteSettings.business_name}, I am contacting you through your website contact page.`
  );

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-1.5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-red-500 font-semibold">Contact & Branches</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
            Contact Bright Okeyson Nigeria Enterprises
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Reach out directly for wholesale and retail spare parts pricing, complete motorcycle availability, and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Branches & Direct Contacts (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick WhatsApp Alert Box */}
            <div className="bg-neutral-900 border border-green-800/60 rounded p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-green-400">
                  Instant Support
                </div>
                <h3 className="font-bold text-base text-white font-['Barlow_Condensed'] uppercase">
                  Fastest Response via WhatsApp
                </h3>
                <p className="text-xs text-neutral-400">
                  Speak directly with our technical sales manager.
                </p>
              </div>
              <a
                href={mainWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Branches List */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                Official Branches & Locations
              </h2>
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-red-500 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                      {b.is_main ? 'Main Office' : 'Branch Office'}
                    </span>
                    <MapPin className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="font-bold text-base text-white font-['Barlow_Condensed'] uppercase">
                    {b.name}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {b.address}
                  </p>
                  {b.phone && (
                    <div className="text-xs text-neutral-400">
                      Phone: <a href={`tel:${b.phone}`} className="text-neutral-200 hover:text-white font-mono">{b.phone}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Direct Official Contact Data */}
            <div className="bg-neutral-900 border border-neutral-800 rounded p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Official Business Contacts
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block">Email Address:</span>
                    <a href={`mailto:${siteSettings.email}`} className="text-white hover:underline font-medium">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-400 block mb-1">Official Telephone Lines:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {siteSettings.phone_numbers.map((num) => (
                        <a
                          key={num}
                          href={`tel:${num}`}
                          className="px-2.5 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-200 hover:text-white font-mono font-bold"
                        >
                          {num}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Submission Form (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded p-6 sm:p-8 space-y-5">
              <div>
                <h2 className="text-xl font-bold uppercase font-['Barlow_Condensed'] text-white">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill in your details and our team will get in touch with you shortly.
                </p>
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-950/80 border border-green-800 rounded flex items-center gap-3 text-green-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your message has been sent successfully. We will contact you shortly!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-950/80 border border-red-800 rounded flex items-center gap-3 text-red-300 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Failed to send message. Please reach us directly on WhatsApp.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Full Name / Enterprise Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08069382393"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
                    Message / Parts Required *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify the motorcycle model or spare parts you are looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded px-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
