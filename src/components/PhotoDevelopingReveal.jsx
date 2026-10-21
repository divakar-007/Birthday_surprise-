import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, Heart, Wand2, Maximize2, X } from "lucide-react";
import "./PhotoDevelopingReveal.css";

export default function PhotoDevelopingReveal({ photoRevealed, onReveal, onCelebrate }) {
  const [developing, setDeveloping] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // Close lightbox on Escape key and prevent background scroll when open
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setFullScreen(false);
      }
    }
    if (fullScreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullScreen]);

  function handleOpen() {
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    setDeveloping(true);
    onReveal();
    if (onCelebrate) onCelebrate();
    setTimeout(() => {
      setDeveloping(false);
    }, 2200);
  }

  function handleShake() {
    setShaking(true);
    if (onCelebrate) onCelebrate();
    setTimeout(() => setShaking(false), 800);
  }

  return (
    <div className="photo-develop-wrapper">
      {/* Camera Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="camera-flash-overlay"
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Full-screen Lightbox Modal (Full 16:9 / 9:16 Portrait resolution) */}
      <AnimatePresence>
        {fullScreen && (
          <motion.div
            className="photo-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Full size photo view"
          >
            <motion.div
              className="photo-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setFullScreen(false)}
                aria-label="Close full size photo"
              >
                <X size={20} />
              </button>
              <img
                src="/photos/surpriseimage.jpg.jpeg"
                alt="Full size memory with Mounika"
                className="lightbox-full-img"
                onError={(event) => {
                  if (event.currentTarget.src.includes("surpriseimage")) {
                    event.currentTarget.src = "/photos/surprise.jpg";
                  }
                }}
              />
              <span className="lightbox-caption">My favourite memory with you ♡</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="card-photo-header">
        <div className="card-photo-icon" aria-hidden="true">
          <Camera size={18} />
        </div>
        <div>
          <h4>One tiny special memory</h4>
          <span className="card-photo-subtitle">A little surprise waiting just for you ♡</span>
        </div>
      </div>

      {!photoRevealed ? (
        <motion.button
          type="button"
          className="reveal-photo-button"
          onClick={handleOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-expanded={photoRevealed}
        >
          <span className="reveal-photo-sparkle">📸</span>
          <span>Open surprise photo (Full Size) ✨</span>
          <Heart size={16} fill="currentColor" />
        </motion.button>
      ) : (
        <motion.div
          className="surprise-photo-card"
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Polaroid Frame */}
          <motion.figure
            className={`developing-polaroid ${shaking ? "shaking-film" : ""}`}
            animate={shaking ? { rotate: [-4, 4, -3, 3, 0], x: [-6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Developing chemical overlay status badge */}
            {developing && (
              <div className="developing-badge">
                <Sparkles size={13} className="spin-slow" />
                <span>Developing instant film...</span>
              </div>
            )}

            {/* Clickable Image Container (supports 9:16 full-ratio view & zoom) */}
            <div
              className="film-image-container"
              onClick={() => setFullScreen(true)}
              title="Click to view full screen"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFullScreen(true);
                }
              }}
            >
              <img
                src="/photos/surpriseimage.jpg.jpeg"
                alt="Our surprise friendship photo"
                className={`film-photo ${developing ? "is-developing" : "is-developed"}`}
                loading="lazy"
                onError={(event) => {
                  if (event.currentTarget.src.includes("surpriseimage")) {
                    event.currentTarget.src = "/photos/surprise.jpg";
                  } else {
                    event.currentTarget.style.display = "none";
                    if (event.currentTarget.nextElementSibling) {
                      event.currentTarget.nextElementSibling.style.display = "grid";
                    }
                  }
                }}
              />
              <div className="photo-placeholder" aria-hidden="true">
                📷<span>Add /photos/surpriseimage.jpg.jpeg</span>
              </div>

              <span className="film-zoom-badge" aria-hidden="true">
                <Maximize2 size={12} /> Tap to expand
              </span>
            </div>

            <figcaption>My favourite memory with you ♡</figcaption>
          </motion.figure>

          {/* Interactive Shake Button */}
          <div className="film-actions">
            <button
              type="button"
              className="shake-film-btn"
              onClick={handleShake}
              title="Shake the Polaroid like real instant film!"
            >
              <Wand2 size={13} /> Shake photo magic ✨
            </button>
            <p className="photo-revealed-note">Keep smiling, always cheering for you 🌷</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
