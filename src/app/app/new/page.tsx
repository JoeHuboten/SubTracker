'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save,
  Calendar,
  DollarSign,
  Tag,
  Link as LinkIcon,
  FileText,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Button, Toast } from '@/components/ui';
import { 
  BillingCadence, 
  SubscriptionCategory, 
  SubscriptionStatus,
  PaymentMethod,
  CATEGORIES,
  CADENCES,
  STATUSES,
  PAYMENT_METHODS,
} from '@/lib/types';
import { calculateNextRenewal, todayISO } from '@/lib/helpers';

export default function NewSubscriptionPage() {
  const router = useRouter();
  const addSubscription = useAppStore(state => state.addSubscription);
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cadence, setCadence] = useState<BillingCadence>('monthly');
  const [category, setCategory] = useState<SubscriptionCategory>('other');
  const [status, setStatus] = useState<SubscriptionStatus>('active');
  const [startDate, setStartDate] = useState(todayISO());
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setToast({ message: 'Please enter a subscription name', type: 'error' });
      return;
    }
    
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setToast({ message: 'Please enter a valid price', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const id = addSubscription({
        name: name.trim(),
        price: priceNum,
        currency,
        cadence,
        category,
        status,
        nextRenewal: calculateNextRenewal(startDate, cadence),
        startDate,
        website: website.trim() || undefined,
        notes: notes.trim() || undefined,
        paymentMethod: paymentMethod || undefined,
      });
      
      setToast({ message: 'Subscription added!', type: 'success' });
      setTimeout(() => router.push(`/app/subscription/${id}`), 800);
    } catch (error) {
      setToast({ message: 'Failed to add subscription', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/app">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-display font-medium text-ink-primary">
          Add Subscription
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-medium text-ink-primary flex items-center gap-2">
            <Tag className="w-4 h-4 text-accent-focus" />
            Basic Info
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Netflix, Spotify, Adobe..."
              className="input w-full"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Price *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="input w-full pl-9"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input w-full"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Billing Cycle
              </label>
              <select
                value={cadence}
                onChange={(e) => setCadence(e.target.value as BillingCadence)}
                className="input w-full"
              >
                {CADENCES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
                className="input w-full"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-medium text-ink-primary flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent-focus" />
            Dates
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-secondary mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
                className="input w-full"
              >
                {STATUSES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Optional Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-medium text-ink-primary flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent-focus" />
            Additional Info
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              Website
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="input w-full pl-9"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod || ''}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod || undefined)}
              className="input w-full"
            >
              <option value="">Not specified</option>
              {PAYMENT_METHODS.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-secondary mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes about this subscription..."
              rows={3}
              className="input w-full resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/app">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Subscription'}
          </Button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
