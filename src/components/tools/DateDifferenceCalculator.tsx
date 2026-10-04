import React, { useState, useMemo } from 'react';
import { CalendarRange, RotateCcw, Clock, Briefcase, Calendar } from 'lucide-react';

export const DateDifferenceCalculator: React.FC = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Default +30 days from today
  const future = new Date(today);
  future.setDate(future.getDate() + 30);
  const futureStr = future.toISOString().split('T')[0];

  const [startDateStr, setStartDateStr] = useState<string>(todayStr);
  const [endDateStr, setEndDateStr] = useState<string>(futureStr);
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!startDateStr || !endDateStr) return null;

    const start = new Date(startDateStr + 'T00:00:00');
    const end = new Date(endDateStr + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const isReversed = start > end;
    const d1 = isReversed ? end : start;
    const d2 = isReversed ? start : end;

    // Total days calculation
    const msDiff = d2.getTime() - d1.getTime();
    let totalDays = Math.round(msDiff / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Breakdown: Years, Months, Days
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (includeEndDay) {
      days += 1;
    }

    // Business days (Mon-Fri) & Weekend days
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(d1);
    const limit = new Date(d2);
    if (!includeEndDay) {
      // iterate up to strictly before limit
      while (cur < limit) {
        const dayOfWeek = cur.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendDays++;
        } else {
          businessDays++;
        }
        cur.setDate(cur.getDate() + 1);
      }
    } else {
      while (cur <= limit) {
        const dayOfWeek = cur.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendDays++;
        } else {
          businessDays++;
        }
        cur.setDate(cur.getDate() + 1);
      }
    }

    const weeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;

    return {
      isReversed,
      totalDays,
      years,
      months,
      days,
      weeks,
      remainderDays,
      businessDays,
      weekendDays
    };
  }, [startDateStr, endDateStr, includeEndDay]);

  const setPreset = (daysToAdd: number) => {
    const s = new Date(startDateStr + 'T00:00:00');
    if (isNaN(s.getTime())) return;
    s.setDate(s.getDate() + daysToAdd);
    setEndDateStr(s.toISOString().split('T')[0]);
  };

  const handleReset = () => {
    setStartDateStr(todayStr);
    setEndDateStr(futureStr);
    setIncludeEndDay(false);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Quick Presets */}
      <div className="flex items-center flex-wrap gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
          Add:
        </span>
        <button
          type="button"
          onClick={() => setPreset(7)}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          +7 Days
        </button>
        <button
          type="button"
          onClick={() => setPreset(30)}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          +30 Days
        </button>
        <button
          type="button"
          onClick={() => setPreset(90)}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          +90 Days
        </button>
        <button
          type="button"
          onClick={() => setPreset(365)}
          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          +1 Year
        </button>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDateInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Start Date
          </label>
          <input
            id="startDateInput"
            type="date"
            value={startDateStr}
            onChange={(e) => setStartDateStr(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="endDateInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            End Date
          </label>
          <input
            id="endDateInput"
            type="date"
            value={endDateStr}
            onChange={(e) => setEndDateStr(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
          <input
            type="checkbox"
            checked={includeEndDay}
            onChange={(e) => setIncludeEndDay(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
          <span>Include end day in calculation (+1 day)</span>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Today</span>
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Main Duration Hero */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 border border-indigo-100 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 block mb-2">
              Total Duration Difference
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums font-mono">
                {result.totalDays.toLocaleString()}
              </span>
              <span className="text-lg font-medium text-slate-600">
                total days
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-base font-semibold text-indigo-600 tabular-nums">
                ({result.weeks} weeks {result.remainderDays > 0 ? `+ ${result.remainderDays} days` : ''})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Equivalent to: {result.years > 0 ? `${result.years} year(s), ` : ''}{result.months} month(s), {result.days} day(s)
            </p>
          </div>

          {/* Business vs Weekend Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Working Business Days</span>
                <p className="text-xl font-bold text-slate-900 tabular-nums font-mono mt-0.5">
                  {result.businessDays.toLocaleString()} <span className="text-xs font-normal text-slate-500">days</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mon – Fri only (excludes weekends)
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Weekend Days</span>
                <p className="text-xl font-bold text-slate-900 tabular-nums font-mono mt-0.5">
                  {result.weekendDays.toLocaleString()} <span className="text-xs font-normal text-slate-500">days</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Saturdays and Sundays during period
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
