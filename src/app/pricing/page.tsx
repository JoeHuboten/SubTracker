'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CreditCard, 
  Check,
  ArrowRight,
  Loader2,
  Sparkles,
  Calendar,
  Bell,
  PiggyBank,
  Shield,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

const FEATURES = [
  'Unlimited subscription tracking',
  'Renewal reminders & alerts',
  'Monthly & yearly spending reports',
  'Export your data anytime',
  'Multi-currency support',
  'Price change history',
];

export default function PricingPage() {
  const router = useRouter();
  const { user, subscribe, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/register');
      return;
    }

    setLoading(true);
    setError('');
    
    const result = await subscribe();
    
    setLoading(false);

    if (result.success) {
      router.push('/app');
    } else {
      setError(result.error || 'Failed to activate subscription');
    }
  };

  const isSubscribed = user?.hasActiveSubscription;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">{user.email}</span>
                <Link 
                  href="/app"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Sign in
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-medium text-white hover:bg-cyan-400 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative flex-1 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-400 mb-4">
              <Sparkles className="w-4 h-4" />
              Simple Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              One plan, everything included
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              No hidden fees. No complicated tiers. Just one affordable price for everything.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              
              {/* Card */}
              <div className="relative bg-[#0d1117] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold text-white shadow-lg shadow-cyan-500/25">
                    <Zap className="w-4 h-4" />
                    Best Value
                  </span>
                </div>

                {/* Price */}
                <div className="text-center mb-8 pt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl md:text-6xl font-display font-bold text-white">€3.99</span>
                    <span className="text-xl text-slate-400">one-time</span>
                  </div>
                  <p className="text-slate-500 mt-2">Pay once • Lifetime access</p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {error && (
                  <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                )}
                
                {isSubscribed ? (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold mb-4 animate-pulse">
                      <Check className="w-5 h-5" />
                      You have lifetime access!
                    </div>
                    <Link
                      href="/app"
                      className="group relative block w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white text-center shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">
                        Go to Dashboard
                        <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={loading || authLoading}
                    className="group relative w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 transition-all duration-200 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : user ? (
                      <span className="relative inline-flex items-center justify-center">
                        Purchase Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    ) : (
                      <span className="relative inline-flex items-center justify-center">
                        Get Started
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                )}

                {/* Security note */}
                <p className="text-center text-slate-500 text-sm mt-4">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Secure payment • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Track Renewals</h3>
              <p className="text-sm text-slate-400">Never miss when your subscriptions renew</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Smart Reminders</h3>
              <p className="text-sm text-slate-400">Get notified before you&apos;re charged</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Save Money</h3>
              <p className="text-sm text-slate-400">Know exactly where your money goes</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-sm py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>SubTracker © {new Date().getFullYear()} • All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
