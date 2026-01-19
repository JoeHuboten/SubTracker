/**
 * Authentication Utilities
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import db, { DBUser } from './db';

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'subtracker-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Cookie name
export const AUTH_COOKIE = 'subtracker_auth';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 */
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get current user from auth cookie (server-side)
 */
export async function getCurrentUser(): Promise<DBUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId) as DBUser | undefined;
  return user || null;
}

/**
 * Check if user has active subscription
 */
export function hasActiveSubscription(user: DBUser): boolean {
  if (user.subscription_status !== 'active') return false;
  
  if (user.subscription_expires_at) {
    const expiresAt = new Date(user.subscription_expires_at);
    return expiresAt > new Date();
  }
  
  return false;
}

/**
 * Create a new user
 */
export async function createUser(email: string, password: string, name?: string): Promise<DBUser> {
  const id = generateId();
  const hashedPassword = await hashPassword(password);
  
  db.prepare(`
    INSERT INTO users (id, email, password, name, subscription_status)
    VALUES (?, ?, ?, ?, 'inactive')
  `).run(id, email.toLowerCase(), hashedPassword, name || null);
  
  // Create default settings
  db.prepare(`
    INSERT INTO user_settings (user_id)
    VALUES (?)
  `).run(id);
  
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as DBUser;
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): DBUser | null {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as DBUser | undefined;
  return user || null;
}

/**
 * Update user subscription status
 */
export function updateUserSubscription(
  userId: string, 
  status: 'active' | 'inactive' | 'cancelled',
  expiresAt?: Date
): void {
  db.prepare(`
    UPDATE users 
    SET subscription_status = ?, subscription_expires_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, expiresAt?.toISOString() || null, userId);
}
