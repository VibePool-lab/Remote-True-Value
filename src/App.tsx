import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Car, 
  Home, 
  Clock, 
  TrendingUp, 
  RefreshCcw,
  Zap,
  Shield,
  FileText
} from "lucide-react";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

interface CostState {
  commuteDays: number;
  commuteMiles: number;
  gasPrice: number;
  mpg: number;
  tollsPerDay: number;
  parkingPerDay: number;
  hourlyRate: number;
  commuteMinutes: number;
  maintenancePerMile: number;
  boughtLunchPerDay: number;
  utilityIncreasePerMonth: number;
  coffeeRemotePerDay: number;
}

export default function App() {
  const [view, setView] = useState<'calculator' | 'privacy' | 'terms'>('calculator');
  const [costs, setCosts] = useState<CostState>({
    commuteDays: 5,
    commuteMiles: 30,
    gasPrice: 3.50,
    mpg: 25,
    tollsPerDay: 0,
    parkingPerDay: 0,
    hourlyRate: 35,
    commuteMinutes: 60,
    maintenancePerMile: 0.12,
    boughtLunchPerDay: 15,
    utilityIncreasePerMonth: 40,
    coffeeRemotePerDay: 2,
  });

  const calculations = useMemo(() => {
    const daysPerYear = costs.commuteDays * 52;
    const daysPerMonth = (costs.commuteDays * 52) / 12;
    const monthlyMiles = costs.commuteMiles * daysPerMonth;
    const monthlyFuel = (monthlyMiles / costs.mpg) * costs.gasPrice;
    const monthlyMaintenance = monthlyMiles * costs.maintenancePerMile;
    const monthlyTolls = costs.tollsPerDay * daysPerMonth;
    const monthlyParking = costs.parkingPerDay * daysPerMonth;
    const monthlyLunch = costs.boughtLunchPerDay * daysPerMonth;
    const monthlyHoursInTransit = (costs.commuteMinutes / 60) * daysPerMonth;
    const monthlyTimeValue = monthlyHoursInTransit * costs.hourlyRate;
    const totalCommuteMonthly = monthlyFuel + monthlyMaintenance + monthlyTolls + monthlyParking + monthlyLunch + monthlyTimeValue;
    const directCommuteMonthly = monthlyFuel + monthlyMaintenance + monthlyTolls + monthlyParking + monthlyLunch;
    const monthlyRemoteUtilities = costs.utilityIncreasePerMonth;
    const monthlyRemoteCoffee = costs.coffeeRemotePerDay * daysPerMonth;
    const totalRemoteMonthly = monthlyRemoteUtilities + monthlyRemoteCoffee;
    const netSavings = totalCommuteMonthly - totalRemoteMonthly;

    return {
      monthlyFuel,
      monthlyMaintenance,
      monthlyTimeValue,
      monthlyLunch,
      totalCommuteMonthly,
      directCommuteMonthly,
      totalRemoteMonthly,
      netSavings,
      yearlySavings: netSavings * 12,
      hoursSavedPerYear: (costs.commuteMinutes / 60) * daysPerYear
    };
  }, [costs]);

  const handleInputChange = (field: keyof CostState, value: number) => {
    setCosts(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="calculator-root" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-12">
      <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('calculator')}
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
              <RefreshCcw className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">Remote True Value</h1>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Commute vs Remote Analysis</p>
            </div>
          </div>
          {view === 'calculator' && (
            <button 
              onClick={() => window.print()}
              className="text-slate-400 hover:text-slate-600 text-xs font-mono border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            >
              Export Report
            </button>
          )}
        </div>
      </nav>

      {view === 'calculator' ? (
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 mb-8 print:mb-4">
               <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Commute vs. Remote Analysis</h2>
               <p className="text-slate-500 max-w-2xl mt-2 print:text-xs">Revealing the true financial and temporal cost of traveling to an office.</p>
            </div>

            <div id="input-section" className="lg:col-span-12 xl:col-span-5 space-y-8 print:space-y-4">
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 print:bg-white print:border-slate-100">
                <div className="flex items-center gap-2 mb-6 print:mb-3">
                  <Car className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-bold text-xl print:text-base">Commute Profile</h2>
                </div>
                <div className="grid gap-6 print:gap-3">
                  <InputGroup label="Commute Days / Week" value={costs.commuteDays} onChange={(val) => handleInputChange('commuteDays', val)} min={1} max={7} />
                  <InputGroup label="Round Trip (Miles)" value={costs.commuteMiles} onChange={(val) => handleInputChange('commuteMiles', val)} />
                  <div className="grid grid-cols-2 gap-4 print:gap-2">
                    <InputGroup label="Gas $/Gal" value={costs.gasPrice} onChange={(val) => handleInputChange('gasPrice', val)} step={0.01} />
                    <InputGroup label="Vehicle MPG" value={costs.mpg} onChange={(val) => handleInputChange('mpg', val)} />
                  </div>
                  <InputGroup label="Daily Tolls & Parking" value={costs.tollsPerDay} onChange={(val) => handleInputChange('tollsPerDay', val)} />
                </div>
              </section>

              <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-6 print:mb-3">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-bold text-xl print:text-base">Hidden Value</h2>
                </div>
                <div className="grid gap-6 print:gap-3">
                  <InputGroup label="Your Hourly Value ($)" value={costs.hourlyRate} onChange={(val) => handleInputChange('hourlyRate', val)} helper="What is your time worth to you?" />
                  <InputGroup label="Daily Commute (Minutes)" value={costs.commuteMinutes} onChange={(val) => handleInputChange('commuteMinutes', val)} helper="Total time spent door-to-door" />
                  <InputGroup label="Lunch/Food Penalty ($)" value={costs.boughtLunchPerDay} onChange={(val) => handleInputChange('boughtLunchPerDay', val)} helper="Extra cost of office food vs home" />
                </div>
              </section>
            </div>

            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden print:bg-white print:text-slate-900 print:border-2 print:border-slate-100 print:shadow-none">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500 rounded-full opacity-10 blur-3xl print:hidden" />
                <div className="relative z-10 text-center md:text-left">
                  <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-4">
                    <div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block border border-emerald-500/30 print:border-slate-800 print:text-slate-800">Annual Potential Savings</span>
                      <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white print:text-slate-900">
                        ${Math.round(calculations.yearlySavings).toLocaleString()}
                      </h2>
                    </div>
                    <TrendingUp className="w-12 h-12 text-emerald-400 opacity-50 hidden md:block print:text-slate-300" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 print:border-slate-100">
                      <p className="text-slate-400 text-xs font-medium uppercase mb-1 print:text-slate-500">Monthly Saved</p>
                      <p className="text-2xl font-bold text-emerald-400 print:text-slate-900">${Math.round(calculations.netSavings).toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 print:border-slate-100">
                      <p className="text-slate-400 text-xs font-medium uppercase mb-1 print:text-slate-500">Time Recovered</p>
                      <p className="text-2xl font-bold text-emerald-400 print:text-slate-900">{Math.round(calculations.hoursSavedPerYear)} hrs/yr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 print:grid-cols-1">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-6 flex items-center justify-between">Monthly Breakdown <Car className="w-4 h-4" /></h3>
                  <div className="space-y-4">
                    <ResultRow label="Fuel" value={calculations.monthlyFuel} />
                    <ResultRow label="Maintenance" value={calculations.monthlyMaintenance} />
                    <ResultRow label="Food / Misc" value={calculations.monthlyLunch} />
                    <div className="pt-4 border-t border-slate-100">
                      <ResultRow label="Financial Total" value={calculations.directCommuteMonthly} highlight />
                    </div>
                    <div className="pt-2">
                      <ResultRow label="Time Value (Hidden)" value={calculations.monthlyTimeValue} subtle />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-6 flex items-center justify-between">Remote Costs <Home className="w-4 h-4" /></h3>
                  <div className="space-y-4">
                    <ResultRow label="Extra Utilities" value={costs.utilityIncreasePerMonth} />
                    <ResultRow label="Home Office Setup" value={costs.coffeeRemotePerDay * (costs.commuteDays * 52 / 12)} />
                    <div className="pt-4 border-t border-slate-100">
                      <ResultRow label="Total Added Cost" value={calculations.totalRemoteMonthly} highlight />
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 print:hidden">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-emerald-900 font-bold text-sm">Pay Optimization</p>
                      <p className="text-emerald-700 text-xs">Working remote is like an extra <span className="font-bold text-emerald-800">${Math.round(calculations.netSavings / 160 * 100) / 100}/hr</span> in effective pay.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : view === 'privacy' ? (
        <PrivacyPolicy onBack={() => setView('calculator')} />
      ) : (
        <TermsOfService onBack={() => setView('calculator')} />
      )}
      
      <footer className="text-center py-12 text-slate-400 text-xs border-t border-slate-200 mt-20 print:hidden">
        <div className="flex justify-center gap-6 mb-4">
          <button 
            onClick={() => setView('privacy')}
            className="hover:text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-3 h-3" />
            Privacy Policy
          </button>
          <button 
            onClick={() => setView('terms')}
            className="hover:text-slate-600 flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3 h-3" />
            Terms of Service
          </button>
        </div>
        <p>© 2026 VibePool-lab — Remote True Value Analysis Tool</p>
      </footer>
    </div>
  );
}

function InputGroup({ label, value, onChange, min, max, step = 1, helper }: { label: string; value: number; onChange: (val: number) => void; min?: number; max?: number; step?: number; helper?: string; }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-slate-600">{label}</label>
        <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-emerald-700 font-bold">{value}</span>
      </div>
      <input type="range" min={min ?? 0} max={max ?? 200} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 print:hidden" />
      {helper && <p className="text-[10px] text-slate-400 mt-1 italic print:text-[8px]">{helper}</p>}
    </div>
  );
}

function ResultRow({ label, value, highlight, subtle }: { label: string; value: number; highlight?: boolean; subtle?: boolean }) {
  return (
    <div className={`flex justify-between items-center ${subtle ? 'opacity-60 text-xs' : 'text-sm'}`}>
      <span className={highlight ? 'font-bold text-slate-800' : 'text-slate-600'}>{label}</span>
      <span className={`font-mono text-right ${highlight ? 'text-emerald-600 font-bold text-base' : 'text-slate-900'}`}>${Math.round(value).toLocaleString()}</span>
    </div>
  );
}


