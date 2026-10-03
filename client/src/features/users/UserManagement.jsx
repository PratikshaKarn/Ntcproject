import { Search, UserPlus, Filter } from 'lucide-react'
import ActionMenu from '../../components/shared/ActionMenu.jsx'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import UserManagementTable from '../../components/shared/DataTable/UserManagementTable.jsx'
import { useUserManagement } from './hooks/useUserMnanagement.js'
import { userFields, emptyUser } from './user.constants.js'

export default function UserManagement() {
  const {
    users, filtered, query, setQuery, role, setRole,
    adding, setAdding,
    viewingUser, setViewingUser, fullView, setFullView,
    editingUser, setEditingUser, deletingUser, setDeletingUser,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  } = useUserManagement()

  return (
    <div className="space-y-5">
      <div className="stat-card border-t-brand-0">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or role..."
              className="w-full border border-ink-900/10 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div className="flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2 text-sm">
            <Filter size={14} className="text-brand-500" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="contractor">Contractor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md shrink-0"
          >
            <UserPlus size={16} /> Add New User
          </button>
        </div>

        {users === null ? (
          <div className="py-14 text-center text-sm text-ink-400">Loading users…</div>
        ) : filtered.length === 0 ? (
          <EmptyState message="No users match your search or filters." />
        ) : (


        <UserManagementTable  // Table (DataTable.jsx)
          users={filtered}
          onView={(user) => {
          setViewingUser(user);
          setFullView(false);
          }}

          onEdit={(user) => setEditingUser(user)}
           onDelete={(user) => setDeletingUser(user)}
        />
        )}
      </div>

      {adding && (
        <FormModal
          title="Add New User"
          fields={userFields}
          initialValues={emptyUser}
          submitLabel="Create User"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingUser && (
        <FormModal
          title="Edit User"
          fields={userFields}
          initialValues={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}

      {viewingUser && !fullView && (
        <DetailModal
          title={viewingUser.name}
          fields={[
            { label: 'Email', value: viewingUser.email },
            { label: 'Role', value: viewingUser.role },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingUser && fullView && (
        <FullDetailView
          title={viewingUser.name}
          subtitle={viewingUser.email}
          sections={[
            {
              heading: 'Account',
              fields: [
                { label: 'Email', value: viewingUser.email },
                { label: 'Role', value: viewingUser.role },
              ],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingUser(viewingUser)
            closeView()
          }}
          onDelete={() => setDeletingUser(viewingUser)}
        />
      )}

      {deletingUser && (
        <ConfirmDialog
          title="Delete User"
          message={`Are you sure you want to remove ${deletingUser.name}? This cannot be undone.`}
          onCancel={() => setDeletingUser(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}