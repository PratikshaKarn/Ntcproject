import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { clearAuth } from "../../auth.js";

/**
 * Logout.jsx — frontend-only for now.
 *
 * TODO (backend integration):
 *   - Call your real logout/session-invalidation endpoint before (or
 *     alongside) clearing local storage, e.g.
 *       await api.post("/auth/logout");
 *   - If you switch to httpOnly cookies for the session, this page
 *     mostly just needs to trigger that endpoint — there won't be a
 *     token in localStorage to clear.
 */
export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuth();
    onLogout?.();

    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 900);

    return () => clearTimeout(timer);
  }, [navigate, onLogout]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6">
      <div className="stat-card max-w-sm w-full text-center py-10">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-brand-700/20 border-t-brand-700 animate-spin" />

        <h1 className="font-display text-lg font-bold text-ink-900">
          Signing you out
        </h1>
        <p className="text-sm text-ink-400 mt-1">
          Your session is being closed. You'll be redirected to sign in.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 text-sm font-medium text-brand-700 hover:underline"
        >
          Return to sign in now
        </Link>
      </div>
    </div>
  );
}