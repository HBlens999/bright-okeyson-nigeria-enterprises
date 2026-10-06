import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_BRANDING,
  INITIAL_BRANCHES,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_HERO_SLIDES,
  INITIAL_ANNOUNCEMENT,
  INITIAL_LANDING_PAGES,
  INITIAL_THEME,
  INITIAL_SEO,
  INITIAL_ANALYTICS,
  INITIAL_NAV_ITEMS
} from '../lib/seedData';
import {
  SiteSettings,
  BrandingSettings,
  Branch,
  Category,
  Product,
  HeroSlide,
  Announcement,
  LandingPage,
  ThemeSettings,
  SeoSettings,
  AnalyticsSettings,
  NavigationItem,
  Inquiry,
  InquiryStatus,
  ContactSubmission
} from '../types/database';

// Helper to validate UUIDs for foreign key compliance
const isValidUUID = (id?: string | null): boolean => {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

// Client-side fallback generator for image URLs when null in DB
export function getProductFallbackImage(name: string): string {
  if (name.toLowerCase().includes('motorcycle')) {
    return '/src/assets/images/product_motorcycle_commercial_1791203273201.jpg';
  }
  return '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg';
}

// ------------------------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Supabase getSiteSettings error:', error.message);
      } else if (data) {
        return data as SiteSettings;
      }
    } catch (e) {
      console.error('Supabase site_settings exception:', e);
    }
  }
  return INITIAL_SITE_SETTINGS;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated = { ...current, ...settings, updated_at: new Date().toISOString() };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('site_settings').upsert(updated);
      if (error) console.error('Supabase update site_settings error:', error.message);
    } catch (e) {
      console.error('Supabase update site_settings exception:', e);
    }
  }
  return updated;
}

// ------------------------------------------------------------------------------
// BRANDING
// ------------------------------------------------------------------------------
export async function getBranding(): Promise<BrandingSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('branding')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Supabase getBranding error:', error.message);
      } else if (data) {
        return data as BrandingSettings;
      }
    } catch (e) {
      console.error('Supabase branding exception:', e);
    }
  }
  return INITIAL_BRANDING;
}

export async function updateBranding(branding: Partial<BrandingSettings>): Promise<BrandingSettings> {
  const current = await getBranding();
  const id = isValidUUID(branding.id) ? branding.id : (isValidUUID(current.id) ? current.id : null);
  const updated = {
    ...current,
    ...branding,
    ...(id ? { id } : {}),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const payload = {
        id: updated.id,
        logo_url: updated.logo_url || null,
        logo_light_url: updated.logo_light_url || null,
        logo_dark_url: updated.logo_dark_url || null,
        favicon_url: updated.favicon_url || null,
        footer_logo_url: updated.footer_logo_url || null,
        brand_symbol_text: updated.brand_symbol_text || 'BONE',
        updated_at: updated.updated_at
      };

      const { data, error } = await supabase
        .from('branding')
        .upsert(payload, { onConflict: 'id' })
        .select('*')
        .single();

      if (error) {
        console.error('Supabase update branding error:', error);
        throw new Error(error.message);
      }

      if (!data) throw new Error('Supabase saved no branding record.');
      return data as BrandingSettings;
    } catch (e) {
      console.error('Supabase update branding exception:', e);
      throw e instanceof Error ? e : new Error('Unable to save branding settings.');
    }
  }

  return updated;
}

// ------------------------------------------------------------------------------
// BRANCHES
// ------------------------------------------------------------------------------
export async function getBranches(): Promise<Branch[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase getBranches error:', error.message);
      } else if (data) {
        return data as Branch[];
      }
    } catch (e) {
      console.error('Supabase branches exception:', e);
    }
  }
  return INITIAL_BRANCHES;
}

export async function saveBranch(branch: Partial<Branch> & { name: string; address: string }): Promise<Branch> {
  const branches = await getBranches();
  const branchId = branch.id || crypto.randomUUID();

  const updatedBranch: Branch = {
    id: branchId,
    name: branch.name,
    address: branch.address,
    phone: branch.phone || '',
    email: branch.email || '',
    map_url: branch.map_url || '',
    is_main: Boolean(branch.is_main),
    is_active: branch.is_active !== false,
    display_order: branch.display_order || branches.length + 1,
    created_at: branch.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('branches').upsert(updatedBranch);
      if (error) console.error('Supabase save branch error:', error.message);
    } catch (e) {
      console.error('Supabase save branch exception:', e);
    }
  }
  return updatedBranch;
}

export async function deleteBranch(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('branches').delete().eq('id', id);
      if (error) console.error('Supabase delete branch error:', error.message);
    } catch (e) {
      console.error('Supabase delete branch exception:', e);
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase getCategories error:', error.message);
      } else if (data) {
        return data as Category[];
      }
    } catch (e) {
      console.error('Supabase categories exception:', e);
    }
  }
  return INITIAL_CATEGORIES;
}

export async function saveCategory(category: Partial<Category> & { name: string; slug: string }): Promise<Category> {
  const categories = await getCategories();
  const catId = category.id || crypto.randomUUID();

  const updatedCategory: Category = {
    id: catId,
    name: category.name,
    slug: category.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: category.description || '',
    image_url: category.image_url || '',
    display_order: category.display_order || categories.length + 1,
    is_active: category.is_active !== false,
    created_at: category.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('categories').upsert(updatedCategory);
      if (error) console.error('Supabase save category error:', error.message);
    } catch (e) {
      console.error('Supabase save category exception:', e);
    }
  }
  return updatedCategory;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) console.error('Supabase delete category error:', error.message);
    } catch (e) {
      console.error('Supabase delete category exception:', e);
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// PRODUCTS
// ------------------------------------------------------------------------------
export interface ProductQueryOptions {
  categorySlug?: string;
  brand?: string;
  search?: string;
  featuredOnly?: boolean;
  activeOnly?: boolean;
  limit?: number;
  offset?: number;
}

export async function getProducts(options: ProductQueryOptions = {}): Promise<{ products: Product[]; total: number; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase
        .from('products')
        .select('*, category:categories(id, name, slug), specifications:product_specifications(*), images:product_images(*)', { count: 'exact' });

      if (options.activeOnly !== false) {
        query = query.eq('is_active', true);
      }
      if (options.featuredOnly) {
        query = query.eq('featured', true);
      }
      if (options.brand && options.brand !== 'ALL') {
        query = query.ilike('brand', options.brand.trim());
      }
      if (options.categorySlug && options.categorySlug !== 'all') {
        // Query category ID to filter cleanly
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', options.categorySlug)
          .maybeSingle();

        if (cat) {
          query = query.eq('category_id', cat.id);
        }
      }
      if (options.search) {
        const q = options.search.trim();
        query = query.or(`name.ilike.%${q}%,sku.ilike.%${q}%,brand.ilike.%${q}%,short_description.ilike.%${q}%`);
      }
      query = query.order('display_order', { ascending: true });

      if (options.limit) {
        const from = options.offset || 0;
        query = query.range(from, from + options.limit - 1);
      }

      const { data, count, error } = await query;
      if (error) {
        console.error('Supabase getProducts error:', error.message);
        return { products: [], total: 0, error: error.message };
      }

      if (data) {
        const mapped: Product[] = data.map((p: any) => ({
          ...p,
          category_name: p.category?.name || '',
          main_image_url: p.main_image_url || getProductFallbackImage(p.name),
          specifications: p.specifications || [],
          images: p.images || []
        }));
        return { products: mapped, total: count ?? mapped.length };
      }
    } catch (e: any) {
      console.error('Supabase getProducts exception:', e);
      return { products: [], total: 0, error: e.message || 'Database query failed' };
    }
  }

  // Local fallback if Supabase is unavailable
  let list = [...INITIAL_PRODUCTS];
  if (options.activeOnly !== false) list = list.filter(p => p.is_active);
  if (options.featuredOnly) list = list.filter(p => p.featured);
  if (options.brand && options.brand !== 'ALL') list = list.filter(p => p.brand.toLowerCase() === options.brand?.toLowerCase());
  if (options.categorySlug && options.categorySlug !== 'all') {
    const cat = INITIAL_CATEGORIES.find(c => c.slug === options.categorySlug);
    if (cat) list = list.filter(p => p.category_id === cat.id);
  }
  if (options.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)));
  }

  const total = list.length;
  if (options.limit) {
    const offset = options.offset || 0;
    list = list.slice(offset, offset + options.limit);
  }
  return { products: list, total };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(id, name, slug), specifications:product_specifications(*), images:product_images(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Supabase getProductBySlug error:', error.message);
      } else if (data) {
        return {
          ...data,
          category_name: data.category?.name || '',
          main_image_url: data.main_image_url || getProductFallbackImage(data.name),
          specifications: data.specifications || [],
          images: data.images || []
        } as Product;
      }
    } catch (e) {
      console.error('Supabase product slug exception:', e);
    }
  }

  return INITIAL_PRODUCTS.find(p => p.slug === slug) || null;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(id, name, slug), specifications:product_specifications(*)')
        .in('id', ids);

      if (error) {
        console.error('Supabase getProductsByIds error:', error.message);
      } else if (data) {
        return data.map((p: any) => ({
          ...p,
          category_name: p.category?.name || '',
          main_image_url: p.main_image_url || getProductFallbackImage(p.name),
          specifications: p.specifications || []
        }));
      }
    } catch (e) {
      console.error('Supabase getProductsByIds exception:', e);
    }
  }

  const idSet = new Set(ids);
  return INITIAL_PRODUCTS.filter(p => idSet.has(p.id));
}

export async function saveProduct(product: Partial<Product> & { name: string; brand: string }): Promise<Product> {
  const prodId = product.id || crypto.randomUUID();
  const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const dbProduct: any = {
    id: prodId,
    name: product.name,
    slug,
    brand: product.brand,
    short_description: product.short_description || '',
    description: product.description || '',
    category_id: isValidUUID(product.category_id) ? product.category_id : null,
    sku: product.sku || '',
    availability: product.availability || 'In Stock',
    featured: Boolean(product.featured),
    is_new: Boolean(product.is_new),
    display_order: product.display_order || 1,
    main_image_url: product.main_image_url || null,
    is_active: product.is_active !== false,
    updated_at: new Date().toISOString()
  };

  if (!product.id) {
    dbProduct.created_at = new Date().toISOString();
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('products').upsert(dbProduct);
      if (error) console.error('Supabase saveProduct error:', error.message);

      // Save specifications if provided
      if (product.specifications && product.specifications.length > 0) {
        await supabase.from('product_specifications').delete().eq('product_id', prodId);
        const specsToInsert = product.specifications.map((s, idx) => ({
          id: isValidUUID(s.id) ? s.id : crypto.randomUUID(),
          product_id: prodId,
          spec_key: s.spec_key,
          spec_value: s.spec_value,
          display_order: idx + 1
        }));
        await supabase.from('product_specifications').insert(specsToInsert);
      }
    } catch (e) {
      console.error('Supabase saveProduct exception:', e);
    }
  }

  return {
    ...dbProduct,
    main_image_url: dbProduct.main_image_url || getProductFallbackImage(product.name),
    specifications: product.specifications || []
  };
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.error('Supabase deleteProduct error:', error.message);
    } catch (e) {
      console.error('Supabase deleteProduct exception:', e);
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// HERO SLIDES
// ------------------------------------------------------------------------------
export async function getHeroSlides(activeOnly = true): Promise<HeroSlide[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('hero_slides').select('*').order('display_order', { ascending: true });
      if (activeOnly) query = query.eq('is_active', true);
      const { data, error } = await query;

      if (error) {
        console.error('Supabase getHeroSlides error:', error.message);
      } else if (data) {
        return data as HeroSlide[];
      }
    } catch (e) {
      console.error('Supabase hero_slides exception:', e);
    }
  }
  const slides = INITIAL_HERO_SLIDES;
  return activeOnly ? slides.filter(s => s.is_active) : slides;
}

export async function saveHeroSlide(slide: Partial<HeroSlide> & { title: string; desktop_image: string }): Promise<HeroSlide> {
  const slideId = slide.id || crypto.randomUUID();

  const savedSlide: HeroSlide = {
    id: slideId,
    title: slide.title,
    subtitle: slide.subtitle || '',
    badge: slide.badge || '',
    desktop_image: slide.desktop_image,
    mobile_image: slide.mobile_image || slide.desktop_image,
    primary_button_text: slide.primary_button_text || 'INQUIRE ON WHATSAPP',
    primary_button_url: slide.primary_button_url || 'https://wa.me/2348069382393',
    secondary_button_text: slide.secondary_button_text || 'VIEW PRODUCTS',
    secondary_button_url: slide.secondary_button_url || '/products',
    overlay_opacity: slide.overlay_opacity ?? 0.6,
    text_alignment: slide.text_alignment || 'left',
    transition: slide.transition || 'fade',
    duration: slide.duration || 5000,
    display_order: slide.display_order || 1,
    is_active: slide.is_active !== false,
    created_at: slide.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('hero_slides').upsert(savedSlide);
      if (error) console.error('Supabase saveHeroSlide error:', error.message);
    } catch (e) {
      console.error('Supabase saveHeroSlide exception:', e);
    }
  }
  return savedSlide;
}

export async function deleteHeroSlide(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('hero_slides').delete().eq('id', id);
      if (error) console.error('Supabase deleteHeroSlide error:', error.message);
    } catch (e) {
      console.error('Supabase deleteHeroSlide exception:', e);
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// ANNOUNCEMENTS
// ------------------------------------------------------------------------------
export async function getAnnouncement(): Promise<Announcement> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Supabase getAnnouncement error:', error.message);
      } else if (data) {
        return data as Announcement;
      }
    } catch (e) {
      console.error('Supabase announcement exception:', e);
    }
  }
  return INITIAL_ANNOUNCEMENT;
}

export async function updateAnnouncement(announcement: Partial<Announcement>): Promise<Announcement> {
  const current = await getAnnouncement();
  const updated = { ...current, ...announcement, updated_at: new Date().toISOString() };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('announcements').upsert(updated);
      if (error) console.error('Supabase update announcement error:', error.message);
    } catch (e) {
      console.error('Supabase update announcement exception:', e);
    }
  }
  return updated;
}

// ------------------------------------------------------------------------------
// LANDING PAGES
// ------------------------------------------------------------------------------
export async function getLandingPages(): Promise<LandingPage[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*, sections:landing_page_sections(*)')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase getLandingPages error:', error.message);
      } else if (data) {
        return data.map((p: any) => ({
          ...p,
          hero_image: p.hero_image || '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg'
        }));
      }
    } catch (e) {
      console.error('Supabase landing_pages exception:', e);
    }
  }
  return INITIAL_LANDING_PAGES;
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  const cleanSlug = slug.toLowerCase().trim();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*, sections:landing_page_sections(*)')
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (error) {
        console.error('Supabase getLandingPageBySlug error:', error.message);
      } else if (data) {
        return {
          ...data,
          hero_image: data.hero_image || '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg'
        };
      }
    } catch (e) {
      console.error('Supabase getLandingPageBySlug exception:', e);
    }
  }

  const pages = INITIAL_LANDING_PAGES;
  return pages.find(p => p.slug.toLowerCase() === cleanSlug) || null;
}

export async function saveLandingPage(page: Partial<LandingPage> & { slug: string; title: string; hero_headline: string }): Promise<LandingPage> {
  const pageId = page.id || crypto.randomUUID();

  const saved: LandingPage = {
    id: pageId,
    slug: page.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: page.title,
    subtitle: page.subtitle || '',
    hero_headline: page.hero_headline,
    hero_supporting_text: page.hero_supporting_text || '',
    hero_image: page.hero_image || '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
    primary_cta_text: page.primary_cta_text || 'INQUIRE ON WHATSAPP',
    secondary_cta_text: page.secondary_cta_text || 'VIEW PRODUCTS',
    whatsapp_custom_message: page.whatsapp_custom_message || '',
    seo_title: page.seo_title || page.title,
    seo_description: page.seo_description || page.hero_supporting_text,
    is_published: page.is_published !== false,
    created_at: page.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { sections, ...dbPage } = saved;
      const { error } = await supabase.from('landing_pages').upsert(dbPage);
      if (error) console.error('Supabase saveLandingPage error:', error.message);
    } catch (e) {
      console.error('Supabase saveLandingPage exception:', e);
    }
  }
  return saved;
}

export async function deleteLandingPage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('landing_pages').delete().eq('id', id);
      if (error) console.error('Supabase deleteLandingPage error:', error.message);
    } catch (e) {
      console.error('Supabase deleteLandingPage exception:', e);
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// INQUIRIES & ORDERS (WhatsApp Checkout & Lead Persistence)
// ------------------------------------------------------------------------------
export async function getInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*, items:inquiry_items(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase getInquiries error:', error.message);
      } else if (data) {
        return data as Inquiry[];
      }
    } catch (e) {
      console.error('Supabase inquiries exception:', e);
    }
  }
  return [];
}

export async function submitInquiry(inquiryData: {
  customer_name: string;
  phone: string;
  email?: string;
  location?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  items: Array<{ product_id?: string; product_name_snapshot: string; quantity: number }>;
}): Promise<Inquiry> {
  const inquiryId = crypto.randomUUID();

  const newInquiry: Inquiry = {
    id: inquiryId,
    customer_name: inquiryData.customer_name,
    phone: inquiryData.phone,
    email: inquiryData.email || '',
    location: inquiryData.location || '',
    message: inquiryData.message || '',
    status: 'New',
    source: inquiryData.source || 'website',
    utm_source: inquiryData.utm_source,
    utm_medium: inquiryData.utm_medium,
    utm_campaign: inquiryData.utm_campaign,
    created_at: new Date().toISOString(),
    items: inquiryData.items.map((itm) => ({
      id: crypto.randomUUID(),
      product_id: itm.product_id,
      product_name_snapshot: itm.product_name_snapshot,
      quantity: itm.quantity
    }))
  };

  if (isSupabaseConfigured && supabase) {
    try {
      // Direct insert into inquiries without .select() so public RLS INSERT policy passes smoothly
      const dbInquiry = {
        id: inquiryId,
        customer_name: inquiryData.customer_name,
        phone: inquiryData.phone,
        email: inquiryData.email || null,
        location: inquiryData.location || null,
        message: inquiryData.message || null,
        status: 'New',
        source: inquiryData.source || 'website',
        utm_source: inquiryData.utm_source || null,
        utm_medium: inquiryData.utm_medium || null,
        utm_campaign: inquiryData.utm_campaign || null
      };

      const { error: inqError } = await supabase.from('inquiries').insert(dbInquiry);
      if (inqError) {
        console.error('Supabase submitInquiry error:', inqError.message);
      }

      if (inquiryData.items && inquiryData.items.length > 0) {
        const dbItems = inquiryData.items.map((it) => ({
          id: crypto.randomUUID(),
          inquiry_id: inquiryId,
          product_id: isValidUUID(it.product_id) ? it.product_id : null,
          product_name_snapshot: it.product_name_snapshot,
          quantity: it.quantity
        }));

        const { error: itemError } = await supabase.from('inquiry_items').insert(dbItems);
        if (itemError) {
          console.error('Supabase submitInquiry items error:', itemError.message);
        }
      }
    } catch (e) {
      console.error('Supabase submitInquiry exception:', e);
    }
  }

  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Supabase updateInquiryStatus error:', error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Supabase updateInquiryStatus exception:', e);
      return false;
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// CONTACT SUBMISSIONS
// ------------------------------------------------------------------------------
export async function submitContact(data: { name: string; phone: string; email?: string; message: string }): Promise<boolean> {
  const contactId = crypto.randomUUID();

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        id: contactId,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message
      });

      if (error) {
        console.error('Supabase submitContact error:', error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Supabase submitContact exception:', e);
      return false;
    }
  }
  return true;
}

// ------------------------------------------------------------------------------
// THEME, SEO, ANALYTICS, NAVIGATION
// ------------------------------------------------------------------------------
const THEME_CACHE_KEY = 'bright-okeyson-theme-settings';

export async function getThemeSettings(): Promise<ThemeSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        const theme = data as ThemeSettings;
        try { localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(theme)); } catch {}
        return theme;
      }

      if (error) console.error('Supabase getThemeSettings error:', error.message);
    } catch (e) {
      console.error('Supabase theme exception:', e);
    }
  }

  try {
    const cached = localStorage.getItem(THEME_CACHE_KEY);
    if (cached) return JSON.parse(cached) as ThemeSettings;
  } catch {}

  return INITIAL_THEME;
}

export async function updateThemeSettings(theme: Partial<ThemeSettings>): Promise<ThemeSettings> {
  const current = await getThemeSettings();

  if (isSupabaseConfigured && supabase) {
    try {
      const currentId = isValidUUID(current.id) ? current.id : null;
      const payload: Partial<ThemeSettings> = {
        ...theme,
        updated_at: new Date().toISOString()
      };

      if (currentId) {
        const { data, error } = await supabase
          .from('theme_settings')
          .update(payload)
          .eq('id', currentId)
          .select('*')
          .maybeSingle();

        if (error) throw new Error(error.message);
        if (data) {
          const savedTheme = data as ThemeSettings;
          try { localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(savedTheme)); } catch {}
          return savedTheme;
        }
      } else {
        const { data, error } = await supabase
          .from('theme_settings')
          .insert(payload)
          .select('*')
          .single();

        if (error) throw new Error(error.message);
        if (data) {
          const savedTheme = data as ThemeSettings;
          try { localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(savedTheme)); } catch {}
          return savedTheme;
        }
      }
    } catch (e) {
      console.error('Supabase theme save exception:', e);
      throw e;
    }
  }

  return { ...current, ...theme, updated_at: new Date().toISOString() };
}

export async function getSeoSettings(): Promise<SeoSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('seo_settings').select('*').limit(1).maybeSingle();
      if (!error && data) return data as SeoSettings;
    } catch (e) {
      console.error('Supabase seo exception:', e);
    }
  }
  return INITIAL_SEO;
}

export async function updateSeoSettings(seo: Partial<SeoSettings>): Promise<SeoSettings> {
  const current = await getSeoSettings();
  const updated = { ...current, ...seo };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('seo_settings').upsert(updated);
      if (error) console.error('Supabase update seo error:', error.message);
    } catch (e) {
      console.error('Supabase update seo exception:', e);
    }
  }
  return updated;
}

export async function getAnalyticsSettings(): Promise<AnalyticsSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('analytics_settings').select('*').limit(1).maybeSingle();
      if (!error && data) return data as AnalyticsSettings;
    } catch (e) {
      console.error('Supabase analytics exception:', e);
    }
  }
  return INITIAL_ANALYTICS;
}

export async function updateAnalyticsSettings(analytics: Partial<AnalyticsSettings>): Promise<AnalyticsSettings> {
  const current = await getAnalyticsSettings();
  const updated = { ...current, ...analytics };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('analytics_settings').upsert(updated);
      if (error) console.error('Supabase update analytics error:', error.message);
    } catch (e) {
      console.error('Supabase update analytics exception:', e);
    }
  }
  return updated;
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) return data as NavigationItem[];
    } catch (e) {
      console.error('Supabase navigation exception:', e);
    }
  }
  return INITIAL_NAV_ITEMS;
}

export async function saveNavigationItems(items: NavigationItem[]): Promise<NavigationItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('navigation_items').upsert(items);
      if (error) console.error('Supabase saveNavigationItems error:', error.message);
    } catch (e) {
      console.error('Supabase saveNavigationItems exception:', e);
    }
  }
  return items;
}

// ------------------------------------------------------------------------------
// FILE UPLOAD (Supabase Storage)
// ------------------------------------------------------------------------------
export async function uploadFile(file: File, bucket = 'product-images'): Promise<string> {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file.');
  }

  // Keep browser uploads lightweight and prevent accidental huge base64 payloads.
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Image is too large. Please use an image smaller than 10MB.');
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase Storage is not configured.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : 'jpg';
  const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${safeExt}`;

  try {
    const { data, error } = await supabase.storage.from(bucket).upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });

    if (error || !data?.path) {
      throw new Error(error?.message || `Upload to "${bucket}" failed.`);
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    if (!publicUrlData?.publicUrl) {
      throw new Error('Upload succeeded but Supabase did not return a public URL.');
    }

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Supabase storage upload failed [${bucket}]:`, error);
    throw error instanceof Error ? error : new Error('Image upload failed.');
  }
}

// ------------------------------------------------------------------------------
// DASHBOARD REAL-TIME METRICS
// ------------------------------------------------------------------------------
export async function getDashboardStats(): Promise<{
  totalProducts: number;
  activeProducts: number;
  featuredProducts: number;
  totalCategories: number;
  totalInquiries: number;
  newInquiries: number;
  processingInquiries: number;
  completedInquiries: number;
  landingPages: number;
  heroSlides: number;
  branches: number;
}> {
  if (isSupabaseConfigured && supabase) {
    try {
      const [
        totalProdRes,
        activeProdRes,
        featProdRes,
        catRes,
        inqRes,
        newInqRes,
        procInqRes,
        compInqRes,
        lpRes,
        heroRes,
        branchRes
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'Processing'),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'Completed'),
        supabase.from('landing_pages').select('*', { count: 'exact', head: true }),
        supabase.from('hero_slides').select('*', { count: 'exact', head: true }),
        supabase.from('branches').select('*', { count: 'exact', head: true })
      ]);

      return {
        totalProducts: totalProdRes.count ?? 0,
        activeProducts: activeProdRes.count ?? 0,
        featuredProducts: featProdRes.count ?? 0,
        totalCategories: catRes.count ?? 0,
        totalInquiries: inqRes.count ?? 0,
        newInquiries: newInqRes.count ?? 0,
        processingInquiries: procInqRes.count ?? 0,
        completedInquiries: compInqRes.count ?? 0,
        landingPages: lpRes.count ?? 0,
        heroSlides: heroRes.count ?? 0,
        branches: branchRes.count ?? 0
      };
    } catch (e) {
      console.error('[Supabase getDashboardStats Exception]', e);
    }
  }

  // Local fallback if Supabase is offline
  return {
    totalProducts: INITIAL_PRODUCTS.length,
    activeProducts: INITIAL_PRODUCTS.filter((p) => p.is_active).length,
    featuredProducts: INITIAL_PRODUCTS.filter((p) => p.featured).length,
    totalCategories: INITIAL_CATEGORIES.length,
    totalInquiries: 0,
    newInquiries: 0,
    processingInquiries: 0,
    completedInquiries: 0,
    landingPages: INITIAL_LANDING_PAGES.length,
    heroSlides: INITIAL_HERO_SLIDES.length,
    branches: INITIAL_BRANCHES.length
  };
}

