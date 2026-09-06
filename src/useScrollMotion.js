import { useEffect } from "react";

// The document is visible by default; offscreen motion is an optional enhancement.
export function useScrollMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    )
      return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...root.querySelectorAll("[data-scroll-motion]")];
    const seen = new WeakSet();
    // Includes paused offscreen entrances as well as currently playing ones.
    const animations = new Map();
    let observer;

    function cancelAll() {
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
    }

    function settle(target) {
      seen.add(target);
      observer?.unobserve(target);
      animations.get(target)?.cancel();
      animations.delete(target);
    }

    function prepare(target) {
      const kind = target.dataset.scrollMotion;
      const from =
        kind === "portrait"
          ? { clipPath: "inset(0 0 25% 0)", opacity: 0.2 }
          : kind === "step"
            ? { transform: "translateX(36px)", opacity: 0.2 }
            : {
                transform: `translateY(${kind === "project" ? 60 : 40}px)`,
                opacity: 0.2,
              };
      const to =
        kind === "portrait"
          ? { clipPath: "inset(0)", opacity: 1 }
          : { transform: "translate(0)", opacity: 1 };
      const animation = target.animate([from, to], {
        duration: 800,
        delay:
          kind === "step" ? Number(target.dataset.motionOrder || 0) * 180 : 0,
        easing: "cubic-bezier(0.4, 0, 0.6, 1)",
        fill: "both",
      });
      // Establish the starting frame before the element enters the viewport.
      // Creating it at the intersection point caused a visible flash and reset.
      animation.pause();
      animation.currentTime = 0;
      animations.set(target, animation);
      const release = () => {
        if (animations.get(target) === animation) {
          animations.delete(target);
          animation.cancel(); // Return ownership to the normal, fully visible CSS.
        }
      };
      animation.finished.then(release, release);
    }

    function watch() {
      observer?.disconnect();
      cancelAll();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            if (!isIntersecting || seen.has(target)) continue;
            seen.add(target);
            observer.unobserve(target);
            if (target.contains(document.activeElement) || document.hidden) {
              settle(target);
            } else {
              animations.get(target)?.play();
            }
          }
        },
        { threshold: 0 },
      );

      for (const target of targets) {
        if (seen.has(target)) continue;
        const bounds = target.getBoundingClientRect();
        // Never reset content that is already visible or above a restored position.
        if (bounds.top < window.innerHeight) {
          seen.add(target);
          continue;
        }
        try {
          prepare(target);
          observer.observe(target);
        } catch {
          settle(target); // Partial API support must never strand a prepared card.
        }
      }
    }

    function settleFocused(event) {
      for (const target of animations.keys()) {
        if (target.contains(event.target)) settle(target);
      }
    }
    function settleHidden() {
      if (!document.hidden) return;
      for (const [target, animation] of animations) {
        if (animation.playState === "running") settle(target);
      }
    }

    watch();
    preference.addEventListener("change", watch);
    root.addEventListener("focusin", settleFocused);
    document.addEventListener("visibilitychange", settleHidden);
    return () => {
      observer?.disconnect();
      cancelAll();
      preference.removeEventListener("change", watch);
      root.removeEventListener("focusin", settleFocused);
      document.removeEventListener("visibilitychange", settleHidden);
    };
  }, [rootRef]);
}
