import { useState } from "react";
import { FaTimes, FaLock, FaEnvelope, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await onLogin(email, password);
    setLoading(false);
    if (success) {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-slate-805 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          aria-label="Close modal"
        >
          <FaTimes size={16} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="p-3.5 rounded-full bg-sky-500/10 text-sky-500 mb-3 border border-sky-500/20">
            <FaLock size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Admin Authentication
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Enter administrator credentials to login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <FaEnvelope size={14} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
            />
          </div>

          <div className="relative">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FaLock size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Verifying...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
