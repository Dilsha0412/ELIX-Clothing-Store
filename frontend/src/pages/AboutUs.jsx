import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black uppercase tracking-wider text-black mb-4">About ELIX</h1>
        <p className="text-xs text-neutral-500 tracking-wide font-medium max-w-xl mx-auto leading-relaxed">
          Crafting premium, everyday essentials that seamlessly blend comfort, functionality, and timeless design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Our Team"
            className="rounded-none border border-neutral-200 shadow-none object-cover w-full h-80"
          />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-wider text-black mb-4">Our Story</h2>
          <p className="text-neutral-500 mb-4 leading-relaxed text-sm tracking-wide">
            Founded with a vision to redefine modern wardrobe essentials, ELIX was born out of a desire for apparel that keeps up with everyday life. We believe clothing should be comfortable without sacrificing style, and durable enough to accompany you on any journey.
          </p>
          <p className="text-neutral-500 leading-relaxed text-sm tracking-wide">
            From our fabric selection to our tailoring, every detail is meticulously curated to ensure the highest standards of quality and ethical production.
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-16">
        <h2 className="text-xl font-black uppercase tracking-wider text-center text-black mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl">
              🌿
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-2">Sustainability</h3>
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed">
              We are committed to reducing our environmental footprint by sourcing organic materials and utilizing eco-friendly production methods.
            </p>
          </div>
          <div className="p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl">
              ✨
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-2">Premium Quality</h3>
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed">
              Every garment is designed to last. We focus on premium stitching, fine fabrics, and timeless fits that transcend seasonal trends.
            </p>
          </div>
          <div className="p-6 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center border border-black rounded-none mb-4 text-black text-xl">
              🤝
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-2">Ethical Trade</h3>
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed">
              We partner only with certified manufacturers who guarantee fair wages, safe working conditions, and respectful treatment of employees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
