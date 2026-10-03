import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { FaLock, FaEnvelope, FaTasks, FaRupeeSign, FaFileAlt } from 'react-icons/fa';

const PERKS = [
  { icon: FaTasks, text: 'Track every phase of your project' },
  { icon: FaRupeeSign, text: 'See payments and next instalments' },
  { icon: FaFileAlt, text: 'View approvals and compliance documents' },
];

/** Client / admin login, styled after the NTC "Self Care" login. */
const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginUser(formData);
      onLogin(response.data);
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.msg || data?.message ||
        (err.response ? 'Login failed. Please verify your credentials.' : 'Cannot reach the server. Please try again shortly.')
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full pl-10 pr-4 py-3 rounded-sm border border-gray-300 bg-white text-ink-900 placeholder-gray-400 focus:border-nt-blue focus:ring-1 focus:ring-nt-blue outline-none';

  return (
    <div className="bg-nt-sky font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 bg-white shadow-card border-t-4 border-nt-red">
        {/* Left: benefits */}
        <div className="hidden md:flex flex-col justify-center bg-nt-blue text-white p-10">
          <h2 className="text-2xl font-bold">Client Care</h2>
          <p className="mt-2 text-sm text-white/80">Sign in to follow your construction project in one place.</p>
          <ul className="mt-8 space-y-5">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-sm">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0"><Icon /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold text-nt-blue">Account login</h1>
          <p className="text-sm text-ink-400 mt-1">Enter your registered email and password.</p>

          {error && (
            <div role="alert" className="mt-5 p-3 bg-red-50 border border-red-200 text-nt-red text-sm rounded-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1.5">Email address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="client@example.com" required autoComplete="email" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-ink-700">Password</label>
                <Link to="/contact" className="text-xs text-nt-blue hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={inputCls} placeholder="Enter your password" required autoComplete="current-password" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-nt-red hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-sm text-sm font-semibold transition-colors">
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-700 text-center">
            Don't have an account? <Link to="/register" className="text-nt-red font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
