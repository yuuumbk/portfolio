'use strict';

$(function () {

  /**
   * ヘッダー分コンテンツを下げる
   */

  // var headerHeight = $('#header').outerHeight();
  // $('#top').css({
  //   marginTop: headerHeight,
  // });



  /**
   * ハンバーガー
   */

  var humBtn = '.mb .ham-btn',
    link = '.mb .menu .list .list-item a';

  $(humBtn).add(link).on('click', function () {
    $('.menu, .ham-btn-line').toggleClass('open');
  });

  // ナビゲーションの外側がタップされた時、ナビゲーションを閉じる→タップされた場所に限らず時は閉じるように変更
  $(document).on('click', function (e) {
    var $target = $(e.target);

    if (!$target.closest(humBtn).length) {
      $('.menu, .ham-btn-line').removeClass('open');
    }
  });



  /**
   * raindrops
   */

  $('.rain').raindrops({
    color: '#444',
    waveLength: 400,
    frequency: 5,
    waveHeight: 80,
    density: 0,
    rippleSpeed: 0.002,
    canvasWidth: 2000,
    canvasHeight: 100,
    positionBottom: 0,
    positionLeft: 0
  });



  /**
   * 画面に入ったらフェードインする
   */

  //フェードインさせたい要素を非表示
  $('.scroll-fadein').each(function () {
    $(this).addClass('invisible');
  });

  //ウィンドウの高さを取得
  var windowHeight = $(window).height();

  //1秒間に5回までイベントを発生
  $(window).on('scroll', $.throttle(200, function () {
    scroll();
  }))
    .delay(600).trigger('scroll');// 画面途中でリロードされた場合も対象要素をフェードインさせる

  /**
   * スクロール処理
   * @param {*} delay
   */

  function scroll() {
    $('.scroll-fadein').each(function () {
      var $scrollFadeIn = $(this),
        scrollFadeInOffset = $scrollFadeIn.offset().top;

      fadeIn();

      /**
       * スクロール時のフェードイン処理
       */

      function fadeIn() {
        var scrollAmount = $(window).scrollTop();

        if (scrollAmount > scrollFadeInOffset - windowHeight + 30) {
          $scrollFadeIn.addClass('scrollin');
        } else if (scrollAmount <= scrollFadeInOffset - windowHeight) {
          $scrollFadeIn.removeClass('scrollin');
        }
      }
    });
  }



  /**
 * スライドショー
 */

  var glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    hoverpause: false,
    peek: {
      before: 50,
      after: 50
    },
    perView: 4,
    gap: -50,
    breakpoints: {
      1500: {
        perView: 3,
        gap: -40,
      },
      1150: {
        perView: 2,
        gap: -30,
      },
      700: {
        perView: 1,
        gap: -30,
      }
    },
    autoplay: 3000,
  });

  glide.mount();



  /**
   * 年齢・学年自動計算
   *
   * data-birthにYYYY/mm/ddの形式で指定
   */

  var today = new Date();

  $('.birth').each(function () {
    //年齢
    var birth = $(this).data('birth');
    var birthDate = new Date(birth);

    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    age = Math.max(age, 0);
    var value = age + '歳';

    //学年
    var graduate = new Date('2025/03/31');

    if ((graduate.getFullYear() - today.getFullYear()) >= 0) {
      var grade = 4 - (graduate.getFullYear() - today.getFullYear());
      var month = (graduate.getMonth()) - (today.getMonth());

      if (month < 0 || (month === 0 && graduate.getDate() < birthDate.getDate())) {
        grade++;
      }

      if (grade < 5) {
        value += ' - 大学' + grade + '年生';
      }
    }

    $(this).append(value);
  });



  /**
   * Topに戻るボタンの表示管理
   */

  // ボタンを隠す
  var $toTop = $('.to-top');
  $toTop.hide();
  // windowの高さを取得
  var windowHeight = $(window).height();

  $(window).on('scroll', $.throttle(200, function () {
    if ($(this).scrollTop() > windowHeight) {
      $toTop.fadeIn(500);
    } else {
      $toTop.fadeOut(500);
    }
  }));


  /**
   * スキルスライドショーjs有効であれば表示
   */

  $('.glide__track, .glide__arrow').css({
    display: 'block',
  });



  /**
   * スキル一覧の表示
   * PCの時のみ
   */

  // 初期表示数
  // if (window.matchMedia('(min-width: 1025px)').matches) { // PC
  //   var defaultNum = 2;
  // } else { // モバイル
  //   var defaultNum = 4;
  // }

  var $mb = $('.skills .mb'),
    $list = $mb.find('.skill-list'),
    $item = $list.find('.skill-item'),
    $moreBtn = $('.skill-more-btn'),
    $skillBtn = $('a[href^="#skill"]'),
    $clickBtn = $('.skill-click'),
    $closeBtn = $('.skill-close-btn'),
    defaultNum = 4,// 初期表示数
    hiddenList = 'li:not(:lt(' + defaultNum + '))';

  // defaultNum分以外は非表示
  $list.find(hiddenList).hide();
  $list.addClass('has-skill-btn');

  skillBtn();

  // ウィンドウ幅が変更されたら実行
  $(window).resize(function () {
    skillBtn();
  });

  /**
   * ウィンドウ幅に応じて表示するボタンを変える
   */

  function skillBtn() {
    if (window.matchMedia('(min-width: 1025px)').matches) { // PC
      $moreBtn.show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }

      clickBtn('pc');
      closeBtn('pc');
    } else { // モバイル
      $moreBtn.show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }

      clickBtn('mb');
      closeBtn('mb');
    }
  }

  /**
   * スキルボタン・クリックボタン・詳細ボタンが押された時の処理
   */

  var WorkListOffset = $list.offset().top,
    defaultNumWorkOffset = $item.eq(defaultNum - 1).offset().top;

  function clickBtn() {
    $skillBtn.add($clickBtn).add($moreBtn).on('click', function () {
      // 余白を調整
      $mb.css({ marginBottom: 0 });
      // 下部のグラデーションを消し要素を完全に表示
      $list.removeClass('has-skill-btn');
      // 全ての要素を表示
      $list.find('li:gt(' + (defaultNum - 1) + ')').removeClass('invisible').addClass('visible').show();
      // 上部のcloseボタンの位置の調節
      $('.skill-close-btn-height').css({ height: 0 });
      // ボタンの表示設定
      $moreBtn.hide();
      $closeBtn.fadeIn();
    });
  }

  /**
   * 閉じるボタンが押された時の処理
   */
  function closeBtn() {
    $closeBtn.on('click', function () {
      // 余白を調整
      $mb.css({ marginBottom: 160 });
      // 下部にグラデーションをつけてだんだん非表示にする
      $list.addClass('has-skill-btn');
      // defaultNum分以外の要素を非表示に
      $list.find('li:gt(' + (defaultNum - 1) + ')').removeClass('visible').addClass('invisible').hide();
      // 上部のcloseボタンの位置の調節
      $('.skill-close-btn-height').css({ height: '86px' });
      //ボタンの表示設定
      $closeBtn.hide();
      $moreBtn.show();

      // Safariで下部のcloseボタンを押すと、スクロール量が保持されないバグ対策
      // まず、defaultNumの一番下の要素の位置に移動する
      $('html, body').scrollTop(defaultNumWorkOffset);
      // 次に、一番上の要素までduration秒でスクロールする
      var duration = 300,
        easing = 'swing';

      $('html, body').stop().animate({
        scrollTop: WorkListOffset - 65,
      }, duration, easing);
    });
  }




  /**
   * スムーズスクロール
   */

  // スムーズスクロールをする要素を指定
  // クラス名

  // all
  var smooth = [
    'down-allow',
  ]

  // to-
  var smoothTo = [
    'top',
    'service',
    'about',
    'skills',
    'works',
    'contact',
  ];

  // to-skill-
  var smoothToSkill = [
    'HTML5',
    'CSS3',
    'Sass',
    'JavaScript',
    'jQuery',
    'PHP',
    'Laravel',
    'Ruby',
    'Python',
    'DB',
    'MySQL',
    'GitHub',
    'Docker',
  ];

  $.each(smooth, function (i, val) {
    smoothScroll('.' + val);
  });

  $.each(smoothTo, function (i, val) {
    smoothScroll('.to-' + val);
  });

  $.each(smoothToSkill, function (i, val) {
    var offset = 65;

    // リストが完全表示されていない時にスクロールしようとするとエラーとなるのを防ぐ
    setTimeout(smoothScroll('.to-skill-' + val, offset), 200);
  });

  /**
   * スムーズスクロール
   * @param {*} target 対象要素を指定
   * @param {*} offset スクロール時に上に指定分余白を開ける（ナビゲーションと重ならないようにするため）
   * @param {*} duration アニメーション時間
   * @param {*} easing アニメーション緩急
   */

  function smoothScroll(target, offset = 150, duration = 800, easing = 'easeInOutCirc') {
    $(target).find('a').on('click', function (e) {
      e.preventDefault();

      var target = this.hash,
        $target = $(target);

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - offset,
      }, duration, easing);
    });
  }



  /**
   * スキルのスライド
   * clickを促すボタンのスクロール処理
   */

  $.each(smoothToSkill, function (i, val) {
    var offset = 65;

    // リストが完全表示されていない時にスクロールしようとするとエラーとなるのを防ぐ
    setTimeout(smoothScrollSkillClick('.to-skill-' + val + ' .skill-click', offset), 200);
  });

  /**
   * スムーズスクロール　スキルクリック限定版
   * パラメータはスライドのスムーズスクロールと同期している。
   * @param {*} target 対象要素を指定
   * @param {*} offset スクロール時に上に指定分余白を開ける（ナビゲーションと重ならないようにするため）
   * @param {*} duration アニメーション時間
   * @param {*} easing アニメーション緩急
   */

  function smoothScrollSkillClick(target, offset = 150, duration = 800, easing = 'easeInOutCirc') {
    $(target).on('click', function (e) {
      e.preventDefault();

      var target = $(this).next().attr("href"),//スライドのaリンクを参照
        $target = $(target);

      $('html, body').animate({
        'scrollTop': $target.offset().top - offset,
      }, duration, easing);
    });
  }



  /**
   * スキルリストの高さを最も高いものに合わせる
   * flex boxとpositionの影響により、自動的に高さが合わないためjsで指定する
   */

  //最も高いスキルリストの高さ
  var maxHeight = getMaxHeight();

  $('.skill-item').each(function () {
    $(this).css({
      height: maxHeight,
    });
  });

  /**
   * 最も高いスキルリストの高さを返す
   * pcの場合、スキルリストはdisplay:noneとなっており、
   * 高さを取得できないため、この処理の間のみ、リストを表示する
   * 処理が終わり次第、再度非表示にする
   */
  function getMaxHeight() {
    var maxHeight,
      $list = $('.mb .skill-list');//エラーが出る場合があるため、こちらでも指定

    $list.find(hiddenList).show();

    $('.skill-item').each(function () {
      maxHeight = $(this).outerHeight();
    });

    $list.find(hiddenList).hide();

    return maxHeight;
  }



  /**
   * SKILLSの名前で数字を含むもののみアンダーラインの調整
   */

  $('.skill-name:has(.num-pos)').each(function () {
    $(this).addClass('has-num-pos');
  });



  /**
   * SKILLSでサブスキルを持たないスキルのリンクの大きさを調整
   */

  $('.glide__slide:not(:has(.sub-skill))').each(function () {
    $(this).addClass('not-has-sub-skill');
  });



  /**
   * workのポップアップ
   */

  var work = '.works-library .work',
    $work = $(work),
    $overlay = $('.overlay'),
    $hidden = $('.hidden'),
    detailView = 'detail-view';

  workPopUp();

  // ウィンドウ幅が変更されたら再度実行
  $(window).resize(function () {
    workPopUp();
  })
    .scroll(function () {
      workPopUp();
    });

  /**
   * workのポップアップ処理
   */

  function workPopUp() {

    if (window.matchMedia('(min-width: 600px)').matches) { // PC・タブレット

      $work.on('click', function () {
        // ポップアップを表示
        var clone = $(this).clone();
        $overlay.find('.hidden').append(clone);

        // オーバーレイを表示し、後ろを暗くする
        $overlay.addClass(detailView);

        // スクロールを禁止させる
        $('html').css({ overflow: 'hidden' });
      });

      $overlay.css({
        top: $(window).scrollTop() - 48,
        height: ' calc(100vh + 48px)',
      });

      $overlay.on('click', function () {
        // オーバーレイを非表示にする
        $overlay.removeClass(detailView).find('.hidden').empty();

        // スクロール禁止を解除
        $('html').css({ overflow: 'auto' });
      });

      // 親要素（overlay）のclick継承されて、期待通りの動作をしないため、
      // stopPropagation()で親要素のイベントの発火を抑える
      $hidden.on('click', function (e) {
        e.stopPropagation();
      });
    } else { // mb
      $work.off();
      $overlay.off();
      // スクロール禁止を解除
      $('html').css({ overflow: 'auto' });
    }
  }



  /**
   * Works スマートフォン用more&closeボタン
   * 押されたボタンを含むworkのみを対象とする
   */

  var $workMoreBtn = $('.work-allow-more');

  workMoreAndCloseBtn();

  /**
   * work more close ボタン関係の処理
   */

  function workMoreAndCloseBtn() {

    // ボタンが押されたworkのoffsetを格納
    var workOffsets = [];

    $workMoreBtn.each(function(){
      var index = $(this).parent().index(),// 何番目のworkか取得
        workOffset = $(this).offset().top;// 要素のスクロール量を取得
      // スクロール量を対応する場所に格納
      // ※470は調整のため
      workOffsets[index] = workOffset - 470;
    });

    $workMoreBtn.on('click', function () {
      var index = $(this).parent().index();// 何番目のworkか取得

      if ($(this).find('.down-allow-more-btn').length) {// moreボタンが押された時
        $(this).find('.btn').removeClass('down-allow-more-btn').addClass('upp-allow-close-btn');
        $(this).parent().addClass(detailView);
      } else {// closeボタンが押された時
        $(this).find('.btn').removeClass('upp-allow-close-btn').addClass('down-allow-more-btn');
        $(this).parent().removeClass(detailView);
      }

      // スクロール料を配列から取り出し、その位置にスクロールさせる
      // display:flex;の関係か、意図した位置を取得できていないため、
      // workOffsetsは相対位置として利用する
      var duration = 300,
        easing = 'easeInOutCirc';

      $('html, body').animate({
        scrollTop: workOffsets[index],
      }, duration, easing);
    });
  }

  /**
   * メールフォーム
   */

  /**
   * validation
   */

  // verification options

  var verificationOptions = {
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      type: {
        required: true,
      },
      content: {
        required: true,
      }
    },
    messages: {
      name: {
        required: 'お名前が未入力です。',
      },
      email: {
        required: 'メールアドレスが未入力です。',
        email: 'メールアドレスが正しくありません。',
      },
      type: {
        required: 'お問い合わせ種別が未選択です。',
      },
      content: {
        required: 'お問い合わせ内容が未入力です。',
      }
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.data('error_placement'));
    }
  }

  // コンタクトフォームのinputオブジェクト
  var $contactFormName = $('#contact-form-name'),
    $contactFormEmail = $('#contact-form-email'),
    $contactFormType = $('.contact-form-type'),
    $contactFormContent = $('#contact-form-content'),
    $contactFormSubmit = $('.contact-form-submit');

  // フォーカスが外れた時にバリデーション
  $('.contact-form').validate(verificationOptions);

  // バリデーションOKだった場合は枠を緑色にする。
  //          NGだった場合は枠を赤色にする。

  // name, content
  $contactFormName.add($contactFormContent).each(function () {
    // キーが離された時
    $(this).keyup(function () {
      if ($(this).valid()) {
        $(this).css({
          border: '1px solid #65ab31',
        });
      } else {
        $(this).css({
          border: '1px solid #ea5550',
        });
      }
    });

    // フォーカスが外れた時
    $(this).blur(function () {
      if ($(this).valid()) {
        $(this).css({
          border: '1px solid #65ab31',
        });
      } else {
        $(this).css({
          border: '1px solid #ea5550',
        });
      }
    });
  });

  // email
  $contactFormEmail.each(function () {
    $(this).blur(function () {
      if ($(this).valid()) {
        $(this).css({
          border: '1px solid #65ab31',
        });
      } else {
        $(this).css({
          border: '1px solid #ea5550',
        });
      }
    });
  });

  // type
  // 変更されたことがある（=何かしらにチェックが入っている）かのフラグ
  var typeChanged = false;
  $contactFormType.each(function () {
    $(this).change(function () {
      // 擬似要素はjsからは変更できないため、styleに直接記述する
      $('style').html('.contact-form-underline:after {background-color: #65ab31 !important;}');
      typeChanged = true;
    });
  });

  $contactFormSubmit.on('click', function (e) {
    e.preventDefault();

    // ボタンが押された時にバリデーション
    $('.contact-form').validate(verificationOptions);

    // バリデーションでエラーが出たら送信しない
    var flag = true;

    // name
    if (!$contactFormName.valid()) {
      $contactFormName.css({
        border: '1px solid #ea5550',
      });
      flag = false;
    }
    // email
    if (!$contactFormEmail.valid()) {
      $contactFormEmail.css({
        border: '1px solid #ea5550',
      });
      flag = false;
    }
    // content
    if (!$contactFormContent.valid()) {
      $contactFormContent.css({
        border: '1px solid #ea5550',
      });
      flag = false;
    }
    // radio(only style)
    if (!typeChanged) {
      // 擬似要素はjsからは変更できないため、styleに直接記述する
      $('style').html('.contact-form-underline:after {background-color: #ea5550 !important;}');
    }
    // その他radioなど
    if (!$('.contact-form').valid()) {
      flag = false;
    }

    if (!flag) {
      return;
    }

    // 送信内容
    var name = $contactFormName.val(),
      email = $contactFormEmail.val(),
      type = $('#contact-form-type:checked').val(),
      message = $contactFormContent.val();

    //debug
    // console.log(name);
    // console.log(email);
    // console.log(type);
    // console.log(message);

    // $.ajax({
    //   url: "https://formspree.io/f/xknkorgp",
    //   method: "POST",
    //   dataType: "json",
    //   data: {
    //     お名前: name,
    //     メールアドレス: email,
    //     お問い合わせ種別: type,
    //     お問い合わせ内容: message,
    //   }
    // });
  });
});