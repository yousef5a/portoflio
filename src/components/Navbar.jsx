import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt, FaCog } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const baseLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ theme, setTheme, isAdmin, onLoginClick, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const links = isAdmin
    ? [...baseLinks, { href: "#admin-dashboard", label: "Dashboard" }]
    : baseLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const scrollPos = window.scrollY + 100;
      for (const link of links) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        onLoginClick();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onLoginClick]);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-lg font-black bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent tracking-wider hover:opacity-85 transition-opacity"
        >
          MOHAMED.ESAM
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative py-1 transition-colors hover:text-sky-500 ${
                  isActive
                    ? "text-sky-500 dark:text-sky-400"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          
          {isAdmin ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-all duration-300"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500 hover:text-white text-xs font-semibold transition-all duration-300"
            >
              <FaSignInAlt /> Admin
            </button>
          )}
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          
          {isAdmin ? (
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
              aria-label="Sign Out"
            >
              <FaSignOutAlt size={16} />
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="p-2 rounded-lg text-sky-500 hover:bg-sky-500/10 transition-colors"
              aria-label="Admin Sign In"
            >
              <FaSignInAlt size={16} />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-100 dark:bg-slate-950 border-b border-slate-200/50 dark:border-white/10 px-6 py-6 space-y-4 shadow-xl transition-all duration-300">
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-base font-semibold py-2 px-3 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-sky-500/10 text-sky-500 dark:text-sky-400 pl-5"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {id === "admin-dashboard" && <FaCog className="animate-spin text-xs text-sky-500" />}
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
