import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import slide1Img from "../../assets/1.png";
import slide2Img from "../../assets/2.png";
import slide3Img from "../../assets/3.png";
import slide4Img from "../../assets/4.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slide1Img,
      alt: "New Season Collection",
      imagePosition: "object-center",
      content: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent text-center px-4 z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-black/80 mb-3 md:mb-4">
              New Season Arrival
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-[0.1em] text-black mb-3 md:mb-5 leading-none drop-shadow-sm whitespace-nowrap">
              Elix Collection
            </h1>
            <p className="text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] uppercase text-black/90 mb-8 md:mb-10 max-w-lg">
              Define your vibe with our latest styles.
            </p>
            <Link
              to="/collections/all"
              className="border border-black text-black hover:bg-black/10 px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm rounded-none bg-transparent"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )
    },
    {
      image: slide2Img,
      alt: "Latest Collection",
      imagePosition: "object-center",
      content: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center px-4 z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#B1A995] mb-3 md:mb-4">
              Modern Essentials
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-[0.1em] text-[#B1A995] mb-3 md:mb-5 leading-none drop-shadow-sm">
              Urban Luxe
            </h1>
            <p className="text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#B1A995]/90 mb-8 md:mb-10 max-w-lg">
              Elevate your daily rotation with premium fabrics.
            </p>
            <Link
              to="/collections/all"
              className="bg-[#B1A995] text-stone-900 hover:bg-[#A09884] px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-md border border-transparent"
            >
              Explore Now
            </Link>
          </div>
        </div>
      )
    },
    {
      image: slide3Img,
      alt: "Special Promotion",
      imagePosition: "object-center",
      content: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent text-center px-4 z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#C58B99]/90 mb-3 md:mb-4">
              Limited Time Only
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-[0.1em] text-[#C58B99] mb-3 md:mb-5 leading-none drop-shadow-sm">
              Seasonal Sale
            </h1>
            <p className="text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#C58B99]/95 mb-8 md:mb-10 max-w-lg">
              Enjoy up to 40% off on selected designer styles.
            </p>
            <Link
              to="/collections/all"
              className="border border-[#C58B99] text-[#C58B99] hover:bg-[#C58B99]/10 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-md bg-transparent"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      )
    },
    {
      image: slide4Img,
      alt: "Featured Collection",
      imagePosition: "object-center",
      content: (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center px-4 z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/95 mb-3 md:mb-4">
              Curated Style
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-[0.1em] text-white mb-3 md:mb-5 leading-none drop-shadow-sm">
              Timeless Classics
            </h1>
            <p className="text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/90 mb-8 md:mb-10 max-w-lg">
              Handcrafted statement pieces designed to stand out.
            </p>
            <Link
              to="/collections/all"
              className="bg-white hover:bg-neutral-100 text-black px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-md rounded-none border border-transparent"
            >
              Shop Featured
            </Link>
          </div>
        </div>
      )
    }
  ];

  // Auto Scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const arrowColorClass = (currentSlide === 0 || currentSlide === 2)
    ? "text-neutral-800 hover:text-black hover:scale-125"
    : "text-white hover:text-neutral-200 hover:scale-125";

  return (
    <section className="relative w-full aspect-[2912/1440] overflow-hidden bg-neutral-100 group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Slide Image */}
            {!slide.isSplit && (
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover ${slide.imagePosition || "object-center"}`}
                style={slide.imageStyle || {}}
              />
            )}
            {/* Slide Overlay Content */}
            {slide.content}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 ${arrowColorClass} active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto p-2`}
        aria-label="Previous slide"
      >
        <FiChevronLeft className="h-8 w-8 md:h-12 md:w-12 transition-colors duration-300" />
      </button>

      <button
        onClick={handleNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 ${arrowColorClass} active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto p-2`}
        aria-label="Next slide"
      >
        <FiChevronRight className="h-8 w-8 md:h-12 md:w-12 transition-colors duration-300" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-neutral-900 w-6" : "bg-neutral-400 hover:bg-neutral-600"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;