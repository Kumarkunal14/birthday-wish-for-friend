/* ============================================================
   MAIN.JS Navigation, Page Setup, Gallery, Letter, Music
   ============================================================ */

'use strict';

// ===== NAVIGATION =====
let currentPage = 0;
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

function navigateTo(idx) {
  if (idx === currentPage) return;

  const prev = pages[currentPage];
  const next = pages[idx];

  prev.classList.remove('active');
  prev.style.pointerEvents = 'none';

  setTimeout(() => {
    next.classList.add('active');
    next.style.pointerEvents = 'all';
    next.scrollTop = 0;
  }, 50);

  navBtns.forEach(b => b.classList.remove('active'));
  navBtns[idx]?.classList.add('active');

  onPageLeave(currentPage);
  currentPage = idx;
  onPageEnter(idx);
}

function onPageLeave(idx) {
  if (idx === 2) stopNotes();
  if (idx === 3) stopPetals();
}

function onPageEnter(idx) {
  if (idx === 0) {
    startPetals();
  } else if (idx === 1) {
    stopPetals();
    setTimeout(() => {
      document.querySelectorAll('.poem-stanza').forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) s.classList.add('revealed');
      });
    }, 700);
  } else if (idx === 2) {
    startNotes();
  } else if (idx === 3) {
    startPetals();
  } else if (idx === 4) {
    stopPetals();
    initQuiz();
  } else if (idx === 5) {
    startPetals();
    revealLetter();
  }
}

window.navigateTo = navigateTo;

// ===== GALLERY =====
function makePolaroid(item, type) {
  const polaroid = document.createElement('div');
  polaroid.className = 'polaroid';

  if (type === 'video') {
    polaroid.innerHTML = `
      <video class="polaroid-img" src="${item.url}" muted playsinline preload="metadata"></video>
      <div class="video-play-icon">▶</div>
      <p class="polaroid-caption">${item.caption}</p>
    `;
    polaroid.addEventListener('click', () => openLightbox(item.url, item.caption, 'video'));
  } else {
    polaroid.innerHTML = `
      <img class="polaroid-img" src="${item.url}" alt="${item.caption}" loading="lazy" />
      <p class="polaroid-caption">${item.caption}</p>
    `;
    polaroid.addEventListener('click', () => openLightbox(item.url, item.caption, 'image'));
  }
  return polaroid;
}

function initGallery() {
  const grid = document.getElementById('photoGrid');
  if (!grid || grid.dataset.built === 'true') return;
  grid.dataset.built = 'true';

  CONFIG.photos.forEach(item => grid.appendChild(makePolaroid(item, 'image')));

  if (CONFIG.videos.length > 0) {
    const galleryContainer = grid.closest('.gallery-container');
    if (!galleryContainer) return;

    const label = document.createElement('div');
    label.className = 'video-row-label';
    label.textContent = '🎥 Our Moments on Video';
    galleryContainer.appendChild(label);

    const videoRow = document.createElement('div');
    videoRow.className = 'video-row';
    CONFIG.videos.forEach(item => videoRow.appendChild(makePolaroid(item, 'video')));
    galleryContainer.appendChild(videoRow);
  }
}

function openLightbox(url, caption, type = 'image') {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  let vid = document.getElementById('lightboxVideo');
  if (!lb) return;

  if (type === 'video') {
    img.style.display = 'none';
    if (!vid) {
      vid = document.createElement('video');
      vid.id = 'lightboxVideo';
      vid.controls = true;
      vid.autoplay = true;
      vid.style.cssText = 'max-width:90vw;max-height:80vh;border-radius:8px;';
      lb.querySelector('.lightbox-inner').insertBefore(vid, cap);
    }
    vid.src = url;
    vid.style.display = 'block';
    vid.play();
  } else {
    if (vid) { vid.pause(); vid.style.display = 'none'; }
    img.src = url;
    img.alt = caption;
    img.style.display = 'block';
  }

  cap.textContent = caption;
  lb.classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightboxVideo');
  if (vid) vid.pause();
  lb?.classList.remove('open');
}

window.closeLightbox = closeLightbox;

// ===== MUSIC PLAYER =====
let playerPlaying = false;

function initMusic() {
  const ytFrame  = document.getElementById('ytFrame');
  const lyricsEl = document.getElementById('lyricsText');

  if (ytFrame) {
    ytFrame.src   = `https://www.youtube.com/embed/${CONFIG.song.youtubeId}?enablejsapi=1`;
    ytFrame.title = `${CONFIG.song.title} - ${CONFIG.song.artist}`;
  }

  const fields = {
    vinylSong:   CONFIG.song.title,
    vinylArtist: CONFIG.song.artist,
    songTitle:   CONFIG.song.title,
    songArtist:  CONFIG.song.artist,
  };
  Object.entries(fields).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  if (lyricsEl) lyricsEl.innerHTML = CONFIG.song.lyricQuote;
}

function togglePlayer() {
  playerPlaying = !playerPlaying;
  const icon     = document.getElementById('playIcon');
  const vinyl    = document.getElementById('vinyl');
  const waveform = document.getElementById('waveform');
  const ytFrame  = document.getElementById('ytFrame');

  if (playerPlaying) {
    if (icon)     icon.textContent = '⏸';
    if (vinyl)    vinyl.classList.add('spinning');
    if (waveform) waveform.classList.add('playing');
    startNotes();
    ytFrame?.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  } else {
    if (icon)     icon.textContent = '▶';
    if (vinyl)    vinyl.classList.remove('spinning');
    if (waveform) waveform.classList.remove('playing');
    stopNotes();
    ytFrame?.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
}

window.togglePlayer = togglePlayer;

// ===== LETTER =====
function initLetter() {
  const body = document.getElementById('letterBody');
  if (!body || body.children.length > 0) return;

  const titleEl = document.getElementById('letterTitle');
  if (titleEl) titleEl.textContent = CONFIG.letter.title;

  CONFIG.letter.paragraphs.forEach(({ cls, text }) => {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    body.appendChild(p);
  });
}

let letterRevealed = false;

function revealLetter() {
  if (letterRevealed) return;
  letterRevealed = true;
  document.querySelectorAll('.letter-body p').forEach((p, i) => {
    setTimeout(() => p.classList.add('revealed'), 300 + i * 350);
  });
}

window.revealLetter = revealLetter;

// ===== SEND KISS =====
function sendKiss() {
  const btn = document.getElementById('kissBtn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  heartExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
  launchConfetti(60);
  showToast('💋 Sent with all the love! 💕');
}

window.sendKiss = sendKiss;

// ===== LANDING TYPEWRITER =====
async function initLanding() {
  const el = document.getElementById('typewriterText');
  if (!el) return;
  await new Promise(r => setTimeout(r, 600));
  await typewrite(el, `${CONFIG.partnerName} 🌸`, 90);
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => {
  // Apply config-driven heading text
  document.title = `Happy Birthday, ${CONFIG.partnerName} 💕`;

  const mainHeading = document.getElementById('mainHeading');
  if (mainHeading) {
    mainHeading.innerHTML = `Happy Birthday, ${CONFIG.nickname} <span class="heart-float">💕</span>`;
  }

  initGallery();
  initLetter();
  initMusic();
  initLanding();

  pages.forEach((p, i) => {
    if (i === 0) { p.classList.add('active'); p.style.pointerEvents = 'all'; }
    else p.classList.remove('active');
  });
  navBtns[0]?.classList.add('active');
  startPetals();
});
