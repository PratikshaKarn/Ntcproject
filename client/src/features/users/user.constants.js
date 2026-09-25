export const userFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ['user', 'contractor', 'admin'], required: true },
]

export const emptyUser = { name: '', email: '', role: 'user' }