-- ==============================================================================
-- BRIGHT OKEYSON NIGERIA ENTERPRISES - SEED DATA
-- Business Reg: BN 3234989
-- ==============================================================================

-- 1. Site Settings
INSERT INTO public.site_settings (
    id,
    business_name,
    tagline,
    description,
    registration_number,
    main_office,
    email,
    phone_numbers,
    primary_whatsapp,
    whatsapp_tooltip,
    whatsapp_position,
    whatsapp_pulse,
    whatsapp_enabled
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'BRIGHT OKEYSON NIGERIA ENTERPRISES',
    'Home of All Motorcycle Healing Center',
    'We are dealers in all kinds of complete motorcycles & spare parts.',
    'BN 3234989',
    'NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE',
    'brightokeson3@gmail.com',
    ARRAY['08069382393', '07042938148', '09033338829', '09119442829'],
    '08069382393',
    'Need help? Chat with us on WhatsApp',
    'bottom-right',
    true,
    true
) ON CONFLICT (id) DO NOTHING;

-- 2. Branding
INSERT INTO public.branding (
    id,
    brand_symbol_text
) VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'BONE'
) ON CONFLICT (id) DO NOTHING;

-- 3. Branches
INSERT INTO public.branches (id, name, address, phone, email, is_main, is_active, display_order)
VALUES 
(
    'c0000000-0000-0000-0000-000000000001',
    'Main Office - Bethel Plaza',
    'NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE',
    '08069382393',
    'brightokeson3@gmail.com',
    true,
    true,
    1
),
(
    'c0000000-0000-0000-0000-000000000002',
    'Branch Office 1 - Ilepa Street',
    '1: L/128 Ilepa Street, Ikare Akoko, Ondo State',
    '07042938148',
    'brightokeson3@gmail.com',
    false,
    true,
    2
),
(
    'c0000000-0000-0000-0000-000000000003',
    'Branch Office 2 - Kabba Hub',
    'NO. 89, Obaro Way, Kabba, Kogi State',
    '09033338829',
    'brightokeson3@gmail.com',
    false,
    true,
    3
) ON CONFLICT (id) DO NOTHING;

-- 4. Categories
INSERT INTO public.categories (id, name, slug, description, display_order, is_active)
VALUES
('d0000000-0000-0000-0000-000000000001', 'Complete Motorcycles', 'complete-motorcycles', 'Brand new complete commercial and commuter motorcycles and tricycles.', 1, true),
('d0000000-0000-0000-0000-000000000002', 'Spare Parts', 'spare-parts', 'Genuine mechanical and electrical replacement parts for all motorcycle brands.', 2, true),
('d0000000-0000-0000-0000-000000000003', 'Engine Parts', 'engine-parts', 'Pistons, crankshafts, bearings, cylinder heads, valves and engine rebuild kits.', 3, true),
('d0000000-0000-0000-0000-000000000004', 'Lubricants/Oils', 'lubricants-oils', 'High performance 4-stroke engine oils and multi-grade lubricants.', 4, true),
('d0000000-0000-0000-0000-000000000005', 'Motorcycle Accessories', 'motorcycle-accessories', 'Chain covers, guards, mirrors, absorbers, and rider protective gears.', 5, true),
('d0000000-0000-0000-0000-000000000006', 'Tyres', 'tyres', 'Heavy-duty commercial front and rear motorcycle tyres and inner tubes.', 6, true),
('d0000000-0000-0000-0000-000000000007', 'Other Parts', 'other-parts', 'Fasteners, gums, gaskets, cables, and general hardware.', 7, true)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Products
INSERT INTO public.products (id, name, slug, short_description, description, category_id, brand, sku, availability, featured, is_new, display_order)
VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'Front Absorber F/C',
    'front-absorber-fc',
    'Heavy-duty front shock absorber assembly engineered for rugged Nigerian road conditions.',
    'Original equipment specification front absorber designed for heavy load carrying and high shock dampening on uneven road surfaces. Built with anti-leak hydraulic seals and hardened chrome piston rods.',
    'd0000000-0000-0000-0000-000000000002',
    'BAJAJ',
    'BONE-ABS-01',
    'In Stock',
    true,
    true,
    1
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Gum',
    'gum-engine-gasket-sealant',
    'Industrial high-temperature engine sealant and adhesive for motorcycle repairs.',
    'Professional automotive grade gasket maker and sealant gum resistant to engine oil, heat, and vibration.',
    'd0000000-0000-0000-0000-000000000007',
    'BESTY',
    'BONE-GUM-02',
    'In Stock',
    false,
    false,
    2
),
(
    'e0000000-0000-0000-0000-000000000003',
    'Oil - 1L',
    'oil-1l',
    'Premium 4T motorcycle engine oil in 1 Litre container for routine engine servicing.',
    'High-grade thermal stable 4-stroke engine oil providing smooth clutch operation, engine cleanliness, and wear protection.',
    'd0000000-0000-0000-0000-000000000004',
    'JIENG',
    'BONE-OIL-1L',
    'In Stock',
    true,
    false,
    3
),
(
    'e0000000-0000-0000-0000-000000000004',
    'Oil - 4L',
    'oil-4l',
    'Workshop 4 Litre high endurance motorcycle engine lubricant.',
    'Economical 4L container ideal for commercial fleet operators and motorcycle mechanics.',
    'd0000000-0000-0000-0000-000000000004',
    'SHIRORO',
    'BONE-OIL-4L',
    'In Stock',
    false,
    false,
    4
),
(
    'e0000000-0000-0000-0000-000000000005',
    'Oil - 5L',
    'oil-5l',
    'Heavy-duty 5 Litre motorcycle engine oil for commercial workshops.',
    'Formulated to resist thermal breakdown in tropical climates and heavy commercial stop-and-go usage.',
    'd0000000-0000-0000-0000-000000000004',
    'JEELY',
    'BONE-OIL-5L',
    'In Stock',
    false,
    false,
    5
),
(
    'e0000000-0000-0000-0000-000000000006',
    'Oil - 25L',
    'oil-25l',
    'Commercial bulk 25 Litre drum for repair centers, distributors, and fleet hubs.',
    'Bulk workshop supply ensuring highest cost efficiency for active commercial workshops and fleet centers.',
    'd0000000-0000-0000-0000-000000000004',
    'TVS',
    'BONE-OIL-25L',
    'In Stock',
    true,
    false,
    6
),
(
    'e0000000-0000-0000-0000-000000000007',
    'Clutch Plate',
    'clutch-plate',
    'Original friction clutch plate set for maximum torque transfer and zero slippage.',
    'Engineered with high-friction organic composites and heat-tempered steel backing for commercial haulers.',
    'd0000000-0000-0000-0000-000000000003',
    'BAJAJ',
    'BONE-CLU-07',
    'In Stock',
    true,
    false,
    7
),
(
    'e0000000-0000-0000-0000-000000000008',
    'Bearing',
    'precision-motorcycle-bearing',
    'High-speed precision wheel and crankshaft roller bearings.',
    'Hardened steel deep-groove ball bearings built for prolonged rotation under heavy road payloads.',
    'd0000000-0000-0000-0000-000000000003',
    'HAOJUE',
    'BONE-BRG-08',
    'In Stock',
    false,
    false,
    8
),
(
    'e0000000-0000-0000-0000-000000000009',
    'Crankshaft',
    'motorcycle-crankshaft-assembly',
    'Forged alloy crankshaft assembly for 100cc-150cc engines.',
    'Precision-balanced genuine engine crankshaft ensuring minimal engine vibration and longevity.',
    'd0000000-0000-0000-0000-000000000003',
    'BAJAJ',
    'BONE-CRK-09',
    'In Stock',
    true,
    true,
    9
),
(
    'e0000000-0000-0000-0000-000000000010',
    'Complete Motorcycles',
    'complete-motorcycles-commercial',
    'Brand new complete commercial motorcycles ready for immediate deployment.',
    'Direct from official distributors. Fuel efficient, sturdy chassis, robust suspension, and trusted across Nigeria.',
    'd0000000-0000-0000-0000-000000000001',
    'BAJAJ',
    'BONE-MTR-10',
    'In Stock',
    true,
    true,
    10
),
(
    'e0000000-0000-0000-0000-000000000011',
    'Tyres',
    'commercial-motorcycle-tyres',
    'Reinforced deep-tread commercial motorcycle tyres (Front & Rear sizes).',
    'Thick puncture-resistant casing designed for rocky, unpaved, and highway riding with superior grip.',
    'd0000000-0000-0000-0000-000000000006',
    'BESTY',
    'BONE-TYR-11',
    'In Stock',
    true,
    false,
    11
),
(
    'e0000000-0000-0000-0000-000000000012',
    'Chain Cover Bajaj Follow',
    'chain-cover-bajaj-follow',
    'Protective metal chain case cover engineered specifically for Bajaj motorcycle models.',
    'Shields the drive chain and sprocket from road dust, grit, and mud to extend chain transmission life.',
    'd0000000-0000-0000-0000-000000000005',
    'BAJAJ',
    'BONE-CHN-12',
    'In Stock',
    true,
    false,
    12
)
ON CONFLICT (id) DO NOTHING;

-- 6. Product Specifications
INSERT INTO public.product_specifications (id, product_id, spec_key, spec_value, display_order)
VALUES
('f0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Compatibility', 'Bajaj Boxer, TVS, Haojue & compatible commercial models', 1),
('f0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Material', 'Hardened Chrome Alloy & High-Grade Steel', 2),
('f0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'Viscosity / Grade', '20W-50 4T Motorcycle Engine Oil', 1),
('f0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000003', 'Capacity', '1 Litre Container', 2),
('f0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000006', 'Capacity', '25 Litre Workshop Drum', 1),
('f0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000010', 'Engine Type', '4-Stroke, Single Cylinder Air-Cooled', 1),
('f0000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000010', 'Starting System', 'Kick & Electric Start', 2),
('f0000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000012', 'Model Fit', 'Bajaj Boxer BM100 / BM150', 1)
ON CONFLICT (id) DO NOTHING;

-- 7. Hero Slides
INSERT INTO public.hero_slides (
    id, title, subtitle, badge, desktop_image, primary_button_text, primary_button_url, secondary_button_text, secondary_button_url, display_order, is_active
) VALUES
(
    '70000000-0000-0000-0000-000000000001',
    'HOME OF ALL MOTORCYCLE HEALING CENTER',
    'Authorized distributors of complete motorcycles & 100% genuine spare parts across Ondo State and Kogi State.',
    'OFFICIAL DISTRIBUTOR & HEALING CENTER',
    '/src/assets/images/hero_motorcycle_dealership_1791203249649.jpg',
    'INQUIRE ON WHATSAPP',
    'https://wa.me/2348069382393',
    'VIEW PRODUCT CATALOGUE',
    '/products',
    1,
    true
),
(
    '70000000-0000-0000-0000-000000000002',
    'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    'Dealership quality for Bajaj, TVS, Keke, Haojue, Jeely, Shiroro, Besty, and Jieng.',
    'COMMERCIAL DEALERSHIP',
    '/src/assets/images/hero_spare_parts_genuine_1791203261040.jpg',
    'ORDER VIA WHATSAPP',
    'https://wa.me/2348069382393',
    'FIND OUR BRANCHES',
    '/contact',
    2,
    true
) ON CONFLICT (id) DO NOTHING;

-- 8. Announcements
INSERT INTO public.announcements (
    id, title, body, display_frequency, is_enabled
) VALUES (
    '80000000-0000-0000-0000-000000000001',
    'WELCOME TO BRIGHT OKEYSON NIGERIA ENTERPRISES',
    'Home of All Motorcycle Healing Center. We are dealers in all kinds of complete motorcycles & spare parts. Visit us @ NO. 1, BETHEL PLAZA, IDIMANGO IKARE AKOKO, ONDO STATE.',
    'once_per_day',
    true
) ON CONFLICT (id) DO NOTHING;

-- 9. Landing Pages
INSERT INTO public.landing_pages (
    id, slug, title, subtitle, hero_headline, hero_supporting_text, primary_cta_text, secondary_cta_text, is_published
) VALUES
(
    '90000000-0000-0000-0000-000000000001',
    'default',
    'Complete Motorcycles & Genuine Spare Parts Campaign',
    'Direct Dealership Supply in Ondo & Kogi State',
    'COMPLETE MOTORCYCLES & GENUINE SPARE PARTS',
    'Reliable motorcycle solutions from Bright Okeyson Nigeria Enterprises.',
    'INQUIRE ON WHATSAPP',
    'VIEW PRODUCTS',
    true
),
(
    '90000000-0000-0000-0000-000000000002',
    'bajaj',
    'Bajaj Motorcycles & Genuine Boxer Spare Parts',
    'Official commercial parts and complete units',
    'BAJAJ MOTORCYCLES & GENUINE BOXER PARTS',
    'Fast supply of genuine Bajaj motorcycle shock absorbers, clutch plates, chain covers, and engine assemblies.',
    'INQUIRE ON WHATSAPP',
    'VIEW PRODUCTS',
    true
),
(
    '90000000-0000-0000-0000-000000000003',
    'spare-parts',
    'Wholesale & Retail Genuine Motorcycle Spare Parts',
    'Complete engine, body, lubricant, and suspension parts',
    '100% GENUINE MOTORCYCLE SPARE PARTS',
    'Keep your motorcycles on the road with factory-spec absorbers, crankshafts, clutch plates, and multi-grade engine oils.',
    'INQUIRE ON WHATSAPP',
    'VIEW PRODUCTS',
    true
) ON CONFLICT (id) DO NOTHING;
