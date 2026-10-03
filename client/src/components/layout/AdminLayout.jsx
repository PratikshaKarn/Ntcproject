import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import ChatWidget from '../chatbot/ChatWidget.jsx'
import Footer from './FooterAdmin.jsx'

/**
 * Admin shell. The viewport is split into fixed regions (header, sidebar, footer)
 * and ONLY <main> scrolls, so the header/footer never overlap the page.
 */
export default function AdminLayout() {
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-paper">
      <Topbar onMenuClick={() => setMobileOpen(true)} label="Admin" />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          expanded={expanded}
          onExpandChange={setExpanded}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 min-h-0 overflow-y-auto scroll-area p-4 sm:p-6 md:p-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}
