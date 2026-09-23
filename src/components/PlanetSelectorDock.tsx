import React from 'react';
import { CelestialBody } from '../types/solar';
import { Play, Pause, FastForward, Eye, Layers } from 'lucide-react';

interface PlanetSelectorDockProps {
  planets: CelestialBody[];
  selectedPlanetId: string;
  onSelectPlanet: (id: string) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  speedMultiplier: number;
  onChangeSpeed: (speed: number) => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
}

export const PlanetSelectorDock: React.FC<PlanetSelectorDockProps> = ({
  planets,
  selectedPlanetId,
  onSelectPlanet,
  isPaused,
  onTogglePause,
  speedMultiplier,
  onChangeSpeed,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels
}) => {
  return (
    <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:right-6 z-20 flex flex-col gap-2 pointer-events-none">
      {/* Simulation Controls Strip */}
      <div className="flex items-center justify-between pointer-events-auto">
        {/* Left: 3D Scene Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 text-xs">
          <button
            onClick={onToggleOrbits}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              showOrbits
                ? 'bg-slate-800 text-amber-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
            title="ભ્રમણકક્ષા લાઈન (Orbit Lines)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ઓર્બિટ્સ</span>
          </button>

          <button
            onClick={onToggleLabels}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              showLabels
                ? 'bg-slate-800 text-sky-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
            title="ગ્રહોના નામ (Planet Labels)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">નામ</span>
          </button>
        </div>

        {/* Right: Orbit Speed Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 text-xs">
          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isPaused ? 'ચાલુ કરો' : 'થોભો'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>

          <div className="hidden sm:flex items-center gap-1 px-1">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold transition-colors ${
                  speedMultiplier === spd && !isPaused
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Planet Selection Cards Dock */}
      <div className="p-1.5 sm:p-2 bg-slate-950/85 backdrop-blur-md border border-slate-800/90 rounded-2xl shadow-2xl overflow-x-auto flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        {planets.map((planet) => {
          const isSelected = planet.id === selectedPlanetId;

          return (
            <button
              key={planet.id}
              onClick={() => onSelectPlanet(planet.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shrink-0 text-left border ${
                isSelected
                  ? 'bg-slate-800 border-amber-400/80 shadow-md shadow-amber-500/10 scale-105'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-white/20 shadow-sm shrink-0"
                style={{ backgroundColor: planet.color.accentHex }}
              />
              <div className="leading-tight">
                <span
                  className={`block text-xs font-bold whitespace-nowrap ${
                    isSelected ? 'text-amber-300' : 'text-slate-200'
                  }`}
                >
                  {planet.nameGu}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium whitespace-nowrap">
                  {planet.nameEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
