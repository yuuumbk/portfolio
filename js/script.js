'use strict';

$(function () {

  /**
   * ローディング画面
   */
  changeDisplay();

  /**
   * ローディング画面と通常画面を切り替える
   */
  function changeDisplay() {
    $('.wrapper').css({ display: 'block' });
    $('.is-loading').delay(1400).fadeOut(800);
    $('.loading').delay(1000).fadeOut(300);
  }



  /**
   * ハンバーガー
   */

  $('.mb .ham-btn, .mb .menu .list .list-item a').on('click', function () {
    $('.menu, .ham-btn-line').toggleClass('open');
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

  //最初のビューでのフェードインさせるものがあれば
  $(document).ready(function () {
    scroll(true);
  });

  //1秒間に5回までイベントを発生
  $(window).on('scroll', $.throttle(200, function () {
    /**
     *  ある程度スクロールされた後、リロードされると
     *  上のscrollだけでなく、こちらのscrollも動いてしまう
     */
    scroll();
  }));

  /**
   * スクロール処理
   * @param {*} delay
   */

  function scroll(delay = false) {
    $('.scroll-fadein').each(function () {
      var $scrollFadeIn = $(this),
        scrollFadeInOffset = $scrollFadeIn.offset().top;

      fadeIn(delay);

      /**
       * スクロール時のフェードイン処理
       * @param {*} delay
       */
      function fadeIn(delay) {
        var scrollAmount = $(window).scrollTop();

        if (scrollAmount > scrollFadeInOffset - windowHeight + 30) {
          if (delay) {
            setTimeout(function () {
              $scrollFadeIn.addClass('scrollin');
            }, 2500);
          } else {
            $scrollFadeIn.addClass('scrollin');
          }
        } else if(scrollAmount <= scrollFadeInOffset - windowHeight) {
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
    autoplay: false,
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
   * スキル一覧の表示
   * PCの時のみ
   */

  if (window.matchMedia('(min-width: 1025px)').matches) {

    var $list = $('.mb .skill-lists'),
      $moreBtn = $('.skill-more-btn'),
      $skillBtn = $('a[href^="#skill"]'),
      $clickBtn = $('.skill-click'),
      $closeBtn = $('.skill-close-btn'),
      defaultNum = 2,// 初期表示数
      hiddenList = 'li:not(:lt(' + defaultNum + '))';

    $('.skill-more-btn').show();

    // defaultNum分以外は非表示
    $list.find(hiddenList).hide();
    $list.addClass('has-skill-btn');

    // スキルボタン・クリックボタン・詳細ボタンが押された時の挙動
    $skillBtn.add($clickBtn).add($moreBtn).on('click', function () {
      $list.removeClass('has-skill-btn');
      $list.find('li').fadeIn();
      $moreBtn.hide();
      $closeBtn.fadeIn();
    });

    // 閉じるボタンが押された時の挙動
    $closeBtn.on('click', function () {
      $list.addClass('has-skill-btn');
      $list.find('li:not(:lt(' + defaultNum + '))').fadeOut();
      $closeBtn.hide();
      $moreBtn.fadeIn();
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

  $.each(smooth, function(i, val){
    smoothScroll('.' + val);
  });

  $.each(smoothTo, function(i, val) {
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
    $(target).find('a').on('click', function(e){
      e.preventDefault();

      var target = this.hash,
        $target = $(target);

      $('html, body').animate({
        'scrollTop' : $target.offset().top - offset,
      }, duration, easing);
    });
  }



  /**
   * スキルのスライド
   * clickを促すボタンのアニメーション、スクロール処理
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
  $('.skill-list').each(function () {
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
    var maxHeight;

    $list.find(hiddenList).show();

    $('.skill-list').each(function () {
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
});
