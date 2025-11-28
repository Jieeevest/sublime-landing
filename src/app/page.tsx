import Hero from '@/components/Hero';
import WhatIsSublime from '@/components/WhatIsSublime';
import HowItSupports from '@/components/HowItSupports';
import KeyAdvantages from '@/components/KeyAdvantages';
import InsightsGuidance from '@/components/InsightsGuidance';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatIsSublime />
      <HowItSupports />
      <KeyAdvantages />
      <InsightsGuidance />
      <FAQ />
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Sublime</h3>
              <p className="text-teal-200">
                Guided healing for a smoother recovery journey.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-teal-200">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sessions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-teal-200">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-teal-200">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-300">
            <p>&copy; 2025 Sublime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
