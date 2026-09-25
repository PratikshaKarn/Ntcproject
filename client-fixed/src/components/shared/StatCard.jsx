import { TrendingUp, TrendingDown } from 'lucide-react'

const ICON_BG = {
  brand: 'bg-brand-100 text-brand-600',
  leaf: 'bg-leaf-50 text-leaf-600',
  purple: 'bg-purple-100 text-purple-600',
}
const TREND_BG = {
  up: 'bg-leaf-50 text-leaf-700',
  down: 'bg-rose-50 text-rose-600',
}

export default function StatCard({ label, value, deltaPct, icon: Icon, accent = 'brand' }) {
  const positive = deltaPct >= 0

  return (
    <div
      className="group relative overflow-hidden rounded-card bg-gray-50 p-5
                 border border-ink-900/[0.06]
                 shadow-[0_1px_2px_rgba(21,34,43,0.04),0_1px_1px_rgba(21,34,43,0.03)]
                 transition-all duration-200 ease-out
                 hover:shadow-[0_8px_20px_-4px_rgba(21,34,43,0.10),0_2px_6px_-2px_rgba(21,34,43,0.06)]
                 hover:-translate-y-[2px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink-400 tracking-wide uppercase">
            {label}
          </p>
          <p className="mt-1.5 font-display text-[28px] leading-none font-bold text-ink-900 tracking-tight">
            {value}
          </p>
        </div>

        {Icon && (
          <span
            className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center
                        ring-1 ring-inset ring-black/[0.03] ${ICON_BG[accent]}
                        transition-transform duration-200 group-hover:scale-105`}
          >
            <Icon size={20} strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5
                      text-xs font-semibold ${positive ? TREND_BG.up : TREND_BG.down}`}
        >
          {positive ? <TrendingUp size={12} strokeWidth={2.5} /> : <TrendingDown size={12} strokeWidth={2.5} />}
          {Math.abs(deltaPct)}%
        </span>
        <span className="text-xs text-ink-400">vs last month</span>
      </div>
    </div>
  )
}