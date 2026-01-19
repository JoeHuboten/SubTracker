'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Heart,
  Target,
  Users,
  Sparkles,
  Shield,
  Globe,
} from 'lucide-react';

export default function AboutPage() {
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
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              About SubTracker
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We&apos;re on a mission to help people take control of their subscription spending and save money.
            </p>
          </div>

          {/* Story */}
          <div className="prose prose-invert max-w-none mb-16">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  SubTracker was born out of frustration. Like many people, we found ourselves subscribed to 
                  dozens of services – streaming platforms, software tools, fitness apps, news subscriptions – 
                  and had no clear picture of how much we were actually spending each month.
                </p>
                <p>
                  One day, after discovering we&apos;d been paying for a service we hadn&apos;t used in over a year, 
                  we decided enough was enough. We built SubTracker to solve this problem for ourselves, 
                  and then realized it could help thousands of others facing the same challenge.
                </p>
                <p>
                  Today, SubTracker helps over 10,000 users track their subscriptions, get reminded before 
                  renewals, and make informed decisions about which services are actually worth keeping.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'User First',
                  description: 'Every decision we make starts with asking "How does this help our users save money and time?"',
                  color: 'pink',
                },
                {
                  icon: Shield,
                  title: 'Privacy Matters',
                  description: 'Your financial data is sensitive. We use bank-level encryption and never sell your information.',
                  color: 'cyan',
                },
                {
                  icon: Sparkles,
                  title: 'Simple & Beautiful',
                  description: 'Tracking subscriptions should be easy. We obsess over making the experience delightful.',
                  color: 'yellow',
                },
                {
                  icon: Target,
                  title: 'Honest Pricing',
                  description: 'One price, all features, lifetime access. No hidden fees, no upsells, no tricks.',
                  color: 'emerald',
                },
              ].map((value, i) => (
                <div 
                  key={i}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl"
                >
                  <div className={`w-12 h-12 bg-${value.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                    <value.icon className={`w-6 h-6 text-${value.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-16">
            {[
              { value: '10,000+', label: 'Happy Users' },
              { value: '€2M+', label: 'Tracked' },
              { value: '2025', label: 'Founded' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-8 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to take control?</h3>
            <p className="text-slate-400 mb-6">Join thousands of users saving money with SubTracker.</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Get Started for €3.99
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
