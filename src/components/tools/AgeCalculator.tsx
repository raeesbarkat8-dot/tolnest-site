import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw, Sparkles, Clock, Compass, Heart } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState<string>('2000-01-15');
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [error, setError] = useState<string | null>(null);

  interface AgeResult {
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    daysUntilNextBirthday: number;
    nextBirthdayWeekday: string;
    zodiac: { name: string; symbol: string; element: string };
  }

  const [result, setResult] = useState<AgeResult | null>(null);

  const getZodiac = (day: number, month: number) => {
    // month is 1-12
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'Aries', symbol: '♈', element: 'Fire' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'Taurus', symbol: '♉', element: 'Earth' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'Gemini', symbol: '♊', element: 'Air' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'Cancer', symbol: '♋', element: 'Water' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'Leo', symbol: '♌', element: 'Fire' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'Virgo', symbol: '♍', element: 'Earth' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'Libra', symbol: '♎', element: 'Air' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'Scorpio', symbol: '♏', element: 'Water' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'Sagittarius', symbol: '♐', element: 'Fire' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'Capricorn', symbol: '♑', element: 'Earth' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'Aquarius', symbol: '♒', element: 'Air' };
    return { name: 'Pisces', symbol: '♓', element: 'Water' };
  };

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select a valid birth date.');
      setResult(null);
      return;
    }

    const birth = new Date(birthDate + 'T00:00:00');
    const target = new Date(targetDate + 'T00:00:00');

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      setError('Invalid date entered. Please verify calendar dates.');
      setResult(null);
      return;
    }

    if (birth > target) {
      setError('Birth date cannot be after the target date.');
      setResult(null);
      return;
    }

    setError(null);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Totals
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next Birthday
    const thisYearBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    let nextBday = thisYearBday;
    if (thisYearBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNext = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBdayWeekday = weekdayNames[nextBday.getDay()];

    const zodiac = getZodiac(birth.getDate(), birth.getMonth() + 1);

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      daysUntilNextBirthday: daysUntilNext,
      nextBirthdayWeekday: nextBdayWeekday,
      zodiac
    });
  };

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const handleReset = () => {
    setBirthDate('2000-01-15');
    setTargetDate(todayStr);
    setError(null);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date of Birth input */}
        <div>
          <label htmlFor="birthdate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Target Date input */}
        <div>
          <label htmlFor="targetdate" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Age as of Date (Defaults to Today)
          </label>
          <div className="relative">
            <input
              id="targetdate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setBirthDate('1995-06-20');
            setTargetDate(todayStr);
          }}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Try Sample (June 20, 1995)
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="mt-8 space-y-6">
          {/* Primary Result Banner */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 border border-indigo-100/80 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 block mb-2">
              Exact Chronological Age
            </span>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {result.years} <span className="text-lg font-medium text-slate-500">years</span>
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {result.months} <span className="text-lg font-medium text-slate-500">months</span>
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                {result.days} <span className="text-lg font-medium text-slate-500">days</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Calculated with precision adjusting for variable month lengths and leap years.
            </p>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-medium text-slate-500 uppercase">Total Days</span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums mt-1">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-medium text-slate-500 uppercase">Total Weeks</span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums mt-1">
                {result.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-medium text-slate-500 uppercase">Total Hours</span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums mt-1">
                {result.totalHours.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
              <span className="text-[11px] font-medium text-slate-500 uppercase">Total Minutes</span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums mt-1">
                {result.totalMinutes.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Birthday and Zodiac Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Next Birthday</span>
                <p className="text-sm font-bold text-indigo-600 mt-0.5 tabular-nums">
                  {result.daysUntilNextBirthday === 0 ? 'Today! Happy Birthday! 🎉' : `${result.daysUntilNextBirthday} days remaining`}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Falls on a {result.nextBirthdayWeekday}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xl font-bold">
                {result.zodiac.symbol}
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Zodiac Sign</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {result.zodiac.name} <span className="text-xs font-normal text-slate-500">({result.zodiac.element} sign)</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Astronomical solar sign based on birth date
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
