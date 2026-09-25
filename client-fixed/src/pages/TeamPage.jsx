import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { getTeam } from '../services/api.js';

import story1 from "../assets/images/team1.jpg";
import story2 from "../assets/images/team2.jpg";
import story3 from "../assets/images/team3.jpg";
import story4 from "../assets/images/team4.jpg";

/* ---------------- Swiper Imports ---------------- */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

/* ---------------- Swiper CSS ---------------- */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

/* ---------------- Header Gallery Images ---------------- */
const headerImages = [story1, story2, story3, story4];

/* ---------------- Page Header ---------------- */
const PageHeader = ({ title, subtitle }) => (
  <header className="relative w-full h-[55vh] md:h-[65vh] bg-black">
    <Swiper
      modules={[Autoplay, Pagination, EffectFade, Navigation]}
      effect="fade"
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true, dynamicBullets: true }}
      navigation={true}
      loop={true}
      className="w-full h-full"
    >
      {headerImages.map((img, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Match the sleek dark gradient from Home/About pages instead of blocky text backgrounds */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10 flex flex-col justify-center items-center text-center px-6 pointer-events-none">
      <span className="text-bright-green font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base drop-shadow-md">
        Leadership & Expertise
      </span>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase drop-shadow-lg">
        {title}
      </h1>
      <div className="w-24 h-1 bg-bright-green mx-auto mb-6"></div>
      <p className="text-lg md:text-2xl text-gray-200 font-light max-w-3xl drop-shadow-md">
        {subtitle}
      </p>
    </div>
  </header>
);

const teamData = [
  { id: 1, name: 'Mr. Allama Noor', designation: 'Managing Director', imageUrl: 'https://placehold.co/400x500/003366/FFFFFF?text=Director' },
  { id: 2, name: 'Mr. Jafar Shaikh', designation: 'Chief Executive Officer (CEO)', imageUrl: 'https://placehold.co/400x500/003366/FFFFFF?text=CEO' },
  { id: 3, name: 'Ms. Aisha Khan', designation: 'Chief Architect', imageUrl: 'https://placehold.co/400x500/003366/FFFFFF?text=Architect' },
  { id: 4, name: 'Mr. Rohan Gupta', designation: 'Head, Project Management', imageUrl: 'https://placehold.co/400x500/003366/FFFFFF?text=Project+Head' },
];

const TeamPage = () => {
  const [team, setTeam] = useState(teamData);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeam();
        if (response.data && response.data.length > 0) {
          setTeam(response.data);
        }
      } catch (error) {
        console.error('Could not fetch team from server, showing default data:', error.message);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="team-page font-sans text-gray-800 bg-gray-50">
      
      <PageHeader 
        title="Our Expert Team" 
        subtitle="Meet the visionaries and engineers who turn your blueprints into reality."
      />

      <section className="py-20 md:py-32 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-bright-green font-bold tracking-widest uppercase text-sm">The Foundation</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-deep-blue mt-2 mb-6 uppercase">Executive Leadership</h2>
          <div className="w-24 h-1 bg-deep-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Decades of combined experience driving innovation, safety, and structural excellence across every sector.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member) => (
            <div
              key={member._id || member.id}
              className="group relative bg-white rounded-sm shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Image with Grayscale to Color hover effect (Premium agency look) */}
              <div className="w-full h-80 overflow-hidden relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* Social Overlay that slides up on hover */}
                <div className="absolute inset-0 bg-deep-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="w-10 h-10 bg-bright-green text-white flex items-center justify-center rounded-sm hover:bg-white hover:text-deep-blue transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="w-10 h-10 bg-bright-green text-white flex items-center justify-center rounded-sm hover:bg-white hover:text-deep-blue transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
                    <FaEnvelope />
                  </a>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 text-center border-t-4 border-transparent group-hover:border-bright-green transition-colors duration-300">
                <h3 className="text-xl font-bold text-deep-blue uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-sm text-bright-green font-semibold mt-2 tracking-wider uppercase">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Team Banner */}
      <section className="py-20 bg-deep-blue text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-6">Want to Build with Us?</h2>
          <p className="text-lg text-gray-300 mb-10 font-light">
            We are always looking for driven engineers, architects, and project managers to join our growing roster.
          </p>
          <a href="/contact" className="inline-block border-2 border-bright-green text-bright-green font-bold py-3 px-10 rounded-sm text-lg uppercase tracking-wider hover:bg-bright-green hover:text-deep-blue transition-all duration-300">
            View Careers
          </a>
        </div>
      </section>

    </div>
  );
};

export default TeamPage;