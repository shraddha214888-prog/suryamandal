import React from 'react';
import { CelestialBody } from '../types/solar';
import { X, CircleDot, Info } from 'lucide-react';

interface SizeComparisonModalProps {
  planets: CelestialBody[];
  onClose: () => void;
  onSelectPlanet: (id: string) => void;
}

export const SizeComparisonModal: React.FC<SizeComparisonModalProps> = ({
  planets,
  onClose,
  onSelectPlanet
}) => {
  // Exclude sun or include sun as an arc
  const planetsOnly = planets.filter((p) => p.id !== 'sun');

  // Max diameter is Jupiter ~139,820 km
  const maxPlanetDia = 139820;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CircleDot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                ગ્રહોના કદની સરખામણી (Planet Size Comparison)
              </h2>
              <p className="text-xs text-slate-400">
                જુઓ કયો ગ્રહ કેટલો મોટો છે! ગુરુની સરખામણીમાં આપણી પૃથ્વી કેટલી નાની લાગે છે!
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* Sun vs Jupiter highlight banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-center gap-3">
            <span className="text-2xl">☀️</span>
            <div>
              <strong className="text-amber-300 block mb-0.5">સૂર્ય સૌથી વિશાળ છે:</strong>
              સૂર્યનો વ્યાસ ૧૩,૯૨,૭૦૦ કિમી છે (પૃથ્વી કરતાં ૧૦૯ ગણો મોટો!). તેની અંદર ૧,૩૦૦ ગુરુ ગ્રહો અને ૧૩ લાખ પૃથ્વીઓ સમાઈ જાય!
            </div>
          </div>

          {/* Visual scale showcase */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              વાસ્તવિક પ્રમાણમાં સાપેક્ષ કદ (Relative Scale)
            </h3>

            {/* Horizontal Planet Scale Lineup */}
            <div className="flex items-end justify-between gap-2 overflow-x-auto pb-4 pt-8 px-2 border-b border-slate-800">
              {planetsOnly.map((planet) => {
                // Scale diameter relative to max (Jupiter = 100px, Earth = ~9px, Mercury = ~3.5px)
                const pxSize = Math.max(10, Math.round((planet.vitalStats.diameterKm / maxPlanetDia) * 110));

                return (
                  <div
                    key={planet.id}
                    onClick={() => {
                      onSelectPlanet(planet.id);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-2 group cursor-pointer shrink-0 min-w-[68px]"
                  >
                    {/* Circle shape */}
                    <div
                      className="rounded-full shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center border border-white/20"
                      style={{
                        width: `${pxSize}px`,
                        height: `${pxSize}px`,
                        backgroundColor: planet.color.accentHex
                      }}
                      title={`${planet.nameGu} (${planet.vitalStats.diameterKm} km)`}
                    />

                    <div className="text-center">
                      <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors block">
                        {planet.nameGu}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {planet.vitalStats.diameterKm.toLocaleString('gu-IN')} કિમી
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {planetsOnly.map((planet) => (
              <div
                key={planet.id}
                onClick={() => {
                  onSelectPlanet(planet.id);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: planet.color.accentHex }}
                  />
                  <span className="font-bold text-white text-sm group-hover:text-purple-300">
                    {planet.nameGu} ({planet.nameEn})
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">વ્યાસ:</span>
                    <span className="font-mono font-bold text-white">
                      {planet.vitalStats.diameterKm.toLocaleString('gu-IN')} કિમી
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">પૃથ્વી સાથે કદ:</span>
                    <span className="text-amber-300 font-medium">
                      {planet.vitalStats.diameterComparisonGu}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
