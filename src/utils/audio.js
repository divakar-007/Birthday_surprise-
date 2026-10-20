// Lightweight Web Audio API music box synthesizer for birthday melody
// Runs 100% locally with zero external network requests and works on all mobile/desktop browsers.

class MusicBox {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timeoutId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, startTime, duration = 0.8) {
    if (!this.ctx) return;

    try {
      // Main music box chime tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft harmonic chime overtone for music box realism
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, startTime);

      // Delicate pluck envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      overtoneGain.gain.setValueAtTime(0.0001, startTime);
      overtoneGain.gain.exponentialRampToValueAtTime(0.06, startTime + 0.015);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      overtone.connect(overtoneGain);
      overtoneGain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);

      overtone.start(startTime);
      overtone.stop(startTime + duration * 0.6);
    } catch {
      // Graceful fallback if audio context fails
    }
  }

  playSong() {
    if (!this.isPlaying) return;
    this.init();
    if (!this.ctx) return;

    const beat = 0.44;
    const now = this.ctx.currentTime + 0.05;

    const G4 = 392.00;
    const A4 = 440.00;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;
    const G5 = 783.99;

    const melody = [
      // Happy birthday to you
      { f: G4, d: 0.75 }, { f: G4, d: 0.25 }, { f: A4, d: 1 }, { f: G4, d: 1 }, { f: C5, d: 1 }, { f: B4, d: 2 },
      // Happy birthday to you
      { f: G4, d: 0.75 }, { f: G4, d: 0.25 }, { f: A4, d: 1 }, { f: G4, d: 1 }, { f: D5, d: 1 }, { f: C5, d: 2 },
      // Happy birthday dear friend
      { f: G4, d: 0.75 }, { f: G4, d: 0.25 }, { f: G5, d: 1 }, { f: E5, d: 1 }, { f: C5, d: 1 }, { f: B4, d: 1 }, { f: A4, d: 1.5 },
      // Happy birthday to you
      { f: F5, d: 0.75 }, { f: F5, d: 0.25 }, { f: E5, d: 1 }, { f: C5, d: 1 }, { f: D5, d: 1 }, { f: C5, d: 2.5 }
    ];

    let current = now;
    melody.forEach(({ f, d }) => {
      this.playTone(f, current, d * beat * 1.6);
      current += d * beat;
    });

    const totalDuration = (current - now) * 1000 + 2000;
    this.timeoutId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playSong();
      }
    }, totalDuration);
  }

  start() {
    this.isPlaying = true;
    this.playSong();
  }

  stop() {
    this.isPlaying = false;
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

export const musicBox = new MusicBox();
