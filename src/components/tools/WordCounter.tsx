import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, FileText, Clock, Volume2, Sparkles } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(
    'ToolNest provides fast, simple, and free online utilities designed for everyday productivity. Whether you are analyzing essays, calculating mortgage installments, generating secure passwords, or converting measurement units, everything processes locally in your browser.'
  );
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        avgWordLength: 0,
        topKeywords: [] as { word: string; count: number; percent: number }[]
      };
    }

    const wordsArray = trimmed.match(/\b[\w'-]+\b/g) || [];
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;

    // Sentences
    const sentences = (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);

    // Paragraphs
    const paragraphs = trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: 200 words per minute
    const readingTimeMinutes = Math.ceil(words / 200);

    // Speaking time: 130 words per minute
    const speakingTimeMinutes = Math.ceil(words / 130);

    const avgWordLength = words > 0 ? charsNoSpaces / words : 0;

    // Keyword density (exclude common short stop words)
    const stopWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you',
      'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
      'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'is', 'are'
    ]);

    const freqMap: Record<string, number> = {};
    wordsArray.forEach((w) => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        freqMap[lower] = (freqMap[lower] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? (count / words) * 100 : 0
      }));

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      avgWordLength,
      topKeywords
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCaseChange = (mode: 'upper' | 'lower' | 'title' | 'sentence') => {
    if (!text) return;
    if (mode === 'upper') {
      setText(text.toUpperCase());
    } else if (mode === 'lower') {
      setText(text.toLowerCase());
    } else if (mode === 'title') {
      setText(
        text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        )
      );
    } else if (mode === 'sentence') {
      const lower = text.toLowerCase();
      setText(
        lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
      );
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">Words</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900 tabular-nums mt-0.5">
            {stats.words.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Characters</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-0.5">
            {stats.charsWithSpaces.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sentences</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-0.5">
            {stats.sentences.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Paragraphs</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-0.5">
            {stats.paragraphs.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Editor Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="wordCounterTextarea" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Content Editor
          </label>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Chars (no spaces): <strong className="tabular-nums text-slate-800">{stats.charsNoSpaces}</strong></span>
          </div>
        </div>

        <textarea
          id="wordCounterTextarea"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or start typing your text here..."
          className="w-full bg-slate-50/70 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y leading-relaxed"
        />

        {/* Text Actions Toolbar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Transform:</span>
            <button
              type="button"
              onClick={() => handleCaseChange('upper')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={() => handleCaseChange('lower')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              lowercase
            </button>
            <button
              type="button"
              onClick={() => handleCaseChange('title')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Title Case
            </button>
            <button
              type="button"
              onClick={() => handleCaseChange('sentence')}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Sentence case
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              type="button"
              onClick={() => setText('')}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Metrics & Keyword Density */}
      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading & Speaking Times */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Pacing & Speech Estimates
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Reading Time</span>
                <span className="text-sm font-bold text-slate-800 tabular-nums">
                  ~{stats.readingTimeMinutes} min{stats.readingTimeMinutes !== 1 ? 's' : ''}
                </span>
                <span className="text-[10px] text-slate-400 block">(200 wpm)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Speaking Time</span>
                <span className="text-sm font-bold text-slate-800 tabular-nums">
                  ~{stats.speakingTimeMinutes} min{stats.speakingTimeMinutes !== 1 ? 's' : ''}
                </span>
                <span className="text-[10px] text-slate-400 block">(130 wpm)</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Average word length: <strong className="text-slate-700 tabular-nums">{stats.avgWordLength.toFixed(1)} characters</strong>
          </p>
        </div>

        {/* Keyword Density */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Top Keyword Frequency
          </h3>
          {stats.topKeywords.length > 0 ? (
            <div className="space-y-1.5">
              {stats.topKeywords.map((kw) => (
                <div key={kw.word} className="flex items-center justify-between text-xs py-1 px-2.5 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700 capitalize">{kw.word}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 tabular-nums">{kw.count}×</span>
                    <span className="text-[10px] text-indigo-600 font-semibold tabular-nums">
                      {kw.percent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-2">
              Type more words to calculate top keywords...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
