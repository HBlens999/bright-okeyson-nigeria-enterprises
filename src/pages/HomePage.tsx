import React, { useEffect } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { BrandShowcase } from '../components/home/BrandShowcase';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { BranchesSection } from '../components/home/BranchesSection';
import { updatePageSEO } from '../utils/seo';
import { useSettings } from '../context/SettingsContext';

export const HomePage: React.FC = () => {
  const { siteSettings } = useSettings();

  useEffect(() => {
    updatePageSEO({
      title: 'Complete Motorcycles & Genuine Spare Parts',
      description: `${siteSettings.tagline}. ${siteSettings.description} Dealership in Ikare Akoko, Ondo State & Kabba, Kogi State.`
    });
  }, [siteSettings]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Authorized Brands Showcase */}
      <BrandShowcase />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Category Showcase */}
      <CategoryShowcase />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Branches & Locations */}
      <BranchesSection />
    </div>
  );
};
