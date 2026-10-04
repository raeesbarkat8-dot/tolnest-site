import React from 'react';
import { ToolInfo, PageRoute } from '../../types';
import { ToolIcon } from './ToolIcon';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: ToolInfo;
  onNavigate: (route: PageRoute) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onNavigate }) => {
  const handleClick = () => {
    onNavigate(`tool-${tool.id}` as PageRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white border border-slate-200/90 hover:border-indigo-500/60 rounded-2xl p-6 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Icon & Unboxed Category Metadata */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:bg-indigo-50 group-hover:border-indigo-200 text-indigo-600 flex items-center justify-center transition-colors">
            <ToolIcon name={tool.iconName} className="w-5 h-5 text-indigo-600" />
          </div>

          {/* Clean unboxed metadata with typographic dot separator */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>{tool.categoryName}</span>
            {tool.popular && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-indigo-600 font-medium">Popular</span>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
          {tool.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {tool.shortDescription}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1">
          Use Tool
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <span className="text-[11px] text-slate-400">100% Free</span>
      </div>
    </div>
  );
};
