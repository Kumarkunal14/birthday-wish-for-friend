/* ============================================================
   QUIZ.JS Fun Quiz with Fleeing No Button
   ============================================================ */

'use strict';

let currentQuestion = 0;
let isMobile = window.matchMedia('(max-width: 600px)').matches;

function initQuiz() {
  currentQuestion = 0;
  const card  = document.getElementById('quizCard');
  const final = document.getElementById('quizFinal');
  if (!card || !final) return;

  const titleEl = document.getElementById('quizTitle');
  if (titleEl) titleEl.textContent = CONFIG.quiz.title;

  const completionEl = document.getElementById('quizCompletionText');
  if (completionEl) completionEl.textContent = CONFIG.quiz.completionSubtext;

  card.style.display  = 'block';
  final.style.display = 'none';

  renderProgressDots();
  showQuestion(0);
  setupNoButton();
}

function renderProgressDots() {
  const container = document.getElementById('progressDots');
  if (!container) return;
  container.innerHTML = '';
  CONFIG.quiz.questions.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i === 0 ? ' current' : '');
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  });
}

function showQuestion(idx) {
  const display = document.getElementById('questionDisplay');
  const msg     = document.getElementById('quizMessage');
  const noBtn   = document.getElementById('noBtn');
  if (!display) return;

  display.style.opacity   = '0';
  display.style.transform = 'translateY(20px)';
  if (msg) { msg.textContent = ''; msg.classList.remove('show'); }

  setTimeout(() => {
    display.textContent        = CONFIG.quiz.questions[idx].text;
    display.style.transition   = 'opacity 0.4s ease, transform 0.4s ease';
    display.style.opacity      = '1';
    display.style.transform    = 'translateY(0)';
  }, 200);

  for (let i = 0; i < CONFIG.quiz.questions.length; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    dot.className = 'progress-dot';
    if (i < idx)      dot.classList.add('done');
    else if (i === idx) dot.classList.add('current');
  }

  if (noBtn) {
    noBtn.style.transition = 'none';
    noBtn.style.transform  = '';
    noBtn.style.position   = '';
    noBtn.style.left       = '';
    noBtn.style.top        = '';
    noBtn.style.display    = isMobile ? 'none' : 'inline-flex';
  }
}

function answerYes() {
  const msg = document.getElementById('quizMessage');
  if (msg) {
    msg.textContent = CONFIG.quiz.questions[currentQuestion].message;
    msg.classList.add('show');
  }

  launchConfetti(80);

  const yesBtn = document.getElementById('yesBtn');
  if (yesBtn) {
    yesBtn.style.transform = 'scale(1.15)';
    setTimeout(() => { yesBtn.style.transform = ''; }, 300);
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion >= CONFIG.quiz.questions.length) showFinal();
    else showQuestion(currentQuestion);
  }, 1200);
}

function showFinal() {
  const card  = document.getElementById('quizCard');
  const final = document.getElementById('quizFinal');
  if (card)  card.style.display  = 'none';
  if (final) {
    final.style.display       = 'flex';
    final.style.flexDirection = 'column';
    final.style.alignItems    = 'center';
  }

  const h3 = final?.querySelector('h3');
  if (h3) h3.textContent = CONFIG.quiz.completionText;

  setTimeout(() => launchConfetti(300), 200);
  setTimeout(() => launchConfetti(300), 1000);
}

function restartQuiz() { initQuiz(); }

// ===== FLEEING NO BUTTON =====
function setupNoButton() {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;

  if (isMobile) { noBtn.style.display = 'none'; return; }

  noBtn.style.display   = 'inline-flex';
  noBtn.style.position  = 'relative';

  noBtn.addEventListener('mousemove',  (e) => flee(noBtn, e));
  noBtn.addEventListener('mouseenter', (e) => {
    flee(noBtn, e);
    noBtn.classList.add('shaking');
    setTimeout(() => noBtn.classList.remove('shaking'), 400);
  });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    flee(noBtn, e);
    showToast('Nice try! 😂');
  });
}

function flee(btn, e) {
  const card = document.getElementById('quizCard');
  if (!card) return;

  const cardRect = card.getBoundingClientRect();
  const btnRect  = btn.getBoundingClientRect();
  const dx = (btnRect.left + btnRect.width  / 2) - e.clientX;
  const dy = (btnRect.top  + btnRect.height / 2) - e.clientY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;

  const strength = 180;
  let newX = btnRect.left + (dx / dist) * strength;
  let newY = btnRect.top  + (dy / dist) * strength;

  const m = 16;
  newX = Math.max(cardRect.left + m, Math.min(cardRect.right  - btnRect.width  - m, newX));
  newY = Math.max(cardRect.top  + m, Math.min(cardRect.bottom - btnRect.height - m, newY));

  btn.style.position   = 'fixed';
  btn.style.transition = 'left 0.15s ease, top 0.15s ease';
  btn.style.left       = newX + 'px';
  btn.style.top        = newY + 'px';
  btn.style.zIndex     = '9997';
}

window.initQuiz    = initQuiz;
window.answerYes   = answerYes;
window.restartQuiz = restartQuiz;

window.addEventListener('resize', () => {
  isMobile = window.matchMedia('(max-width: 600px)').matches;
});
