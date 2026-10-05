# BRIGHT OKEYSON NIGERIA ENTERPRISES

> **Home of All Motorcycle Healing Center**  
> We are dealers in all kinds of complete motorcycles & genuine spare parts.  
> Business Registration Number: **BN 3234989**

---

## 🏍️ About The Application

This web application is a commercial-grade platform built specifically for **Bright Okeyson Nigeria Enterprises**, an established Nigerian distributor and dealer in complete motorcycles and genuine spare parts across Ondo State and Kogi State.

### Core Features

* **Storefront & Catalogue**: High-speed, responsive product catalogue with live search, brand and category filtering, and detailed specifications.
* **No Fixed Price Policy**: Due to currency and market dynamics, products feature direct **"INQUIRE NOW"** and **"INQUIRE FOR CURRENT PRICE"** mechanisms rather than static prices.
* **Intelligent WhatsApp Ordering**: Formatted multi-product inquiry generation with item names, quantities, customer location, and Nigerian WhatsApp phone conversion (`08069382393` → `2348069382393`).
* **Lightweight Cart Architecture**: Stores minimal product IDs and quantities locally without bloating localStorage quotas.
* **Inquiry Database**: Automatically logs all customer inquiries and leads in Supabase prior to dispatching to WhatsApp.
* **Paid Advertising Landing Pages**: High-conversion landing pages at `/landing` and `/landing/:slug` (e.g., `/landing/bajaj`, `/landing/spare-parts`) preserving UTM parameters (`utm_source`, `utm_campaign`, etc.).
* **Welcome Announcement Modal**: Configurable welcome greeting with frequency rules (every visit, once per session, once per day).
* **Animated Floating WhatsApp**: Interactive floating button with Nigerian phone formatting, subtle pulse, and customizable tooltips.
* **Hero Carousel**: Responsive slider with eager loading for primary hero images and lazy loading for subsequent slides.
* **Complete Admin CMS**:
  * Product CRUD & Specifications manager
  * Category CRUD
  * Orders & Inquiries pipeline (New, Contacted, Processing, Completed, Cancelled)
  * Hero slide builder & transition effects
  * Advertising landing page builder
  * Announcement popup editor
  * Corporate information & branch managers
  * Theme styling & CSS variables editor
  * SEO metadata & social cards
  * Analytics & tracking pixel configuration (Meta Pixel, GA4, Google Ads)
  * Database migration script viewer

---

## 🏢 Business Information

* **Business Name**: BRIGHT OKEYSON NIGERIA ENTERPRISES
* **Tagline**: Home of All Motorcycle Healing Center
* **Registration**: BN 3234989
* **Main Headquarters**: NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE
* **Branch Office 1**: 1: L/128 Ilepa Street, Ikare Akoko, Ondo State
* **Branch Office 2**: NO. 89, Obaro Way, Kabba, Kogi State
* **Email**: brightokeson3@gmail.com
* **Official Phone Lines**:
  * 08069382393 (Primary WhatsApp)
  * 07042938148
  * 09033338829
  * 09119442829
* **Brands We Deal In**: BAJAJ, TVS, KEKE, HAOJUE, JEELY, SHIRORO, BESTY, JIENG

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
* Node.js (v18 or newer)
* npm or bun

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/bright-okeyson-nigeria.git
cd bright-okeyson-nigeria
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project keys:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
*(Note: If Supabase keys are not set, the app seamlessly runs in fallback mode with full local CRUD persistence!)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Backend Setup

### 1. Database Schema & Seed Migrations
1. Go to your [Supabase Dashboard](https://app.supabase.com).
2. Open the **SQL Editor**.
3. Copy and run the contents of `supabase/schema.sql` (creates tables, indexes, RLS policies).
4. Run the contents of `supabase/seed.sql` (seeds initial branches, categories, products, and hero slides).

### 2. Storage Buckets
In the Supabase **Storage** panel, create the following public buckets:
* `product-images`
* `hero-images`
* `logos`
* `category-images`
* `landing-images`

### 3. Creating Your First Admin User
1. In Supabase Dashboard > **Authentication** > **Users**, create a new user:
   * **Email**: `brightokeson3@gmail.com`
   * **Password**: *Choose a secure password*
2. In the **SQL Editor**, grant admin permissions:
   ```sql
   INSERT INTO public.profiles (id, email, full_name, role)
   VALUES (
     (SELECT id FROM auth.users WHERE email = 'brightokeson3@gmail.com'),
     'brightokeson3@gmail.com',
     'Bright Okeyson Admin',
     'admin'
   )
   ON CONFLICT (id) DO UPDATE SET role = 'admin';
   ```

---

## 🔐 Default Admin Portal Login

Navigate to `/admin/login`:
* **Email**: `brightokeson3@gmail.com`
* **Password**: `Okeyson2026!`

---

## ☁️ Deployment

### GitHub Repository
```bash
git init
git add .
git commit -m "feat: complete Bright Okeyson Nigeria web platform"
git branch -M main
git remote add origin https://github.com/your-username/bright-okeyson-nigeria.git
git push -u origin main
```

### Cloudflare Pages Deployment
1. Connect your GitHub repository to Cloudflare Pages.
2. Configure build settings:
   * **Framework preset**: Vite
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`
3. Add Environment Variables in Cloudflare Pages dashboard:
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
4. The included `public/_redirects` file (`/* /index.html 200`) ensures proper SPA client-side routing on hard refreshes.

---

## 📄 License & Ownership
Copyright © 2026 BRIGHT OKEYSON NIGERIA ENTERPRISES (BN 3234989). All rights reserved.
