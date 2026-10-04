import React from 'react';

interface AdBannerProps {
  slot?: 'header' | 'in-content' | 'footer' | 'sidebar';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot = 'in-content', className = '' }) => {
  if (slot === 'sidebar') {
    return (
      <aside
        aria-label="Sponsored Advertisement"
        className={`w-full bg-slate-100/70 border border-dashed border-slate-300 rounded-xl p-4 text-center my-6 flex flex-col items-center justify-center min-h-[250px] ${className}`}
      >
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-2">
          Advertisement
        </span>
        <div className="w-full h-full flex flex-col items-center justify-center py-6 text-slate-400">
          <div className="w-12 h-12 rounded-lg bg-slate-200/80 flex items-center justify-center mb-2">
            <span className="text-xs font-mono font-semibold text-slate-500">AD</span>
          </div>
          <span className="text-xs text-slate-500">Responsive Ad Unit</span>
          <span className="text-[11px] text-slate-400 mt-1">Google AdSense Space</span>
        </div>
      </aside>
    );
  }

  return (
    <div
      aria-label="Sponsored Advertisement"
      className={`w-full bg-slate-100/70 border border-dashed border-slate-300 rounded-xl px-4 py-3 text-center my-6 flex flex-col items-center justify-center ${
        slot === 'header' ? 'min-h-[90px]' : 'min-h-[100px]'
      } ${className}`}
    >
      <div className="flex items-center justify-between w-full max-w-3xl mb-1 px-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Advertisement
        </span>
        <span className="text-[10px] text-slate-400">Sponsored Content</span>
      </div>
      <div className="w-full max-w-3xl h-16 rounded-lg bg-slate-200/60 flex items-center justify-center gap-3">
        <span className="text-xs font-mono font-medium text-slate-500">728×90 / Responsive Leaderboard</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">·</span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">AdSense Auto-Ad Ready</span>
      </div>
    </div>
  );
};
