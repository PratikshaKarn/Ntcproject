import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

/**
 * Login.jsx — frontend-only for now.
 *
 * TODO (backend integration):
 *   - Replace the fake `setTimeout` below with a real call, e.g.
 *       const res = await api.post("/auth/login", { email, password });
 *   - Store the real token/user returned by the server instead of the
 *     mock object.
 *   - Surface real validation/auth errors from the API response instead
 *     of the generic "Invalid email or password" message.
 *
 * Until then this simply accepts any well-formed email + a password of
 * 6+ characters, stores a mock session in localStorage, and redirects.
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // If ProtectedRoute redirected here, send the user back to the page
  // they originally asked for once they log in. Otherwise default to /admin.
  const redirectTo = location.state?.from?.pathname ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // --- mock auth, swap for a real API call later ---
    setTimeout(() => {
      const mockUser = {
        email,
        name: email.split("@")[0],
        token: "mock-token",
      };

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("authUser", JSON.stringify(mockUser));

      setLoading(false);
      navigate(redirectTo, { replace: true });
    }, 600);
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Brand panel */}
      <div className="relative hidden lg:flex lg:w-[60%] flex-col justify-between bg-brand-700 text-white overflow-hidden">
        {/* blueprint grid texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* corner registration marks, blueprint-style */}
        <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/40" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/40" />

        <div className="relative z-10 px-10 pt-12">
          <p className="text-xs tracking-[0.2em] uppercase text-white/60">
            Construction Management System
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">
            Spell Innovation
          </h1>
        </div>

        <div className="relative z-10 px-10 pb-12">
          <p className="text-sm text-white/70 leading-6 max-w-sm">
            Centralized visibility across sites, engineers, materials, and
            projects — built for the teams who keep them running.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden text-center">
            <h1 className="font-display text-xl font-bold text-brand-700">
              Spell Innovation
            </h1>
            <p className="text-xs text-ink-400 mt-1">
              Construction Management System
            </p>
          </div>

          <h2 className="text-lg font-semibold text-ink-900">Sign in</h2>
          <p className="text-sm text-ink-400 mt-1 mb-6">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-ink-900/10 rounded-md px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-ink-900/10 rounded-md px-3 py-2 pr-10 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-ink-900/20 text-brand-700 focus:ring-brand-700/30"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-brand-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 text-white text-sm font-medium rounded-md px-3 py-2.5 hover:bg-brand-700/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-ink-400 text-center mt-8">
            Having trouble signing in? Contact your administrator.
          </p>
        </div>
      </div>
    </div>
  ); 
}