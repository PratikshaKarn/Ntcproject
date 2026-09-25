import { X, Pencil, Trash2, ArrowLeft } from 'lucide-react'

/**
 * Full-page "more information" overlay. Opened from DetailModal's
 * "View Full Details" button (short popup -> full page).
 *
 * sections: [{ heading, fields: [{ label, value }] }]
 */
export default function FullDetailView({ title, subtitle, sections, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 z-[60] bg-paper overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="stat-card border-t-brand-0">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-ink-900">{title}</h1>
              {subtitle && <p className="text-sm text-ink-400 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 border border-ink-900/10 text-ink-700 text-sm font-medium px-3 py-2 rounded-md hover:bg-paper transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex items-center gap-2 border border-rose-200 text-rose-600 text-sm font-medium px-3 py-2 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-md text-ink-400 hover:text-ink-900 hover:bg-paper transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-3">
                  {s.heading}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {s.fields.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4 text-sm border-b border-ink-900/5 pb-2.5"
                    >
                      <dt className="text-ink-400 shrink-0">{label}</dt>
                      <dd className="text-ink-900 font-medium text-right">{value ?? '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}