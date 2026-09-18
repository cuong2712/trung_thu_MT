/**
 * Main Application Logic for Mid-Autumn Celebration Web
 * Supports dynamic multi-profiles:
 * - Default / ?to=thao : Mai Thảo ("Thảo Chim To")
 * - ?to=trang          : Thu Trang ("Lốp Siêu Cấp")
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. PROCEDURAL SOUND SYNTHESIZER (Web Audio API) ---
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function initAudioCtx() {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playBellSFX() {
    try {
      initAudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('AudioContext not allowed yet', e);
    }
  }

  function playChimeSFX() {
    try {
      initAudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + i * 0.1);
        osc.stop(audioCtx.currentTime + i * 0.1 + 0.6);
      });
    } catch (e) {
      console.log('AudioContext error', e);
    }
  }

  function playMokugyoSFX() {
    try {
      initAudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.log('Mokugyo audio error', e);
    }
  }

  // --- 2. MULTI-PROFILE INITIALIZATION ---
  const urlParams = new URLSearchParams(window.location.search);
  const rawParam = (
    window.FORCE_PROFILE ||
    urlParams.get('to') ||
    urlParams.get('user') ||
    (window.location.pathname.toLowerCase().includes('trang') ? 'trang' : 'thao')
  ).toLowerCase();
  const activeKey = (rawParam === 'trang' || rawParam === 'thutrang' || rawParam === 'lop') ? 'trang' : 'thao';
  const profile = (typeof PROFILES_DATA !== 'undefined' && PROFILES_DATA[activeKey]) ? PROFILES_DATA[activeKey] : PROFILES_DATA['thao'];

  function applyProfile(p) {
    // 1. Page Title & Meta
    document.title = p.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', p.metaDesc);

    // 2. Intro Overlay
    const introRecipient = document.querySelector('.intro-recipient');
    if (introRecipient) introRecipient.textContent = p.name;
    const introNickname = document.querySelector('.intro-nickname');
    if (introNickname) introNickname.innerHTML = p.nickname;

    // 3. Floating Vinyl Player
    const vinylArt = document.querySelector('.vinyl-art');
    if (vinylArt) vinylArt.src = p.vinylAvatar;

    // 4. Hero Section
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) heroTagline.textContent = p.heroTagline;
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = p.heroTitle;
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = p.heroSubtitle;

    const badgesRow = document.querySelector('.badges-row');
    if (badgesRow && p.badges) {
      badgesRow.innerHTML = p.badges.map(b => `<span class="badge">${b}</span>`).join('');
    }

    // 5. Royal Letter
    const letterAvatar = document.querySelector('.letter-avatar');
    if (letterAvatar) letterAvatar.src = p.avatar;
    const letterMetaH3 = document.querySelector('.letter-meta h3');
    if (letterMetaH3) letterMetaH3.textContent = p.letterRecipientTitle;
    const aliasTag = document.querySelector('.alias-tag');
    if (aliasTag) aliasTag.innerHTML = p.letterAliasTag;
    const greetingLead = document.querySelector('.greeting-lead');
    if (greetingLead) greetingLead.textContent = p.letterGreetingLead;

    const letterBody = document.querySelector('.letter-body');
    if (letterBody && p.letterParagraphs) {
      const pElements = letterBody.querySelectorAll('p:not(.greeting-lead):not(.letter-signature)');
      if (pElements.length >= 2) {
        pElements[0].innerHTML = p.letterParagraphs[0];
        pElements[1].innerHTML = p.letterParagraphs[1];
      }
    }

    const letterWishesUl = document.querySelector('.letter-highlight-box ul');
    if (letterWishesUl && p.letterFiveWishes) {
      letterWishesUl.innerHTML = p.letterFiveWishes.map(w => `<li>${w}</li>`).join('');
    }

    // 6. Wooden Fish Section
    const woodenFishHeading = document.querySelector('.wooden-fish-section .section-heading h2');
    if (woodenFishHeading) woodenFishHeading.textContent = p.woodenFishTitle;
    const woodenFishDesc = document.querySelector('.wooden-fish-section .heading-desc');
    if (woodenFishDesc) woodenFishDesc.textContent = p.woodenFishDesc;

    // 7. Polaroid Gallery Section
    const polaroidHeading = document.querySelector('.gallery-section .section-heading h2');
    if (polaroidHeading) polaroidHeading.textContent = p.polaroidSectionTitle;

    const polaroidRow = document.querySelector('.polaroid-row');
    if (polaroidRow && p.polaroidPhotos) {
      polaroidRow.innerHTML = p.polaroidPhotos.map((photo, i) => `
        <div class="polaroid-card polaroid-${(i % 5) + 1}" data-index="${i}">
          <div class="wooden-peg"></div>
          <div class="polaroid-inner">
            <div class="polaroid-img-box">
              <img src="${photo.img}" alt="${photo.title}" loading="lazy">
            </div>
            <div class="polaroid-caption">
              <p class="caption-title">${photo.captionTitle}</p>
              <p class="caption-desc">${photo.desc}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 8. Fortune Mooncake
    const fortuneHeadingDesc = document.querySelector('.fortune-section .heading-desc');
    if (fortuneHeadingDesc) fortuneHeadingDesc.textContent = p.fortuneSectionDesc;

    // 9. Sky Lantern
    const wishHeading = document.querySelector('.wish-section .section-heading h2');
    if (wishHeading) wishHeading.textContent = p.wishSectionTitle;
    const rabbitSpeech = document.querySelector('.rabbit-speech');
    if (rabbitSpeech) rabbitSpeech.textContent = p.wishRabbitSpeech;
    const wishLabel = document.querySelector('.wish-label');
    if (wishLabel) wishLabel.textContent = p.wishInputLabel;
    const lanternCounterWrap = document.querySelector('.wishes-released-counter');
    if (lanternCounterWrap) lanternCounterWrap.innerHTML = p.wishCounterText;

    // 10. Friendship Contract
    const contractTerms = document.querySelector('.contract-terms');
    if (contractTerms) {
      const pTags = contractTerms.querySelectorAll('p');
      if (pTags.length >= 2) {
        pTags[1].innerHTML = `<strong>Bên B:</strong> ${p.contractPartyB}`;
      }
      const ol = contractTerms.querySelector('ol');
      if (ol && p.name) {
        ol.innerHTML = `
          <li>Sau mùa Trung Thu này, mỗi khi có dịp liên hoan, Bên B (${p.name}) sẽ vui vẻ bao Bên A ít nhất 01 chầu buffet nướng hoặc trà sữa full thạch!</li>
          <li>Bên B không được phép khiếu nại về biệt danh "${p.aliasOnly}" vì đây đã là di sản văn hóa tinh thần không thể tách rời của nhóm bạn!</li>
          <li>Bên B cam kết luôn vui tươi, xinh đẹp, không được dỗi vô cớ, nếu dỗi sẽ bị phạt 100k sung vào quỹ ăn vặt.</li>
          <li>Tình bạn giữa hai bên có thời hạn bảo hành: <strong>VÔ CỰC (Suốt Đời)</strong>.</li>
        `;
      }
    }

    // 11. Footer
    const footerText = document.querySelector('.footer-text');
    if (footerText) footerText.innerHTML = p.footerNote;
  }

  // Apply profile immediately
  applyProfile(profile);

  // --- 3. INTRO OVERLAY & JOURNEY START ---
  const introOverlay = document.getElementById('introOverlay');
  const startJourneyBtn = document.getElementById('startJourneyBtn');

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', () => {
      initAudioCtx();
      playChimeSFX();

      if (window.BGM_PLAYER) {
        window.BGM_PLAYER.play();
      }

      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 800);

      spawnHearts(window.innerWidth / 2, window.innerHeight / 2, 20);
    });
  }

  // --- 4. ROYAL LETTER ACTIONS (HEARTS & CHEER) ---
  const sendLoveBtn = document.getElementById('sendLoveBtn');
  const heartCountSpan = document.getElementById('heartCount');
  const playCheerBtn = document.getElementById('playCheerBtn');
  let loveCount = 999;

  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', (e) => {
      loveCount += 1;
      heartCountSpan.textContent = loveCount;
      playBellSFX();

      const rect = sendLoveBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top;
      spawnHearts(x, y, 8);
    });
  }

  if (playCheerBtn) {
    playCheerBtn.addEventListener('click', () => {
      playChimeSFX();
      spawnConfettiBurst();
    });
  }

  function spawnHearts(x, y, count = 6) {
    const emojis = ['💖', '❤️', '🥮', '✨', '🥰', '🌕', '🛞'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const dx = (Math.random() - 0.5) * 200 + 'px';
      const dy = -(Math.random() * 160 + 60) + 'px';
      heart.style.setProperty('--dx', dx);
      heart.style.setProperty('--dy', dy);
      heart.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      heart.style.top = `${y}px`;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }
  }

  function spawnConfettiBurst() {
    const colors = ['#ffc837', '#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.zIndex = '1200';
      confetti.style.width = Math.random() * 8 + 6 + 'px';
      confetti.style.height = Math.random() * 12 + 8 + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.opacity = '1';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = `transform ${Math.random() * 2 + 2}s linear, top ${Math.random() * 2 + 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease`;

      document.body.appendChild(confetti);

      requestAnimationFrame(() => {
        confetti.style.top = '105vh';
        confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${(Math.random() - 0.5) * 100}px)`;
      });

      setTimeout(() => confetti.remove(), 3500);
    }
  }

  // --- 5. POLAROID GALLERY LIGHTBOX ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  function bindPolaroidClicks() {
    document.querySelectorAll('.polaroid-card').forEach((card) => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        const data = profile.polaroidPhotos[idx];
        if (data) {
          lightboxImg.src = data.img;
          lightboxTitle.textContent = data.title;
          lightboxDesc.textContent = data.desc;
          lightboxModal.classList.add('active');
          playBellSFX();
        }
      });
    });
  }

  bindPolaroidClicks();

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- 6. FORTUNE MOONCAKE (CẮT BÁNH RÚT QUẺ) ---
  let currentFortuneIndex = -1;
  const mooncakeInteractive = document.getElementById('mooncakeInteractive');
  const fortuneTitle = document.getElementById('fortuneTitle');
  const fortuneContent = document.getElementById('fortuneContent');
  const fortuneAdvice = document.getElementById('fortuneAdvice');
  const cutAgainBtn = document.getElementById('cutAgainBtn');

  function cutMooncake() {
    mooncakeInteractive.classList.add('slicing');
    playChimeSFX();
    spawnHearts(window.innerWidth / 2, window.innerHeight * 0.6, 12);

    setTimeout(() => {
      mooncakeInteractive.classList.remove('slicing');

      const fortunesList = profile.fortunes;
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * fortunesList.length);
      } while (nextIdx === currentFortuneIndex && fortunesList.length > 1);

      currentFortuneIndex = nextIdx;
      const f = fortunesList[currentFortuneIndex];

      fortuneTitle.textContent = f.title;
      fortuneContent.textContent = f.content;
      fortuneAdvice.textContent = f.advice;

      cutAgainBtn.style.display = 'inline-flex';
      cutAgainBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  }

  if (mooncakeInteractive) {
    mooncakeInteractive.addEventListener('click', cutMooncake);
  }

  if (cutAgainBtn) {
    cutAgainBtn.addEventListener('click', cutMooncake);
  }

  // --- 7. SKY LANTERN WISH RELEASE SYSTEM ---
  const wishInput = document.getElementById('wishInput');
  const releaseLanternBtn = document.getElementById('releaseLanternBtn');
  const lanternCountEl = document.getElementById('lanternCount');
  const flyingSky = document.getElementById('flyingLanternsSky');
  let totalLanterns = (activeKey === 'trang') ? 22 : 18;

  document.querySelectorAll('.quick-tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      const text = tag.getAttribute('data-text');
      wishInput.value = text;
      wishInput.focus();
    });
  });

  function releaseLantern() {
    let text = wishInput.value.trim();
    if (!text) {
      text = profile.defaultWish;
    }

    totalLanterns += 1;
    if (lanternCountEl) lanternCountEl.textContent = totalLanterns;
    playBellSFX();

    const lantern = document.createElement('div');
    lantern.className = 'floating-sky-lantern';

    const randomLeft = Math.random() * 70 + 15;
    lantern.style.left = `${randomLeft}vw`;

    lantern.innerHTML = `
      <div class="lantern-orb">${profile.lanternTagPrefix}</div>
      <div class="lantern-text-tag">${text}</div>
    `;

    flyingSky.appendChild(lantern);
    spawnHearts(window.innerWidth * (randomLeft / 100), window.innerHeight * 0.8, 6);

    wishInput.value = '';

    setTimeout(() => {
      lantern.remove();
    }, 12500);
  }

  if (releaseLanternBtn) {
    releaseLanternBtn.addEventListener('click', releaseLantern);
  }

  if (wishInput) {
    wishInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') releaseLantern();
    });
  }

  // --- 8. GÕ MÕ GIẢI NGHIỆP & TÍCH ĐỨC ---
  const woodenFishBtn = document.getElementById('woodenFishBtn');
  const fishCounter = document.getElementById('fishCounter');
  const fishRankBadge = document.getElementById('fishRankBadge');
  let meritCount = 68;

  if (woodenFishBtn) {
    woodenFishBtn.addEventListener('click', (e) => {
      meritCount += 1;
      fishCounter.textContent = meritCount;
      playMokugyoSFX();

      woodenFishBtn.classList.add('bonk');
      setTimeout(() => woodenFishBtn.classList.remove('bonk'), 120);

      const rankSpan = fishRankBadge.querySelector('span');
      if (meritCount >= 100) {
        rankSpan.textContent = profile.woodenFishMaxRank;
        fishRankBadge.style.borderColor = '#ff4757';
      } else if (meritCount >= 85) {
        rankSpan.textContent = '💎 Đại Tiên Tri Triệu Phú Đô La';
      } else if (meritCount >= 75) {
        rankSpan.textContent = '🌟 Chiến Thần Tích Đức Vạn Người Mê';
      } else {
        rankSpan.textContent = '🧘‍♀️ Bậc Thầy Giải Nghiệp Phố Núi';
      }

      const rect = woodenFishBtn.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || rect.top;

      const floatEl = document.createElement('div');
      floatEl.className = 'floating-merit';
      const buffs = profile.woodenFishBuffs;
      floatEl.textContent = buffs[Math.floor(Math.random() * buffs.length)];
      floatEl.style.left = `${x - 40}px`;
      floatEl.style.top = `${y - 20}px`;
      floatEl.style.setProperty('--mx', `${(Math.random() - 0.5) * 60}px`);

      document.body.appendChild(floatEl);
      setTimeout(() => floatEl.remove(), 1200);
    });
  }

  // --- 9. BẢN CAM KẾT BẠN THÂN (NÚT NÉ CHUỘT THẦN THÁNH) ---
  const contractRejectBtn = document.getElementById('contractRejectBtn');
  const contractAgreeBtn = document.getElementById('contractAgreeBtn');
  const contractResultMsg = document.getElementById('contractResultMsg');

  const rejectTaunts = [
    'Đố bắt được tao! 😜',
    'Hụt rồi nha lêu lêu! 😝',
    'Bấm nút Xanh đi đừng cố! 😂',
    'Chạy đâu cho thoát! 🏃‍♀️',
    'Bao bạn thân đi mà! 🥩',
    'Không thoát được đâu! 🛞',
    'Bấm nút kia đi nè! 👉'
  ];

  let rejectTries = 0;

  function dodgeButton(e) {
    if (e) e.preventDefault();
    rejectTries++;
    playBellSFX();

    const maxOffset = Math.min(window.innerWidth * 0.35, 140);
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * 90;

    contractRejectBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    contractRejectBtn.querySelector('span').textContent = rejectTaunts[rejectTries % rejectTaunts.length];
  }

  if (contractRejectBtn) {
    contractRejectBtn.addEventListener('mouseenter', dodgeButton);
    contractRejectBtn.addEventListener('touchstart', dodgeButton, { passive: false });
    contractRejectBtn.addEventListener('click', dodgeButton);
  }

  if (contractAgreeBtn) {
    contractAgreeBtn.addEventListener('click', () => {
      playChimeSFX();
      spawnConfettiBurst();
      spawnHearts(window.innerWidth / 2, window.innerHeight * 0.7, 18);

      contractRejectBtn.style.display = 'none';
      contractResultMsg.style.display = 'block';
      contractResultMsg.innerHTML = profile.contractConfirmMsg;
      contractResultMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

});
