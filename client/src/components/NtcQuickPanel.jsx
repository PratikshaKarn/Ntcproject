import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaRupeeSign, FaFileAlt, FaBoxOpen, FaCalendarCheck, FaHeadset } from 'react-icons/fa';

const TILES = [
  { to: '/dashboard', icon: FaTasks, label: 'Project status' },
  { to: '/dashboard', icon: FaRupeeSign, label: 'Payments' },
  { to: '/dashboard', icon: FaFileAlt, label: 'Documents' },
  { to: '/packages', icon: FaBoxOpen, label: 'Packages' },
  { to: '/contact', icon: FaCalendarCheck, label: 'Book a site visit' },
  { to: '/contact', icon: FaHeadset, label: 'Support' },
];

// Sample content: replace with real notices / news from your API.
const NOTICES = [
  { to: '/projects', text: 'Site safety advisory for the monsoon season', isNew: true },
  { to: '/packages', text: 'New residential construction packages', isNew: true },
  { to: '/services', text: 'Government approval timelines updated', isNew: false },
  { to: '/about', text: 'Quality and safety certifications renewed', isNew: false },
];

const QUICK_LINKS = [
  ['/services', 'Our services'], ['/projects', 'Project portfolio'], ['/packages', 'Packages & pricing'],
  ['/team', 'Meet the team'], ['/contact', 'Contact us'],
];

/** Home-page strip modelled on ntc.net.np: Self Care tiles, Notices, Quick Links. */
export default function NtcQuickPanel() {
  return (
    <section className="bg-nt-sky font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-6 lg:grid-cols-3">
        <div className="bg-white shadow-card border-t-4 border-nt-red">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-nt-blue">Client Care Account</h2>
            <Link to="/login" className="text-xs font-semibold bg-nt-blue hover:bg-nt-dark text-white px-3 py-1.5 rounded-sm">Login</Link>
          </div>
          <div className="grid grid-cols-3 gap-px bg-gray-100">
            {TILES.map(({ to, icon: Icon, label }) => (
              <Link key={label} to={to} className="bg-white hover:bg-nt-sky transition-colors py-5 flex flex-col items-center gap-2 text-center">
                <Icon className="text-nt-blue text-xl" />
                <span className="text-xs font-medium text-ink-700 px-1">{label}</span>
              </Link>
            ))}
          </div>
          <p className="px-5 py-3 text-xs text-ink-400">Don't have an account? <Link to="/register" className="text-nt-red font-semibold">Register</Link></p>
        </div>

        <div className="bg-white shadow-card border-t-4 border-nt-blue">
          <div className="px-5 py-4 border-b border-gray-100"><h2 className="font-bold text-nt-blue">Notices</h2></div>
          <ul className="divide-y divide-gray-100">
            {NOTICES.map((n) => (
              <li key={n.text}>
                <Link to={n.to} className="flex items-start gap-2 px-5 py-3 text-sm text-ink-900 hover:bg-nt-sky">
                  <span className="flex-1">{n.text}</span>
                  {n.isNew && <span className="shrink-0 text-[10px] font-bold bg-nt-red text-white px-1.5 py-0.5 rounded-sm">New</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-card border-t-4 border-nt-blue">
          <div className="px-5 py-4 border-b border-gray-100"><h2 className="font-bold text-nt-blue">Quick Links</h2></div>
          <ul className="divide-y divide-gray-100">
            {QUICK_LINKS.map(([to, text]) => (
              <li key={to}><Link to={to} className="block px-5 py-3 text-sm text-ink-900 hover:bg-nt-sky hover:text-nt-blue">{text}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
