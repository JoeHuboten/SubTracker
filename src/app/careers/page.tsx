'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Briefcase,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';

const JOBS = [
  {
    title: 'Senior Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Help us build the future of subscription management. Work on our Next.js frontend and Node.js backend.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    description: 'Design beautiful, intuitive experiences that help users save money. Strong Figma skills required.',
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Drive user acquisition and retention through creative marketing strategies and campaigns.',
  },
  {
    title: 'Customer Success Lead',
    department: 'Support',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Help our users get the most out of SubTracker. Build relationships and ensure customer satisfaction.',
  },
];

const PERKS = [
  { icon: '🌍', title: 'Remote First', description: 'Work from anywhere in the world' },
  { icon: '💰', title: 'Competitive Pay', description: 'Top-of-market compensation' },
  { icon: '🏖️', title: 'Unlimited PTO', description: 'Take time when you need it' },
  { icon: '🖥️', title: 'Home Office', description: '€1,000 setup budget' },
  { icon: '📚', title: 'Learning Budget', description: '€500/year for courses & books' },
  { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive coverage' },
];

export default function CareersPage() {
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-400 mb-4">
              <Heart className="w-4 h-4" />
              We&apos;re Hiring
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Help us build the best subscription tracking tool in the world. 
              We&apos;re a small, remote team with big ambitions.
            </p>
          </div>

          {/* Perks */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">Why SubTracker?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PERKS.map((perk, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-center">
                  <div className="text-3xl mb-2">{perk.icon}</div>
                  <h3 className="font-semibold text-white text-sm mb-1">{perk.title}</h3>
                  <p className="text-xs text-slate-500">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white mb-8">Open Positions</h2>
            <div className="space-y-4">
              {JOBS.map((job, i) => (
                <div 
                  key={i}
                  className="group p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">{job.title}</h3>
                        <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs font-medium text-cyan-400">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{job.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition-colors whitespace-nowrap">
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Fit CTA */}
          <div className="text-center p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Don&apos;t see a fit?</h3>
            <p className="text-slate-400 mb-4">
              We&apos;re always looking for talented people. Send us your resume and tell us how you&apos;d contribute.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition-colors"
            >
              Get in Touch
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
