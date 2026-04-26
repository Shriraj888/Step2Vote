# Step2Vote - Indian Election Process Education Assistant

Step2Vote is a non-partisan civic education app for Indian voters. It helps users understand eligibility, Form 6 registration, EPIC details, polling booths, EVM/VVPAT flow, Model Code of Conduct basics, accessibility support, and official Election Commission verification paths.

## Problem Statement Alignment

The app is intentionally scoped to Indian election process education. It does not endorse parties or candidates, predict outcomes, or answer partisan persuasion requests. Every major feature supports the voter education journey:

| Need | Implementation |
| --- | --- |
| Understand the process | ECI-aligned timeline covering eligibility, registration, polling station prep, polling day conduct, and results |
| Ask questions safely | Server-side Gemini assistant constrained to Indian election education and official verification sources |
| Practice knowledge | Gemini-generated quizzes on Form 6, EPIC, EVM, VVPAT, MCC, voter rights, and election types |
| Prepare to vote | Checklist with guest local persistence and Firebase Firestore sync for signed-in users |
| Stay accessible | Semantic UI, keyboard-accessible controls, skip link, ARIA labels, and jest-axe checks |

## Google Services

| Service | Usage |
| --- | --- |
| Google Gemini 2.5 Flash | Server-side AI chat and quiz generation through `@google/generative-ai` |
| Firebase Authentication | Email/password sign-up and login |
| Cloud Firestore | Authenticated users can sync voter checklist progress across sessions |
| Firebase Analytics | Client events for auth state and sign-in/sign-up when measurement ID is configured |
| Google Cloud Run/App Engine | Dockerfile, Cloud Build, and App Engine config are included for Google Cloud deployment |

## Security

- Gemini API key stays server-side and is never exposed to the browser.
- Express rate limiting protects `/api` routes.
- Request payloads are size-limited and sanitized before reaching Gemini.
- Production CORS is restricted through `CORS_ORIGINS`.
- Security headers include `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- AI prompts enforce non-partisan Indian election education boundaries.
- Client-rendered AI markdown is sanitized before display.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, React Router, Vite |
| Backend | Express |
| AI | Google Gemini 2.5 Flash |
| Google/Firebase | Firebase Auth, Firestore, Analytics |
| Testing | Vitest, React Testing Library, jest-axe |
| Deployment | Docker, Cloud Build, App Engine config |

## Getting Started

```bash
npm install
copy .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:3001`

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGINS=

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
npm run test:coverage
```

## Deployment

For Cloud Run, set `GEMINI_API_KEY` as a runtime environment variable and set `CORS_ORIGINS` to the deployed frontend origin. Firebase web config remains client-safe, but Firestore rules should only allow each authenticated user to read/write their own `users/{uid}/appState/voterChecklist` document.
