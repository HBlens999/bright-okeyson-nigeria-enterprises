import React, { useState } from 'react';
import { Database, Copy, Check, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const AdminSettingsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'Not set in environment';
  const supabaseKeyConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_ANON_KEY.length > 20 &&
    !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('your-anon-key')
  );

  const copySqlSchema = () => {
    const sql = `-- Run this in your Supabase SQL Editor:
-- Available in supabase/schema.sql and supabase/seed.sql
-- All 18 tables, RLS policies, and authentic seed data are fully scripted.`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-['Barlow_Condensed'] tracking-tight">
          Supabase Database & Backend Architecture
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Connection status, environment variables, PostgreSQL schema migrations, and storage bucket configuration.
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <h2 className="text-base font-bold uppercase font-['Barlow_Condensed'] text-white">
              Backend Connection Status: {isSupabaseConfigured ? 'Live Supabase Connected' : 'Local Store Active (Ready for Supabase)'}
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {isSupabaseConfigured ? 'Real-Time Sync' : 'Offline / Preview Safe'}
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          {isSupabaseConfigured
            ? 'The application is actively connected to your cloud Supabase PostgreSQL database. All product modifications, hero slide changes, and customer WhatsApp inquiries persist across devices.'
            : 'The application is currently running with its robust built-in reactive store and authentic Nigerian seed records. All modifications made in this admin panel persist locally in browser storage, so you can test all features immediately. Once you provide your Supabase project credentials in your environment variables, the system connects automatically!'}
        </p>

        {/* Environment Detection */}
        <div className="bg-neutral-950 border border-neutral-800 rounded p-4 text-xs font-mono space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">VITE_SUPABASE_URL:</span>
            <span className="text-neutral-300">{supabaseUrl}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">VITE_SUPABASE_ANON_KEY:</span>
            <span className={supabaseKeyConfigured ? 'text-emerald-400' : 'text-amber-400'}>
              {supabaseKeyConfigured ? 'Configured (Active)' : 'Missing or Placeholder'}
            </span>
          </div>
        </div>
      </div>

      {/* Migration Instructions */}
      <div className="bg-neutral-900 border border-neutral-800 rounded p-6 space-y-4 text-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
          Supabase Provisioning Steps
        </h3>

        <div className="space-y-3 text-neutral-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded border border-neutral-800">
            <span className="w-5 h-5 rounded bg-red-950 text-red-400 font-bold font-mono flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white block mb-0.5">Execute Database Migration:</strong>
              Open your Supabase Project dashboard &gt; <strong>SQL Editor</strong>, and execute the SQL script located in <code className="text-red-400 bg-neutral-900 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> and <code className="text-red-400 bg-neutral-900 px-1 py-0.5 rounded font-mono">supabase/seed.sql</code>. This generates all 18 tables, indexes, and initial authentic products.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded border border-neutral-800">
            <span className="w-5 h-5 rounded bg-red-950 text-red-400 font-bold font-mono flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white block mb-0.5">Create Storage Buckets:</strong>
              In Supabase dashboard &gt; <strong>Storage</strong>, create public buckets named:
              <span className="font-mono text-white block mt-1">
                • <code className="text-red-400">product-images</code> &nbsp; • <code className="text-red-400">hero-images</code> &nbsp; • <code className="text-red-400">logos</code> &nbsp; • <code className="text-red-400">category-images</code>
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded border border-neutral-800">
            <span className="w-5 h-5 rounded bg-red-950 text-red-400 font-bold font-mono flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white block mb-0.5">Add Environment Variables:</strong>
              Set <code className="text-red-400 font-mono">VITE_SUPABASE_URL</code> and <code className="text-red-400 font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment file (<code className="font-mono text-neutral-300">.env</code>).
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-neutral-500">
            Full scripts located in repository root: <code className="text-neutral-400 font-mono">supabase/schema.sql</code>
          </span>
          <button
            onClick={copySqlSchema}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-bold uppercase text-xs inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Reference' : 'Copy SQL Notes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
