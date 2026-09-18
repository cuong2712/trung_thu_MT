/**
 * Main Application Logic for Mai Thảo's Mid-Autumn Celebration Web
 * Interactive features:
 * 1. Intro curtain & journey launch
 * 2. Royal letter interactions & procedural SFX
 * 3. Polaroid gallery modal lightbox
 * 4. Mooncake cutting fortune generator
 * 5. Flying Sky Lantern release system
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- PROCEDURAL SOUND SYNTHESIZER (Web Audio API) ---
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
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
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
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
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

  // --- 1. INTRO OVERLAY & JOURNEY START ---
  const introOverlay = document.getElementById('introOverlay');
  const startJourneyBtn = document.getElementById('startJourneyBtn');

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener('click', () => {
      initAudioCtx();
      playChimeSFX();

      // Start Background Music
      if (window.BGM_PLAYER) {
        window.BGM_PLAYER.play();
      }

      // Fade out overlay
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 800);

      // Launch celebratory initial fireworks/lanterns
      spawnHearts(window.innerWidth / 2, window.innerHeight / 2, 20);
    });
  }

  // --- 2. ROYAL LETTER ACTIONS (HEARTS & CHEER) ---
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
    const emojis = ['💖', '❤️', '🥮', '✨', '🥰', '🌕'];
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

  // --- 3. POLAROID GALLERY LIGHTBOX ---
  const polaroidData = [
    {
      img: 'assets/images/thao_1.png',
      title: 'Khoảnh Khắc Mỹ Nhân ✌️',
      desc: 'Nháy mắt một cái làm xiêu lòng bao chàng trai, nhưng bạn bè thì thấy hơi sến súa! Dẫu vậy vẫn phải công nhận bức này thần thái đỉnh cao!'
    },
    {
      img: 'assets/images/thao_2.png',
      title: 'Chuyên Gia Sống Ảo 📱',
      desc: 'Đứng trước gương chỉnh dáng 1 tiếng rưỡi chỉ để chọn ra 1 tấm chân dài miên man triệu like này. Công sức không uổng phí!'
    },
    {
      img: 'assets/images/thao_3.png',
      title: 'Nụ Cười Tỏa Nắng 🌸',
      desc: 'Những lúc dịu dàng không mắng mỏ bạn bè thì nhìn cũng nết na, hiền thục, chuẩn thục nữ con nhà lành phết chứ đùa!'
    },
    {
      img: 'assets/images/thao_4.png',
      title: 'Chiến Thần Đồ Nướng 🥩',
      desc: 'Tâm hồn ăn uống vô đáy: "Tao chỉ ăn nốt miếng thịt này thôi rồi mai tao giảm cân thật mà!" - Câu nói dối kinh điển nhất thế kỷ!'
    },
    {
      img: 'assets/images/thao_5.png',
      title: 'Nỗi Đau Deadline 💻',
      desc: 'Gương mặt bất lực trước deadline công việc nhưng vẫn kiên cường cày cuốc vì một tương lai sớm thành phú bà bao bạn bè đi du lịch!'
    }
  ];

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  document.querySelectorAll('.polaroid-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const data = polaroidData[idx];
      if (data) {
        lightboxImg.src = data.img;
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.desc;
        lightboxModal.classList.add('active');
        playBellSFX();
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- 4. FORTUNE MOONCAKE (CẮT BÁNH RÚT QUẺ) ---
  const fortunes = [
    {
      stamp: 'ĐẠI CÁT',
      title: '🥮 Quẻ Số 1: THẦN TÀI GÕ CỬA (Hệ Phú Bà)',
      content: 'Mùa thu này tài lộc của Mai Thảo sẽ bất ngờ tăng vọt! Tiền bạc đổ vào túi ào ào như nước mùa lũ. Sắp đạt tới cảnh giới đi shopping không cần nhìn giá!',
      advice: '✨ Lời khuyên vàng: Nhớ bao bạn thân ăn lẩu nướng để lộc lá không bị phân tán nhé!'
    },
    {
      stamp: 'THƯỢNG CÁT',
      title: '💖 Quẻ Số 2: TÌNH DUYÊN NỞ HOA (Hệ Thoát Ế)',
      content: 'Chàng bạch mã hoàng tử của mày đang phi nước đại về đích. Mùa trăng này khả năng cao sẽ có người tới đón đi chơi Trung Thu, chuẩn bị váy vóc xúng xính đi!',
      advice: '✨ Lời khuyên vàng: Bớt đanh đá với cà khịa bạn thân lại 10% thì chàng sẽ xuất hiện sớm hơn!'
    },
    {
      stamp: 'ĐẠI LỢI',
      title: '🥩 Quẻ Số 3: CHIẾN THẦN BẤT TỬ (Hệ Ăn Uống)',
      content: 'Nhận được năng lượng vũ trụ siêu cấp: Ăn 10 cái bánh Trung Thu thập cẩm trứng muối mà vòng eo vẫn con kiến 58cm, cơ thể tự động chuyển mỡ thành năng lượng xinh đẹp!',
      advice: '✨ Lời khuyên vàng: Cứ tự tin ăn uống thả ga, đừng để cơn thèm làm mờ đi vẻ đẹp!'
    },
    {
      stamp: 'ĐẶC BIỆT',
      title: '👑 Quẻ Số 4: ĐỆ NHẤT THƯƠNG HIỆU (Hệ "Chim To")',
      content: 'Dù ở đâu, làm gì thì danh hiệu "Thảo Chim To" vẫn mãi là biểu tượng tình bạn bất diệt không ai thay thế được. Mày luôn là trung tâm của mọi niềm vui trong nhóm!',
      advice: '✨ Lời khuyên vàng: Hãy tiếp tục lan tỏa sự lầy lội và nụ cười rạng rỡ này đến mọi người!'
    },
    {
      stamp: 'BÌNH AN',
      title: '🌟 Quẻ Số 5: BẤT BẠI TRƯỚC DEADLINE (Hệ Chăm Chỉ)',
      content: 'Sếp sẽ tự dưng thấy mày đáng yêu lạ thường, đồng nghiệp hỗ trợ nhiệt tình, deadline tự động kéo dài ra cho mày thảnh thơi vừa làm vừa lướt TikTok!',
      advice: '✨ Lời khuyên vàng: Làm việc hết mình, chơi hết nấc, ngủ đủ giấc là vạn sự hanh thông!'
    }
  ];

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

      // Pick next or random fortune
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * fortunes.length);
      } while (nextIdx === currentFortuneIndex && fortunes.length > 1);
      
      currentFortuneIndex = nextIdx;
      const f = fortunes[currentFortuneIndex];

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

  // --- 5. SKY LANTERN WISH RELEASE SYSTEM ---
  const wishInput = document.getElementById('wishInput');
  const releaseLanternBtn = document.getElementById('releaseLanternBtn');
  const lanternCountEl = document.getElementById('lanternCount');
  const flyingSky = document.getElementById('flyingLanternsSky');
  let totalLanterns = 18;

  // Preset buttons
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
      text = 'Chúc Mai Thảo luôn xinh đẹp, hạnh phúc và vạn sự đại cát! 🥮✨';
    }

    totalLanterns += 1;
    lanternCountEl.textContent = totalLanterns;
    playBellSFX();

    // Create Lantern Element
    const lantern = document.createElement('div');
    lantern.className = 'floating-sky-lantern';
    
    // Randomize horizontal start position
    const randomLeft = Math.random() * 70 + 15; // 15% to 85%
    lantern.style.left = `${randomLeft}vw`;

    lantern.innerHTML = `
      <div class="lantern-orb">🏮 Thảo</div>
      <div class="lantern-text-tag">${text}</div>
    `;

    flyingSky.appendChild(lantern);
    spawnHearts(window.innerWidth * (randomLeft / 100), window.innerHeight * 0.8, 6);

    // Clear input
    wishInput.value = '';

    // Remove lantern after animation finishes
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

  // --- 6. GÕ MÕ GIẢI NGHIỆP & TÍCH ĐỨC CHO THẢO ---
  function playMokugyoSFX() {
    try {
      initAudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      // Low wooden thud frequency sweep
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

  const woodenFishBtn = document.getElementById('woodenFishBtn');
  const fishCounter = document.getElementById('fishCounter');
  const fishRankBadge = document.getElementById('fishRankBadge');
  let meritCount = 68;

  const meritBuffs = [
    '+1 Công Đức 🙏',
    '+1 Tỷ Tiền Mặt Vào Ví 💸',
    '-5kg Mỡ Bụng Đón Thu 💃',
    '+1 Anh Bồ 6 Múi 1m85 💖',
    'Deadline Tự Động Biến Mất 🚀',
    '+999% Độ Xinh Gái 🌸',
    '+1 Chầu Lẩu Nướng Bạn Thân Bao 🥩',
    'Tăng 200% Độ "Chim To" 🐥',
    '+1 Vé Trúng Độc Đắc 🎟️',
    'Thần Thái Vô Địch Thiên Hạ 👑',
    'Mặt V-line Tự Nhiên ✨',
    'Uống Trà Sữa Không Béo 🧋'
  ];

  if (woodenFishBtn) {
    woodenFishBtn.addEventListener('click', (e) => {
      meritCount += 1;
      fishCounter.textContent = meritCount;
      playMokugyoSFX();

      // Bonk animation
      woodenFishBtn.classList.add('bonk');
      setTimeout(() => woodenFishBtn.classList.remove('bonk'), 120);

      // Rank update
      const rankSpan = fishRankBadge.querySelector('span');
      if (meritCount >= 100) {
        rankSpan.textContent = '🔥 Thảo Chim To - Đỉnh Nóc Kịch Trần';
        fishRankBadge.style.borderColor = '#ff4757';
      } else if (meritCount >= 85) {
        rankSpan.textContent = '💎 Đại Tiên Tri Triệu Phú Đô La';
      } else if (meritCount >= 75) {
        rankSpan.textContent = '🌟 Chiến Thần Tích Đức Vạn Người Mê';
      } else {
        rankSpan.textContent = '🧘‍♀️ Bậc Thầy Giải Nghiệp Phố Núi';
      }

      // Floating Merit Text
      const rect = woodenFishBtn.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || rect.top;

      const floatEl = document.createElement('div');
      floatEl.className = 'floating-merit';
      floatEl.textContent = meritBuffs[Math.floor(Math.random() * meritBuffs.length)];
      floatEl.style.left = `${x - 40}px`;
      floatEl.style.top = `${y - 20}px`;
      floatEl.style.setProperty('--mx', `${(Math.random() - 0.5) * 60}px`);

      document.body.appendChild(floatEl);
      setTimeout(() => floatEl.remove(), 1200);
    });
  }

  // --- 7. BẢN CAM KẾT BẠN THÂN (NÚT NÉ CHUỘT THẦN THÁNH) ---
  const contractRejectBtn = document.getElementById('contractRejectBtn');
  const contractAgreeBtn = document.getElementById('contractAgreeBtn');
  const contractResultMsg = document.getElementById('contractResultMsg');

  const rejectTaunts = [
    'Đố bắt được tao! 😜',
    'Hụt rồi nha lêu lêu! 😝',
    'Bấm nút Xanh đi đừng cố! 😂',
    'Chạy đâu cho thoát! 🏃‍♀️',
    'Bao bạn thân đi mà! 🥩',
    'Không thoát được đâu! 🐥',
    'Bấm nút kia đi nè! 👉'
  ];

  let rejectTries = 0;

  function dodgeButton(e) {
    if (e) e.preventDefault();
    rejectTries++;
    playBellSFX();

    // Random displacement within a bounding box
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
      contractResultMsg.innerHTML = `
        🎊 <strong>XÁC NHẬN KÝ KẾT THÀNH CÔNG!</strong> 🎊<br>
        Bên B (Mai Thảo) đã tự nguyện cam kết bao bạn thân ăn lẩu nướng thả ga!<br>
        <span style="font-size: 0.95rem; color: #ffeaa7;">Hợp đồng đã được lưu vào sổ Nam Tào, không thể hủy bỏ! 🍻💖</span>
      `;
      contractResultMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

});
