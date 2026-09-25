import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ title, description, imageUrl, projectLink = "#" }) => {
  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group flex flex-col border border-gray-100 relative">
      
      {/* Subtle Hover Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-bright-green transition-colors duration-300 z-20"></div>

      {/* Image Container with Grayscale to Color Effect */}
      <div className="w-full h-64 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        {/* Dark overlay that fades out slightly on hover */}
        <div className="absolute inset-0 bg-deep-blue/40 group-hover:bg-deep-blue/10 transition-colors duration-500 mix-blend-multiply"></div>
      </div>
      
      {/* Content Container */}
      <div className="p-8 flex-grow flex flex-col bg-white z-10">
        <h3 className="text-xl font-extrabold text-deep-blue mb-4 uppercase tracking-wide leading-snug">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 flex-grow line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        <Link 
          to={projectLink} 
          className="mt-auto inline-flex items-center gap-2 font-bold text-deep-blue hover:text-bright-green transition-colors duration-300 uppercase text-sm tracking-widest group/link"
        >
          View Details 
          <FaArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      
    </div>
  );
};

export default ProjectCard;