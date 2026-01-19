'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  Bell,
  Plus,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Button, SearchInput, EmptyState, Badge } from '@/components/ui';
import { formatMoney, daysUntil, formatDate, getCadenceLabel } from '@/lib/helpers';
import { CATEGORIES } from '@/lib/types';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const subscriptions = useAppStore(state => state.subscriptions);
  const snoozedReminders = useAppStore(state => state.snoozedReminders);
  const settings = useAppStore(state => state.settings);
  const getMonthlyTotal = useAppStore(state => state.getMonthlyTotal);
  const getYearlyTotal = useAppStore(state => state.getYearlyTotal);
  const getUpcomingRenewals = useAppStore(state => state.getUpcomingRenewals);
  const snoozeReminder = useAppStore(state => state.snoozeReminder);
  const loadDemoData = useAppStore(state => state.loadDemoData);
  
  const monthlyTotal = getMonthlyTotal();
  const yearlyTotal = getYearlyTotal();
  const upcomingRenewals = getUpcomingRenewals(7);
  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  
  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    if (!searchQuery) return subscriptions;
    const query = searchQuery.toLowerCase();
    return subscriptions.filter(sub => 
      sub.name.toLowerCase().includes(query) ||
      sub.category.toLowerCase().includes(query)
    );
  }, [subscriptions, searchQuery]);
  
  // Get alerts (upcoming renewals that should show reminders)
  const alerts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return upcomingRenewals.filter(sub => {
      // Check if snoozed
      const snooze = snoozedReminders.find(s => s.subscriptionId === sub.id);
      if (snooze && snooze.snoozedUntil > today) return false;
      
      // Check if any reminder is enabled and should fire
      const days = daysUntil(sub.nextRenewal);
      return sub.reminders.some(r => {
        if (!r.enabled) return false;
        if (r.type === 'onDay' && days === 0) return true;
        if (r.type === '1day' && days <= 1) return true;
        if (r.type === '3days' && days <= 3) return true;
        if (r.type === '7days' && days <= 7) return true;
        return false;
      });
    });
  }, [upcomingRenewals, snoozedReminders]);

  const handleSnooze = (subId: string) => {
    // Snooze for 1 day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    snoozeReminder(subId, tomorrow.toISOString().split('T')[0]);
  };

  // Empty state
  if (subscriptions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-focus/20 to-accent-glow/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent-focus/30">
          <CreditCard className="w-10 h-10 text-accent-focus" />
        </div>
        <h2 className="text-2xl font-display font-medium text-ink-primary mb-3">
          No subscriptions yet
        </h2>
        <p className="text-ink-secondary mb-8 max-w-md mx-auto">
          Start tracking your subscriptions to see monthly costs, 
          get renewal reminders, and take control of your spending.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/app/new">
            <Button size="lg">
              <Plus className="w-5 h-5" />
              Add First Subscription
            </Button>
          </Link>
          <Button variant="secondary" size="lg" onClick={loadDemoData}>
            <Sparkles className="w-5 h-5" />
            Load Demo Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-ink-secondary text-sm">Monthly</span>
            <div className="w-8 h-8 bg-accent-focus/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-accent-focus" />
            </div>
          </div>
          <p className="text-2xl font-display font-medium text-ink-primary">
            {formatMoney(monthlyTotal, settings.currency)}
          </p>
          <p className="text-sm text-ink-muted">{activeCount} active</p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-ink-secondary text-sm">Yearly</span>
            <div className="w-8 h-8 bg-accent-warm/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-accent-warm" />
            </div>
          </div>
          <p className="text-2xl font-display font-medium text-ink-primary">
            {formatMoney(yearlyTotal, settings.currency)}
          </p>
          <p className="text-sm text-ink-muted">projected</p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-ink-secondary text-sm">Upcoming</span>
            <div className="w-8 h-8 bg-accent-glow/20 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-accent-glow" />
            </div>
          </div>
          <p className="text-2xl font-display font-medium text-ink-primary">
            {upcomingRenewals.length}
          </p>
          <p className="text-sm text-ink-muted">in 7 days</p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-ink-secondary text-sm">Total</span>
            <div className="w-8 h-8 bg-feedback-success/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-feedback-success" />
            </div>
          </div>
          <p className="text-2xl font-display font-medium text-ink-primary">
            {subscriptions.length}
          </p>
          <p className="text-sm text-ink-muted">subscriptions</p>
        </div>
      </div>

      {/* Alerts Panel */}
      {alerts.length > 0 && (
        <div className="card border-accent-warm/30 bg-gradient-to-r from-accent-warm/10 to-transparent">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent-warm" />
              <h2 className="font-display font-medium text-ink-primary">
                Upcoming Renewals
              </h2>
              <Badge variant="warning" size="sm">{alerts.length}</Badge>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {alerts.map(sub => {
              const days = daysUntil(sub.nextRenewal);
              return (
                <div key={sub.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-card rounded-lg flex items-center justify-center text-lg">
                      {CATEGORIES.find(c => c.id === sub.category)?.icon || '📦'}
                    </div>
                    <div>
                      <p className="font-medium text-ink-primary">{sub.name}</p>
                      <p className="text-sm text-ink-secondary">
                        {formatMoney(sub.price, sub.currency)} • {days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `In ${days} days`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSnooze(sub.id)}
                      className="text-sm text-ink-muted hover:text-accent-focus transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Snooze
                    </button>
                    <Link href={`/app/subscription/${sub.id}`}>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subscriptions List */}
      <div className="card">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-display font-medium text-ink-primary">
            All Subscriptions
          </h2>
          <div className="flex items-center gap-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              className="w-48"
            />
            <Link href="/app/new">
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </Link>
          </div>
        </div>
        
        {filteredSubscriptions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-ink-muted">No subscriptions found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredSubscriptions.map(sub => {
              const days = daysUntil(sub.nextRenewal);
              const categoryInfo = CATEGORIES.find(c => c.id === sub.category);
              
              return (
                <Link 
                  key={sub.id} 
                  href={`/app/subscription/${sub.id}`}
                  className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-ground rounded-lg flex items-center justify-center text-lg">
                      {categoryInfo?.icon || '📦'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink-primary">{sub.name}</p>
                        {sub.status !== 'active' && (
                          <Badge 
                            variant={sub.status === 'cancelled' ? 'danger' : 'default'} 
                            size="sm"
                          >
                            {sub.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-ink-muted">
                        {getCadenceLabel(sub.cadence)} • {categoryInfo?.label || sub.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-ink-primary">
                      {formatMoney(sub.price, sub.currency)}
                    </p>
                    <p className={`text-sm ${days <= 3 ? 'text-accent-warm' : 'text-ink-muted'}`}>
                      {sub.status === 'active' 
                        ? days === 0 
                          ? 'Today' 
                          : days < 0 
                            ? 'Overdue'
                            : `in ${days}d`
                        : formatDate(sub.nextRenewal)
                      }
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
