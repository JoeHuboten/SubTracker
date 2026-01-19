'use client';

import Link from 'next/link';
import { CreditCard, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-white">Sub</span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Tracker</span>
            </span>
          </Link>
          <Link 
            href="/pricing"
            className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-medium text-white hover:bg-cyan-400 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 mb-4">
              <FileText className="w-4 h-4" />
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-400">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-400 leading-relaxed">
                  By accessing or using SubTracker (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our Service. We reserve the right to update 
                  these terms at any time, and your continued use of the Service constitutes acceptance of those changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
                <p className="text-slate-400 leading-relaxed">
                  SubTracker is a subscription management tool that helps users track their recurring payments and 
                  subscriptions. The Service allows you to manually add, edit, and manage your subscription information 
                  for personal budgeting and organization purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Account Registration</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  To use certain features of the Service, you must create an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Pricing and Payment</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  SubTracker offers a one-time payment of €3.99 for lifetime access to all features. By making a purchase:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>You authorize us to charge your chosen payment method</li>
                  <li>All payments are processed securely through our payment provider</li>
                  <li>Prices are subject to change, but changes will not affect existing purchases</li>
                  <li>Lifetime access means access for the lifetime of the product</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Refund Policy</h2>
                <p className="text-slate-400 leading-relaxed">
                  We offer a 30-day money-back guarantee. If you are not satisfied with SubTracker within 30 days of 
                  your purchase, contact us at support@subtracker.app for a full refund. Refund requests made after 
                  30 days will be considered on a case-by-case basis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Acceptable Use</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Use the Service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Share your account credentials with others</li>
                  <li>Reverse engineer or attempt to extract source code</li>
                  <li>Use the Service to transmit malware or harmful code</li>
                  <li>Resell or redistribute the Service without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
                <p className="text-slate-400 leading-relaxed">
                  The Service and its original content, features, and functionality are owned by SubTracker and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property 
                  laws. You may not copy, modify, distribute, sell, or lease any part of our Service without written permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. User Data</h2>
                <p className="text-slate-400 leading-relaxed">
                  You retain ownership of all data you enter into SubTracker. Your subscription data is stored locally 
                  on your device, and you are responsible for maintaining backups of your data. We are not responsible 
                  for any loss of data due to device failure, browser clearing, or other circumstances beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-slate-400 leading-relaxed">
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express 
                  or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free. SubTracker 
                  is a tracking tool and should not be considered financial advice. Always verify your actual subscription 
                  charges with your service providers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Limitation of Liability</h2>
                <p className="text-slate-400 leading-relaxed">
                  To the maximum extent permitted by law, SubTracker shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, 
                  resulting from your use or inability to use the Service. Our total liability shall not exceed the amount 
                  you paid for the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">11. Termination</h2>
                <p className="text-slate-400 leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                  for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, 
                  or for any other reason at our sole discretion. You may also delete your account at any time through 
                  the app settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">12. Governing Law</h2>
                <p className="text-slate-400 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the European Union. 
                  Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive 
                  jurisdiction of the courts in the European Union.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">13. Contact</h2>
                <p className="text-slate-400 leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-slate-400 mt-2">
                  Email: <a href="mailto:legal@subtracker.app" className="text-cyan-400 hover:text-cyan-300">legal@subtracker.app</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-black/20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} SubTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
