import React from 'react';

const Features = () => {
  const featuresData = [
    {
      title: "Fast Worldwide Shipping",
      description: "Get your favorite outfits delivered to your doorstep in record time. We partner with top-tier global shipping services to ensure speedy, reliable transit with live tracking.",
      icon: "⚡",
      bgClass: "bg-blue-50 text-blue-600"
    },
    {
      title: "Secure Checkout & Payments",
      description: "Shop with peace of mind. We implement state-of-the-art SSL encryption and integrate with trusted payment processors like PayPal to safeguard your financial transactions.",
      icon: "🔒",
      bgClass: "bg-green-50 text-green-600"
    },
    {
      title: "Ethical & Sustainable Sourcing",
      description: "We care deeply about our planet and society. Our fabrics are sourced sustainably, and our manufacturing partners adhere to strict fair-labor and environmental guidelines.",
      icon: "🌱",
      bgClass: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Premium Materials & Craftsmanship",
      description: "Every item in our collection is crafted with meticulous attention to detail. We utilize fine cotton blends, premium linen, and robust stitching meant to withstand the test of time.",
      icon: "✨",
      bgClass: "bg-purple-50 text-purple-600"
    },
    {
      title: "30-Day Hassle-Free Returns",
      description: "Not the right size or fit? No problem. Enjoy our simple 30-day return policy. Send the unworn item back for an exchange or a full refund, no questions asked.",
      icon: "🔄",
      bgClass: "bg-rose-50 text-rose-600"
    },
    {
      title: "24/7 Dedicated Support",
      description: "Our customer success team is here for you day and night. Reach out to us through email, chat, or phone, and we'll resolve any issues or questions promptly.",
      icon: "📞",
      bgClass: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">ELIX Features</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          We are committed to delivering the ultimate online shopping experience through premium services, ethical craftsmanship, and top-tier customer care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${feature.bgClass}`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to experience the difference?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Browse our new collections today and enjoy premium everyday comfort apparel made just for your lifestyle.
          </p>
        </div>
        <div>
          <a
            href="/collections/all"
            className="inline-block bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            Start Shopping Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
