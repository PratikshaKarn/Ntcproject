import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from './layout/Topbar.jsx';
import Footer from './layout/FooterAdmin.jsx';
import { 
  ClipboardList, FileText, Banknote, UserCircle, Menu, X,
  CheckCircle, Hourglass, Calendar, AlertCircle, LayoutDashboard, Clock
} from 'lucide-react';

// --- Empty State Component for New Users ---
const EmptyPortfolioState = () => (
  <div className="bg-white p-10 w-full rounded-2xl shadow-xl text-center border-t-4 border-red-600 mt-10">
    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <ClipboardList className="text-gray-400 w-10 h-10" />
    </div>
    <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Portfolio Empty</h2>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      No services purchased yet. Please contact us to buy our services and unlock your project tracking dashboard.
    </p>
    <Link 
      to="/contact" 
      className="inline-block bg-nt-blue hover:bg-nt-dark text-white font-bold py-3 px-8 rounded-sm transition-all duration-300 shadow-lg hover:-translate-y-1"
    >
      Contact to Buy Services
    </Link>
  </div>
);

// --- Main Dashboard Component ---
const UserDashboard = ({ user }) => {
  // Default tab set to the new Project Overview
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Profile Picture State
  const [profilePic, setProfilePic] = useState(localStorage.getItem(`user_pic_${user?.id || user?._id}`) || null);

  // Live Data States
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user portfolio data from the database
  useEffect(() => {
    const fetchMyPortfolio = async () => {
      const userId = user?.id || user?._id; 

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_BASE}/auth/users/${userId}/portfolio`);
        if (response.ok) {
          const data = await response.json();
          setLiveData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && (user.id || user._id)) {
      fetchMyPortfolio();
    } else {
      setLoading(false);
    }
  }, [user]);

  // --- Profile Picture Upload Handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      localStorage.setItem(`user_pic_${user?.id || user?._id}`, imageUrl);
      // NOTE: You can also add an API call here to upload the file to your backend server
    }
  };

  if (loading) return <div className="h-dvh flex items-center justify-center text-xl font-bold text-nt-blue">Loading your dashboard...</div>;

  const userData = {
    name: user?.name || "Guest User",
    clientCode: liveData?.clientCode || user?.clientCode || "Pending...",
    hasPurchasedServices: liveData?.hasPurchasedServices || false 
  };

  const menuItems = [
    { id: 'overview', label: 'Project Overview', icon: <LayoutDashboard /> },
    { id: 'assignment', label: 'Assignment Status', icon: <ClipboardList /> },
    { id: 'compliance', label: 'Compliance & Approvals', icon: <FileText /> },
    { id: 'payment', label: 'Financial Overview', icon: <Banknote /> },
  ];

  // Helper function to render colored status badges
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
      case 'Approved':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> {status}</span>;
      case 'In Progress':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12}/> {status}</span>;
      case 'Pending':
      case 'On Hold':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Hourglass size={12}/> {status}</span>;
      case 'Rejected':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle size={12}/> {status}</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{status || 'Not Started'}</span>;
    }
  };

  // ==========================================
  // REAL DATA RENDERING (Dynamically from Admin)
  // ==========================================

  // 1. OVERVIEW & TIMELINE TAB
  const renderOverviewTab = () => {
    const tl = liveData?.portfolio?.timeline || {};
    const steps = [
      { key: 'layoutPlan', label: 'Layout Plan' },
      { key: 'design2D', label: '2D Design' },
      { key: 'elevation3D', label: '3D Elevation' },
      { key: 'approvalPending', label: 'Govt. Approval' },
      { key: 'constructionStart', label: 'Construction Start' }
    ];

    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">Project Timeline</h2>
        <div className="relative border-l-4 border-blue-100 ml-4 space-y-8 pb-4">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8">
              {/* Stepper Circle Indicator */}
              <div className={`absolute -left-3.5 top-0 w-6 h-6 rounded-full border-4 flex items-center justify-center ${tl[step.key] ? 'bg-green-500 border-green-200' : 'bg-gray-200 border-white shadow-sm'}`}>
                {tl[step.key] && <CheckCircle className="text-white w-3 h-3" />}
              </div>
              <h3 className={`text-lg font-bold ${tl[step.key] ? 'text-gray-800' : 'text-gray-400'}`}>
                {step.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {tl[step.key] ? 'Phase completed / Verified' : 'Pending or in progress'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 2. ASSIGNMENT STATUS TAB
  const renderAssignmentTab = () => {
    const tasks = liveData?.portfolio?.assignmentStatus || [];
    if (tasks.length === 0 || !tasks[0].taskName) return <p className="p-8 bg-white rounded-2xl shadow border border-gray-100 text-center text-gray-500">No tasks assigned yet.</p>;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Detailed Task Progress</h2>
        {tasks.map((task, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
              <h3 className="text-xl font-bold text-blue-900">{task.taskName}</h3>
              <div>{renderStatusBadge(task.status)}</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-gray-600">Progress</span>
                <span className="text-sm font-bold text-blue-600">{task.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className={`h-3 rounded-full transition-all duration-500 ${task.progress == 100 ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${task.progress || 0}%` }}></div>
              </div>
            </div>

            {/* Date Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400 w-5 h-5"/>
                <div><p className="text-xs text-gray-500 font-bold uppercase">Start Date</p><p className="text-sm font-semibold text-gray-800">{task.startDate || 'TBD'}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-400 w-5 h-5"/>
                <div><p className="text-xs text-gray-500 font-bold uppercase">Expected Completion</p><p className="text-sm font-semibold text-gray-800">{task.expectedDate || 'TBD'}</p></div>
              </div>
            </div>

            {/* Admin Remarks */}
            {task.remarks && (
              <div className="mt-4 p-4 bg-blue-50/50 border-l-4 border-blue-400 rounded-r-lg text-sm text-gray-700">
                <span className="font-bold text-blue-900">Admin Notes: </span> {task.remarks}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 3. COMPLIANCE & APPROVALS TAB
  const renderComplianceTab = () => {
    const docs = liveData?.portfolio?.complianceStatus || [];
    if (docs.length === 0 || !docs[0].documentName) return <p className="p-8 bg-white rounded-2xl shadow border border-gray-100 text-center text-gray-500">No compliance documents available.</p>;

    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">Compliance & Approvals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-bold text-gray-600 border-b">Document / Phase</th>
                <th className="px-4 py-3 font-bold text-gray-600 border-b">Status</th>
                <th className="px-4 py-3 font-bold text-gray-600 border-b">Date Updated</th>
                <th className="px-4 py-3 font-bold text-gray-600 border-b">Verified By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 font-bold text-gray-800">{doc.documentName}</td>
                  <td className="px-4 py-4">{renderStatusBadge(doc.status)}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{doc.dateUpdated || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-blue-800">{doc.verifiedBy || 'Pending Verification'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 4. FINANCIAL OVERVIEW TAB
  const renderPaymentTab = () => {
    const fin = liveData?.portfolio?.financials || {};
    const total = parseFloat(fin.totalCost) || 0;
    const paid = parseFloat(fin.amountPaid) || 0;
    const balance = total - paid;

    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 border-b pb-4">Financial Overview</h2>
        
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Total Project Cost</p>
            <p className="text-3xl font-black text-blue-900">₹ {total.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
            <p className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">Total Amount Paid</p>
            <p className="text-3xl font-black text-green-900">₹ {paid.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
            <p className="text-sm text-red-600 font-bold uppercase tracking-wider mb-1">Outstanding Balance</p>
            <p className="text-3xl font-black text-red-900">₹ {balance.toLocaleString()}</p>
          </div>
        </div>

        {/* Next Installment Details Alert */}
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between border-l-8 border-yellow-500">
          <div>
            <h3 className="text-lg font-bold text-gray-200">Next Installment Details</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
              <p className="text-gray-400">Due Date: <span className="font-bold text-white">{fin.nextInstallmentDate || "TBD"}</span></p>
              <p className="text-gray-400">Amount: <span className="font-bold text-yellow-400 text-xl">₹ {(parseFloat(fin.nextInstallmentAmount) || 0).toLocaleString()}</span></p>
            </div>
          </div>
          <button className="mt-6 md:mt-0 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
            Pay Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-paper font-sans">
      {/* Fixed header: never scrolls */}
      <Topbar
        onMenuClick={() => setIsSidebarOpen(true)}
        label={userData.name}
        showNotifications={false}
        profileTo={null}
      />

      <div className="flex flex-1 min-h-0">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 flex flex-col overflow-y-auto scroll-area bg-brand-400 text-white shadow-2xl transition-transform duration-300 ease-in-out md:static md:z-auto md:translate-x-0 md:shadow-none ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="bg-nt-red p-6 text-center relative">
            <button className="absolute top-3 right-3 text-white md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>

            <div className="relative w-24 h-24 mx-auto bg-white rounded-full mb-4 overflow-hidden border-4 border-white/60 group">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="userPicUpload" />
              <label htmlFor="userPicUpload" className="cursor-pointer w-full h-full flex items-center justify-center relative">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="text-gray-300 w-full h-full" strokeWidth={1} />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold">Upload</span>
                </div>
              </label>
            </div>

            <h2 className="text-lg font-bold text-white truncate">{userData.name}</h2>
            <p className="text-sm mt-1 text-white/90">Client Code: {userData.clientCode}</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <p className="px-3 text-xs font-semibold text-white/50 mb-3">Dashboard menu</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                disabled={!userData.hasPurchasedServices}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id && userData.hasPurchasedServices
                    ? 'bg-white/15 text-white border-l-4 border-nt-red'
                    : 'text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <span className="[&>svg]:w-5 [&>svg]:h-5">{item.icon}</span>
                <span className="text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content column: only <main> scrolls, footer stays pinned */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 min-h-0 overflow-y-auto scroll-area p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
              {!userData.hasPurchasedServices ? (
                <EmptyPortfolioState />
              ) : (
                <div className="w-full">
                  {activeTab === 'overview' && renderOverviewTab()}
                  {activeTab === 'assignment' && renderAssignmentTab()}
                  {activeTab === 'compliance' && renderComplianceTab()}
                  {activeTab === 'payment' && renderPaymentTab()}
                </div>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
