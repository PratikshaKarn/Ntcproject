import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaBuilding,
  FaCogs,
  FaDraftingCompass,
  FaTasks,
  FaLightbulb,
  FaBullseye,
  FaEye,
  FaGem,
  FaProjectDiagram,
  FaUsers,
  FaShieldAlt,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";

import story1 from "../assets/images/story1.jpg";
import story2 from "../assets/images/story2.jpg";

/* ---------------- Hero ---------------- */
const Hero = () => (
  <header className="relative w-full min-h-[85vh] bg-charcoal overflow-hidden flex items-center">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-45"
      style={{ backgroundImage: `url(${story1})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

    {/* faint blueprint grid texture */}
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    />

    <div className="relative z-10 container mx-auto px-6 max-w-7xl py-24">
      <span className="text-site-orange font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-5 block">
        Construction &amp; Engineering
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white uppercase leading-[1.05] max-w-3xl">
        Building Legacies <br />
        <span className="text-site-orange">with Precision</span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl font-light max-w-xl mt-8 leading-relaxed">
        A professionally managed construction and engineering firm built on trust, technical rigor, and absolute accountability &mdash; from first sketch to final handover.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-3 mt-10 bg-teal-accent hover:bg-teal-accent-dark text-white font-bold py-4 px-9 rounded-sm text-sm uppercase tracking-widest transition-all duration-300"
      >
        Start a Project <FaArrowRight />
      </Link>
    </div>
  </header>
);

/* ---------------- Capability data (matches "OUR CORE ENGINEERING & CONSTRUCTION CAPABILITIES") ---------------- */
const capabilities = [
  {
    icon: <FaBuilding />,
    title: 'Turnkey Construction',
    desc: 'Seamless project delivery from start to finish under a single point of accountability.',
  },
  {
    icon: <FaCogs />,
    title: 'Civil Engineering',
    desc: 'Structural design and complex civil works engineered to code and built to last.',
  },
  {
    icon: <FaDraftingCompass />,
    title: 'Design &amp; Consultancy',
    desc: 'Architectural and technical guidance from feasibility through final drawings.',
  },
  {
    icon: <FaTasks />,
    title: 'Project Management',
    desc: 'Disciplined scheduling, budgeting, and site coordination on every phase.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Value Engineering',
    desc: 'Optimizing cost efficiency without compromising on quality or safety.',
  },
];

const AboutPage = () => {
  return (
    <div className="about-page font-sans text-gray-800 bg-charcoal">

      <Hero />

      {/* ================= CORE CAPABILITIES ================= */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-site-orange font-bold tracking-widest uppercase text-xs md:text-sm">Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 uppercase leading-tight">
              Our Core Engineering &amp;<br className="hidden md:block" /> Construction Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-charcoal-light border border-site-orange/25 hover:border-site-orange p-8 rounded-sm text-center transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-sm border border-site-orange/40 flex items-center justify-center text-2xl text-site-orange group-hover:bg-site-orange group-hover:text-white transition-all duration-300">
                  {cap.icon}
                </div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wide mb-3">
                  {cap.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/packages"
              className="inline-flex items-center gap-3 border border-teal-accent text-teal-accent hover:bg-teal-accent hover:text-white font-bold py-3.5 px-9 rounded-sm text-sm uppercase tracking-widest transition-all duration-300"
            >
              Explore Our Service Tiers <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= COMPANY OVERVIEW ================= */}
      <section className="py-20 md:py-28 bg-charcoal-light">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-6">
              <span className="text-site-orange font-bold tracking-widest uppercase text-xs md:text-sm">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
                A New-Age Firm, Built on <span className="text-site-orange">Accountability</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                <strong className="text-white">CONSTRUCTION WORK Pvt. Ltd.</strong> is a professionally managed construction and engineering firm established in 2025 with a clear focus on quality-driven execution and transparent project delivery.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                We specialize in residential, commercial, industrial, and institutional infrastructure, offering well-planned construction solutions through contractual, turnkey, and collaborative project models.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our strength lies in combining technical expertise with disciplined project management, ensuring every structure we undertake is efficient, compliant, and built to last generations.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-sm overflow-hidden shadow-2xl relative z-10 border border-white/10">
                <img src={story2} alt="About Construction" className="w-full h-[460px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-site-orange -z-10 rounded-sm hidden sm:block" />
              <div className="absolute -left-6 top-10 bg-charcoal border border-site-orange/40 text-white p-6 rounded-sm shadow-xl z-20 flex items-center gap-4">
                <span className="text-4xl font-extrabold text-site-orange">2025</span>
                <div className="leading-tight font-semibold tracking-wider uppercase text-xs text-gray-300">
                  Year of <br /> Establishment
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-14 bg-teal-accent text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <FaProjectDiagram className="text-3xl mx-auto mb-3 opacity-80" />
              <h4 className="text-3xl font-extrabold mb-1">100%</h4>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90">Project Delivery</p>
            </div>
            <div className="p-4 border-l border-white/20">
              <FaUsers className="text-3xl mx-auto mb-3 opacity-80" />
              <h4 className="text-3xl font-extrabold mb-1">Expert</h4>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90">Engineering Team</p>
            </div>
            <div className="p-4 border-l border-white/20">
              <FaShieldAlt className="text-3xl mx-auto mb-3 opacity-80" />
              <h4 className="text-3xl font-extrabold mb-1">Zero</h4>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90">Safety Compromises</p>
            </div>
            <div className="p-4 border-l border-white/20">
              <FaAward className="text-3xl mx-auto mb-3 opacity-80" />
              <h4 className="text-3xl font-extrabold mb-1">Premium</h4>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90">Quality Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION / VISION / VALUES ================= */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-charcoal-light p-10 border-t-2 border-site-orange hover:-translate-y-1 transition-all duration-300 group rounded-sm">
              <FaBullseye className="text-3xl text-site-orange mb-6" />
              <h3 className="text-xl font-extrabold text-white mb-4 uppercase">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To deliver reliable, safe, and high-quality construction solutions through integrity-driven practices and professional execution.
              </p>
            </div>

            <div className="bg-charcoal-light p-10 border-t-2 border-teal-accent hover:-translate-y-1 transition-all duration-300 group rounded-sm">
              <FaEye className="text-3xl text-teal-accent mb-6" />
              <h3 className="text-xl font-extrabold text-white mb-4 uppercase">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To emerge as a trusted and respected construction partner known for consistency, transparency, and engineering excellence.
              </p>
            </div>

            <div className="bg-charcoal-light p-10 border-t-2 border-site-orange hover:-translate-y-1 transition-all duration-300 group rounded-sm">
              <FaGem className="text-3xl text-site-orange mb-6" />
              <h3 className="text-xl font-extrabold text-white mb-4 uppercase">Our Values</h3>
              <p className="text-gray-400 leading-relaxed">
                Integrity, accountability, unwavering safety consciousness, and continuous improvement form the bedrock of everything we build.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-charcoal-light relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-400 mb-10 font-light">
            Partner with Construction Work to turn your architectural vision into a structural reality.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-teal-accent hover:bg-teal-accent-dark text-white font-bold py-4 px-12 rounded-sm text-lg uppercase tracking-wider transition-all duration-300"
          >
            Contact Us Today
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
