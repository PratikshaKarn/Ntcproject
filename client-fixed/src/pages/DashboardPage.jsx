import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSignOutAlt, FaUserCircle, FaHardHat, FaFileInvoiceDollar,
  FaClipboardCheck, FaCalendarAlt, FaPhoneAlt, FaArrowRight,
} from 'react-icons/fa';
import {
  Building2, ClipboardCheck, Wallet, FileText, Clock,
  CheckCircle2, MessageSquare, Download, ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Sample summary data — swap for the real /api/auth/users/:id/portfolio
    response once this page is wired to live data (see UserDashboard.jsx
    for the existing fetch pattern).                                    */
/* ------------------------------------------------------------------ */
const summary = {
  activeProjects: 1,
  overallProgress: 62,
  pendingApprovals: 2,
  nextPaymentDue: '₹1,25,000',
  nextPaymentDate: '15 Sep 2026',
};

const milestones = [
  { label: 'Layout Plan', done: true },
  { label: '2D Design', done: true },
  { label: '3D Elevation', done: true },
  { label: 'Govt. Approval', done: false, active: true },
  { label: 'Construction Start', done: false },
];

const documents = [
  { name: 'Site Layout Approval.pdf', status: 'Verified', date: '12 Aug 2026' },
  { name: 'Structural Drawing Set.pdf', status: 'Verified', date: '02 Aug 2026' },
  { name: 'Municipal NOC.pdf', status: 'Pending', date: 'Awaiting upload' },
];

const activity = [
  { text: 'Site engineer marked "Foundation" as complete', time: '2 days ago' },
  { text: 'Admin uploaded Structural Drawing Set.pdf', time: '4 days ago' },
  { text: 'Payment of ₹2,00,000 received', time: '1 week ago' },
];

const modules = [
  { icon: Building2, title: 'Project Timeline', desc: 'Track every construction phase', to: '/dashboard' },
  { icon: ClipboardCheck, title: 'Compliance & Approvals', desc: 'Government docs & sign-offs', to: '/dashboard' },
  { icon: Wallet, title: 'Financials', desc: 'Invoices, payments & balance', to: '/dashboard' },
  { icon: MessageSquare, title: 'Talk to Your Engineer', desc: 'Site queries & support', to: '/contact' },
];

const statusPill = (status) => {
  const map = {
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return `text-xs font-bold px-3 py-1 rounded-full border ${map[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`;
};

const DashboardPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#f6f7f9] font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ---------------- Welcome / Identity Bar ---------------- */}
        <div className="relative overflow-hidden bg-deep-blue text-white rounded-2xl shadow-lg">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-bright-green/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-bright-green/40 flex items-center justify-center shrink-0">
                <FaUserCircle className="text-4xl text-bright-green" />
              </div>
              <div>
                <p className="text-bright-green font-bold tracking-widest uppercase text-[11px] mb-1">
                  Construction Work Client Portal
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Welcome back, {user?.name || 'Client'}
                </h1>
                <p className="text-white/60 text-sm mt-1">
                  Client Code: <span className="text-white font-semibold">{user?.clientCode || '—'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden sm:flex items-center gap-2 border border-white/20 hover:border-bright-green text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaPhoneAlt className="text-xs" /> Contact Engineer
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-red-600 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- KPI Stat Cards ---------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Projects', value: summary.activeProjects, icon: FaHardHat, accent: 'text-deep-blue bg-blue-50' },
            { label: 'Overall Progress', value: `${summary.overallProgress}%`, icon: ClipboardCheck, accent: 'text-bright-green bg-emerald-50' },
            { label: 'Pending Approvals', value: summary.pendingApprovals, icon: FileText, accent: 'text-amber-600 bg-amber-50' },
            { label: 'Next Payment', value: summary.nextPaymentDue, icon: FaFileInvoiceDollar, accent: 'text-red-600 bg-red-50' },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
                <Icon className="text-lg" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ---------------- Left: Timeline + Documents ---------------- */}
          <div className="lg:col-span-2 space-y-6">

            {/* Project Timeline */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">Project Timeline</h2>
                <span className="text-xs font-bold text-bright-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {summary.overallProgress}% Complete
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                <div
                  className="h-2 rounded-full bg-bright-green transition-all duration-500"
                  style={{ width: `${summary.overallProgress}%` }}
                />
              </div>

              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={m.label} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        m.done
                          ? 'bg-bright-green border-bright-green text-white'
                          : m.active
                          ? 'border-deep-blue text-deep-blue'
                          : 'border-gray-200 text-gray-300'
                      }`}
                    >
                      {m.done ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    <div className="pt-1">
                      <p className={`font-bold ${m.done || m.active ? 'text-gray-900' : 'text-gray-400'}`}>
                        {m.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {m.done ? 'Completed' : m.active ? 'In progress' : 'Not started'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents & Compliance */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide">Documents & Compliance</h2>
                <button className="text-xs font-bold text-deep-blue hover:text-bright-green transition-colors flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        <FileText size={15} className="text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={statusPill(doc.status)}>{doc.status}</span>
                      <button className="text-gray-300 hover:text-deep-blue transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------- Right: Modules + Activity ---------------- */}
          <div className="space-y-6">

            {/* Quick Modules */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide mb-5">Quick Access</h2>
              <div className="space-y-3">
                {modules.map(({ icon: Icon, title, desc, to }) => (
                  <Link
                    key={title}
                    to={to}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-bright-green hover:bg-emerald-50/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-deep-blue/5 group-hover:bg-bright-green/10 flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={18} className="text-deep-blue group-hover:text-bright-green transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-gray-800">{title}</p>
                      <p className="text-xs text-gray-400 truncate">{desc}</p>
                    </div>
                    <FaArrowRight className="text-gray-300 group-hover:text-bright-green group-hover:translate-x-0.5 transition-all text-xs shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-extrabold text-gray-900 uppercase tracking-wide mb-5">Recent Activity</h2>
              <div className="relative space-y-6 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-px before:bg-gray-100">
                {activity.map((item) => (
                  <div key={item.text} className="relative pl-6">
                    <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-bright-green/15 border-2 border-bright-green" />
                    <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={11} /> {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Payment Banner */}
            <div className="bg-deep-blue text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 text-bright-green text-xs font-bold uppercase tracking-widest mb-2">
                <FaCalendarAlt /> Upcoming Payment
              </div>
              <p className="text-2xl font-extrabold mb-1">{summary.nextPaymentDue}</p>
              <p className="text-white/60 text-xs mb-4">Due on {summary.nextPaymentDate}</p>
              <button className="w-full bg-bright-green hover:bg-white hover:text-deep-blue text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
