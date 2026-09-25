import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import ChatWidget from '../chatbot/ChatWidget.jsx'
import Footer from './FooterAdmin.jsx'

export default function AdminLayout() {
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Topbar onMenuClick={() => setMobileOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          expanded={expanded}
          onExpandChange={setExpanded}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <ChatWidget />
      <Footer expanded={expanded} />
    </div>
  )
}