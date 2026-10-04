import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, RotateCcw, TrendingUp, DollarSign } from 'lucide-react';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rateToUsd: number; // Rate where 1 USD = rateToUsd in target currency
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateToUsd: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateToUsd: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateToUsd: 0.79 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateToUsd: 154.2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateToUsd: 1.38 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateToUsd: 1.54 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rateToUsd: 0.89 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rateToUsd: 7.24 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateToUsd: 83.5 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rateToUsd: 1.35 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rateToUsd: 3.67 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rateToUsd: 1.66 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rateToUsd: 5.45 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rateToUsd: 18.25 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', rateToUsd: 18.1 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', rateToUsd: 3.75 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rateToUsd: 10.55 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rateToUsd: 1378.0 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rateToUsd: 32.8 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rateToUsd: 7.81 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rateToUsd: 16250.0 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', rateToUsd: 36.7 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', rateToUsd: 4.02 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rateToUsd: 6.87 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', rateToUsd: 4.71 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rateToUsd: 58.6 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', rateToUsd: 278.4 }
];

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [copied, setCopied] = useState<boolean>(false);

  const fromCurr = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
  const toCurr = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1];

  // Rate: 1 fromCurr in toCurr
  // fromCurr -> USD is (1 / fromCurr.rateToUsd)
  // USD -> toCurr is * toCurr.rateToUsd
  const exchangeRate = useMemo(() => {
    return (1 / fromCurr.rateToUsd) * toCurr.rateToUsd;
  }, [fromCurr, toCurr]);

  const convertedAmount = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) return 0;
    return val * exchangeRate;
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    const prevFrom = fromCode;
    setFromCode(toCode);
    setToCode(prevFrom);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedAmount.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const topComparisons = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CNY'].filter(
    (code) => code !== fromCode
  );

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Quick Pair Presets */}
      <div className="flex items-center flex-wrap gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
          Popular:
        </span>
        <button
          type="button"
          onClick={() => {
            setFromCode('USD');
            setToCode('EUR');
          }}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          USD → EUR
        </button>
        <button
          type="button"
          onClick={() => {
            setFromCode('EUR');
            setToCode('USD');
          }}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          EUR → USD
        </button>
        <button
          type="button"
          onClick={() => {
            setFromCode('USD');
            setToCode('GBP');
          }}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          USD → GBP
        </button>
        <button
          type="button"
          onClick={() => {
            setFromCode('USD');
            setToCode('INR');
          }}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          USD → INR
        </button>
        <button
          type="button"
          onClick={() => {
            setFromCode('USD');
            setToCode('JPY');
          }}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          USD → JPY
        </button>
      </div>

      {/* Main Conversion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* From Box */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <label htmlFor="amountInput" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            You Send (Amount)
          </label>
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm font-semibold text-slate-400">
                {fromCurr.symbol}
              </span>
              <input
                id="amountInput"
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums font-mono"
              />
            </div>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Action */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
            title="Swap Currencies"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="md:col-span-5 bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="toCodeSelect" className="block text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
              They Receive (Converted)
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-base font-bold text-slate-900 tabular-nums font-mono min-h-[42px] flex items-center truncate">
              <span className="text-slate-400 mr-1.5 text-sm">{toCurr.symbol}</span>
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </div>
            <select
              id="toCodeSelect"
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Live Benchmark Rate Banner */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>
            Mid-market rate: <strong>1 {fromCode} = {exchangeRate.toFixed(4)} {toCode}</strong>
          </span>
          <span className="text-slate-400">·</span>
          <span>1 {toCode} = {(1 / exchangeRate).toFixed(4)} {fromCode}</span>
        </div>

        <button
          type="button"
          onClick={() => setAmount('100')}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset to 100</span>
        </button>
      </div>

      {/* Multi-Currency Matrix */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
          Quick Conversions for {amount || '100'} {fromCode}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {topComparisons.slice(0, 6).map((cCode) => {
            const target = CURRENCIES.find((c) => c.code === cCode);
            if (!target) return null;
            const rate = (1 / fromCurr.rateToUsd) * target.rateToUsd;
            const total = (parseFloat(amount) || 0) * rate;
            return (
              <div
                key={cCode}
                onClick={() => setToCode(cCode)}
                className="p-3 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 rounded-xl cursor-pointer transition-colors"
              >
                <span className="text-[11px] font-semibold text-slate-500 block">
                  {target.code} ({target.symbol})
                </span>
                <p className="text-sm font-bold text-slate-900 tabular-nums font-mono mt-0.5 truncate">
                  {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {target.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
