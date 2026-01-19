/**
 * Demo Data - Sample subscriptions for testing
 * 
 * Load these via "Load demo data" button on landing page
 */

import { Subscription, BillingCadence } from './types';
import { generateId, todayISO, calculateNextRenewal } from './helpers';

// Helper to create past date
function pastDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Helper to create future date
function futureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

// Helper to create subscription with realistic dates
function createSubscription(
  name: string,
  price: number,
  cadence: BillingCadence,
  category: Subscription['category'],
  website?: string,
  notes?: string,
  daysUntilRenewal?: number
): Subscription {
  const id = generateId();
  const createdAt = pastDate(Math.floor(Math.random() * 365) + 30); // Created 1-12 months ago
  
  // Calculate next renewal based on daysUntilRenewal or random
  const renewalDays = daysUntilRenewal ?? Math.floor(Math.random() * 28) + 1;
  const nextRenewal = futureDate(renewalDays);
  
  return {
    id,
    name,
    price,
    currency: 'USD',
    cadence,
    category,
    status: 'active',
    nextRenewal,
    startDate: createdAt,
    website,
    notes,
    reminders: [
      { id: generateId(), type: '3days', enabled: true },
      { id: generateId(), type: 'onDay', enabled: true },
    ],
    priceHistory: [
      { price, date: createdAt, note: 'Initial subscription' },
    ],
    createdAt,
    updatedAt: createdAt,
  };
}

export const DEMO_SUBSCRIPTIONS: Subscription[] = [
  // Entertainment
  createSubscription(
    'Netflix',
    15.99,
    'monthly',
    'entertainment',
    'https://netflix.com',
    'Premium plan with 4K',
    3 // Renews in 3 days
  ),
  createSubscription(
    'Spotify',
    9.99,
    'monthly',
    'entertainment',
    'https://spotify.com',
    'Individual premium',
    12
  ),
  createSubscription(
    'Disney+',
    7.99,
    'monthly',
    'entertainment',
    'https://disneyplus.com',
    undefined,
    8
  ),
  createSubscription(
    'HBO Max',
    15.99,
    'monthly',
    'entertainment',
    'https://max.com',
    'Ad-free plan',
    21
  ),

  // Software
  createSubscription(
    'Adobe Creative Cloud',
    54.99,
    'monthly',
    'software',
    'https://adobe.com',
    'Photography plan - Lightroom + Photoshop',
    5
  ),
  createSubscription(
    'Microsoft 365',
    99.99,
    'yearly',
    'software',
    'https://microsoft.com',
    'Family plan - 6 users',
    45
  ),
  createSubscription(
    '1Password',
    35.88,
    'yearly',
    'software',
    'https://1password.com',
    'Personal vault',
    120
  ),

  // Fitness
  createSubscription(
    'Planet Fitness',
    24.99,
    'monthly',
    'fitness',
    'https://planetfitness.com',
    'Black card membership',
    1 // Tomorrow!
  ),
  createSubscription(
    'Peloton',
    44.00,
    'monthly',
    'fitness',
    'https://onepeloton.com',
    'App membership (no bike)',
    15
  ),

  // News & Education
  createSubscription(
    'The New York Times',
    17.00,
    'monthly',
    'news',
    'https://nytimes.com',
    'Digital all access',
    7
  ),
  createSubscription(
    'Coursera Plus',
    399.00,
    'yearly',
    'education',
    'https://coursera.org',
    'Unlimited courses access',
    200
  ),

  // Utilities & Other
  createSubscription(
    'iCloud+',
    2.99,
    'monthly',
    'cloud',
    'https://apple.com/icloud',
    '200GB storage plan',
    18
  ),
  createSubscription(
    'NordVPN',
    59.88,
    'yearly',
    'software',
    'https://nordvpn.com',
    '2-year plan (billed yearly)',
    90
  ),
];

/**
 * Get demo data with fresh IDs and recalculated dates
 */
export function getDemoSubscriptions(): Subscription[] {
  return DEMO_SUBSCRIPTIONS.map(sub => ({
    ...sub,
    id: generateId(),
    reminders: sub.reminders.map(r => ({ ...r, id: generateId() })),
    nextRenewal: calculateNextRenewal(sub.startDate, sub.cadence),
    updatedAt: new Date().toISOString(),
  }));
}
