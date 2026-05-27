import React from "react";

interface RadarChartProps {
  scores?: {
    pageant: number;
    runway: number;
    kol: number;
  };
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  labelFontSize?: number;
  labelFontWeight?: string;
}

export default function RadarChart({
  scores = { pageant: 50, runway: 45, kol: 95 },
  fillColor = "rgba(168,85,247,0.18)",
  strokeColor = "#a855f7",
  strokeWidth = 2.5,
  labelFontSize = 12,
  labelFontWeight = "bold"
}: RadarChartProps) {
  const cx = 100;
  const cy = 100;
  const maxVal = 100;
  const radius = 60;

  const getCoords = (val: number, angleDeg: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    const dist = (val / maxVal) * radius;
    return {
      x: cx + dist * Math.cos(rad),
      y: cy + dist * Math.sin(rad)
    };
  };

  const ptPageant = getCoords(scores.pageant || 0, 0);
  const ptRunway = getCoords(scores.runway || 0, 120);
  const ptKol = getCoords(scores.kol || 0, 240);

  const pointsPath = `${ptPageant.x},${ptPageant.y} ${ptRunway.x},${ptRunway.y} ${ptKol.x},${ptKol.y}`;

  const getTrianglePoints = (scale: number) => {
    const p1 = getCoords(scale, 0);
    const p2 = getCoords(scale, 120);
    const p3 = getCoords(scale, 240);
    return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  };

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
      <defs>
        <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#121324" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Concentric grid triangles */}
      <polygon points={getTrianglePoints(25)} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <polygon points={getTrianglePoints(50)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <polygon points={getTrianglePoints(75)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <polygon points={getTrianglePoints(100)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />

      {/* Axis Lines */}
      <line x1="100" y1="100" x2={getCoords(100, 0).x} y2={getCoords(100, 0).y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="100" y1="100" x2={getCoords(100, 120).x} y2={getCoords(100, 120).y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="100" y1="100" x2={getCoords(100, 240).x} y2={getCoords(100, 240).y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />

      {/* Data Polygon with Glow Filter */}
      <polygon points={pointsPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 1.6} filter="url(#radar-glow)" opacity="0.55" />
      <polygon points={pointsPath} fill="url(#radarGrad)" stroke={strokeColor} strokeWidth={strokeWidth} />

      {/* Data point vertex circles */}
      <circle cx={ptPageant.x} cy={ptPageant.y} r="4" fill="#ffffff" stroke={strokeColor} strokeWidth="2" className="drop-shadow-sm" />
      <circle cx={ptRunway.x} cy={ptRunway.y} r="4" fill="#ffffff" stroke={strokeColor} strokeWidth="2" className="drop-shadow-sm" />
      <circle cx={ptKol.x} cy={ptKol.y} r="4" fill="#ffffff" stroke={strokeColor} strokeWidth="2" className="drop-shadow-sm" />

      {/* Glowing vertices rings */}
      <circle cx={ptPageant.x} cy={ptPageant.y} r="8" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />
      <circle cx={ptRunway.x} cy={ptRunway.y} r="8" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />
      <circle cx={ptKol.x} cy={ptKol.y} r="8" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />

      {/* Label Badges */}
      {/* P Label */}
      <g>
        <circle cx="100" cy="20" r="10" fill="#08090f" stroke="#f4c430" strokeWidth="1" />
        <text x="100" y="23.5" fill="#f4c430" fontSize="10" fontWeight="black" textAnchor="middle">P</text>
      </g>

      {/* R Label */}
      <g>
        <circle cx="32" cy="144" r="10" fill="#08090f" stroke="#a855f7" strokeWidth="1" />
        <text x="32" y="147.5" fill="#a855f7" fontSize="10" fontWeight="black" textAnchor="middle">R</text>
      </g>

      {/* K Label */}
      <g>
        <circle cx="168" cy="144" r="10" fill="#08090f" stroke="#06b6d4" strokeWidth="1" />
        <text x="168" y="147.5" fill="#06b6d4" fontSize="10" fontWeight="black" textAnchor="middle">K</text>
      </g>
    </svg>
  );
}
