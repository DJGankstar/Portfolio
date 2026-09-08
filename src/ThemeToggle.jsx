import { useEffect, useRef, useState } from "react";

const storageKey = "portfolio-theme";
const isTheme = (value) => value === "light" || value === "dark";
function savedTheme() {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme || "light",
  );
  const preference = useRef(savedTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", theme === "dark" ? "#181a19" : "#f6f5ef",
    );
  }, [theme]);

  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      if (!isTheme(preference.current)) setTheme(system.matches ? "dark" : "light");
    };
    const syncTabs = (event) => {
      if (event.key !== storageKey && event.key !== null) return;
      preference.current = savedTheme();
      setTheme(isTheme(preference.current)
        ? preference.current : system.matches ? "dark" : "light");
    };
    followSystem();
    window.addEventListener("storage", syncTabs);
    system.addEventListener("change", followSystem);
    return () => {
      window.removeEventListener("storage", syncTabs);
      system.removeEventListener("change", followSystem);
    };
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    preference.current = next;
    try { localStorage.setItem(storageKey, next); } catch { /* Session still works. */ }
    setTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle}
      aria-label="Dark mode" aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        {theme === "dark" ? <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </> : <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />}
      </svg>
    </button>
  );
}
