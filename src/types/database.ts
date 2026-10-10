export type UserRole = 'admin' | 'editor';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  tagline: string;
  description: string;
  registration_number: string;
  main_office: string;
  email: string;
  phone_numbers: string[];
  primary_whatsapp: string;
  whatsapp_tooltip: string;
  whatsapp_position: 'bottom-right' | 'bottom-left';
  whatsapp_pulse: boolean;
  whatsapp_enabled: boolean;
  whatsapp_template: string;
  manager_name: string;
  manager_title: string;
  manager_bio: string;
  manager_image_url: string;
  promo_video_url: string;
  promo_video_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BrandingSettings {
  id: string;
  logo_url?: string;
  logo_light_url?: string;
  logo_dark_url?: string;
  favicon_url?: string;
  footer_logo_url?: string;
  brand_symbol_text: string;
  created_at?: string;
  updated_at?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  map_url?: string;
  is_main: boolean;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductSpecification {
  id: string;
  product_id?: string;
  spec_key: string;
  spec_value: string;
  display_order?: number;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  image_url: string;
  alt_text?: string;
  display_order?: number;
}

export type ProductAvailability = 'In Stock' | 'Available on Order' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  category_id?: string;
  category_name?: string;
  brand: string;
  sku?: string;
  availability: ProductAvailability;
  featured: boolean;
  is_new: boolean;
  display_order: number;
  main_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  is_active: boolean;
  specifications?: ProductSpecification[];
  images?: ProductImage[];
  created_at?: string;
  updated_at?: string;
}

export type HeroTransition = 'fade' | 'slide' | 'zoom' | 'crossfade';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  desktop_image: string;
  mobile_image?: string;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text?: string;
  secondary_button_url?: string;
  overlay_opacity: number;
  text_alignment: 'left' | 'center' | 'right';
  transition: HeroTransition;
  duration: number;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type AnnouncementFrequency = 'every_visit' | 'once_per_session' | 'once_per_day';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  image_url?: string;
  button_text: string;
  button_url: string;
  background_color: string;
  text_color: string;
  animation: string;
  delay: number;
  display_frequency: AnnouncementFrequency;
  is_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LandingPageSection {
  id: string;
  landing_page_id?: string;
  section_type: 'brands' | 'popular_products' | 'why_choose_us' | 'locations' | 'whatsapp_cta' | 'contact_info' | 'custom_text';
  title?: string;
  subtitle?: string;
  content?: Record<string, any>;
  display_order: number;
  is_visible: boolean;
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  hero_headline: string;
  hero_supporting_text: string;
  hero_image?: string;
  primary_cta_text: string;
  secondary_cta_text: string;
  whatsapp_custom_message?: string;
  seo_title?: string;
  seo_description?: string;
  social_image_url?: string;
  is_published: boolean;
  sections?: LandingPageSection[];
  created_at?: string;
  updated_at?: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Processing' | 'Completed' | 'Cancelled';

export interface InquiryItem {
  id: string;
  inquiry_id?: string;
  product_id?: string;
  product_name_snapshot: string;
  quantity: number;
}

export interface Inquiry {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  location?: string;
  message?: string;
  status: InquiryStatus;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  items?: InquiryItem[];
  created_at: string;
  updated_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ThemeSettings {
  id: string;
  primary_color: string;
  primary_hover: string;
  secondary_color: string;
  accent_color: string;
  bg_color: string;
  text_color: string;
  border_radius: string;
}

export interface SeoSettings {
  id: string;
  home_title: string;
  home_description: string;
  keywords: string;
  social_image_url?: string;
}

export interface AnalyticsSettings {
  id: string;
  meta_pixel_id?: string;
  google_analytics_id?: string;
  google_ads_id?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  display_order: number;
  is_active: boolean;
  is_footer?: boolean;
}

export interface CartItemReference {
  productId: string;
  quantity: number;
}
