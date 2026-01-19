/**
 * Database Setup - SQLite with better-sqlite3
 */

import Database from 'better-sqlite3';
import path from 'path';

// Database file location
const dbPath = path.join(process.cwd(), 'data', 'subtracker.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    subscription_status TEXT DEFAULT 'inactive',
    subscription_expires_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- User subscriptions (their tracked subscriptions)
  CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    cadence TEXT DEFAULT 'monthly',
    category TEXT DEFAULT 'other',
    status TEXT DEFAULT 'active',
    next_renewal TEXT,
    start_date TEXT,
    website TEXT,
    notes TEXT,
    reminders TEXT,
    price_history TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- User settings
  CREATE TABLE IF NOT EXISTS user_settings (
    user_id TEXT PRIMARY KEY,
    currency TEXT DEFAULT 'USD',
    reminder_default_days INTEGER DEFAULT 3,
    theme TEXT DEFAULT 'dark',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Create indexes
  CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`);

export default db;

// Helper types
export interface DBUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
  subscription_status: 'inactive' | 'active' | 'cancelled';
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBSubscription {
  id: string;
  user_id: string;
  name: string;
  price: number;
  currency: string;
  cadence: string;
  category: string;
  status: string;
  next_renewal: string | null;
  start_date: string | null;
  website: string | null;
  notes: string | null;
  reminders: string | null;
  price_history: string | null;
  created_at: string;
  updated_at: string;
}
