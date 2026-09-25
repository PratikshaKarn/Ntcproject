import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShieldAlt,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-[#121212] text-gray-300 font-sans relative">

      {/* Thin glowing wireframe separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent shadow-[0_0_12px_1px_rgba(34,211,238,0.5)]" />

      <div className="w-full h-px bg-white/10" />

      {/* ================= ENGINEERING-SCHEMATIC 4-COLUMN GRID ================= */}
      <div className="container mx-auto px-6 max-w-[1400px] py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* Column 1 — Mandate & Certifications */}
          <div>
            <span className="text-[11px] font-bold text-site-orange uppercase tracking-[0.25em] block mb-4">01 / Mandate</span>
            <h3 className="text-white font-extrabold uppercase text-sm tracking-wide mb-4">
              Construction Work
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 mb-8">
              A nationally recognized construction and engineering firm based in Sitamarhi, Bihar &mdash; delivering reliable, quality-driven structural solutions.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500">
                <FaShieldAlt className="text-teal-accent text-lg" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Safety Certified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaAward className="text-site-orange text-lg" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Quality Assured</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Navigation */}
          <div>
            <span className="text-[11px] font-bold text-site-orange uppercase tracking-[0.25em] block mb-4">02 / Navigate</span>
            <ul className="space-y-3">
              {[
                { to: "/about", text: "About the Company" },
                { to: "/services", text: "Our Services" },
                { to: "/projects", text: "Project Portfolio" },
                { to: "/packages", text: "Pricing & Packages" },
                { to: "/contact", text: "Contact Us" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-site-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Details */}
          <div>
            <span className="text-[11px] font-bold text-site-orange uppercase tracking-[0.25em] block mb-4">03 / Contact</span>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-teal-accent mt-1 text-base shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  R-12, New Colony, Raja Nagar,<br />
                  Talkhapur, Sitamarhi,<br />
                  Bihar, 843301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-teal-accent text-base shrink-0" />
                <a href="mailto:anbuildworks@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
                  anbuildworks@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-teal-accent text-base shrink-0" />
                <a href="tel:+919142873421" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
                  +91 91428 73421
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Social + Inquiry Input */}
          <div>
            <span className="text-[11px] font-bold text-site-orange uppercase tracking-[0.25em] block mb-4">04 / Connect</span>
            <div className="flex items-center gap-3 mb-8">
              <a
                href="https://www.facebook.com/profile.php?id=61581964633550"
                target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white rounded-sm hover:border-site-orange hover:text-site-orange transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://www.instagram.com/al_noor_buildworks?igsh=MXhuZzllMWF2dWxjYg=="
                target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white rounded-sm hover:border-site-orange hover:text-site-orange transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white rounded-sm hover:border-site-orange hover:text-site-orange transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={13} />
              </a>
            </div>

            <label htmlFor="footer-email" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
              Project Inquiries
            </label>
            <form onSubmit={handleSubscribe} className="flex items-center border border-white/15 bg-white/[0.04] rounded-sm overflow-hidden focus-within:border-cyan-glow transition-colors duration-300">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 outline-none"
              />
              <button
                type="submit"
                aria-label="Submit inquiry"
                className="shrink-0 px-4 py-3 text-teal-accent hover:text-white hover:bg-teal-accent transition-colors duration-300"
              >
                <FaArrowRight size={13} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1400px] py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600 uppercase tracking-wide">
            &copy; {new Date().getFullYear()} CONSTRUCTION WORK PVT. LTD. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
