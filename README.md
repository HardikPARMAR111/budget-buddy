# Ledger — Personal Budget & Savings Manager

A secure, responsive personal expense and savings tracker built with Next.js, Firebase Authentication, and Cloud Firestore.

## Features

- Email/password auth (Firebase Authentication)
- Set and update monthly income
- Unlimited custom categories, typed as **Expense** or **Saving**
- Log transactions with amount, date, and optional notes
- Edit/delete categories and transactions
- Dashboard: income, expenses, savings, remaining balance, recent activity
- Search and filter transactions by category, type, and date range
- Reports: category breakdown pie charts, 6-month trend chart, monthly summary table
- Responsive layout (sidebar on desktop, bottom nav on mobile) with dark mode
- Firestore Security Rules so each user can only read/write their own data

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Firebase Auth · Cloud Firestore · React Hook Form + Zod · Recharts · Lucide React

## 1. Firebase project setup

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project**.
2. In your project, open **Build → Authentication → Get started**, and enable the **Email/Password** sign-in provider.
3. Open **Build → Firestore Database → Create database** (start in production mode, pick a region close to your users).
4. Go to **Project settings → General → Your apps → Add app → Web**, register the app, and copy the config values shown.
5. Create a `.env.local` file in the project root (copy `.env.local.example`) and paste in your values:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

6. Deploy the included security rules so users can only access their own documents:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore   # point it at this project, keep firestore.rules
   firebase deploy --only firestore:rules
   ```

   Or paste the contents of `firestore.rules` directly into **Firestore Database → Rules** in the console and click **Publish**.

## 2. Firestore data model

| Collection      | Document fields                                                                 |
|-----------------|-----------------------------------------------------------------------------------|
| `users/{uid}`   | `uid, name, email, monthlyIncome, createdAt`                                     |
| `categories/{id}` | `userId, name, type ("expense" \| "saving"), color, createdAt`                |
| `transactions/{id}` | `userId, categoryId, categoryName, type, amount, date, note?, createdAt`    |

Every document is linked to `request.auth.uid`; the security rules in `firestore.rules` enforce that a user can only read or write documents where `userId` matches their own UID.

> Firestore may prompt you to create a composite index the first time you load `/dashboard` or `/transactions` (console will show a direct link in the error message) — click it once and Firestore builds the index automatically.

## 3. Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — you'll land on `/login`. Create an account from there; your income and profile are stored in Firestore automatically.

## 4. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add the same six `NEXT_PUBLIC_FIREBASE_*` environment variables in **Project Settings → Environment Variables**.
4. Deploy. Add your production domain to Firebase **Authentication → Settings → Authorized domains**.

## Project structure

```
src/
  app/                # Routes: login, register, dashboard, categories, transactions, reports
  components/          # AppShell, forms, lists, LedgerBar, charts/
  context/AuthContext.tsx
  hooks/               # useCategories, useTransactions (Firestore realtime listeners)
  lib/                 # firebase.ts, schemas.ts (Zod), utils.ts
  types/               # Shared TypeScript types
firestore.rules
```

## Notes

- All Firestore reads are realtime (`onSnapshot`), so the UI updates instantly across tabs.
- Forms are validated with Zod via `@hookform/resolvers`.
- Dark mode preference is stored in `localStorage` and applied before paint to avoid flashing.
- Currency is formatted as INR (₹) by default — change the `formatCurrency` function in `src/lib/utils.ts` to switch currencies.
