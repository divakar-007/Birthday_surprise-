import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./AnimatedCandle.css";

export default function AnimatedCandle({ isLit, onToggle }) {
  const [justBlown, setJustBlown] = useState(false);

  function handleClick() {
    if (isLit) {
      setJustBlown(true);
      setTimeout(() => setJustBlown(false), 2400);
    }
    onToggle();
  }

  return (
    <div className="candle-stage-container">
      <div className="candle-holder" onClick={handleClick} role="button" tabIndex={0} aria-label={isLit ? "Blow out candle flame" : "Relight candle"}>
        {/* Ambient flame halo glow */}
        <div className={`flame-ambient-halo ${isLit ? "active" : ""}`} aria-hidden="true" />

        {/* Smoke wisps after blowing out */}
        <AnimatePresence>
          {justBlown && (
            <div className="smoke-cluster" aria-hidden="true">
              <span className="smoke-wisp wisp-1" />
              <span className="smoke-wisp wisp-2" />
              <span className="smoke-wisp wisp-3" />
            </div>
          )}
        </AnimatePresence>

        {/* SVG Candle Illustration */}
        <svg className="candle-svg" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Candle wax gradient */}
            <linearGradient id="waxGrad" x1="50" y1="80" x2="50" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff2f7" />
              <stop offset="60%" stopColor="#ffd8e5" />
              <stop offset="100%" stopColor="#e8b1c4" />
            </linearGradient>

            {/* Candle flame gradient */}
            <linearGradient id="flameGrad" x1="50" y1="65" x2="50" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff4d00" />
              <stop offset="35%" stopColor="#ff9900" />
              <stop offset="70%" stopColor="#ffea00" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Flame glow filter */}
            <filter id="flameGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Golden candle base plate */}
          <ellipse cx="50" cy="148" rx="38" ry="8" fill="rgba(245, 217, 165, 0.4)" />
          <ellipse cx="50" cy="146" rx="32" ry="5" fill="#f5d9a5" />
          <ellipse cx="50" cy="145" rx="28" ry="4" fill="#d9b679" />

          {/* Candle Body */}
          <path
            d="M 38 82 
               L 38 144 
               C 38 147, 62 147, 62 144 
               L 62 82 
               C 62 80, 38 80, 38 82 Z"
            fill="url(#waxGrad)"
          />

          {/* Top rim of candle */}
          <ellipse cx="50" cy="82" rx="12" ry="3.5" fill="#ffe2ed" />

          {/* Wax Drip Accent */}
          <path
            d="M 40 83 
               C 40 92, 43 96, 43 99
               C 43 101, 41 103, 40 102
               C 39 100, 39 88, 39 83 Z"
            fill="#ffffff"
            opacity="0.8"
          />

          {/* Braided Wick */}
          <path d="M 50 82 Q 49 74, 50 68" stroke="#3d262e" strokeWidth="2" strokeLinecap="round" />

          {/* Dancing Flame */}
          {isLit && (
            <motion.g
              className="dancing-flame"
              filter="url(#flameGlowFilter)"
              animate={{
                scaleY: [1, 1.12, 0.94, 1.08, 1],
                scaleX: [1, 0.92, 1.05, 0.95, 1],
                rotate: [-2, 3, -1, 2, -2],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "50px", originY: "68px" }}
            >
              {/* Outer flame */}
              <path
                d="M 50 68 
                   C 42 64, 40 50, 47 38 
                   C 48 30, 50 24, 50 20 
                   C 50 24, 52 30, 53 38 
                   C 60 50, 58 64, 50 68 Z"
                fill="url(#flameGrad)"
              />
              {/* Inner white-hot core */}
              <ellipse cx="50" cy="56" rx="3.5" ry="7" fill="#ffffff" opacity="0.9" />
              {/* Blue spark base */}
              <ellipse cx="50" cy="66" rx="3" ry="1.5" fill="#66b2ff" opacity="0.75" />
            </motion.g>
          )}
        </svg>
      </div>

      <button
        type="button"
        className={`candle-interactive-button ${isLit ? "is-burning" : "is-extinguished"}`}
        onClick={handleClick}
        aria-pressed={isLit}
      >
        <Sparkles size={16} />
        <span>
          {isLit
            ? "Make a wish & blow out the candle ✨"
            : "Your wish is glowing in the stars! (Tap to relight) 🕯️"}
        </span>
      </button>
    </div>
  );
}
