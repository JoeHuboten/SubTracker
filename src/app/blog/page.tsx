'use client';

import Link from 'next/link';
import { 
  CreditCard, 
  Calendar,
  ArrowRight,
  Clock,
} from 'lucide-react';

const BLOG_POSTS = [
  {
    slug: 'how-to-audit-your-subscriptions',
    title: 'How to Audit Your Subscriptions and Save €500/Year',
    excerpt: 'A step-by-step guide to reviewing all your recurring charges and identifying subscriptions you can cancel or downgrade.',
    date: 'January 10, 2026',
    readTime: '5 min read',
    category: 'Tips',
    image: '💰',
  },
  {
    slug: 'subscription-fatigue',
    title: 'The Rise of Subscription Fatigue: What It Means for Consumers',
    excerpt: 'Exploring why more people are feeling overwhelmed by the subscription economy and what you can do about it.',
    date: 'January 5, 2026',
    readTime: '7 min read',
    category: 'Insights',
    image: '😓',
  },
  {
    slug: 'free-trials-trap',
    title: 'The Free Trial Trap: How to Never Forget to Cancel Again',
    excerpt: 'Free trials are great until you forget to cancel. Here\'s how to take advantage without getting burned.',
    date: 'December 28, 2025',
    readTime: '4 min read',
    category: 'Tips',
    image: '🪤',
  },
  {
    slug: 'streaming-wars-2026',
    title: 'Streaming Wars 2026: Which Services Are Actually Worth It?',
    excerpt: 'We break down the major streaming services by content, price, and value to help you decide which to keep.',
    date: 'December 20, 2025',
    readTime: '10 min read',
    category: 'Reviews',
    image: '📺',
  },
  {
    slug: 'shared-subscriptions',
    title: 'The Complete Guide to Sharing Subscriptions Legally',
    excerpt: 'Family plans, password sharing crackdowns, and what you need to know about sharing your subscriptions.',
    date: 'December 15, 2025',
    readTime: '6 min read',
    category: 'Guides',
    image: '👨‍👩‍👧‍👦',
  },
  {
    slug: 'subscription-budget',
    title: 'How Much Should You Spend on Subscriptions? A Budgeting Guide',
    excerpt: 'Personal finance experts weigh in on how to set a subscription budget that works for your income.',
    date: 'December 10, 2025',
    readTime: '8 min read',
    category: 'Finance',
    image: '📊',
  },
];

const CATEGORIES = ['All', 'Tips', 'Insights', 'Reviews', 'Guides', 'Finance'];

export default function BlogPage() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Tips, insights, and guides to help you manage your subscriptions and save money.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug}
                className="group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Image placeholder */}
                <div className="h-40 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-5xl">
                  {post.image}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs font-medium text-cyan-400">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-semibold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center p-8 bg-white/[0.02] border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400 mb-6">Get the latest tips and insights delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
              <button className="px-6 py-3 bg-cyan-500 rounded-xl font-medium text-white hover:bg-cyan-400 transition-colors">
                Subscribe
              </button>
            </div>
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
