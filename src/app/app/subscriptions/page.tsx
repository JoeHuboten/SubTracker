'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to main app page - subscriptions are shown there
export default function SubscriptionsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/app');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-ink-muted">Redirecting...</p>
    </div>
  );
}
