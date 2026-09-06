# Portfolio screenshot captures

## 6 September 2026

Captured from the public live websites in fresh Chromium sessions. Reduced motion was enabled except for the corrected JZ Tech desktop capture described below. Desktop viewport: 1440 × 1000; mobile: 390 × 844. These are browser screenshots, not mockups.

- JZ Tech — https://www.jztech.com.au/ — `public/images/jztech/{desktop,mobile}.png`
- Golden Hour Pilates — https://www.goldenhourpilates.com.au/ — `public/images/golden-hour/after-{desktop,mobile}.png` and corresponding `-full.png` captures.
- JZ Supports & Maintenance — https://www.jzsm.com.au/ — `public/images/jzsm/{desktop,mobile}.png`
- Khan Security Testing — https://khansecuritytesting.com/ — `public/images/khan-security-testing.png` and `khan-security-testing-mobile.png`.
- Bunkerify — https://www.bunkerify.com/ — `public/images/bunkerify.png` (desktop).

KST was recaptured at 12:18 AEST following the reported deployment fix, using fresh browser contexts and cache-busting page requests. Both views returned HTTP 200. The mobile capture was identical to the earlier screenshot; the desktop capture was refreshed. These captures verify the served appearance, not the deployment's commit or security checks.

JZ Tech desktop was recaptured after 14:29 AEST with motion enabled: the earlier reduced-motion shot showed fallback artwork instead of the updated video. The replacement captures the live `/brand/jztech-hero-gemini.mp4` at approximately four seconds, with video playback and readiness confirmed. The mobile image remains the live site's mobile/reduced-motion presentation.

Golden Hour's `before-*` images remain historical reference captures and were not replaced.

Incident Console's public Render URL returned HTTP 503 / “Service Suspended” during this refresh. Its previous interface screenshot was retained; it is not a current live capture. Other application screenshots without an available public capture were also left unchanged.
