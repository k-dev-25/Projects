# Blood Donor Finder

A React + Vite app to browse blood donors, filter by blood group, search by city, sort by availability, and send request actions per donor.

## Features

- Fetches donor data from `https://jsonplaceholder.typicode.com/users`
- Maps API users to donor cards with:
  - Name
  - Blood group
  - City
  - Availability status
- Filter by blood group
- Search donors by city
- Sort by availability (`Available` / `Busy`)
- Request flow per donor:
  - `Request Help`
  - `Request Sent` after click
- Shows total available donor count
- Handles loading and empty states
- Persists selected blood group and request status across refresh using `localStorage`

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4

## Getting Started

1. Install dependencies:

	```bash
	npm install
	```

2. Start development server:

	```bash
	npm run dev
	```

3. Build for production:

	```bash
	npm run build
	```

4. Preview production build:

	```bash
	npm run preview
	```

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
