// script.js
document.addEventListener('DOMContentLoaded', () => {
  const seal = document.getElementById('sealBtn');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const mainContent = document.getElementById('mainContent');
  const bgMusic = document.getElementById('bgMusic');
  const heroVideo = document.getElementById('heroVideo');

  function openInvite() {
    // animation: add open class
    envelopeScreen.classList.add('open');

    // play music & video — clicking the seal is a user gesture
    if (bgMusic) {
      bgMusic.play().catch(()=>{/* autoplay blocked fallback */});
    }
    if (heroVideo) {
      heroVideo.play().catch(()=>{/* ignore */});
    }

    // after flap animation finishes, hide the envelope screen and reveal main content
    setTimeout(() => {
      envelopeScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      // optional: scroll to top of main
      window.scrollTo({top:0,behavior:'smooth'});
    }, 950); // matches the .9s transition in CSS
  }

  // click or keyboard accessibility
  if (seal) {
    seal.addEventListener('click', openInvite);
    seal.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openInvite(); });
  }
});