import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Gift,
  Sparkles,
  RotateCcw,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";
import HeartTree from "./components/HeartTree";
import SparkleTrail from "./components/SparkleTrail";
import WaxEnvelope from "./components/WaxEnvelope";
import AnimatedCandle from "./components/AnimatedCandle";
import VinylPlayer from "./components/VinylPlayer";
import PhotoDevelopingReveal from "./components/PhotoDevelopingReveal";
import SceneTransitionBreeze from "./components/SceneTransitionBreeze";
import "./App.css";

const song = {
  title: "Our Special Song",
  artist: "For Mounika ♡",
  file: "/music/fav_song.mp3",
};

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
  "Happy Birthday my Mounika. Thank you for every laugh, every little memory, and every moment you made better just by being there. I hope this new year of your life brings you the happiness, peace, love, and beautiful surprises you deserve. Always remember how loved you are. ♡";

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
  const [letterOpened, setLetterOpened] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [secretOpened, setSecretOpened] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);
  const audioRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (scene !== 2 || !letterOpened) return undefined;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedMessage(personalMessage.slice(0, index));
      if (index >= personalMessage.length) window.clearInterval(timer);
    }, 28);

    return () => window.clearInterval(timer);
  }, [scene, letterOpened]);

  useEffect(() => {
    if (scene === 2 && letterOpened) {
      messageRef.current?.focus({ preventScroll: true });
    }
  }, [scene, letterOpened]);

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

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = song.file;
      audio.load();
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback to .mpeg if needed
          audio.src = "/music/fav_song.mpeg";
          audio.load();
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              setIsPlaying(false);
            });
        });
    }
  }

  function replaySurprise() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setScene(0);
    setGiftOpened(false);
    setLetterOpened(false);
    setTypedMessage("");
    setIsPlaying(false);
    setCandleLit(true);
    setSecretOpened(false);
    setPhotoRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const sceneNames = ["Surprise", "Birthday", "Your letter", "One last surprise"];

  return (
    <main className="birthday-app">
      {/* Magic Pointer / Touch Sparkle Stardust Trail */}
      <SparkleTrail />

      {/* Gentle Rose Petal & Sparkle Breeze on scene transition */}
      <SceneTransitionBreeze triggerKey={scene} />

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
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
          <Heart size={17} fill="currentColor" /> a little letter
        </a>
        <span className="scene-counter">{String(scene + 1).padStart(2, "0")} / 04</span>
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
            <h1 className="hero-title">Mounika<br /><em>something is waiting</em></h1>
            <p className="hero-subtitle">
              A tiny surprise for someone who makes ordinary days feel magical.
            </p>

            {/* Tree with heart leaves animation */}
            <HeartTree onCelebrate={burstConfetti} />

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

            <div className="tiny-decor" aria-hidden="true">🌷 </div>
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
            <h1 className="birthday-title">Happy Birthday,<br /><em>Mounika</em></h1>
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
            <h2 className="section-title">My wishes  <em>for you</em></h2>

            {/* 3D Wax Seal Envelope wrapper */}
            <WaxEnvelope
              isOpened={letterOpened}
              onOpen={() => {
                setLetterOpened(true);
                burstConfetti();
              }}
            >
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
                <div className="letter-signoff">with all my love, Diva ♡</div>
                <span className="letter-flower" aria-hidden="true">🌷</span>
              </div>
            </WaxEnvelope>

            <div className="scene-actions">
              <button className="primary-button" type="button" onClick={() => goToScene(3)}>
                One last surprise <Gift size={17} />
              </button>
              <button className="text-button" type="button" onClick={() => goToScene(1)}>← Back to birthday</button>
            </div>
          </motion.section>
        )}

        {scene === 3 && (
          <motion.section
            key="final"
            className="scene final-scene"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">scene 04 · one last surprise</span>
            <h2 className="section-title">Make a wish, <em>birthday star.</em></h2>
            <p className="section-description">Take a little moment just for yourself.</p>

            {/* Realistic Candle with Flickering Flame & Smoke Blow-Out */}
            <AnimatedCandle
              isLit={candleLit}
              onToggle={() => {
                const nextState = !candleLit;
                setCandleLit(nextState);
                if (!candleLit) burstConfetti();
              }}
            />

            <div className="final-gift-wrap">
              <motion.div
                className="final-gift-emoji"
                animate={secretOpened ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : { y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: secretOpened ? 0 : Infinity }}
                aria-hidden="true"
              >
                {secretOpened ? "💌" : "🎁"}
              </motion.div>
              <h3>{secretOpened ? "A few words from my heart" : "There's one more little secret..."}</h3>
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
                  <div className="promise-message">
                    <p>For a long time, I’ve been thinking about telling you this. Thank you for everything, ma. ❤️</p>
                    <p>You are the first girl who made me feel what it’s like to be loved by a girl. You are my first love, like a mutual one-sided love. 😅 Thank you for showing me love, feelings, and care. I don’t know whether it was real or fake, but I felt that everything was genuine, and I truly felt your love.</p>
                    <p>We stopped talking, and I guess everything is fate. But my care for you will never stop. You used to message me once a week and ask how I was and whether I had eaten. But in recent months, you haven’t been asking me anymore. I’m the only one who keeps asking you now. That’s not a problem, though. 😅 Maybe you’re busy, and that’s okay.</p>
                    <p>Anyway, take care. That’s all I can say. If I say anything more, you might not like it.</p>
                    <p>I wanted to send you a gift, but you don’t even like it when I message or call you. So, I thought you might get really angry if I sent you a gift, and your family might ask you questions too. That’s why I chose a small gift that I could manage to send you. I hope you like it. 😅</p>
                    <p>Also, remember you once asked me to dedicate a song to you? That’s why I’ve added a song below. It’s my favourite song, and whenever I hear it playing, you’re the only person who comes to my mind. This song is for you. ❤️</p>
                    <p>I’ve also attached a small photo at the end. That photo was on my friend’s phone, and I thought it might be a little surprise for you. That’s why I added it at the end.</p>
                    <p>That’s it. This is my little gift for your birthday. ❤️</p>
                    <p>If you ever get married in the future, send me an invitation. I’ll come.</p>
                    <p>The reason I’m sending such a long message is that I can’t keep waiting for your messages anymore. Not only that, but I also feel like I’m disturbing you. That’s why I wanted to tell you everything in this one message.</p>
                    <p>Be happy, eat well, and take care of yourself.</p>

                    {/* One line gap before In telugu */}
                    <div className="promise-line-gap" aria-hidden="true" />

                    <p className="telugu-label">In telugu,</p>
                    <p>Chala rojula nunchi neeku ee vishayam cheppalani anukuntu unna. Thank you for everything ma ❤️.</p>
                    <p>Oka ammayi love chesthe ela untundo naaku feel ayyela chesina first ammayivi nuvve. Nuvve naa first love, mana iddari madhya oka rakamaina double side love la anipinchindi 😅. Naaku love, feelings, care chupinchinanduku chala thanks. Adhi real aa fake aa naaku teliyadhu, kaani naaku avanni nijamaina feelings laane anipinchayi. Nee love ni nenu feel ayyanu.</p>
                    <p>Manam maatladukovadam aapesam. Antha fate anukuntunna. Kaani nee meeda naaku unna care maatram eppatiki aagadhu.</p>
                    <p>Weekly once nuvvu naaku message chesi, "Ela unnavu? Tinnava?" ani adige daanivi. Kaani recent months nunchi nuvvu ala adagadam ledhu. Ippudu nenu maatrame ninnu adugutunna. Adhi kuda naaku problem em kaadhu 😅. Nuvvu busy ga untav ani ardham chesukuntunna. It's okay.</p>
                    <p>Anyways, take care. Anthakante ekkuva emi cheppalenu. Daani kante ekkuva edhaina chepthe neeku nachadhu.</p>
                    <p>Neeku edhaina gift pampinchalani anukunna. Kaani nenu neeku message cheyadam, call cheyadam kuda neeku nachadhu. Anduke gift pampisthe nuvvu chala kopam padathavemo ani anipinchindi. Adhi maatrame kaakunda, mee intlo kuda edhaina adugutharemo. Anduke naa valla ayina oka chinna gift pampisthunna. Neeku nachuthundani anukuntunna 😅.</p>
                    <p>Inka, naaku oka song dedicate cheyyamani nuvvu adigavu kadha, gurthundha? Anduke kinda oka song add chesanu. Adhi naa favourite song. Eppudaina aa song play ayina, naa mind lo gurthochedhi nuvve. This song is for you ❤️.</p>
                    <p>Last lo oka chinna photo kuda attach chesanu. Aa photo naa friend phone lo undhi. Neeku oka surprise la untundani anukuni last lo pettanu.</p>
                    <p>Anthe. Idhi nee birthday kosam naa chinna gift 🎂❤️.</p>
                    <p>Future lo neeku marriage fix ayithe naaku invitation pampinchu. Nenu kachithanga vasthanu.</p>
                    <p>Enduku intha pedda message pampinchanu ante, ika nee message kosam wait chesthu undadam naa valla avvatledhu. Adhi maatrame kaakunda, nenu ninnu disturb chesthunnana ani kuda anipisthundhi. Anduke naa manasulo unna vishayalanni ee okka pedda message lo cheppesa.</p>
                    <p>Happy ga undu, baaga thinu, jagrathaga undu ☺️❤️.</p>
                  </div>
                  <span className="promise-signoff">Friends by chance, family by heart. ♡</span>

                  {/* Spinning Vintage Vinyl Record Player with Sound Waves */}
                  <div className="card-music-section">
                    <VinylPlayer
                      song={song}
                      isPlaying={isPlaying}
                      onToggle={toggleMusic}
                    />
                  </div>

                  {/* Instant Film "Photo Developing" Reveal with Flash & Shake Magic */}
                  <PhotoDevelopingReveal
                    photoRevealed={photoRevealed}
                    onReveal={() => setPhotoRevealed(true)}
                    onCelebrate={burstConfetti}
                  />
                </motion.div>
              )}
            </div>

            <div className="scene-actions">
              <button className="replay-button" type="button" onClick={replaySurprise}>
                <RotateCcw size={16} /> Replay the whole surprise
              </button>
              <button className="text-button" type="button" onClick={() => goToScene(2)}>
                ← Back to letter
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
