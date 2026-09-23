import React from 'react';
import { X } from 'lucide-react';
import { MoonPhasesVisualizer } from './MoonPhasesVisualizer';

interface MoonPhasesModalProps {
  onClose: () => void;
}

export const MoonPhasesModal: React.FC<MoonPhasesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-sky-500/30 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌕</span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                ચંદ્રની કળાઓ વિઝ્યુઅલાઈઝર (Earth's Moon Phases)
              </h2>
              <p className="text-xs text-slate-400">
                2D ડાયનેમિક ચંદ્ર, કક્ષા અને વાસ્તવિક ફોટા સાથે પૂનમથી અમાસનું વિજ્ઞાન
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <MoonPhasesVisualizer />
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-center text-slate-400">
          વિદ્યાર્થીઓ સ્લાઈડર ફેરવીને કે એનિમેશન બટન દબાવીને ચંદ્રની કળાઓ જાતે શીખી શકે છે!
        </div>
      </div>
    </div>
  );
};
