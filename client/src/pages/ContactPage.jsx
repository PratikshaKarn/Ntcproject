import React from 'react';
import ContactForm from '../components/ContactForm.jsx';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

/* ---------------- Info Row ---------------- */
const InfoRow = ({ icon, title, children }) => (
  <div className="flex items-start gap-5 py-5 border-b border-white/10 last:border-0">
    <div className="text-xl text-site-orange mt-1 shrink-0">{icon}</div>
    <div>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1.5">{title}</h3>
      <div className="text-gray-400 text-sm leading-relaxed space-y-0.5">{children}</div>
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <div className="contact-page font-sans text-gray-800 bg-charcoal">

      <header className="py-16 md:py-20 bg-charcoal text-center border-b border-white/5">
        <span className="text-site-orange font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
          Let's Build Together
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase mb-4">Contact Us</h1>
        <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
          We're ready to discuss your next project with you. Reach out today.
        </p>
      </header>

      {/* Split screen: stylized map / glassmorphism form */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* LEFT: stylized dark map */}
        <div className="relative bg-charcoal-light min-h-[420px] lg:min-h-full overflow-hidden">
          <iframe
            title="Construction Work Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114532.74836696564!2d85.41249911956108!3d26.588806509923386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed240590a3809b%3A0x6b4fbac3db9c6f2a!2sSitamarhi%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-125 invert-[0.9] hue-rotate-180 opacity-70"
          ></iframe>

          {/* overlay tint + grid to keep the "stylized dark map" feel */}
          <div className="absolute inset-0 bg-charcoal/40 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)',
              backgroundSize: '38px 38px',
            }}
          />

          {/* glowing locator beacon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-glow opacity-60"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-site-orange border-2 border-white shadow-[0_0_20px_4px_rgba(34,211,238,0.5)]"></span>
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-charcoal/90 backdrop-blur-sm text-white py-4 px-6 text-center text-xs font-semibold tracking-widest uppercase border-t border-white/10">
            Visit our headquarters to discuss your vision in person.
          </div>
        </div>

        {/* RIGHT: frosted glassmorphism form floating over blurred backdrop */}
        <div className="relative bg-charcoal flex items-center justify-center p-6 md:p-14 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
          />
          <div className="absolute inset-0 bg-charcoal/70" />

          <div className="relative z-10 w-full max-w-lg bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-sm p-8 md:p-10 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">
              Send Us a Message
            </h2>
            <div className="w-14 h-[3px] bg-site-orange mb-8"></div>
            <ContactForm />
          </div>
        </div>

      </section>

      {/* Contact info strip */}
      <section className="bg-charcoal-light border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10">
            <InfoRow icon={<FaMapMarkerAlt />} title="Corporate Office">
              <p>NTC Building, Jawalakhel, Lalitpur, Bagmati Province, PIN code 44700</p>
            </InfoRow>
            <InfoRow icon={<FaEnvelope />} title="Email Address">
              <p><a href="mailto:const@gmail.com" className="hover:text-site-orange transition-colors">const@gmail.com</a></p>
              <p><a href="mailto:projects@constructionwork.com" className="hover:text-site-orange transition-colors">projects@constructionwork.com</a></p>
            </InfoRow>
            <InfoRow icon={<FaPhoneAlt />} title="Phone Lines">
              <p> <span className="text-gray-500">(Office)</span></p>
              <p>+977-9800000000 <span className="text-gray-500">(Projects)</span></p>
            </InfoRow>
            <InfoRow icon={<FaClock />} title="Working Hours">
              <p>Mon &ndash; Fri: 9:00 AM &ndash; 6:00 PM</p>
              <p>Saturday-Sunday: Closed</p>
            </InfoRow>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
