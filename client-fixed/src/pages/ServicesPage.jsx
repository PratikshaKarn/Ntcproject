import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBuilding,
  FaDraftingCompass,
  FaTools,
  FaCouch,
  FaHandshake,
  FaProjectDiagram,
  FaArrowRight,
  FaCube,
} from "react-icons/fa";
import { getServices } from '../services/api.js';

/* ---------------- Page Header ---------------- */
const PageHeader = ({ title, subtitle }) => (
  <header className="relative w-full py-24 md:py-32 bg-charcoal overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    />
    <div className="container mx-auto px-6 relative z-10 text-center">
      <span className="text-site-orange font-bold tracking-[0.3em] uppercase mb-4 text-sm block">
        What We Do
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase">
        {title}
      </h1>
      <div className="w-20 h-[3px] bg-site-orange mx-auto mb-6"></div>
      <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  </header>
);

/* ---------------- Wireframe glow card visual ---------------- */
const WireframeGlow = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 300 300" className="w-56 h-56 md:w-64 md:h-64 opacity-90">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#22d3ee" strokeWidth="1" filter="url(#glow)" opacity="0.85">
        <polygon points="150,40 250,95 250,205 150,260 50,205 50,95" />
        <polygon points="150,90 210,125 210,195 150,230 90,195 90,125" />
        <line x1="150" y1="40" x2="150" y2="90" />
        <line x1="250" y1="95" x2="210" y2="125" />
        <line x1="250" y1="205" x2="210" y2="195" />
        <line x1="150" y1="260" x2="150" y2="230" />
        <line x1="50" y1="205" x2="90" y2="195" />
        <line x1="50" y1="95" x2="90" y2="125" />
      </g>
    </svg>
  </div>
);

const iconList = [<FaBuilding />, <FaDraftingCompass />, <FaTools />, <FaCouch />, <FaHandshake />, <FaProjectDiagram />];

const defaultServicesData = [
  { title: 'Building Construction', description: 'Specializing in residential houses, luxury apartments, commercial complexes, industrial warehouses, and large-scale institutional projects.' },
  { title: 'Engineering & Consultancy', description: 'Expert civil, structural, mechanical, and electrical engineering. We provide feasibility studies, cost estimation, and rigorous quality control.' },
  { title: 'Renovation & Maintenance', description: 'Comprehensive building repair, modern remodeling, and structural renovation. We ensure the longevity of industrial and residential structures.' },
  { title: 'Architectural & Interior Design', description: 'End-to-end office and residential interior solutions — from initial spatial concept and 3D design to flawless, turnkey execution.' },
  { title: 'Turnkey & Contract Projects', description: 'Complete project execution from blueprint design to final handover. We also successfully manage joint-venture and public-private (PPP) works.' },
  { title: 'Project Management', description: 'Strategic project planning, precise budgeting, and on-site management services from start to finish to guarantee on-time delivery.' },
];

const ServicesPage = () => {
  const [servicesData, setServicesData] = useState(defaultServicesData);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.data && response.data.length > 0) {
          setServicesData(response.data);
        }
      } catch (error) {
        console.error('Could not fetch services from server, showing default data:', error.message);
      }
    };
    fetchServices();
  }, []);

  // The 3D wireframe card always sits second in the masonry rhythm
  const wireframeIndex = 1;

  return (
    <div className="services-page font-sans text-gray-800 bg-charcoal">
      <PageHeader
        title="Our Services"
        subtitle="A comprehensive, one-stop solution for all your construction and engineering needs."
      />

      {/* Masonry-style service grid */}
      <section className="py-20 md:py-28 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-site-orange font-bold tracking-widest uppercase text-sm">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6 uppercase">Expertise Across Sectors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [&>*:nth-child(1)]:lg:row-span-2 [&>*:nth-child(4)]:lg:row-span-2">
          {servicesData.map((service, index) => {
            const isWireframe = index === wireframeIndex;
            return (
              <div
                key={index}
                className={`relative overflow-hidden bg-charcoal-card border border-white/10 hover:border-site-orange/60 p-9 rounded-sm transition-all duration-300 group flex flex-col justify-end min-h-[260px] ${index === 0 || index === 3 ? 'lg:min-h-[560px]' : ''}`}
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)',
                }}
              >
                {isWireframe && <WireframeGlow />}

                <div className="relative z-10">
                  <div className="text-3xl text-site-orange group-hover:text-cyan-glow transition-colors duration-300 mb-6">
                    {isWireframe ? <FaCube /> : iconList[index % iconList.length]}
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-3 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* metallic edge accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-site-orange/0 via-site-orange to-site-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal-light text-white text-center border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-6">Need a Custom Solution?</h2>
          <p className="text-lg text-gray-400 mb-10 font-light">
            Our engineering team is ready to analyze your requirements and draft a tailored proposal for your next big project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-teal-accent hover:bg-teal-accent-dark text-white font-bold py-4 px-10 rounded-sm text-lg uppercase tracking-wider transition-all duration-300"
          >
            Request a Consultation <FaArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
