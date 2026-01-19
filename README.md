# SubTracker 💳

A beautiful, privacy-first subscription management SaaS with lifetime access. Track all your recurring payments, get insights on spending, and manage your subscriptions in one place.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-JoeHuboten%2FSubTracker-blue)](https://github.com/JoeHuboten/SubTracker)

## ✨ Features

- **📊 Subscription Dashboard**: Track all your subscriptions in one beautiful interface
- **💰 Lifetime Access**: One-time €3.99 payment for permanent access
- **🔐 Secure Authentication**: bcrypt-encrypted passwords with JWT tokens
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Aurora Nights Theme**: Stunning cyan, pink, and purple gradient design
- **💾 Local Storage**: Your data stays on your device with IndexedDB
- **📈 Spending Insights**: Visualize your subscription costs and patterns
- **🔔 Renewal Tracking**: Never miss a subscription renewal date
- **⚙️ Full Settings**: Customize your experience with comprehensive settings
- **🌙 Dark Mode**: Easy on the eyes with beautiful dark UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- SQLite3 (for backend database)

### Installation

```bash
# Clone the repository
git clone https://github.com/JoeHuboten/SubTracker.git
cd SubTracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Aurora Nights theme
- **Database**: SQLite via better-sqlite3
- **Authentication**: bcrypt (12 rounds) + JWT tokens
- **State Management**: Zustand with IndexedDB persistence
- **Icons**: Lucide React
- **Storage**: IndexedDB + localStorage with SSR safety

## 📁 Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── page.tsx                # Landing page
│   ├── pricing/page.tsx        # Pricing page
│   ├── login/page.tsx          # Login page
│   ├── register/page.tsx       # Registration page
│   ├── features/page.tsx       # Features page
│   ├── changelog/page.tsx      # Changelog
│   ├── roadmap/page.tsx        # Product roadmap
│   ├── about/page.tsx          # About us
│   ├── blog/page.tsx           # Blog
│   ├── careers/page.tsx        # Careers
│   ├── contact/page.tsx        # Contact form
│   ├── privacy/page.tsx        # Privacy Policy
│   ├── terms/page.tsx          # Terms of Service
│   ├── cookies/page.tsx        # Cookie Policy
│   ├── gdpr/page.tsx           # GDPR Compliance
│   ├── api/                    # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   └── subscribe/          # Subscription endpoint
│   └── app/                    # Protected app pages
│       ├── page.tsx            # Dashboard
│       ├── subscriptions/      # Subscriptions list
│       ├── subscription/[id]/  # Subscription detail
│       ├── new/page.tsx        # Add new subscription
│       ├── settings/page.tsx   # Settings
│       └── layout.tsx          # App layout
├── components/
│   └── ui/index.tsx            # Reusable UI components
├── contexts/
│   └── auth-context.tsx        # Auth context provider
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── db.ts                   # SQLite database setup
│   ├── auth.ts                 # Authentication utilities
│   ├── storage.ts              # IndexedDB utilities
│   ├── helpers.ts              # Helper functions
│   └── demo-data.ts            # Demo data generator
├── store/
│   └── app-store.ts            # Zustand state management
└── data/
    └── subtracker.db           # SQLite database
```

## 💳 Pricing

- **One-time payment**: €3.99
- **Lifetime access**: Forever
- **30-day money-back guarantee**: Full refund if not satisfied
- **No subscription**: No recurring charges

## 🔒 Privacy & Security

- **No data collection**: We don't track or sell your data
- **Encrypted passwords**: bcrypt with 12 rounds
- **Secure tokens**: JWT with 7-day expiry
- **Local storage**: Your subscriptions stay on your device via IndexedDB
- **GDPR compliant**: Full compliance with GDPR regulations
- **EU servers**: Data stored in the European Union
- **No third-party tracking**: No analytics or marketing cookies

## 📖 Features Guide

### Dashboard
- View all your subscriptions at a glance
- See total monthly and annual spending
- Quick access to add new subscriptions
- Filter and sort subscriptions

### Add Subscription
- Enter subscription name, price, and billing cycle
- Set custom renewal dates
- Add notes and categories
- Upload subscription icon (optional)

### Settings
- Change password
- Update profile information
- Manage notification preferences
- Export/import your data
- Delete account

### Insights
- Monthly spending trends
- Most expensive subscriptions
- Renewal calendar
- Potential savings opportunities

## 🎨 Design System

- **Theme**: Aurora Nights with cyan, pink, and purple gradients
- **Typography**: Responsive typography for all screen sizes
- **Components**: Reusable, accessible UI components
- **Animations**: Smooth button animations and transitions
- **Responsive**: Mobile-first responsive design

## 🚀 Deployment

Deploy to Vercel (recommended):

```bash
npm i -g vercel
vercel
```

Or use any Node.js hosting:
- Railway
- Render
- Netlify Functions
- AWS Lambda

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

- **Email**: support@subtracker.app
- **GitHub Issues**: [Report a bug](https://github.com/JoeHuboten/SubTracker/issues)
- **Contact**: [Contact form](https://subtracker.app/contact)

---

Made with ❤️ for people who want to take control of their subscriptions.
