export default function SettingsPage() {
  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div>
        <h1 className="font-display text-xl font-bold text-brand-700">
          Company Settings
        </h1>

        <p className="text-sm text-ink-400">
          Manage company information and construction business details.
        </p>
      </div>

      {/* Company Information */}
      <div className="stat-card max-w-3xl">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-ink-900">
            About Construction Work
          </h2>

          <p className="text-sm text-ink-400 mt-1">
            Company information displayed across the construction management
            platform.
          </p>
        </div>

        <div className="space-y-5">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">
              Company Name
            </label>

            <input
              type="text"
              value="Construction Work"
              readOnly
              className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm bg-gray-50 text-ink-900"
            />
          </div>

          {/* Company Description */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1">
              About Company
            </label>

            <textarea
              rows="5"
              readOnly
              value="Construction Work is a civil engineering company focused on delivering reliable, safe, and efficient solutions for residential, commercial, and infrastructure projects. The company combines engineering expertise, project management, skilled professionals, and modern construction practices to successfully plan and execute projects."
              className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm bg-gray-50 text-ink-900 resize-none"
            />
          </div>

          {/* Business Focus */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Business Focus
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div className="border border-ink-900/10 rounded-md p-3">
                <p className="font-medium text-ink-900 text-sm">
                  Civil Engineering
                </p>
                <p className="text-xs text-ink-400 mt-1">
                  Engineering planning, structural work, and technical
                  construction solutions.
                </p>
              </div>

              <div className="border border-ink-900/10 rounded-md p-3">
                <p className="font-medium text-ink-900 text-sm">
                  Construction Management
                </p>
                <p className="text-xs text-ink-400 mt-1">
                  Planning, coordination, monitoring, and execution of
                  construction projects.
                </p>
              </div>

              <div className="border border-ink-900/10 rounded-md p-3">
                <p className="font-medium text-ink-900 text-sm">
                  Site Management
                </p>
                <p className="text-xs text-ink-400 mt-1">
                  Monitoring construction sites, engineers, workers,
                  materials, and project activities.
                </p>
              </div>

              <div className="border border-ink-900/10 rounded-md p-3">
                <p className="font-medium text-ink-900 text-sm">
                  Infrastructure Projects
                </p>
                <p className="text-xs text-ink-400 mt-1">
                  Supporting the development and management of commercial,
                  residential, and infrastructure projects.
                </p>
              </div>

            </div>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="text-sm font-semibold text-ink-900 mb-3">
              Company Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <p className="text-xs text-ink-400">
                  Industry
                </p>
                <p className="text-sm font-medium text-ink-900 mt-1">
                  Construction & Civil Engineering
                </p>
              </div>

              <div>
                <p className="text-xs text-ink-400">
                  Company
                </p>
                <p className="text-sm font-medium text-ink-900 mt-1">
                  Construction Work
                </p>
              </div>

              <div>
                <p className="text-xs text-ink-400">
                  Platform
                </p>
                <p className="text-sm font-medium text-ink-900 mt-1">
                  Construction Management System
                </p>
              </div>

              <div>
                <p className="text-xs text-ink-400">
                  Primary Users
                </p>
                <p className="text-sm font-medium text-ink-900 mt-1">
                  Engineers, Contractors & Administrators
                </p>
              </div>

            </div>
          </div>

          {/* System Purpose */}
          <div className="border-t border-ink-900/10 pt-5">

            <h3 className="text-sm font-semibold text-ink-900 mb-2">
              About This Platform
            </h3>

            <p className="text-sm text-ink-700 leading-6">
              This platform is designed to help Construction Work manage
              construction projects efficiently. It provides centralized
              management of employees, site engineers, construction sites,
              materials, project information, and important site alerts.
              The system helps administrators maintain better visibility
              and coordination across ongoing construction activities.
            </p>

          </div>

        </div>
      </div>
    </div>
  )
}