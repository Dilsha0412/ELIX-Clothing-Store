import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">About ELIX</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Crafting premium, everyday essentials that seamlessly blend comfort, functionality, and timeless design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Our Team"
            className="rounded-2xl shadow-lg object-cover w-full h-80"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Founded with a vision to redefine modern wardrobe essentials, ELIX was born out of a desire for apparel that keeps up with everyday life. We believe clothing should be comfortable without sacrificing style, and durable enough to accompany you on any journey.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From our fabric selection to our tailoring, every detail is meticulously curated to ensure the highest standards of quality and ethical production.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl mb-4">🌿</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-gray-600 text-sm">
              We are committed to reducing our environmental footprint by sourcing organic materials and utilizing eco-friendly production methods.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">
              Every garment is designed to last. We focus on premium stitching, fine fabrics, and timeless fits that transcend seasonal trends.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ethical Trade</h3>
            <p className="text-gray-600 text-sm">
              We partner only with certified manufacturers who guarantee fair wages, safe working conditions, and respectful treatment of employees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
