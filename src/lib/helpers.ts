/**
 * Subscription Tracker - Helper Functions
 */

import { BillingCadence } from './types';

// ============================================================
// Date Helpers
// ============================================================

/**
 * Get days until a given ISO date string
 */
export function daysUntil(dateISO: string): number {
  const target = new Date(dateISO);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Check if a date is in the past
 */
export function isPast(dateISO: string): boolean {
  return daysUntil(dateISO) < 0;
}

/**
 * Check if a date is today
 */
export function isToday(dateISO: string): boolean {
  return daysUntil(dateISO) === 0;
}

/**
 * Format a date for display
 */
export function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get ISO date string for today
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Add days/months/years to a date
 */
export function addToDate(dateISO: string, cadence: BillingCadence): string {
  const date = new Date(dateISO);
  
  switch (cadence) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  
  return date.toISOString().split('T')[0];
}

/**
 * Calculate next renewal date from start date
 * Ensures the result is >= today
 */
export function calculateNextRenewal(startDateISO: string, cadence: BillingCadence): string {
  let nextDate = startDateISO;
  const today = todayISO();
  
  while (nextDate < today) {
    nextDate = addToDate(nextDate, cadence);
  }
  
  return nextDate;
}

// ============================================================
// Money Helpers
// ============================================================

/**
 * Get the number of days in a cadence
 */
export function cadenceToDays(cadence: BillingCadence): number {
  switch (cadence) {
    case 'weekly': return 7;
    case 'monthly': return 30;
    case 'quarterly': return 91;
    case 'yearly': return 365;
    default: return 30;
  }
}

/**
 * Convert price to monthly equivalent
 */
export function cadenceToMonthly(price: number, cadence: BillingCadence): number {
  const days = cadenceToDays(cadence);
  return (price / days) * 30;
}

/**
 * Convert price to yearly equivalent
 */
export function cadenceToYearly(price: number, cadence: BillingCadence): number {
  const days = cadenceToDays(cadence);
  return (price / days) * 365;
}

/**
 * Format money for display
 */
export function formatMoney(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get cadence label
 */
export function getCadenceLabel(cadence: BillingCadence): string {
  switch (cadence) {
    case 'weekly': return 'Weekly';
    case 'monthly': return 'Monthly';
    case 'quarterly': return 'Quarterly';
    case 'yearly': return 'Yearly';
    default: return 'Monthly';
  }
}

/**
 * Get short cadence suffix
 */
export function getCadenceSuffix(cadence: BillingCadence): string {
  switch (cadence) {
    case 'weekly': return '/wk';
    case 'monthly': return '/mo';
    case 'quarterly': return '/qtr';
    case 'yearly': return '/yr';
    default: return '/mo';
  }
}

// ============================================================
// ID Generation
// ============================================================

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = 'sub'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================
// Validation Helpers
// ============================================================

/**
 * Check if a string is a valid URL
 */
export function isValidUrl(str: string): boolean {
  if (!str) return true; // Optional field
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid ISO date
 */
export function isValidDate(str: string): boolean {
  if (!str) return false;
  const date = new Date(str);
  return !isNaN(date.getTime());
}
