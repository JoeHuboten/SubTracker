/**
 * API Route: Purchase (Activate Lifetime Access)
 * 
 * In production, this would integrate with Stripe/Paddle/etc.
 * For now, it's a mock that activates lifetime access immediately.
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, updateUserSubscription } from '@/lib/auth';

export async function POST() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In production: Process one-time payment with Stripe
    // For demo: Just activate lifetime access
    
    // Set subscription to expire in 100 years (effectively lifetime)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 100);
    
    updateUserSubscription(user.id, 'active', expiresAt);

    return NextResponse.json({
      success: true,
      message: 'Purchase complete! You now have lifetime access.',
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to complete purchase' },
      { status: 500 }
    );
  }
}
