# 🗳️ Step2Vote — Election Process Education Assistant

An AI-powered, interactive web application that helps users understand the election process, timelines, and voting steps. Built with **React**, **Express**, and **Google Gemini 2.5 Flash**.

## ✨ Features

| Feature | Description |
|---------|-------------|
| **💬 AI Chat** | Ask questions about elections and get accurate, non-partisan answers powered by Gemini 2.5 Flash |
| **📚 Interactive Timeline** | Step-by-step guide through the complete election process with expandable details |
| **❓ Knowledge Quiz** | AI-generated quiz questions to test your election knowledge with scoring |
| **✅ Voter Checklist** | Interactive preparation checklist with progress tracking (persisted locally) |

## 🏗️ Architecture

```
┌──────────────────────────────────┐
│       Frontend (Vite + React)    │
│  ┌────┐ ┌────┐ ┌────┐ ┌──────┐  │
│  │Home│ │Chat│ │Quiz│ │Learn │  │
│  └────┘ └────┘ └────┘ └──────┘  │
│         ↓ API calls ↓            │
├──────────────────────────────────┤
│     Backend (Express Server)     │
│  ┌──────────┐ ┌──────────────┐   │
│  │Rate Limit│ │Input Sanitize│   │
│  └────┬─────┘ └──────┬───────┘   │
│       └──────┬───────┘           │
│              ↓                   │
│     Google Gemini 2.5 Flash      │
└──────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google AI Studio API Key ([Get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# Install dependencies
npm install

# Configure your API key
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### Development

```bash
# Start both frontend (Vite) and backend (Express) concurrently
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Production Build

```bash
npm run build
npm run preview
```

## 🔒 Security

- **Server-side API proxy**: API key is never exposed to the client
- **Rate limiting**: 30 requests per minute per IP
- **Input sanitization**: XSS prevention on both server and client
- **CORS**: Restricted to allowed origins only
- **Content sanitization**: DOMPurify for AI response rendering
- **Environment variables**: API keys stored in `.env` (gitignored)

## ♿ Accessibility (WCAG 2.1 AA)

- Skip navigation link
- Proper ARIA labels, roles, and states
- Keyboard navigation support
- Focus management and visible focus indicators
- Screen reader compatible
- Color contrast compliance
- `prefers-reduced-motion` support
- Semantic HTML throughout

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router, Vite |
| Backend | Express.js |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Testing | Vitest, React Testing Library, jest-axe |
| Styling | Vanilla CSS with Custom Properties |
| Fonts | Google Fonts (Inter) |

## 📁 Project Structure

```
Step2Vote/
├── server/                  # Express backend
│   ├── index.js             # Server entry point
│   ├── middleware/           # Rate limiter, input sanitizer
│   └── routes/              # API routes (chat, quiz)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/          # Header, Footer, SkipLink
│   │   ├── Chat/            # MessageBubble
│   │   └── ui/              # LoadingSpinner
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API client
│   ├── utils/               # Constants, sanitization
│   └── __tests__/           # Test files
├── .env.example             # Environment template
├── vite.config.js           # Vite + test configuration
└── package.json
```

## 🎯 Scoring Criteria Alignment

| Criteria | Implementation |
|----------|---------------|
| **Code Quality** | Modular architecture, JSDoc documentation, ESLint, clean separation of concerns |
| **Security** | Server-side API proxy, rate limiting, input sanitization, CORS, DOMPurify |
| **Efficiency** | Lazy-loaded routes, memoized components, optimized re-renders |
| **Testing** | Unit tests (Vitest + RTL), accessibility tests (jest-axe) |
| **Accessibility** | WCAG 2.1 AA, skip links, ARIA, keyboard nav, reduced-motion |
| **Google Services** | Gemini 2.5 Flash AI, Google Fonts, safety settings |

## 📜 License

This project is for educational purposes.
