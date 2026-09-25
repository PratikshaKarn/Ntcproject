import { useState } from 'react'
import { User, Bell, Lock, Mail, Phone, Shield, HelpCircle } from 'lucide-react'

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Lock },
]

function Toggle({ on, onChange }) {
  return (
    <button className="toggle" data-on={on} onClick={() => onChange(!on)}>
      <span className={`toggle-dot ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

function ProfileTab() {
  return (
    <div className="stat-card border-t-brand-500 max-w-2xl space-y-5">
      <h2 className="font-display font-bold text-brand-700">Admin Profile Information</h2>

      <div>
        <label className="text-sm font-medium text-ink-700">Name</label>
        <div className="mt-1 flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2.5">
          <User size={16} className="text-ink-400" />
          <input defaultValue="Admin User" className="flex-1 bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">Email</label>
        <div className="mt-1 flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2.5 bg-paper/50">
          <Mail size={16} className="text-ink-400" />
          <input defaultValue="admin@anbuildworks.com" disabled className="flex-1 bg-transparent text-sm text-ink-400 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">Role</label>
        <div className="mt-1 flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2.5 bg-paper/50">
          <Shield size={16} className="text-ink-400" />
          <input defaultValue="admin" disabled className="flex-1 bg-transparent text-sm text-ink-400 focus:outline-none" />
        </div>
        <p className="text-xs text-ink-400 mt-1">Role cannot be changed.</p>
      </div>

      <div>
        <label className="text-sm font-medium text-ink-700">Phone Number</label>
        <div className="mt-1 flex items-center gap-2 border border-ink-900/10 rounded-md px-3 py-2.5">
          <Phone size={16} className="text-ink-400" />
          <input placeholder="Add a phone number" className="flex-1 bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button className="flex items-center gap-2 border border-brand-500 text-brand-600 hover:bg-brand-50 transition-colors text-sm font-medium px-4 py-2 rounded-md">
          <HelpCircle size={15} /> Contact Support
        </button>
        <button className="bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-5 py-2 rounded-md">
          Update Profile
        </button>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email: true,
    push: false,
    projectUpdates: true,
    safetyAlerts: true,
    financialReports: false,
  })
  const set = (key) => (val) => setPrefs((p) => ({ ...p, [key]: val }))

  return (
    <div className="stat-card border-t-brand-500 max-w-2xl">
      <h2 className="font-display font-bold text-brand-700 mb-5">Notification Preferences</h2>

      <div className="space-y-5">
        <Row title="Email Notifications" desc="Receive updates via email" on={prefs.email} onChange={set('email')} />
        <Row title="Push Notifications" desc="Receive alerts on your device" on={prefs.push} onChange={set('push')} />
      </div>

      <hr className="my-5 border-ink-900/8" />

      <p className="text-sm font-semibold text-ink-900 mb-3">Alert Types</p>
      <div className="space-y-5">
        <Row
          title="Project Site Updates"
          desc="Real-time alerts on construction progress and changes"
          on={prefs.projectUpdates}
          onChange={set('projectUpdates')}
        />
        <Row
          title="Site Safety Alerts"
          desc="Notifications about potential hazards or safety risks on site"
          on={prefs.safetyAlerts}
          onChange={set('safetyAlerts')}
        />
        <Row
          title="Financial Reports"
          desc="Weekly and monthly financial summaries"
          on={prefs.financialReports}
          onChange={set('financialReports')}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-leaf-500 hover:bg-leaf-600 transition-colors text-white text-sm font-medium px-5 py-2 rounded-md">
          Save Notification Settings
        </button>
      </div>
    </div>
  )
}

function Row({ title, desc, on, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-ink-900">{title}</p>
        <p className="text-xs text-ink-400">{desc}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="stat-card border-t-brand-500 max-w-2xl space-y-5">
      <h2 className="font-display font-bold text-brand-700">Security</h2>
      <div>
        <label className="text-sm font-medium text-ink-700">Current password</label>
        <input type="password" className="mt-1 w-full border border-ink-900/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-700">New password</label>
        <input type="password" className="mt-1 w-full border border-ink-900/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300" />
      </div>
      <div className="flex justify-end pt-2">
        <button className="bg-brand-600 hover:bg-brand-700 transition-colors text-white text-sm font-medium px-5 py-2 rounded-md">
          Change Password
        </button>
      </div>
    </div>
  )
}

export default function ProfileSettings() {
  const [tab, setTab] = useState('profile')

  return (
    <div className="space-y-5">
      <div className="flex gap-6 border-b border-ink-900/8">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === key ? 'border-brand-600 text-brand-700' : 'border-transparent text-ink-400 hover:text-ink-700'
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {tab === 'profile' && <ProfileTab />}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'security' && <SecurityTab />}
    </div>
  )
}
