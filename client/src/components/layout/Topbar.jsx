import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, UserCircle, Users2, Settings2, AlertTriangle, Menu } from 'lucide-react'
import { getNotifications } from '../../api/client.js'
import logo from '../../assets/logo.jpeg'

const ICONS = { contractor: Users2, system: Settings2, alert: AlertTriangle }

/**
 * Fixed dashboard header (shared by admin and client dashboards).
 * It sits OUTSIDE the scrolling area, so it never moves or overlaps content.
 */
export default function Topbar({
  onMenuClick,
  label = 'Admin',
  profileTo = '/admin/settings',
  showNotifications = true,
}) {
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const notifRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (showNotifications) getNotifications().then(setNotifications)
  }, [showNotifications])

  useEffect(() => {
    function onClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="relative z-30 h-16 shrink-0 bg-white text-ink-900 px-4 md:px-6 flex items-center justify-between border-b-[3px] border-nt-red shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md text-nt-blue hover:bg-nt-sky" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <img src={logo} alt="Construction Work" className="h-8 w-auto" />
        <span className="hidden sm:block text-sm font-extrabold tracking-wide text-nt-blue">CONSTRUCTION WORK</span>
      </div>

      <div className="flex items-center gap-4">
        {showNotifications && (
          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotifOpen((v) => !v)} className="relative p-1.5 rounded-full text-nt-blue hover:bg-nt-sky" aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-nt-red text-white text-[10px] leading-none rounded-full h-4 w-4 flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white rounded-card shadow-xl border border-ink-900/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-ink-900/10">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs text-nt-blue font-medium hover:underline">Mark all as read</button>
                </div>
                <ul className="max-h-72 overflow-y-auto divide-y divide-ink-900/5">
                  {notifications.map((n) => {
                    const Icon = ICONS[n.type] ?? Bell
                    return (
                      <li key={n.id} className="flex gap-3 px-4 py-3">
                        <Icon size={16} className="mt-0.5 text-nt-blue shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold flex items-center gap-1.5">
                            {n.title}
                            {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-nt-red" />}
                          </p>
                          <p className="text-xs text-ink-700 mt-0.5">{n.body}</p>
                          <p className="text-[11px] text-nt-blue mt-1">{n.time}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-1.5 bg-nt-sky hover:bg-brand-100 transition-colors rounded-full pl-1 pr-2.5 py-1 text-nt-dark">
            <UserCircle size={26} />
            <span className="text-sm font-medium max-w-[10rem] truncate">{label}</span>
            <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-card shadow-xl border border-ink-900/10 overflow-hidden text-sm">
              {profileTo && (
                <button onClick={() => { setMenuOpen(false); navigate(profileTo) }} className="block w-full text-left px-4 py-2.5 hover:bg-nt-sky">
                  Profile settings
                </button>
              )}
              <button onClick={() => { setMenuOpen(false); navigate('/logout') }} className="block w-full text-left px-4 py-2.5 hover:bg-nt-sky text-nt-red">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
