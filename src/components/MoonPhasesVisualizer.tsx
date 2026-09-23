import React, { useState, useEffect, useRef } from 'react';
import { MOON_PHASES_DATA, MoonPhaseInfo } from '../data/moonPhasesData';
import { Moon2DCanvas } from './Moon2DCanvas';
import { MoonOrbitDiagram } from './MoonOrbitDiagram';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Compass,
  Image as ImageIcon,
  Maximize2
} from 'lucide-react';

interface MoonPhasesVisualizerProps {
  onOpenFullModal?: () => void;
  compact?: boolean;
}

export const MoonPhasesVisualizer: React.FC<MoonPhasesVisualizerProps> = ({
  onOpenFullModal,
  compact = false
}) => {
  // Cycle day between 0 and 29.53
  const [cycleDay, setCycleDay] = useState<number>(14.8); // start at full moon for dramatic effect
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'moon2d' | 'orbit' | 'photos'>('moon2d');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('full-moon');
  const [showLabels, setShowLabels] = useState<boolean>(false);

  // Animation frame loop
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Complete full 29.5 day cycle in about 12 seconds
      setCycleDay((prev) => {
        const next = prev + delta * 2.5;
        return next >= 29.53 ? 0 : next;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Find the closest canonical phase to the current cycleDay
  const getClosestPhase = (day: number): MoonPhaseInfo => {
    let closest = MOON_PHASES_DATA[0];
    let minDiff = Infinity;
    for (const phase of MOON_PHASES_DATA) {
      const diff = Math.abs(phase.cycleDay - day);
      if (diff < minDiff) {
        minDiff = diff;
        closest = phase;
      }
    }
    return closest;
  };

  const currentPhase = getClosestPhase(cycleDay);

  // Illumination calculation
  const phaseAngle = (cycleDay / 29.53059) * 2 * Math.PI;
  const currentIllumination = Math.round(((1 - Math.cos(phaseAngle)) / 2) * 100);

  const handleSelectPhaseCard = (phase: MoonPhaseInfo) => {
    setCycleDay(phase.cycleDay);
    setSelectedPhaseId(phase.id);
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-sky-500/30 overflow-hidden shadow-xl space-y-4 p-4">
      {/* Visualizer Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌙</span>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span>ચંદ્રની કળાઓ (Phases of the Moon)</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                2D & ફોટા સાથે
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              પૃથ્વીના એકમાત્ર કુદરતી ઉપગ્રહ ચંદ્રની પૂનમથી અમાસ સુધીની કળાઓ
            </p>
          </div>
        </div>

        {onOpenFullModal && (
          <button
            onClick={onOpenFullModal}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="મોટા સ્ક્રીનમાં જુઓ"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('moon2d')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'moon2d'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>🌕 2D ચંદ્ર દર્શન</span>
        </button>

        <button
          onClick={() => setActiveTab('orbit')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'orbit'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>🛰️ કક્ષા ડાયાગ્રામ</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'photos'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>ફોટો ગેલેરી (૮ કળા)</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      {activeTab === 'moon2d' && (
        <div className="flex flex-col items-center space-y-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
          {/* Active Phase Badge */}
          <div className="text-center space-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-extrabold text-amber-300">
                {currentPhase.nameGu}
              </span>
              <span className="text-xs text-slate-400 font-mono">({currentPhase.nameEn})</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs text-slate-300">
              <span className="text-sky-300 font-semibold">{currentPhase.tithiGu}</span>
              <span>•</span>
              <span className="font-mono text-emerald-300">
                પ્રકાશિત ભાગ: {currentIllumination}%
              </span>
            </div>
          </div>

          {/* Dynamic 2D Moon Canvas */}
          <div className="relative group py-2">
            <Moon2DCanvas
              cycleDay={cycleDay}
              size={compact ? 190 : 220}
              showFeatureLabels={showLabels}
            />

            {/* Toggle lunar feature labels */}
            <button
              onClick={() => setShowLabels((prev) => !prev)}
              className="absolute top-0 right-0 text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              {showLabels ? '🏷️ લેબલ્સ ચાલુ' : '🏷️ ખાડા/સમુદ્ર'}
            </button>
          </div>

          {/* Interactive Scrubbing Slider */}
          <div className="w-full space-y-1.5 px-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>અમાસ (૦)</span>
              <span className="text-amber-400 font-mono">
                દિવસ: {cycleDay.toFixed(1)} / ૨૯.૫
              </span>
              <span>પૂનમ (૧૫)</span>
              <span>અમાસ (૨૯.૫)</span>
            </div>

            <input
              type="range"
              min="0"
              max="29.53"
              step="0.1"
              value={cycleDay}
              onChange={(e) => {
                setCycleDay(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            {/* Quick Milestone Buttons */}
            <div className="flex items-center justify-between pt-1 gap-1 text-[11px]">
              <button
                onClick={() => {
                  setCycleDay(0);
                  setIsPlaying(false);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  Math.abs(cycleDay - 0) < 1
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                અમાસ
              </button>

              <button
                onClick={() => {
                  setCycleDay(7.4);
                  setIsPlaying(false);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  Math.abs(cycleDay - 7.4) < 1
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                સુદ આઠમ
              </button>

              <button
                onClick={() => {
                  setCycleDay(14.8);
                  setIsPlaying(false);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  Math.abs(cycleDay - 14.8) < 1
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                પૂનમ 🌕
              </button>

              <button
                onClick={() => {
                  setCycleDay(22.1);
                  setIsPlaying(false);
                }}
                className={`px-2 py-0.5 rounded transition-colors ${
                  Math.abs(cycleDay - 22.1) < 1
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                વદ આઠમ
              </button>
            </div>
          </div>

          {/* Animation Play/Pause & Reset Controls */}
          <div className="flex items-center justify-center gap-2 pt-1 w-full">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'એનિમેશન થોભો' : 'કળાઓનું એનિમેશન જુઓ'}</span>
            </button>

            <button
              onClick={() => {
                setCycleDay(0);
                setIsPlaying(false);
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="શરૂઆતથી જુઓ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Space 2D Orbit View Tab */}
      {activeTab === 'orbit' && <MoonOrbitDiagram cycleDay={cycleDay} />}

      {/* Photo Gallery Tab (with Real Astrophotography Photos) */}
      {activeTab === 'photos' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            વાસ્તવિક ટેલિસ્કોપ ફોટા પર ક્લિક કરો અને તેને 2D વિઝ્યુઅલાઈઝરમાં જુઓ:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[290px] overflow-y-auto pr-1">
            {MOON_PHASES_DATA.map((phase) => {
              const isSelected = phase.id === currentPhase.id;

              return (
                <div
                  key={phase.id}
                  onClick={() => handleSelectPhaseCard(phase)}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col items-center group ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-400 shadow-lg scale-102 ring-1 ring-sky-400'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Photo Container */}
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-black border border-slate-700/80 mb-1.5 relative shadow-inner">
                    {/* Render with dynamic mini canvas or photo */}
                    <div className="scale-75 origin-top-left -ml-2.5 -mt-2.5">
                      <Moon2DCanvas cycleDay={phase.cycleDay} size={84} />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-white text-center leading-tight group-hover:text-amber-300 transition-colors">
                    {phase.nameGu}
                  </span>
                  <span className="text-[9px] text-sky-400 font-mono">
                    {phase.illuminationPercent}% પ્રકાશ
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {phase.dayRange}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detail Explanation Box of Active Phase */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>આવો કેમ દેખાય છે? (વૈજ્ઞાનિક કારણ)</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {currentPhase.pakshaGu}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed">
          {currentPhase.kidExplanationGu}
        </p>

        <div className="flex items-start gap-1.5 text-sky-300/90 text-[11px] bg-sky-950/20 p-2 rounded-lg border border-sky-800/30">
          <Compass className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky-400" />
          <span>
            <strong>ક્યારે અને ક્યાં દેખાય?</strong> {currentPhase.whereToLookGu}
          </span>
        </div>
      </div>

      {/* Primary School Did-You-Know */}
      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-amber-200/90 flex items-start gap-2">
        <span className="text-base">🚀</span>
        <div className="leading-snug">
          <strong className="text-amber-300">બાળ વિજ્ઞાન નોંધ:</strong> ચંદ્ર પાસે પોતાનો પ્રકાશ નથી. તે સૂર્યના પ્રકાશનું અરીસાની જેમ પરાવર્તન કરે છે! ભારતના <strong>ચંદ્રયાન-૩</strong> એ ચંદ્રના દક્ષિણ ધ્રુવ પર ઉતરીને વિશ્વભરમાં ઈતિહાસ રચ્યો હતો!
        </div>
      </div>
    </div>
  );
};
