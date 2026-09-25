import { useEffect, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getConstructionSites } from '../../api/client.js'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ActionMenu from '../../components/shared/ActionMenu.jsx'
import ConfirmDialog from '../../components/shared/ConfirmDialog.jsx'
import DetailModal from '../../components/shared/DetailModal.jsx'
import FullDetailView from '../../components/shared/FullDetailView.jsx'
import FormModal from '../../components/shared/FormModal.jsx'

const siteFields = [
  { name: 'location', label: 'Location', required: true },
  { name: 'specialization', label: 'Specialization', required: true },
  { name: 'address', label: 'Address', required: true },
  { name: 'contact', label: 'Contact', required: true },
  { name: 'teamText', label: 'Assigned Team (comma separated)', required: false },
  { name: 'lat', label: 'Latitude', type: 'number', required: true },
  { name: 'lng', label: 'Longitude', type: 'number', required: true },
]

const emptySite = { location: '', specialization: '', address: '', contact: '', teamText: '', lat: 27.7, lng: 85.3 }

function toFormValues(site) {
  return { ...site, teamText: (site.team || []).join(', ') }
}

function fromFormValues(values) {
  const { teamText, ...rest } = values
  return {
    ...rest,
    lat: Number(values.lat),
    lng: Number(values.lng),
    team: teamText ? teamText.split(',').map((t) => t.trim()).filter(Boolean) : [],
  }
}

export default function ConstructionSites() {
  const [sites, setSites] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('')

  const [adding, setAdding] = useState(false)
  const [viewingSite, setViewingSite] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingSite, setEditingSite] = useState(null)
  const [deletingSite, setDeletingSite] = useState(null)

  useEffect(() => {
    getConstructionSites().then((data) => {
      setSites(data)
      setLoaded(true)
    })
  }, [])

  const filtered = sites.filter((s) =>
    s.location.toLowerCase().includes(query.toLowerCase()),
  )

  function handleCreate(values) {
    const newSite = { id: Date.now(), ...fromFormValues(values) }
    setSites((prev) => [newSite, ...prev])
    setAdding(false)
  }

  function handleSave(values) {
    const updated = { ...editingSite, ...fromFormValues(values) }
    setSites((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    setEditingSite(null)
  }

  function handleDeleteConfirm() {
    setSites((prev) => prev.filter((s) => s.id !== deletingSite.id))
    if (viewingSite?.id === deletingSite.id) {
      setViewingSite(null)
      setFullView(false)
    }
    setDeletingSite(null)
  }

  function closeView() {
    setViewingSite(null)
    setFullView(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-ink-900">Construction Site Locations</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search site engineers..."
              className="border border-ink-900/10 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 w-56"
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 bg-leaf-500 hover:bg-leaf-600 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      <div className="stat-card border-t-brand-0 overflow-hidden p-0">
        <div className="h-80">
          <MapContainer center={[19.7, 75.5]} zoom={6} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sites.map((s) => (
              <Marker key={s.id} position={[s.lat, s.lng]}>
                <Popup>
                  <strong>{s.location}</strong>
                  <br />
                  {s.specialization}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-brand-700 border-b border-ink-900/8">
              <th className="px-5 py-3 font-semibold">Location</th>
              <th className="px-5 py-3 font-semibold">Specialization</th>
              <th className="px-5 py-3 font-semibold">Address</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Assigned Team</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loaded && filtered.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState message="No construction sites found." />
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-900/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-ink-900">{s.location}</td>
                  <td className="px-5 py-3 text-ink-700">{s.specialization}</td>
                  <td className="px-5 py-3 text-ink-700">{s.address}</td>
                  <td className="px-5 py-3 text-ink-700">{s.contact}</td>
                  <td className="px-5 py-3 text-ink-700">{(s.team || []).join(', ')}</td>
                  <td className="px-5 py-3 text-right">
                    <ActionMenu
                      onView={() => {
                        setViewingSite(s)
                        setFullView(false)
                      }}
                      onEdit={() => setEditingSite(s)}
                      onDelete={() => setDeletingSite(s)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {adding && (
        <FormModal
          title="Add New Construction Site"
          fields={siteFields}
          initialValues={emptySite}
          submitLabel="Create Site"
          onClose={() => setAdding(false)}
          onSave={handleCreate}
        />
      )}

      {editingSite && (
        <FormModal
          title="Edit Construction Site"
          fields={siteFields}
          initialValues={toFormValues(editingSite)}
          onClose={() => setEditingSite(null)}
          onSave={handleSave}
        />
      )}

      {viewingSite && !fullView && (
        <DetailModal
          title={viewingSite.location}
          fields={[
            { label: 'Specialization', value: viewingSite.specialization },
            { label: 'Address', value: viewingSite.address },
            { label: 'Contact', value: viewingSite.contact },
            { label: 'Team', value: (viewingSite.team || []).join(', ') || '—' },
          ]}
          onClose={closeView}
          onViewMore={() => setFullView(true)}
        />
      )}

      {viewingSite && fullView && (
        <FullDetailView
          title={viewingSite.location}
          subtitle={viewingSite.specialization}
          sections={[
            {
              heading: 'Site Details',
              fields: [
                { label: 'Address', value: viewingSite.address },
                { label: 'Contact', value: viewingSite.contact },
                { label: 'Specialization', value: viewingSite.specialization },
              ],
            },
            {
              heading: 'Team & Coordinates',
              fields: [
                { label: 'Assigned Team', value: (viewingSite.team || []).join(', ') || '—' },
                { label: 'Latitude', value: viewingSite.lat },
                { label: 'Longitude', value: viewingSite.lng },
              ],
            },
          ]}
          onClose={closeView}
          onEdit={() => {
            setEditingSite(viewingSite)
            closeView()
          }}
          onDelete={() => setDeletingSite(viewingSite)}
        />
      )}

      {deletingSite && (  // still not using this features 
        <ConfirmDialog
          title="Delete Construction Site"
          message={`Are you sure you want to remove ${deletingSite.location}? This cannot be undone.`}
          onCancel={() => setDeletingSite(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}