import { useState } from "react";
import "./HeartTree.css";

// Lush canopy of 48 individual heart leaves with varied sizes, tones, and gentle sway
const leaves = [
  // Top canopy crown
  { id: 1, x: 160, y: 38, scale: 1.15, rot: 0, color: "#ff2a63", delay: 0, dur: 2.8 },
  { id: 2, x: 138, y: 44, scale: 0.95, rot: -14, color: "#ff4d80", delay: 0.4, dur: 3.2 },
  { id: 3, x: 182, y: 44, scale: 0.95, rot: 14, color: "#ff6384", delay: 0.7, dur: 3.0 },
  { id: 4, x: 160, y: 58, scale: 1.1, rot: 4, color: "#ff3366", delay: 0.2, dur: 2.6 },
  { id: 5, x: 118, y: 52, scale: 0.9, rot: -22, color: "#ff7597", delay: 0.9, dur: 3.4 },
  { id: 6, x: 202, y: 52, scale: 0.9, rot: 22, color: "#ff7597", delay: 0.5, dur: 3.1 },

  // Upper canopy left cluster
  { id: 7, x: 96, y: 68, scale: 1.05, rot: -28, color: "#ff5376", delay: 0.3, dur: 2.9 },
  { id: 8, x: 76, y: 92, scale: 1.0, rot: -36, color: "#ff85a1", delay: 0.8, dur: 3.3 },
  { id: 9, x: 58, y: 118, scale: 0.95, rot: -44, color: "#ffa3ba", delay: 1.1, dur: 2.7 },
  { id: 10, x: 82, y: 116, scale: 1.1, rot: -20, color: "#ff3366", delay: 0.6, dur: 3.5 },
  { id: 11, x: 106, y: 88, scale: 1.15, rot: -16, color: "#ff4d80", delay: 0.15, dur: 2.8 },
  { id: 12, x: 126, y: 72, scale: 1.0, rot: -10, color: "#ffd7a0", delay: 0.75, dur: 3.0 }, // Gold accent

  // Upper canopy right cluster
  { id: 13, x: 224, y: 68, scale: 1.05, rot: 28, color: "#ff5376", delay: 0.35, dur: 2.9 },
  { id: 14, x: 244, y: 92, scale: 1.0, rot: 36, color: "#ff85a1", delay: 0.85, dur: 3.3 },
  { id: 15, x: 262, y: 118, scale: 0.95, rot: 44, color: "#ffa3ba", delay: 1.15, dur: 2.7 },
  { id: 16, x: 238, y: 116, scale: 1.1, rot: 20, color: "#ff3366", delay: 0.65, dur: 3.5 },
  { id: 17, x: 214, y: 88, scale: 1.15, rot: 16, color: "#ff4d80", delay: 0.25, dur: 2.8 },
  { id: 18, x: 194, y: 72, scale: 1.0, rot: 10, color: "#ffd7a0", delay: 0.8, dur: 3.0 }, // Gold accent

  // Heart canopy center dense core
  { id: 19, x: 142, y: 82, scale: 1.25, rot: -6, color: "#ff1a53", delay: 0.1, dur: 2.5 },
  { id: 20, x: 178, y: 82, scale: 1.25, rot: 6, color: "#ff2a63", delay: 0.45, dur: 2.7 },
  { id: 21, x: 160, y: 95, scale: 1.35, rot: 0, color: "#ff0044", delay: 0.05, dur: 2.4 },
  { id: 22, x: 136, y: 104, scale: 1.1, rot: -12, color: "#ff4d80", delay: 0.5, dur: 3.1 },
  { id: 23, x: 184, y: 104, scale: 1.1, rot: 12, color: "#ff6384", delay: 0.55, dur: 3.2 },
  { id: 24, x: 160, y: 116, scale: 1.2, rot: 2, color: "#ff3366", delay: 0.3, dur: 2.8 },

  // Mid canopy spreads
  { id: 25, x: 112, y: 112, scale: 1.05, rot: -18, color: "#ff6b8b", delay: 0.7, dur: 3.3 },
  { id: 26, x: 208, y: 112, scale: 1.05, rot: 18, color: "#ff6b8b", delay: 0.75, dur: 3.3 },
  { id: 27, x: 68, y: 142, scale: 0.9, rot: -40, color: "#ff85a1", delay: 1.0, dur: 2.9 },
  { id: 28, x: 252, y: 142, scale: 0.9, rot: 40, color: "#ff85a1", delay: 1.05, dur: 2.9 },
  { id: 29, x: 92, y: 138, scale: 1.1, rot: -24, color: "#ff4d80", delay: 0.4, dur: 3.4 },
  { id: 30, x: 228, y: 138, scale: 1.1, rot: 24, color: "#ff4d80", delay: 0.45, dur: 3.4 },

  // Lower branches blossoming heart clusters
  { id: 31, x: 118, y: 142, scale: 1.05, rot: -14, color: "#ff5376", delay: 0.2, dur: 3.0 },
  { id: 32, x: 202, y: 142, scale: 1.05, rot: 14, color: "#ff5376", delay: 0.3, dur: 3.0 },
  { id: 33, x: 142, y: 134, scale: 1.15, rot: -6, color: "#ff6384", delay: 0.6, dur: 2.7 },
  { id: 34, x: 178, y: 134, scale: 1.15, rot: 6, color: "#ff6384", delay: 0.65, dur: 2.7 },
  { id: 35, x: 160, y: 142, scale: 1.1, rot: 0, color: "#ffd7a0", delay: 0.8, dur: 3.2 }, // Gold heart

  // Outer delicate hanging heart buds
  { id: 36, x: 48, y: 130, scale: 0.8, rot: -48, color: "#ffa3ba", delay: 1.2, dur: 2.8 },
  { id: 37, x: 272, y: 130, scale: 0.8, rot: 48, color: "#ffa3ba", delay: 1.25, dur: 2.8 },
  { id: 38, x: 80, y: 162, scale: 0.85, rot: -32, color: "#ffccd5", delay: 0.9, dur: 3.5 },
  { id: 39, x: 240, y: 162, scale: 0.85, rot: 32, color: "#ffccd5", delay: 0.95, dur: 3.5 },
  { id: 40, x: 104, y: 160, scale: 0.9, rot: -18, color: "#ff7597", delay: 0.4, dur: 3.0 },
  { id: 41, x: 216, y: 160, scale: 0.9, rot: 18, color: "#ff7597", delay: 0.45, dur: 3.0 },
  { id: 42, x: 134, y: 154, scale: 0.85, rot: -8, color: "#ff85a1", delay: 0.7, dur: 3.1 },
  { id: 43, x: 186, y: 154, scale: 0.85, rot: 8, color: "#ff85a1", delay: 0.75, dur: 3.1 },

  // Glowing center accent buds
  { id: 44, x: 148, y: 64, scale: 0.8, rot: -5, color: "#ffe6b3", delay: 0.85, dur: 2.6 },
  { id: 45, x: 172, y: 64, scale: 0.8, rot: 5, color: "#ffe6b3", delay: 0.9, dur: 2.6 },
  { id: 46, x: 160, y: 78, scale: 0.85, rot: 0, color: "#ffffff", delay: 0.3, dur: 2.5 },
  { id: 47, x: 122, y: 126, scale: 0.8, rot: -12, color: "#ffd0dc", delay: 0.6, dur: 3.2 },
  { id: 48, x: 198, y: 126, scale: 0.8, rot: 12, color: "#ffd0dc", delay: 0.65, dur: 3.2 },
];

// Floating drifting hearts that float down from the tree
const floatingHearts = [
  { id: "f1", x: 110, y: 175, delay: "0s", dur: "4.5s", size: 14 },
  { id: "f2", x: 210, y: 180, delay: "1.5s", dur: "5.2s", size: 13 },
  { id: "f3", x: 155, y: 195, delay: "3s", dur: "4.8s", size: 16 },
  { id: "f4", x: 85, y: 185, delay: "2.2s", dur: "5.5s", size: 12 },
  { id: "f5", x: 235, y: 190, delay: "0.8s", dur: "5.0s", size: 13 },
];

export default function HeartTree({ onCelebrate }) {
  const [bloomed, setBloomed] = useState(false);

  function handleClick() {
    setBloomed(true);
    if (onCelebrate) onCelebrate();
    setTimeout(() => setBloomed(false), 1200);
  }

  return (
    <div
      className={`heart-tree-container ${bloomed ? "tree-blooming-burst" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="A blooming love tree with animated heart leaves. Tap to celebrate with hearts!"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Ambient pink/gold glow aura behind the heart tree */}
      <div className="tree-ambient-glow" aria-hidden="true" />

      {/* SVG Canvas for Tree Trunk, Branches, and Heart Leaves */}
      <svg
        className="heart-tree-svg"
        viewBox="0 0 320 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Trunk Gradient */}
          <linearGradient id="treeTrunkGrad" x1="160" y1="270" x2="160" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c1422" />
            <stop offset="50%" stopColor="#4a1f38" />
            <stop offset="90%" stopColor="#6e2b4f" />
            <stop offset="100%" stopColor="#8c3364" />
          </linearGradient>

          {/* Golden bark highlight */}
          <linearGradient id="barkGlow" x1="150" y1="270" x2="170" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(245, 217, 165, 0)" />
            <stop offset="60%" stopColor="rgba(255, 185, 215, 0.45)" />
            <stop offset="100%" stopColor="rgba(245, 217, 165, 0.8)" />
          </linearGradient>

          {/* Master Heart Leaf Symbol - Perfectly proportioned heart centered at (0, 0) */}
          <g id="masterHeartLeaf">
            <path
              d="M 0 -8
                 C -7 -18, -20 -9, -13 4
                 C -8 11, 0 18, 0 20
                 C 0 18, 8 11, 13 4
                 C 20 -9, 7 -18, 0 -8 Z"
            />
            {/* Gloss highlight on left lobe */}
            <circle cx="-5" cy="-5" r="2.5" fill="rgba(255, 255, 255, 0.55)" />
          </g>

          {/* Soft Heart Glow Filter */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Root Ground Mound */}
        <ellipse cx="160" cy="268" rx="88" ry="10" fill="rgba(255, 185, 215, 0.15)" />
        <ellipse cx="160" cy="268" rx="55" ry="6" fill="rgba(255, 159, 188, 0.28)" />

        {/* Tree Trunk & Branches */}
        <g className="tree-trunk-group">
          {/* Main Trunk */}
          <path
            d="M 148 268 
               C 152 230, 155 190, 152 160 
               C 148 135, 134 115, 114 90
               C 118 90, 128 105, 138 122
               C 146 136, 152 148, 154 135
               C 156 115, 158 92, 160 68
               C 162 92, 165 115, 166 135
               C 168 148, 174 136, 182 122
               C 192 105, 202 90, 206 90
               C 186 115, 172 135, 168 160
               C 165 190, 168 230, 172 268 
               Z"
            fill="url(#treeTrunkGrad)"
          />

          {/* Left Branch */}
          <path
            d="M 152 175 
               C 134 165, 105 152, 76 138 
               C 86 142, 115 158, 150 166 Z"
            fill="url(#treeTrunkGrad)"
          />
          <path
            d="M 136 150 
               C 118 134, 100 114, 88 94
               C 96 106, 115 125, 132 140 Z"
            fill="url(#treeTrunkGrad)"
          />

          {/* Right Branch */}
          <path
            d="M 168 175 
               C 186 165, 215 152, 244 138 
               C 234 142, 205 158, 170 166 Z"
            fill="url(#treeTrunkGrad)"
          />
          <path
            d="M 184 150 
               C 202 134, 220 114, 232 94
               C 224 106, 205 125, 188 140 Z"
            fill="url(#treeTrunkGrad)"
          />

          {/* Inner bark shimmer line */}
          <path
            d="M 160 262 C 162 225, 162 175, 160 140"
            stroke="url(#barkGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* 48 LUSH HEART LEAVES forming the rich tree canopy */}
        <g className="heart-canopy-layer" filter="url(#softGlow)">
          {leaves.map((leaf) => (
            <g
              key={leaf.id}
              transform={`translate(${leaf.x}, ${leaf.y})`}
            >
              <g
                className="animated-heart-leaf"
                style={{
                  animationDelay: `${leaf.delay}s`,
                  animationDuration: `${leaf.dur}s`,
                  transform: `scale(${leaf.scale}) rotate(${leaf.rot}deg)`,
                }}
              >
                <use
                  href="#masterHeartLeaf"
                  fill={leaf.color}
                />
              </g>
            </g>
          ))}
        </g>

        {/* Drifting Falling Hearts along the trunk */}
        <g className="floating-hearts-layer" aria-hidden="true">
          {floatingHearts.map((fh) => (
            <g
              key={fh.id}
              className="drifting-heart-node"
              style={{
                transform: `translate(${fh.x}px, ${fh.y}px)`,
                animationDelay: fh.delay,
                animationDuration: fh.dur,
              }}
            >
              <use
                href="#masterHeartLeaf"
                fill="#ff85a1"
                transform="scale(0.65)"
                opacity="0.85"
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Interactive prompt under the tree */}
      <span className="heart-tree-badge">
        <span>♡ A tree of love for Mounika ♡</span>
      </span>
    </div>
  );
}
