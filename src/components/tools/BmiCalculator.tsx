import React, { useState, useMemo } from 'react';
import { RotateCcw, Activity, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric fields
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');

  // Imperial fields
  const [heightFeet, setHeightFeet] = useState<string>('5');
  const [heightInches, setHeightInches] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('155');

  const { bmi, category, healthyWeightRange, bmiPrime } = useMemo(() => {
    let hMeters = 0;
    let wKg = 0;

    if (unitSystem === 'metric') {
      const cm = parseFloat(heightCm);
      const kg = parseFloat(weightKg);
      if (isNaN(cm) || isNaN(kg) || cm <= 0 || kg <= 0) {
        return { bmi: null, category: null, healthyWeightRange: null, bmiPrime: null };
      }
      hMeters = cm / 100;
      wKg = kg;
    } else {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      const lbs = parseFloat(weightLbs);
      const totalInches = ft * 12 + inch;
      if (totalInches <= 0 || isNaN(lbs) || lbs <= 0) {
        return { bmi: null, category: null, healthyWeightRange: null, bmiPrime: null };
      }
      hMeters = totalInches * 0.0254;
      wKg = lbs * 0.453592;
    }

    const calculatedBmi = wKg / (hMeters * hMeters);
    const prime = calculatedBmi / 25;

    // Healthy weight range (18.5 - 24.9 BMI)
    const minHealthyKg = 18.5 * (hMeters * hMeters);
    const maxHealthyKg = 24.9 * (hMeters * hMeters);

    let rangeStr = '';
    if (unitSystem === 'metric') {
      rangeStr = `${minHealthyKg.toFixed(1)} kg – ${maxHealthyKg.toFixed(1)} kg`;
    } else {
      const minLbs = minHealthyKg * 2.20462;
      const maxLbs = maxHealthyKg * 2.20462;
      rangeStr = `${minLbs.toFixed(1)} lbs – ${maxLbs.toFixed(1)} lbs`;
    }

    let cat = { name: 'Normal weight', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (calculatedBmi < 18.5) {
      cat = { name: 'Underweight', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      cat = { name: 'Overweight', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' };
    } else if (calculatedBmi >= 30) {
      cat = { name: 'Obese', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' };
    }

    return {
      bmi: calculatedBmi,
      category: cat,
      healthyWeightRange: rangeStr,
      bmiPrime: prime
    };
  }, [unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs]);

  const handleReset = () => {
    if (unitSystem === 'metric') {
      setHeightCm('175');
      setWeightKg('70');
    } else {
      setHeightFeet('5');
      setHeightInches('9');
      setWeightLbs('155');
    }
  };

  // Gauge pointer position (from 15 to 35 BMI scale)
  const getGaugePercentage = () => {
    if (!bmi) return 50;
    const clamped = Math.min(35, Math.max(15, bmi));
    return ((clamped - 15) / 20) * 100;
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Unit System Switch */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6 max-w-xs">
        <button
          type="button"
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            unitSystem === 'metric' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Metric (cm / kg)
        </button>
        <button
          type="button"
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            unitSystem === 'imperial' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Imperial (ft, in / lbs)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metric Form */}
        {unitSystem === 'metric' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="heightCmInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Height (cm)
              </label>
              <div className="relative">
                <input
                  id="heightCmInput"
                  type="number"
                  step="any"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                />
                <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-semibold">cm</span>
              </div>
            </div>

            <div>
              <label htmlFor="weightKgInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  id="weightKgInput"
                  type="number"
                  step="any"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                />
                <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-semibold">kg</span>
              </div>
            </div>
          </div>
        ) : (
          /* Imperial Form */
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Height
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    aria-label="Height in feet"
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="Feet"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">ft</span>
                </div>
                <div className="relative">
                  <input
                    aria-label="Height in inches"
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="Inches"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">in</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="weightLbsInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Weight (lbs)
              </label>
              <div className="relative">
                <input
                  id="weightLbsInput"
                  type="number"
                  step="any"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  placeholder="e.g. 155"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                />
                <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-semibold">lbs</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between">
          {bmi !== null && category ? (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Body Mass Index (BMI)
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold text-slate-900 tabular-nums font-mono">
                  {bmi.toFixed(1)}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${category.bg} ${category.color} ${category.border}`}>
                  {category.name}
                </span>
              </div>

              {/* Visual Category Scale Gauge */}
              <div className="mt-5">
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 relative">
                  <div className="w-[17.5%] bg-amber-400 h-full" title="Underweight (< 18.5)" />
                  <div className="w-[32%] bg-emerald-500 h-full" title="Normal (18.5 - 24.9)" />
                  <div className="w-[25%] bg-orange-400 h-full" title="Overweight (25 - 29.9)" />
                  <div className="w-[25.5%] bg-rose-500 h-full" title="Obese (≥ 30)" />
                </div>
                {/* Needle Indicator */}
                <div className="relative w-full h-3">
                  <div
                    style={{ left: `${getGaugePercentage()}%` }}
                    className="absolute -top-1.5 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-slate-800 transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35+</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Healthy Weight Range:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{healthyWeightRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">BMI Prime:</span>
                  <span className="font-medium text-slate-800 tabular-nums">{bmiPrime?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Enter height and weight to view your BMI score.
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Values</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
