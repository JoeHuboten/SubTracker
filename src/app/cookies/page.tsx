'use client';

import Link from 'next/link';
import { CreditCard, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
              <Cookie className="w-4 h-4" />
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-slate-400">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
                <p className="text-slate-400 leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you 
                  visit a website. They are widely used to make websites work more efficiently and provide information 
                  to the owners of the site. Cookies help us improve your experience and understand how you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
                <p className="text-slate-400 leading-relaxed">
                  SubTracker uses only essential cookies that are necessary for the basic functionality of our service. 
                  We do not use advertising, tracking, or third-party marketing cookies. We believe in minimal data 
                  collection and respecting your privacy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
                
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Essential Cookies (Required)</h3>
                    <p className="text-slate-400 text-sm mb-3">
                      These cookies are necessary for the website to function and cannot be switched off.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-300">
                          <th className="pb-2">Cookie</th>
                          <th className="pb-2">Purpose</th>
                          <th className="pb-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-400">
                        <tr>
                          <td className="py-2 font-mono text-xs">auth_token</td>
                          <td className="py-2">Keeps you logged in</td>
                          <td className="py-2">7 days</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-xs">session_id</td>
                          <td className="py-2">Session management</td>
                          <td className="py-2">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Functional Cookies (Optional)</h3>
                    <p className="text-slate-400 text-sm mb-3">
                      These cookies enable enhanced functionality and personalization.
                    </p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-300">
                          <th className="pb-2">Cookie</th>
                          <th className="pb-2">Purpose</th>
                          <th className="pb-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-400">
                        <tr>
                          <td className="py-2 font-mono text-xs">preferences</td>
                          <td className="py-2">Remembers your settings</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-xs">currency</td>
                          <td className="py-2">Your preferred currency</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Cookies We Don&apos;t Use</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We are committed to your privacy. SubTracker does NOT use:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Advertising or marketing cookies</li>
                  <li>Third-party tracking cookies</li>
                  <li>Social media tracking cookies</li>
                  <li>Analytics cookies that track individual users</li>
                  <li>Cross-site tracking cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Local Storage</h2>
                <p className="text-slate-400 leading-relaxed">
                  In addition to cookies, SubTracker uses your browser&apos;s local storage (IndexedDB and localStorage) 
                  to store your subscription data. This data never leaves your device unless you explicitly choose to 
                  sync it. Local storage is not shared with any third parties and is only accessible by SubTracker.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Managing Cookies</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li><strong className="text-white">Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
                  <li><strong className="text-white">Delete Cookies:</strong> You can delete all cookies stored on your device through your browser settings</li>
                  <li><strong className="text-white">Private Browsing:</strong> Use incognito/private mode to prevent cookies from being stored</li>
                </ul>
                <p className="text-slate-400 leading-relaxed mt-4">
                  Note: Blocking essential cookies may affect the functionality of SubTracker, including the ability 
                  to stay logged in.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
                <p className="text-slate-400 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                  operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about 
                  our use of cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
                <p className="text-slate-400 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at:
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
