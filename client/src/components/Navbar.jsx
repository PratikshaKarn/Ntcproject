import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '/src/assets/images/image.png';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

/* ---------------- Magnetic CTA Button ---------------- */
const MagneticButton = ({ children, to, onClick, className = '' }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * 0.35, y: relY * 0.45 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const style = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  if (to) {
    return (
      <NavLink
        ref={ref}
        to={to}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`transition-transform duration-150 ease-out will-change-transform ${className}`}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`transition-transform duration-150 ease-out will-change-transform ${className}`}
    >
      {children}
    </button>
  );
};

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses =
    'relative text-white/80 text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition duration-300 py-2 border-b-2 border-transparent';
  const activeNavLinkClasses =
    'relative text-white text-xs font-bold uppercase tracking-[0.15em] py-2 border-b-2 border-cyan-glow drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]';

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/packages', label: 'Packages' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-sans transition-all duration-500 ${
        isScrolled
          ? 'bg-charcoal/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">

        {/* Logo — crisp white + matte copper */}
        <NavLink to="/" className="flex items-center gap-3 group shrink-0" onClick={closeMobileMenu}>
          <img src={logo} alt="Construction Work Logo" className="h-11 w-auto transform group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold text-white tracking-wide">
              CONSTRUCTION WORK
            </span>
            <span className="text-[0.6rem] font-bold text-site-orange tracking-[0.25em] uppercase mt-1">
              Pvt. Ltd.
            </span>
          </div>
        </NavLink>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl p-2 focus:outline-none hover:text-site-orange transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* --- DESKTOP CENTER NAV --- */}
        <ul className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={({ isActive }) => (isActive ? activeNavLinkClasses : navLinkClasses)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* --- DESKTOP RIGHT: CTA --- */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          {user ? (
            <>
              <NavLink to="/dashboard" className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-site-orange transition duration-300">
                <FaUserCircle className="text-base" /> Portal
              </NavLink>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-5 py-2.5 border border-red-500/40 text-red-300 font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-red-500/10 transition-all duration-300"
              >
                Logout <FaSignOutAlt />
              </button>
            </>
          ) : (
            <MagneticButton
              to="/login"
              className="px-7 py-3 bg-site-orange text-white text-xs font-bold uppercase tracking-[0.15em] rounded-sm shadow-[0_0_0_0_rgba(213,119,47,0.6)] hover:shadow-[0_0_18px_2px_rgba(213,119,47,0.5)] inline-block"
            >
              Client Login
            </MagneticButton>
          )}
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`lg:hidden w-full bg-charcoal/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col p-6 space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block text-base font-bold uppercase tracking-wide py-3 border-b border-white/5 transition-colors ${
                    isActive ? 'text-site-orange' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <div className="w-full h-px bg-white/10 my-3"></div>

          {user ? (
            <>
              <li>
                <NavLink to="/dashboard" onClick={closeMobileMenu} className="flex items-center gap-3 text-base font-bold text-site-orange uppercase tracking-wide py-2">
                  <FaUserCircle /> Client Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => { onLogout(); closeMobileMenu(); }}
                  className="w-full flex justify-center items-center gap-2 mt-3 px-6 py-3 border border-red-500/40 text-red-300 font-bold uppercase tracking-wider rounded-sm transition-all duration-300"
                >
                  Logout <FaSignOutAlt />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full text-center mt-3 px-6 py-3.5 bg-site-orange text-white font-bold uppercase tracking-wider rounded-sm"
              >
                Client Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
