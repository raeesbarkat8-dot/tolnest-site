import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Award, CheckCircle, Zap, Timer } from 'lucide-react';

const SAMPLE_TEXTS = [
  'The quick brown fox jumps over the lazy dog. Technology empowers people to build innovative solutions for everyday challenges. Clear communication and logical thinking are essential skills for modern software engineering.',
  'Simplicity is the soul of efficiency. By focusing on clean design and intuitive functionality, we can create experiences that help millions of people achieve their goals with confidence and ease.',
  'Great works are performed not by strength, but by perseverance. Continuous practice and steady focus sharpen your cognitive reflexes, allowing you to type faster and communicate effortlessly in our digital world.'
];

export const TypingSpeedTest: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // 15, 30, 60
  const [testText, setTestText] = useState<string>(SAMPLE_TEXTS[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTest = (duration = selectedDuration) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedDuration(duration);
    setTimeLeft(duration);
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
    const randomIdx = Math.floor(Math.random() * SAMPLE_TEXTS.length);
    setTestText(SAMPLE_TEXTS[randomIdx]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const startTest = () => {
    setIsActive(true);
    setIsFinished(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsFinished(true);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isFinished) return;

    if (!isActive && val.length === 1) {
      startTest();
    }

    setUserInput(val);

    // If user typed the whole passage
    if (val.length >= testText.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsFinished(true);
      setIsActive(false);
    }
  };

  // Compute metrics
  let correctChars = 0;
  let incorrectChars = 0;

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === testText[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }

  const timeElapsed = selectedDuration - timeLeft || 1;
  const minutesElapsed = timeElapsed / 60;
  const rawWpm = Math.round((correctChars / 5) / (minutesElapsed || 0.016));
  const cpm = Math.round(correctChars / (minutesElapsed || 0.016));
  const totalTyped = userInput.length;
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  const getRank = (wpm: number) => {
    if (wpm >= 90) return { title: 'Legendary Typist', color: 'text-purple-600', badge: 'bg-purple-50 text-purple-700' };
    if (wpm >= 70) return { title: 'Master Typist', color: 'text-indigo-600', badge: 'bg-indigo-50 text-indigo-700' };
    if (wpm >= 50) return { title: 'Fast & Fluent', color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' };
    if (wpm >= 35) return { title: 'Average Speed', color: 'text-blue-600', badge: 'bg-blue-50 text-blue-700' };
    return { title: 'Building Momentum', color: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' };
  };

  const rank = getRank(rawWpm);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Duration selector & status header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
            Duration:
          </span>
          {[15, 30, 60].map((d) => (
            <button
              key={d}
              type="button"
              disabled={isActive}
              onClick={() => resetTest(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedDuration === d
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {d}s
            </button>
          ))}
        </div>

        {/* Live Timer Counter */}
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Time Left:</span>
          <span className={`text-xl font-bold font-mono tabular-nums ${timeLeft <= 5 && isActive ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Target Text Box */}
      <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-base leading-relaxed tracking-normal font-sans select-none min-h-[140px]">
        {testText.split('').map((char, index) => {
          let charStyle = 'text-slate-400';
          const isCursor = index === userInput.length;

          if (index < userInput.length) {
            if (userInput[index] === char) {
              charStyle = 'text-emerald-600 font-semibold bg-emerald-50';
            } else {
              charStyle = 'text-rose-600 font-semibold bg-rose-100';
            }
          }

          return (
            <span
              key={index}
              className={`transition-colors duration-75 relative ${charStyle} ${
                isCursor ? 'border-b-2 border-indigo-600' : ''
              }`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Input Field */}
      <div className="mt-6">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder={isActive ? 'Keep typing...' : 'Click here or type to start test immediately...'}
          className="w-full bg-white border-2 border-indigo-200 focus:border-indigo-600 rounded-xl px-5 py-3 text-base text-slate-900 focus:outline-none shadow-xs transition-colors"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {/* Real-time Tickers */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Speed</span>
          <p className="text-2xl font-bold text-indigo-600 tabular-nums font-mono mt-0.5">
            {rawWpm} <span className="text-xs font-normal text-slate-500">WPM</span>
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Accuracy</span>
          <p className="text-2xl font-bold text-slate-900 tabular-nums font-mono mt-0.5">
            {accuracy}%
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Keystrokes</span>
          <p className="text-2xl font-bold text-slate-900 tabular-nums font-mono mt-0.5">
            {cpm} <span className="text-xs font-normal text-slate-500">CPM</span>
          </p>
        </div>
      </div>

      {/* Result Modal / Banner when finished */}
      {isFinished && (
        <div className="mt-6 p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Test Completed!
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${rank.badge}`}>
                  {rank.title}
                </span>
              </div>
              <p className="text-2xl font-black text-slate-900 tabular-nums">
                {rawWpm} WPM · {accuracy}% Accuracy
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Raw characters typed: {totalTyped} ({correctChars} correct, {incorrectChars} errors).
              </p>
            </div>

            <button
              type="button"
              onClick={() => resetTest(selectedDuration)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-xs shadow-sm transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Test</span>
            </button>
          </div>
        </div>
      )}

      {/* Reset button bar */}
      {!isFinished && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => resetTest(selectedDuration)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Test</span>
          </button>
          <span className="text-xs text-slate-400">
            Tip: Press Esc or restart anytime
          </span>
        </div>
      )}
    </div>
  );
};
