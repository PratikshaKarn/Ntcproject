import { Search, Plus } from 'lucide-react'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'
import SiteEngineersTable from '../../components/shared/DataTable/SiteEngineersTable.jsx'
import { useSiteEngineers } from './hooks/useSiteEngineers.js'
import { engineerFields, emptyEngineer } from './site-engineers.constants.js'

export default function SiteEngineers() {
  const {
    loaded, filtered, query, setQuery,
    adding, setAdding,
    viewingEngineer, setViewingEngineer, fullView, setFullView,
    editingEngineer, setEditingEngineer, deletingEngineer, setDeletingEngineer,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  } = useSiteEngineers()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-ink-900">Construction Team</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search team by name, specialization..."
              className="border border-ink-900/10 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 w-64"
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="stat-card border-t-brand-0 p-0 overflow-hidden">
        {filtered.length === 0 && loaded ? (
          <EmptyState message="No team members match your search." />
        ) : (
          <SiteEngineersTable
            engineers={filtered}
            onView={(engineer) => {
              setViewingEngineer(engineer)
              setFullView(false)
            }}
            onEdit={(engineer) => setEditingEngineer(engineer)}
            onDelete={(engineer) => setDeletingEngineer(engineer)}
          />
        )}
      </div>

      {adding && (
        <FormModal
          title="Add New Team Member"
          fields={engineerFields}
          initialValues={emptyEngineer}
          submitLabel="Add Member"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingEngineer && (
        <FormModal
          title="Edit Team Member"
          fields={engineerFields}
          initialValues={editingEngineer}
          onClose={() => setEditingEngineer(null)}
          onSave={handleSave}
        />
      )}

      {viewingEngineer && !fullView && (
        <DetailModal
          title={viewingEngineer.name}
          fields={[
            { label: 'Specialization', value: viewingEngineer.specialization },
            { label: 'Qualification', value: viewingEngineer.qualification },
            { label: 'Contact', value: viewingEngineer.contact },
            { label: 'Availability', value: viewingEngineer.availability },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingEngineer && fullView && (
        <FullDetailView
          title={viewingEngineer.name}
          subtitle={viewingEngineer.specialization}
          sections={[
            {
              heading: 'Profile',
              fields: [
                { label: 'Qualification', value: viewingEngineer.qualification },
                { label: 'Contact', value: viewingEngineer.contact },
                { label: 'Availability', value: viewingEngineer.availability },
              ],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingEngineer(viewingEngineer)
            closeView()
          }}
          onDelete={() => setDeletingEngineer(viewingEngineer)}
        />
      )}

      {deletingEngineer && (
        <ConfirmDialog
          title="Delete Team Member"
          message={`Are you sure you want to remove ${deletingEngineer.name}? This cannot be undone.`}
          onCancel={() => setDeletingEngineer(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}