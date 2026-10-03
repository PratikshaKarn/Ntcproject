import React, { useState, useRef, useEffect } from 'react';
import NtcQuickPanel from '../components/NtcQuickPanel.jsx';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import { getProjects } from '../services/api.js';
import {
  FaHardHat, FaShieldAlt, FaHandshake, FaClock, FaArrowRight,
  FaChevronLeft, FaChevronRight, FaArrowsAltH,
} from 'react-icons/fa';

/* ============================================================ */
/*  Blueprint-to-Reality drag slider                              */
/* ============================================================ */
const BlueprintScroll = () => {
  const [pos, setPos] = useState(50);

  return (
    <div className="w-full">
      <p className="text-center text-white/70 text-sm md:text-base font-semibold tracking-wide uppercase mb-4">
        Blueprint-to-Reality Scroll
      </p>
      <div className="relative w-full h-[280px] md:h-[340px] rounded-lg overflow-hidden shadow-2xl border border-white/10 select-none">
        {/* Reality layer (full photo, sits underneath) */}
        <img
          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Completed building"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Blueprint layer (clipped by drag position) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Blueprint concept"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90"
            draggable={false}
          />
          <div className="absolute inset-0 bg-blue-800/60 mix-blend-multiply" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/90 pointer-events-none"
          style={{ left: `${pos}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-site-orange text-white flex items-center justify-center shadow-lg pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <FaArrowsAltH className="text-sm" />
        </div>

        {/* Invisible range input driving the drag */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label="Drag to compare blueprint and finished building"
        />

        {/* Labels */}
        <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-widest text-white/80 bg-black/40 px-2 py-1 rounded">
          Blueprint
        </span>
        <span className="absolute bottom-3 right-3 text-[11px] font-bold uppercase tracking-widest text-white/80 bg-black/40 px-2 py-1 rounded">
          Reality
        </span>
      </div>
    </div>
  );
};

/* ============================================================ */
/*  Home Page                                                     */
/* ============================================================ */
const HomePage = () => {
  const defaultProjects = [
    {
      _id: '1',
      title: 'Commercial Infrastructure Solutions',
      description: 'Demonstrates our approach to delivering modern commercial spaces with sustainable materials, efficient layouts, and adherence to regulatory standards.',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    },
    {
      _id: '2',
      title: 'Residential Construction Expertise',
      description: 'Showcases our ability to design and build high-quality residential structures focusing on comfort, safety, and long-term value.',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    },
    {
      _id: '3',
      title: 'Industrial & Warehouse Development',
      description: 'Illustrates our capability to execute industrial and warehouse projects with a strong focus on structural strength, scalability, and operational efficiency.',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    },
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data && response.data.length > 0) {
          setProjects(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Could not fetch projects from server, showing default data:', error.message);
      }
    };
    fetchProjects();
  }, []);

  const capabilities = [
    { title: 'Structural Engineering', desc: 'Precise structural analysis and design ensuring safety, stability, and code compliance on every build.' },
    { title: 'Site Planning', desc: 'Strategic site layout and land-use planning that balances efficiency, access, and long-term growth.' },
    { title: 'Commercial Construction', desc: 'Ground-up delivery of retail, office, and commercial complexes built to modern operational standards.' },
    { title: 'Residential Construction', desc: 'Custom villas, apartments, and housing developments built with quality materials and craftsmanship.' },
    { title: 'Project Management', desc: 'End-to-end scheduling, budgeting, and on-site supervision to keep every phase on track.' },
    { title: 'Permit & Compliance', desc: 'Navigating regulatory approvals and documentation so your project stays fully compliant.' },
  ];

  const processSteps = [
    { label: 'Design', desc: 'Concept development, architectural drawings, and structural planning tailored to your requirements.' },
    { label: 'Excavation', desc: 'Site preparation, groundwork, and foundation excavation carried out to exacting safety standards.' },
    { label: 'Construction', desc: 'Disciplined execution with continuous quality checks, from framework to final finishing.' },
  ];

  const whyUsItems = [
    { icon: <FaHardHat />, title: 'Cutting Edge Technology', desc: 'We leverage advanced construction tech to ensure precision, quality, and workflow efficiency.' },
    { icon: <FaHandshake />, title: 'Ethics & Transparency', desc: 'Honesty and transparent communication form the bedrock of our client relationships.' },
    { icon: <FaShieldAlt />, title: 'Safety Measures', desc: 'Rigorous safety protocols to protect our team, your property, and the community.' },
    { icon: <FaClock />, title: 'Timely Delivery', desc: 'Streamlined project management to deliver high-quality structures strictly on schedule.' },
  ];

  const scrollRef = useRef(null);
  const scrollByCards = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <div className="homepage font-sans text-gray-800 bg-charcoal">

      {/* ================= HERO ================= */}
      <section className="relative bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Structural steel framework"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Headline */}
            <div>
              <span className="text-site-orange font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6 block">
                Construction Work
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase leading-[0.95] mb-8">
                Engineering<br />Reality.
              </h1>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 bg-site-orange hover:bg-white hover:text-charcoal text-white font-bold py-4 px-9 rounded-sm text-sm uppercase tracking-widest transition-all duration-300"
              >
                Our Solutions
              </Link>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70">
                <span>100% Project Delivery</span>
                <span className="w-1 h-1 bg-site-orange rounded-full hidden sm:block" />
                <span>Zero Safety Compromises</span>
                <span className="w-1 h-1 bg-site-orange rounded-full hidden sm:block" />
                <span>Established 2025</span>
              </div>
            </div>

            {/* Right: Blueprint-to-Reality Scroll */}
            <BlueprintScroll />
          </div>
        </div>
      </section>

      <NtcQuickPanel />

      {/* ================= CAPABILITIES / SERVICES ================= */}
      <section className="bg-charcoal-light text-white py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <span className="text-site-orange font-bold tracking-widest uppercase text-xs md:text-sm">What We Do</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-2 uppercase">Capabilities / Services</h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-site-orange hover:border-site-orange transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => scrollByCards(1)}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-site-orange hover:border-site-orange transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="snap-start shrink-0 w-[280px] md:w-[310px] bg-gray-100 text-charcoal rounded-sm p-7 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-extrabold uppercase leading-snug mb-3">{cap.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{cap.desc}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-gray-300 pt-4">
                  <span className="h-[2px] w-10 bg-site-orange" />
                  <FaArrowRight className="text-charcoal" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-charcoal text-white py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-site-orange font-bold tracking-widest uppercase text-xs md:text-sm">How We Work</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-16 uppercase">Process</h2>

          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/15 md:-translate-x-1/2" />
            <div className="space-y-14">
              {processSteps.map((step, i) => (
                <div
                  key={step.label}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-10 ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide mb-2">
                      {step.label}
                    </h3>
                    <p className="text-white/60 text-sm max-w-sm md:ml-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <span className="absolute left-8 md:left-1/2 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-site-orange ring-4 ring-charcoal" />

                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-bright-green font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-deep-blue mt-2 mb-6 uppercase">The Construction Work Advantage</h2>
            <div className="w-24 h-1 bg-bright-green mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are committed to excellence, safety, and innovation in every project we undertake, ensuring your vision becomes a lasting reality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map((item, index) => (
              <div key={index} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-2xl border-b-4 border-transparent hover:border-bright-green transition-all duration-300 group">
                <div className="text-4xl text-gray-300 group-hover:text-bright-green transition-colors duration-300 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LATEST WORK ================= */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <div className="mb-16">
            <span className="text-bright-green font-bold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-deep-blue mt-2 mb-6 uppercase">Our Latest Work</h2>
            <div className="w-24 h-1 bg-bright-green mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A closer look at the structures that define our unwavering commitment to quality engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>

          <div className="mt-16">
            <Link to="/projects" className="inline-block border-2 border-deep-blue text-deep-blue font-bold py-4 px-10 rounded-sm text-lg uppercase tracking-wider hover:bg-deep-blue hover:text-white transition-all duration-300">
              View Entire Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ================= LET'S BUILD CTA ================= */}
      <section className="bg-charcoal text-white py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-extrabold uppercase leading-none">
            Let&rsquo;s Build.
          </h2>
          <Link
            to="/contact"
            className="group flex items-center gap-3 bg-site-orange hover:bg-white hover:text-charcoal text-white font-bold py-4 px-10 rounded-sm text-sm uppercase tracking-widest transition-all duration-300 shrink-0"
          >
            Start Your Project
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
