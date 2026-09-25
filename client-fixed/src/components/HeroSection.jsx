import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = ({ title, subtitle, buttonText, buttonLink, imageUrl }) => {
  
  // Use a default dark bg if no image is provided
  const heroStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : { backgroundColor: '#0B1220' }; // Matches your deep-blue/footer dark color

  return (
    <section 
      className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center bg-cover bg-center border-b-4 border-bright-green" 
      style={heroStyle}
    >
      {/* Sleek Gradient Overlay instead of flat black */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      
      <div className="container mx-auto relative z-10 text-white px-6">
        <span className="text-bright-green font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base drop-shadow-md block">
          Construction Work
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight uppercase drop-shadow-lg max-w-5xl mx-auto">
          {title}
        </h1>
        <div className="w-24 h-1 bg-bright-green mx-auto mb-6"></div>
        <p className="text-xl md:text-2xl mb-10 font-light max-w-3xl mx-auto text-gray-200 drop-shadow-md">
          {subtitle}
        </p>
        <Link 
          to={buttonLink} 
          className="inline-flex items-center gap-3 bg-bright-green text-white font-bold py-4 px-10 rounded-sm text-lg uppercase tracking-wider hover:bg-white hover:text-deep-blue shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
        >
          {buttonText}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;