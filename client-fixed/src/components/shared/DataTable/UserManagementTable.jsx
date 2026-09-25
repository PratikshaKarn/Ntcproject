import ActionMenu from "../ActionMenu"

function UserManagementTable({ users, onView, onEdit, onDelete }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-brand-700 border-b border-ink-900/8">
          <th className="py-2.5 font-semibold">Name</th>
          <th className="py-2.5 font-semibold">Email</th>
          <th className="py-2.5 font-semibold">Role</th>
          <th className="py-2.5 font-semibold text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr
            key={u.id}
            className="border-b border-ink-900/5 last:border-0"
          >
            <td className="py-3 flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
                {u.name[0]}
              </span>

              <span className="font-medium text-ink-900">
                {u.name}
              </span>
            </td>

            <td className="py-3 text-ink-700">
              {u.email}
            </td>

            <td className="py-3">
              {u.role}
            </td>

            <td className="py-3 text-right">
              <ActionMenu
                onView={() => onView(u)}
                onEdit={() => onEdit(u)}
                onDelete={() => onDelete(u)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserManagementTable