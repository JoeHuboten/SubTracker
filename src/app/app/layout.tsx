'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  CreditCard, 
  LayoutDashboard, 
  Settings, 
  Plus,
  Menu,
  X,
  LogOut,
  User,
  Crown,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useAuth } from '@/contexts/auth-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const initialize = useAppStore(state => state.initialize);
  const isLoading = useAppStore(state => state.isLoading);
  
  const { user, loading: authLoading, logout } = useAuth();

  // Redirect if not authenticated or not subscribed
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (!user.hasActiveSubscription) {
        router.push('/pricing');
      }
    }
  }, [user, authLoading, router]);
  
  // Initialize store on mount
  useEffect(() => {
    if (user?.hasActiveSubscription) {
      initialize();
    }
  }, [initialize, user?.hasActiveSubscription]);

  const navItems = [
    { href: '/app', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/app/new', icon: Plus, label: 'Add New' },
    { href: '/app/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/app') return pathname === '/app';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (authLoading || isLoading || !user?.hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-ground pb-16 md:pb-0">
      {/* Header */}
      <header className="bg-surface-card/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-focus to-accent-glow rounded-lg flex items-center justify-center shadow-glow-cyan">
                <CreditCard className="w-5 h-5 text-surface-desk" />
              </div>
              <span className="font-display font-medium hidden sm:block bg-gradient-to-r from-accent-focus to-accent-glow bg-clip-text text-transparent">
                SubTracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-button text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-accent-focus/20 text-accent-focus border border-accent-focus/30'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              {/* Lifetime Badge */}
              <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-xs font-medium text-amber-400">
                <Crown className="w-3 h-3" />
                Lifetime
              </span>
              
              {/* User dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm text-ink-secondary max-w-[120px] truncate">
                    {user?.email}
                  </span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-48 py-1 bg-surface-card border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-sm text-ink-primary truncate">{user?.email}</p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Lifetime Access
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-secondary hover:bg-white/5 hover:text-ink-primary transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 md:hidden text-ink-secondary hover:text-ink-primary"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-white/10 bg-surface-card/90 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-ink-muted/10 ${
                    isActive(item.href)
                      ? 'bg-accent-focus/10 text-accent-focus'
                      : 'text-ink-secondary hover:bg-ink-primary/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink-secondary hover:bg-ink-primary/5"
            >
              <LogOut className="w-5 h-5" />
              Sign out
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-card border-t border-white/10 z-20">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 ${
                  isActive(item.href)
                    ? 'text-accent-focus'
                    : 'text-ink-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
