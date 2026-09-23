import React, { useState } from 'react';
import { CelestialBody } from '../types/solar';
import { X, Scale, Sparkles, ArrowRight } from 'lucide-react';

interface WeightCalculatorModalProps {
  planets: CelestialBody[];
  onClose: () => void;
  onSelectPlanet: (id: string) => void;
}

export const WeightCalculatorModal: React.FC<WeightCalculatorModalProps> = ({
  planets,
  onClose,
  onSelectPlanet
}) => {
  const [earthWeight, setEarthWeight] = useState<number>(30);

  // Common quick presets for primary school kids
  const presets = [20, 25, 30, 35, 40, 50];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                બાળ વજન કેલ્ક્યુલેટર (Kid Weight on Planets)
              </h2>
              <p className="text-xs text-slate-400">
                પૃથ્વી પરનું વજન લખીને જુઓ કે બીજા ગ્રહો પર તમારું વજન કેટલું થાય!
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

        {/* Input Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/40 border-b border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="kid-weight-input" className="text-sm font-semibold text-slate-200 whitespace-nowrap">
                પૃથ્વી પર તમારું વજન:
              </label>
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-emerald-500">
                <input
                  id="kid-weight-input"
                  type="number"
                  min="10"
                  max="120"
                  value={earthWeight}
                  onChange={(e) => setEarthWeight(Math.max(5, Number(e.target.value) || 0))}
                  className="w-16 bg-transparent text-white font-mono font-bold text-base outline-none text-center"
                />
                <span className="text-xs text-slate-400">કિલો</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-500 shrink-0">પસંદ કરો:</span>
              {presets.map((w) => (
                <button
                  key={w}
                  onClick={() => setEarthWeight(w)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors shrink-0 ${
                    earthWeight === w
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {w} કિલો
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="10"
            max="80"
            value={earthWeight}
            onChange={(e) => setEarthWeight(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Comparison List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <p className="text-xs text-slate-400">
            * નોંધ: વજન ગ્રહના ગુરુત્વાકર્ષણ (Gravity) પર આધાર રાખે છે. ગ્રહ જેટલો વિશાળ અને ભારે, તેનું ખેંચાણ એટલું જ વધારે!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {planets.map((planet) => {
              const calcWeight = (earthWeight * planet.weightAndMass.gravityRatio).toFixed(1);
              const isHeavy = planet.weightAndMass.gravityRatio > 1.2;
              const isLight = planet.weightAndMass.gravityRatio < 0.8;

              return (
                <div
                  key={planet.id}
                  onClick={() => {
                    onSelectPlanet(planet.id);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full border border-white/20 shadow-sm shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: planet.color.accentHex }}
                    >
                      {planet.nameGu.charAt(0)}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                          {planet.nameGu}
                        </span>
                        <span className="text-xs text-slate-400">({planet.nameEn})</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        ગુરુત્વ: {planet.weightAndMass.gravity} m/s²
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-extrabold text-white font-mono flex items-baseline justify-end gap-1">
                      <span
                        className={
                          isHeavy
                            ? 'text-amber-400'
                            : isLight
                            ? 'text-sky-300'
                            : 'text-emerald-400'
                        }
                      >
                        {calcWeight}
                      </span>
                      <span className="text-xs text-slate-400 font-sans">કિલો</span>
                    </div>

                    <span className="text-[10px] text-slate-400 block">
                      {planet.id === 'earth'
                        ? 'આધાર વજન'
                        : isHeavy
                        ? 'પૃથ્વી કરતાં ભારે'
                        : 'પૃથ્વી કરતાં હળવું'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info note */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-center text-slate-400">
          કોઈપણ ગ્રહ પર ક્લિક કરો અને તેને 3D કેમેરામાં નજીકથી જુઓ!
        </div>
      </div>
    </div>
  );
};
