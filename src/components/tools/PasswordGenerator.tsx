import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Shield, ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = () => {
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      upper = upper.replace(/[IO]/g, '');
      lower = lower.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      symbols = symbols.replace(/[{}\[\]()\/\\'"`~,;:.<>]/g, '');
    }

    let charPool = '';
    if (includeUpper) charPool += upper;
    if (includeLower) charPool += lower;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (!charPool) {
      setPassword('');
      return;
    }

    // Cryptographically secure generation
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[array[i] % charPool.length];
    }

    setPassword(result);
    setHistory((prev) => [result, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  // Compute password entropy and strength
  const getStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: 'Empty', color: 'text-slate-400', barColor: 'bg-slate-300', crackTime: '0 seconds' };

    let poolSize = 0;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) poolSize += 32;

    const entropy = Math.round(pwd.length * Math.log2(poolSize || 1));

    if (entropy < 35) return { score: 1, text: 'Very Weak', color: 'text-rose-600', barColor: 'bg-rose-500', crackTime: 'A few seconds' };
    if (entropy < 50) return { score: 2, text: 'Weak', color: 'text-amber-600', barColor: 'bg-amber-500', crackTime: 'Few hours to days' };
    if (entropy < 68) return { score: 3, text: 'Moderate', color: 'text-blue-600', barColor: 'bg-blue-500', crackTime: 'A few months' };
    if (entropy < 85) return { score: 4, text: 'Strong', color: 'text-emerald-600', barColor: 'bg-emerald-500', crackTime: 'Centuries' };
    return { score: 5, text: 'Very Strong', color: 'text-purple-600', barColor: 'bg-purple-600', crackTime: 'Billions of years' };
  };

  const strength = getStrength(password);

  const handleCopy = (textToCopy = password) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Generated Password Display */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 tracking-wider break-all select-all flex-1 py-1">
            {password || <span className="text-slate-400 font-normal">Select at least one character type</span>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={generatePassword}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-xs"
              title="Generate New Password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCopy()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Password Strength:</span>
            <span className={`font-bold ${strength.color}`}>{strength.text}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex gap-1 p-0.5">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`h-full flex-1 rounded-full transition-all duration-300 ${
                  lvl <= strength.score ? strength.barColor : 'bg-transparent'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
            <span>Estimated brute force time:</span>
            <span className="font-medium text-slate-600">{strength.crackTime}</span>
          </div>
        </div>
      </div>

      {/* Options Panel */}
      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="pwdLengthSlider" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Password Length
            </label>
            <span className="text-xs font-bold text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded">
              {length} characters
            </span>
          </div>
          <input
            id="pwdLengthSlider"
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>6 (Min)</span>
            <span>16 (Recommended)</span>
            <span>64 (Max)</span>
          </div>
        </div>

        {/* Character Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-800">Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-800">Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-800">Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-800">Special Symbols (!@#$%)</span>
          </label>

          <label className="sm:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <div>
              <span className="text-xs font-medium text-slate-800 block">Exclude Ambiguous Characters</span>
              <span className="text-[11px] text-slate-500">Omits lookalike letters and symbols (0, O, 1, l, I, curly braces)</span>
            </div>
          </label>
        </div>
      </div>

      {/* Session History */}
      {history.length > 1 && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Recently Generated (Session Only)
          </span>
          <div className="space-y-1.5">
            {history.slice(1).map((histPwd, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 px-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors font-mono"
              >
                <span className="truncate max-w-xs text-slate-700">{histPwd}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(histPwd)}
                  className="text-indigo-600 hover:text-indigo-800 font-sans text-[11px] font-medium"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
