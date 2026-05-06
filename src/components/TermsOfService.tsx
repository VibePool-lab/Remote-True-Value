import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService({ onBack }: { onBack: () => void }) {
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

      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By using the Remote True Value calculator, you agree to these terms. This tool is provided "as is" without warranty of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. Accuracy of Calculations</h2>
          <p>
            The calculations provided by this tool are estimates based on user input. Real-world costs may vary based on vehicle efficiency, fuel prices, maintenance needs, and other unforeseen variables. Users should not make major career or financial decisions based solely on these estimates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. No Professional Advice</h2>
          <p>
            The content provided is for informational purposes only and does not constitute financial, legal, or professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. Open Source</h2>
          <p>
            This tool is provided as part of an open-source demonstration. You are encouraged to review the code and suggest improvements on the repository.
          </p>
        </section>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-slate-400 text-xs">
        Last updated: May 2026
      </footer>
    </motion.div>
  );
}
