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
    // フッターの高さ
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
    'main',
    'top',
    'service',
    'about',
    'skills',
    'works',
    'contact',
  ];

  // to-skill-
  // 変更が生じた場合は、
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

    //バリデーション成功、以下送信処理と完了表示

    // 送信内容
    var name = $contactFormName.val(),
      email = $contactFormEmail.val(),
      type = $('#contact-form-type:checked').val(),
      message = $contactFormContent.val();

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