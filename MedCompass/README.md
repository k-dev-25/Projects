# MedCompass

## Problem Statement

People often search for medications by brand name but struggle to quickly understand what’s inside the drug (active ingredients), important label information (warnings/usage), and how to track the medicines they’ve saved for later.

MedCompass is a React web app that lets authenticated users search for medications using the openFDA Drug Label API and maintain a personal “medicine cabinet” stored in Firebase Firestore.

## Features

- Authentication with Firebase (Email/Password): register, login, logout.
- Protected routes: unauthenticated users are redirected to `/login`.
- Medication search using the openFDA Drug Label endpoint.
- Results view (grid) for search output.
- Personal cabinet dashboard backed by Firestore:
  - Fetch user-specific saved items (`cabinet` collection filtered by `userId`).
  - Remove saved medicines.
  - Add/edit personal notes per medicine.
- Responsive navigation bar with auth-aware links:

- Responsive navigation bar with auth-aware links:
  - Logged out: “Log In”.
  - Logged in: “My Cabinet” + “Log Out”.

## Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- Routing: `react-router` (v7)
- Auth & Database: Firebase Authentication + Cloud Firestore
- External API: openFDA Drug Label API (`https://api.fda.gov/drug/label.json`)

## Setup Instructions

### 1) Prerequisites

- Node.js 18+ (recommended)
- A Firebase project (for Auth + Firestore)

### 2) Install dependencies

From the `MedCompass` folder:

```bash
npm install
```

### 3) Configure Firebase environment variables

Create a `.env` file in the `MedCompass` project root and add these values:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

These are consumed in [src/services/firebase.js](src/services/firebase.js).

### 4) Enable Firebase services

In Firebase Console:

- Authentication → enable **Email/Password**.
- Firestore Database → create a database.

The app expects a `cabinet` collection where documents include a `userId` field (Firebase Auth UID) to query user-specific records.

### 5) Run the app

```bash
npm run dev
```

Then open the Vite URL (usually `http://localhost:5173`).

### 6) Production build (optional)

```bash
npm run build
npm run preview
```

### 7) Lint (optional)

```bash
npm run lint
```
