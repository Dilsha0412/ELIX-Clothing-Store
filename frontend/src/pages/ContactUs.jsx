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
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black uppercase tracking-wider text-black mb-4">Contact Us</h1>
        <p className="text-xs text-neutral-500 tracking-wide font-medium max-w-md mx-auto">
          Have a question, feedback, or need assistance? Reach out to us, we'd love to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-stretch">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-8 flex flex-col justify-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-black mb-3">Get in Touch</h2>
            <p className="text-neutral-500 leading-relaxed text-xs tracking-wide">
              Our customer support team is available Monday through Friday, 9:00 AM to 6:00 PM.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-3.5">
              <span className="text-xl leading-none">📍</span>
              <div>
                <h4 className="font-bold text-black uppercase tracking-wider text-xs">Our Location</h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">No 32,Dalugama,Kelaniya</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <span className="text-xl leading-none">📞</span>
              <div>
                <h4 className="font-bold text-black uppercase tracking-wider text-xs">Phone Number</h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">+94 775227202</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <span className="text-xl leading-none">✉️</span>
              <div>
                <h4 className="font-bold text-black uppercase tracking-wider text-xs">Email Address</h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">support@elix-shop.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 bg-white p-8 border border-neutral-200 rounded-none shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Your Name"
                className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="youremail@example.com"
                className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Inquiry about shipping"
                className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Type your message here..."
                className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer"
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
