import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { toast } from 'react-hot-toast'; // Error/Success message ke liye
import { FaArrowRight } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // --- YEH HAI FIX ---
      // Register ke baad seedha login page par bhejo
      toast.success('Registration successful! Please log in.');
      navigate('/login'); 
      // --------------------

    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-gray-800 bg-gray-50">
      
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="max-w-md w-full bg-white p-10 rounded-sm shadow-2xl border-t-4 border-deep-blue">
          
          <div className="mb-10">
            <span className="text-bright-green font-bold tracking-widest uppercase text-xs mb-2 block">
              Join The Network
            </span>
            <h2 className="text-3xl font-extrabold text-deep-blue mb-2 uppercase tracking-wide">
              Create an Account
            </h2>
            <div className="w-12 h-1 bg-bright-green mb-4"></div>
            <p className="text-gray-500 text-sm">Partner with Construction Work today.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <label htmlFor="firstName" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">First Name</label>
                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300" required />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300" required />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300" required />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300" required />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-deep-blue uppercase tracking-wider mb-2">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-gray-50 focus:bg-white focus:border-bright-green focus:ring-1 focus:ring-bright-green outline-none transition-all duration-300" required />
            </div>
            
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 bg-bright-green text-white py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-deep-blue transition-all duration-300 disabled:bg-gray-400 group mt-4">
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-deep-blue hover:text-bright-green font-bold uppercase tracking-wider transition-colors duration-200">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Showcase */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/40 to-transparent mix-blend-multiply"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end p-16 text-white">
          <h2 className="text-5xl font-extrabold uppercase mb-4 leading-tight">
            Building the <br/><span className="text-bright-green">Future.</span>
          </h2>
          <p className="text-xl font-light text-gray-300 max-w-md">
            Join a network of professionals dedicated to uncompromising quality and structural excellence.
          </p>
        </div>
      </div>

    </div>
  );
};

export default RegisterPage;