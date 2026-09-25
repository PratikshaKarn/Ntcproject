import { Droplet, BarChart2, Calendar, Clock, Filter, Plus } from 'lucide-react'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'
import MaterialLogTable from '../../components/shared/DataTable/MaterialLogTable.jsx'
import { useMaterialLog } from './hooks/useMaterialLog.js'
import { entryFields } from './material-log.constants.js'

export default function MaterialLog() {
  const {
    log,
    adding, setAdding,
    viewingEntry, setViewingEntry, fullView, setFullView,
    editingEntry, setEditingEntry, deletingEntry, setDeletingEntry,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  } = useMaterialLog()

  if (!log) return null

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-brand-700">Site Material Log</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-ink-900/10 text-ink-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-white">
            <Filter size={15} /> Filters
          </button>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card border-t-leaf-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">Total Collection</p>
            <span className="h-9 w-9 rounded-full bg-leaf-50 text-leaf-600 flex items-center justify-center"><Droplet size={16} /></span>
          </div>
          <p className="font-display text-2xl font-bold mt-1">{log.totalCollection.toLocaleString('en-IN')} {log.totalCollectionUnit}</p>
          <div className="flex gap-6 mt-3 text-xs text-ink-400">
            <span>Morning<br /><span className="text-ink-900 font-medium">{log.morning.qty.toLocaleString('en-IN')} {log.totalCollectionUnit}</span></span>
            <span>Evening<br /><span className="text-ink-900 font-medium">{log.evening.qty.toLocaleString('en-IN')} {log.totalCollectionUnit}</span></span>
          </div>
        </div>

        <div className="stat-card border-t-brand-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">Total Amount</p>
            <span className="h-9 w-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center"><BarChart2 size={16} /></span>
          </div>
          <p className="font-display text-2xl font-bold mt-1">₹{log.totalAmount.toLocaleString('en-IN')}</p>
          <div className="flex gap-6 mt-3 text-xs text-ink-400">
            <span>Morning<br /><span className="text-ink-900 font-medium">₹{log.morning.amount.toLocaleString('en-IN')}</span></span>
            <span>Evening<br /><span className="text-ink-900 font-medium">₹{log.evening.amount.toLocaleString('en-IN')}</span></span>
          </div>
        </div>

        <div className="stat-card border-t-amber-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">Average Quality</p>
            <span className="h-9 w-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Calendar size={16} /></span>
          </div>
          <p className="font-display text-lg font-bold mt-1">Rate: {log.avgQualityRate}% | Unit: {log.avgQualityUnit}%</p>
        </div>

        <div className="stat-card border-t-purple-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-700">Records &amp; Rate</p>
            <span className="h-9 w-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Clock size={16} /></span>
          </div>
          <p className="font-display text-2xl font-bold mt-1">{log.records} Records</p>
          <p className="text-xs text-ink-400 mt-1">Average Rate <span className="text-ink-900 font-medium">₹{log.avgRate.toFixed(2)}</span></p>
        </div>
      </div>

      <div className="stat-card border-t-brand-0 p-0 overflow-hidden">
        <MaterialLogTable
          materials={log.entries}
          onView={(material) => {
            setViewingEntry(material)
            setFullView(false)
          }}
          onEdit={(material) => setEditingEntry(material)}
          onDelete={(material) => setDeletingEntry(material)}
        />
      </div>

      {adding && (
        <FormModal
          title="New Material Entry"
          fields={entryFields}
          initialValues={{ material: '', site: '', shift: 'Morning', qty: 0, unit: log.totalCollectionUnit || 'L', rate: 0 }}
          submitLabel="Add Entry"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingEntry && (
        <FormModal
          title="Edit Material Entry"
          fields={entryFields}
          initialValues={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleSave}
        />
      )}

      {viewingEntry && !fullView && (
        <DetailModal
          title={viewingEntry.material}
          fields={[
            { label: 'Site', value: viewingEntry.site },
            { label: 'Shift', value: viewingEntry.shift },
            { label: 'Qty', value: `${viewingEntry.qty} ${viewingEntry.unit}` },
            { label: 'Amount', value: `₹${viewingEntry.amount.toLocaleString('en-IN')}` },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingEntry && fullView && (
        <FullDetailView
          title={viewingEntry.material}
          subtitle={`Entry ${viewingEntry.id}`}
          sections={[
            {
              heading: 'Entry Info',
              fields: [
                { label: 'Site', value: viewingEntry.site },
                { label: 'Shift', value: viewingEntry.shift },
              ],
            },
            {
              heading: 'Quantity & Rate',
              fields: [
                { label: 'Quantity', value: `${viewingEntry.qty} ${viewingEntry.unit}` },
                { label: 'Rate', value: `₹${viewingEntry.rate}` },
                { label: 'Amount', value: `₹${viewingEntry.amount.toLocaleString('en-IN')}` },
              ],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingEntry(viewingEntry)
            closeView()
          }}
          onDelete={() => setDeletingEntry(viewingEntry)}
        />
      )}

      {deletingEntry && (
        <ConfirmDialog
          title="Delete Material Entry"
          message={`Are you sure you want to remove entry ${deletingEntry.id}? This cannot be undone.`}
          onCancel={() => setDeletingEntry(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}