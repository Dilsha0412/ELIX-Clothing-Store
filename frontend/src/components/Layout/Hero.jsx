import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from "../../assets/watermark-removed-The_Fast_Paced_Trendy_Sty.mp4";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-28 md:pb-36 bg-black/5 text-center px-4 z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/70 mb-3 md:mb-4">
            New Season Arrival
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif uppercase tracking-[0.1em] text-white/90 mb-3 md:mb-5 leading-none drop-shadow-lg whitespace-nowrap">
            Elix Collection
          </h1>
          <p className="text-[9px] sm:text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/70 mb-8 md:mb-10 max-w-lg drop-shadow-md">
            Define your vibe with our latest styles.
          </p>
          <Link
            to="/collections/all"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg rounded-none bg-transparent"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;