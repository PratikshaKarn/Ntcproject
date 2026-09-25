import { useState } from 'react'
import { X } from 'lucide-react'

export default function FormModal({
  title,
  fields,
  initialValues,
  onClose,
  onSave,
  submitLabel = 'Save Changes',
}) {
  const [form, setForm] = useState(initialValues)

  function update(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="bg-white rounded-card shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-ink-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-400 hover:text-ink-900 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-ink-700 mb-1">{f.label}</label>

              {f.type === 'select' ? (
                <select
                  value={form[f.name] ?? ''}
                  onChange={(e) => update(f.name, e.target.value)}
                  className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
                >
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  value={form[f.name] ?? ''}
                  onChange={(e) => update(f.name, e.target.value)}
                  required={f.required}
                  rows={3}
                  className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              ) : (
                <input
                  type={f.type || 'text'}
                  value={form[f.name] ?? ''}
                  onChange={(e) =>
                    update(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)
                  }
                  required={f.required}
                  step={f.type === 'number' ? f.step ?? 'any' : undefined}
                  className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              )}
            </div>
          ))}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-ink-700 hover:bg-paper rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md transition-colors"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}