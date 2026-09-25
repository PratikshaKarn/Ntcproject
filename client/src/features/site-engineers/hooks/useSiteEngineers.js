import { useEffect, useState } from 'react'
import { getSiteEngineers } from '../../../api/client.js'

export function useSiteEngineers() {
  const [team, setTeam] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('')

  const [adding, setAdding] = useState(false)
  const [viewingEngineer, setViewingEngineer] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingEngineer, setEditingEngineer] = useState(null)
  const [deletingEngineer, setDeletingEngineer] = useState(null)

  useEffect(() => {
    getSiteEngineers().then((data) => {
      setTeam(data)
      setLoaded(true)
    })
  }, [])

  const filtered = team.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.specialization.toLowerCase().includes(query.toLowerCase()),
  )

  function handleCreate(values) {
    const newEngineer = { id: Date.now(), ...values }
    setTeam((prev) => [newEngineer, ...prev])
    setAdding(false)
  }

  function handleSave(updated) {
    setTeam((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setEditingEngineer(null)
  }

  function handleDeleteConfirm() {
    setTeam((prev) => prev.filter((t) => t.id !== deletingEngineer.id))
    if (viewingEngineer?.id === deletingEngineer.id) {
      setViewingEngineer(null)
      setFullView(false)
    }
    setDeletingEngineer(null)
  }

  function closeView() {
    setViewingEngineer(null)
    setFullView(false)
  }

  return {
    team, loaded, filtered, query, setQuery,
    adding, setAdding,
    viewingEngineer, setViewingEngineer, fullView, setFullView,
    editingEngineer, setEditingEngineer, deletingEngineer, setDeletingEngineer,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  }
}