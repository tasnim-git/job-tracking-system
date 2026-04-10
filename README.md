# Job Tracker

A modern React + Vite app to track job applications in one place.

This project helps job seekers manage their application pipeline with status updates, filtering, sorting, and quick stats.

## Features

- Add new applications with company, role, location, applied date, status, and notes
- Search by company, role, location, or notes
- Filter by status (All, Applied, Interview, Offer, Rejected)
- Sort by newest, oldest, and company name
- Update application status directly from each card
- Delete single applications or clear all
- Dashboard stats including interview rate and offer rate
- Data persistence with browser localStorage
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- Plain CSS
- localStorage for persistence

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

## Project Structure

```text
src/
	components/
		JobForm.jsx
		JobList.jsx
		JobCard.jsx
		Stats.jsx
	App.jsx
	App.css
	index.css
	main.jsx
```

## Data Persistence

Application data is stored in browser localStorage under the key `jobs`.

- Data stays after page refresh
- Data is cleared if localStorage is manually cleared
- Data is local to the current browser/device

## Who Is This For

- Students and fresh graduates tracking applications
- Professionals applying to multiple roles
- Career switchers monitoring interview pipelines

## Future Improvements

- Edit existing applications
- Follow-up reminders
- Export/import job data
- Analytics charts by week/month
