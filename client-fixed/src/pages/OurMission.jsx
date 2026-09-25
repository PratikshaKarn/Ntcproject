import React from "react";
import { Link } from "react-router-dom";
import { 
  FaBullseye, 
  FaEye, 
  FaShieldAlt, 
  FaGem, 
  FaHardHat, 
  FaHandshake, 
  FaTrophy,
  FaArrowRight
} from "react-icons/fa";

const OurMission = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      
      {/* Mission & Vision Split Section */}
      <section className="py-20 md:py-32 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Mission Card */}
          <div className="bg-white p-10 md:p-14 shadow-sm border-t-4 border-deep-blue relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl group-hover:scale-110 transition-transform duration-500">
              <FaBullseye />
            </div>
            <div className="relative z-10">
              <span className="text-bright-green font-bold tracking-widest uppercase text-sm">Our Purpose</span>
              <h2 className="text-4xl font-extrabold text-deep-blue mt-2 mb-6 uppercase">Our Mission</h2>
              <div className="w-16 h-1 bg-bright-green mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Delivering high-quality construction that meets global standards. Ensuring timely completion with excellence in every detail. Adopting modern technology and sustainable practices.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Building long-term relationships with clients through transparency and reliability, and contributing to India’s infrastructure growth by developing safe and durable projects.
              </p>
              <div className="mt-8 p-6 bg-gray-50 border-l-4 border-bright-green">
                <p className="text-xl font-bold text-deep-blue italic">
                  “We don’t just build structures; we build trust.”
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-deep-blue text-white p-10 md:p-14 shadow-sm border-t-4 border-bright-green relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl group-hover:scale-110 transition-transform duration-500">
              <FaEye />
            </div>
            <div className="relative z-10">
              <span className="text-bright-green font-bold tracking-widest uppercase text-sm">Our Future</span>
              <h2 className="text-4xl font-extrabold mt-2 mb-6 uppercase">Our Vision</h2>
              <div className="w-16 h-1 bg-bright-green mb-6"></div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                We aspire to shape the future of modern construction through technology and creativity. We aim to deliver projects that set entirely new benchmarks in safety, architectural design, and environmental sustainability.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our vision is to build lasting relationships with clients, partners, and communities while expanding our presence across India and global markets through unwavering excellence.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Grid Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-bright-green font-bold tracking-widest uppercase text-sm">The Foundation</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-deep-blue mt-2 mb-6 uppercase">Our Core Values</h2>
            <div className="w-24 h-1 bg-deep-blue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At <strong className="text-deep-blue">CONSTRUCTION WORK</strong>, our values define who we are and guide every single structure we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaShieldAlt />, title: "Integrity", desc: "Honesty, transparent reporting, and strictly ethical business practices." },
              { icon: <FaGem />, title: "Quality", desc: "The highest global standards in workmanship, engineering, and materials." },
              { icon: <FaHardHat />, title: "Innovation", desc: "Leveraging modern construction technology and creative structural solutions." },
              { icon: <FaTrophy />, title: "Safety", desc: "Uncompromising protocols prioritizing the well-being of our teams and communities." },
              { icon: <FaHandshake />, title: "Teamwork", desc: "Growing together through tight-knit collaboration, respect, and shared goals." },
              { icon: <FaBullseye />, title: "Client Focus", desc: "Consistently exceeding client expectations on every project, every time." }
            ].map((val, i) => (
              <div key={i} className="flex items-start gap-5 p-8 bg-gray-50 rounded-sm border border-gray-100 hover:border-bright-green hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl text-gray-300 group-hover:text-bright-green transition-colors duration-300 mt-1">
                  {val.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-blue mb-2 uppercase tracking-wide">{val.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 bg-bright-green text-white font-bold py-4 px-10 rounded-sm text-lg uppercase tracking-wider hover:bg-deep-blue hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default OurMission;