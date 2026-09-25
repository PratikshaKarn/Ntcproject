import ActionMenu from "../ActionMenu"

function SiteEngineersTable({
  engineers,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-brand-700 border-b border-ink-900/8">
            <th className="px-5 py-3 font-semibold">Team</th>
            <th className="px-5 py-3 font-semibold">Specialization</th>
            <th className="px-5 py-3 font-semibold">Qualification</th>
            <th className="px-5 py-3 font-semibold">Contact</th>
            <th className="px-5 py-3 font-semibold">Availability</th>
            <th className="px-5 py-3 font-semibold text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {engineers.map((t) => (
            <tr
              key={t.id}
              className="border-b border-ink-900/5 last:border-0"
            >
              <td className="px-5 py-3 font-medium text-ink-900">
                {t.name}
              </td>

              <td className="px-5 py-3 text-ink-700">
                {t.specialization}
              </td>

              <td className="px-5 py-3 text-ink-700">
                {t.qualification}
              </td>

              <td className="px-5 py-3 text-ink-700">
                {t.contact}
              </td>

              <td className="px-5 py-3">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    t.availability === 'Available'
                      ? 'bg-leaf-50 text-leaf-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {t.availability}
                </span>
              </td>

              <td className="px-5 py-3 text-right">
                <ActionMenu
                  onView={() => onView(t)}
                  onEdit={() => onEdit(t)}
                  onDelete={() => onDelete(t)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SiteEngineersTable