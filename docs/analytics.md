# Plausible Analytics

Status: public script URL configured locally. Not deployed; dashboard ingestion still unverified.

## Account setup

1. Start the trial at https://plausible.io/register. No paid subscription is authorized.
2. Register `mobeenkhan.com`, reporting timezone Australia/Sydney.
3. In General → Tracking → Site Installation, copy the public script `src` URL into `plausibleScriptUrl` in `src/analytics.js`. Do not use an API key.
4. Outbound-link tracking is enabled in code for live-demo/social link clicks. Add the custom-event goal `Contact Click` for email-link activation, and the `Outbound Link: Click` goal if it is not already present. This is intent, not confirmed email delivery.
5. Build and review, then deploy only when authorized. Verify pageviews and goals in the real dashboard after deployment; local checks cannot confirm ingestion.

The tracker loads only in production builds on the apex/www portfolio hostnames. Localhost and preview domains never load it. Route-driven pageviews distinguish hash-based project pages, including React links and browser history. Automatic pageviews are disabled, and repeated effects for the same URL are deduplicated. Contact tracking sends only a fixed event name, not the email URL or its query parameters. No session replay or personal-data custom properties are configured.

## Source tagging

Use generic UTM values, not names, emails or application identifiers. Put campaign parameters BEFORE the hash route:

- LinkedIn profile: `https://www.mobeenkhan.com/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio`
- Resume: `https://www.mobeenkhan.com/?utm_source=resume&utm_medium=document&utm_campaign=job_search`
- Applications: `https://www.mobeenkhan.com/?utm_source=application&utm_medium=referral&utm_campaign=job_search`

Untagged visits may be reported as Direct when the source does not supply a referrer. Browser blocking also affects measurement. No historical traffic can be recovered by this new installation.

References: https://plausible.io/docs/hash-based-routing and https://plausible.io/docs/script-extensions
