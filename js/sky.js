/**
 * Sky Particle & Canvas Engine for Mid-Autumn Night
 * Features:
 * - Twinkling multi-depth stars
 * - Periodic realistic shooting stars (sao băng)
 * - Drifting ambient lanterns & fireflies
 * - Click / tap sparkle bursts
 */

(function () {
  const canvas = document.getElementById('skyCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // Stars
  const stars = [];
  const STAR_COUNT = Math.floor(Math.min(width, 1600) / 7);

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.3 ? '#ffffff' : Math.random() > 0.5 ? '#ffeaa7' : '#74b9ff'
      });
    }
  }

  // Shooting Stars (Sao Băng)
  const shootingStars = [];

  function addShootingStar() {
    const startX = Math.random() * width;
    const startY = Math.random() * (height * 0.4);
    const length = Math.random() * 80 + 100;
    const speed = Math.random() * 6 + 10;
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees

    shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      opacity: 1,
      life: 0,
      maxLife: 40
    });
  }

  // Periodic shooting stars
  setInterval(() => {
    if (Math.random() > 0.2) {
      addShootingStar();
    }
  }, 4500);

  // Floating ambient fireflies & micro-lanterns
  const fireflies = [];
  for (let i = 0; i < 25; i++) {
    fireflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.5,
      alpha: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      color: Math.random() > 0.4 ? 'rgba(255, 200, 55,' : 'rgba(255, 120, 80,'
    });
  }

  // Interactive Sparkles
  const sparkles = [];
  function createSparkles(x, y) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      sparkles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#ffe066' : '#ff7675',
        life: 0,
        maxLife: 30 + Math.random() * 20
      });
    }
  }

  window.addEventListener('click', (e) => {
    // Avoid triggering sparkles if clicking inputs or buttons
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      createSparkles(e.clientX, e.clientY);
    }
  });

  // Animation Loop
  initStars();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.alpha += s.speed;
      const currentAlpha = Math.abs(Math.sin(s.alpha)) * s.baseAlpha;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = currentAlpha;
      ctx.fill();
    }

    // 2. Draw Fireflies
    for (let i = 0; i < fireflies.length; i++) {
      const f = fireflies[i];
      f.x += f.vx;
      f.y += f.vy;

      if (f.y < -10) {
        f.y = height + 10;
        f.x = Math.random() * width;
      }
      if (f.x < -10) f.x = width + 10;
      if (f.x > width + 10) f.x = -10;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fillStyle = `${f.color} ${f.alpha})`;
      ctx.globalAlpha = f.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffc837';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Draw Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const st = shootingStars[i];
      st.x += st.dx;
      st.y += st.dy;
      st.life++;

      const progress = st.life / st.maxLife;
      st.opacity = 1 - progress;

      if (st.life >= st.maxLife) {
        shootingStars.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      const grad = ctx.createLinearGradient(
        st.x,
        st.y,
        st.x - st.dx * (st.length / st.speed),
        st.y - st.dy * (st.length / st.speed)
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${st.opacity})`);
      grad.addColorStop(0.3, `rgba(255, 215, 0, ${st.opacity * 0.8})`);
      grad.addColorStop(1, 'rgba(255, 215, 0, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(
        st.x - st.dx * (st.length / st.speed),
        st.y - st.dy * (st.length / st.speed)
      );
      ctx.stroke();
      ctx.restore();
    }

    // 4. Draw Click Sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sp = sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.05; // light gravity
      sp.life++;

      const alpha = 1 - (sp.life / sp.maxLife);
      if (sp.life >= sp.maxLife) {
        sparkles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fillStyle = sp.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
})();
