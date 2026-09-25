import { useEffect, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { getRoles } from '../../api/client.js'
import { permissionAreas } from '../../data/mockData.js'
import EmptyState from '../../components/shared/EmptyState.jsx'

export default function RolesPermissions() {
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    getRoles().then(setRoles)
  }, [])

  function togglePermission(roleId, area) {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: r.permissions.includes(area)
                ? r.permissions.filter((p) => p !== area)
                : [...r.permissions, area],
            }
          : r
      )
    )
  }

  if (roles === null) {
    return <div className="py-14 text-center text-sm text-ink-400">Loading roles…</div>
  }

  if (roles.length === 0) {
    return <EmptyState message="No roles configured yet." />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {roles.map((role) => (
        <div key={role.id} className="stat-card border-t-brand-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} />
            </span>
            <h2 className="font-display font-semibold text-ink-900">{role.label}</h2>
          </div>
          <p className="text-xs text-ink-400 mb-4">{role.description}</p>

          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-2">
            Access
          </p>
          <div className="space-y-2">
            {permissionAreas.map((area) => {
              const checked = role.permissions.includes(area)
              return (
                <label
                  key={area}
                  className="flex items-center gap-2.5 text-sm text-ink-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePermission(role.id, area)}
                    className="rounded border-ink-900/20 text-brand-700 focus:ring-brand-300"
                  />
                  {area}
                </label>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}