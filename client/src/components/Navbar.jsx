import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '/src/assets/images/image.png';
import {
  FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaPhoneAlt, FaEnvelope, FaChevronDown,
} from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/packages', label: 'Packages' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Public site header, modelled on ntc.net.np:
 * a slim utility strip (contact, language, client care) above a white main bar.
 * It is `sticky` (in normal flow), so it never overlaps the page content.
 */
const Navbar = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const close = () => setMobileOpen(false);

  const linkCls = ({ isActive }) =>
    `relative px-1 py-5 text-sm font-semibold transition-colors border-b-[3px] ${
      isActive ? 'text-nt-blue border-nt-red' : 'text-ink-900 border-transparent hover:text-nt-blue'
    }`;

  return (
    <header className="sticky top-0 z-50 font-sans shadow-md">
      {/* ---------- Utility strip ---------- */}
      <div className="hidden lg:block bg-nt-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 text-white/80">
            <a href="tel:+919142873421" className="flex items-center gap-2 hover:text-white"><FaPhoneAlt size={10} /> +91 91428 73421</a>
            <a href="mailto:anbuildworks@gmail.com" className="flex items-center gap-2 hover:text-white"><FaEnvelope size={11} /> anbuildworks@gmail.com</a>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/packages" className="text-white/80 hover:text-white">Offers</Link>
            <div className="flex items-center rounded-sm overflow-hidden border border-white/25">
              {[['EN', 'English'], ['NE', 'नेपाली']].map(([code, text]) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1 ${lang === code ? 'bg-white text-nt-dark font-semibold' : 'text-white/80 hover:bg-white/10'}`}
                >
                  {text}
                </button>
              ))}
            </div>
            {/* Client Care dropdown (like NTC's "Self Care") */}
            <div className="relative group">
              <button className="flex items-center gap-2 bg-nt-red hover:bg-red-700 px-4 h-9 font-semibold transition-colors">
                <FaUserCircle /> Client Care <FaChevronDown size={9} />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute right-0 top-full w-48 bg-white text-ink-900 shadow-xl border-t-2 border-nt-red">
                {user ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-3 hover:bg-nt-sky">My dashboard</Link>
                    <button onClick={onLogout} className="block w-full text-left px-4 py-3 hover:bg-nt-sky text-nt-red">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-3 hover:bg-nt-sky">Login</Link>
                    <Link to="/register" className="block px-4 py-3 hover:bg-nt-sky">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Main bar ---------- */}
      <nav className="bg-white border-b border-nt-blue/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" onClick={close} className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Construction Work logo" className="h-10 w-auto" />
            <div className="leading-tight">
              <span className="block text-base font-extrabold text-nt-blue tracking-wide">CONSTRUCTION WORK</span>
              <span className="block text-[10px] font-semibold text-nt-red tracking-[0.2em]">PVT. LTD.</span>
            </div>
          </NavLink>

          <ul className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.to}><NavLink to={item.to} end={item.end} className={linkCls}>{item.label}</NavLink></li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="px-5 py-2.5 bg-nt-blue hover:bg-nt-dark text-white text-sm font-semibold rounded-sm transition-colors">Dashboard</Link>
                <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2.5 border border-nt-red text-nt-red text-sm font-semibold rounded-sm hover:bg-nt-red hover:text-white transition-colors">
                  Logout <FaSignOutAlt />
                </button>
              </>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-nt-red hover:bg-red-700 text-white text-sm font-semibold rounded-sm transition-colors">Client Login</Link>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-nt-blue text-2xl p-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ---------- Mobile menu ---------- */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-nt-blue/10 ${mobileOpen ? 'max-h-[560px]' : 'max-h-0'}`}>
          <ul className="px-6 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={close}
                  className={({ isActive }) => `block py-3 text-sm font-semibold border-b border-gray-100 ${isActive ? 'text-nt-red' : 'text-ink-900'}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-4 pb-2">
              {user ? (
                <div className="flex gap-3">
                  <Link to="/dashboard" onClick={close} className="flex-1 text-center py-3 bg-nt-blue text-white text-sm font-semibold rounded-sm">Dashboard</Link>
                  <button onClick={() => { onLogout(); close(); }} className="flex-1 py-3 border border-nt-red text-nt-red text-sm font-semibold rounded-sm">Logout</button>
                </div>
              ) : (
                <Link to="/login" onClick={close} className="block text-center py-3 bg-nt-red text-white text-sm font-semibold rounded-sm">Client Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
