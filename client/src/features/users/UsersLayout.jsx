import { NavLink, Outlet } from 'react-router-dom'

const TABS = [
  { to: '/admin/users', label: 'All Users', end: true },
  { to: '/admin/users/roles', label: 'Roles & Permissions' },
  { to: '/admin/users/activity', label: 'Activity Log' },
]

/**
 * Wraps the 3 User Management sub-pages (All Users / Roles & Permissions /
 * Activity Log) with a shared header and tab bar, rendering the active
 * sub-page via <Outlet />.
 */
export default function UsersLayout() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-xl font-bold text-brand-700">
          Construction Work User Management
        </h1>
        <p className="text-sm text-ink-400">Manage system users, roles, and permissions</p>
      </div>
      <Outlet />
    </div>
  )
}