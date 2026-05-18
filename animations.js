/* ============================================================
   ANIMATIONS.JS Particles, Petals, Bokeh, Confetti, Hearts
   ============================================================ */

'use strict';

// ===== CONFETTI =====
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimating = false;
let confettiRAF = null;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener('resize', resizeConfetti);

class ConfettiParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * -confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 4 + 2;
    this.speedX = (Math.random() - 0.5) * 3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
    const colors = ['#FFB6C1','#FF85A1','#FFD700','#FFF0F5','#FF69B4','#FF1493','#FFA07A','#fff'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    this.life = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    this.speedX += (Math.random() - 0.5) * 0.1;
    if (this.y > confettiCanvas.height) { this.life = 0; }
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function launchConfetti(count = 180) {
  for (let i = 0; i < count; i++) {
    const p = new ConfettiParticle();
    p.x = Math.random() * confettiCanvas.width;
    p.y = Math.random() * -100 - 50;
    confettiParticles.push(p);
  }
  if (!confettiAnimating) animateConfetti();
}

function animateConfetti() {
  confettiAnimating = true;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles = confettiParticles.filter(p => p.life > 0);
  confettiParticles.forEach(p => { p.update(); p.draw(confettiCtx); });
  if (confettiParticles.length > 0) {
    confettiRAF = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimating = false;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

window.launchConfetti = launchConfetti;

// ===== BOKEH LIGHTS (Page 1) =====
function initBokeh() {
  const container = document.getElementById('bokehContainer');
  if (!container) return;
  container.innerHTML = '';
  const colors = [
    'rgba(255,182,193,0.3)', 'rgba(255,133,161,0.25)',
    'rgba(255,215,0,0.2)', 'rgba(255,240,245,0.2)',
    'rgba(180,50,100,0.2)'
  ];
  for (let i = 0; i < 20; i++) {
    const b = document.createElement('div');
    b.className = 'bokeh';
    const size = Math.random() * 120 + 40;
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 8 + 6}s;
      animation-delay:${Math.random() * -8}s;
    `;
    container.appendChild(b);
  }
}

// ===== FLOATING PETALS =====
let petalInterval = null;

function startPetals() {
  if (petalInterval) return;
  petalInterval = setInterval(spawnPetal, 400);
}

function stopPetals() {
  if (petalInterval) { clearInterval(petalInterval); petalInterval = null; }
  document.querySelectorAll('.petal').forEach(p => p.remove());
}

function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = ['🌸','🌺','🌹','💮','🏵'][Math.floor(Math.random() * 5)];
  petal.style.cssText = `
    left:${Math.random() * 100}vw;
    top:-30px;
    font-size:${Math.random() * 10 + 10}px;
    animation-duration:${Math.random() * 6 + 6}s;
    animation-delay:0s;
  `;
  document.body.appendChild(petal);
  petal.addEventListener('animationend', () => petal.remove());
}

window.startPetals = startPetals;
window.stopPetals = stopPetals;

// ===== POEM BURST ANIMATIONS =====
function burstPoemElements(stanzaEl) {
  const rect = stanzaEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const emojis = ['💕','💖','🌸','🦋','✨','🌺','💗','🌟'];
  const count = 8;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const isLeft = Math.random() > 0.5;
      el.className = 'poem-heart';
      if (emoji === '🦋') el.className = 'poem-butterfly';
      else if (emoji === '✨' || emoji === '🌟') el.className = 'poem-star';
      else if (emoji === '🌸' || emoji === '🌺') el.className = 'poem-blossom';

      el.textContent = emoji;
      el.style.cssText = `
        left:${isLeft ? Math.random() * 20 : 80 + Math.random() * 20}vw;
        top:${cy}px;
        animation-delay:${Math.random() * 0.4}s;
        animation-duration:${Math.random() * 2 + 3}s;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }, i * 120);
  }
}

window.burstPoemElements = burstPoemElements;

// ===== MUSIC NOTES =====
let noteInterval = null;

function startNotes() {
  if (noteInterval) return;
  const container = document.getElementById('musicNotes');
  if (!container) return;
  noteInterval = setInterval(() => {
    const note = document.createElement('div');
    note.className = 'music-note';
    note.textContent = ['♪','♫','♬','♩','🎵','🎶'][Math.floor(Math.random() * 6)];
    note.style.cssText = `
      left:${30 + Math.random() * 40}%;
      top:60%;
      font-size:${Math.random() * 12 + 14}px;
      animation-duration:${Math.random() * 2 + 2.5}s;
    `;
    container.appendChild(note);
    note.addEventListener('animationend', () => note.remove());
  }, 600);
}

function stopNotes() {
  if (noteInterval) { clearInterval(noteInterval); noteInterval = null; }
}

window.startNotes = startNotes;
window.stopNotes = stopNotes;

// ===== HEART EXPLOSION (for kiss button) =====
function heartExplosion(cx, cy) {
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'poem-heart';
      const emojis = ['💋','💕','💖','❤️','🥰','💗'];
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.random() * 360) * Math.PI / 180;
      const dist = Math.random() * 100 + 50;
      h.style.cssText = `
        left:${cx + Math.cos(angle) * dist * 0.5}px;
        top:${cy}px;
        font-size:${Math.random() * 12 + 16}px;
        animation-duration:${Math.random() * 1.5 + 2}s;
      `;
      document.body.appendChild(h);
      h.addEventListener('animationend', () => h.remove());
    }, i * 60);
  }
}

window.heartExplosion = heartExplosion;

// ===== POEM PARTICLE BACKGROUND =====
function initPoemParticles() {
  const container = document.getElementById('poemParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const orb = document.createElement('div');
    const size = Math.random() * 60 + 10;
    orb.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      border-radius:50%;
      background:rgba(255,133,161,${Math.random() * 0.12 + 0.03});
      filter:blur(${Math.random() * 20 + 10}px);
      animation:bokehFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay:${Math.random() * -10}s;
    `;
    container.appendChild(orb);
  }
}

// ===== CAKE BLOW OUT =====
function blowOutCandles() {
  const cake = document.getElementById('cake');
  if (!cake || cake.dataset.blown === 'true') return;
  cake.dataset.blown = 'true';
  const flames = cake.querySelectorAll('.flame');
  flames.forEach((f, i) => {
    setTimeout(() => {
      f.classList.add('out');
      // Puff smoke
      const puff = document.createElement('div');
      puff.style.cssText = `
        position:absolute;
        width:10px;height:10px;
        background:rgba(200,200,200,0.5);
        border-radius:50%;
        left:${f.getBoundingClientRect().left}px;
        top:${f.getBoundingClientRect().top}px;
        pointer-events:none;
        z-index:9999;
        animation:puffUp 0.8s ease forwards;
      `;
      document.body.appendChild(puff);
      setTimeout(() => puff.remove(), 800);
    }, i * 150);
  });
  setTimeout(() => {
    launchConfetti(200);
    showToast('🎂 Make a wish! 💕');
  }, 900);
}

// Add puffUp keyframe dynamically
const puffStyle = document.createElement('style');
puffStyle.textContent = `
  @keyframes puffUp {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(4) translateY(-30px); opacity: 0; }
  }
`;
document.head.appendChild(puffStyle);

window.blowOutCandles = blowOutCandles;

// ===== TOAST =====
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

window.showToast = showToast;

// ===== TYPEWRITER =====
function typewrite(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  return new Promise(resolve => {
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

window.typewrite = typewrite;

// ===== INIT CALLS =====
initBokeh();
initPoemParticles();

// Cake click
document.getElementById('cakeContainer')?.addEventListener('click', blowOutCandles);

// ===== AMBIENT MUSIC (Web Audio API) =====
let audioCtx = null;
let musicPlaying = false;
let musicNodes = [];

function createSoftMelody() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
  const melody = [0,2,4,5,4,2,0,0,2,4,7,5,4,2,1,0];
  let time = audioCtx.currentTime;

  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0.04, time);
  master.connect(audioCtx.destination);

  const reverb = audioCtx.createConvolver();
  const reverbLen = audioCtx.sampleRate * 2;
  const reverbBuf = audioCtx.createBuffer(2, reverbLen, audioCtx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = reverbBuf.getChannelData(c);
    for (let i = 0; i < reverbLen; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2);
  }
  reverb.buffer = reverbBuf;
  reverb.connect(master);

  musicNodes = [master, reverb];

  let noteIdx = 0;
  function scheduleNote() {
    if (!musicPlaying) return;
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = notes[melody[noteIdx % melody.length]];
    env.gain.setValueAtTime(0, time);
    env.gain.linearRampToValueAtTime(0.3, time + 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, time + 1.2);
    osc.connect(env);
    env.connect(reverb);
    env.connect(master);
    osc.start(time);
    osc.stop(time + 1.3);
    musicNodes.push(osc, env);
    noteIdx++;
    time += 0.7;
    if (musicPlaying) setTimeout(scheduleNote, 500);
  }
  scheduleNote();
}

function stopMelody() {
  musicPlaying = false;
  if (audioCtx) {
    musicNodes.forEach(n => { try { n.disconnect(); } catch(e) {} });
    musicNodes = [];
  }
}

function toggleMusic() {
  const icon = document.getElementById('musicIcon');
  if (musicPlaying) {
    stopMelody();
    if (icon) icon.textContent = '🔇';
  } else {
    musicPlaying = true;
    createSoftMelody();
    if (icon) icon.textContent = '🎵';
  }
}

window.toggleMusic = toggleMusic;
