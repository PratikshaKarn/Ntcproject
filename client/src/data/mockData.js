export const dashboardStats = {
  totalUsers: 0,
  totalUsersDeltaPct: 0,
  totalProjects: 0,
  totalProjectsDeltaPct: 0,
  totalRevenue: 0.0,
  totalRevenueDeltaPct: 0,
}

export const users = [
  { id: 1, name: 'Test', email: 'test@example.com', role: 'user' },
  { id: 2, name: 'S. sajid', email: 's@example.com', role: 'contractor' },
  { id: 3, name: 'Jafre Alam', email: 'jafre@example.com', role: 'user' },
  { id: 4, name: 'A. Asis', email: 'asis@example.com', role: 'contractor' },
  { id: 5, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 6, name: 'Admin', email: 'admin.com', role: 'admin' },
]
export const employees = [
  { id: 1, name: 'Test', position: 'Software Engineer', department: 'Engineering' },
  { id: 2, name: 'S. sajid', position: 'Site Supervisor', department: 'Operations' },
  { id: 3, name: 'Jafre Alam', position: 'HR Manager', department: 'Human Resources' },
  { id: 4, name: 'A. Asis', position: 'Accountant', department: 'Finance' },
  { id: 5, name: 'Admin User', position: 'System Administrator', department: 'IT' },
  { id: 6, name: 'Admin', position: 'Chief Executive Officer', department: 'Executive' },
]


export const roleBadgeStyles = {
  user: 'bg-ink-900/10 text-ink-700',
  contractor: 'bg-brand-100 text-brand-700',
  admin: 'bg-purple-100 text-purple-700',
}

export const notifications = [
  {
    id: 1,
    type: 'contractor',
    title: 'New Contractor Registered',
    body: 'ABC Construction has joined as a new contractor',
    time: '11 minutes ago',
    unread: true,
  },
  {
    id: 2,
    type: 'system',
    title: 'System Maintenance Completed',
    body: 'System maintenance was successfully completed at midnight',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Material Supply Alert',
    body: 'Cement supply dropped by 15% compared to last week',
    time: '3 hours ago',
    unread: true,
  },
]

export const constructionSites = [
  {
    id: 1,
    location: 'GuruGram Site',
    specialization: 'Residential',
    address: 'Plot 14, Gurugram Industrial Area',
    contact: '+91 98220 11223',
    team: ['R. AllamaJi', 'S. Jafar'],
    lat: 18.5,
    lng: 73.85,
  },
  {
    id: 2,
    location: 'Gaur Highway Project',
    specialization: 'Commercial',
    address: 'NH-4,B.P. Chowk gaur',
    contact: '+91 98230 44556',
    team: ['A. Sahil'],
    lat: 17.9,
    lng: 73.95,
  },
]

export const siteEngineers = [
  {
    id: 1,
    name: 'R. AllamaJi',
    specialization: 'Structural',
    qualification: 'B.E. Civil',
    contact: '+91 98220 11223',
    availability: 'Available',
  },
  {
    id: 2,
    name: 'S. Jafar',
    specialization: 'Electrical',
    qualification: 'B.Tech EEE',
    contact: '+91 98230 44556',
    availability: 'On site',
  },
  {
    id: 3,
    name: 'A. Sahil',
    specialization: 'Plumbing',
    qualification: 'Diploma',
    contact: '+91 98450 77889',
    availability: 'Available',
  },
]

export const materialLog = {
  totalCollection: 0,
  totalCollectionUnit: 'bags',
  totalAmount: 0,
  morning: { qty: 0, amount: 0 },
  evening: { qty: 0, amount: 0 },
  avgQualityRate: 96.4,
  avgQualityUnit: 98.1,
  records: 0,
  avgRate: 225.1,
  entries: [
    { id: 'ML-2041', material: 'Cement (OPC 53)', site: 'GuruGram Site', shift: 'Morning', qty: 0, unit: 'bags', rate: 380, amount: 0 },
    { id: 'ML-2040', material: 'Steel TMT 12mm', site: 'Gaur Highway Project', shift: 'Morning', qty: 0, unit: 'kg', rate: 62, amount: 0 },
    { id: 'ML-2039', material: 'Sand (River)', site: 'GuruGram Site', shift: 'Evening', qty: 0, unit: 'ton', rate: 1450, amount: 0 },
    { id: 'ML-2038', material: 'Bricks', site: 'Gaur Highway Project', shift: 'Evening', qty: 0, unit: 'nos', rate: 8.5, amount: 0 },
  ],
}

export const newsAlerts = [
  {
    id: 1,
    title: 'Monsoon safety advisory',
    body: 'All sites to halt crane operations if wind speed exceeds 40 km/h.',
    severity: 'warning',
    date: '20 Aug 2026',
  },
  {
    id: 2,
    title: 'Cement price revision',
    body: 'OPC 53 grade rate revised to ₹380/bag effective this week.',
    severity: 'info',
    date: '18 Aug 2026',
  },
]

export const permissionAreas = [
  'Dashboard',
  'Human Resource Management',
  'User Management',
  'Site Material Log',
  'Site Engineers',
  'Construction Sites',
  'News & Alerts',
  'Settings',
]

export const roles = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full access to every module, including user management and settings.',
    permissions: [...permissionAreas],
  },
  {
    id: 'contractor',
    label: 'Contractor',
    description: 'Manages assigned sites, materials, and engineers.',
    permissions: ['Dashboard', 'Site Material Log', 'Site Engineers', 'Construction Sites'],
  },
  {
    id: 'user',
    label: 'User',
    description: 'Read-only access to the dashboard and news updates.',
    permissions: ['Dashboard', 'News & Alerts'],
  },
]
export const activityLog = [
  { id: 1, actor: 'Admin User', action: 'Added user', target: 'S. sajid', time: '2 hours ago' },
  { id: 2, actor: 'Admin', action: 'Changed role', target: 'A. Asis', time: '1 day ago' },
  { id: 3, actor: 'Admin User', action: 'Deactivated user', target: 'Jafre Alam', time: '3 days ago' },
  { id: 4, actor: 'Admin', action: 'Added user', target: 'Test', time: '5 days ago' },
]


export const projects = [
  { id: 1, name: 'Skyline Residency', location: 'Kathmandu', engineer: 'R. Sharma', status: 'On Track', progress: 72, budget: '₹1.2Cr' },
  { id: 2, name: 'Green Valley Complex', location: 'Pokhara', engineer: 'A. Thapa', status: 'Delayed', progress: 41, budget: '₹85L' },
  { id: 3, name: 'Riverside Towers', location: 'Lalitpur', engineer: 'S. Karki', status: 'On Track', progress: 88, budget: '₹2.4Cr' },
  { id: 4, name: 'Metro Business Park', location: 'Bhaktapur', engineer: 'P. Rai', status: 'Planning', progress: 12, budget: '₹3.1Cr' },
  { id: 5, name: 'Sunrise Apartments', location: 'Kathmandu', engineer: 'D. Gurung', status: 'On Track', progress: 95, budget: '₹1.6Cr' },
]