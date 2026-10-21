import { motion } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";
import "./VinylPlayer.css";

export default function VinylPlayer({ song, isPlaying, onToggle }) {
  return (
    <div className="vinyl-player-widget single-player">
      <div
        className={`turntable-deck ${isPlaying ? "is-deck-playing" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause our special song" : "Play our special song"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="vinyl-groove-stage">
          {/* Vinyl Disc */}
          <div className={`vinyl-disc ${isPlaying ? "spinning" : "paused"}`}>
            {/* Gloss sheen lines */}
            <div className="vinyl-sheen-highlight" />
            <div className="vinyl-ring ring-1" />
            <div className="vinyl-ring ring-2" />
            <div className="vinyl-ring ring-3" />

            {/* Center label */}
            <div className="vinyl-center-label">
              <span className="vinyl-heart">♡</span>
              <span className="vinyl-label-text">Mounika</span>
            </div>
          </div>

          {/* Tonearm needle */}
          <div className={`turntable-tonearm ${isPlaying ? "arm-playing" : "arm-parked"}`}>
            <div className="tonearm-pivot" />
            <div className="tonearm-bar" />
            <div className="tonearm-head" />
          </div>
        </div>

        {/* Current song playing info & equalizer waves */}
        <div className="turntable-info">
          <div className="turntable-header">
            <span className="now-playing-badge">
              <Music2 size={13} />
              {isPlaying ? "NOW PLAYING" : "OUR SONG"}
            </span>
            {isPlaying && (
              <div className="sound-wave-bars" aria-label="Audio visualizer bars">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
                <span className="bar bar-4" />
                <span className="bar bar-5" />
              </div>
            )}
          </div>

          <h4 className="current-track-title">{song.title}</h4>
          <span className="current-track-artist">{song.artist}</span>
        </div>

        {/* Big prominent play/pause button right inside the deck */}
        <motion.button
          type="button"
          className={`vinyl-single-play-btn ${isPlaying ? "playing" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
        </motion.button>
      </div>
    </div>
  );
}
