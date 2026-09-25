import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaPlus, FaMinus, FaCheck, FaTimes } from 'react-icons/fa';

/* ---------------- DATA ---------------- */

const mainCategories = [
  {
    id: 'architectural',
    title: 'Architectural Design Packages',
    description: 'Comprehensive design, 2D layouts, and 3D elevations for your dream project.',
    imageUrl: 'https://images.pexels.com/photos/1105786/pexels-photo-1105786.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'construction',
    title: 'Construction Packages',
    description: 'End-to-end building solutions with premium materials and expert execution.',
    imageUrl: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'supervision',
    title: 'Site Supervision Packages',
    description: 'Expert engineers to monitor, manage, and assure quality at your site.',
    imageUrl: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'approval',
    title: 'Approval & Documentation',
    description: 'Hassle-free government approvals, NOCs, and legal documentation services.',
    imageUrl: 'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const architecturalComparisonData = [
  { service: "Concept Floor Plan (All Floors)", basic: true, standard: true, premium: true, ultra: true },
  { service: "Furniture Layout (2D - All Floors)", basic: false, standard: true, premium: true, ultra: true },
  { service: "Column Placement Layout", basic: true, standard: true, premium: true, ultra: true },
  { service: "Staircase Planning", basic: true, standard: true, premium: true, ultra: true },
  { service: "Site Plan / Plot Layout", basic: false, standard: true, premium: true, ultra: true },
  { service: "2D Elevation Design", basic: false, standard: true, premium: true, ultra: true },
  { service: "3D Front Elevation", basic: false, standard: false, premium: true, ultra: true },
  { service: "Electrical Layout (All Floors)", basic: false, standard: true, premium: true, ultra: true },
  { service: "Plumbing Layout (All Floors)", basic: false, standard: true, premium: true, ultra: true },
  { service: "Septic Tank & Borewell Position", basic: false, standard: true, premium: true, ultra: true },
  { service: "Rain Water Harvesting Layout", basic: false, standard: false, premium: true, ultra: true },
  { service: "Structural Drawings (Footing/Column/Beam/Slab)", basic: false, standard: true, premium: true, ultra: true },
  { service: "Working Drawings (All Floors)", basic: false, standard: false, premium: true, ultra: true },
  { service: "Door/Window Schedule", basic: false, standard: false, premium: true, ultra: true },
  { service: "Section Drawing (Building Section)", basic: false, standard: false, premium: true, ultra: true },
  { service: "Compound Wall & Gate Design", basic: false, standard: false, premium: false, ultra: true },
  { service: "3D Interior Design", basic: false, standard: false, premium: false, ultra: true },
  { service: "False Ceiling Layout", basic: false, standard: false, premium: false, ultra: true },
  { service: "Modular Kitchen Layout", basic: false, standard: false, premium: false, ultra: true },
  { service: "Wardrobe Design Layout", basic: false, standard: false, premium: false, ultra: true },
  { service: "Material & Color Selection Support", basic: false, standard: false, premium: true, ultra: true },
  { service: "BOQ / Cost Estimation (Optional Add-on)", basic: false, standard: false, premium: false, ultra: true }
];

const detailedPackagesData = {
  architectural: [
    {
      id: 'basic', name: 'BASIC DESIGN', price: '5', unit: 'per sqft',
      sections: [
        { title: 'Concept Design', items: ['Concept Floor Plan (All Floors)', 'Column Placement Layout', 'Staircase Planning'] },
        { title: 'Revisions', items: ['1 Time Revision'] },
        { title: "What's Not Included", items: ['Furniture Layout', '3D Elevations', 'Electrical & Plumbing Layouts'] }
      ]
    },
    {
      id: 'standard', name: 'STANDARD DESIGN', price: '10', unit: 'per sqft',
      sections: [
        { title: 'Concept Design', items: ['Floor Plan & Furniture Layout', 'Site Plan / Plot Layout'] },
        { title: 'Elevations & Structural', items: ['2D Elevation Design', 'Structural Drawings (Footing/Slab/Beam)'] },
        { title: 'MEP Layouts', items: ['Electrical Layout', 'Plumbing Layout', 'Septic & Borewell Position'] },
        { title: 'Revisions', items: ['2 Times Revisions'] }
      ]
    },
    {
      id: 'premium', name: 'PREMIUM DESIGN', price: '15', unit: 'per sqft',
      sections: [
        { title: 'Concept Design & 3D', items: ['All Standard Features', '3D Front Elevation'] },
        { title: 'Detailed Working Drawings', items: ['Working Drawings (All Floors)', 'Door/Window Schedule', 'Section Drawing (Building Section)'] },
        { title: 'Consultation', items: ['Rain Water Harvesting Layout', 'Material & Color Selection Support'] },
        { title: 'Revisions', items: ['3 Times Revisions'] }
      ]
    },
    {
      id: 'ultra', name: 'ULTRA PREMIUM', price: '25', unit: 'per sqft',
      sections: [
        { title: 'Complete Architecture & 3D', items: ['All Premium Features', '3D Interior Design', 'Compound Wall & Gate Design'] },
        { title: 'Interior Detailing', items: ['False Ceiling Layout', 'Modular Kitchen Layout', 'Wardrobe Design Layout'] },
        { title: 'Estimation', items: ['BOQ / Cost Estimation (Included)'] },
        { title: 'Revisions', items: ['Unlimited Revisions*'] }
      ]
    }
  ],
  construction: [
    {
      id: 'basic', name: 'BASIC PACKAGE', price: '1999', unit: 'per sqft',
      sections: [
        { title: 'Design', items: ['SCHEME DRAWING : ALL FLOORS (2D)', 'ELEVATION DESIGN : (3D)'] },
        { title: 'Project Management', items: ['Dedicated Site Engineer', 'Weekly Progress Reports'] },
        { title: 'Structure', items: ['Steel (TMT)', 'Cement (Grade 43/53)', 'Bricks / Blocks'] },
        { title: 'Bathroom & Plumbing', items: ['CPVC / PVC Pipes', 'Basic Sanitary Fittings'] },
        { title: 'Flooring', items: ['Standard Vitrified Tiles'] },
        { title: 'Kitchen & Dining', items: ['Granite Countertop', 'Stainless Steel Sink'] },
        { title: 'Door, Windows and Railing', items: ['Flush Doors', 'Aluminum Windows'] },
        { title: 'Painting', items: ['2 Coats Putty', 'Interior Tractor Emulsion'] },
        { title: 'Electrical', items: ['Fire Resistant Wires', 'Basic Switches'] },
        { title: "What's Not Included", items: ['Furniture', 'Govt Approvals & Taxes'] }
      ]
    },
    {
      id: 'standard', name: 'STANDARD PACKAGE', price: '2499', unit: 'per sqft',
      sections: [
        { title: 'Design', items: ['SCHEME DRAWING : ALL FLOORS (2D)', 'ELEVATION DESIGN : (3D)', 'HALF LAYOUT : ALL FLOORS (3D)', 'ELECTRICAL DRAWINGS : ALL FLOORS (2D)', 'PLUMBING DRAWING : ALL FLOORS (2D)', 'WORKING DRAWING : ALL FLOORS (2D)'] },
        { title: 'Project Management', items: ['Dedicated Engineer', 'CCTV Monitoring Access'] },
        { title: 'Structure', items: ['Premium TMT Steel', 'Top Grade Cement'] },
        { title: 'Bathroom & Plumbing', items: ['Branded CPVC/UPVC', 'Standard Jaquar Fittings'] },
        { title: 'Flooring', items: ['Premium Vitrified Tiles', 'Anti-skid Bathroom Tiles'] },
        { title: 'Kitchen & Dining', items: ['Premium Granite', 'Double Sink', 'Dado Tiles'] },
        { title: 'Door, Windows and Railing', items: ['Teak Wood Main Door', 'UPVC Windows'] },
        { title: 'Painting', items: ['Premium Emulsion', 'Weatherproof Exterior'] },
        { title: 'Electrical', items: ['Polycab/Havells Wires', 'Modular Switches'] },
        { title: "What's Not Included", items: ['Compound Wall', 'Borewell'] }
      ]
    },
    {
      id: 'premium', name: 'PREMIUM PACKAGE', price: '2999', unit: 'per sqft',
      sections: [
        { title: 'Design', items: ['SCHEME DRAWING : ALL FLOORS (2D)', 'ELEVATION DESIGN : (3D)', 'HALF LAYOUT : ALL FLOORS (3D)', 'ELECTRICAL DRAWINGS : ALL FLOORS (2D)', 'PLUMBING DRAWING : ALL FLOORS (2D)', 'WORKING DRAWING : ALL FLOORS (2D)', 'SOIL TEST REPORT', 'STRUCTURAL DRAWINGS', 'FURNITURE LAYOUT : ALL FLOORS (2D)', 'ELEVATION DETAIL DRAWING : (2D)'] },
        { title: 'Project Management', items: ['Senior Project Manager', 'Daily Updates via App'] },
        { title: 'Structure', items: ['Primary Brand Steel (Tata/JSW)', 'UltraTech Cement'] },
        { title: 'Bathroom & Plumbing', items: ['Premium Jaquar/Kohler Fittings', 'Concealed Cisterns'] },
        { title: 'Flooring', items: ['Italian Marble Finish Tiles', 'Wooden Flooring in Master Bed'] },
        { title: 'Kitchen & Dining', items: ['Quartz Countertop', 'Modular Kitchen Accessories'] },
        { title: 'Door, Windows and Railing', items: ['Solid Teak Doors', 'System Aluminum Windows', 'SS Glass Railing'] },
        { title: 'Painting', items: ['Royale Luxury Emulsion', 'Texture Paint Highlight'] },
        { title: 'Electrical', items: ['Legrand/Schneider Switches', 'Smart Home Prep'] },
        { title: "What's Not Included", items: ['Loose Furniture', 'Home Appliances'] }
      ]
    },
    {
      id: 'ultra', name: 'ULTRA LUXURY', price: '3699', unit: 'per sqft',
      sections: [
        { title: 'Design', items: ['SCHEME DRAWING : ALL FLOORS (2D)', 'ELEVATION DESIGN : (3D)', 'HALF LAYOUT : ALL FLOORS (3D)', 'ELECTRICAL DRAWINGS : ALL FLOORS (2D)', 'PLUMBING DRAWING : ALL FLOORS (2D)', 'WORKING DRAWING : ALL FLOORS (2D)', 'SOIL TEST REPORT', 'STRUCTURAL DRAWINGS', 'FURNITURE LAYOUT : ALL FLOORS (2D)', 'ELEVATION DETAIL DRAWING : (2D)', 'SITE ASSESSMENT & SITE PLAN', 'INTERIOR VIEWS : ALL FLOORS (3D)', 'INTERIOR DETAILING : ALL ROOMS (2D)', 'INTERIOR 3D WALK-THROUGH', 'APPROVAL DRAWING', 'LANDSCAPING ARCHITECTURAL DESIGNS'] },
        { title: 'Project Management', items: ['Full-time Site Engineer', 'Quality Audit Reports'] },
        { title: 'Structure', items: ['Custom Structural Design', 'Waterproofing Guarantees'] },
        { title: 'Bathroom & Plumbing', items: ['Grohe/Kohler Luxury Fittings', 'Shower Enclosures'] },
        { title: 'Flooring', items: ['Imported Italian Marble', 'Premium Hardwood Flooring'] },
        { title: 'Kitchen & Dining', items: ['Fully Custom Modular Kitchen', 'Built-in Appliance Prep'] },
        { title: 'Door, Windows and Railing', items: ['Premium Veneer Doors', 'Soundproof Windows', 'Toughened Glass Railing'] },
        { title: 'Painting', items: ['Premium PU Polish on Doors', 'Luxury Interior/Exterior Finishes'] },
        { title: 'Electrical', items: ['Full Smart Home Automation', 'Premium Lighting Fixtures'] },
        { title: "What's Not Included", items: ['Land Purchase Costs'] }
      ]
    }
  ],
  supervision: [
    {
      id: 'basic', name: 'BASIC VISITS', price: '1999', unit: 'per month',
      sections: [
        { title: 'Site Visits', items: ['2 Visits Per Week', 'Stage-wise Inspection'] },
        { title: 'Quality Checks', items: ['Basic Material Check (Cement/Steel)', 'Curing Process Verification'] },
        { title: 'Reporting', items: ['Weekly WhatsApp Updates'] }
      ]
    },
    {
      id: 'standard', name: 'STANDARD SUPERVISION', price: '2499', unit: 'per month',
      sections: [
        { title: 'Site Visits', items: ['Alternate Day Visits', 'Critical Pouring Supervision (Slab)'] },
        { title: 'Quality Checks', items: ['Detailed Material Audits', 'Plumbing & Electrical Check'] },
        { title: 'Reporting', items: ['Detailed Weekly PDF Report'] }
      ]
    },
    {
      id: 'premium', name: 'PREMIUM SUPERVISION', price: '3699', unit: 'per month',
      sections: [
        { title: 'Site Deployment', items: ['Full-time Junior Site Engineer (Mon-Sat)'] },
        { title: 'Quality Checks', items: ['End-to-End Quality Assurance', 'BBS Check'] },
        { title: 'Reporting & Billing', items: ['Daily Progress Reports', 'Contractor Bill Verification'] }
      ]
    },
    {
      id: 'ultra', name: 'TURNKEY MANAGEMENT', price: '5099', unit: 'per month',
      sections: [
        { title: 'Site Deployment', items: ['Full-time Senior Site Engineer', 'Dedicated Project Manager'] },
        { title: 'Quality & Safety', items: ['Strict Safety Protocol Enforcement', 'Third-party Material Lab Testing'] },
        { title: 'Reporting & Billing', items: ['Complete BOQ Tracking & Bill Certification'] }
      ]
    }
  ],
  approval: [
    {
      id: 'basic', name: 'BASIC APPROVALS', price: '35,000', unit: 'lumpsum',
      sections: [
        { title: 'Municipal Approvals', items: ['Panchayat / Basic Municipal Sanction'] },
        { title: 'Documentation', items: ['Filing Application', 'Fee Challan Generation'] }
      ]
    },
    {
      id: 'standard', name: 'STANDARD APPROVALS', price: '65,000', unit: 'lumpsum',
      sections: [
        { title: 'Municipal Approvals', items: ['Building Plan Sanction (BDA/Brundhat)', 'Soil & Structural Certificate Filing'] },
        { title: 'Utility NOCs', items: ['Temporary Electricity NOC', 'Water Board NOC'] }
      ]
    },
    {
      id: 'premium', name: 'PREMIUM APPROVALS', price: '1,10,000', unit: 'lumpsum',
      sections: [
        { title: 'Municipal Approvals', items: ['Complete Building Plan Sanction', 'Deviation Checking & Management'] },
        { title: 'Utility NOCs', items: ['Permanent Electricity Connection', 'Permanent Water & Sewage Connection'] }
      ]
    },
    {
      id: 'ultra', name: 'TURNKEY DOCUMENTATION', price: '1,75,000', unit: 'lumpsum',
      sections: [
        { title: 'End-to-End Approvals', items: ['Commencement Certificate (CC)', 'Occupancy Certificate (OC)'] },
        { title: 'Special NOCs', items: ['Fire Department NOC', 'Pollution Control Board NOC'] }
      ]
    }
  ]
};

/* ---------------- NEW PREMIUM THEMES FOR CARDS ---------------- */
const cardThemes = {
  basic: {
    card: 'border-white/10 hover:border-white/25 bg-[#1f232b]',
    header: 'bg-gradient-to-b from-white/[0.04] to-transparent border-t-4 border-gray-500',
    title: 'text-gray-400',
    price: 'text-white',
    unit: 'text-gray-500',
    button: 'bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15'
  },
  standard: {
    card: 'border-cyan-glow/20 hover:border-cyan-glow/50 bg-[#1f232b] shadow-cyan-glow/5',
    header: 'bg-gradient-to-b from-cyan-glow/10 to-transparent border-t-4 border-cyan-glow/70',
    title: 'text-cyan-glow',
    price: 'text-white',
    unit: 'text-gray-500',
    button: 'bg-cyan-glow/10 hover:bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/30'
  },
  premium: {
    card: 'border-site-orange shadow-2xl shadow-site-orange/20 md:scale-105 z-10 bg-[#1b1e24]', // Pops out — matte copper
    header: 'bg-[#1b1e24] border-t-4 border-site-orange relative',
    title: 'text-site-orange',
    price: 'text-white',
    unit: 'text-gray-400',
    button: 'bg-site-orange hover:bg-site-orange/90 text-white shadow-md border border-site-orange',
    badge: 'MOST POPULAR'
  },
  ultra: {
    card: 'border-teal-accent/30 hover:border-teal-accent/60 bg-[#1f232b] shadow-teal-accent/5',
    header: 'bg-gradient-to-b from-teal-accent/10 to-transparent border-t-4 border-teal-accent',
    title: 'text-teal-accent',
    price: 'text-white',
    unit: 'text-gray-500',
    button: 'bg-teal-accent hover:bg-teal-accent-dark text-white border border-teal-accent'
  }
};

/* ---------------- UPGRADED ACCORDION COMPONENT ---------------- */
const AccordionSection = ({ title, items, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        type="button" 
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }} 
        className="w-full flex justify-between items-center py-4 px-5 bg-transparent hover:bg-white/[0.04] transition-colors group"
      >
        <span className="font-bold text-[13px] md:text-sm text-gray-300 uppercase tracking-wide text-left group-hover:text-site-orange transition-colors">{title}</span>
        <span className={`shrink-0 ml-4 p-1.5 rounded-full transition-colors ${isOpen ? 'bg-site-orange/15 text-site-orange' : 'bg-white/5 text-gray-500 group-hover:bg-site-orange/15 group-hover:text-site-orange'}`}>
          {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
        </span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-2 bg-transparent">
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <FaCheck className="text-teal-accent mt-1 shrink-0" size={12} />
                <span className="text-sm font-medium text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ---------------- COMPARISON TABLE COMPONENT ---------------- */
const ComparisonTable = () => {
  return (
    <div className="mb-24 w-full bg-[#1b1e24] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
      <div className="p-6 md:p-8 text-center md:text-left border-b border-white/10 bg-[#111317] flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-white">Services Included</h2>
          <p className="text-teal-accent font-medium text-sm mt-1 uppercase tracking-widest">Architectural Design Blueprint</p>
        </div>
        <p className="text-gray-400 text-sm max-w-sm text-center md:text-right">
          A detailed comparison of our architectural design packages. Choose the features that best suit your project's needs.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#1f232b] border-b border-white/10">
              <th className="px-6 py-5 font-bold text-gray-300 uppercase tracking-wider text-sm sticky left-0 bg-[#1f232b] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">Services</th>
              <th className="px-6 py-5 text-center border-l border-white/10">
                <div className="font-extrabold text-white uppercase tracking-wider">BASIC</div>
                <div className="text-teal-accent text-xs font-bold mt-1">₹5/sq.ft</div>
              </th>
              <th className="px-6 py-5 text-center border-l border-white/10">
                <div className="font-extrabold text-white uppercase tracking-wider">STANDARD</div>
                <div className="text-teal-accent text-xs font-bold mt-1">₹10/sq.ft</div>
              </th>
              <th className="px-6 py-5 text-center border-l border-white/10">
                <div className="font-extrabold text-white uppercase tracking-wider">PREMIUM</div>
                <div className="text-teal-accent text-xs font-bold mt-1">₹15/sq.ft</div>
              </th>
              <th className="px-6 py-5 text-center border-l border-white/10">
                <div className="font-extrabold text-white uppercase tracking-wider">ULTRA PREMIUM</div>
                <div className="text-teal-accent text-xs font-bold mt-1">₹25/sq.ft</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {architecturalComparisonData.map((row, index) => (
              <tr key={index} className="hover:bg-[#1f232b]/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-300 text-sm sticky left-0 bg-[#1b1e24] z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">
                  {row.service}
                </td>
                <td className="px-6 py-4 text-center border-l border-white/10">
                  {row.basic ? <FaCheck className="inline text-teal-accent" /> : <FaTimes className="inline text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center border-l border-white/10">
                  {row.standard ? <FaCheck className="inline text-teal-accent" /> : <FaTimes className="inline text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center border-l border-white/10">
                  {row.premium ? <FaCheck className="inline text-teal-accent" /> : <FaTimes className="inline text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center border-l border-white/10">
                  {row.ultra ? <FaCheck className="inline text-teal-accent" /> : <FaTimes className="inline text-red-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-white/10 bg-[#111317] flex justify-between items-center text-sm text-gray-400">
        <span className="font-bold text-gray-300 uppercase">Revisions Policy:</span>
        <span className="flex gap-4 font-medium">
          <span><b>Basic:</b> 1 Time</span> | 
          <span><b>Standard:</b> 2 Times</span> | 
          <span><b>Premium:</b> 3 Times</span> | 
          <span className="text-teal-accent"><b>Ultra:</b> Unlimited*</span>
        </span>
      </div>
    </div>
  );
};

/* ---------------- PAGE HEADER ---------------- */
const PageHeader = ({ title, subtitle }) => (
  <header className="relative w-full py-24 md:py-32 bg-[#1b1e24] text-white text-center border-b-4 border-site-orange overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#1b1e24]/80 to-transparent"></div>
    
    <div className="container mx-auto px-6 relative z-10">
      <span className="text-site-orange font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base drop-shadow-md block">
        Services & Pricing
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold uppercase drop-shadow-lg mb-6">
        {title}
      </h1>
      <div className="w-24 h-1 bg-site-orange mx-auto mb-6"></div>
      <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  </header>
);

/* ---------------- MAIN COMPONENT ---------------- */
const OurPackages = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [openSections, setOpenSections] = useState({
    basic: 'Design',
    standard: 'Design',
    premium: 'Design',
    ultra: 'Design'
  });

  const toggleSection = (packageId, sectionTitle) => {
    setOpenSections(prev => ({
      ...prev,
      [packageId]: prev[packageId] === sectionTitle ? null : sectionTitle
    }));
  };

  const activeDetailedPackages = selectedCategory ? detailedPackagesData[selectedCategory.id] : [];

  return (
    <div className="packages-page font-sans text-gray-300 bg-charcoal pb-24">
      
      <PageHeader
        title={selectedCategory ? selectedCategory.title : "Our Packages"}
        subtitle={selectedCategory 
          ? `Detailed cost breakdowns and inclusions for ${selectedCategory.title.toLowerCase()}.` 
          : "Comprehensive building solutions tailored to your scope, scale, and vision."
        }
      />

      <section className="py-16 md:py-24 container mx-auto px-4 max-w-[1400px]">
        
        {/* ======================================================== */}
        {/* VIEW 1: MAIN CATEGORIES & COMPARISON TABLE */}
        {/* ======================================================== */}
        {!selectedCategory && (
          <div>
            <ComparisonTable />

            <div className="text-center mb-16 mt-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase mb-4">Choose a Service Domain</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Select one of our specialized domains below to view the detailed plans, pricing, and features for construction, supervision, or approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {mainCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="group relative h-80 rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-white/10 hover:border-site-orange/50 transition-colors duration-300"
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenSections({}); 
                  }}
                >
                  <img 
                    src={category.imageUrl} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1b1e24]/70 group-hover:bg-[#1b1e24]/50 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h3 className="text-3xl font-extrabold mb-2">{category.title}</h3>
                    <p className="text-gray-200 mb-6">{category.description}</p>
                    <div className="flex items-center text-site-orange font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                      View Plans <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: PREMIUM PRICING GRID */}
        {/* ======================================================== */}
        {selectedCategory && (
          <div className="animate-fade-in">
            
            <div className="flex justify-center md:justify-start mb-10 max-w-7xl mx-auto">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(null);
                }}
                className="flex items-center text-white font-bold uppercase tracking-widest hover:text-site-orange transition-colors bg-white/5 px-6 py-3 rounded-full shadow-md border border-white/15 cursor-pointer"
              >
                <FaArrowLeft className="mr-3" /> Back to All Services
              </button>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase mb-4">Select Your Plan</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Detailed cost breakdowns and inclusions for {selectedCategory.title.toLowerCase()}.
              </p>
            </div>

            {/* UPGRADED 4-COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start max-w-7xl mx-auto">
              {activeDetailedPackages.map((pkg) => {
                const theme = cardThemes[pkg.id] || cardThemes.basic;

                return (
                  <div key={pkg.id} className={`relative rounded-2xl flex flex-col transition-all duration-300 border bg-clip-padding ${theme.card}`}>
                    
                    {/* Dynamic Premium Header */}
                    <div className={`p-8 text-center rounded-t-2xl ${theme.header}`}>
                      {theme.badge && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-site-orange text-white text-[11px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-md">
                          {theme.badge}
                        </div>
                      )}
                      <h3 className={`text-sm font-black tracking-widest uppercase mb-4 ${theme.title}`}>{pkg.name}</h3>
                      <div className="flex justify-center items-end gap-1">
                        <span className={`text-5xl font-black tracking-tight ${theme.price}`}>₹{pkg.price}</span>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider block mt-2 ${theme.unit}`}>{pkg.unit}</span>
                    </div>

                    {/* Accordion List Body */}
                    <div className="flex-grow border-x border-white/10 bg-transparent">
                      {pkg.sections.map((section, idx) => (
                        <AccordionSection 
                          key={idx}
                          title={section.title}
                          items={section.items}
                          isOpen={openSections[pkg.id] === section.title}
                          onToggle={() => toggleSection(pkg.id, section.title)}
                        />
                      ))}
                    </div>

                    {/* Footer Enquire Button */}
                    <div className="p-6 bg-transparent border-x border-b border-white/10 rounded-b-2xl flex justify-center">
                      <Link
                        to="/contact"
                        className={`w-full text-center font-extrabold py-3.5 px-6 rounded-xl uppercase tracking-wider transition-colors ${theme.button}`}
                      >
                        Enquire Now
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}
      </section>
    </div>
  );
};

export default OurPackages;