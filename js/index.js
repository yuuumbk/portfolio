'use strict';

$(function () {

  /**
 * スライドショー
 */

  var glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    hoverpause: true,
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
    skillAnchor = 'a[href^="#skill"]',
    $skillBtn = $(skillAnchor),
    $clickBtn = $('.skill-click'),
    $closeBtn = $('.skill-close-btn'),
    defaultNum = 4,// 初期表示数
    hiddenList = 'li:not(:lt(' + defaultNum + '))';

  // defaultNum分以外は非表示
  // $list.find(hiddenList).hide();
  $list.addClass('has-skill-btn');

  // ウィンドウ幅に応じて表示するボタンを変える
  // ウィンドウ幅が変更されたら実行
  var skillBtnTimer = 0;

  $(window).resize(function () {
    if (skillBtnTimer > 0){
      clearTimeout(skillBtnTimer);
    }

    skillBtnTimer = setTimeout(function(){
      skillBtn();
    },1000);
  }).trigger('resize');

  /**
   * ウィンドウ幅に応じて表示するボタンを変える
   */

  function skillBtn() {
    if (window.matchMedia('(min-width: 1025px)').matches) { // PC
      $moreBtn.show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }
    } else { // モバイル
      $moreBtn.show();
      if (!$list.filter('.has-skill-btn').length) {
        $moreBtn.hide();
      }
    }

    clickBtn();
    closeBtn();
  }

  /**
   * スキルボタン・クリックボタン・詳細ボタンが押された時の処理
   */

  // スクロール先
  var workListOffset = $list.offset().top,
    defaultNumWorkOffset = $item.eq(defaultNum - 1).offset().top;

  function clickBtn() {
    $skillBtn.add($clickBtn).add($moreBtn).each(function(){
    // $clickBtnは$skillBtnに含まれるため削除↑
    // なお、削除されない場合、重複してイベントが発生する
    // $skillBtn.add($moreBtn).each(function () {
      $(this).on('click', function (e) {
        // #で移動されるのを防ぐ
        e.preventDefault();

        // 全ての要素を表示
        $list.find('li:gt(' + (defaultNum - 1) + ')')
          .removeClass('invisible')
          .addClass('visible').show();
        // 余白を調整
        $mb.css({ marginBottom: 0 });
        // 下部のグラデーションを消し要素を完全に表示
        $list.removeClass('has-skill-btn');
        // 上部のcloseボタンの位置の調節
        $('.skill-close-btn-height').css({ height: 0 });

        // ボタンの表示設定
        $moreBtn.hide();
        $closeBtn.fadeIn();

        // $skillBtnの時のみスムーズスクロールする
        if (!$(this).filter('.skill-more-btn').length) {
          if(!$(this).filter('.skill-click').length) {
            var clickTarget = this.hash;
          } else {
            var clickTarget = $(this).parent().find(skillAnchor).attr('href');
          }
          smoothScrollSkill(clickTarget);
        }
      });
    });
  }

  /**
   * スムーズスクロール（スキル用）
   * @param {*} target 対象要素を指定
   * @param {*} offset スクロール時に上に指定分余白を開ける（ナビゲーションと重ならないようにするため）
   * @param {*} duration アニメーション時間
   * @param {*} easing アニメーション緩急
   */

  function smoothScrollSkill(target, offset = 150, duration = 800, easing = 'easeInOutCirc') {

    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - offset,
    }, duration, easing);
  }



  /**
   * 閉じるボタンが押された時の処理
   */

  function closeBtn() {
    $closeBtn.on('click', function (e) {
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

      var scrollAmount = $(window).scrollTop();

      // Safariで下部のcloseボタンを押すと、スクロール量が保持されないバグ対策
      // まず、defaultNumの一番下の要素の位置に移動する
      // 上のcloseボタンが押された時は何もしない
      if (scrollAmount >= workListOffset) {
        $('html, body').scrollTop(defaultNumWorkOffset);
      }



      // 以下の処理は画面酔いを引き起こす恐れがあるため行わない

      // 次に、一番上の要素までduration秒でスクロールする
      // var duration = 300,
      //   easing = 'swing';

      // モバイル端末にて、スクロール後スクロールが効かなくなることへの対処
      // stop()で対応
      // $('html, body').stop().animate({
      //   scrollTop: WorkListOffset - 65,
      // }, duration, easing);
    });
  }



  /**
   * スキルリストの高さを最も高いものに合わせる
   * flex boxとpositionの影響により、自動的に高さが合わないためjsで指定する
   */

  //最も高いスキルリストの高さ
  var skillItemMaxHeight = getSkillItemMaxHeight();

  $('.skill-item').each(function () {
    $(this).css({
      height: skillItemMaxHeight,
    });
  });

  /**
   * 最も高いスキルリストの高さを返す
   */
  function getSkillItemMaxHeight() {
    var maxHeight,
      $list = $('.mb .skill-list');//エラーが出る場合があるため、こちらでも指定

    // pcの場合、スキルリストはdisplay: noneとなっており、
    // 高さを取得できないため、この処理の間のみ、リストを表示する
    $list.find(hiddenList).show();

    $('.skill-item').each(function () {
      maxHeight = $(this).outerHeight();
    });

    // 処理が終わり次第、再度非表示にする
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
  var workPopUpTimer = 0;

  $(window).resize(function () {
    if (workPopUpTimer > 0) {
      clearTimeout(workPopUpTimer);
    }

    workPopUpTimer = setTimeout(function () {
      workPopUp();
    }, 1000);
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
        $overlay.css({
          display: 'block',
        })
        .addClass(detailView);

        // スクロールを禁止させる
        $('html').css({ overflow: 'hidden' });

        $overlay.css({
          top: $(window).scrollTop() - 48,
          height: ' calc(100vh + 48px)',
        });
      });


      $overlay.on('click', function () {
        // オーバーレイを非表示にする
        $overlay.css({
          display: 'none',
        })
        .removeClass(detailView).find('.hidden').empty();

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

    // pc->mbにウィンドウ幅をリサイズした際に、スクロール位置がおかしくなる不具合を確認。対処法として、パフォーマンスはやや落ちるが、クリックされるごとに要素のスクロール料を取得するように改善
    // $workMoreBtn.each(function () {
    //   var index = $(this).parent().index(),// 何番目のworkか取得
    //     workOffset = $(this).offset().top;// 要素のスクロール量を取得
    //   // スクロール量を対応する場所に格納
    //   // ※ -470は調整のため
    //   workOffsets[index] = workOffset - 470;
    //   console.log(workOffset);
    // });

    $workMoreBtn.on('click', function () {
      var index = $(this).parent().index();// 何番目のworkか取得

      if ($(this).find('.down-allow-more-btn').length) {// moreボタンが押された時
        $(this).find('.btn').removeClass('down-allow-more-btn').addClass('upp-allow-close-btn');
        $(this).parent().addClass(detailView);

        $workMoreBtn.each(function () {
          var index = $(this).parent().index(),// 何番目のworkか取得
            workOffset = $(this).parent().offset().top;// 要素のスクロール量を取得
          // スクロール量を対応する場所に格納
          // ※ -470は調整のため
          workOffsets[index] = workOffset - 100;
        });
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
});