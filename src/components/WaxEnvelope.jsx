import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import "./WaxEnvelope.css";

export default function WaxEnvelope({ onOpen, isOpened, children }) {
  const [opening, setOpening] = useState(false);

  function handleSealClick() {
    if (isOpened || opening) return;
    setOpening(true);
    setTimeout(() => {
      onOpen();
      setOpening(false);
    }, 700);
  }

  return (
    <div className={`wax-envelope-wrapper ${isOpened ? "is-opened" : ""}`}>
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="envelope-container"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.5 } }}
            onClick={handleSealClick}
          >
            {/* Ambient envelope glow */}
            <div className="envelope-glow" aria-hidden="true" />

            <div className="envelope-pocket">
              {/* Envelope back paper edge peaking out */}
              <div className="envelope-letter-peek">
                <span>Dear Mounika... ♡</span>
              </div>

              {/* 3D Envelope Flap */}
              <div className={`envelope-flap ${opening ? "flap-open" : ""}`}>
                <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path d="M 0 0 L 150 115 L 300 0 Z" fill="#351a2f" />
                  <path d="M 0 0 L 150 115 L 300 0" stroke="rgba(255, 216, 231, 0.3)" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* Envelope Body Front Triangles */}
              <svg className="envelope-front-cuts" viewBox="0 0 300 200" preserveAspectRatio="none">
                {/* Left fold */}
                <polygon points="0,0 150,110 0,200" fill="#2d1527" opacity="0.95" />
                {/* Right fold */}
                <polygon points="300,0 150,110 300,200" fill="#2d1527" opacity="0.95" />
                {/* Bottom fold */}
                <polygon points="0,200 150,95 300,200" fill="#3b1c34" />
                {/* Subtle borders */}
                <polyline points="0,0 150,110 300,0" stroke="rgba(255, 216, 231, 0.25)" strokeWidth="1" fill="none" />
                <polyline points="0,200 150,95 300,200" stroke="rgba(255, 216, 231, 0.3)" strokeWidth="1" fill="none" />
              </svg>

              {/* Embossed Wax Seal Button */}
              <motion.button
                type="button"
                className={`wax-seal ${opening ? "seal-cracking" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSealClick();
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Crack the golden-rose wax seal to open your letter"
              >
                <div className="seal-ring">
                  <div className="seal-emblem">
                    <Heart size={16} fill="currentColor" />
                  </div>
                </div>
                <span className="seal-shine" />
              </motion.button>
            </div>

            {/* Teaser prompt under envelope */}
            <div className="envelope-hint">
              <Sparkles size={14} />
              <span>Tap the wax seal to open your letter</span>
              <Sparkles size={14} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* When opened, smoothly slides out the actual typewriter letter card */}
      {isOpened && (
        <motion.div
          className="envelope-unfolded-letter"
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
