import React, { useState, useEffect } from 'react';
import { CelestialBody } from '../types/solar';
import {
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Ruler,
  Scale,
  Palette,
  Clock,
  Compass,
  Zap,
  Flame,
  Snowflake,
  ExternalLink,
  Moon
} from 'lucide-react';
import { MoonPhasesVisualizer } from './MoonPhasesVisualizer';

interface PlanetDetailModalProps {
  planet: CelestialBody;
  allPlanets: CelestialBody[];
  onSelectPlanet: (id: string) => void;
  onClose: () => void;
  onOpenWeightCalc: () => void;
  onOpenMoonPhasesModal?: () => void;
}

export const PlanetDetailModal: React.FC<PlanetDetailModalProps> = ({
  planet,
  allPlanets,
  onSelectPlanet,
  onClose,
  onOpenWeightCalc,
  onOpenMoonPhasesModal
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [kidCustomWeight, setKidCustomWeight] = useState<number>(30);

  // Audio Speech synthesis
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('તમારા બ્રાઉઝરમાં સ્પીચ ફીચર સપોર્ટેડ નથી.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare full text to speak in Gujarati
    const textToSpeak = `${planet.nameGu}. ${planet.taglineGu}. સૂર્યથી અંતર: ${planet.distanceFromSun.kmFormattedGu}. રંગ: ${planet.color.primaryNameGu}. ${planet.color.colorReasonGu}. મુખ્ય ખાસિયત: ${planet.khasiyat.slice(0, 3).join('. ')}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9; // clear pacing for children
    utterance.pitch = 1.05;

    // Try finding Gujarati or Indian language voice
    const voices = window.speechSynthesis.getVoices();
    const guVoice = voices.find((v) => v.lang.includes('gu') || v.lang.includes('hi'));
    if (guVoice) {
      utterance.voice = guVoice;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Stop audio on unmount or planet change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [planet.id]);

  // Navigate next / prev
  const currentIndex = allPlanets.findIndex((p) => p.id === planet.id);
  const prevPlanet = allPlanets[(currentIndex - 1 + allPlanets.length) % allPlanets.length];
  const nextPlanet = allPlanets[(currentIndex + 1) % allPlanets.length];

  // Calculated weight on this planet
  const calculatedWeight = (kidCustomWeight * planet.weightAndMass.gravityRatio).toFixed(1);

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full md:w-[480px] lg:w-[520px] bg-slate-900/95 backdrop-blur-md border-l border-slate-800 z-30 shadow-2xl flex flex-col transition-transform duration-300 overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner shrink-0"
            style={{
              backgroundColor: `${planet.color.accentHex}20`,
              borderColor: `${planet.color.accentHex}60`
            }}
          >
            <span
              className="w-5 h-5 rounded-full shadow-lg"
              style={{ backgroundColor: planet.color.accentHex }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                {planet.nameGu}
              </h2>
              <span className="text-sm font-medium text-slate-400">({planet.nameEn})</span>
            </div>
            <p className="text-xs text-amber-400 font-medium">{planet.vitalStats.typeGu}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="ઓડિયો સાંભળો (Listen Narration)"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlayingAudio ? 'બંધ કરો' : 'સાંભળો'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="બંધ કરો (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sub-bar with Prev/Next shortcuts */}
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => onSelectPlanet(prevPlanet.id)}
          className="flex items-center gap-1 hover:text-amber-300 transition-colors py-1 px-2 rounded hover:bg-slate-800"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{prevPlanet.nameGu}</span>
        </button>

        <span className="text-slate-500">
          {currentIndex + 1} / {allPlanets.length}
        </span>

        <button
          onClick={() => onSelectPlanet(nextPlanet.id)}
          className="flex items-center gap-1 hover:text-amber-300 transition-colors py-1 px-2 rounded hover:bg-slate-800"
        >
          <span>{nextPlanet.nameGu}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-slate-200">
        {/* Tagline */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
          <p className="text-sm font-medium text-amber-200 leading-relaxed">
            "{planet.taglineGu}"
          </p>
        </div>

        {/* 1. સૂર્યથી અંતર (Distance From Sun) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">૧. સૂર્યથી અંતર (Distance)</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700">
              {planet.distanceFromSun.au}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-0.5">કિલોમીટરમાં અંતર:</span>
              <span className="text-sm font-bold text-white block">
                {planet.distanceFromSun.kmFormattedGu}
              </span>
            </div>
            <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block mb-0.5">પ્રકાશ પહોંચવાનો સમય:</span>
              <span className="text-sm font-bold text-sky-300 block">
                {planet.distanceFromSun.lightTravelTimeGu}
              </span>
            </div>
          </div>

          <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded-lg text-xs text-amber-200/90 leading-relaxed">
            <span className="font-semibold text-amber-300">🚗 બાળ મિત્રો માટે સરખામણી: </span>
            {planet.distanceFromSun.carTravelYearsGu}
          </div>
        </div>

        {/* 2. વજન અને ગુરુત્વાકર્ષણ (Mass, Gravity & Kid Weight) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">૨. વજન અને ગુરુત્વાકર્ષણ (Weight)</h3>
            </div>
            <button
              onClick={onOpenWeightCalc}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>બધા ગ્રહો સરખાવો</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
            <span className="text-slate-400">ગ્રહનું મૂળ વૈજ્ઞાનિક દળ (Mass):</span>
            <p className="text-sm font-semibold text-white">{planet.weightAndMass.massGu}</p>
          </div>

          {/* Interactive Weight Comparison Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-300">
                ⚖️ તમારું વજન {planet.nameGu} પર કેટલું થાય?
              </span>
              <span className="text-slate-400">પૃથ્વી પર: {kidCustomWeight} કિલો</span>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="15"
                max="80"
                value={kidCustomWeight}
                onChange={(e) => setKidCustomWeight(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>૧૫ કિલો</span>
                <span>૪૫ કિલો</span>
                <span>૮૦ કિલો</span>
              </div>
            </div>

            {/* Result callout */}
            <div className="p-2.5 rounded-lg bg-emerald-900/30 border border-emerald-600/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 block">
                  {planet.nameGu} પર તમારું વજન:
                </span>
                <span className="text-xl font-extrabold text-emerald-300 font-mono">
                  {calculatedWeight} કિલોગ્રામ
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">ગુરુત્વાકર્ષણ:</span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {planet.weightAndMass.gravity} m/s²
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {planet.weightAndMass.kidWeightExampleGu}
            </p>
            <p className="text-xs text-slate-400">
              🦘 <strong className="text-slate-300">કૂદકો:</strong> {planet.weightAndMass.jumpHeightGu}
            </p>
          </div>
        </div>

        {/* 3. રંગ અને કારણ (Planet Color & Reason) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-700/60 pb-2.5">
            <Palette className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">૩. રંગ અને તેનું રહસ્ય (Color)</h3>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
            <div
              className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md shrink-0"
              style={{ backgroundColor: planet.color.accentHex }}
            />
            <div>
              <span className="text-xs text-slate-400 block">મુખ્ય રંગ:</span>
              <span className="text-sm font-bold text-white">
                {planet.color.primaryNameGu}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300 block mb-1">આવો રંગ કેમ છે?</strong>
            {planet.color.colorReasonGu}
          </div>
        </div>

        {/* 4. ખાસિયતો / અદ્ભુત વાતો (Special Features / Khasiyat) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-700/60 pb-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">૪. અદ્ભુત ખાસિયતો (Special Features)</h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            {planet.khasiyat.map((fact, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800/80 hover:border-amber-500/30 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. પૃથ્વીના ચંદ્રની કળાઓ (Phases of the Moon - Earth Only Feature) */}
        {planet.id === 'earth' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-sky-300" />
                <span>૫. પૃથ્વીના ચંદ્રની કળાઓ (Phases of Moon)</span>
              </span>
              {onOpenMoonPhasesModal && (
                <button
                  onClick={onOpenMoonPhasesModal}
                  className="text-[11px] font-bold text-sky-300 hover:text-white flex items-center gap-1 hover:underline"
                >
                  <span>મોટી સ્ક્રીનમાં જુઓ</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            <MoonPhasesVisualizer
              onOpenFullModal={onOpenMoonPhasesModal}
              compact={true}
            />
          </div>
        )}

        {/* 6. અન્ય મહત્વની વિગતો (Quick Vital Stats) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>૬. મહત્વની ઝડપી વિગતો (Vital Stats)</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">કદ (વ્યાસ):</span>
              <span className="font-semibold text-white block">
                {planet.vitalStats.diameterKm.toLocaleString('gu-IN')} કિમી
              </span>
              <span className="text-[10px] text-slate-500">
                {planet.vitalStats.diameterComparisonGu}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">ચંદ્ર (ઉપગ્રહ):</span>
              <span className="font-semibold text-amber-300 block text-sm">
                {planet.vitalStats.moonsCount > 0
                  ? `${planet.vitalStats.moonsCount} ચંદ્ર`
                  : 'કોઈ ચંદ્ર નથી'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">૧ દિવસનો સમય:</span>
              <span className="font-semibold text-white block">
                {planet.vitalStats.dayLengthGu}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">૧ વર્ષનો સમય:</span>
              <span className="font-semibold text-white block">
                {planet.vitalStats.yearLengthGu}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">સરેરાશ તાપમાન:</span>
            <span className="font-bold text-amber-300">{planet.vitalStats.avgTempGu}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
