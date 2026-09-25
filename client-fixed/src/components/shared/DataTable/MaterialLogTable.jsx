import ActionMenu from "../ActionMenu"

function MaterialLogTable({materials, onView, onEdit, onDelete}) {
  return (
    <div>
      <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-brand-700 border-b border-ink-900/8">
                      <th className="px-5 py-3 font-semibold">Entry</th>
                      <th className="px-5 py-3 font-semibold">Material</th>
                      <th className="px-5 py-3 font-semibold">Site</th>
                      <th className="px-5 py-3 font-semibold">Shift</th>
                      <th className="px-5 py-3 font-semibold text-right">Qty</th>
                      <th className="px-5 py-3 font-semibold text-right">Rate</th>
                      <th className="px-5 py-3 font-semibold text-right">Amount</th>
                      <th className="px-5 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((e) => (
                      <tr key={e.id} className="border-b border-ink-900/5 last:border-0">
                        <td className="px-5 py-3 text-ink-400 font-mono text-xs">{e.id}</td>
                        <td className="px-5 py-3 font-medium text-ink-900">{e.material}</td>
                        <td className="px-5 py-3 text-ink-700">{e.site}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${e.shift === 'Morning' ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'}`}>
                            {e.shift}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-ink-700">{e.qty.toLocaleString('en-IN')} {e.unit}</td>
                        <td className="px-5 py-3 text-right text-ink-700">₹{e.rate}</td>
                        <td className="px-5 py-3 text-right font-medium text-ink-900">₹{e.amount.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-3 text-right">
                          <ActionMenu
                            onView={() => {onView(e)}}
                            onEdit={() => {onEdit(e)}}
                            onDelete={() => {onDelete(e)}}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    </div>
  );
}

export default MaterialLogTable