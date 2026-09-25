export const entryFields = [
  { name: 'material', label: 'Material', required: true },
  { name: 'site', label: 'Site', required: true },
  { name: 'shift', label: 'Shift', type: 'select', options: ['Morning', 'Evening'], required: true },
  { name: 'qty', label: 'Quantity', type: 'number', required: true },
  { name: 'unit', label: 'Unit', required: true },
  { name: 'rate', label: 'Rate (₹)', type: 'number', required: true },
]