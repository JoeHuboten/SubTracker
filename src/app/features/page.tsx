'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Bell, 
  Calendar, 
  PiggyBank,
  BarChart3,
  Globe,
  Lock,
  Smartphone,
  Clock,
  Mail,
  Download,
  Tags,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Calendar,
    title: 'Renewal Tracking',
    description: 'See all your upcoming renewals at a glance. Know exactly when each subscription will charge you next.',
    color: 'pink',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get notified 1, 3, or 7 days before any renewal. Never be surprised by an unexpected charge again.',
    color: 'cyan',
  },
  {
    icon: PiggyBank,
    title: 'Spending Overview',
    description: 'See your monthly and yearly totals instantly. Understand exactly where your money goes.',
    color: 'emerald',
  },
  {
    icon: BarChart3,
    title: 'Visual Reports',
    description: 'Beautiful charts showing your spending breakdown by category, status, and billing cycle.',
    color: 'purple',
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    description: 'Track subscriptions in USD, EUR, GBP, CAD, AUD and more. We handle the conversions.',
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is encrypted with AES-256. We never share your information with third parties.',
    color: 'yellow',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Access SubTracker from any device. Our responsive design works beautifully on phones and tablets.',
    color: 'orange',
  },
  {
    icon: Clock,
    title: 'Price History',
    description: 'Track when subscription prices change over time. Know if you\'re paying more than before.',
    color: 'red',
  },
  {
    icon: Mail,
    title: 'Email Alerts',
    description: 'Receive email notifications before renewals. Stay informed even when you\'re not in the app.',
    color: 'indigo',
  },
  {
    icon: Download,
    title: 'Export Data',
    description: 'Download all your subscription data as JSON anytime. Your data belongs to you.',
    color: 'teal',
  },
  {
    icon: Tags,
    title: 'Categories',
    description: 'Organize subscriptions by category: streaming, software, gaming, fitness, and more.',
    color: 'pink',
  },
  {
    icon: CheckCircle,
    title: 'Status Tracking',
    description: 'Mark subscriptions as active, paused, trial, or cancelled. Keep everything organized.',
    color: 'emerald',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-white">Sub</span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Tracker</span>
            </span>
          </Link>
          <Link 
            href="/pricing"
            className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-medium text-white hover:bg-cyan-400 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              All Features
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to track, manage, and optimize your subscription spending.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div 
                key={i}
                className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-colors"
              >
                <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Get Started for €3.99
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-slate-500 text-sm">One-time payment • Lifetime access</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-black/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} SubTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
