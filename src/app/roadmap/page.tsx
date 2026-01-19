'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  CheckCircle,
  Circle,
  Clock,
  Sparkles,
  Bell,
  Smartphone,
  Globe,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react';

const ROADMAP = [
  {
    quarter: 'Q1 2026',
    status: 'current',
    items: [
      { title: 'Mobile App (iOS & Android)', description: 'Native mobile apps for on-the-go tracking', status: 'in-progress', icon: Smartphone },
      { title: 'Browser Extension', description: 'Auto-detect subscriptions from your email', status: 'planned', icon: Globe },
      { title: 'Bank Integration', description: 'Connect your bank to auto-import transactions', status: 'planned', icon: CreditCard },
    ],
  },
  {
    quarter: 'Q2 2026',
    status: 'upcoming',
    items: [
      { title: 'Family Sharing', description: 'Share subscription tracking with family members', status: 'planned', icon: Users },
      { title: 'Smart Suggestions', description: 'AI-powered suggestions to save money', status: 'planned', icon: Sparkles },
      { title: 'Calendar Integration', description: 'Sync renewals with Google/Apple Calendar', status: 'planned', icon: Bell },
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'future',
    items: [
      { title: 'Budget Goals', description: 'Set and track subscription spending goals', status: 'planned', icon: BarChart3 },
      { title: 'Team Plans', description: 'Manage business subscriptions as a team', status: 'planned', icon: Users },
      { title: 'API Access', description: 'Build integrations with our public API', status: 'planned', icon: Zap },
    ],
  },
];

const statusStyles = {
  'completed': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle },
  'in-progress': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', icon: Clock },
  'planned': { bg: 'bg-slate-500/20', text: 'text-slate-400', icon: Circle },
};

export default function RoadmapPage() {
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
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Product Roadmap
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See what we&apos;re working on and what&apos;s coming next. Your feedback shapes our priorities.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(statusStyles).map(([status, style]) => (
              <div key={status} className="flex items-center gap-2">
                <style.icon className={`w-4 h-4 ${style.text}`} />
                <span className="text-sm text-slate-400 capitalize">{status.replace('-', ' ')}</span>
              </div>
            ))}
          </div>

          {/* Roadmap */}
          <div className="space-y-12">
            {ROADMAP.map((section, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-display font-bold text-white">{section.quarter}</h2>
                  {section.status === 'current' && (
                    <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-xs font-medium text-cyan-400">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="grid gap-4">
                  {section.items.map((item, j) => {
                    const style = statusStyles[item.status as keyof typeof statusStyles];
                    const StatusIcon = style.icon;
                    
                    return (
                      <div 
                        key={j}
                        className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                      >
                        <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-5 h-5 ${style.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <StatusIcon className={`w-4 h-4 ${style.text}`} />
                          </div>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback CTA */}
          <div className="mt-16 text-center p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Have a feature request?</h3>
            <p className="text-slate-400 mb-4">We&apos;d love to hear your ideas. Your feedback helps us prioritize.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition-colors"
            >
              Send Feedback
            </Link>
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
