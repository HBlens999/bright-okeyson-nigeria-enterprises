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
  Inquiry
} from '../types/database';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  id: 'a0000000-0000-0000-0000-000000000001',
  business_name: 'BRIGHT OKEYSON NIGERIA ENTERPRISES',
  tagline: 'Home of All Motorcycle Healing Center',
  description: 'We are dealers in all kinds of complete motorcycles & spare parts.',
  registration_number: 'BN 3234989',
  main_office: 'NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE',
  email: 'brightokeson3@gmail.com',
  phone_numbers: ['08069382393', '07042938148', '09033338829', '09119442829'],
  primary_whatsapp: '08069382393',
  whatsapp_tooltip: 'Need help? Chat with us on WhatsApp',
  whatsapp_position: 'bottom-right',
  whatsapp_pulse: true,
  whatsapp_enabled: true,
  whatsapp_template: `Hello Bright Okeyson Nigeria Enterprises,\n\nI would like to inquire about the following products:\n\n{ITEMS}\n\nPlease provide current prices and availability.\n\nName: {NAME}\nPhone: {PHONE}\nLocation: {LOCATION}\n\nThank you.`,
  manager_name: '',
  manager_title: '',
  manager_bio: '',
  manager_image_url: '',
  promo_video_url: '',
  promo_video_enabled: false
};

export const INITIAL_BRANDING: BrandingSettings = {
  id: 'b0000000-0000-0000-0000-000000000001',
  brand_symbol_text: 'BONE',
  logo_url: '',
  logo_light_url: '',
  logo_dark_url: '',
  favicon_url: '',
  footer_logo_url: ''
};

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    name: 'Main Office - Bethel Plaza',
    address: 'NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE',
    phone: '08069382393',
    email: 'brightokeson3@gmail.com',
    is_main: true,
    is_active: true,
    display_order: 1
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    name: 'Branch Office 1 - Ilepa Street',
    address: '1: L/128 Ilepa Street, Ikare Akoko, Ondo State',
    phone: '07042938148',
    email: 'brightokeson3@gmail.com',
    is_main: false,
    is_active: true,
    display_order: 2
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    name: 'Branch Office 2 - Kabba Hub',
    address: 'NO. 89, Obaro Way, Kabba, Kogi State',
    phone: '09033338829',
    email: 'brightokeson3@gmail.com',
    is_main: false,
    is_active: true,
    display_order: 3
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'd0000000-0000-0000-0000-000000000001',
    name: 'Complete Motorcycles',
    slug: 'complete-motorcycles',
    description: 'Brand new complete commercial and commuter motorcycles and tricycles.',
    display_order: 1,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000002',
    name: 'Spare Parts',
    slug: 'spare-parts',
    description: 'Genuine mechanical and electrical replacement parts for all motorcycle brands.',
    display_order: 2,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000003',
    name: 'Engine Parts',
    slug: 'engine-parts',
    description: 'Pistons, crankshafts, bearings, cylinder heads, valves and engine rebuild kits.',
    display_order: 3,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000004',
    name: 'Lubricants/Oils',
    slug: 'lubricants-oils',
    description: 'High performance 4-stroke engine oils and multi-grade lubricants.',
    display_order: 4,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000005',
    name: 'Motorcycle Accessories',
    slug: 'motorcycle-accessories',
    description: 'Chain covers, guards, mirrors, absorbers, and rider protective gears.',
    display_order: 5,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000006',
    name: 'Tyres',
    slug: 'tyres',
    description: 'Heavy-duty commercial front and rear motorcycle tyres and inner tubes.',
    display_order: 6,
    is_active: true
  },
  {
    id: 'd0000000-0000-0000-0000-000000000007',
    name: 'Other Parts',
    slug: 'other-parts',
    description: 'Fasteners, gums, gaskets, cables, and general hardware.',
    display_order: 7,
    is_active: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'e0000000-0000-0000-0000-000000000001',
    name: 'Front Absorber F/C',
    slug: 'front-absorber-fc',
    short_description: 'Heavy-duty front shock absorber assembly engineered for rugged Nigerian road conditions.',
    description: 'Original equipment specification front shock absorber designed for heavy load carrying and high shock dampening on uneven road surfaces. Built with anti-leak hydraulic seals and hardened chrome piston rods.',
    category_id: 'd0000000-0000-0000-0000-000000000002',
    category_name: 'Spare Parts',
    brand: 'BAJAJ',
    sku: 'BONE-ABS-01',
    availability: 'In Stock',
    featured: true,
    is_new: true,
    display_order: 1,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's1', spec_key: 'Compatibility', spec_value: 'Bajaj Boxer, TVS, Haojue & compatible commercial models' },
      { id: 's2', spec_key: 'Material', spec_value: 'Hardened Chrome Alloy & High-Grade Steel' },
      { id: 's3', spec_key: 'Placement', spec_value: 'Front Fork Assembly (Left & Right Pair)' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000002',
    name: 'Gum',
    slug: 'gum',
    short_description: 'Industrial high-temperature engine sealant and adhesive for motorcycle repairs.',
    description: 'Professional automotive grade gasket maker and sealant gum resistant to engine oil, heat, and vibration.',
    category_id: 'd0000000-0000-0000-0000-000000000007',
    category_name: 'Other Parts',
    brand: 'BESTY',
    sku: 'BONE-GUM-02',
    availability: 'In Stock',
    featured: false,
    is_new: false,
    display_order: 2,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's4', spec_key: 'Type', spec_value: 'RTV High-Temp Gasket Sealant' },
      { id: 's5', spec_key: 'Application', spec_value: 'Crankcase, Cylinder Head & Side Cover Joint Gasket' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000003',
    name: 'Oil - 1L',
    slug: 'oil-1l',
    short_description: 'Premium 4T motorcycle engine oil in 1 Litre container for routine engine servicing.',
    description: 'High-grade thermal stable 4-stroke engine oil providing smooth clutch operation, engine cleanliness, and wear protection.',
    category_id: 'd0000000-0000-0000-0000-000000000004',
    category_name: 'Lubricants/Oils',
    brand: 'JIENG',
    sku: 'BONE-OIL-1L',
    availability: 'In Stock',
    featured: true,
    is_new: false,
    display_order: 3,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's6', spec_key: 'Viscosity Grade', spec_value: '20W-50 4T Motorcycle Engine Oil' },
      { id: 's7', spec_key: 'Capacity', spec_value: '1.0 Litre Sealed Bottle' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000004',
    name: 'Oil - 4L',
    slug: 'oil-4l',
    short_description: 'Workshop 4 Litre high endurance motorcycle engine lubricant.',
    description: 'Economical 4L container ideal for commercial fleet operators and motorcycle mechanics.',
    category_id: 'd0000000-0000-0000-0000-000000000004',
    category_name: 'Lubricants/Oils',
    brand: 'SHIRORO',
    sku: 'BONE-OIL-4L',
    availability: 'In Stock',
    featured: false,
    is_new: false,
    display_order: 4,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's8', spec_key: 'Viscosity Grade', spec_value: '20W-50 Multi-grade' },
      { id: 's9', spec_key: 'Capacity', spec_value: '4.0 Litres Jug' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000005',
    name: 'Oil - 5L',
    slug: 'oil-5l',
    short_description: 'Heavy-duty 5 Litre motorcycle engine oil for commercial workshops.',
    description: 'Formulated to resist thermal breakdown in tropical climates and heavy commercial stop-and-go usage.',
    category_id: 'd0000000-0000-0000-0000-000000000004',
    category_name: 'Lubricants/Oils',
    brand: 'JEELY',
    sku: 'BONE-OIL-5L',
    availability: 'In Stock',
    featured: false,
    is_new: false,
    display_order: 5,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's10', spec_key: 'Viscosity Grade', spec_value: '20W-50 Extreme Pressure' },
      { id: 's11', spec_key: 'Capacity', spec_value: '5.0 Litres Container' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000006',
    name: 'Oil - 25L',
    slug: 'oil-25l',
    short_description: 'Commercial bulk 25 Litre drum for repair centers, distributors, and fleet hubs.',
    description: 'Bulk workshop supply ensuring highest cost efficiency for active commercial workshops and fleet centers.',
    category_id: 'd0000000-0000-0000-0000-000000000004',
    category_name: 'Lubricants/Oils',
    brand: 'TVS',
    sku: 'BONE-OIL-25L',
    availability: 'In Stock',
    featured: true,
    is_new: false,
    display_order: 6,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's12', spec_key: 'Capacity', spec_value: '25 Litre Workshop Drum' },
      { id: 's13', spec_key: 'Grade', spec_value: 'Heavy Duty 4T Fleet Lubricant' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000007',
    name: 'Clutch Plate',
    slug: 'clutch-plate',
    short_description: 'Original friction clutch plate set for maximum torque transfer and zero slippage.',
    description: 'Engineered with high-friction organic composites and heat-tempered steel backing for commercial haulers.',
    category_id: 'd0000000-0000-0000-0000-000000000003',
    category_name: 'Engine Parts',
    brand: 'BAJAJ',
    sku: 'BONE-CLU-07',
    availability: 'In Stock',
    featured: true,
    is_new: false,
    display_order: 7,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's14', spec_key: 'Compatibility', spec_value: 'Bajaj Boxer BM100 / BM150 / Platina / TVS HLX' },
      { id: 's15', spec_key: 'Set Pieces', spec_value: 'Full Friction Plate Set' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000008',
    name: 'Bearing',
    slug: 'bearing',
    short_description: 'High-speed precision wheel and crankshaft roller bearings.',
    description: 'Hardened steel deep-groove ball bearings built for prolonged rotation under heavy road payloads.',
    category_id: 'd0000000-0000-0000-0000-000000000003',
    category_name: 'Engine Parts',
    brand: 'HAOJUE',
    sku: 'BONE-BRG-08',
    availability: 'In Stock',
    featured: false,
    is_new: false,
    display_order: 8,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's16', spec_key: 'Bearing Types', spec_value: '6301, 6302, 6204 & Standard Wheel/Engine Hub Sizes' },
      { id: 's17', spec_key: 'Seal Type', spec_value: 'Rubber Dual Sealed / Metal Shielded' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000009',
    name: 'Crankshaft',
    slug: 'crankshaft',
    short_description: 'Forged alloy crankshaft assembly for 100cc-150cc engines.',
    description: 'Precision-balanced genuine engine crankshaft ensuring minimal engine vibration and longevity.',
    category_id: 'd0000000-0000-0000-0000-000000000003',
    category_name: 'Engine Parts',
    brand: 'BAJAJ',
    sku: 'BONE-CRK-09',
    availability: 'In Stock',
    featured: true,
    is_new: true,
    display_order: 9,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's18', spec_key: 'Material', spec_value: 'High Tensile Forged Chrome-Moly Alloy' },
      { id: 's19', spec_key: 'Connecting Rod', spec_value: 'Factory Assembled with Needle Roller Bearing' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000010',
    name: 'Complete Motorcycles',
    slug: 'complete-motorcycles',
    short_description: 'Brand new complete commercial motorcycles ready for immediate deployment.',
    description: 'Direct from official distributors. Fuel efficient, sturdy chassis, robust suspension, and trusted across Nigeria.',
    category_id: 'd0000000-0000-0000-0000-000000000001',
    category_name: 'Complete Motorcycles',
    brand: 'BAJAJ',
    sku: 'BONE-MTR-10',
    availability: 'In Stock',
    featured: true,
    is_new: true,
    display_order: 10,
    main_image_url: '/src/assets/images/product_motorcycle_commercial_1791203273201.jpg',
    is_active: true,
    specifications: [
      { id: 's20', spec_key: 'Engine Type', spec_value: '4-Stroke, Single Cylinder Air-Cooled' },
      { id: 's21', spec_key: 'Starting System', spec_value: 'Kick & Electric Starter' },
      { id: 's22', spec_key: 'Fuel Economy', spec_value: 'Commercial High Mileage Tuning' },
      { id: 's23', spec_key: 'Documentation', spec_value: 'Full Dealership Delivery & Proof of Ownership' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000011',
    name: 'Tyres',
    slug: 'tyres',
    short_description: 'Reinforced deep-tread commercial motorcycle tyres (Front & Rear sizes).',
    description: 'Thick puncture-resistant casing designed for rocky, unpaved, and highway riding with superior grip.',
    category_id: 'd0000000-0000-0000-0000-000000000006',
    category_name: 'Tyres',
    brand: 'BESTY',
    sku: 'BONE-TYR-11',
    availability: 'In Stock',
    featured: true,
    is_new: false,
    display_order: 11,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's24', spec_key: 'Tire Sizes', spec_value: '2.75-17 / 3.00-17 / 3.00-18 / Commercial Ply' },
      { id: 's25', spec_key: 'Ply Rating', spec_value: '6PR Heavy Load Rating' }
    ]
  },
  {
    id: 'e0000000-0000-0000-0000-000000000012',
    name: 'Chain Cover Bajaj Follow',
    slug: 'chain-cover-bajaj-follow',
    short_description: 'Protective metal chain case cover engineered specifically for Bajaj motorcycle models.',
    description: 'Shields the drive chain and sprocket from road dust, grit, and mud to extend chain transmission life.',
    category_id: 'd0000000-0000-0000-0000-000000000005',
    category_name: 'Motorcycle Accessories',
    brand: 'BAJAJ',
    sku: 'BONE-CHN-12',
    availability: 'In Stock',
    featured: true,
    is_new: false,
    display_order: 12,
    main_image_url: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    is_active: true,
    specifications: [
      { id: 's26', spec_key: 'Model Fit', spec_value: 'Bajaj Boxer BM100 / BM150 Original Specification' },
      { id: 's27', spec_key: 'Material Finish', spec_value: 'Corrosion-Resistant Black Powder-Coated Pressed Steel' }
    ]
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: '70000000-0000-0000-0000-000000000001',
    title: 'HOME OF ALL MOTORCYCLE HEALING CENTER',
    subtitle: 'Authorized distributors of complete motorcycles & 100% genuine spare parts across Ondo State and Kogi State.',
    badge: 'OFFICIAL DISTRIBUTOR & HEALING CENTER',
    desktop_image: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
    primary_button_text: 'INQUIRE ON WHATSAPP',
    primary_button_url: 'https://wa.me/2348069382393',
    secondary_button_text: 'VIEW PRODUCT CATALOGUE',
    secondary_button_url: '/products',
    overlay_opacity: 0,
    text_alignment: 'left',
    transition: 'slide',
    duration: 6000,
    display_order: 1,
    is_active: true
  },
  {
    id: '70000000-0000-0000-0000-000000000002',
    title: 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    subtitle: 'Official dealer in Bajaj, TVS, Keke, Haojue, Jeely, Shiroro, Besty, and Jieng.',
    badge: 'COMMERCIAL MOTORCYCLE HUB',
    desktop_image: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    primary_button_text: 'ORDER VIA WHATSAPP',
    primary_button_url: 'https://wa.me/2348069382393',
    secondary_button_text: 'VISIT OUR BRANCHES',
    secondary_button_url: '/contact',
    overlay_opacity: 0,
    text_alignment: 'left',
    transition: 'slide',
    duration: 6000,
    display_order: 2,
    is_active: true
  }
];

export const INITIAL_ANNOUNCEMENT: Announcement = {
  id: '80000000-0000-0000-0000-000000000001',
  title: 'WELCOME TO BRIGHT OKEYSON NIGERIA ENTERPRISES',
  body: 'Home of All Motorcycle Healing Center. We are dealers in all kinds of complete motorcycles & spare parts. Visit us @ NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE.',
  button_text: 'Chat on WhatsApp',
  button_url: 'https://wa.me/2348069382393',
  background_color: '#053F5C',
  text_color: '#ffffff',
  animation: 'scale',
  delay: 1500,
  display_frequency: 'once_per_day',
  is_enabled: true
};

export const INITIAL_LANDING_PAGES: LandingPage[] = [
  {
    id: '90000000-0000-0000-0000-000000000001',
    slug: 'default',
    title: 'Complete Motorcycles & Genuine Spare Parts Campaign',
    subtitle: 'Direct Dealership Supply in Ondo & Kogi State',
    hero_headline: 'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    hero_supporting_text: 'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.',
    hero_image: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
    primary_cta_text: 'INQUIRE ON WHATSAPP',
    secondary_cta_text: 'VIEW PRODUCTS',
    whatsapp_custom_message: 'Hello Bright Okeyson Nigeria Enterprises, I am interested in purchasing motorcycles / spare parts from your campaign. Please send me current availability and prices.',
    seo_title: 'Complete Motorcycles & Genuine Spare Parts | Bright Okeyson Nigeria',
    seo_description: 'Direct dealership supply of complete motorcycles and spare parts for Bajaj, TVS, Keke, Haojue in Nigeria.',
    is_published: true,
    sections: [
      { id: 'sec1', section_type: 'brands', title: 'BRANDS WE DEAL IN', display_order: 1, is_visible: true },
      { id: 'sec2', section_type: 'popular_products', title: 'POPULAR PRODUCTS', display_order: 2, is_visible: true },
      { id: 'sec3', section_type: 'why_choose_us', title: 'WHY CHOOSE BRIGHT OKEYSON', display_order: 3, is_visible: true },
      { id: 'sec4', section_type: 'locations', title: 'VISIT OUR LOCATIONS', display_order: 4, is_visible: true },
      { id: 'sec5', section_type: 'whatsapp_cta', title: 'DIRECT WHATSAPP INQUIRY', display_order: 5, is_visible: true },
      { id: 'sec6', section_type: 'contact_info', title: 'CONTACT INFORMATION', display_order: 6, is_visible: true }
    ]
  },
  {
    id: '90000000-0000-0000-0000-000000000002',
    slug: 'bajaj',
    title: 'Bajaj Boxer Motorcycles & Genuine Parts',
    subtitle: 'Commercial Fleet & Retail Supply',
    hero_headline: 'BAJAJ MOTORCYCLES & GENUINE BOXER PARTS',
    hero_supporting_text: 'Direct distribution of Bajaj Boxer BM100, BM150, front absorbers, clutch plates, chain covers, and engine assemblies.',
    hero_image: '/src/assets/images/product_motorcycle_commercial_1791203273201.jpg',
    primary_cta_text: 'INQUIRE ON WHATSAPP',
    secondary_cta_text: 'VIEW PRODUCTS',
    whatsapp_custom_message: 'Hello Bright Okeyson Nigeria Enterprises, I would like to inquire about Bajaj motorcycles and genuine Boxer spare parts.',
    seo_title: 'Bajaj Boxer Motorcycles & Genuine Parts | Bright Okeyson Nigeria',
    seo_description: 'Official Bajaj motorcycles and genuine spare parts dealer in Ikare Akoko, Ondo and Kabba, Kogi State.',
    is_published: true,
    sections: [
      { id: 'sec7', section_type: 'popular_products', title: 'BAJAJ GENUINE PARTS & UNITS', display_order: 1, is_visible: true },
      { id: 'sec8', section_type: 'why_choose_us', title: 'WHY CHOOSE OUR HEALING CENTER', display_order: 2, is_visible: true },
      { id: 'sec9', section_type: 'locations', title: 'OUR DEALERSHIP BRANCHES', display_order: 3, is_visible: true },
      { id: 'sec10', section_type: 'whatsapp_cta', title: 'ORDER BAJAJ UNITS TODAY', display_order: 4, is_visible: true }
    ]
  },
  {
    id: '90000000-0000-0000-0000-000000000003',
    slug: 'spare-parts',
    title: 'Genuine Motorcycle Spare Parts Wholesale & Retail',
    subtitle: 'Absorbers, Clutch Plates, Crankshafts & Engine Oils',
    hero_headline: '100% GENUINE MOTORCYCLE SPARE PARTS',
    hero_supporting_text: 'Keep your motorcycle on the road with factory-spec absorbers, crankshafts, clutch plates, and multi-grade engine oils.',
    hero_image: '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    primary_cta_text: 'INQUIRE ON WHATSAPP',
    secondary_cta_text: 'VIEW PRODUCTS',
    whatsapp_custom_message: 'Hello Bright Okeyson Nigeria Enterprises, I need to place a spare parts inquiry / order. Please send current price list.',
    seo_title: 'Genuine Motorcycle Spare Parts in Ondo & Kogi | Bright Okeyson',
    seo_description: 'Fast wholesale and retail supply of genuine motorcycle spare parts for Bajaj, TVS, Keke, Haojue in Nigeria.',
    is_published: true,
    sections: [
      { id: 'sec11', section_type: 'brands', title: 'BRANDS WE STOCK', display_order: 1, is_visible: true },
      { id: 'sec12', section_type: 'popular_products', title: 'TOP DEMAND REPAIR PARTS', display_order: 2, is_visible: true },
      { id: 'sec13', section_type: 'locations', title: 'PICK UP AT OUR DEALERSHIP', display_order: 3, is_visible: true },
      { id: 'sec14', section_type: 'whatsapp_cta', title: 'MESSAGE OUR PARTS DESK', display_order: 4, is_visible: true }
    ]
  }
];

export const INITIAL_THEME: ThemeSettings = {
  id: '5f8f2b7a-7d4c-4f1a-9c2e-3a6b8d1e4f90',
  primary_color: '#429EBD',
  primary_hover: '#053F5C',
  secondary_color: '#053F5C',
  accent_color: '#F7AD19',
  bg_color: '#FFFFFF',
  text_color: '#053F5C',
  border_radius: '0.625rem'
};

export const INITIAL_SEO: SeoSettings = {
  id: 's0000000-0000-0000-0000-000000000001',
  home_title: 'Bright Okeyson Nigeria Enterprises | Complete Motorcycles & Genuine Spare Parts',
  home_description: 'Home of All Motorcycle Healing Center. Authorized dealer in complete motorcycles (Bajaj, TVS, Keke, Haojue) and genuine spare parts across Ondo and Kogi State.',
  keywords: 'motorcycles, spare parts, Bajaj, TVS, Keke, Haojue, Ondo State, Ikare Akoko, motorcycle healing center, motorcycle parts Nigeria',
  social_image_url: '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg'
};

export const INITIAL_ANALYTICS: AnalyticsSettings = {
  id: 'an000000-0000-0000-0000-000000000001',
  meta_pixel_id: '',
  google_analytics_id: '',
  google_ads_id: ''
};

export const INITIAL_NAV_ITEMS: NavigationItem[] = [
  { id: 'nav1', label: 'Home', url: '/', display_order: 1, is_active: true, is_footer: false },
  { id: 'nav2', label: 'Products', url: '/products', display_order: 2, is_active: true, is_footer: false },
  { id: 'nav3', label: 'Categories', url: '/categories', display_order: 3, is_active: true, is_footer: false },
  { id: 'nav4', label: 'About', url: '/about', display_order: 4, is_active: true, is_footer: false },
  { id: 'nav5', label: 'Contact', url: '/contact', display_order: 5, is_active: true, is_footer: false },
  { id: 'nav6', label: 'Cart', url: '/cart', display_order: 6, is_active: true, is_footer: false }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq00000-0000-0000-0000-000000000001',
    customer_name: 'Adewale Bakare',
    phone: '08023456789',
    email: '',
    location: 'Ikare Akoko, Ondo State',
    message: 'Need 4 pairs of Front Absorber F/C and 6 bottles of Oil - 1L for workshop servicing.',
    status: 'New',
    source: 'website_cart',
    items: [
      { id: 'itm1', product_name_snapshot: 'Front Absorber F/C', quantity: 4 },
      { id: 'itm2', product_name_snapshot: 'Oil - 1L', quantity: 6 }
    ],
    created_at: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'inq00000-0000-0000-0000-000000000002',
    customer_name: 'Emmanuel Ojo',
    phone: '09012345678',
    email: 'emmanuelojo@gmail.com',
    location: 'Kabba, Kogi State',
    message: 'Inquiring about complete Bajaj Boxer motorcycle availability and delivery to Kabba branch.',
    status: 'Contacted',
    source: 'landing_bajaj',
    items: [
      { id: 'itm3', product_name_snapshot: 'Complete Motorcycles', quantity: 1 }
    ],
    created_at: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

export const MOTORCYCLE_BRANDS = [
  'BAJAJ',
  'TVS',
  'KEKE',
  'HAOJUE',
  'JEELY',
  'SHIRORO',
  'BESTY',
  'JIENG'
] as const;
