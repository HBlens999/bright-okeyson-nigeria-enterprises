-- ==============================================================================
-- BRIGHT OKEYSON NIGERIA ENTERPRISES
-- Complete Supabase Schema & Initial Migration
-- Business Reg: BN 3234989
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL DEFAULT 'BRIGHT OKEYSON NIGERIA ENTERPRISES',
    tagline TEXT NOT NULL DEFAULT 'Home of All Motorcycle Healing Center',
    description TEXT NOT NULL DEFAULT 'We are dealers in all kinds of complete motorcycles & spare parts.',
    registration_number TEXT NOT NULL DEFAULT 'BN 3234989',
    main_office TEXT NOT NULL DEFAULT 'NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE',
    email TEXT NOT NULL DEFAULT 'brightokeson3@gmail.com',
    phone_numbers TEXT[] NOT NULL DEFAULT ARRAY['08069382393', '07042938148', '09033338829', '09119442829'],
    primary_whatsapp TEXT NOT NULL DEFAULT '08069382393',
    whatsapp_tooltip TEXT NOT NULL DEFAULT 'Need help? Chat with us on WhatsApp',
    whatsapp_position TEXT NOT NULL DEFAULT 'bottom-right' CHECK (whatsapp_position IN ('bottom-right', 'bottom-left')),
    whatsapp_pulse BOOLEAN NOT NULL DEFAULT true,
    whatsapp_enabled BOOLEAN NOT NULL DEFAULT true,
    whatsapp_template TEXT NOT NULL DEFAULT 'Hello Bright Okeyson Nigeria Enterprises,\n\nI would like to inquire about the following:\n{ITEMS}\n\nPlease provide current prices and availability.\n\nName: {NAME}\nPhone: {PHONE}\nLocation: {LOCATION}\n\nThank you.',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Branding
CREATE TABLE IF NOT EXISTS public.branding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    logo_url TEXT,
    logo_light_url TEXT,
    logo_dark_url TEXT,
    favicon_url TEXT,
    footer_logo_url TEXT,
    brand_symbol_text TEXT DEFAULT 'BONE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Branches
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    map_url TEXT,
    is_main BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand TEXT NOT NULL,
    sku TEXT,
    availability TEXT NOT NULL DEFAULT 'In Stock' CHECK (availability IN ('In Stock', 'Available on Order', 'Out of Stock')),
    featured BOOLEAN NOT NULL DEFAULT false,
    is_new BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    main_image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Product Specifications
CREATE TABLE IF NOT EXISTS public.product_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    spec_key TEXT NOT NULL,
    spec_value TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Hero Slides
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT,
    desktop_image TEXT NOT NULL,
    mobile_image TEXT,
    primary_button_text TEXT DEFAULT 'INQUIRE ON WHATSAPP',
    primary_button_url TEXT DEFAULT '/contact',
    secondary_button_text TEXT DEFAULT 'VIEW PRODUCTS',
    secondary_button_url TEXT DEFAULT '/products',
    overlay_opacity NUMERIC(3,2) NOT NULL DEFAULT 0.55,
    text_alignment TEXT NOT NULL DEFAULT 'left' CHECK (text_alignment IN ('left', 'center', 'right')),
    transition TEXT NOT NULL DEFAULT 'fade' CHECK (transition IN ('fade', 'slide', 'zoom', 'crossfade')),
    duration INT NOT NULL DEFAULT 5000,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL DEFAULT 'WELCOME TO BRIGHT OKEYSON NIGERIA ENTERPRISES',
    body TEXT NOT NULL DEFAULT 'Home of All Motorcycle Healing Center. We are dealers in all kinds of complete motorcycles & spare parts. Visit us @ NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE.',
    image_url TEXT,
    button_text TEXT NOT NULL DEFAULT 'Chat on WhatsApp',
    button_url TEXT NOT NULL DEFAULT 'https://wa.me/2348069382393',
    background_color TEXT DEFAULT '#171717',
    text_color TEXT DEFAULT '#ffffff',
    animation TEXT DEFAULT 'scale',
    delay INT NOT NULL DEFAULT 1500,
    display_frequency TEXT NOT NULL DEFAULT 'once_per_day' CHECK (display_frequency IN ('every_visit', 'once_per_session', 'once_per_day')),
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Landing Pages
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    hero_headline TEXT NOT NULL DEFAULT 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    hero_supporting_text TEXT NOT NULL DEFAULT 'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.',
    hero_image TEXT,
    primary_cta_text TEXT NOT NULL DEFAULT 'INQUIRE ON WHATSAPP',
    secondary_cta_text TEXT NOT NULL DEFAULT 'VIEW PRODUCTS',
    whatsapp_custom_message TEXT,
    seo_title TEXT,
    seo_description TEXT,
    social_image_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Landing Page Sections
CREATE TABLE IF NOT EXISTS public.landing_page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landing_page_id UUID NOT NULL REFERENCES public.landing_pages(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL CHECK (section_type IN ('brands', 'popular_products', 'why_choose_us', 'locations', 'whatsapp_cta', 'contact_info', 'custom_text')),
    title TEXT,
    subtitle TEXT,
    content JSONB,
    display_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Inquiries
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    location TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Processing', 'Completed', 'Cancelled')),
    source TEXT DEFAULT 'website',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Inquiry Items
CREATE TABLE IF NOT EXISTS public.inquiry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name_snapshot TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. Contact Submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. SEO & Analytics Settings
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    home_title TEXT NOT NULL DEFAULT 'Bright Okeyson Nigeria Enterprises | Complete Motorcycles & Genuine Spare Parts',
    home_description TEXT NOT NULL DEFAULT 'Home of All Motorcycle Healing Center. Authorized dealer in complete motorcycles (Bajaj, TVS, Keke, Haojue) and genuine spare parts across Ondo and Kogi State.',
    keywords TEXT DEFAULT 'motorcycles, spare parts, Bajaj, TVS, Keke, Haojue, Ondo State, Ikare Akoko, motorcycle healing center',
    social_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.analytics_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meta_pixel_id TEXT,
    google_analytics_id TEXT,
    google_ads_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 17. Theme Settings
CREATE TABLE IF NOT EXISTS public.theme_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_color TEXT NOT NULL DEFAULT '#dc2626',
    primary_hover TEXT NOT NULL DEFAULT '#b91c1c',
    secondary_color TEXT NOT NULL DEFAULT '#171717',
    accent_color TEXT NOT NULL DEFAULT '#ef4444',
    bg_color TEXT NOT NULL DEFAULT '#0a0a0a',
    text_color TEXT NOT NULL DEFAULT '#f5f5f5',
    border_radius TEXT NOT NULL DEFAULT '0.375rem',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 18. Navigation Items
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_footer BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiry_items_inquiry ON public.inquiry_items(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON public.landing_pages(slug);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin/editor
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'editor')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public READ policies
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can view product specifications" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Public can view active hero slides" ON public.hero_slides FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view branding" ON public.branding FOR SELECT USING (true);
CREATE POLICY "Public can view active branches" ON public.branches FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view active announcements" ON public.announcements FOR SELECT USING (is_enabled = true OR public.is_admin());
CREATE POLICY "Public can view published landing pages" ON public.landing_pages FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public can view landing page sections" ON public.landing_page_sections FOR SELECT USING (is_visible = true OR public.is_admin());
CREATE POLICY "Public can view navigation items" ON public.navigation_items FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public can view theme settings" ON public.theme_settings FOR SELECT USING (true);
CREATE POLICY "Public can view seo settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public can view analytics settings" ON public.analytics_settings FOR SELECT USING (true);

-- Public INSERT policies (inquiries & contact)
CREATE POLICY "Public can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create inquiry items" ON public.inquiry_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Admin FULL ACCESS policies
CREATE POLICY "Admins full access on profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on branding" ON public.branding FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on branches" ON public.branches FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on product_images" ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on product_specifications" ON public.product_specifications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on hero_slides" ON public.hero_slides FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on announcements" ON public.announcements FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on landing_pages" ON public.landing_pages FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on landing_page_sections" ON public.landing_page_sections FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on inquiries" ON public.inquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on inquiry_items" ON public.inquiry_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on contact_submissions" ON public.contact_submissions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on seo_settings" ON public.seo_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on analytics_settings" ON public.analytics_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on theme_settings" ON public.theme_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access on navigation_items" ON public.navigation_items FOR ALL USING (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS (Create in Supabase dashboard or via API)
-- ==============================================================================
-- buckets: 'logos', 'hero-images', 'product-images', 'category-images', 'landing-images', 'site-images'
