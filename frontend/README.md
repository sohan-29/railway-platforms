np# Railway Platform Manager

## Overview
Simple React app to add train arrival/departure times and calculate minimum platforms required.

## Features
- Dynamic train input forms (+/- buttons)
- Time inputs for arrival/departure
- Real-time platform calculation
- Responsive design

## Algorithm Used
**Minimum Platforms Required:**

1. **Sort** all arrival times ascending.
2. **Sort** all departure times ascending.
3. Use **two pointers** (i for arrivals, j for departures):
   - If next arrival <= current departure: train arrives, `platforms++`, move i.
   - Else: train departs, `platforms--`, move j.
np5. Result: minimum platforms to schedule all trains without conflict.

**Time Complexity:** O(n log n) due to sorting. **Space:** O(n).

**Input Process:**
- Click + to add train row.
- Enter train name, arrival time (HH:MM), departure time (HH:MM > arrival).
- Click Calculate or auto-updates.
- Displays required platforms.

## Setup & Run
```bash
cd frontend
npm install
npm run dev
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
