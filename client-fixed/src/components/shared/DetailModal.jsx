import { X, Maximize2 } from 'lucide-react'

export default function DetailModal({ title, fields, onClose, onViewMore }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="bg-white rounded-card shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-900 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <dl className="space-y-3">
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 text-sm border-b border-ink-900/5 pb-2.5 last:border-0"
            >
              <dt className="text-ink-400 shrink-0">{label}</dt>
              <dd className="text-ink-900 font-medium text-right">{value}</dd>
            </div>
          ))}
        </dl>

        {onViewMore && (
          <button
            onClick={onViewMore}
            className="w-full flex items-center justify-center gap-2 mt-5 text-sm font-medium text-brand-600 hover:text-brand-700 border border-brand-200 hover:bg-brand-50 rounded-md py-2 transition-colors"
          >
            <Maximize2 size={14} /> View Full Details
          </button>
        )}
      </div>
    </div>
  )
}