# Portfolio screenshot captures

## Khan Security Testing refresh — 9 September 2026

- Fresh live captures from https://khansecuritytesting.com/ (redirected from www), approximately 19:39 AEST. Desktop/mobile both returned HTTP 200 and the current “Understand the risks. Know what to fix.” heading, with no broken images detected.
- Desktop viewport 1440 × 1000; mobile 390 × 844; both at 2× device scale, fresh Chromium 151 contexts, light system colour preference. Mobile uses touch emulation. Fonts/images were awaited and the page returned to the top after scroll reveals settled. Motion was enabled while loading; screenshots froze CSS animations. No forms or account actions were submitted.
- Replaced `public/images/khan-security-testing.png` and `public/images/khan-security-testing-mobile.png`. Existing references update the homepage hero/backdrop, selected-work card, archive and responsive case-study gallery together.
- Previous images and new full-page reference captures are preserved in the local ignored `artifacts/portfolio-redesign/kst-refresh-2026-09-09/` folder. No other projects’ images changed.

## Bunkerify before & after — 9 September 2026

- Before: original blue/cyan public site captured on 8 September 2026. Copied without modification from the dated archive at `/home/mobeen/openclaw-workspace/artifacts/bunkerify/before-2026-09-08/`; that archive and its manifest remain untouched.
- After: live graphite/lime redesign at https://www.bunkerify.com/ captured on 9 September 2026, approximately 12:17 AEST. Both desktop and mobile returned HTTP 200 with the heading “Your business. Better defended.” and no broken images.
- Matching capture settings: Chromium 151, desktop viewport 1440 × 1000, mobile viewport 390 × 844, 2× device scale, light system colour preference, Australia/Sydney timezone and en-AU locale. Mobile uses touch/mobile emulation. Fonts/images were awaited; the full page was scrolled to reveal content; screenshot animation freezing was enabled. No forms were submitted or assessments started.
- Files: `public/images/bunkerify/{before,after}-{desktop,mobile}.png` for viewport shots and corresponding `-full.png` files for the original full-page captures. These are real browser screenshots, not generated images.
- Homepage hero, selected-work card and archive now use `after-desktop.png`. The case study offers dated before/after pairs with desktop/mobile switching and links to full-page captures. The older `public/images/bunkerify.png` is retained but no longer used by these previews.

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
