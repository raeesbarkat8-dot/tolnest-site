import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Percent, ArrowRight } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'valOf' | 'isWhat' | 'change' | 'discount'>('valOf');
  const [copied, setCopied] = useState(false);

  // Tab 1: What is X% of Y?
  const [p1, setP1] = useState<string>('15');
  const [v1, setV1] = useState<string>('240');

  // Tab 2: X is what % of Y?
  const [x2, setX2] = useState<string>('45');
  const [y2, setY2] = useState<string>('150');

  // Tab 3: % Increase/Decrease from X to Y
  const [from3, setFrom3] = useState<string>('80');
  const [to3, setTo3] = useState<string>('120');

  // Tab 4: Discount & Final Price
  const [price4, setPrice4] = useState<string>('150');
  const [discount4, setDiscount4] = useState<string>('25');

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const calc1 = () => {
    const p = parseFloat(p1);
    const v = parseFloat(v1);
    if (isNaN(p) || isNaN(v)) return null;
    return (p / 100) * v;
  };

  const calc2 = () => {
    const x = parseFloat(x2);
    const y = parseFloat(y2);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    return (x / y) * 100;
  };

  const calc3 = () => {
    const from = parseFloat(from3);
    const to = parseFloat(to3);
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    const diff = to - from;
    const pct = (diff / Math.abs(from)) * 100;
    return { diff, pct, isIncrease: diff >= 0 };
  };

  const calc4 = () => {
    const pr = parseFloat(price4);
    const d = parseFloat(discount4);
    if (isNaN(pr) || isNaN(d)) return null;
    const savings = (pr * d) / 100;
    const finalPrice = pr - savings;
    return { savings, finalPrice };
  };

  const res1 = calc1();
  const res2 = calc2();
  const res3 = calc3();
  const res4 = calc4();

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Mode Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('valOf')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            activeTab === 'valOf' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          X% of Y
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('isWhat')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            activeTab === 'isWhat' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          X is What % of Y
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('change')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            activeTab === 'change' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          % Change (Increase/Decrease)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('discount')}
          className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            activeTab === 'discount' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Discount & Savings
        </button>
      </div>

      {/* Tab 1: X% of Y */}
      {activeTab === 'valOf' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="p1" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Percentage (%)
              </label>
              <div className="relative">
                <input
                  id="p1"
                  type="number"
                  step="any"
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
              </div>
            </div>
            <div>
              <label htmlFor="v1" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Of Total Number (Y)
              </label>
              <input
                id="v1"
                type="number"
                step="any"
                value={v1}
                onChange={(e) => setV1(e.target.value)}
                placeholder="e.g. 240"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
          </div>

          {res1 !== null && (
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Result</span>
                <button
                  type="button"
                  onClick={() => copyText(res1.toString())}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums mt-2">
                {res1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                Formula: ({p1} / 100) × {v1} = {res1}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: X is what % of Y */}
      {activeTab === 'isWhat' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="x2" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Part Value (X)
              </label>
              <input
                id="x2"
                type="number"
                step="any"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="e.g. 45"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="y2" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Whole Value (Y)
              </label>
              <input
                id="y2"
                type="number"
                step="any"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                placeholder="e.g. 150"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
          </div>

          {res2 !== null && (
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Percentage Proportion</span>
                <button
                  type="button"
                  onClick={() => copyText(`${res2.toFixed(2)}%`)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tabular-nums mt-2">
                {res2.toLocaleString(undefined, { maximumFractionDigits: 3 })}%
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                Formula: ({x2} ÷ {y2}) × 100 = {res2.toFixed(3)}%
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: % Change */}
      {activeTab === 'change' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="from3" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Original Value (From)
              </label>
              <input
                id="from3"
                type="number"
                step="any"
                value={from3}
                onChange={(e) => setFrom3(e.target.value)}
                placeholder="e.g. 80"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="to3" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                New Value (To)
              </label>
              <input
                id="to3"
                type="number"
                step="any"
                value={to3}
                onChange={(e) => setTo3(e.target.value)}
                placeholder="e.g. 120"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
          </div>

          {res3 !== null && (
            <div className={`rounded-xl p-6 border ${res3.isIncrease ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}`}>
              <span className={`text-xs font-semibold uppercase tracking-wider ${res3.isIncrease ? 'text-emerald-800' : 'text-rose-800'}`}>
                {res3.isIncrease ? 'Percentage Increase' : 'Percentage Decrease'}
              </span>
              <p className={`text-3xl font-extrabold tabular-nums mt-2 ${res3.isIncrease ? 'text-emerald-700' : 'text-rose-700'}`}>
                {res3.isIncrease ? '+' : ''}{res3.pct.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
              </p>
              <p className="text-xs text-slate-600 mt-2 font-mono">
                Absolute change: {res3.diff >= 0 ? `+${res3.diff}` : res3.diff} | Formula: (({to3} - {from3}) ÷ {from3}) × 100
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Discount & Savings */}
      {activeTab === 'discount' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price4" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Original Price ($)
              </label>
              <input
                id="price4"
                type="number"
                step="any"
                value={price4}
                onChange={(e) => setPrice4(e.target.value)}
                placeholder="e.g. 150"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="discount4" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Discount Percentage (%)
              </label>
              <div className="relative">
                <input
                  id="discount4"
                  type="number"
                  step="any"
                  value={discount4}
                  onChange={(e) => setDiscount4(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
              </div>
            </div>
          </div>

          {res4 !== null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Final Discounted Price</span>
                <p className="text-3xl font-extrabold text-emerald-700 tabular-nums mt-2">
                  ${res4.finalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-emerald-800/80 mt-1">Price after {discount4}% discount</p>
              </div>

              <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-800">Total Money Saved</span>
                <p className="text-3xl font-extrabold text-indigo-700 tabular-nums mt-2">
                  ${res4.savings.toFixed(2)}
                </p>
                <p className="text-xs text-indigo-800/80 mt-1">Discount amount subtracted</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reset Bar */}
      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setP1('15'); setV1('240');
            setX2('45'); setY2('150');
            setFrom3('80'); setTo3('120');
            setPrice4('150'); setDiscount4('25');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Fields</span>
        </button>
      </div>
    </div>
  );
};
