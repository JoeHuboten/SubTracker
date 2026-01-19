'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  Bell,
  Edit3,
  Trash2,
  ExternalLink,
  Save,
  X,
  History,
  Tag,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Button, Badge, Modal, Toast, Toggle } from '@/components/ui';
import { 
  BillingCadence, 
  SubscriptionCategory, 
  SubscriptionStatus,
  PaymentMethod,
  CATEGORIES,
  CADENCES,
  STATUSES,
  PAYMENT_METHODS,
  ReminderType,
} from '@/lib/types';
import { 
  formatMoney, 
  daysUntil, 
  formatDate, 
  getCadenceLabel,
} from '@/lib/helpers';

export default function SubscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const subscriptions = useAppStore(state => state.subscriptions);
  const updateSubscription = useAppStore(state => state.updateSubscription);
  const deleteSubscription = useAppStore(state => state.deleteSubscription);
  const updateReminder = useAppStore(state => state.updateReminder);
  const updatePrice = useAppStore(state => state.updatePrice);
  
  const subscription = subscriptions.find(s => s.id === params.id);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    currency: 'USD',
    cadence: 'monthly' as BillingCadence,
    category: 'other' as SubscriptionCategory,
    status: 'active' as SubscriptionStatus,
    startDate: '',
    website: '',
    notes: '',
    paymentMethod: '' as PaymentMethod | '',
  });
  
  // Price update form
  const [newPrice, setNewPrice] = useState('');
  const [priceNote, setPriceNote] = useState('');
  
  // Initialize form when subscription loads
  useEffect(() => {
    if (subscription) {
      setEditForm({
        name: subscription.name,
        price: subscription.price.toString(),
        currency: subscription.currency,
        cadence: subscription.cadence,
        category: subscription.category,
        status: subscription.status,
        startDate: subscription.startDate.split('T')[0],
        website: subscription.website || '',
        notes: subscription.notes || '',
        paymentMethod: subscription.paymentMethod || '',
      });
    }
  }, [subscription]);
  
  if (!subscription) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-display font-medium text-ink-primary mb-2">
          Subscription not found
        </h2>
        <p className="text-ink-secondary mb-4">
          This subscription may have been deleted.
        </p>
        <Link href="/app">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
  
  const categoryInfo = CATEGORIES.find(c => c.id === subscription.category);
  const days = daysUntil(subscription.nextRenewal);
  
  const handleSave = () => {
    const priceNum = parseFloat(editForm.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setToast({ message: 'Please enter a valid price', type: 'error' });
      return;
    }
    
    updateSubscription(subscription.id, {
      name: editForm.name.trim(),
      price: priceNum,
      currency: editForm.currency,
      cadence: editForm.cadence,
      category: editForm.category,
      status: editForm.status,
      startDate: editForm.startDate,
      website: editForm.website.trim() || undefined,
      notes: editForm.notes.trim() || undefined,
      paymentMethod: editForm.paymentMethod || undefined,
    });
    
    setIsEditing(false);
    setToast({ message: 'Subscription updated!', type: 'success' });
  };
  
  const handleDelete = () => {
    deleteSubscription(subscription.id);
    router.push('/app');
  };
  
  const handlePriceUpdate = () => {
    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setToast({ message: 'Please enter a valid price', type: 'error' });
      return;
    }
    
    updatePrice(subscription.id, priceNum, priceNote || undefined);
    setShowPriceModal(false);
    setNewPrice('');
    setPriceNote('');
    setToast({ message: 'Price updated!', type: 'success' });
  };
  
  const handleReminderToggle = (reminderId: string, enabled: boolean) => {
    updateReminder(subscription.id, reminderId, { enabled });
  };
  
  const reminderLabels: Record<ReminderType, string> = {
    'onDay': 'On renewal day',
    '1day': '1 day before',
    '3days': '3 days before',
    '7days': '7 days before',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/app">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-card rounded-xl flex items-center justify-center text-2xl border border-white/10">
              {categoryInfo?.icon || '📦'}
            </div>
            <div>
              <h1 className="text-2xl font-display font-medium text-ink-primary">
                {subscription.name}
              </h1>
              <p className="text-ink-secondary">
                {getCadenceLabel(subscription.cadence)} • {categoryInfo?.label || subscription.category}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(true)}>
                <Trash2 className="w-4 h-4 text-feedback-error" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {subscription.status !== 'active' && (
        <Badge 
          variant={subscription.status === 'cancelled' ? 'danger' : 'default'}
        >
          {STATUSES.find(s => s.id === subscription.status)?.label || subscription.status}
        </Badge>
      )}

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-medium text-ink-primary flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-accent-focus" />
                Pricing
              </h2>
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setShowPriceModal(true)}>
                  <History className="w-4 h-4" />
                  Update Price
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-ink-secondary mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-ink-secondary mb-1">Currency</label>
                    <select
                      value={editForm.currency}
                      onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                      className="input w-full"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Billing Cycle</label>
                  <select
                    value={editForm.cadence}
                    onChange={(e) => setEditForm({ ...editForm, cadence: e.target.value as BillingCadence })}
                    className="input w-full"
                  >
                    {CADENCES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-display font-medium text-ink-primary mb-1">
                  {formatMoney(subscription.price, subscription.currency)}
                  <span className="text-lg text-ink-muted ml-2">
                    /{subscription.cadence === 'yearly' ? 'year' : subscription.cadence === 'weekly' ? 'week' : 'month'}
                  </span>
                </p>
                
                {subscription.priceHistory.length > 1 && (
                  <p className="text-sm text-ink-muted mt-2">
                    {subscription.priceHistory.length} price changes recorded
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Dates Card */}
          <div className="card p-6">
            <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-accent-focus" />
              Dates
            </h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as SubscriptionStatus })}
                    className="input w-full"
                  >
                    {STATUSES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Next Renewal</span>
                  <span className={`font-medium ${days <= 3 ? 'text-accent-warm' : 'text-ink-primary'}`}>
                    {formatDate(subscription.nextRenewal)}
                    {days >= 0 && (
                      <span className="text-ink-muted ml-1">
                        ({days === 0 ? 'Today!' : `in ${days} days`})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Started</span>
                  <span className="text-ink-primary">{formatDate(subscription.startDate)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Details Card */}
          <div className="card p-6">
            <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-accent-focus" />
              Details
            </h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as SubscriptionCategory })}
                    className="input w-full"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Website</label>
                  <input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    placeholder="https://..."
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Payment Method</label>
                  <select
                    value={editForm.paymentMethod}
                    onChange={(e) => setEditForm({ ...editForm, paymentMethod: e.target.value as PaymentMethod | '' })}
                    className="input w-full"
                  >
                    <option value="">Not specified</option>
                    {PAYMENT_METHODS.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-ink-secondary mb-1">Notes</label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    rows={3}
                    className="input w-full resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {subscription.website && (
                  <div className="flex justify-between items-center">
                    <span className="text-ink-secondary">Website</span>
                    <a 
                      href={subscription.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-focus hover:text-accent-focus-hover flex items-center gap-1"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {subscription.paymentMethod && (
                  <div className="flex justify-between">
                    <span className="text-ink-secondary">Payment</span>
                    <span className="text-ink-primary">
                      {PAYMENT_METHODS.find(p => p.id === subscription.paymentMethod)?.label}
                    </span>
                  </div>
                )}
                {subscription.notes && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-sm text-ink-secondary">{subscription.notes}</p>
                  </div>
                )}
                {!subscription.website && !subscription.paymentMethod && !subscription.notes && (
                  <p className="text-ink-muted text-sm">No additional details</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Reminders Card */}
          <div className="card p-6">
            <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-accent-focus" />
              Reminders
            </h2>
            
            <div className="space-y-3">
              {subscription.reminders.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between py-2">
                  <span className="text-ink-secondary">
                    {reminderLabels[reminder.type]}
                  </span>
                  <Toggle
                    enabled={reminder.enabled}
                    onChange={(enabled) => handleReminderToggle(reminder.id, enabled)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price History Card */}
          {subscription.priceHistory.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display font-medium text-ink-primary flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-accent-focus" />
                Price History
              </h2>
              
              <div className="space-y-3">
                {subscription.priceHistory.slice().reverse().map((change, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-medium text-ink-primary">
                        {formatMoney(change.price, subscription.currency)}
                      </p>
                      {change.note && (
                        <p className="text-sm text-ink-muted">{change.note}</p>
                      )}
                    </div>
                    <span className="text-sm text-ink-muted">
                      {formatDate(change.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Subscription"
      >
        <p className="text-ink-secondary mb-6">
          Are you sure you want to delete <strong>{subscription.name}</strong>? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </Modal>

      {/* Price Update Modal */}
      <Modal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        title="Update Price"
      >
        <div className="space-y-4 mb-6">
          <p className="text-ink-secondary">
            Current price: {formatMoney(subscription.price, subscription.currency)}
          </p>
          <div>
            <label className="block text-sm text-ink-secondary mb-1">New Price</label>
            <input
              type="number"
              step="0.01"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="0.00"
              className="input w-full"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-ink-secondary mb-1">Note (optional)</label>
            <input
              type="text"
              value={priceNote}
              onChange={(e) => setPriceNote(e.target.value)}
              placeholder="e.g., Annual price increase"
              className="input w-full"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowPriceModal(false)}>
            Cancel
          </Button>
          <Button onClick={handlePriceUpdate}>
            <Save className="w-4 h-4" />
            Update
          </Button>
        </div>
      </Modal>

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
