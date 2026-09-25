import { useEffect, useState } from 'react'
import { Users, Building2, Wallet, RefreshCw } from 'lucide-react'
import { getDashboardStats } from '../../api/client.js'
import StatCard from '../../components/shared/StatCard.jsx'
import FormModal from '../../components/shared/FormModal.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DashboardTable from '../../components/shared/DataTable/DashboardTable.jsx'
import { useDashboardProjects } from './hooks/useDashboardProjects.js'
import { STATUS_STYLE, projectFields, TOOLS, SHORTCUTS } from './dashboard.constants.js'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const {
    projects, viewingProject, fullView, editingProject, deletingProject,
    setViewingProject, setFullView, setEditingProject, setDeletingProject,
    handleSave, handleDeleteConfirm, closeView,
  } = useDashboardProjects()

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])


  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-brand-700">
            Construction Work Admin
          </h1>
          <p className="text-sm text-ink-400">Construction project management dashboard</p>
        </div>
        <button
          onClick={() => getDashboardStats().then(setStats)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          <RefreshCw size={15} /> Refresh Data
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Users" value={stats.totalUsers} deltaPct={stats.totalUsersDeltaPct} icon={Users} accent="brand" />
          <StatCard label="Total Project" value={stats.totalProjects} deltaPct={stats.totalProjectsDeltaPct} icon={Building2} accent="brand" />
          <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toFixed(2)}L`} deltaPct={stats.totalRevenueDeltaPct} icon={Wallet} accent="purple" />
        </div>
      )}

      <div className="stat-card border-t-0">
        <h2 className="font-display font-semibold text-ink-900 mb-4 flex items-center gap-2">
          <Users size={17} className="text-brand-600" /> Construction Management Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOOLS.map(({ icon: Icon, title, desc }) => (
            <button
              key={title}
              className="border border-ink-900/8 rounded-card p-5 text-center hover:border-brand-300 hover:bg-brand-50/50 transition-colors"
            >
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Icon size={20} />
              </span>
              <p className="font-medium text-sm text-ink-900">{title}</p>
              <p className="text-xs text-ink-400 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="stat-card border-t-0 overflow-hidden !p-0">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="font-display font-semibold text-ink-900">Recent Projects</h2>
          <button className="text-xs font-medium text-brand-600 hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <DashboardTable     // TABLE 
          projects={projects}
          statusStyle={STATUS_STYLE}
          onView={(project) => {
            setViewingProject(project)
            setFullView(false)
          }}
          onEdit={(project) => {
            setEditingProject(project)
          }}
          onDelete={(project) => {
            setDeletingProject(project)
            }}
          />
        </div>
      </div>
      <div className="stat-card border-t-0">
        <h2 className="font-display font-semibold text-ink-900 mb-4">Project Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SHORTCUTS.map(({ icon: Icon, title, desc }) => (
            <button
              key={title}
              className="flex items-center gap-3 border border-ink-900/8 rounded-card p-4 text-left hover:border-brand-300 hover:bg-paper transition-colors"
            >
              <span className="h-9 w-9 rounded-md bg-ink-900/5 flex items-center justify-center text-ink-700 shrink-0">
                <Icon size={17} />
              </span>
              <span>
                <p className="font-medium text-sm text-ink-900">{title}</p>
                <p className="text-xs text-ink-400">{desc}</p>
              </span>
            </button>
          ))}
        </div>
      </div>

      {editingProject && (
        <FormModal
          title="Edit Project"
          fields={projectFields}
          initialValues={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}

      {viewingProject && !fullView && (
        <DetailModal
          title={viewingProject.name}
          fields={[
            { label: 'Location', value: viewingProject.location },
            { label: 'Site Engineer', value: viewingProject.engineer },
            { label: 'Status', value: viewingProject.status },
            { label: 'Progress', value: `${viewingProject.progress}%` },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingProject && fullView && (
        <FullDetailView
          title={viewingProject.name}
          subtitle={viewingProject.location}
          sections={[
            {
              heading: 'Project Status',
              fields: [
                { label: 'Site Engineer', value: viewingProject.engineer },
                { label: 'Status', value: viewingProject.status },
                { label: 'Progress', value: `${viewingProject.progress}%` },
              ],
            },
            {
              heading: 'Budget',
              fields: [{ label: 'Budget', value: viewingProject.budget }],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingProject(viewingProject)
            closeView()
          }}
          onDelete={() => setDeletingProject(viewingProject)}
        />
      )}

      {deletingProject && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to remove ${deletingProject.name}? This cannot be undone.`}
          onCancel={() => setDeletingProject(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}