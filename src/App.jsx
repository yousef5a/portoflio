import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import LoginModal from "./components/LoginModal";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const { isAdmin, login, logout } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = (username, password) => {
    const success = login(username, password);
    if (success) setLoginModalOpen(false);
    return success;
  };

  return (
    <div className="bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Loading Animation Screen */}
      <LoadingScreen />

      {/* Main Page Layout */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isAdmin={isAdmin}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={logout}
      />

      {/* Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects isAdmin={isAdmin} />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Admin Dashboard Section */}
      {isAdmin && <AdminDashboard isAdmin={isAdmin} onLogout={logout} />}

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/50 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>&copy; {new Date().getFullYear()} Mohamed Esam Khodary. All rights reserved.</span>
          <span>Designed &amp; Built with React &amp; TailwindCSS</span>
        </div>
      </footer>
    </div>
  );
}
