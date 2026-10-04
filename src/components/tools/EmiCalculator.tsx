import React, { useState, useMemo } from 'react';
import { RotateCcw, DollarSign, PieChart, Table, ArrowUpDown } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // Preset triggers
  const setPreset = (p: number, r: number, y: number) => {
    setPrincipal(p);
    setInterestRate(r);
    setTenureYears(y);
    setTenureType('years');
  };

  const { monthlyEmi, totalInterest, totalPayment, schedule } = useMemo(() => {
    const totalMonths = tenureType === 'years' ? tenureYears * 12 : tenureYears;
    const monthlyRate = interestRate / 12 / 100;

    if (principal <= 0 || interestRate <= 0 || totalMonths <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
    }

    // EMI formula: [P * R * (1+R)^N] / [(1+R)^N - 1]
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const payment = emi * totalMonths;
    const interest = payment - principal;

    // Amortization Schedule (Yearly aggregation)
    const yearlySchedule: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      totalPaid: number;
      endingBalance: number;
    }[] = [];

    let balance = principal;
    const yearsCount = Math.ceil(totalMonths / 12);

    for (let y = 1; y <= yearsCount; y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = Math.min(emi - interestForMonth, balance);
        yearInterest += interestForMonth;
        yearPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      yearlySchedule.push({
        year: y,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        totalPaid: yearPrincipal + yearInterest,
        endingBalance: Math.max(0, balance)
      });
    }

    return {
      monthlyEmi: emi,
      totalInterest: interest,
      totalPayment: payment,
      schedule: yearlySchedule
    };
  }, [principal, interestRate, tenureYears, tenureType]);

  const principalRatio = totalPayment > 0 ? (principal / totalPayment) * 100 : 0;
  const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Quick Presets */}
      <div className="flex items-center flex-wrap gap-2 mb-6">
        <span className="text-xs font-semibold uppercase text-slate-500 mr-2">Presets:</span>
        <button
          type="button"
          onClick={() => setPreset(350000, 6.75, 30)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Home Loan ($350k / 30Y)
        </button>
        <button
          type="button"
          onClick={() => setPreset(35000, 5.5, 5)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Auto Loan ($35k / 5Y)
        </button>
        <button
          type="button"
          onClick={() => setPreset(15000, 9.5, 3)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Personal Loan ($15k / 3Y)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="principalInput" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Loan Amount
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1">
                <span className="text-xs text-slate-500 mr-1">$</span>
                <input
                  id="principalInput"
                  type="number"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-28 text-right text-xs font-bold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                />
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="1500000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>$5,000</span>
              <span>$750,000</span>
              <span>$1,500,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="interestRateInput" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Annual Interest Rate
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1">
                <input
                  id="interestRateInput"
                  type="number"
                  min="0.1"
                  max="30"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-16 text-right text-xs font-bold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                />
                <span className="text-xs text-slate-500 ml-1">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1%</span>
              <span>12%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label htmlFor="tenureInput" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Loan Tenure
                </label>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-md text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureType === 'months') {
                        setTenureYears(Math.max(1, Math.round(tenureYears / 12)));
                        setTenureType('years');
                      }
                    }}
                    className={`px-2 py-0.5 rounded ${tenureType === 'years' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-500'}`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureType === 'years') {
                        setTenureYears(tenureYears * 12);
                        setTenureType('months');
                      }
                    }}
                    className={`px-2 py-0.5 rounded ${tenureType === 'months' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-500'}`}
                  >
                    Months
                  </button>
                </div>
              </div>
              <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1">
                <input
                  id="tenureInput"
                  type="number"
                  min="1"
                  max={tenureType === 'years' ? 50 : 600}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-right text-xs font-bold text-slate-900 bg-transparent focus:outline-none tabular-nums"
                />
                <span className="text-xs text-slate-500 ml-1">
                  {tenureType === 'years' ? 'Yr' : 'Mo'}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={tenureType === 'years' ? 40 : 360}
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={() => setPreset(250000, 6.5, 20)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard</span>
          </button>
        </div>

        {/* Results & Visual Breakdown Column */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Monthly Payment (EMI)
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tabular-nums mt-1">
              ${monthlyEmi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-normal text-slate-500 ml-1">/ month</span>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Principal Loan Amount:</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Total Interest Payable:</span>
                <span className="font-semibold text-amber-600 tabular-nums">
                  ${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 font-medium">
                <span className="text-slate-800">Total Payment (Principal + Interest):</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                  Principal ({principalRatio.toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Interest ({interestRatio.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200">
                <div style={{ width: `${principalRatio}%` }} className="bg-indigo-600 h-full transition-all duration-300" />
                <div style={{ width: `${interestRatio}%` }} className="bg-amber-500 h-full transition-all duration-300" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Table className="w-4 h-4 text-indigo-600" />
              <span>{showSchedule ? 'Hide Amortization Schedule' : 'View Yearly Amortization Schedule'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200 overflow-x-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Year-by-Year Loan Amortization Schedule
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3 font-semibold">Year</th>
                <th className="py-2.5 px-3 font-semibold text-right">Principal Paid</th>
                <th className="py-2.5 px-3 font-semibold text-right">Interest Paid</th>
                <th className="py-2.5 px-3 font-semibold text-right">Total Annual Paid</th>
                <th className="py-2.5 px-3 font-semibold text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {schedule.map((item) => (
                <tr key={item.year} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-sans font-medium text-slate-900">Year {item.year}</td>
                  <td className="py-2 px-3 text-right text-indigo-700">${item.principalPaid.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right text-amber-600">${item.interestPaid.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right text-slate-800">${item.totalPaid.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right font-medium text-slate-900">${item.endingBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
