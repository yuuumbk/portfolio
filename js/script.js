'use strict';

$(function () {

  /**
   * ヘッダー分コンテンツを下げる
   */

  var headerHeight = $('#header').outerHeight();
  $('#top').css({
    marginTop: headerHeight,
  });



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
      // $moreBtn.filter('.pc').show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }
      // $moreBtn.filter('.mb').hide();

      clickBtn('pc');
      closeBtn('pc');
    } else { // モバイル
      $moreBtn.show();
      // $moreBtn.filter('.mb').show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }
      // $moreBtn.filter('.pc').hide();

      clickBtn('mb');
      closeBtn('mb');
    }
  }

  /**
   * スキルボタン・クリックボタン・詳細ボタンが押された時の処理
   * @param {*} device pc|mb
   */

  function clickBtn() {
    $skillBtn.add($clickBtn).add($moreBtn).on('click', function () {
      $mb.css({ marginBottom: 0 });
      $list.removeClass('has-skill-btn');
      $list.find('li').fadeIn();
      // ボタンの表示設定
      // $moreBtn.filter('.' + device).hide();
      $moreBtn.hide();
      $closeBtn.fadeIn();
    });
  }

  /**
   * 閉じるボタンが押された時の処理
   * @param {*} device　pc|mb
   */
  function closeBtn(device = 'pc') {
    $closeBtn.on('click', function () {
      $mb.css({ marginBottom: 160 });
      $list.addClass('has-skill-btn');
      $list.find('li:not(:lt(' + defaultNum + '))').fadeOut();
      //ボタンの表示設定
      $closeBtn.hide();
      // $moreBtn.hide();
      $moreBtn.show();
      // $moreBtn.filter('.' + device).fadeIn();
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

      $('html, body').animate({
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

    workPopUp();

  // ウィンドウ幅が変更されたら再度実行
  $(window).resize(function () {
      workPopUp();
  });

  function workPopUp(){
    var work = '.works-library .work',
      $work = $(work),
      $dilCloseBtn = $('.dil-close'),
      $overlay = $('.overlay'),
      $hidden = $('.hidden'),
      detailView = 'detail-view';

    if (window.matchMedia('(min-width: 600px)').matches) { // PC・タブレット

      $work.on('click', function () {
        // ポップアップを表示
        var clone = $(this).clone();
        $overlay.find('.hidden').append(clone);

        // オーバーレイを表示し、後ろを暗くする
        $overlay.addClass(detailView).css({
          top: $(window).scrollTop() - 80,
        });

        // スクロールを禁止させる
        $('html').css({ overflow: 'hidden' });
      });

      $overlay.on('click', function () {
        // オーバーレイを非表示にする
        $overlay.removeClass(detailView).find('.hidden').empty();

        // スクロール禁止を解除
        $('html').css({ overflow: 'auto' });
      });

      // 親要素（overlay）のclick継承されて、期待通りの動作をしないため、
      // stopPropagation()で親要素のイベントの発火を抑える
      $hidden.on('click', function(e){
        e.stopPropagation();
      });

    // // ポップアップされた要素外をクリックしした場合、ポップアップを閉じる
    // $(document).on('click', function (e) {
    //   var $target = $(e.target);

    //   if (hasDetailViewClass()) {
    //     if (!$target.closest($overlay).find('work').length) {
    //       console.log('ok');
    //       $overlay.filter('.detail-view').remove();
    //     }
    //   }else{
    //     console.log('false');
    //   }
    // });

    // /**
    //    * ポップアップが表示されているか
    //    * @returns bool
    //    */

    // function hasDetailViewClass() {
    //   if ($('.detail-view').length) {
    //     return true;
    //   }
    //   return false;
    // }
    }else { // mb
      $work.off();
      $overlay.off();
      // スクロール禁止を解除
      $('html').css({ overflow: 'auto' });
    }
  }
});
