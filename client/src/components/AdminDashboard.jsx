import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Settings, LogOut, Check, Trash2, Plus, FileText, 
  IndianRupee, Briefcase, Bell, AlertCircle, Download, Clock, Search, UserCircle 
} from 'lucide-react';

const AdminDashboard = ({ user, onLogout }) => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Views: 'dashboard', 'users', 'services'
  const [view, setView] = useState('dashboard'); 
  const [selectedUser, setSelectedUser] = useState(null);
  
  // RESTORED: Search State
  const [searchTerm, setSearchTerm] = useState(''); 
  
  // RESTORED: Profile Picture State
  const [profilePic, setProfilePic] = useState(localStorage.getItem(`admin_pic_${user?.id || 'admin'}`) || null);

  // PREMIUM: Updated Portfolio State with Timeline & Advanced Fields
  const [portfolioData, setPortfolioData] = useState({
    financials: { totalCost: 0, amountPaid: 0, nextInstallmentAmount: 0, nextInstallmentDate: '' },
    assignmentStatus: [{ taskName: '', progress: 0, status: 'Not Started', startDate: '', expectedDate: '', remarks: '' }],
    complianceStatus: [{ documentName: '', status: 'Pending', uploadedFile: '', dateUpdated: '', verifiedBy: '' }],
    timeline: { layoutPlan: false, design2D: false, elevation3D: false, approvalPending: true, constructionStart: false }
  });

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth`;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (response.ok) {
        const data = await response.json();
        setRegisteredUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // --- RESTORED: Profile Picture Upload Handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      localStorage.setItem(`admin_pic_${user?.id || 'admin'}`, imageUrl);
    }
  };

  const handleManageService = (client) => {
    setSelectedUser(client);
    
    // SAFE INITIALIZATION (Premium Version)
    const defaultData = {
      financials: { totalCost: 0, amountPaid: 0, nextInstallmentAmount: 0, nextInstallmentDate: '' },
      assignmentStatus: [{ taskName: '', progress: 0, status: 'Not Started', startDate: '', expectedDate: '', remarks: '' }],
      complianceStatus: [{ documentName: '', status: 'Pending', uploadedFile: '', dateUpdated: '', verifiedBy: '' }],
      timeline: { layoutPlan: false, design2D: false, elevation3D: false, approvalPending: true, constructionStart: false }
    };

    if (client.portfolio) {
      setPortfolioData({
        financials: client.portfolio.financials || defaultData.financials,
        assignmentStatus: client.portfolio.assignmentStatus?.length > 0 ? client.portfolio.assignmentStatus : defaultData.assignmentStatus,
        complianceStatus: client.portfolio.complianceStatus?.length > 0 ? client.portfolio.complianceStatus : defaultData.complianceStatus,
        timeline: client.portfolio.timeline || defaultData.timeline
      });
    } else {
      setPortfolioData(defaultData);
    }
    setView('services'); 
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers();
        }
      } catch (error) {
        alert("Error deleting user.");
      }
    }
  };

  // PREMIUM: Save Portfolio with Action Types (Draft, Review, Activate)
  const handleSavePortfolio = async (actionType) => {
    try {
      const response = await fetch(`${API_URL}/users/${selectedUser._id}/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: portfolioData })
      });
      if (response.ok) {
        alert(`Portfolio ${actionType} successfully for ${selectedUser.firstName}!`);
        fetchUsers();
        setView('users');
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving portfolio", error);
    }
  };

  // RESTORED: Search Filter Logic
  const filteredUsers = registeredUsers.filter(u => 
    u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.clientCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a233a] text-white flex flex-col shadow-xl z-20">
        <div className="p-6 text-center border-b border-gray-700">
          
          {/* RESTORED: Admin Profile Picture Upload */}
          <div className="relative w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full border-4 border-gray-600 shadow-inner group">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="adminPicUpload" />
            <label htmlFor="adminPicUpload" className="cursor-pointer w-full h-full rounded-full overflow-hidden flex items-center justify-center relative">
              {profilePic ? (
                <img src={profilePic} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="text-gray-400 w-full h-full" strokeWidth={1} />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Upload</span>
              </div>
            </label>
          </div>

          <h2 className="text-2xl font-bold text-red-500 tracking-wider">ADMIN PANEL</h2>
          <p className="text-sm text-gray-400 mt-2 font-medium">{user.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${view === 'dashboard' ? 'bg-[#27314f] text-white border-l-4 border-blue-500' : 'text-gray-400 hover:bg-[#27314f]'}`}>
             <Briefcase size={20} /> Overview
          </button>
          <button onClick={() => setView('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${view === 'users' ? 'bg-[#27314f] text-white border-l-4 border-blue-500' : 'text-gray-400 hover:bg-[#27314f] hover:text-white'}`}>
            <Users size={20} /> Client Management
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        
        {/* PREMIUM: VIEW 1 - ADMIN DASHBOARD OVERVIEW */}
        {view === 'dashboard' && (
          <div className="p-10 space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>
            
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600"><Briefcase size={24}/></div>
                <div><p className="text-sm text-gray-500 font-bold uppercase">Total Projects</p><p className="text-2xl font-black text-gray-800">{registeredUsers.length}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full text-green-600"><Clock size={24}/></div>
                <div><p className="text-sm text-gray-500 font-bold uppercase">Running Projects</p><p className="text-2xl font-black text-gray-800">{registeredUsers.filter(u => u.hasPurchasedServices).length}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full text-red-600"><AlertCircle size={24}/></div>
                <div><p className="text-sm text-gray-500 font-bold uppercase">Pending Payments</p><p className="text-2xl font-black text-gray-800">5</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-full text-purple-600"><IndianRupee size={24}/></div>
                <div><p className="text-sm text-gray-500 font-bold uppercase">Total Revenue</p><p className="text-2xl font-black text-gray-800">₹ 1.2Cr</p></div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-3">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setView('users')} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700"><Plus size={18}/> Add New Client</button>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700"><Briefcase size={18}/> Add New Project</button>
                <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-700"><IndianRupee size={18}/> Add Payment</button>
                <button className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-600"><FileText size={18}/> Upload Document</button>
                <button className="bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-900"><Download size={18}/> Generate Report</button>
              </div>
            </div>

            {/* Running Projects & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle className="text-red-500"/> Payment Due Alerts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
                    <div><p className="font-bold text-red-900">Jafre Alam</p><p className="text-sm text-red-600">Foundation Work Due</p></div>
                    <div className="text-right"><p className="font-bold text-red-700">₹ 5,00,000</p><p className="text-xs text-red-500 font-bold">12th April (Overdue)</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell className="text-yellow-500"/> Notifications & Approvals</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div><p className="text-sm text-gray-700"><b>Drawing Pending:</b> Client AL003 has not approved 2D layout.</p></li>
                  <li className="flex gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div><p className="text-sm text-gray-700"><b>Site Visit:</b> Scheduled tomorrow for AL001.</p></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* RESTORED: VIEW 2 - USERS LIST (With Search Bar) */}
        {view === 'users' && (
          <div className="p-10">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">User Management</h1>
              
              <div className="flex items-center gap-4">
                {/* Search Box Restored */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 shadow-sm"
                  />
                </div>

                <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200 font-bold text-gray-600">
                  Total Users: <span className="text-blue-600 ml-1">{registeredUsers.length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? ( <div className="p-10 text-center text-gray-500 font-medium">Loading users...</div> ) : (
                <table className="min-w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-bold text-gray-700">Client Code</th>
                      <th className="px-6 py-4 font-bold text-gray-700">Name</th>
                      <th className="px-6 py-4 font-bold text-gray-700">Status</th>
                      <th className="px-6 py-4 font-bold text-gray-700 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Using filteredUsers to enable search */}
                    {filteredUsers.map((client) => (
                      <tr key={client._id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-blue-900">{client.clientCode || 'N/A'}</td>
                        <td className="px-6 py-4 font-medium text-gray-800">{client.firstName} {client.lastName}</td>
                        <td className="px-6 py-4">
                          {client.hasPurchasedServices ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active</span>
                          ) : (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">No Services</span>
                          )}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-3">
                          <button onClick={() => handleManageService(client)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5">
                            <Settings size={16}/> Manage
                          </button>
                          <button onClick={() => handleDeleteUser(client._id, client.firstName)} className="bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5">
                            <Trash2 size={16}/> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan="4" className="p-6 text-center text-gray-500">No users found matching your search.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* PREMIUM: VIEW 3 - ADVANCED MANAGE SERVICES FORM */}
        {view === 'services' && selectedUser && (
          <div className="p-10">
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <button onClick={() => setView('users')} className="text-gray-500 hover:text-blue-600 font-medium mb-6 flex items-center gap-2 transition-colors">
                ← Back to User List
              </button>
              
              <div className="border-b pb-4 mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">Advanced Portfolio Editor</h2>
                <p className="text-gray-500 mt-2 font-medium">Updating data for <span className="text-blue-600">{selectedUser.firstName} {selectedUser.lastName} ({selectedUser.clientCode})</span></p>
              </div>

              {/* Project Timeline Setting */}
              <div className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">1. Project Timeline Status</h3>
                <div className="flex flex-wrap gap-6">
                  {Object.keys(portfolioData.timeline).map(key => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={portfolioData.timeline[key]} onChange={(e) => setPortfolioData({...portfolioData, timeline: {...portfolioData.timeline, [key]: e.target.checked}})} className="w-5 h-5 text-blue-600 rounded" />
                      <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Financial Section */}
              <div className="mb-10">
                <h3 className="text-lg font-bold bg-blue-50 text-blue-900 p-3 rounded-lg mb-4 border border-blue-100">2. Financial Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Total Cost (₹)</label>
                    <input type="number" value={portfolioData.financials.totalCost} onChange={(e) => setPortfolioData({...portfolioData, financials: {...portfolioData.financials, totalCost: e.target.value}})} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Amount Paid (₹)</label>
                    <input type="number" value={portfolioData.financials.amountPaid} onChange={(e) => setPortfolioData({...portfolioData, financials: {...portfolioData.financials, amountPaid: e.target.value}})} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Next Installment Amount (₹)</label>
                    <input type="number" value={portfolioData.financials.nextInstallmentAmount} onChange={(e) => setPortfolioData({...portfolioData, financials: {...portfolioData.financials, nextInstallmentAmount: e.target.value}})} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Next Installment Date</label>
                    <input type="text" placeholder="e.g. 15th April 2026" value={portfolioData.financials.nextInstallmentDate} onChange={(e) => setPortfolioData({...portfolioData, financials: {...portfolioData.financials, nextInstallmentDate: e.target.value}})} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors" />
                  </div>
                </div>
              </div>

              {/* 3. Assignment Section */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 px-4 rounded border border-blue-100">3. Current Assignment Status</h3>
                  <button className="text-sm font-bold text-blue-600 flex items-center gap-1"><Plus size={16}/> Add Task</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Task Name</label>
                    <input type="text" placeholder="e.g. Foundation Work" value={portfolioData.assignmentStatus[0].taskName} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].taskName = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Progress (%)</label>
                    <input type="number" placeholder="0-100" value={portfolioData.assignmentStatus[0].progress} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].progress = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <select value={portfolioData.assignmentStatus[0].status} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].status = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl bg-white focus:border-blue-500 transition-colors">
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                    <input type="date" value={portfolioData.assignmentStatus[0].startDate} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].startDate = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Completion Date</label>
                    <input type="date" value={portfolioData.assignmentStatus[0].expectedDate} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].expectedDate = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Remarks / Notes</label>
                    <textarea value={portfolioData.assignmentStatus[0].remarks} onChange={(e) => { const newArr = [...portfolioData.assignmentStatus]; newArr[0].remarks = e.target.value; setPortfolioData({...portfolioData, assignmentStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" rows="2"></textarea>
                  </div>
                </div>
              </div>

              {/* 4. Compliance Section */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 px-4 rounded border border-blue-100">4. Compliance & Approvals</h3>
                  <button className="text-sm font-bold text-blue-600 flex items-center gap-1"><Plus size={16}/> Add Document</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Document Name</label>
                    <input type="text" placeholder="e.g. Site Plan" value={portfolioData.complianceStatus[0].documentName} onChange={(e) => { const newArr = [...portfolioData.complianceStatus]; newArr[0].documentName = e.target.value; setPortfolioData({...portfolioData, complianceStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <select value={portfolioData.complianceStatus[0].status} onChange={(e) => { const newArr = [...portfolioData.complianceStatus]; newArr[0].status = e.target.value; setPortfolioData({...portfolioData, complianceStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 bg-white transition-colors">
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date Updated</label>
                    <input type="date" value={portfolioData.complianceStatus[0].dateUpdated} onChange={(e) => { const newArr = [...portfolioData.complianceStatus]; newArr[0].dateUpdated = e.target.value; setPortfolioData({...portfolioData, complianceStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Verified By</label>
                    <input type="text" placeholder="Admin/Engineer Name" value={portfolioData.complianceStatus[0].verifiedBy} onChange={(e) => { const newArr = [...portfolioData.complianceStatus]; newArr[0].verifiedBy = e.target.value; setPortfolioData({...portfolioData, complianceStatus: newArr}); }} className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Smart Save Buttons */}
              <div className="flex gap-4 border-t pt-8">
                <button onClick={() => handleSavePortfolio('draft')} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-colors">Save as Draft</button>
                <button onClick={() => handleSavePortfolio('review')} className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-4 rounded-xl transition-colors">Submit for Review</button>
                <button onClick={() => handleSavePortfolio('activate')} className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                  <Check size={24} /> Activate Portfolio
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;