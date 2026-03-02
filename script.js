/* ---------- ENVELOPE OPENING ---------- */
const envelope = document.getElementById('envelope');
const seal = document.getElementById('seal');
const invite = document.getElementById('invite');
const envelopeScreen = document.querySelector('.envelope-wrapper');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

seal.addEventListener("click", openInvitation);

function openInvitation(){
  // animate flap: add a class on envelope
  envelope.classList.add('open');
  seal.setAttribute('aria-expanded','true');

  // after flap animation time, hide envelope and show invite
  setTimeout(() => {
    envelopeScreen.style.display = 'none';
    invite.classList.remove('hidden');
    // move focus for screen readers
    invite.focus({preventScroll:true});

    // try to play music (mobile may require gesture, so only play if allowed)
    bgMusic.play().catch(()=>{/* autoplay blocked; user must toggle */});
  }, 950);
}

seal.addEventListener('click', openInvitation);
seal.addEventListener('keydown', e => { if(e.key === 'Enter') openInvitation(); });

/* ---------- SCROLL DOWN FROM HERO ---------- */
const scrollDown = document.getElementById('scrollDown');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    // scroll to first .card
    const firstCard = document.querySelector('.content .card');
    firstCard.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

/* ---------- FADE-UP INTERSECTION OBSERVER ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.15});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ---------- MUSIC TOGGLE ---------- */
musicBtn.addEventListener('click', () => {
  if(bgMusic.paused){
    bgMusic.play().catch(()=>{ /* cannot autoplay */ });
    musicBtn.textContent = '🔊';
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🔈';
  }
});

/* ---------- keyboard accessibility: ESC to go back to envelope (optional) ---------- */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && invite && !invite.classList.contains('hidden')) {
    // return to envelope view (simple UX)
    invite.classList.add('hidden');
    envelopeScreen.style.display = '';
    envelope.classList.remove('open');
    bgMusic.pause();
    musicBtn.textContent = '🔈';
  }
});