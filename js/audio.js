/**
 * Audio Controller for Mid-Autumn Background Music
 * Features:
 * - Smooth autoplay handling on initial gesture
 * - Floating vinyl spinning animation
 * - Active soundwave visualizer toggle
 */

(function () {
  const bgm = document.getElementById('bgmAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const musicPlayer = document.getElementById('musicPlayer');
  const vinylRecord = document.getElementById('vinylRecord');
  const soundWave = document.getElementById('soundWave');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  let isPlaying = false;

  function updatePlayerUI(playing) {
    isPlaying = playing;
    if (playing) {
      vinylRecord.classList.add('spinning');
      soundWave.classList.add('active');
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      vinylRecord.classList.remove('spinning');
      soundWave.classList.remove('active');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  function playMusic() {
    if (!bgm) return;
    bgm.volume = 0.65;
    bgm.play()
      .then(() => {
        updatePlayerUI(true);
      })
      .catch((err) => {
        console.log('Autoplay was prevented by browser, waiting for user gesture:', err);
      });
  }

  function pauseMusic() {
    if (!bgm) return;
    bgm.pause();
    updatePlayerUI(false);
  }

  function toggleMusic(e) {
    if (e) e.stopPropagation();
    if (bgm.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
  }

  if (musicPlayer) {
    musicPlayer.addEventListener('click', toggleMusic);
  }

  // Export to window for global access (e.g. from intro modal)
  window.BGM_PLAYER = {
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    isPlaying: () => isPlaying
  };
})();
