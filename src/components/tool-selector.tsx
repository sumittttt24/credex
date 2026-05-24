'use client';

import { type AITool } from '@/lib/types';
import { TOOLS, TOOL_DISPLAY_ORDER } from '@/lib/pricing-data';

interface ToolSelectorProps {
  onSelect: (tool: AITool) => void;
  selectedTools: AITool[];
  onClose: () => void;
}

const TOOL_COLORS: Record<AITool, string> = {
  cursor: 'from-blue-500 to-cyan-500',
  'github-copilot': 'from-gray-400 to-gray-600',
  claude: 'from-amber-500 to-orange-500',
  chatgpt: 'from-emerald-500 to-teal-500',
  'anthropic-api': 'from-amber-600 to-yellow-500',
  'openai-api': 'from-green-500 to-emerald-500',
  gemini: 'from-blue-500 to-indigo-500',
  windsurf: 'from-teal-500 to-cyan-500',
};

export function ToolSelector({ onSelect, selectedTools, onClose }: ToolSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl shadow-violet-500/10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Add AI Tool</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {TOOL_DISPLAY_ORDER.map((toolId) => {
            const tool = TOOLS[toolId];
            const isSelected = selectedTools.includes(toolId);

            return (
              <button
                key={toolId}
                onClick={() => {
                  if (!isSelected) {
                    onSelect(toolId);
                    onClose();
                  }
                }}
                disabled={isSelected}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 hover:scale-[1.02] cursor-pointer'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${TOOL_COLORS[toolId]} flex items-center justify-center text-white text-xs font-bold mb-2`}
                >
                  {tool.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-white truncate">{tool.name}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{tool.vendor}</p>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <span className="text-violet-400 text-[10px]">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
