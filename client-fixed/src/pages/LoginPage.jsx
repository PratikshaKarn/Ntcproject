import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { FaArrowRight, FaLock } from 'react-icons/fa';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginUser(formData);
      onLogin(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans bg-charcoal overflow-hidden px-6">

      {/* Abstract 3D geometric mesh wireframe backdrop */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="meshFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#d5772f" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#meshFade)" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100 - 120} />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100 + 120} y2="800" />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/70 to-charcoal pointer-events-none" />

      {/* Centered frosted glass card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-sm p-10 md:p-12 shadow-2xl">

        <div className="flex flex-col items-center text-center mb-9">
          <div className="w-14 h-14 rounded-full border border-site-orange/50 flex items-center justify-center text-site-orange text-xl mb-6">
            <FaLock />
          </div>
          <span className="text-site-orange font-bold tracking-[0.25em] uppercase text-xs mb-2">
            Client Secure Access
          </span>
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide">
            Account Login
          </h2>
          <p className="text-gray-400 text-sm mt-3">Please enter your authorized credentials.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/40 text-red-300 text-sm font-semibold text-center rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-sm border border-white/15 bg-white/5 text-white placeholder-gray-500 focus:bg-white/10 focus:border-teal-accent focus:ring-1 focus:ring-teal-accent outline-none transition-all duration-300"
              placeholder="client@example.com" required
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label htmlFor="password" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Password
              </label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-gray-500 hover:text-site-orange transition-colors uppercase tracking-widest">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password" id="password" name="password"
              value={formData.password} onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-sm border border-white/15 bg-white/5 text-white placeholder-gray-500 focus:bg-white/10 focus:border-teal-accent focus:ring-1 focus:ring-teal-accent outline-none transition-all duration-300"
              placeholder="••••••••" required
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-teal-accent hover:bg-teal-accent-dark text-white py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:bg-gray-600 group mt-2"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
            {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-site-orange hover:text-cyan-glow font-bold uppercase tracking-wider transition-colors duration-200">
              Register here
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
