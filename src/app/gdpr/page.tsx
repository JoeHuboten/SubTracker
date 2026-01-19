'use client';

import Link from 'next/link';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';

export default function GDPRPage() {
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
              GDPR
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              GDPR Compliance
            </h1>
            <p className="text-slate-400">
              How we comply with the General Data Protection Regulation
            </p>
          </div>

          {/* GDPR Commitment */}
          <div className="mb-12 p-6 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Our Commitment</h2>
                <p className="text-slate-400">
                  SubTracker is fully committed to GDPR compliance. We respect your privacy and give you complete 
                  control over your personal data. As a European company, we take data protection seriously.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="p-8 bg-white/[0.02] border border-white/10 rounded-2xl space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Your Rights Under GDPR</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">1. Right to Access (Article 15)</h3>
                    <p className="text-slate-400 text-sm">
                      You have the right to obtain confirmation as to whether or not your personal data is being processed, 
                      and to access that data along with information about how it is being used.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">2. Right to Rectification (Article 16)</h3>
                    <p className="text-slate-400 text-sm">
                      You have the right to have inaccurate personal data corrected and incomplete data completed.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">3. Right to Erasure (Article 17)</h3>
                    <p className="text-slate-400 text-sm">
                      Also known as the &quot;right to be forgotten,&quot; you can request the deletion of your personal data 
                      when it is no longer necessary for the purposes it was collected.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">4. Right to Restrict Processing (Article 18)</h3>
                    <p className="text-slate-400 text-sm">
                      You can request that we limit the processing of your personal data under certain circumstances.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">5. Right to Data Portability (Article 20)</h3>
                    <p className="text-slate-400 text-sm">
                      You have the right to receive your personal data in a structured, commonly used, and machine-readable 
                      format, and to transmit that data to another controller.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">6. Right to Object (Article 21)</h3>
                    <p className="text-slate-400 text-sm">
                      You have the right to object to the processing of your personal data for certain purposes, 
                      including direct marketing.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">7. Right to Withdraw Consent (Article 7)</h3>
                    <p className="text-slate-400 text-sm">
                      Where processing is based on consent, you have the right to withdraw that consent at any time.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">How We Protect Your Data</h2>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li><strong className="text-white">Encryption:</strong> All data transmitted to and from SubTracker is encrypted using TLS 1.3</li>
                  <li><strong className="text-white">Password Security:</strong> Passwords are hashed using bcrypt with 12 rounds</li>
                  <li><strong className="text-white">Local Storage:</strong> Your subscription data is stored locally on your device by default</li>
                  <li><strong className="text-white">Minimal Collection:</strong> We only collect data that is necessary for the service to function</li>
                  <li><strong className="text-white">No Tracking:</strong> We do not use tracking cookies or sell your data to third parties</li>
                  <li><strong className="text-white">EU Servers:</strong> Our servers are located in the European Union</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Legal Basis for Processing</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li><strong className="text-white">Contract:</strong> Processing necessary to perform our contract with you (providing the service)</li>
                  <li><strong className="text-white">Consent:</strong> Processing based on your explicit consent (e.g., marketing communications)</li>
                  <li><strong className="text-white">Legitimate Interest:</strong> Processing for our legitimate interests (e.g., improving our service)</li>
                  <li><strong className="text-white">Legal Obligation:</strong> Processing necessary to comply with legal requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Data Retention</h2>
                <p className="text-slate-400 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes for which it 
                  was collected. When you delete your account, we will delete your personal data within 30 days, 
                  except where we are required to retain it for legal, accounting, or reporting purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Exercising Your Rights</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  To exercise any of your GDPR rights, you can:
                </p>
                <ul className="list-disc list-inside text-slate-400 space-y-2">
                  <li>Email us at <a href="mailto:privacy@subtracker.app" className="text-cyan-400 hover:text-cyan-300">privacy@subtracker.app</a></li>
                  <li>Use the account settings in the app to delete your data</li>
                  <li>Contact us through our <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">contact form</Link></li>
                </ul>
                <p className="text-slate-400 leading-relaxed mt-4">
                  We will respond to your request within 30 days. If we need more time, we will inform you of the 
                  reason and extension period.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Data Protection Officer</h2>
                <p className="text-slate-400 leading-relaxed">
                  For any questions about our data protection practices or to exercise your rights, you can contact 
                  our Data Protection Officer at:
                </p>
                <p className="text-slate-400 mt-2">
                  Email: <a href="mailto:dpo@subtracker.app" className="text-cyan-400 hover:text-cyan-300">dpo@subtracker.app</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Supervisory Authority</h2>
                <p className="text-slate-400 leading-relaxed">
                  If you believe that we have not adequately addressed your data protection concerns, you have the 
                  right to lodge a complaint with your local data protection supervisory authority.
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
