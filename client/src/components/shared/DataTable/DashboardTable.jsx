import ActionMenu from "../ActionMenu"
function DashboardTable({ projects,statusStyle, onView, onEdit, onDelete }) {
  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-y border-ink-900/8 text-left text-ink-400">
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide">
              Project
            </th>
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide">
              Site Engineer
            </th>
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide">
              Status
            </th>
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide">
              Progress
            </th>
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide text-right">
              Budget
            </th>
            <th className="px-5 py-2.5 font-medium text-xs uppercase tracking-wide text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              className="border-b border-ink-900/6 last:border-b-0 hover:bg-paper/60 transition-colors"
            >
              <td className="px-5 py-3.5">
                <p className="font-medium text-ink-900">{p.name}</p>
                <p className="text-xs text-ink-400">{p.location}</p>
              </td>

              <td className="px-5 py-3.5 text-ink-700">
                {p.engineer}
              </td>

              <td className="px-5 py-3.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[p.status]}`}
                >
                  {p.status}
                </span>
              </td>

              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2 w-32">
                  <div className="flex-1 h-1.5 rounded-full bg-ink-900/8 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  <span className="text-xs text-ink-400 w-8 shrink-0">
                    {p.progress}%
                  </span>
                </div>
              </td>

              <td className="px-5 py-3.5 text-right font-medium text-ink-900">
                {p.budget}
              </td>

              <td className="px-5 py-3.5 text-right">
                <ActionMenu
                  onView={() => onView(p)}
                  onEdit={() => onEdit(p)}
                  onDelete={() => onDelete(p)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable