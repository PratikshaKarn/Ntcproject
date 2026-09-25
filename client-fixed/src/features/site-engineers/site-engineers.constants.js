export const engineerFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'specialization', label: 'Specialization', required: true },
  { name: 'qualification', label: 'Qualification', required: true },
  { name: 'contact', label: 'Contact', required: true },
  {
    name: 'availability',
    label: 'Availability',
    type: 'select',
    options: ['Available', 'On Site', 'Unavailable'],
    required: true,
  },
]

export const emptyEngineer = {
  name: '',
  specialization: '',
  qualification: '',
  contact: '',
  availability: 'Available',
}