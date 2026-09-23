import React from 'react';
import { RotateCcw, Volume2, Sparkles, Scale, Ruler, CircleDot, Award, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenWeightCalc: () => void;
  onOpenDistanceScale: () => void;
  onOpenSizeComparison: () => void;
  onOpenMoonPhases: () => void;
  onResetCamera: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenWeightCalc,
  onOpenDistanceScale,
  onOpenSizeComparison,
  onOpenMoonPhases,
  onResetCamera
}) => {
  return (
    <header className="h-16 px-4 sm:px-6 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0 relative z-20">
      {/* Zone 1: Single text element wordmark in display face */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="text-lg sm:text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 whitespace-nowrap"
        >
          સૂર્યમંડળ 3D
        </a>
      </div>

      {/* Zone 2: clean text navigation links */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-semibold text-slate-300">
        <button
          onClick={onOpenMoonPhases}
          className="hover:text-sky-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Moon className="w-4 h-4 text-sky-400" />
          <span>ચંદ્રની કળાઓ</span>
        </button>

        <button
          onClick={onOpenWeightCalc}
          className="hover:text-emerald-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>વજન કેલ્ક્યુલેટર</span>
        </button>

        <button
          onClick={onOpenDistanceScale}
          className="hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Ruler className="w-4 h-4 text-amber-400" />
          <span>સૂર્યથી અંતર</span>
        </button>

        <button
          onClick={onOpenSizeComparison}
          className="hover:text-purple-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <CircleDot className="w-4 h-4 text-purple-400" />
          <span>કદ સરખામણી</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="hover:text-yellow-400 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Award className="w-4 h-4 text-yellow-400" />
          <span>બાળ ક્વિઝ</span>
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger or direct actions */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onOpenMoonPhases}
            className="p-2 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold"
            title="ચંદ્રની કળાઓ"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenQuiz}
            className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
            title="ક્વિઝ"
          >
            <Award className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenWeightCalc}
            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold"
            title="વજન"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onResetCamera}
          className="px-3.5 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors whitespace-nowrap flex items-center gap-1.5"
          title="સૂર્યમંડળનું સમગ્ર દ્રશ્ય જુઓ"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>મૂળ દ્રશ્ય</span>
        </button>
      </div>
    </header>
  );
};
