import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-between w-16 h-8 p-1 bg-slate-300 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle theme"
    >
      <div className="absolute left-1.5 text-xs text-amber-500 z-10 pointer-events-none">
        <FaSun />
      </div>
      
      <motion.div
        className="w-6 h-6 bg-white dark:bg-slate-950 rounded-full shadow-md z-20"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          marginLeft: isDark ? "auto" : "0px",
        }}
      />

      <div className="absolute right-1.5 text-xs text-sky-400 z-10 pointer-events-none">
        <FaMoon />
      </div>
    </button>
  );
}
