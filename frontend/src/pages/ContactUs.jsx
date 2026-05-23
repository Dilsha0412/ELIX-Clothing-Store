import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent successfully! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Have a question, feedback, or need assistance? Reach out to us, we'd love to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our customer support team is available Monday through Friday, 9:00 AM to 6:00 PM.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-xl">📍</span>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">Our Location</h4>
                <p className="text-gray-500 text-xs mt-1">123 Fashion Blvd, Suite 400, New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl">📞</span>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">Phone Number</h4>
                <p className="text-gray-500 text-xs mt-1">077-5227202</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl">✉️</span>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">Email Address</h4>
                <p className="text-gray-500 text-xs mt-1">support@elix-shop.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 bg-gray-50 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Inquiry about shipping"
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Type your message here..."
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
