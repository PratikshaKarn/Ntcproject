import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // 'success', 'error', 'loading'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      
      // Auto clear success message after 5 seconds
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Name Input */}
        <div className="relative">
          <label htmlFor="name" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300 placeholder-gray-400"
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <label htmlFor="email" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300 placeholder-gray-400"
          />
        </div>

        {/* Subject Input */}
        <div className="relative">
          <label htmlFor="subject" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Project Inquiry"
            className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300 placeholder-gray-400"
          />
        </div>

        {/* Message Input */}
        <div className="relative">
          <label htmlFor="message" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your project requirements..."
            className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300 resize-y placeholder-gray-400"
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full flex justify-center items-center gap-3 bg-bright-green text-white py-4 px-6 font-bold rounded-sm text-lg uppercase tracking-widest hover:bg-deep-blue transition-all duration-300 disabled:bg-gray-400 group"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
          {!status && <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
        </button>

      </form>

      {/* Status Messages - Animated in below the form */}
      {status === 'success' && (
        <div className="mt-6 flex items-center justify-center gap-3 p-4 rounded-sm bg-green-50 border-l-4 border-green-500 text-green-700 font-semibold animate-fade-in-up">
          <FaCheckCircle className="text-xl" />
          <p>Thank you! Your message has been received.</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-6 flex items-center justify-center gap-3 p-4 rounded-sm bg-red-50 border-l-4 border-red-500 text-red-700 font-semibold animate-fade-in-up">
          <FaExclamationCircle className="text-xl" />
          <p>Oops! Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;