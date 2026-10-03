import { Search, UserPlus } from 'lucide-react'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'
import HumanResourceTable from '../../components/shared/DataTable/HumanResourceTable.jsx'
import { useHumanResource } from './hooks/useHumanResource.js'
import { employeeFields, emptyEmployee } from './human-resource.constants.js'

export default function HumanResourceManagement() {
  const {
    filtered, query, setQuery,
    adding, setAdding,
    viewingEmployee, setViewingEmployee, fullView, setFullView,
    editingEmployee, setEditingEmployee, deletingEmployee, setDeletingEmployee,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  } = useHumanResource()

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-brand-700">
            Human Resource Management
          </h1>
          <p className="text-sm text-ink-400">
            Manage human resources and employee information
          </p>
        </div>

        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          <UserPlus size={16} />
          Add New Employee
        </button>
      </div>

      {/* Employee Table Card */}
      <div className="stat-card">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, position, or department..."
              className="w-full border border-ink-900/10 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <HumanResourceTable
            employees={filtered}
            onView={(employee) => {
              setViewingEmployee(employee)
              setFullView(false)
            }}
            onEdit={(employee) => setEditingEmployee(employee)}
            onDelete={(employee) => setDeletingEmployee(employee)}
          />
        </div>
      </div>

      {adding && (
        <FormModal
          title="Add New Employee"
          fields={employeeFields}
          initialValues={emptyEmployee}
          submitLabel="Add Employee"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingEmployee && (
        <FormModal
          title="Edit Employee"
          fields={employeeFields}
          initialValues={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleSave}
        />
      )}

      {viewingEmployee && !fullView && (
        <DetailModal
          title={viewingEmployee.name}
          fields={[
            { label: 'Position', value: viewingEmployee.position },
            { label: 'Department', value: viewingEmployee.department },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingEmployee && fullView && (
        <FullDetailView
          title={viewingEmployee.name}
          subtitle={viewingEmployee.position}
          sections={[
            {
              heading: 'Employment',
              fields: [
                { label: 'Position', value: viewingEmployee.position },
                { label: 'Department', value: viewingEmployee.department },
              ],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingEmployee(viewingEmployee)
            closeView()
          }}
          onDelete={() => setDeletingEmployee(viewingEmployee)}
        />
      )}

      {deletingEmployee && (
        <ConfirmDialog
          title="Delete Employee"
          message={`Are you sure you want to remove ${deletingEmployee.name}? This cannot be undone.`}
          onCancel={() => setDeletingEmployee(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}