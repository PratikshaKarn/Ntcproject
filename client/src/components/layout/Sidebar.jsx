import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  HardHat,
  Map,
  Bell,
  Settings,
  X,
  Menu,
  ChevronLeft,
  ChevronDown,
  LogOut,
} from 'lucide-react'

const NAV = [
  {
    to: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/admin/projects',
    label: 'Human Resource Management',
    icon: HardHat,
  },
  {
    to: '/admin/users',
    label: 'User Management',
    icon: Users,
    children: [
      { to: '/admin/users', label: 'All Users', end: true },
      { to: '/admin/users/roles', label: 'Roles & Permissions' },
      { to: '/admin/users/activity', label: 'Activity Log' },
    ],
  },
  {
    to: '/admin/material-log',
    label: 'Site Material Log',
    icon: Package,
  },
  {
    to: '/admin/site-engineers',
    label: 'Site Engineers',
    icon: HardHat,
  },
  {
    to: '/admin/construction-sites',
    label: 'Construction Sites',
    icon: Map,
  },
  {
    to: '/admin/news-alerts',
    label: 'News & Alerts',
    icon: Bell,
  },
  {
    to: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
]

const linkClasses = (showLabels, isActive) =>
  `flex items-center rounded-md py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
    showLabels ? 'gap-3 px-3' : 'justify-center px-2'
  } ${
    isActive
      ? 'bg-white/15 text-white'
      : 'text-white/60 hover:bg-white/10 hover:text-white/90'
  }`

function NavItems({ showLabels, onLinkClick }) {
  const location = useLocation()
  const [openTo, setOpenTo] = useState(null)

  // Auto-expand whichever parent item owns the current route (e.g. after
  // a refresh on /admin/users/roles), so the user doesn't have to click
  // the parent to reveal where they already are.
  useEffect(() => {
    const activeParent = NAV.find(
      (item) => item.children && location.pathname.startsWith(item.to)
    )
    setOpenTo(activeParent ? activeParent.to : null)
  }, [location.pathname])

  return (
  <nav className="flex-1 px-3 pt-4 space-y-1 overflow-x-hidden overflow-y-auto hide-scrollbar">
      {NAV.map((item) => {
        const { to, label, icon: Icon, end, children } = item

        // Collapsed (icon-only) sidebar: no room for a submenu, so a
        // parent item behaves like a normal link straight to its page.
        if (children && !showLabels) {
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onLinkClick}
              title={label}
              className={({ isActive }) => linkClasses(showLabels, isActive)}
            >
              <Icon size={17} strokeWidth={2} className="shrink-0" />
              <span className="opacity-0 max-w-0 overflow-hidden">{label}</span>
            </NavLink>
          )
        }

        if (children) {
          const isParentActive = location.pathname.startsWith(to)
          const isOpen = openTo === to

          return (
            <div key={to}>
              <button
                type="button"
                onClick={() => setOpenTo((prev) => (prev === to ? null : to))}
                aria-expanded={isOpen}
                className={`w-full ${linkClasses(showLabels, isParentActive)}`}
              >
                <Icon size={17} strokeWidth={2} className="shrink-0" />
                <span className="flex-1 text-left overflow-hidden">{label}</span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-40 mt-1' : 'max-h-0'
                }`}
              >
                <div className="ml-4 pl-3 border-l border-white/10 space-y-1">
                  {children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      end={child.end}
                      onClick={onLinkClick}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'text-white/50 hover:bg-white/10 hover:text-white/90'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        return (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onLinkClick}
            title={!showLabels ? label : undefined}
            className={({ isActive }) => linkClasses(showLabels, isActive)}
          >
            <Icon size={17} strokeWidth={2} className="shrink-0" />
            <span
              className={`transition-all duration-200 overflow-hidden ${
                showLabels ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
              }`}
            >
              {label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default function Sidebar({
  expanded,
  onExpandChange,
  mobileOpen,
  onMobileClose,
}) {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`
          hidden md:flex
          flex-col
          shrink-0
          border-r border-white/10
          bg-brand-400
          sticky top-16
          h-[calc(100vh-4rem)]
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${expanded ? 'w-64' : 'w-16'}
        `}
      >

        {/* Sidebar Header / Burger */}
        <div
          className={`
            h-14
            flex
            items-center
            border-b border-white/10
            ${expanded ? 'justify-between px-3' : 'justify-center'}
          `}
        >

          {/* Logo / Title */}
          <div
            className={`
              text-white font-semibold text-sm
              whitespace-nowrap
              overflow-hidden
              transition-all duration-200
              text-center 
              ${expanded ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'}
            `}
          >
            Menu
          </div>

          {/* Burger Button */}
          <button
            type="button"
            onClick={() => onExpandChange(!expanded)}
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-md
              text-white/80
              hover:text-white
              hover:bg-white/10
              transition-colors
            "
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? (
              <ChevronLeft size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

        {/* Navigation */}
        <NavItems showLabels={expanded} />

        {/* Logout */}
        <div className="border-t border-white/10 px-3 py-3 shrink-0">
          <Link
            to="/logout"
            title={!expanded ? 'Log out' : undefined}
            className={`flex items-center rounded-md py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white/90 transition-colors whitespace-nowrap ${
              expanded ? 'gap-3 px-3' : 'justify-center px-2'
            }`}
          >
            <LogOut size={17} strokeWidth={2} className="shrink-0" />
            <span
              className={`transition-all duration-200 overflow-hidden ${
                expanded ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
              }`}
            >
              Log out
            </span>
          </Link>
        </div>

      </aside>

      {/* ================= MOBILE BACKDROP ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0
          z-50
          w-64
          flex flex-col
          bg-brand-400
          md:hidden
          transition-transform duration-300 ease-in-out
          ${
            mobileOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-4">

          <span className="text-white font-semibold text-sm">
            Construction Work
          </span>

          <button
            type="button"
            onClick={onMobileClose}
            className="
              text-white/70
              hover:text-white
              p-2
              rounded-md
              hover:bg-white/10
              transition-colors
            "
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* Mobile Navigation */}
        <NavItems
          showLabels={true}
          onLinkClick={onMobileClose}
        />

        {/* Logout */}
        <div className="border-t border-white/10 px-3 py-3">
          <Link
            to="/logout"
            onClick={onMobileClose}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white/90 transition-colors whitespace-nowrap"
          >
            <LogOut size={17} strokeWidth={2} className="shrink-0" />
            Log out
          </Link>
        </div>

      </aside>
    </>
  )
}