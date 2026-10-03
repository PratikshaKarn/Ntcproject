import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const COLS = [
  { title: 'Company', links: [['/about', 'About us'], ['/OurMission', 'Our mission'], ['/team', 'Our team'], ['/contact', 'Contact']] },
  { title: 'Services', links: [['/services', 'All services'], ['/projects', 'Project portfolio'], ['/packages', 'Packages & pricing']] },
  { title: 'Client Care', links: [['/login', 'Client login'], ['/register', 'Register'], ['/dashboard', 'Project dashboard']] },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const onSubmit = (e) => { e.preventDefault(); setEmail(''); };

  return (
    <footer className="font-sans text-white">
      {/* Newsletter band (as on ntc.net.np) */}
      <div className="bg-nt-blue">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h3 className="text-lg font-bold">Join our newsletter</h3>
            <p className="text-sm text-white/80">Receive project updates and new package offers.</p>
          </div>
          <form onSubmit={onSubmit} className="flex w-full md:w-auto">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full md:w-80 px-4 py-3 text-sm text-ink-900 rounded-l-sm border-0 focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="px-6 py-3 bg-nt-red hover:bg-red-700 text-sm font-semibold rounded-r-sm transition-colors">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="bg-nt-dark">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h4 className="font-extrabold tracking-wide">CONSTRUCTION WORK PVT. LTD.</h4>
            <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-sm">
              A construction and engineering firm based in Jawalakhel, Kathmandu, delivering reliable, quality-driven structural solutions.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><FaMapMarkerAlt className="mt-1 shrink-0" />NTC Building, Jawalakhel, Lalitpur, Bagmati Province,PIN code 44700 </li>
              <li className="flex gap-3 items-center"><FaPhoneAlt className="shrink-0" /> <a href="tel:+9779800000000" className="hover:text-white">+977 9800000000</a></li>
              <li className="flex gap-3 items-center"><FaEnvelope className="shrink-0" /> <a href="mailto:const@gmail.com" className="hover:text-white">const@gmail.com</a></li>
            </ul>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-4 pb-2 border-b-2 border-nt-red inline-block">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map(([to, text]) => (
                  <li key={to}><Link to={to} className="text-white/70 hover:text-white transition-colors">{text}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>&copy; {new Date().getFullYear()} Construction Work Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {[
                [FaFacebookF, '#', 'Facebook'],
                [FaInstagram, '#', 'Instagram'],
                [FaLinkedinIn, '#', 'LinkedIn'],
              ].map(([Icon, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                   className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-nt-red text-white transition-colors">
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
