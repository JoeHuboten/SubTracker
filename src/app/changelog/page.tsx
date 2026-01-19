'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Sparkles,
  Bug,
  Zap,
  Shield,
  Bell,
  BarChart3,
  Globe,
} from 'lucide-react';

const CHANGELOG = [
  {
    version: '1.2.0',
    date: 'January 15, 2026',
    type: 'feature',
    changes: [
      'Added multi-currency support (USD, EUR, GBP, CAD, AUD)',
      'New spending reports with visual charts',
      'Export data as JSON',
      'Improved mobile responsiveness',
    ],
  },
  {
    version: '1.1.0',
    date: 'December 20, 2025',
    type: 'feature',
    changes: [
      'Email reminder notifications',
      'Price history tracking',
      'Category management improvements',
      'Dark mode refinements',
    ],
  },
  {
    version: '1.0.2',
    date: 'December 5, 2025',
    type: 'fix',
    changes: [
      'Fixed renewal date calculation for yearly subscriptions',
      'Improved search performance',
      'Fixed currency display issues',
      'Various UI polish improvements',
    ],
  },
  {
    version: '1.0.1',
    date: 'November 28, 2025',
    type: 'fix',
    changes: [
      'Fixed login issues on Safari',
      'Improved form validation',
      'Fixed timezone handling for reminders',
    ],
  },
  {
    version: '1.0.0',
    date: 'November 15, 2025',
    type: 'feature',
    changes: [
      'Initial release of SubTracker',
      'Subscription tracking with manual entry',
      'Renewal reminders (1, 3, 7 days)',
      'Monthly and yearly spending overview',
      'Category organization',
      'Secure authentication with bcrypt',
    ],
  },
];

const typeIcons = {
  feature: Sparkles,
  fix: Bug,
  security: Shield,
  performance: Zap,
};

const typeColors = {
  feature: 'cyan',
  fix: 'yellow',
  security: 'red',
  performance: 'purple',
};

export default function ChangelogPage() {
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
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Changelog
            </h1>
            <p className="text-lg text-slate-400">
              See what&apos;s new in SubTracker. We ship updates regularly.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {CHANGELOG.map((release, i) => {
              const Icon = typeIcons[release.type as keyof typeof typeIcons] || Sparkles;
              const color = typeColors[release.type as keyof typeof typeColors] || 'cyan';
              
              return (
                <div key={i} className="relative pl-8 pb-8 border-l border-white/10 last:border-0 last:pb-0">
                  {/* Dot */}
                  <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-${color}-500 border-4 border-[#0a0e1a]`} />
                  
                  {/* Content */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-${color}-500/20 rounded-full text-xs font-medium text-${color}-400`}>
                        <Icon className="w-3 h-3" />
                        {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                      </span>
                      <span className="text-white font-semibold">v{release.version}</span>
                      <span className="text-slate-500 text-sm">{release.date}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {release.changes.map((change, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="text-slate-600 mt-1">•</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
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
