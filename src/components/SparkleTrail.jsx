import { useEffect, useRef } from "react";

export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = [
      "#ff9fbc", // pink
      "#ffd5e1", // soft blush
      "#fce498", // star gold
      "#ffffff", // pure light
      "#ff6b95", // rose
      "#e0b0ff", // soft lilac
    ];

    const symbols = ["star", "circle", "heart"];

    function addParticle(x, y) {
      if (isReducedMotion) return;
      // Emit 2-3 particles per movement
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.6 + 0.4;
        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6, // slight upward float
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: symbols[Math.floor(Math.random() * symbols.length)],
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
          alpha: 1,
          life: 1,
          decay: Math.random() * 0.025 + 0.02,
        });
      }

      // Keep max particles in check
      if (particles.length > 50) {
        particles.splice(0, particles.length - 50);
      }

      if (!animationFrameId) {
        loop();
      }
    }

    function handlePointerMove(e) {
      addParticle(e.clientX, e.clientY);
    }

    function handleTouchMove(e) {
      if (e.touches && e.touches[0]) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      let rotStep = Math.PI / spikes;
      let x;
      let y;

      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        x = Math.cos(i * rotStep) * radius;
        y = Math.sin(i * rotStep) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawHeart(ctx, x, y, size, color, alpha, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      const h = size * 0.6;
      ctx.moveTo(0, -h * 0.2);
      ctx.bezierCurveTo(-h * 0.5, -h * 0.8, -h, -h * 0.2, 0, h);
      ctx.bezierCurveTo(h, -h * 0.2, h * 0.5, -h * 0.8, 0, -h * 0.2);
      ctx.fill();
      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === "star") {
          drawStar(ctx, p.x, p.y, 4, p.size, p.size * 0.35, p.color, p.alpha, p.rotation);
        } else if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size * 1.2, p.color, p.alpha, p.rotation);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        animationFrameId = null;
      }
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
      }}
      aria-hidden="true"
    />
  );
}
