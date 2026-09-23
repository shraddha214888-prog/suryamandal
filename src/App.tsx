/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SOLAR_SYSTEM_BODIES } from './data/solarSystemData';
import { SolarCanvas } from './components/SolarCanvas';
import { Navbar } from './components/Navbar';
import { PlanetDetailModal } from './components/PlanetDetailModal';
import { PlanetSelectorDock } from './components/PlanetSelectorDock';
import { WeightCalculatorModal } from './components/WeightCalculatorModal';
import { DistanceScaleModal } from './components/DistanceScaleModal';
import { SizeComparisonModal } from './components/SizeComparisonModal';
import { KidsQuizModal } from './components/KidsQuizModal';
import { MoonPhasesModal } from './components/MoonPhasesModal';
import { Info, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(true);

  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isWeightCalcOpen, setIsWeightCalcOpen] = useState<boolean>(false);
  const [isDistanceScaleOpen, setIsDistanceScaleOpen] = useState<boolean>(false);
  const [isSizeComparisonOpen, setIsSizeComparisonOpen] = useState<boolean>(false);
  const [isMoonPhasesOpen, setIsMoonPhasesOpen] = useState<boolean>(false);

  // 3D Scene Controls
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  const selectedPlanet = SOLAR_SYSTEM_BODIES.find((b) => b.id === selectedPlanetId) || SOLAR_SYSTEM_BODIES[3];

  const handleSelectPlanet = (id: string) => {
    setSelectedPlanetId(id);
    setIsDetailOpen(true);
  };

  const handleResetCamera = () => {
    setSelectedPlanetId('sun');
    setIsDetailOpen(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Top Navbar */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenWeightCalc={() => setIsWeightCalcOpen(true)}
        onOpenDistanceScale={() => setIsDistanceScaleOpen(true)}
        onOpenSizeComparison={() => setIsSizeComparisonOpen(true)}
        onOpenMoonPhases={() => setIsMoonPhasesOpen(true)}
        onResetCamera={handleResetCamera}
      />

      {/* Main Interactive 3D Stage */}
      <main className="flex-1 relative overflow-hidden">
        <SolarCanvas
          bodies={SOLAR_SYSTEM_BODIES}
          selectedBodyId={selectedPlanetId}
          onSelectBody={handleSelectPlanet}
          speedMultiplier={speedMultiplier}
          isPaused={isPaused}
          showOrbits={showOrbits}
          showLabels={showLabels}
        />

        {/* Quick Helper Floating Tip */}
        <div className="absolute top-3 left-3 sm:left-6 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-slate-800 text-xs text-slate-300 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>માઉસથી ફેરવો, ઝૂમ કરો અથવા કોઈપણ ગ્રહ પર ક્લિક કરો!</span>
        </div>

        {/* Floating Detail Trigger Button if drawer closed */}
        {!isDetailOpen && (
          <button
            onClick={() => setIsDetailOpen(true)}
            className="absolute top-3 right-3 sm:right-6 z-20 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-xs font-bold text-amber-300 shadow-xl flex items-center gap-2 transition-all hover:scale-105"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedPlanet.color.accentHex }}
            />
            <span>{selectedPlanet.nameGu} ની વિગતો જુઓ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Planet Detail Drawer */}
        {isDetailOpen && (
          <PlanetDetailModal
            planet={selectedPlanet}
            allPlanets={SOLAR_SYSTEM_BODIES}
            onSelectPlanet={handleSelectPlanet}
            onClose={() => setIsDetailOpen(false)}
            onOpenWeightCalc={() => setIsWeightCalcOpen(true)}
            onOpenMoonPhasesModal={() => setIsMoonPhasesOpen(true)}
          />
        )}

        {/* Bottom Selector Dock */}
        <PlanetSelectorDock
          planets={SOLAR_SYSTEM_BODIES}
          selectedPlanetId={selectedPlanetId}
          onSelectPlanet={handleSelectPlanet}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused((prev) => !prev)}
          speedMultiplier={speedMultiplier}
          onChangeSpeed={(spd) => setSpeedMultiplier(spd)}
          showOrbits={showOrbits}
          onToggleOrbits={() => setShowOrbits((prev) => !prev)}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels((prev) => !prev)}
        />
      </main>

      {/* Interactive Feature Modals */}
      {isQuizOpen && (
        <KidsQuizModal
          onClose={() => setIsQuizOpen(false)}
          onSelectPlanet={handleSelectPlanet}
        />
      )}

      {isWeightCalcOpen && (
        <WeightCalculatorModal
          planets={SOLAR_SYSTEM_BODIES}
          onClose={() => setIsWeightCalcOpen(false)}
          onSelectPlanet={handleSelectPlanet}
        />
      )}

      {isDistanceScaleOpen && (
        <DistanceScaleModal
          planets={SOLAR_SYSTEM_BODIES}
          onClose={() => setIsDistanceScaleOpen(false)}
          onSelectPlanet={handleSelectPlanet}
        />
      )}

      {isSizeComparisonOpen && (
        <SizeComparisonModal
          planets={SOLAR_SYSTEM_BODIES}
          onClose={() => setIsSizeComparisonOpen(false)}
          onSelectPlanet={handleSelectPlanet}
        />
      )}

      {isMoonPhasesOpen && (
        <MoonPhasesModal
          onClose={() => setIsMoonPhasesOpen(false)}
        />
      )}
    </div>
  );
}
