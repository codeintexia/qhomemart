# 03 — Reproducibility Guide

## How to Run the MAS QHomemart Prototype

This guide explains how any competition judge or QHomemart stakeholder can run the prototype on a local machine from a clean state.

---

## Prerequisites

| Requirement | Minimum Version |
|-------------|----------------|
| Node.js | 18.x or higher |
| npm | 9.x or higher (bundled with Node.js 18+) |
| Git | Any recent version |

> **No external services, API keys, databases, or environment variables are required.**
> The prototype runs entirely with local dummy data.

---

## Steps to Run

### 1. Clone or open the project

If starting from a fresh clone:

```bash
git clone <repository-url>
cd qhomemart.project/mas
```

Or, if the project is already on your machine:

```bash
cd path/to/qhomemart.project/mas
```

### 2. Install dependencies

```bash
npm install
```

This installs all Next.js, React, Radix UI, and Tailwind CSS dependencies defined in `package.json`.

### 3. Build the project (optional verification step)

```bash
npm run build
```

A successful build confirms:
- TypeScript compilation passes with no errors.
- All agent, workflow, data, and log files are correctly typed.
- The Next.js app router is correctly configured.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You will see the MAS QHomemart prototype UI with all 8 screens accessible.

---

## What You Can Explore

| Area | Location in UI |
|------|---------------|
| Home / Landing | Screen 1 |
| Problem Input | Screen 2 |
| Agent Processing (animated) | Screen 3 |
| Risk Assessment | Screen 4 |
| Product Recommendations | Screen 5 |
| Service Recommendations | Screen 6 |
| Bundle Summary | Screen 7 |
| Staff Briefing & Business Insight | Screen 8 |

---

## Where the Data Lives

All data used in the prototype is in the `data/` folder:

| File | Contents |
|------|----------|
| `data/demo-scenario.ts` | The canonical demo scenario (Bu Sari, bathroom safety) |
| `data/products.ts` | 4 demo product SKUs with illustrative prices |
| `data/services.ts` | 3 demo service guidance entries |
| `data/bundle-rules.ts` | 2 bundle composition rules |

To test a different scenario, edit `data/demo-scenario.ts` and restart the dev server.

---

## Replacing Demo Data with Real QHomemart Data

When QHomemart is ready to integrate live data, replace the following files with real catalog API responses or database queries:

| Demo File | Replace With |
|-----------|-------------|
| `data/products.ts` | Real QHomemart product catalog (SKUs, prices, stock) |
| `data/services.ts` | Real QHomemart service guidance source, if available |
| `data/bundle-rules.ts` | Real QHomemart bundle/promo rules (margin, category, season) |
| `data/demo-scenario.ts` | Real customer input from CRM or point-of-sale system |

Agent functions in `agents/` are designed around basic type contracts so demo data can be replaced without changing the high-level agent architecture.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm install` fails | Ensure Node.js 18+ is installed: `node --version` |
| Port 3000 in use | Run `npm run dev -- --port 3001` |
| TypeScript errors after editing data files | Ensure your replacement data matches the exported TypeScript types |
| Build warnings about unused imports | These are non-blocking; use `npm run lint` for details |
