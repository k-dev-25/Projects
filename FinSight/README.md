# FinSight

## Problem Statement

Personal finance tracking is often scattered across notes, banking apps, and spreadsheets. This makes it difficult to quickly understand spending patterns, monitor monthly budget health, and make informed financial decisions.

FinSight solves this by providing a single dashboard-driven web app to track income and expenses, analyze trends, manage monthly budgets, and view data in multiple currencies with real-time conversion rates.

## Features

- Dashboard summary cards for balance, income, expenses, and top spending category.
- Global currency selector on the dashboard that updates amounts across the app.
- Real conversion math using exchange rates (base currency INR).
- Transactions management: add, edit, delete, search, filter, and sort transactions.
- Budget tracking with monthly budget setup, spending progress, and remaining budget.
- Currency conversion preview for budget values (selected currency to USD).
- Analytics with spending-by-category, income-vs-expense, and monthly trend charts.
- Recent transactions panel on dashboard.
- Dark/light theme toggle with preference persistence.
- Local data persistence via `localStorage`.

## Tech Stack

- Frontend: React (Vite)
- Routing: `react-router-dom`
- Forms and Validation: `react-hook-form`, `yup`, `@hookform/resolvers`
- Charts: `recharts`
- Styling: Tailwind CSS
- HTTP Client: `axios`
- Data Persistence: Browser `localStorage`
- Exchange Rate API: `https://open.er-api.com/v6/latest/INR`

## Setup Instructions

### 1) Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (recommended)

### 2) Install dependencies

From the `FinSight` folder:

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

Open the local Vite URL (usually `http://localhost:5173`).

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

### 6) Lint the project

```bash
npm run lint
```

## Notes

- No environment variables are required for the current setup.
- Exchange-rate conversion needs internet access. If the API is unavailable, the app falls back gracefully.
- App state (transactions, budget, selected currency, and theme) is persisted in `localStorage`.
