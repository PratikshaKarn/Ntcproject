/** Slim dashboard footer. Lives outside the scroll area so it stays pinned. */
export default function FooterAdmin() {
  return (
    <footer className="shrink-0 bg-nt-dark text-white/70 px-4 sm:px-6 py-3 text-xs flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
      <span>© {new Date().getFullYear()} Construction Work Pvt. Ltd. All rights reserved.</span>
      <span className="flex gap-4">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Help Center</a>
      </span>
    </footer>
  )
}
