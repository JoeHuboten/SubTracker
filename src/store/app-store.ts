/**
 * Subscription Tracker - Application Store
 * 
 * Uses Zustand for state management with IndexedDB persistence.
 */

import { create } from 'zustand';
import { 
  Subscription, 
  Reminder,
  AppState,
  AppSettings,
  SnoozeState,
  DEFAULT_SETTINGS,
  DEFAULT_REMINDERS,
} from '@/lib/types';
import { 
  loadState, 
  saveState, 
  resetState,
  getDefaultState, 
} from '@/lib/storage';
import { getDemoSubscriptions } from '@/lib/demo-data';
import { 
  generateId, 
  calculateNextRenewal, 
  daysUntil,
  cadenceToMonthly,
  cadenceToYearly,
} from '@/lib/helpers';

interface StoreActions {
  // Initialization
  initialize: () => Promise<void>;
  
  // Subscription CRUD
  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt' | 'reminders' | 'priceHistory'>) => string;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  
  // Reminders
  updateReminder: (subscriptionId: string, reminderId: string, updates: Partial<Reminder>) => void;
  snoozeReminder: (subscriptionId: string, until: string) => void;
  dismissSnooze: (subscriptionId: string) => void;
  
  // Price History
  updatePrice: (subscriptionId: string, newPrice: number, note?: string) => void;
  
  // Settings
  updateSettings: (updates: Partial<AppSettings>) => void;
  
  // Data Management
  loadDemoData: () => void;
  clearAllData: () => Promise<void>;
  importState: (state: AppState) => void;
  
  // Helpers
  getSubscription: (id: string) => Subscription | undefined;
  getActiveSubscriptions: () => Subscription[];
  getUpcomingRenewals: (days?: number) => Subscription[];
  getMonthlyTotal: () => number;
  getYearlyTotal: () => number;
}

interface Store extends AppState, StoreActions {
  isInitialized: boolean;
  isLoading: boolean;
}

// Debounced save
let saveTimeout: NodeJS.Timeout | null = null;
function debouncedSave(state: AppState) {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(state);
  }, 500);
}

export const useAppStore = create<Store>()((set, get) => ({
  // Initial state
  ...getDefaultState(),
  isInitialized: false,
  isLoading: true,
  
  // Initialize store from storage
  initialize: async () => {
    const state = get();
    if (state.isInitialized) return;
    
    try {
      const loaded = await loadState();
      set({ 
        ...loaded,
        isInitialized: true, 
        isLoading: false,
        lastOpenedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to load state:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },
  
  // Add a new subscription
  addSubscription: (subData) => {
    const id = generateId();
    const now = new Date().toISOString();
    
    const newSub: Subscription = {
      ...subData,
      id,
      reminders: DEFAULT_REMINDERS.map(r => ({ ...r, id: generateId() })),
      priceHistory: [{
        price: subData.price,
        date: now,
        note: 'Initial price',
      }],
      createdAt: now,
      updatedAt: now,
    };
    
    set(state => {
      const newState = {
        ...state,
        subscriptions: [...state.subscriptions, newSub],
      };
      debouncedSave(newState);
      return newState;
    });
    
    return id;
  },
  
  // Update subscription
  updateSubscription: (id, updates) => {
    set(state => {
      const newSubscriptions = state.subscriptions.map(sub => {
        if (sub.id !== id) return sub;
        
        const updated = {
          ...sub,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        
        // Recalculate next renewal if cadence or startDate changed
        if (updates.cadence || updates.startDate) {
          updated.nextRenewal = calculateNextRenewal(
            updates.startDate || sub.startDate,
            updates.cadence || sub.cadence
          );
        }
        
        return updated;
      });
      
      const newState = { ...state, subscriptions: newSubscriptions };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Delete subscription
  deleteSubscription: (id) => {
    set(state => {
      const newState = {
        ...state,
        subscriptions: state.subscriptions.filter(s => s.id !== id),
        snoozedReminders: state.snoozedReminders.filter(s => s.subscriptionId !== id),
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Update a specific reminder
  updateReminder: (subscriptionId, reminderId, updates) => {
    set(state => {
      const newSubscriptions = state.subscriptions.map(sub => {
        if (sub.id !== subscriptionId) return sub;
        
        return {
          ...sub,
          reminders: sub.reminders.map(r => 
            r.id === reminderId ? { ...r, ...updates } : r
          ),
          updatedAt: new Date().toISOString(),
        };
      });
      
      const newState = { ...state, subscriptions: newSubscriptions };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Snooze reminder for a subscription
  snoozeReminder: (subscriptionId, until) => {
    set(state => {
      // Remove existing snooze for this subscription
      const filtered = state.snoozedReminders.filter(
        s => s.subscriptionId !== subscriptionId
      );
      
      const newSnooze: SnoozeState = {
        subscriptionId,
        snoozedUntil: until,
      };
      
      const newState = {
        ...state,
        snoozedReminders: [...filtered, newSnooze],
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Dismiss snooze
  dismissSnooze: (subscriptionId) => {
    set(state => {
      const newState = {
        ...state,
        snoozedReminders: state.snoozedReminders.filter(
          s => s.subscriptionId !== subscriptionId
        ),
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Update price and add to history
  updatePrice: (subscriptionId, newPrice, note) => {
    set(state => {
      const newSubscriptions = state.subscriptions.map(sub => {
        if (sub.id !== subscriptionId) return sub;
        
        return {
          ...sub,
          price: newPrice,
          priceHistory: [
            ...sub.priceHistory,
            {
              price: newPrice,
              date: new Date().toISOString(),
              note: note || 'Price updated',
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      });
      
      const newState = { ...state, subscriptions: newSubscriptions };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Update settings
  updateSettings: (updates) => {
    set(state => {
      const newState = {
        ...state,
        settings: { ...state.settings, ...updates },
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Load demo data
  loadDemoData: () => {
    const demos = getDemoSubscriptions();
    set(state => {
      const newState = {
        ...state,
        subscriptions: demos,
        snoozedReminders: [],
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Clear all data
  clearAllData: async () => {
    await resetState();
    set({
      ...getDefaultState(),
      isInitialized: true,
      isLoading: false,
    });
  },
  
  // Import state (from JSON)
  importState: (imported) => {
    set(state => {
      const newState = {
        ...state,
        ...imported,
        lastOpenedAt: new Date().toISOString(),
      };
      debouncedSave(newState);
      return newState;
    });
  },
  
  // Get single subscription
  getSubscription: (id) => {
    return get().subscriptions.find(s => s.id === id);
  },
  
  // Get active subscriptions
  getActiveSubscriptions: () => {
    return get().subscriptions.filter(s => s.status === 'active');
  },
  
  // Get subscriptions renewing within N days
  getUpcomingRenewals: (days = 7) => {
    return get().subscriptions
      .filter(s => {
        if (s.status !== 'active') return false;
        const until = daysUntil(s.nextRenewal);
        return until >= 0 && until <= days;
      })
      .sort((a, b) => daysUntil(a.nextRenewal) - daysUntil(b.nextRenewal));
  },
  
  // Calculate monthly total
  getMonthlyTotal: () => {
    const { subscriptions } = get();
    
    return subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, sub) => sum + cadenceToMonthly(sub.price, sub.cadence), 0);
  },
  
  // Calculate yearly total
  getYearlyTotal: () => {
    const { subscriptions } = get();
    
    return subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, sub) => sum + cadenceToYearly(sub.price, sub.cadence), 0);
  },
}))
