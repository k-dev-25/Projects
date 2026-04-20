import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Transactions from "./pages/Transactions.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import Budget from "./pages/Budget.jsx";
import Analytics from "./pages/Analytics.jsx";

const THEME_STORAGE_KEY = "finsight-theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/transactions/new", label: "Add" },
  { to: "/budget", label: "Budget" },
  { to: "/analytics", label: "Analytics" },
];

function App() {
  const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="min-h-screen bg-background text-text">
        <header className="border-b border-black/10 dark:border-white/10">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-center md:text-left">
              FinSight
            </h1>
            <div className="w-full md:w-auto overflow-x-auto">
              <div className="flex items-center justify-start md:justify-end gap-2 min-w-max pb-1">
                <button
                  onClick={handleToggleTheme}
                  className="px-3 py-1.5 rounded-lg text-sm bg-card border border-black/10 dark:border-white/10"
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm transition ${
                        isActive ? "bg-primary text-white" : "bg-card"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
