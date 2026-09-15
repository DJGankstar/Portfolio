## Why I built it

Tailoring a resume involves a lot of repeat work: choosing relevant projects, reordering skills and rewriting the summary. I built Job Application Assistant to help with that without inventing experience.

Users paste a job description, review a fit assessment and generate a resume and cover letter from a structured source resume.

## How it works

The app classifies the job by role, including software engineering, application security, DevSecOps, penetration testing, AI/ML and graduate roles. If AI classification fails, it uses keyword scoring.

Each role has a strategy for project selection, skill order, layout and summary wording. Resume bullet points are stored in JSON with an importance score from 0 to 3, a core flag and tags. The generator uses those values and the job description to select relevant content. Playwright converts the HTML output to PDF.

## Keeping the output grounded

The app checks terms in the generated tagline against the source resume and uses a default if a term isn't supported. Terms containing dots, such as ASP.NET, needed special handling. These checks help constrain the output, but the generated documents still need a review.

## Handling failures and multiple users

The AI integration tries Claude first, can fall back to OpenAI and uses rule-based logic if both fail. Role strategies select up to four projects and control how the resume is organised.

Supabase handles authentication and per-user generation history. The server enforces a monthly limit of 10 generations, and row-level security separates users' data.

## Security checks

GitHub Actions runs Bandit, Semgrep, Gitleaks and pip-audit. High-severity findings block the pipeline.

## What I'd improve

- Add automated test coverage for the generation pipeline.
- Move filesystem-backed Flask sessions to Redis.
- Add structured logging to help diagnose failures.
