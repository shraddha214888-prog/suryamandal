import React from 'react';

interface MoonOrbitDiagramProps {
  cycleDay: number; // 0 to 29.53
}

export const MoonOrbitDiagram: React.FC<MoonOrbitDiagramProps> = ({ cycleDay }) => {
  const width = 240;
  const height = 180;
  const cx = 110;
  const cy = 90;
  const orbitRadius = 65;

  // Normalized phase angle: 0 (New Moon) -> PI (Full Moon) -> 2PI (New Moon)
  // At New Moon (cycleDay=0), Moon is between Earth and Sun (towards right, angle = 0)
  // Revolve counterclockwise: angle = (cycleDay / 29.53059) * 2 * PI
  const phaseAngle = (cycleDay / 29.53059) * 2 * Math.PI;

  const moonX = cx + Math.cos(phaseAngle) * orbitRadius;
  const moonY = cy - Math.sin(phaseAngle) * orbitRadius; // Invert for counterclockwise math

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col items-center">
      <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-1">
        <span className="font-semibold text-slate-300">🛰️ અવકાશમાંથી 2D કક્ષા દર્શન</span>
        <span className="text-amber-400 font-mono">દિવસ: {cycleDay.toFixed(1)}/૨૯.૫</span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[260px] h-[160px] overflow-visible select-none"
      >
        <defs>
          <linearGradient id="sunRayGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Sun on the far right */}
        <rect x="220" y="25" width="20" height="130" rx="4" fill="url(#sunRayGrad)" />
        <circle cx="238" cy="90" r="32" fill="#fbbf24" filter="drop-shadow(0 0 8px #f59e0b)" />
        <text x="226" y="94" fontSize="9" fontWeight="bold" fill="#78350f" textAnchor="middle">
          સૂર્ય
        </text>

        {/* Sunlight ray arrows from right to left */}
        <g stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.4">
          <line x1="210" y1="45" x2="175" y2="45" />
          <line x1="210" y1="90" x2="175" y2="90" />
          <line x1="210" y1="135" x2="175" y2="135" />
        </g>

        {/* Moon circular orbit line around Earth */}
        <circle
          cx={cx}
          cy={cy}
          r={orbitRadius}
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Earth in Center */}
        <circle cx={cx} cy={cy} r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Earth continents hint */}
        <circle cx={cx - 3} cy={cy - 2} r="5" fill="#16a34a" opacity="0.8" />
        <circle cx={cx + 4} cy={cy + 4} r="4" fill="#16a34a" opacity="0.8" />
        <text x={cx} y={cy + 3} fontSize="8" fontWeight="bold" fill="#ffffff" textAnchor="middle">
          પૃથ્વી
        </text>

        {/* Line of sight from Earth to Moon */}
        <line
          x1={cx}
          y1={cy}
          x2={moonX}
          y2={moonY}
          stroke="#a855f7"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.7"
        />

        {/* Moon Body in orbit */}
        <g transform={`translate(${moonX}, ${moonY})`}>
          {/* Unlit side (dark, always facing away from Sun = left) */}
          <path
            d="M 0,-6 A 6,6 0 0,0 0,6 Z"
            fill="#0f172a"
            stroke="#475569"
            strokeWidth="0.5"
          />
          {/* Lit side (facing Sun = right) */}
          <path
            d="M 0,-6 A 6,6 0 0,1 0,6 Z"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
          {/* Little orbit indicator ring */}
          <circle cx="0" cy="0" r="8" fill="none" stroke="#e0e7ff" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Current phase indicator text near moon */}
        <text
          x={moonX}
          y={moonY - 11}
          fontSize="8"
          fontWeight="bold"
          fill="#cbd5e1"
          textAnchor="middle"
        >
          ચંદ્ર 🌙
        </text>
      </svg>

      <p className="text-[10px] text-slate-400 text-center leading-tight">
        સૂર્યનો પ્રકાશ હંમેશા જમણી બાજુથી આવે છે. ચંદ્ર ફરતો રહે છે તેથી પૃથ્વી પરથી દેખાતો ઉજળો ભાગ બદલાય છે.
      </p>
    </div>
  );
};
