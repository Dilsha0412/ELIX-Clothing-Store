import React from 'react';

const Features = () => {
  const featuresData = [
    {
      title: "Fast Worldwide Shipping",
      description: "Get your favorite outfits delivered to your doorstep in record time. We partner with top-tier global shipping services to ensure speedy, reliable transit with live tracking.",
      icon: "⚡"
    },
    {
      title: "Secure Checkout & Payments",
      description: "Shop with peace of mind. We implement state-of-the-art SSL encryption and integrate with trusted payment processors like PayPal to safeguard your financial transactions.",
      icon: "🔒"
    },
    {
      title: "Ethical & Sustainable Sourcing",
      description: "We care deeply about our planet and society. Our fabrics are sourced sustainably, and our manufacturing partners adhere to strict fair-labor and environmental guidelines.",
      icon: "🌱"
    },
    {
      title: "Premium Materials & Craftsmanship",
      description: "Every item in our collection is crafted with meticulous attention to detail. We utilize fine cotton blends, premium linen, and robust stitching meant to withstand the test of time.",
      icon: "✨"
    },
    {
      title: "30-Day Hassle-Free Returns",
      description: "Not the right size or fit? No problem. Enjoy our simple 30-day return policy. Send the unworn item back for an exchange or a full refund, no questions asked.",
      icon: "🔄"
    },
    {
      title: "24/7 Dedicated Support",
      description: "Our customer success team is here for you day and night. Reach out to us through email, chat, or phone, and we'll resolve any issues or questions promptly.",
      icon: "📞"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-black uppercase tracking-wider text-black mb-4">ELIX Features</h1>
        <p className="text-xs text-neutral-500 tracking-wide font-medium max-w-xl mx-auto leading-relaxed">
          We are committed to delivering the ultimate online shopping experience through premium services, ethical craftsmanship, and top-tier customer care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div key={index} className="p-8 bg-white border border-neutral-100 rounded-none shadow-none hover:border-black transition-all duration-300">
            <div className="w-10 h-10 flex items-center justify-center border border-black rounded-none mb-5 text-black text-xl bg-white">
              {feature.icon}
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3">{feature.title}</h3>
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white border border-neutral-200 rounded-none p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-lg font-black uppercase tracking-wider text-black mb-3">Ready to experience the difference?</h2>
          <p className="text-neutral-500 text-xs tracking-wider leading-relaxed">
            Browse our new collections today and enjoy premium everyday comfort apparel made just for your lifestyle.
          </p>
        </div>
        <div>
          <a
            href="/collections/all"
            className="inline-block bg-black text-white px-8 py-4 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors text-sm cursor-pointer"
          >
            Start Shopping Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;

