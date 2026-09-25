import { useEffect, useState } from 'react'
import { Plus, AlertTriangle, Info } from 'lucide-react'
import { getNewsAlerts } from '../../api/client.js'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ActionMenu from '../../components/shared/ActionMenu.jsx'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'

const alertFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'body', label: 'Description', type: 'textarea', required: true },
  { name: 'severity', label: 'Severity', type: 'select', options: ['info', 'warning'], required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function NewsAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [adding, setAdding] = useState(false)
  const [viewingAlert, setViewingAlert] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingAlert, setEditingAlert] = useState(null)
  const [deletingAlert, setDeletingAlert] = useState(null)

  useEffect(() => {
    getNewsAlerts().then((data) => {
      setAlerts(data)
      setLoaded(true)
    })
  }, [])

  function handleCreate(values) {
    const newAlert = { id: Date.now(), ...values }
    setAlerts((prev) => [newAlert, ...prev])
    setAdding(false)
  }

  function handleSave(values) {
    const updated = { ...editingAlert, ...values }
    setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
    setEditingAlert(null)
  }

  function handleDeleteConfirm() {
    setAlerts((prev) => prev.filter((a) => a.id !== deletingAlert.id))
    if (viewingAlert?.id === deletingAlert.id) {
      setViewingAlert(null)
      setFullView(false)
    }
    setDeletingAlert(null)
  }

  function closeView() {
    setViewingAlert(null)
    setFullView(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink-900">
          Construction Alerts Management
        </h1>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 bg-leaf-500 hover:bg-leaf-600 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          <Plus size={16} /> Add New Alert
        </button>
      </div>

      <div className="stat-card border-t-brand-0">
        {!loaded ? (
          <EmptyState message="Loading alerts…" />
        ) : alerts.length === 0 ? (
          <EmptyState message="No construction alerts have been created yet." />
        ) : (
          <ul className="divide-y divide-ink-900/5">
            {alerts.map((a) => {
              const Icon = a.severity === 'warning' ? AlertTriangle : Info
              const color = a.severity === 'warning' ? 'text-amber-600 bg-amber-50' : 'text-sky-600 bg-sky-50'
              return (
                <li key={a.id} className="flex items-start gap-3 py-4">
                  <span className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${color}`}>
                    <Icon size={17} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink-900">{a.title}</p>
                    <p className="text-sm text-ink-700 mt-0.5">{a.body}</p>
                    <p className="text-xs text-ink-400 mt-1">{a.date}</p>
                  </div>
                  <ActionMenu
                    onView={() => {
                      setViewingAlert(a)
                      setFullView(false)
                    }}
                    onEdit={() => setEditingAlert(a)}
                    onDelete={() => setDeletingAlert(a)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {adding && (
        <FormModal
          title="Add New Alert"
          fields={alertFields}
          initialValues={{ title: '', body: '', severity: 'info', date: todayISO() }}
          submitLabel="Create Alert"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingAlert && (
        <FormModal
          title="Edit Alert"
          fields={alertFields}
          initialValues={editingAlert}
          onClose={() => setEditingAlert(null)}
          onSave={handleSave}
        />
      )}

      {viewingAlert && !fullView && (
        <DetailModal
          title={viewingAlert.title}
          fields={[
            { label: 'Severity', value: viewingAlert.severity },
            { label: 'Date', value: viewingAlert.date },
            { label: 'Description', value: viewingAlert.body },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingAlert && fullView && (
        <FullDetailView
          title={viewingAlert.title}
          subtitle={viewingAlert.date}
          sections={[
            {
              heading: 'Alert Details',
              fields: [
                { label: 'Severity', value: viewingAlert.severity },
                { label: 'Date', value: viewingAlert.date },
              ],
            },
            {
              heading: 'Description',
              fields: [{ label: 'Body', value: viewingAlert.body }],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingAlert(viewingAlert)
            closeView()
          }}
          onDelete={() => setDeletingAlert(viewingAlert)}
        />
      )}

      {deletingAlert && (
        <ConfirmDialog
          title="Delete Alert"
          message={`Are you sure you want to remove "${deletingAlert.title}"? This cannot be undone.`}
          onCancel={() => setDeletingAlert(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}