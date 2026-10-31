"use client";

import { useEffect, useState } from "react";

type Stage = { label: string; sub: string };

const W = 1100;
const STAGE_W = 180;
const Y = 70;

// CI/CD pipeline with build "packets" travelling from commit to production.
export default function Pipeline({ stages }: { stages: Stage[] }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const gap = (W - 40 - STAGE_W * stages.length) / (stages.length - 1);
  const xs = stages.map((_, i) => 20 + i * (STAGE_W + gap));
  const track = `M ${xs[0] + STAGE_W / 2} ${Y} H ${xs[xs.length - 1] + STAGE_W / 2}`;

  return (
    <>
    {/* Phones get a vertical list; the wide SVG only shows on larger screens. */}
    <ol className="pipeline-list">
      {stages.map((s) => (
        <li key={s.label}>
          <strong>{s.label}</strong>
          <span>{s.sub}</span>
        </li>
      ))}
    </ol>
    <div className="pipeline-scroll">
      <svg className="pipeline" viewBox={`0 0 ${W} 150`} role="img" aria-label={`Delivery pipeline: ${stages.map((s) => s.label).join(", then ")}`}>
        <defs>
          {/* userSpaceOnUse: a straight line has a zero-height box, which breaks the default gradient units. */}
          <linearGradient id="track" gradientUnits="userSpaceOnUse" x1="0" y1={Y} x2={W} y2={Y}>
            <stop offset="0" stopColor="#5ad4e6" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>
        <path d={track} stroke="url(#track)" strokeWidth="3" fill="none" opacity="0.55" />
        {animate &&
          [0, 1.3, 2.6].map((delay) => (
            <g key={delay}>
              <circle r="12" fill="#fff" opacity="0.18" />
              <circle r="5" fill="#fff" />
              <animateMotion dur="3.9s" begin={`${delay}s`} repeatCount="indefinite" path={track} />
            </g>
          ))}
        {stages.map((s, i) => (
          <g key={s.label} className="pipeline__stage">
            <rect x={xs[i]} y={Y - 30} width={STAGE_W} height={60} rx={12} />
            <text x={xs[i] + STAGE_W / 2} y={Y - 4} textAnchor="middle" className="pipeline__label">
              {s.label}
            </text>
            <text x={xs[i] + STAGE_W / 2} y={Y + 16} textAnchor="middle" className="pipeline__sub">
              {s.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
    </>
  );
}
