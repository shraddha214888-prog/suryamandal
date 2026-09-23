import React from 'react';
import { CelestialBody } from '../types/solar';
import { X, Ruler, Car, Zap, Clock } from 'lucide-react';

interface DistanceScaleModalProps {
  planets: CelestialBody[];
  onClose: () => void;
  onSelectPlanet: (id: string) => void;
}

export const DistanceScaleModal: React.FC<DistanceScaleModalProps> = ({
  planets,
  onClose,
  onSelectPlanet
}) => {
  // Max distance is Pluto ~590 crore km
  const maxDistance = 590600000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                સૂર્યથી અંતર સ્કેલ (Distance from Sun)
              </h2>
              <p className="text-xs text-slate-400">
                સૂર્યથી કયો ગ્રહ કેટલો દૂર છે? પ્રકાશ અને કારને પહોંચતા કેટલો સમય લાગે?
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

        {/* Distance List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
            <span className="text-base">💡</span>
            <span>
              <strong>વિજ્ઞાન નોંધ:</strong> સૂર્યના પ્રકાશની ગતિ ૧ સેકન્ડમાં ૩ લાખ કિલોમીટર છે!
              તોય સૂર્યથી પૃથ્વી સુધી પ્રકાશ પહોંચતા ૮ મિનિટ ૨૦ સેકન્ડ અને છેલ્લે નેપ્ચ્યુન સુધી પહોંચતા ૪ કલાક કરતાં વધુ સમય લાગે છે!
            </span>
          </div>

          <div className="space-y-3">
            {planets.map((planet) => {
              const distanceKm = planet.distanceFromSun.kmValue;
              const percent = Math.min(100, Math.max(3, (distanceKm / maxDistance) * 100));

              return (
                <div
                  key={planet.id}
                  onClick={() => {
                    onSelectPlanet(planet.id);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{ backgroundColor: planet.color.accentHex }}
                      />
                      <span className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                        {planet.nameGu} ({planet.nameEn})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-amber-400 font-mono">
                        {planet.distanceFromSun.kmFormattedGu}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-2 font-mono">
                        ({planet.distanceFromSun.au})
                      </span>
                    </div>
                  </div>

                  {/* Relative Distance Bar */}
                  <div className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: planet.color.accentHex
                      }}
                    />
                  </div>

                  {/* Travel Time Indicators */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <div className="flex items-center gap-1.5 text-sky-300">
                      <Zap className="w-3 h-3 text-sky-400" />
                      <span>પ્રકાશ સમય: {planet.distanceFromSun.lightTravelTimeGu}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-200">
                      <Car className="w-3 h-3 text-amber-400" />
                      <span>{planet.distanceFromSun.carTravelYearsGu}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs text-center text-slate-400">
          કોઈપણ ગ્રહ પર ક્લિક કરીને 3D દ્રશ્યમાં તેનો ચોક્કસ ભ્રમણકક્ષા માર્ગ જુઓ!
        </div>
      </div>
    </div>
  );
};
