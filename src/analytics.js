// Public installation URL supplied by Plausible's Site Installation screen.
// Leave empty until the site has been registered. Never put an API key here.
export const plausibleScriptUrl = "https://plausible.io/js/pa-5ce9ddjM9ZB8-nMLPe65_.js";

export function setupAnalytics(scriptUrl = plausibleScriptUrl) {
  if (!scriptUrl || !["mobeenkhan.com", "www.mobeenkhan.com"].includes(window.location.hostname)) return;
  let url;
  try { url = new URL(scriptUrl); } catch { return; }
  if (url.origin !== "https://plausible.io" || !url.pathname.startsWith("/js/") || url.search || url.hash) return;
  if (document.getElementById("portfolio-analytics")) return;

  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
  window.plausible.init = window.plausible.init || function (options) {
    window.plausible.o = options;
  };
  window.plausible.init({ hashBasedRouting: true, autoCapturePageviews: false, captureOnLocalhost: false, outboundLinks: true });
  const script = document.createElement("script");
  script.id = "portfolio-analytics";
  script.async = true;
  script.src = url.href;
  document.head.append(script);

  // One delegated listener handles mouse and keyboard activation across routes.
  // Never transmit email addresses, subject lines or other link parameters.
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (link?.getAttribute("href")?.startsWith("mailto:")) {
      try { window.plausible("Contact Click"); } catch { /* Analytics must not break navigation. */ }
    }
  });
}

let lastPageUrl;
export function trackPageview() {
  if (!document.getElementById("portfolio-analytics") || typeof window.plausible !== "function") return;
  const url = window.location.href;
  if (url === lastPageUrl) return;
  lastPageUrl = url;
  try { window.plausible("pageview"); } catch { /* Navigation works even if analytics fails. */ }
}
