/**
 * Multi-Profile Configuration for Mid-Autumn Festival Web
 * Supports:
 * - 'thao': Mai Thảo ("Thảo Chim To") - Default
 * - 'trang': Thu Trang ("Lốp Siêu Cấp")
 */

const PROFILES_DATA = {
  thao: {
    key: 'thao',
    name: 'Mai Thảo',
    nickname: '"Đệ Nhất Mỹ Nhân - Thảo Chim To" 🐥👑',
    aliasOnly: 'Thảo Chim To',
    avatar: 'assets/images/thao_avatar.png',
    vinylAvatar: 'assets/images/thao_avatar.png',
    pageTitle: 'Đêm Trăng Độc Bản - Chúc Mừng Trung Thu Mai Thảo 🥮✨',
    metaDesc: 'Trang web chúc Tết Trung Thu độc quyền, hài hước và lung linh dành tặng bạn thân Mai Thảo (Thảo Chim To).',
    heroTagline: '🌕 TẾT TRUNG THU ĐỘC BẢN 2026 🥮',
    heroTitle: 'Chúc <span class="gradient-gold">Mai Thảo</span><br>Mùa Trăng Rực Rỡ!',
    heroSubtitle: 'Gửi tới : <strong>"Thảo Chim To"</strong> 🐥✨',
    badges: [
      '🔥 Chiến Thần Diệt Mồi',
      '👑 Đệ Nhất Bạn Thân',
      '✨ Xinh Đẹp Triệu View',
      '🐥 Đại Diện Thương Hiệu "Chim To"',
      '💸 Phú Bà Tương Lai Bao Bạn Bè'
    ],
    letterRecipientTitle: 'Kính gửi: Cô Bạn Mai Thảo',
    letterAliasTag: 'Bí danh giang hồ: <em>Thảo Chim To</em>',
    letterGreetingLead: 'Thân gửi bạn hiền Mai Thảo,',
    letterParagraphs: [
      'Lại một mùa Tết Trung Thu nữa cập bến, ngước nhìn lên bầu trời thấy trăng tháng Tám tròn vành vạnh, sáng rực rỡ... hệt như khuôn mặt tròn trĩnh đáng yêu của mày sau những bữa ăn nướng, buffet lẩu thâu đêm suốt sáng vậy đó! 😂',
      'Dân gian bảo <em>"Có bạn thân là phúc đức ba đời"</em>, mà tao lại vớ ngay được một quả bạn vừa xinh đẹp, đáng yêu, lại vừa hay dỗi nhưng lúc ăn thì nhanh như chớp. Dù mày có biệt danh "chim to" lẫy lừng vũ trụ hay làm bao trò con bò lầy lội, thì đối với tao, mày vẫn luôn là một tri kỷ vô giá và đáng trân quý nhất trần đời!'
    ],
    letterFiveWishes: [
      '🥮 <strong>Bánh Trung Thu:</strong> Ăn bao nhiêu cái thập cẩm trứng muối cũng không bao giờ tăng nửa lạng!',
      '💰 <strong>Tiền Bạc:</strong> Tiền lương, tiền thưởng chảy vào tài khoản ầm ầm như thác đổ, sớm giàu để bao tao đi ăn!',
      '💼 <strong>Sự Nghiệp:</strong> Deadline nhìn thấy mày tự động giật mình né xa, công việc trơn tru thuận buồm xuôi gió!',
      '❤️ <strong>Tình Cảm:</strong> Sớm có anh người yêu lý tưởng rước đi cho bạn bè bớt lo, nhưng nhớ không được bỏ bê tao!',
      '✨ <strong>Nụ Cười:</strong> Mãi giữ nụ cười rạng rỡ, xinh đẹp, yêu đời và luôn hạnh phúc như bây giờ nhé!'
    ],
    woodenFishTitle: 'Gõ Mõ Giải Nghiệp - Tích Đức Cho Thảo',
    woodenFishDesc: 'Chạm liên tục vào Chiếc Mõ Thỏ Ngọc để giải trừ nghiệp chướng, hút tài lộc và nhận buff tối thượng!',
    woodenFishBuffs: [
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
      'Uống Trà Sữa Không Béo 🧋'
    ],
    woodenFishMaxRank: '🔥 Thảo Chim To - Đỉnh Nóc Kịch Trần',
    polaroidSectionTitle: 'Hồ Sơ "Dìm Hàng & Tỏa Sáng" Của Thảo',
    polaroidPhotos: [
      {
        img: 'assets/images/thao_1.png',
        title: 'Khoảnh Khắc Mỹ Nhân ✌️',
        captionTitle: 'Khoảnh Khắc Mỹ Nhân ✌️',
        desc: 'Nháy mắt một cái làm xiêu lòng bao chàng trai, nhưng bạn bè thì thấy hơi sến!'
      },
      {
        img: 'assets/images/thao_2.png',
        title: 'Chuyên Gia Sống Ảo 📱',
        captionTitle: 'Chuyên Gia Sống Ảo 📱',
        desc: 'Đứng trước gương chỉnh dáng 1 tiếng rưỡi chỉ để lấy được góc chụp chân dài này!'
      },
      {
        img: 'assets/images/thao_3.png',
        title: 'Nụ Cười Tỏa Nắng 🌸',
        captionTitle: 'Nụ Cười Tỏa Nắng 🌸',
        desc: 'Những lúc dịu dàng không chửi bạn bè thì nhìn cũng nết na, hiền thục phết chứ đùa!'
      },
      {
        img: 'assets/images/thao_4.png',
        title: 'Chiến Thần Đồ Nướng 🥩',
        captionTitle: 'Chiến Thần Đồ Nướng 🥩',
        desc: 'Tâm hồn ăn uống vô đáy: "Tao chỉ ăn nốt miếng này thôi rồi tao giảm cân thật!"'
      },
      {
        img: 'assets/images/thao_5.png',
        title: 'Nỗi Đau Deadline 💻',
        captionTitle: 'Nỗi Đau Deadline 💻',
        desc: 'Bất lực trước công việc nhưng vẫn phải gồng mình kiếm tiền nuôi thân và bao bạn!'
      }
    ],
    fortuneSectionDesc: 'Chạm vào chiếc bánh nướng vàng ruộm để giải mã vận mệnh mùa thu của Mai Thảo!',
    fortunes: [
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
    ],
    wishSectionTitle: 'Thả Đèn Trời Cầu May Cùng Thảo',
    wishRabbitSpeech: '"Ước gì cũng được nha Thảo ơi, trăng rằm sẽ lắng nghe hết nè! 🐰✨"',
    wishInputLabel: '✍️ Nhập điều ước bí mật mùa Trăng của Thảo:',
    wishCounterText: 'Đã có <strong id="lanternCount">18</strong> chiếc đèn lồng của Thảo đang tỏa sáng trên bầu trời đêm!',
    lanternTagPrefix: '🏮 Thảo',
    defaultWish: 'Chúc Mai Thảo luôn xinh đẹp, hạnh phúc và vạn sự đại cát! 🥮✨',
    contractPartyB: 'Mai Thảo (Biệt danh độc quyền: <em>Thảo Chim To</em> 🐥)',
    contractAliasMention: 'Thảo Chim To',
    contractConfirmMsg: `
      🎊 <strong>XÁC NHẬN KÝ KẾT THÀNH CÔNG!</strong> 🎊<br>
      Bên B (Mai Thảo) đã tự nguyện cam kết bao bạn thân ăn lẩu nướng thả ga!<br>
      <span style="font-size: 0.95rem; color: #ffeaa7;">Hợp đồng đã được lưu vào sổ Nam Tào, không thể hủy bỏ! 🍻💖</span>
    `,
    footerNote: 'Được thiết kế với tất cả sự trân trọng & hài hước dành riêng cho <strong>Mai Thảo (Thảo Chim To)</strong>.'
  },

  trang: {
    key: 'trang',
    name: 'Thu Trang',
    nickname: '"Đại Sứ Thương Hiệu - Lốp Siêu Cấp" 🛞👑',
    aliasOnly: 'Lốp Siêu Cấp',
    avatar: 'assets/images/trang/avatar.png',
    vinylAvatar: 'assets/images/trang/avatar.png',
    pageTitle: 'Đêm Trăng Độc Bản - Chúc Mừng Trung Thu Thu Trang 🥮✨',
    metaDesc: 'Trang web chúc Tết Trung Thu độc quyền, hài hước và lung linh dành tặng bạn thân Thu Trang (Lốp Siêu Cấp).',
    heroTagline: '🌕 TẾT TRUNG THU ĐỘC BẢN 2026 🥮',
    heroTitle: 'Chúc <span class="gradient-gold">Thu Trang</span><br>Mùa Trăng Rực Rỡ!',
    heroSubtitle: 'Gửi tới : <strong>"Lốp Siêu Cấp"</strong> 🛞✨',
    badges: [
      '🛞 Đệ Nhất Lốp Siêu Cấp',
      '✨ Nàng Thơ Ninh Bình Triệu View',
      '🧋 Chiến Thần Trà Sữa Khổng Lồ',
      '⚡ Kỷ Lục Ôm Cột Tạo Dáng',
      '💸 Phú Bà Tương Lai Bao Bạn Bè'
    ],
    letterRecipientTitle: 'Kính gửi: Cô Bạn Thu Trang',
    letterAliasTag: 'Bí danh giang hồ: <em>Lốp Siêu Cấp</em>',
    letterGreetingLead: 'Thân gửi bạn hiền Thu Trang,',
    letterParagraphs: [
      'Lại một mùa Tết Trung Thu nữa cập bến! Ngước nhìn lên bầu trời thấy trăng tháng Tám tròn vành vạnh, sáng lung linh... hệt như khuôn mặt baby đáng yêu của mày sau những ly trà sữa full topping size khổng lồ vậy đó! 😂',
      'Dân gian bảo <em>"Có bạn thân là phúc đức ba đời"</em>, tao may mắn vớ ngay được quả bạn vừa xinh xắn chuẩn "Nàng thơ Ninh Bình", lại vừa sở hữu biệt danh "Lốp Siêu Cấp" lừng lẫy thiên hạ kiêm kỹ năng ôm cột sắt tạo dáng độc nhất vô nhị. Dù mày có làm bao trò con bò hay dỗi hờn, thì đối với tao, mày vẫn luôn là một tri kỷ vô cùng đáng quý và mang lại nhiều tiếng cười nhất!'
    ],
    letterFiveWishes: [
      '🥮 <strong>Bánh Trung Thu & Trà Sữa:</strong> Uống trà sữa mỗi ngày, ăn bao nhiêu cái bánh nướng trứng muối cũng không bao giờ tăng nửa lạng!',
      '💰 <strong>Tiền Tài:</strong> Tiền lương thưởng đổ về tài khoản ào ào như thác lũ, sớm giàu sang thành phú bà bao bạn bè!',
      '🛞 <strong>Thương Hiệu "Lốp":</strong> Danh hiệu Lốp Siêu Cấp mãi bền bỉ theo năm tháng, tay lái vững vàng trên mọi nẻo đường!',
      '💼 <strong>Công Việc:</strong> Mọi thử thách đều vượt qua êm ru, sếp quý đồng nghiệp thương, công danh rực rỡ!',
      '✨ <strong>Hạnh Phúc:</strong> Mãi giữ nụ cười rạng rỡ, xinh đẹp, luôn yêu đời và bình an trong cuộc sống nhé!'
    ],
    woodenFishTitle: 'Gõ Mõ Giải Nghiệp - Tích Đức Cho Trang',
    woodenFishDesc: 'Chạm liên tục vào Chiếc Mõ Thỏ Ngọc để giải trừ nghiệp chướng, tích lộc đầy nhà và nhận siêu buff!',
    woodenFishBuffs: [
      '+1 Công Đức 🙏',
      '+1 Tỷ Tiền Mặt Vào Ví 💸',
      '-5kg Mỡ Bụng Đón Thu 💃',
      '+1 Cốc Trà Sữa Siêu To Khổng Lồ 🧋',
      '+1 Anh Bồ 6 Múi 1m85 Chiều Chuộng 💖',
      'Tăng 300% Độ "Lốp Siêu Cấp" 🛞',
      '+999% Độ Xinh Gái Chuẩn Nàng Thơ 🌸',
      '+1 Chầu Lẩu Nướng Bạn Thân Bao 🥩',
      'Kỹ Năng Ôm Cột Đi Vào Lịch Sử ⚡',
      '+1 Vé Số Trúng Độc Đắc 🎟️',
      'Vạn Sự Đại Cát Đại Lợi ✨'
    ],
    woodenFishMaxRank: '🛞 Thu Trang - Lốp Siêu Cấp Đỉnh Nóc Kịch Trần',
    polaroidSectionTitle: 'Hồ Sơ "Dìm Hàng & Tỏa Sáng" Của Trang',
    polaroidPhotos: [
      {
        img: 'assets/images/trang/trang_1.png',
        title: 'Nàng Thơ Ninh Bình 🌸',
        captionTitle: 'Nàng Thơ Ninh Bình 🌸',
        desc: 'Xúng xính váy áo check-in Ninh Bình xin chào, góc chụp triệu like chuẩn mỹ nhân vạn người mê!'
      },
      {
        img: 'assets/images/trang/trang_2.png',
        title: 'Thời Áo Xanh Thơ Ngây 💙',
        captionTitle: 'Thời Áo Xanh Thơ Ngây 💙',
        desc: 'Nụ cười e ấp bên bàn học, nhìn thùy mị nết na đúng chuẩn con ngoan trò giỏi chưa từng thấy!'
      },
      {
        img: 'assets/images/trang/trang_3.png',
        title: 'Tâm Hồn Ăn Uống Vô Đáy 🧋',
        captionTitle: 'Tâm Hồn Ăn Uống Vô Đáy 🧋',
        desc: 'Ly trà sữa to bằng cả khuôn mặt nhưng quyết tâm cắm ống hút uống hết veo trong một nốt nhạc!'
      },
      {
        img: 'assets/images/trang/trang_4.png',
        title: 'Chiến Thần Ôm Cột Bất Hủ 🏆',
        captionTitle: 'Chiến Thần Ôm Cột Bất Hủ 🏆',
        desc: 'Khoảnh khắc huyền thoại: Ngồi xổm ôm chặt cột sắt ngoài sân, thần thái đỉnh cao chấm điểm 10 không có nhưng!'
      },
      {
        img: 'assets/images/trang/trang_5.png',
        title: 'Mặt Hoa Da Phấn Áo Meme 🦋',
        captionTitle: 'Mặt Hoa Da Phấn Áo Meme 🦋',
        desc: 'Khuôn mặt filter lấp lánh xinh đẹp nhưng chiếc áo in hình bựa bên dưới đã tố cáo độ lầy lội vô đối!'
      }
    ],
    fortuneSectionDesc: 'Chạm vào chiếc bánh nướng vàng ruộm để giải mã vận mệnh mùa thu của Thu Trang!',
    fortunes: [
      {
        stamp: 'ĐẠI CÁT',
        title: '🥮 Quẻ Số 1: THẦN TÀI GÕ CỬA (Hệ Phú Bà)',
        content: 'Mùa thu này tài lộc của Thu Trang sẽ bùng nổ dữ dội! Tiền bạc đổ vào túi như thác lũ. Sắp đạt tới cảnh giới mua sắm thả ga không cần check giá tài khoản!',
        advice: '✨ Lời khuyên vàng: Nhớ bao bạn thân ăn lẩu nướng để lộc lá lưu thông dồi dào nhé!'
      },
      {
        stamp: 'THƯỢNG CÁT',
        title: '💖 Quẻ Số 2: TÌNH DUYÊN RỰC RỠ (Hệ Thoát Ế)',
        content: 'Chàng bạch mã hoàng tử của mày đang phi nước đại tới tìm Nàng thơ Ninh Bình. Mùa trăng này khả năng cao sẽ có người đưa đón đi chơi Trung Thu!',
        advice: '✨ Lời khuyên vàng: Bớt cà khịa bạn thân lại 10% thì chàng sẽ xuất hiện sớm hơn gấp đôi!'
      },
      {
        stamp: 'ĐẠI LỢI',
        title: '🧋 Quẻ Số 3: CHIẾN THẦN TRÀ SỮA (Hệ Vô Địch)',
        content: 'Nhận được năng lượng vũ trụ siêu cấp: Uống 100 ly trà sữa trân châu hoàng kim mà dáng vẫn thon gọn nuột nà, cơ thể tự chuyển đường thành sự xinh đẹp!',
        advice: '✨ Lời khuyên vàng: Cứ tự tin thưởng thức, đừng để nỗi sợ tăng cân cản bước đam mê!'
      },
      {
        stamp: 'ĐẶC BIỆT',
        title: '🛞 Quẻ Số 4: ĐỆ NHẤT THƯƠNG HIỆU (Hệ "Lốp Siêu Cấp")',
        content: 'Dù ở bất kỳ phương trời nào, thương hiệu "Lốp Siêu Cấp" vẫn là độc bản quý báu không ai thay thế được. Mày mãi là nguồn năng lượng tích cực nhất của nhóm!',
        advice: '✨ Lời khuyên vàng: Tiếp tục lan tỏa nụ cười rạng rỡ và sự hài hước đáng yêu này nhé!'
      },
      {
        stamp: 'BÌNH AN',
        title: '🌟 Quẻ Số 5: BẤT BẠI TRƯỚC MỌI THỬ THÁCH (Hệ May Mắn)',
        content: 'Vạn sự hanh thông, quý nhân phù trợ, việc khó hóa dễ, đi tới đâu cũng được mọi người yêu thương và giúp đỡ hết lòng!',
        advice: '✨ Lời khuyên vàng: Cứ luôn vui vẻ, mỉm cười và tự tin vào chính mình!'
      }
    ],
    wishSectionTitle: 'Thả Đèn Trời Cầu May Cùng Trang',
    wishRabbitSpeech: '"Ước gì cũng được nha Trang ơi, trăng rằm sẽ lắng nghe hết nè! 🐰✨"',
    wishInputLabel: '✍️ Nhập điều ước bí mật mùa Trăng của Trang:',
    wishCounterText: 'Đã có <strong id="lanternCount">22</strong> chiếc đèn lồng của Trang đang tỏa sáng trên bầu trời đêm!',
    lanternTagPrefix: '🏮 Trang',
    defaultWish: 'Chúc Thu Trang luôn xinh đẹp, hạnh phúc và vạn sự đại cát! 🥮✨',
    contractPartyB: 'Thu Trang (Biệt danh độc quyền: <em>Lốp Siêu Cấp</em> 🛞)',
    contractAliasMention: 'Lốp Siêu Cấp',
    contractConfirmMsg: `
      🎊 <strong>XÁC NHẬN KÝ KẾT THÀNH CÔNG!</strong> 🎊<br>
      Bên B (Thu Trang) đã tự nguyện cam kết bao bạn thân ăn lẩu nướng và trà sữa thả ga!<br>
      <span style="font-size: 0.95rem; color: #ffeaa7;">Hợp đồng đã được lưu vào sổ Nam Tào, không thể hủy bỏ! 🍻💖</span>
    `,
    footerNote: 'Được thiết kế với tất cả sự trân trọng & hài hước dành riêng cho <strong>Thu Trang (Lốp Siêu Cấp)</strong>.'
  }
};
