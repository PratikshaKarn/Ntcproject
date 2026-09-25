import { useEffect, useState } from 'react'
import { getEmployees } from '../../../api/client.js'

export function useHumanResource() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')

  const [adding, setAdding] = useState(false)
  const [viewingEmployee, setViewingEmployee] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [deletingEmployee, setDeletingEmployee] = useState(null)

  useEffect(() => {
    getEmployees().then(setUsers)
  }, [])

  const filtered = users.filter((u) => {
    const q = query.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.position.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    )
  })

  function handleCreate(values) {
    const newEmployee = { id: Date.now(), ...values }
    setUsers((prev) => [newEmployee, ...prev])
    setAdding(false)
  }

  function handleSave(updated) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
    setEditingEmployee(null)
  }

  function handleDeleteConfirm() {
    setUsers((prev) => prev.filter((u) => u.id !== deletingEmployee.id))
    if (viewingEmployee?.id === deletingEmployee.id) {
      setViewingEmployee(null)
      setFullView(false)
    }
    setDeletingEmployee(null)
  }

  function closeView() {
    setViewingEmployee(null)
    setFullView(false)
  }

  return {
    users, filtered, query, setQuery,
    adding, setAdding,
    viewingEmployee, setViewingEmployee, fullView, setFullView,
    editingEmployee, setEditingEmployee, deletingEmployee, setDeletingEmployee,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  }
}