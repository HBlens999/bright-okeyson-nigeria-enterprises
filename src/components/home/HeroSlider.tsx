import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HeroSlide } from '../../types/database';
import { getHeroSlides } from '../../services/dataService';
import initialHeroImage from '../../assets/images/hero_motorcycle_dealership_1791203249649.jpg';
import secondHeroImage from '../../assets/images/hero_spare_parts_genuine_1791203261040.jpg';

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start loading the hero artwork immediately, before Supabase responds.
  useEffect(() => {
    [initialHeroImage, secondHeroImage].forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = 'high';
      image.src = src;
    });
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const data = await getHeroSlides(true);
        setSlides(data);
      } catch (err) {
        console.warn('Hero slides load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const slideCount = slides.length;

  useEffect(() => {
    if (slideCount <= 1) return;

    const currentSlide = slides[currentIndex];
    const duration = currentSlide?.duration || 5000;

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, slideCount, slides]);

  const goToSlide = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slideCount) % slideCount);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slideCount);
  };

  // Show the first hero image immediately while the CMS data is loading.
  // This prevents a blank/slow-looking hero on first paint.
  if (loading && slideCount === 0) {
    return (
      <section className="hero-slider relative overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] bg-brand-navy border-b border-brand-sky">
        <img
          src={initialHeroImage}
          alt="Bright Okeyson Nigeria Enterprises motorcycles"
          className="hero-slide-image absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable="false"
        />
      </section>
    );
  }

  // Fallback Hero if no slides exist
  if (!loading && slideCount === 0) {
    return (
      <section className="relative bg-white text-brand-navy min-h-[520px] flex items-center border-b border-[#D9EEF3]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-brand-teal font-bold uppercase tracking-widest text-xs">
            Home of All Motorcycle Healing Center
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-heading mt-2 mb-4 tracking-tight text-brand-navy">
            Complete Motorcycles & Genuine Spare Parts
          </h1>
          <p className="text-[#315D70] max-w-xl text-base sm:text-lg mb-8">
            Dealership quality in Ikare Akoko, Ondo State & Kabba, Kogi State. Authorized distributor of Bajaj, TVS, Keke, Haojue and factory parts.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/2348069382393"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-brand-gold hover:bg-brand-navy text-brand-navy hover:text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
            <Link
              to="/products"
              className="px-6 py-3.5 bg-white hover:bg-brand-sky text-brand-navy font-semibold text-xs uppercase tracking-wider rounded border-2 border-brand-navy"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <section className="hero-slider relative bg-white text-brand-navy overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center border-b border-[#D9EEF3] select-none">
      {/* Background images: no overlay, gradient, opacity fade, or filter. */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        const isEager = idx === 0;

        return (
          <div
            key={slide.id}
            className={`hero-slide-layer absolute inset-0 ${isCurrent ? 'block z-10' : 'hidden z-0'} hero-transition-${slide.transition || 'fade'} ${isCurrent ? 'hero-slide-active' : ''}`}
            aria-hidden={!isCurrent}
          >
            <picture>
              {slide.mobile_image && (
                <source media="(max-width: 640px)" srcSet={slide.mobile_image} />
              )}
              <img
                src={slide.desktop_image}
                alt={slide.title}
                loading={isEager ? 'eager' : 'lazy'}
                fetchPriority={isEager ? 'high' : 'auto'}
                className="hero-slide-image w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                draggable="false"
              />
            </picture>
          </div>
        );
      })}

      {/* Slide Content Layer */}
      {activeSlide && (
        <div className="hero-slide-content relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full pointer-events-none">
          <div
            className={`max-w-3xl space-y-4 sm:space-y-6 pointer-events-auto ${
              activeSlide.text_alignment === 'center'
                ? 'mx-auto text-center'
                : activeSlide.text_alignment === 'right'
                ? 'ml-auto text-right'
                : 'text-left'
            }`}
          >
            {activeSlide.badge && (
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-brand-sky text-brand-navy text-xs font-extrabold uppercase tracking-widest rounded border shadow-sm">
                <span>{activeSlide.badge}</span>
              </div>
            )}

            <h1 className="hero-slide-title inline-block text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-heading tracking-tight leading-[0.95] text-white text-balance bg-brand-navy/90 px-3 py-2 rounded-sm shadow-lg">
              {activeSlide.title}
            </h1>

            {activeSlide.subtitle && (
              <p className="hero-slide-subtitle inline-block text-base sm:text-lg lg:text-xl font-semibold leading-relaxed max-w-2xl text-white bg-brand-navy/90 px-3 py-2 rounded-sm shadow-md">
                {activeSlide.subtitle}
              </p>
            )}

            <div
              className={`pt-2 flex flex-wrap gap-3.5 ${
                activeSlide.text_alignment === 'center'
                  ? 'justify-center'
                  : activeSlide.text_alignment === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {activeSlide.primary_button_text && (
                <a
                  href={activeSlide.primary_button_url || 'https://wa.me/2348069382393'}
                  target={activeSlide.primary_button_url?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="hero-primary-cta px-6 sm:px-7 py-3.5 bg-brand-gold text-brand-navy font-extrabold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{activeSlide.primary_button_text}</span>
                </a>
              )}

              {activeSlide.secondary_button_text && (
                <Link
                  to={activeSlide.secondary_button_url || '/products'}
                  className="hero-secondary-cta px-6 sm:px-7 py-3.5 bg-white text-brand-navy font-bold text-xs uppercase tracking-wider rounded border-2 border-brand-navy inline-flex items-center gap-2"
                >
                  <span>{activeSlide.secondary_button_text}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Hero Slide"
            className="hero-control absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Hero Slide"
            className="hero-control absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`hero-dot h-1.5 rounded-full ${
                  idx === currentIndex ? 'hero-dot active w-8' : 'hero-dot w-2'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
