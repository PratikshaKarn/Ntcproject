// dashboard.constants.js

export const STATUS_STYLE = {
  'On Track': 'bg-leaf-50 text-leaf-700',
  'Delayed': 'bg-rose-50 text-rose-600',
  'Planning': 'bg-brand-100 text-brand-700',
}

export const projectFields = [
  { name: 'name', label: 'Project Name', required: true },
  { name: 'location', label: 'Location', required: true },
  { name: 'engineer', label: 'Site Engineer', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['On Track', 'Delayed', 'Planning'], required: true },
  { name: 'progress', label: 'Progress (%)', type: 'number', required: true },
  { name: 'budget', label: 'Budget', required: true },
]

export const TOOLS = [
  { icon: 'Users', title: 'User Management', desc: 'Add, edit, or remove users' },
  { icon: 'Settings', title: 'System Settings', desc: 'Configure application settings' },
  { icon: 'MapPin', title: 'Project Management', desc: 'View and manage projects' },
]

export const SHORTCUTS = [
  { icon: 'Building2', title: 'Manage Project', desc: 'View and manage construction projects' },
  { icon: 'Users', title: 'Contractors', desc: 'Manage contractor teams' },
  { icon: 'Users', title: 'Architects', desc: 'Manage architect partners' },
]