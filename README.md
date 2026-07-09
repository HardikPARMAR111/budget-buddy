# 💰 Ledger — Personal Budget & Savings Tracker

**Ledger** is a full-stack personal finance app that helps you track where your money goes every month — income, expenses, and savings — in one clean, simple dashboard. Built to be fast, secure, and usable equally well on your phone or your laptop.

No spreadsheets. No third-party bank linking. Just you, your categories, and a clear picture of your money.

## ✨ What it does

- 🔐 **Secure login** — sign up and log in with email/password (Firebase Authentication)
- 💵 **Track your income** — set your monthly income, update it anytime
- 🏷️ **Custom categories** — create unlimited categories like Rent, Food, Tuition, SIP, or Bank Savings, tagged as either an Expense or a Saving
- 🧾 **Log every transaction** — record amount, date, and an optional note for each expense or saving
- ✏️ **Full control** — edit or delete any category or transaction at any time
- 📊 **Dashboard at a glance** — total income, total expenses, total savings, remaining balance, and recent activity
- 🔍 **Search & filter** — find transactions by category, type, or date range
- 📈 **Visual reports** — category breakdown charts and a 6-month spending/savings trend
- 🌓 **Dark mode** — built in, remembers your preference
- 📱 **Fully responsive** — sidebar navigation on desktop, bottom nav on mobile

## 🖥️ Live demo

_(Add your Vercel URL here once deployed — e.g. `https://ledgerdemain.vercel.app`)_

## 🛠️ Built with

| Layer              | Technology                                                             |
| ------------------ | ---------------------------------------------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript |
| Styling            | [Tailwind CSS](https://tailwindcss.com/)                               |
| Auth               | [Firebase Authentication](https://firebase.google.com/products/auth)   |
| Database           | [Cloud Firestore](https://firebase.google.com/products/firestore)      |
| Forms & validation | React Hook Form + [Zod](https://zod.dev/)                              |
| Charts             | [Recharts](https://recharts.org/)                                      |
| Icons              | [Lucide](https://lucide.dev/)                                          |
| Hosting            | [Vercel](https://vercel.com/)                                          |

## 🗂️ How data is organized

Every user's data lives in three Firestore collections, all scoped to their own account:

- **`users`** — name, email, monthly income
- **`categories`** — category name, type (expense/saving), color
- **`transactions`** — amount, date, note, linked to a category and user

Firestore Security Rules (see `firestore.rules`) make sure a user can only ever read or write their own documents — nobody else's data is reachable, even through the API.

## 🚀 Getting started locally

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

- Create a project at the [Firebase console](https://console.firebase.google.com/)
- Enable **Authentication → Email/Password**
- Enable **Cloud Firestore**
- Deploy the included rules: `firebase deploy --only firestore:rules`
- Register a Web app under **Project settings** and copy the config values

### 4. Add your environment variables

Create a `.env.local` file in the project root:
