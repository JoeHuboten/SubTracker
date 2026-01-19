'use client';

import Link from 'next/link';
import { CreditCard, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-4 h-4" />
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-400">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-slate-400 leading-relaxed">
                  Welcome to SubTracker (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your 
                  personal information and your right to privacy. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our subscription tracking application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We collect information that you provide directly to us:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li><strong className="text-white">Account Information:</strong> Email address and encrypted password when you create an account</li>
                  <li><strong className="text-white">Subscription Data:</strong> Information about subscriptions you manually add to the app (names, prices, renewal dates)</li>
                  <li><strong className="text-white">Payment Information:</strong> Processed securely through our payment provider; we do not store your credit card details</li>
                  <li><strong className="text-white">Usage Data:</strong> How you interact with our app to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
                <p className="text-slate-400 leading-relaxed">
                  Your subscription data is stored locally on your device using IndexedDB technology. 
                  Account information is stored securely on our servers with industry-standard encryption. 
                  We implement appropriate technical and organizational measures to protect your personal data 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information. We may share your information only in the following situations:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li><strong className="text-white">Service Providers:</strong> With third parties who perform services on our behalf (payment processing, hosting)</li>
                  <li><strong className="text-white">Legal Requirements:</strong> If required by law or in response to valid legal requests</li>
                  <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify or update your personal information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability (receive your data in a structured format)</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
                <p className="text-slate-400 leading-relaxed">
                  We use essential cookies to enable basic functionality of our app, such as maintaining your 
                  login session. We do not use tracking or advertising cookies. For more details, please see 
                  our <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300">Cookie Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
                <p className="text-slate-400 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage 
                  you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
                <p className="text-slate-400 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="text-slate-400 mt-2">
                  Email: <a href="mailto:privacy@subtracker.app" className="text-cyan-400 hover:text-cyan-300">privacy@subtracker.app</a>
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
