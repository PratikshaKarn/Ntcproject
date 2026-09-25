import { useEffect, useState } from 'react'
import { getMaterialLog } from '../../../api/client.js'

function recomputeAggregates(entries, prevLog) {
  const totalCollection = entries.reduce((sum, e) => sum + Number(e.qty || 0), 0)
  const totalAmount = entries.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  const morningEntries = entries.filter((e) => e.shift === 'Morning')
  const eveningEntries = entries.filter((e) => e.shift === 'Evening')
  const morning = {
    qty: morningEntries.reduce((s, e) => s + Number(e.qty || 0), 0),
    amount: morningEntries.reduce((s, e) => s + Number(e.amount || 0), 0),
  }
  const evening = {
    qty: eveningEntries.reduce((s, e) => s + Number(e.qty || 0), 0),
    amount: eveningEntries.reduce((s, e) => s + Number(e.amount || 0), 0),
  }
  return {
    ...prevLog,
    entries,
    totalCollection,
    totalAmount,
    morning,
    evening,
    records: entries.length,
    avgRate: totalCollection > 0 ? totalAmount / totalCollection : 0,
  }
}

export function useMaterialLog() {
  const [log, setLog] = useState(null)

  const [adding, setAdding] = useState(false)
  const [viewingEntry, setViewingEntry] = useState(null)
  const [fullView, setFullView] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [deletingEntry, setDeletingEntry] = useState(null)

  useEffect(() => {
    getMaterialLog().then(setLog)
  }, [])

  function handleCreate(values) {
    const qty = Number(values.qty)
    const rate = Number(values.rate)
    const newEntry = {
      id: `E${Date.now()}`,
      material: values.material,
      site: values.site,
      shift: values.shift,
      qty,
      unit: values.unit,
      rate,
      amount: qty * rate,
    }
    setLog((prev) => recomputeAggregates([newEntry, ...prev.entries], prev))
    setAdding(false)
  }

  function handleSave(values) {
    const qty = Number(values.qty)
    const rate = Number(values.rate)
    const updated = { ...editingEntry, ...values, qty, rate, amount: qty * rate }
    setLog((prev) =>
      recomputeAggregates(
        prev.entries.map((e) => (e.id === updated.id ? updated : e)),
        prev,
      ),
    )
    setEditingEntry(null)
  }

  function handleDeleteConfirm() {
    setLog((prev) => recomputeAggregates(prev.entries.filter((e) => e.id !== deletingEntry.id), prev))
    if (viewingEntry?.id === deletingEntry.id) {
      setViewingEntry(null)
      setFullView(false)
    }
    setDeletingEntry(null)
  }

  function closeView() {
    setViewingEntry(null)
    setFullView(false)
  }

  return {
    log,
    adding, setAdding,
    viewingEntry, setViewingEntry, fullView, setFullView,
    editingEntry, setEditingEntry, deletingEntry, setDeletingEntry,
    handleCreate, handleSave, handleDeleteConfirm, closeView,
  }
}