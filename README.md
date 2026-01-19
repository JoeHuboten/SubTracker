# Receipts & Subscriptions Detective 🔍

A privacy-first web app for detecting and managing recurring charges from your bank statements. No accounts, no servers, your data stays on your device.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **CSV Import**: Import transaction data from any bank that exports CSV files
- **Smart Detection**: Automatically identifies recurring subscriptions from your transactions
- **Cadence Detection**: Recognizes weekly, monthly, and yearly billing patterns
- **Insights Engine**: Get actionable recommendations to optimize your subscriptions
- **Price Change Alerts**: Detect when subscriptions increase their pricing
- **Usage Tracking**: Rate how often you use each service to identify waste
- **Privacy First**: All data stays in your browser's local storage - no servers involved

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/subscription-detective.git
cd subscription-detective

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 How It Works

1. **Export your transactions** as CSV from your bank
2. **Import the CSV** into the app
3. **Review detected subscriptions** and confirm or dismiss them
4. **Get insights** on potential savings and duplicate services
5. **Track renewals** and manage your subscription status

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with localStorage persistence
- **Date Handling**: date-fns
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React

## 🎨 Design System

The app features a unique "Detective's Desk" aesthetic:

- **Typography**: Fraunces (display), Inter (body), Caveat (handwritten notes)
- **Colors**: Warm paper tones with teal accent
- **Motion**: Subtle, purposeful animations
- **Density**: "Calm clarity" spacing philosophy

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   └── app/               # Main application
│       ├── page.tsx       # Dashboard
│       ├── subscriptions/ # Subscriptions list
│       ├── subscription/  # Subscription detail
│       ├── insights/      # Insights page
│       ├── settings/      # Settings page
│       └── help/          # Help & FAQ
├── components/
│   ├── ui/               # Reusable UI components
│   ├── import/           # CSV import wizard
│   └── subscription/     # Subscription cards
├── lib/
│   ├── types.ts          # TypeScript definitions
│   ├── detection.ts      # Subscription detection algorithm
│   ├── normalization.ts  # Merchant name normalization
│   ├── csv-parser.ts     # CSV parsing utilities
│   ├── insights.ts       # Insights engine
│   ├── demo-data.ts      # Demo data generator
│   └── storage.ts        # localStorage utilities
└── store/
    └── app-store.ts      # Zustand state management
```

## 🔒 Privacy

This app is designed with privacy as a core principle:

- **No accounts required** - just import and go
- **No data collection** - we have no servers
- **Local storage only** - data stays in your browser
- **Export/Import** - backup your data as JSON
- **Delete anytime** - clear all data with one click

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ for people who want to take control of their subscriptions.
