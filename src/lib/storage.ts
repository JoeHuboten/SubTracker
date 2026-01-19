/**
 * Subscription Tracker - Storage Layer
 * 
 * Uses IndexedDB as primary storage with localStorage fallback.
 * Provides offline-first persistence.
 */

import { AppState, DEFAULT_SETTINGS } from './types';

const DB_NAME = 'subscription_tracker';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const LS_KEY = 'subscription_tracker_state';

// ============================================================
// Default State
// ============================================================

export function getDefaultState(): AppState {
  return {
    subscriptions: [],
    settings: DEFAULT_SETTINGS,
    snoozedReminders: [],
    lastOpenedAt: new Date().toISOString(),
  };
}

// ============================================================
// IndexedDB Helpers
// ============================================================

let dbInstance: IDBDatabase | null = null;

function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && typeof indexedDB !== 'undefined';
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function saveToIndexedDB(state: AppState): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Serialize state to ensure no functions are included
      const serializedState = JSON.parse(JSON.stringify(state));
      const request = store.put({ id: 'main', ...serializedState });
      
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

async function loadFromIndexedDB(): Promise<AppState | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('main');
      
      request.onsuccess = () => {
        if (request.result) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...state } = request.result;
          resolve(state as AppState);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// ============================================================
// LocalStorage Fallback
// ============================================================

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function saveToLocalStorage(state: AppState): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    // Serialize to ensure no functions are included
    const serialized = JSON.stringify(state);
    localStorage.setItem(LS_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}

function loadFromLocalStorage(): AppState | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// ============================================================
// Public API
// ============================================================

/**
 * Load application state from storage
 */
export async function loadState(): Promise<AppState> {
  // Try IndexedDB first
  const idbState = await loadFromIndexedDB();
  if (idbState) {
    return { ...getDefaultState(), ...idbState };
  }
  
  // Fallback to localStorage
  const lsState = loadFromLocalStorage();
  if (lsState) {
    return { ...getDefaultState(), ...lsState };
  }
  
  // Return default state
  return getDefaultState();
}

/**
 * Save application state to storage
 */
export async function saveState(state: AppState): Promise<boolean> {
  // Try IndexedDB first
  const idbSuccess = await saveToIndexedDB(state);
  
  // Also save to localStorage as backup
  const lsSuccess = saveToLocalStorage(state);
  
  return idbSuccess || lsSuccess;
}

/**
 * Export state as JSON string
 */
export function exportJSON(state: AppState): string {
  const exportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    data: state,
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Import state from JSON string
 */
export function importJSON(json: string): AppState | null {
  try {
    const parsed = JSON.parse(json);
    
    // Handle both direct state and wrapped export format
    const state = parsed.data || parsed;
    
    // Validate required fields
    if (!state.subscriptions || !Array.isArray(state.subscriptions)) {
      return null;
    }
    
    return {
      ...getDefaultState(),
      ...state,
      lastOpenedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Reset all state (clear storage)
 */
export async function resetState(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  try {
    // Clear IndexedDB
    if (isIndexedDBAvailable() && dbInstance) {
      const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();
    }
    
    // Clear localStorage
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(LS_KEY);
    }
    
    return true;
  } catch {
    return false;
  }
}
