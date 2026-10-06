import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HeroSlide } from '../../types/database';
import { getHeroSlides } from '../../services/dataService';

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Fallback Hero if no slides exist
  if (!loading && slideCount === 0) {
    return (
      <section className="relative bg-neutral-950 text-white min-h-[520px] flex items-center border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-neutral-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <span className="text-red-500 font-bold uppercase tracking-widest text-xs">
            Home of All Motorcycle Healing Center
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Barlow_Condensed'] mt-2 mb-4 tracking-tight">
            Complete Motorcycles & Genuine Spare Parts
          </h1>
          <p className="text-neutral-300 max-w-xl text-base sm:text-lg mb-8">
            Dealership quality in Ikare Akoko, Ondo State & Kabba, Kogi State. Authorized distributor of Bajaj, TVS, Keke, Haojue and factory parts.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/2348069382393"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
            <Link
              to="/products"
              className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded"
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
    <section className="hero-slider relative bg-neutral-950 text-white overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex items-center border-b border-neutral-800 select-none">
      {/* Background Images */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentIndex;
        const isEager = idx === 0;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Optimized Responsive Image */}
            <picture>
              {slide.mobile_image && (
                <source media="(max-width: 640px)" srcSet={slide.mobile_image} />
              )}
              <img
                src={slide.desktop_image}
                alt={slide.title}
                loading={isEager ? 'eager' : 'lazy'}
                fetchPriority={isEager ? 'high' : 'auto'}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </picture>

            {/* Contrast Scrim / Overlays */}
            <div
              className="absolute inset-0 bg-neutral-950"
              style={{ opacity: slide.overlay_opacity || 0.65 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent" />
          </div>
        );
      })}

      {/* Slide Content Layer */}
      {activeSlide && (
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
          <div
            className={`max-w-3xl space-y-4 sm:space-y-6 ${
              activeSlide.text_alignment === 'center'
                ? 'mx-auto text-center'
                : activeSlide.text_alignment === 'right'
                ? 'ml-auto text-right'
                : 'text-left'
            }`}
          >
            {/* Badge */}
            {activeSlide.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/90 text-white text-xs font-extrabold uppercase tracking-widest rounded shadow-sm">
                <span>{activeSlide.badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-['Barlow_Condensed'] text-white tracking-tight leading-[0.95] drop-shadow-md text-balance">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            {activeSlide.subtitle && (
              <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl drop-shadow">
                {activeSlide.subtitle}
              </p>
            )}

            {/* CTAs */}
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
                  className="px-6 sm:px-7 py-3.5 bg-green-700 hover:bg-green-600 text-white font-extrabold text-xs uppercase tracking-wider rounded inline-flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{activeSlide.primary_button_text}</span>
                </a>
              )}

              {activeSlide.secondary_button_text && (
                <Link
                  to={activeSlide.secondary_button_url || '/products'}
                  className="px-6 sm:px-7 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded border border-neutral-700 inline-flex items-center gap-2 transition-colors"
                >
                  <span>{activeSlide.secondary_button_text}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide Navigation Controls */}
      {slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Hero Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Hero Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
