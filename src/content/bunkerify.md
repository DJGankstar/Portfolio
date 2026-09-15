## What I built

Bunkerify helps small businesses work through a security self-assessment and see where they could improve. I built the application, scoring system, login, reports and website-scanner integration.

## How it works

The scoring engine maps 19 questions to the ACSC Essential Eight categories and calculates weighted maturity levels. These results are guidance based on the user's answers, not a certification or an independent audit.

After the assessment, users can view their results, receive an HTML email report and book a consultation. Next.js handles the application, Supabase handles authentication and storage, and SendGrid sends the emails. The site is deployed on Vercel.

## Adding the website scanner

The scanner adds technical findings to the results page and email report. New users provide an email address before scanning. Returning users who are signed in can go straight to the scan.

The assessment and scanner check different things. Neither can establish that a business is secure on its own.

## The result

The deployed app brings the assessment, scan results, reports and follow-up into one place.
