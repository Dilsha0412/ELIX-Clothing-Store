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
      content: null
    },
    {
      image: slide2Img,
      alt: "Latest Collection",
      imagePosition: "object-center",
      content: null
    },
    {
      image: slide3Img,
      alt: "Special Promotion",
      imagePosition: "object-center",
      content: null
    },
    {
      image: slide4Img,
      alt: "Featured Collection",
      imagePosition: "object-center",
      content: null
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

  const arrowColorClass = currentSlide === 0
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