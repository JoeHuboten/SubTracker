import type { Metadata } from 'next';
import { Inter, Fraunces, Caveat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';

// Primary body font - excellent readability
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Display font - warm, trustworthy serifs
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

// Handwritten accent font - for annotations
const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  title: 'SubTracker - Track Your Subscriptions',
  description: 'Track all your subscriptions in one place. Get reminders before renewals, see monthly spending, and take control of your finances.',
  keywords: ['subscriptions', 'recurring charges', 'budgeting', 'finance', 'subscription tracker'],
  authors: [{ name: 'SubTracker' }],
  openGraph: {
    title: 'SubTracker - Track Your Subscriptions',
    description: 'Track all your subscriptions in one place. €3.99 one-time payment.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-surface-ground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
