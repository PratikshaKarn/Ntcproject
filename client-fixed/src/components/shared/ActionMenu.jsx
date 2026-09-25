import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'

export default function ActionMenu({ onView, onEdit, onDelete }) { 
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => { 
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handle(action) {
    setOpen(false)
    action?.()
  }

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-md text-ink-400 hover:text-ink-900 hover:bg-paper transition-colors"
        aria-label="More actions"
      >
        <MoreVertical size={17} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-xl border border-ink-900/10 overflow-hidden z-20 text-sm">
          {onView && (
            <button
              onClick={() => handle(onView)}
              className="w-full flex items-center gap-2 px-3 py-2 text-ink-700 hover:bg-paper transition-colors"
            >
              <Eye size={14} /> View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => handle(onEdit)}
              className="w-full flex items-center gap-2 px-3 py-2 text-ink-700 hover:bg-paper transition-colors"
            >
              <Pencil size={14} /> Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => handle(onDelete)}
              className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}