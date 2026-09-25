import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import { getActivityLog } from '../../api/client.js'
import EmptyState from '../../components/shared/EmptyState.jsx'

export default function ActivityLog() {
  const [entries, setEntries] = useState(null)
  const [actionFilter, setActionFilter] = useState('all')

  useEffect(() => {
    getActivityLog().then(setEntries)
  }, [])

  if (entries === null) {
    return <div className="py-14 text-center text-sm text-ink-400">Loading activity…</div>
  }

  const actionTypes = [...new Set(entries.map((e) => e.action))]
  const filtered =
    actionFilter === 'all' ? entries : entries.filter((e) => e.action === actionFilter)

  return (
    <div className="stat-card border-t-brand-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-ink-900">Recent Activity</h2>
        <div className="flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2 text-sm">
          <Filter size={14} className="text-brand-500" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-transparent focus:outline-none"
          >
            <option value="all">All Actions</option>
            {actionTypes.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No activity matches this filter." />
      ) : (
        <ul>
          {filtered.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start justify-between gap-4 py-3 border-b border-ink-900/5 last:border-0"
            >
              <p className="text-sm text-ink-900">
                <span className="font-medium">{entry.actor}</span>{' '}
                <span className="text-ink-700">{entry.action.toLowerCase()}</span>{' '}
                <span className="font-medium">{entry.target}</span>
              </p>
              <span className="text-xs text-ink-400 shrink-0 whitespace-nowrap">
                {entry.time}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}