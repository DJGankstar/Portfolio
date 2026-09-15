## Why I built it

I wanted to practise building the systems behind production support, not just a screen for listing tickets. Incident Console simulates the process of reporting an incident, investigating it, recording the fix and reviewing what went wrong.

## How it works

Incidents move through five states: New, Investigating, Mitigated, Resolved and Closed. The backend checks whether each transition is allowed. Status changes, comments and runbook steps create event records with an actor and timestamp.

Each incident keeps a copy of the service's SLA policy from when it was created. The API calculates deadlines and breaches from that policy and the incident timestamps. Changing a service's targets won't change an incident that's already in progress.

The React and TypeScript frontend includes filters, incident details, timelines, runbook logging and metrics for time to acknowledge, time to resolve and breach rate. The backend uses FastAPI, Pydantic, SQLAlchemy and JWT authentication.

## Decisions worth explaining

### Require a review before closing

An incident can't be closed until four root-cause analysis fields are complete: root cause, contributing factors, corrective actions and prevention actions. The backend enforces this rule.

### Keep the timeline tied to events

Changes create IncidentEvent records. Response and resolution times come from those timestamps rather than editable metric fields.

### Keep authentication stateless

API instances can verify JWTs without sharing a server-side session store.

### Set targets per service

Each service has a JSON policy mapping severity levels to response targets, with defaults when a policy isn't supplied.

## Security work

GitHub Actions runs Bandit, pip-audit, npm audit and Gitleaks, with high-severity findings blocking the pipeline. Dependency checks found eight backend CVEs. I replaced python-jose with PyJWT when the affected dependency chain couldn't be fixed, and migrated the authentication code.

## What I'd improve

- Enforce role-based access. The role field wasn't used in this version.
- Move from SQLite to PostgreSQL.
- Add pagination to the incident list.
- Replace 30-second polling with WebSocket updates.
