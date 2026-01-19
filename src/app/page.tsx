'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CreditCard, 
  Sparkles,
  ArrowRight,
  Bell,
  Calendar,
  PiggyBank,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  Check,
  LogIn,
  ChevronDown,
  Star,
  Quote,
  Users,
  Clock,
  Smartphone,
  Globe,
  Lock,
  BarChart3,
  Mail,
  Twitter,
  Github,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      if (user.hasActiveSubscription) {
        router.push('/app');
      } else {
        router.push('/pricing');
      }
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-cyan-400/60 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 bg-pink-400/60 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-[40%] left-[15%] w-1 h-1 bg-purple-400/60 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        <div className="absolute top-[60%] right-[10%] w-2 h-2 bg-cyan-300/50 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/50 rounded-xl blur-lg" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-white">Sub</span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Tracker</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/pricing" 
              className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              Pricing
            </Link>
            {!loading && (
              user ? (
                <Link 
                  href={user.hasActiveSubscription ? '/app' : '/pricing'}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-lg text-sm font-medium text-white hover:bg-cyan-400 transition-colors"
                >
                  {user.hasActiveSubscription ? 'Dashboard' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </Link>
                  <Link 
                    href="/register"
                    className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-medium text-white hover:bg-cyan-400 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Track • Remind • Save</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-white">Track all your</span>
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                subscriptions
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#22d3ee" />
                    <stop offset="0.5" stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Never miss a renewal date again. Add your subscriptions, 
            get reminded before charges, and <span className="text-white font-medium">take control of your spending</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={handleGetStarted}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition-all duration-300 ease-out"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {user?.hasActiveSubscription ? 'Go to Dashboard' : 'Start Free Trial'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <Link 
              href="/pricing"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/20 rounded-xl font-semibold text-white text-lg hover:bg-white/10 hover:border-white/40 hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out"
            >
              View Pricing
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>
          
          {/* Price Tag */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-white/10 rounded-2xl backdrop-blur-sm">
            <span className="text-2xl font-bold text-white">€3.99</span>
            <span className="text-slate-400">one-time</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 text-sm font-medium">Lifetime access</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative max-w-5xl mx-auto px-4 py-8">
        <div className={`grid grid-cols-3 gap-4 md:gap-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '€3.99', label: 'One-Time', icon: CreditCard },
            { value: '∞', label: 'Subscriptions', icon: TrendingUp },
            { value: '24/7', label: 'Reminders', icon: Bell },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 md:p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 md:py-32">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-400 mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Powerful features to help you track and manage all your recurring expenses
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Feature 1 */}
            <div className="group relative p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl hover:border-pink-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-5 border border-pink-500/20 shadow-lg shadow-pink-500/10 group-hover:shadow-pink-500/20 transition-shadow">
                  <Calendar className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">Track Renewals</h3>
                <p className="text-slate-400 leading-relaxed">
                  See all your upcoming renewals at a glance. Know exactly when you&apos;ll be charged next.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group relative p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-5 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/20 transition-shadow">
                  <Bell className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">Get Reminders</h3>
                <p className="text-slate-400 leading-relaxed">
                  Set custom alerts before renewal dates. Never be surprised by an unexpected charge again.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group relative p-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl hover:border-emerald-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-5 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-shadow">
                  <PiggyBank className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-3">Know Your Spend</h3>
                <p className="text-slate-400 leading-relaxed">
                  See monthly and yearly totals instantly. Understand exactly where your money goes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 md:py-32">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Get started in 3 simple steps
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              No complicated setup. Start tracking your subscriptions in under a minute.
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              {
                step: '01',
                title: 'Create your account',
                description: 'Sign up in seconds with just your email. No credit card required to start.',
                icon: Users,
                color: 'cyan',
              },
              {
                step: '02',
                title: 'Add subscriptions',
                description: 'Manually add your Netflix, Spotify, and other recurring services.',
                icon: CreditCard,
                color: 'pink',
              },
              {
                step: '03',
                title: 'Get reminders',
                description: 'We\'ll notify you before each renewal so you\'re never caught off guard.',
                icon: Bell,
                color: 'emerald',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
                )}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-${item.color}-500/10 border border-${item.color}-500/20 mb-6 relative`}>
                    <item.icon className={`w-10 h-10 text-${item.color}-400`} />
                    <span className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-${item.color}-500 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-${item.color}-500/30`}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview / Screenshots Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 mb-4">
              Beautiful Dashboard
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Your subscriptions at a glance
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              A clean, intuitive dashboard designed to give you clarity on your spending.
            </p>
          </div>
          
          {/* Mock dashboard preview */}
          <div className={`relative max-w-4xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-[#0d1225] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-white/5 rounded-lg text-xs text-slate-500">
                    app.subtracker.io/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard content preview */}
              <div className="p-6">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Monthly', value: '€89.97', color: 'cyan' },
                    { label: 'Yearly', value: '€1,079.64', color: 'pink' },
                    { label: 'Active', value: '12', color: 'emerald' },
                    { label: 'Due Soon', value: '3', color: 'yellow' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                      <p className={`text-lg font-bold text-${stat.color}-400`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                
                {/* Subscription list preview */}
                <div className="space-y-3">
                  {[
                    { name: 'Netflix', price: '€15.99', date: 'Feb 12', icon: '🎬' },
                    { name: 'Spotify', price: '€9.99', date: 'Feb 15', icon: '🎵' },
                    { name: 'Adobe CC', price: '€54.99', date: 'Feb 20', icon: '💻' },
                  ].map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">
                          {sub.icon}
                        </div>
                        <div>
                          <p className="font-medium text-white">{sub.name}</p>
                          <p className="text-xs text-slate-500">Renews {sub.date}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-white">{sub.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-32">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-sm text-yellow-400 mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Loved by thousands
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              See what our users have to say about SubTracker
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              {
                name: 'Sarah M.',
                role: 'Freelance Designer',
                avatar: '👩‍🎨',
                content: 'I was shocked to discover I was spending over €200/month on subscriptions I barely used. SubTracker helped me cut that in half!',
                rating: 5,
              },
              {
                name: 'Michael K.',
                role: 'Software Engineer',
                avatar: '👨‍💻',
                content: 'The reminders are a game-changer. I\'ve canceled three subscriptions before renewal that I completely forgot about.',
                rating: 5,
              },
              {
                name: 'Emma R.',
                role: 'Small Business Owner',
                avatar: '👩‍💼',
                content: 'Clean interface, does exactly what it says. Finally have a clear picture of my business subscriptions.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="group relative p-6 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-2xl hover:border-yellow-500/30 transition-all">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-400 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Users, value: '10,000+', label: 'Happy Users' },
              { icon: CreditCard, value: '€2M+', label: 'Subscriptions Tracked' },
              { icon: Clock, value: '99.9%', label: 'Uptime' },
              { icon: Shield, value: '100%', label: 'Secure & Private' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Features Grid */}
      <section className="relative py-20">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 mb-4">
              More Features
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Built for modern users
            </h2>
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Smartphone, title: 'Mobile Friendly', desc: 'Access from any device, anywhere' },
              { icon: Globe, title: 'Multi-Currency', desc: 'Track in USD, EUR, GBP, and more' },
              { icon: Lock, title: 'Bank-Level Security', desc: 'Your data is encrypted and safe' },
              { icon: BarChart3, title: 'Spending Reports', desc: 'Visual breakdown of your expenses' },
              { icon: Mail, title: 'Email Alerts', desc: 'Get notified before every renewal' },
              { icon: Clock, title: 'Price History', desc: 'Track when prices change over time' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 md:py-32">
        <div className="relative max-w-3xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-400 mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Frequently asked questions
            </h2>
          </div>
          
          <div className={`space-y-3 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              {
                q: 'Is there a free trial?',
                a: 'Yes! You can try SubTracker free for 7 days. No credit card required to start.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely. Cancel your subscription at any time with no questions asked. We also offer a 30-day money-back guarantee.',
              },
              {
                q: 'How do reminders work?',
                a: 'You can set custom reminders for each subscription - 1 day, 3 days, or 7 days before renewal. We\'ll send you email notifications.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We use bank-level encryption (AES-256) to protect your data. We never share your information with third parties.',
              },
              {
                q: 'Can I export my data?',
                a: 'Yes, you can export all your subscription data as JSON at any time from your settings page.',
              },
              {
                q: 'Do you support multiple currencies?',
                a: 'Yes! We support USD, EUR, GBP, CAD, AUD, and more. You can set your preferred currency in settings.',
              },
            ].map((faq, i) => (
              <div 
                key={i} 
                className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                  <p className="px-5 text-slate-400">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="relative max-w-4xl mx-auto px-4 py-16">
        <div className={`bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 md:p-12 transition-all duration-1000 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-8">
            What&apos;s included for €3.99 one-time
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Unlimited subscription tracking',
              'Email & in-app reminders',
              'Monthly & yearly reports',
              'Multi-currency support',
              'Price change history',
              'Export your data',
              'Lifetime updates',
              'No recurring fees',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-20 text-center">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to take control?
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Join thousands of users who have already saved money by tracking their subscriptions.
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-2xl font-semibold text-white text-lg shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/50 hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition-all duration-300 ease-out"
              >
                <Sparkles className="w-5 h-5" />
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-6 text-slate-500 text-sm">
                <Shield className="w-4 h-4 inline mr-1" />
                30-day money-back guarantee • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">SubTracker</span>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                Track your subscriptions, save your money. Never miss a renewal again.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/pricing" className="text-slate-500 hover:text-white transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/features" className="text-slate-500 hover:text-white transition-colors text-sm">Features</Link></li>
                <li><Link href="/changelog" className="text-slate-500 hover:text-white transition-colors text-sm">Changelog</Link></li>
                <li><Link href="/roadmap" className="text-slate-500 hover:text-white transition-colors text-sm">Roadmap</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-slate-500 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link href="/blog" className="text-slate-500 hover:text-white transition-colors text-sm">Blog</Link></li>
                <li><Link href="/careers" className="text-slate-500 hover:text-white transition-colors text-sm">Careers</Link></li>
                <li><Link href="/contact" className="text-slate-500 hover:text-white transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-500 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-slate-500 hover:text-white transition-colors text-sm">Cookie Policy</Link></li>
                <li><Link href="/gdpr" className="text-slate-500 hover:text-white transition-colors text-sm">GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} SubTracker. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for subscription trackers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
