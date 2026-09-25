import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowsAltH } from 'react-icons/fa';
import { getProjects } from '../services/api.js';

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
        Our Legacy
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

/* ---------------- Blueprint-to-Reality slider (used on the featured tile) ---------------- */
const BlueprintSlider = ({ imageUrl }) => {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full h-full select-none">
      <img src={imageUrl} alt="Completed building" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={imageUrl} alt="Blueprint concept" className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90" draggable={false} />
        <div className="absolute inset-0 bg-cyan-glow/20 mix-blend-multiply" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
      </div>
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/90 pointer-events-none" style={{ left: `${pos}%` }} />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-site-orange text-white flex items-center justify-center shadow-lg pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <FaArrowsAltH className="text-xs" />
      </div>
      <input
        type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Drag to compare blueprint and finished building"
      />
      <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/50 px-2 py-1 rounded z-10">Blueprint</span>
      <span className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/50 px-2 py-1 rounded z-10">Reality</span>
    </div>
  );
};

const projectImageUrl = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80";
const filters = ['All', 'Commercial', 'Industrial', 'Residential', 'Institutional'];

const allProjectsData = [
  { _id: '1', category: 'Commercial', title: 'Modern Commercial Plaza, Sitamarhi (Concept)', description: 'A conceptual commercial plaza design demonstrating our capability to develop sustainable, space-efficient, and regulation-compliant commercial infrastructure.', imageUrl: projectImageUrl },
  { _id: '2', category: 'Residential', title: 'Luxury Residential Tower, Muzaffarpur (Proposed)', description: 'A proposed high-rise residential project showcasing our expertise in eco-friendly construction, premium amenities planning, and modern urban living solutions.', imageUrl: projectImageUrl },
  { _id: '3', category: 'Industrial', title: 'Industrial Warehouse, Darbhanga (Design Study)', description: 'A detailed design study reflecting our ability to plan and execute large-scale industrial warehouses with efficient logistics flow, safety standards, and durability.', imageUrl: projectImageUrl },
  { _id: '4', category: 'Commercial', title: 'IT Tech Park, Patna (Concept)', description: 'A conceptual multi-storey IT park project highlighting our strength in modern infrastructure planning, green building practices, and scalable commercial development.', imageUrl: projectImageUrl },
  { _id: '5', category: 'Residential', title: 'Private Villa, Sitamarhi (Proposed)', description: 'A proposed luxury villa design showcasing our attention to architectural detailing, structural quality, and customized residential construction.', imageUrl: projectImageUrl },
  { _id: '6', category: 'Institutional', title: 'University Campus Building, Madhubani (Concept)', description: 'A conceptual educational infrastructure project demonstrating our capability to design and build large-scale institutional facilities with a focus on safety, quality, and long-term usability.', imageUrl: projectImageUrl },
];

const ProjectsPage = () => {
  const [projects, setProjects] = useState(allProjectsData);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data && response.data.length > 0) {
          setProjects(response.data.map((p) => ({ ...p, category: p.category || 'Commercial' })));
        }
      } catch (error) {
        console.error('Could not fetch projects from server, showing default data:', error.message);
      }
    };
    fetchProjects();
  }, []);

  const visibleProjects = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="projects-page font-sans text-gray-800 bg-charcoal">
      <PageHeader
        title="Our Portfolio"
        subtitle="A glimpse into the diverse structures we have designed, proposed, and engineered."
      />

      <section className="py-20 md:py-28 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10">
          <span className="text-site-orange font-bold tracking-widest uppercase text-sm">Featured Work</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-8 uppercase">Signature Projects</h2>

          {/* Pill filter tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-site-orange border-site-orange text-white'
                    : 'border-white/20 text-gray-400 hover:border-site-orange hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Edge-to-edge photography grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 mt-14 bg-white/5">
          {visibleProjects.map((project, i) => (
            <div key={project._id} className="relative group h-80 overflow-hidden bg-charcoal-card">
              {i === 0 ? (
                <BlueprintSlider imageUrl={project.imageUrl} />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-site-orange text-[10px] font-bold uppercase tracking-[0.2em]">{project.category}</span>
                <h3 className="text-white font-extrabold uppercase text-sm mt-1 leading-snug">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal-light relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-400 mb-10 font-light">
            Whether it's a private villa or a commercial high-rise, Construction Work is ready to turn your blueprint into reality.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-teal-accent hover:bg-teal-accent-dark text-white font-bold py-4 px-12 rounded-sm text-lg uppercase tracking-wider transition-all duration-300"
          >
            Contact Our Engineers <FaArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;
