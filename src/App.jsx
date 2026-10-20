import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Music2,
  Play,
  Pause,
  Gift,
  Sparkles,
  RotateCcw,
  ChevronDown,
  LockKeyhole,
  Volume2,
} from "lucide-react";
import "./App.css";

const memories = [
  { image: "/photos/memory1.jpg", caption: "A memory I'll always keep ♡", tilt: "-5deg" },
  { image: "/photos/memory2.jpg", caption: "My favourite kind of chaos", tilt: "4deg" },
  { image: "/photos/memory3.jpg", caption: "Us being us ✨", tilt: "-3deg" },
  { image: "/photos/memory4.jpg", caption: "More memories to come", tilt: "5deg" },
];

const songs = [
  { title: "Our favourite song", artist: "Song artist", file: "/music/song1.mp3" },
  { title: "A song that feels like us", artist: "Song artist", file: "/music/song2.mp3" },
  { title: "One for the memories", artist: "Song artist", file: "/music/song3.mp3" },
];

const decorations = [
  { symbol: "🌹", left: "5%", delay: "0s" },
  { symbol: "🦋", left: "17%", delay: "2s" },
  { symbol: "💗", left: "31%", delay: "4s" },
  { symbol: "🌸", left: "46%", delay: "1s" },
  { symbol: "✨", left: "61%", delay: "3s" },
  { symbol: "🦋", left: "76%", delay: "5s" },
  { symbol: "🌹", left: "91%", delay: "2.5s" },
];

const personalMessage =
  "Happy Birthday my divakar. Thank you for every laugh, every little memory, and every moment you made better just by being there. I hope this new year of your life brings you the happiness, peace, love, and beautiful surprises you deserve. Always remember how loved you are. ♡";

function burstConfetti() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  confetti({
    particleCount: isMobile ? 80 : 120,
    spread: isMobile ? 70 : 90,
    origin: { y: 0.65 },
    colors: ["#ff7fa5", "#ffd6e4", "#fff0b3", "#ffffff", "#c8a7ff"],
  });
}

export default function App() {
  const [scene, setScene] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [candleLit, setCandleLit] = useState(false);
  const [secretOpened, setSecretOpened] = useState(false);
  const audioRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (scene !== 2) return undefined;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedMessage(personalMessage.slice(0, index));
      if (index >= personalMessage.length) window.clearInterval(timer);
    }, 28);

    return () => window.clearInterval(timer);
  }, [scene]);

  useEffect(() => {
    if (scene === 2) {
      messageRef.current?.focus({ preventScroll: true });
    }
  }, [scene]);

  function goToScene(nextScene) {
    if (nextScene === 2) {
      setTypedMessage("");
    }
    setScene(nextScene);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openGift() {
    setGiftOpened(true);
    setScene(1);
    burstConfetti();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleSong(index) {
    const audio = audioRef.current;

    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }

    audio.pause();
    audio.src = songs[index].file;
    audio.load();

    audio.play()
      .then(() => setPlayingIndex(index))
      .catch(() => {
        setPlayingIndex(null);
        window.alert(
          `Couldn't play "${songs[index].title}". Add the MP3 file at ${songs[index].file} and try again.`
        );
      });
  }

  function replaySurprise() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setScene(0);
    setGiftOpened(false);
    setTypedMessage("");
    setPlayingIndex(null);
    setCandleLit(false);
    setSecretOpened(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const sceneNames = ["Surprise", "Birthday", "Your letter", "Memories", "Final surprise"];

  return (
    <main className="birthday-app">
      <audio
        ref={audioRef}
        onEnded={() => setPlayingIndex(null)}
        onPause={() => setPlayingIndex(null)}
        onPlay={() => {
          const audio = audioRef.current;
          const index = songs.findIndex((song) => song.file === audio?.src?.split(window.location.origin)[1]);
          if (index >= 0) setPlayingIndex(index);
        }}
      />

      <div className="fairy-lights" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>

      <div className="floating-decorations" aria-hidden="true">
        {decorations.map((item, index) => (
          <span
            className="floating-decoration"
            key={`${item.symbol}-${index}`}
            style={{ left: item.left, animationDelay: item.delay }}
          >
            {item.symbol}
          </span>
        ))}
      </div>

      <header className="top-bar">
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); goToScene(0); }}>
          <Heart size={17} fill="currentColor" /> a little love letter
        </a>
        <span className="scene-counter">{String(scene + 1).padStart(2, "0")} / 05</span>
      </header>

      <nav className="scene-nav" aria-label="Birthday story scenes">
        {sceneNames.map((name, index) => (
          <button
            type="button"
            key={name}
            className={scene === index ? "scene-dot active" : "scene-dot"}
            onClick={() => goToScene(index)}
            aria-label={`Go to scene ${index + 1}: ${name}`}
            aria-current={scene === index ? "step" : undefined}
            title={name}
          />
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {scene === 0 && (
          <motion.section
            key="entrance"
            className="scene hero-scene"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow"><Sparkles size={15} /> made with love, just for you</span>
            <h1 className="hero-title">Psst...<br /><em>something is waiting</em></h1>
            <p className="hero-subtitle">
              A tiny surprise for someone who makes ordinary days feel magical.
            </p>

            <motion.button
              className={`gift-button ${giftOpened ? "opened" : ""}`}
              type="button"
              onClick={openGift}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Open your birthday surprise"
            >
              <motion.span
                className="gift-emoji"
                animate={giftOpened ? { rotate: [0, -12, 12, 0], y: -10 } : { y: [0, -7, 0] }}
                transition={{ duration: 1.6, repeat: giftOpened ? 0 : Infinity }}
              >
                🎁
              </motion.span>
              <span>{giftOpened ? "Surprise opened!" : "Open your surprise"}</span>
              <Heart size={17} fill="currentColor" />
            </motion.button>

            <div className="tiny-decor" aria-hidden="true">🌷 🧸 🐼 🌷</div>
            <p className="soft-note">Best experienced with a little music ♡</p>
          </motion.section>
        )}

        {scene === 1 && (
          <motion.section
            key="birthday"
            className="scene birthday-scene"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">today is all about you</span>
            <div className="birthday-illustration" aria-hidden="true">
              <span className="cake-sparkle sparkle-one">✦</span>
              <span className="cake-sparkle sparkle-two">✧</span>
              <div className="cake-candles"><span>🕯️</span><span>🕯️</span><span>🕯️</span></div>
              <div className="cake">🎂</div>
              <div className="birthday-friends">🧸 <span>💗</span> 🐼</div>
            </div>
            <h1 className="birthday-title">Happy Birthday,<br /><em>Divakar</em></h1>
            <p className="hero-subtitle">
              Today, the world gets to celebrate the wonderful human you are.
            </p>
            <button className="primary-button" type="button" onClick={() => goToScene(2)}>
              Read your little letter <Heart size={17} fill="currentColor" />
            </button>
            <button className="text-button" type="button" onClick={() => goToScene(2)}>
              <ChevronDown size={16} /> continue the story
            </button>
          </motion.section>
        )}

        {scene === 2 && (
          <motion.section
            key="letter"
            className="scene letter-scene"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">scene 03 · words from my heart</span>
            <h2 className="section-title">A little letter <em>for you</em></h2>
            <div className="letter-card">
              <div className="letter-top">To my favourite person, <span>♡</span></div>
              <p
                className="typed-message"
                ref={messageRef}
                tabIndex={-1}
                aria-label={personalMessage}
              >
                {typedMessage}<span className="typing-cursor" aria-hidden="true">|</span>
              </p>
              <div className="letter-signoff">with all my love, always ♡</div>
              <span className="letter-flower" aria-hidden="true">🌷</span>
            </div>
            <div className="scene-actions">
              <button className="primary-button" type="button" onClick={() => goToScene(3)}>
                Open our memories <Heart size={17} />
              </button>
              <button className="text-button" type="button" onClick={() => goToScene(1)}>← Back to birthday</button>
            </div>
          </motion.section>
        )}

        {scene === 3 && (
          <motion.section
            key="gallery"
            className="scene gallery-scene"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">scene 04 · tiny moments, forever memories</span>
            <h2 className="section-title">Our little <em>scrapbook</em></h2>
            <p className="section-description">Four little spaces for memories I never want to forget.</p>

            <div className="polaroid-grid">
              {memories.map((memory, index) => (
                <motion.figure
                  className="polaroid"
                  key={memory.image}
                  style={{ "--tilt": memory.tilt }}
                  whileHover={{ y: -7, rotate: 0, scale: 1.03 }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                >
                  <img
                    src={memory.image}
                    alt={`Friendship memory ${index + 1}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      if (event.currentTarget.nextElementSibling) {
                        event.currentTarget.nextElementSibling.style.display = "grid";
                      }
                    }}
                  />
                  <div className="photo-placeholder" aria-hidden="true">📷<span>Add our photo</span></div>
                  <figcaption>{memory.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
            <p className="photo-tip">♡ Replace the sample photo paths with your own pictures.</p>
            <div className="scene-actions">
              <button className="primary-button" type="button" onClick={() => goToScene(4)}>
                One last surprise <Gift size={17} />
              </button>
              <button className="text-button" type="button" onClick={() => goToScene(2)}>← Back to letter</button>
            </div>
          </motion.section>
        )}

        {scene === 4 && (
          <motion.section
            key="final"
            className="scene final-scene"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">scene 05 · a special surprise for you</span>
            <h2 className="section-title">Make a wish, <em>birthday star.</em></h2>
            <p className="section-description">Take a little moment just for yourself.</p>

            <button
              type="button"
              className={`candle-button ${candleLit ? "is-lit" : ""}`}
              onClick={() => {
                setCandleLit((current) => !current);
                if (!candleLit) burstConfetti();
              }}
              aria-pressed={candleLit}
            >
              <span className="candle-emoji" aria-hidden="true">{candleLit ? "🕯️✨" : "🕯️"}</span>
              <span>{candleLit ? "Your wish is glowing!" : "Light your birthday candle"}</span>
            </button>

            <div className="final-gift-wrap">
              <motion.div
                className="final-gift-emoji"
                animate={secretOpened ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : { y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: secretOpened ? 0 : Infinity }}
                aria-hidden="true"
              >
                {secretOpened ? "💌" : "🎁"}
              </motion.div>
              <h3>{secretOpened ? "A promise from me to you" : "There's one more little secret..."}</h3>
              {!secretOpened ? (
                <button className="primary-button" type="button" onClick={() => { setSecretOpened(true); burstConfetti(); }}>
                  <LockKeyhole size={17} /> Open your final gift
                </button>
              ) : (
                <motion.div
                  className="promise-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>
                    I promise to celebrate your wins, listen when life feels heavy,
                    laugh with you over the silliest things, and keep making beautiful
                    memories with you. We may grow and change, but I hope our friendship
                    always has a little corner that feels like home. No matter what,
                    you will always have someone cheering for you. 🤍
                  </p>
                  <span className="promise-signoff">Friends by chance, family by heart. ♡</span>

                  <div className="card-music-section">
                    <div className="card-music-heading">
                      <div className="card-music-icon" aria-hidden="true">
                        <Music2 size={18} />
                      </div>
                      <div>
                        <h4>Our little soundtrack</h4>
                        <span className="card-music-subtitle">Press play to listen to our special songs ♫</span>
                      </div>
                    </div>

                    <div className="song-list">
                      {songs.map((song, index) => (
                        <div
                          className={`song-row ${playingIndex === index ? "is-playing" : ""}`}
                          key={song.file}
                        >
                          <span className="song-number">{String(index + 1).padStart(2, "0")}</span>
                          <div className="song-info">
                            <strong>{song.title}</strong>
                            <span>{song.artist}</span>
                          </div>
                          <button
                            type="button"
                            className="play-button"
                            onClick={() => toggleSong(index)}
                            aria-label={`${playingIndex === index ? "Pause" : "Play"} ${song.title}`}
                          >
                            {playingIndex === index ? <Pause size={18} /> : <Play size={18} />}
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="music-help">
                      <Volume2 size={14} /> Add your favourite MP3 files to make this playlist yours.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="final-animals" aria-label="A teddy bear, panda, and flowers">
              
            </div>

            <div className="scene-actions">
              <button className="replay-button" type="button" onClick={replaySurprise}>
                <RotateCcw size={16} /> Replay the whole surprise
              </button>
              <button className="text-button" type="button" onClick={() => goToScene(3)}>
                ← Back to our memories
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="page-footer">
        <span>made with <Heart size={13} fill="currentColor" /> and a little bit of magic</span>
        <span>for you, always ✿</span>
      </footer>
    </main>
  );
}
