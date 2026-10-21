import { motion } from "framer-motion";
import "./SceneTransitionBreeze.css";

const petals = [
  { id: 1, symbol: "🌸", startX: "-10vw", startY: "80vh", endX: "110vw", endY: "10vh", dur: 1.2, delay: 0 },
  { id: 2, symbol: "🌹", startX: "-5vw", startY: "65vh", endX: "105vw", endY: "-5vh", dur: 1.4, delay: 0.08 },
  { id: 3, symbol: "💗", startX: "10vw", startY: "95vh", endX: "115vw", endY: "25vh", dur: 1.1, delay: 0.15 },
  { id: 4, symbol: "✨", startX: "-15vw", startY: "50vh", endX: "105vw", endY: "5vh", dur: 1.3, delay: 0.05 },
  { id: 5, symbol: "🌸", startX: "0vw", startY: "70vh", endX: "110vw", endY: "15vh", dur: 1.25, delay: 0.2 },
  { id: 6, symbol: "🦋", startX: "-8vw", startY: "85vh", endX: "115vw", endY: "30vh", dur: 1.5, delay: 0.12 },
  { id: 7, symbol: "✧", startX: "5vw", startY: "60vh", endX: "100vw", endY: "0vh", dur: 1.15, delay: 0.25 },
  { id: 8, symbol: "🌹", startX: "-12vw", startY: "40vh", endX: "108vw", endY: "-10vh", dur: 1.35, delay: 0.18 },
];

export default function SceneTransitionBreeze({ triggerKey }) {
  // Keyed container automatically remounts and replays animation whenever triggerKey changes
  return (
    <div className="scene-breeze-overlay" aria-hidden="true" key={triggerKey}>
      {petals.map((p) => (
        <motion.span
          key={`${triggerKey}-${p.id}`}
          className="breeze-petal"
          initial={{
            x: p.startX,
            y: p.startY,
            opacity: 0,
            rotate: 0,
            scale: 0.6,
          }}
          animate={{
            x: p.endX,
            y: p.endY,
            opacity: [0, 0.95, 0.95, 0],
            rotate: [0, 180, 360],
            scale: [0.6, 1.2, 1, 0.8],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}
