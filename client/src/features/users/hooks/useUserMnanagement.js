import { useEffect, useState } from 'react'
import { getUsers } from '../../../api/client.js'

export function useUserManagement() {
  const [users, setUsers] = useState(null)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')

  const [adding, setAdding] = useState(false)
  const [viewingUser, setViewingUser] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const filtered = (users ?? []).filter((u) => {
    const q = query.toLowerCase()
    const matchesQuery =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    const matchesRole = role === 'all' || u.role === role
    return matchesQuery && matchesRole
  })

  function handleCreate(values) {
    const newUser = { id: Date.now(), ...values }
    setUsers((prev) => [newUser, ...prev])
    setAdding(false)
  }

  function handleSave(updated) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    setEditingUser(null)
  }

  function handleDeleteConfirm() {
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id))
    if (viewingUser?.id === deletingUser.id) {
      setViewingUser(null)
      setFullView(false)
    }
    setDeletingUser(null)
  }

  function closeView() {
    setViewingUser(null)
    setFullView(false)
  }

  return {
    users, filtered, query, setQuery, role, setRole,
    adding, setAdding,
    viewingUser, setViewingUser, fullView, setFullView,
    editingUser, setEditingUser, deletingUser, setDeletingUser,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  }
}