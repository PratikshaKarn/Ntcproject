export default function FooterAdmin({ expanded }) {
  return (
    <footer className="flex">
      <div
        className={`hidden md:block shrink-0 bg-brand-400 transition-all duration-300 ease-in-out ${
          expanded ? 'w-64' : 'w-16'
        }`}
      />
      <div className="flex-1 min-w-0 bg-paper text-ink-400 px-4 sm:px-6 py-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-ink-900/8 text-center sm:text-left">
        <span>© 2026 Construction Work. All rights reserved.</span>
        <span className="flex gap-4">
          <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>
          <a href="#" className="text-brand-600 hover:underline">Terms of Service</a>
          <a href="#" className="text-brand-600 hover:underline">Help Center</a>
        </span>
      </div>
    </footer>
  )
}