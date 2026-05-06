import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-12 text-slate-800"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-12 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Calculator
      </button>

      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Data Collection</h2>
          <p>
            The Remote True Value tool is designed to work entirely in your browser. We do not collect, store, or transmit any of the data you enter into the calculator. All financial calculations and inputs remain local to your device session.
            However, statistical cookies are collected by third-party services (eg. Google Analytics), without any personal data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. External Links</h2>
          <p>
            Any links to external websites (like GitHub) are subject to that specific site's privacy policies. We are not responsible for the privacy practices of external entities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Contact</h2>
          <p>
            If you have questions about this tool, you can reach out via the official repository on GitHub.
          </p>
        </section>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-slate-400 text-xs">
        Last updated: May 2026
      </footer>
    </motion.div>
  );
}
