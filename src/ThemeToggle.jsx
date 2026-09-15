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
  const transitionTimer = useRef(null);
  const icon = useRef(null);
  const iconAnimation = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      clearTimeout(transitionTimer.current);
      document.documentElement.classList.remove("theme-changing");
      iconAnimation.current?.cancel();
    };
    const changed = () => { if (motion.matches) settle(); };
    motion.addEventListener("change", changed);
    return () => { settle(); motion.removeEventListener("change", changed); };
  }, []);

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
    const root = document.documentElement;
    clearTimeout(transitionTimer.current);
    iconAnimation.current?.cancel();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-changing");
      // Establish transition rules before changing the palette, including on
      // the first click. The temporary rules never animate initial page load.
      void getComputedStyle(root).backgroundColor;
      transitionTimer.current = setTimeout(() => root.classList.remove("theme-changing"), 350);
      if (icon.current?.animate) {
        iconAnimation.current = icon.current.animate(
          [{ transform: `rotate(${next === "dark" ? -35 : 35}deg)`, opacity: 0.5 },
            { transform: "rotate(0deg)", opacity: 1 }],
          { duration: 300, easing: "ease-out" },
        );
        iconAnimation.current.id = "theme-icon";
      }
    } else root.classList.remove("theme-changing");
    preference.current = next;
    try { localStorage.setItem(storageKey, next); } catch { /* Session still works. */ }
    setTheme(next);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle}
      aria-label="Dark mode" aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <svg ref={icon} width="20" height="20" viewBox="0 0 24 24" fill="none"
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
