/* ============================================================
   POEM.JS Scroll Reveal for the Poem Page
   ============================================================ */

'use strict';

function initPoem() {
  const container = document.getElementById('poemContent');
  if (!container) return;

  const titleEl = document.getElementById('poemTitle');
  if (titleEl) titleEl.textContent = CONFIG.poem.title;

  const sig = document.querySelector('.poem-signature');
  if (sig) {
    sig.textContent = CONFIG.poem.signature;
    sig.style.opacity = '0';
    sig.style.transition = 'opacity 1.5s ease';
  }

  container.innerHTML = '';
  CONFIG.poem.stanzas.forEach((text, i) => {
    const stanza = document.createElement('div');
    stanza.className = 'poem-stanza';
    stanza.dataset.index = i;
    const p = document.createElement('p');
    p.innerHTML = text;
    stanza.appendChild(p);
    container.appendChild(stanza);
  });

  setupPoemObserver();
}

function setupPoemObserver() {
  const stanzas = document.querySelectorAll('.poem-stanza');
  const sig = document.querySelector('.poem-signature');
  const revealedSet = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !revealedSet.has(entry.target)) {
        revealedSet.add(entry.target);
        entry.target.classList.add('revealed');
        if (typeof burstPoemElements === 'function') burstPoemElements(entry.target);
      }
    });
  }, { threshold: 0.3 });

  stanzas.forEach(s => observer.observe(s));

  if (sig) {
    const sigObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { sig.style.opacity = '1'; sigObserver.unobserve(sig); }
      });
    }, { threshold: 0.5 });
    sigObserver.observe(sig);
  }
}

document.addEventListener('DOMContentLoaded', initPoem);
window.initPoem = initPoem;
