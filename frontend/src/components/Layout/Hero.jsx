import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import slide1Img from "../../assets/a-male-model-wearing-a-black-suit.webp";
import slide2Img from "../../assets/8551370_blue.webp";
import slide3Img from "../../assets/blackbrown.webp";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slide1Img,
      alt: "Menswear Collection",
      imagePosition: "object-[100%_10%]",
      content: (
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-12 lg:px-16 bg-transparent">
          <div className="text-right flex flex-col items-end transition-all duration-700 transform scale-95 md:scale-100">
            <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-neutral-800 uppercase mb-2">
              Tailored to Perfection
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-serif italic text-neutral-900 tracking-wide my-2 md:my-4">
              Menswear
            </h1>
            <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-neutral-800 uppercase mt-2">
              Exclusive Collection
            </span>
          </div>
        </div>
      )
    },
    {
      isSplit: true,
      image: slide2Img,
      alt: "Latest Autumn Collection",
      content: (
        <div className="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-2">
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={slide2Img}
              alt="Latest Autumn Collection"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="relative w-full h-full bg-[#5c86a6] text-white flex flex-col justify-center items-center p-8 md:p-12 overflow-y-auto">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-amber-200 uppercase mb-3">
                Partnership Discounts
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                25% OFF
              </h2>

              <div className="grid grid-cols-2 gap-5 md:gap-6 w-full">
                {/* Card 1 */}
                <div className="bg-white text-neutral-900 rounded-2xl py-6 px-5 md:py-8 md:px-6 flex flex-col items-center justify-between shadow-xl border border-neutral-100 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-[10px] md:text-xs font-extrabold text-neutral-400 uppercase tracking-widest">CDB Bank</span>
                  <div className="my-3 text-center">
                    <span className="text-3xl md:text-4xl font-black text-[#49708f] leading-none">25%</span>
                    <span className="text-xs md:text-sm font-black text-[#49708f] block mt-0.5">OFF</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Credit Cards</span>
                </div>

                {/* Card 2 */}
                <div className="bg-white text-neutral-900 rounded-2xl py-6 px-5 md:py-8 md:px-6 flex flex-col items-center justify-between shadow-xl border border-neutral-100 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-[10px] md:text-xs font-extrabold text-neutral-400 uppercase tracking-widest">Commercial</span>
                  <div className="my-3 text-center">
                    <span className="text-3xl md:text-4xl font-black text-[#49708f] leading-none">25%</span>
                    <span className="text-xs md:text-sm font-black text-[#49708f] block mt-0.5">OFF</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Credit Cards</span>
                </div>

                {/* Card 3 */}
                <div className="bg-white text-neutral-900 rounded-2xl py-6 px-5 md:py-8 md:px-6 flex flex-col items-center justify-between shadow-xl border border-neutral-100 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-[10px] md:text-xs font-extrabold text-neutral-400 uppercase tracking-widest">Amãna Bank</span>
                  <div className="my-3 text-center">
                    <span className="text-2xl md:text-3xl font-black text-[#49708f] leading-none">15%</span>
                    <span className="text-xs md:text-sm font-black text-[#49708f] block mt-0.5">OFF</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Debit Cards</span>
                </div>

                {/* Card 4 */}
                <div className="bg-white text-neutral-900 rounded-2xl py-6 px-5 md:py-8 md:px-6 flex flex-col items-center justify-between shadow-xl border border-neutral-100 hover:scale-[1.03] transition-transform duration-300">
                  <span className="text-[10px] md:text-xs font-extrabold text-neutral-400 uppercase tracking-widest">LOLC Bank</span>
                  <div className="my-3 text-center">
                    <span className="text-2xl md:text-3xl font-black text-[#49708f] leading-none">20%</span>
                    <span className="text-xs md:text-sm font-black text-[#49708f] block mt-0.5">OFF</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Debit Cards</span>
                </div>
              </div>

              <p className="text-[10px] text-neutral-200 mt-6 font-light leading-relaxed">
                Valid until 31st May | Max bill value & T&C apply.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      image: slide3Img,
      alt: "Special Promotion",
      imagePosition: "object-top",
      content: (
        <div className="absolute inset-0 flex flex-col justify-center items-center py-10 px-6 md:py-16 md:px-24 text-neutral-200 bg-black/30">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
            <span className="text-xs md:text-sm font-bold tracking-[0.5em] text-gray-400 uppercase mb-3">
              Special Promotion
            </span>
            <h1 className="text-6xl md:text-[8rem] font-black text-gray-300 tracking-tight mb-4 select-none drop-shadow-md">
              20% OFF
            </h1>
            <p className="text-base md:text-2xl text-gray-400 font-light tracking-wide max-w-xl leading-relaxed drop-shadow-sm">
              Enjoy 20% off on your first purchase. Discount automatically applied at checkout.
            </p>
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

  return (
    <section className="relative w-full h-[400px] md:h-[600px] lg:h-[750px] overflow-hidden bg-neutral-100 group">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-neutral-800 rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-neutral-800 rounded-full p-2.5 md:p-3 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
        aria-label="Next slide"
      >
        <FiChevronRight className="h-5 w-5 md:h-6 md:w-6" />
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