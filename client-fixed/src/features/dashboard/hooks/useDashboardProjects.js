import { useState } from 'react'
import { projects as INITIAL_PROJECTS } from '../../../data/mockData.js'   

export function useDashboardProjects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [viewingProject, setViewingProject] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  function handleSave(values) {
    const updated = { ...editingProject, ...values, progress: Number(values.progress) }
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setEditingProject(null)
  }

  function handleDeleteConfirm() {
    setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id))
    if (viewingProject?.id === deletingProject.id) {
      setViewingProject(null)
      setFullView(false)
    }
    setDeletingProject(null)
  }

  function closeView() {
    setViewingProject(null)
    setFullView(false)
  }

  return {
    projects, viewingProject, fullView, editingProject, deletingProject,
    setViewingProject, setFullView, setEditingProject, setDeletingProject,
    handleSave, handleDeleteConfirm, closeView,
  }
}
