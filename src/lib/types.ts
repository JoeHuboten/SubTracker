/**
 * Subscription Tracker - Type Definitions
 */

// ============================================================
// Billing & Payment
// ============================================================

export type BillingCadence = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export type PaymentMethod = 'card' | 'paypal' | 'bank' | 'apple_pay' | 'google_pay' | 'other';

// ============================================================
// Subscription Status & Category
// ============================================================

export type SubscriptionStatus = 'active' | 'trial' | 'paused' | 'cancelled';

export type SubscriptionCategory =
  | 'streaming'
  | 'entertainment'
  | 'software'
  | 'utilities'
  | 'fitness'
  | 'music'
  | 'news'
  | 'cloud'
  | 'education'
  | 'gaming'
  | 'food'
  | 'shopping'
  | 'finance'
  | 'other';

// ============================================================
// Reminder
// ============================================================

export type ReminderType = 'onDay' | '1day' | '3days' | '7days';

export interface Reminder {
  id: string;
  type: ReminderType;
  enabled: boolean;
}

// ============================================================
// Price Change History
// ============================================================

export interface PriceChange {
  price: number;
  date: string;      // ISO
  note?: string;
}

// ============================================================
// Main Subscription Type
// ============================================================

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  cadence: BillingCadence;
  category: SubscriptionCategory;
  status: SubscriptionStatus;
  
  nextRenewal: string;       // ISO date
  startDate: string;         // ISO date
  
  website?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  
  reminders: Reminder[];
  priceHistory: PriceChange[];
  
  createdAt: string;         // ISO
  updatedAt: string;         // ISO
}

// ============================================================
// App Settings
// ============================================================

export interface AppSettings {
  currency: string;
  dateFormat: string;
}

// ============================================================
// Snooze State
// ============================================================

export interface SnoozeState {
  subscriptionId: string;
  snoozedUntil: string;      // ISO
}

// ============================================================
// App State
// ============================================================

export interface AppState {
  subscriptions: Subscription[];
  settings: AppSettings;
  snoozedReminders: SnoozeState[];
  lastOpenedAt: string;      // ISO
}

// ============================================================
// Constants
// ============================================================

export const CATEGORIES: { id: SubscriptionCategory; label: string; icon: string }[] = [
  { id: 'streaming', label: 'Streaming', icon: '🎬' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { id: 'software', label: 'Software', icon: '💻' },
  { id: 'utilities', label: 'Utilities', icon: '⚡' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'news', label: 'News', icon: '📰' },
  { id: 'cloud', label: 'Cloud Storage', icon: '☁️' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'food', label: 'Food & Delivery', icon: '🍕' },
  { id: 'shopping', label: 'Shopping', icon: '🛒' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export const STATUSES: { id: SubscriptionStatus; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'trial', label: 'Trial' },
  { id: 'paused', label: 'Paused' },
  { id: 'cancelled', label: 'Cancelled' },
];

export const CADENCES: { id: BillingCadence; label: string }[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
];

export const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
  { id: 'card', label: 'Credit/Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'bank', label: 'Bank Transfer' },
  { id: 'apple_pay', label: 'Apple Pay' },
  { id: 'google_pay', label: 'Google Pay' },
  { id: 'other', label: 'Other' },
];

export const DEFAULT_REMINDERS: Reminder[] = [
  { id: 'default-7days', type: '7days', enabled: false },
  { id: 'default-3days', type: '3days', enabled: true },
  { id: 'default-1day', type: '1day', enabled: true },
  { id: 'default-onDay', type: 'onDay', enabled: true },
];

export const DEFAULT_SETTINGS: AppSettings = {
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
};
