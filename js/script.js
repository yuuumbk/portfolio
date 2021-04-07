'use strict';

/**
 * ローディング画面
 */

$(function () {
  changeDisplay();
});

//ローディング画面と通常画面を切り替える
function changeDisplay() {
  $('.wrapper').css({ display: 'block' });
  $('.is-loading').delay(1400).fadeOut(800);
  $('.loading').delay(1000).fadeOut(300);
}



$(function () {
  /**
   * ヘッダー分コンテンツを下げる
   */

  var height = $('.nav').outerHeight();
  $('.main').css('margin-top', height);



  /**
   * コンテンツのスライドイン
   */

  slideIn();

  //画面回転された時に再度スライドインアニメーションを発火させる
  $(window).on('resize', $.throttle(50, function(obj) {
    //すぐに透明化することで処理の遅延による表示の乱れを防ぐ
    $('.nav .list, .top .content').css({ opacity: 0 });

    var slideDuration = 1500;

    if(obj.type === 'resize'){
      // 縦画面
      if (window.matchMedia && window.matchMedia('screen and (max-width: 600px)').matches) {
        console.log('縦画面');
        $('.nav .list')
          .css({
            opacity: 1,
            right: '0',
          });

        $('.top .content')
          .css({
            top: 0,
            left: '50%',
          })
          .animate({
            opacity: 1,
            top: '50%',
          }, slideDuration, 'easeInOutBack');
      }

      // 横画面
      else {
        console.log('横画面');
        $('.nav .list')
          .css({
            right: '-100%',
          })
          .animate({
            opacity: 1,
            right: 0,
          }, slideDuration, 'easeInOutBack');

        $('.top .content')
          .css({
            left: '-100%'
          })
          .animate({
            opacity: 1,
            left: '5%',
          }, slideDuration, 'easeInOutBack');
      }
    }
  }));


  function slideIn(delay = true){
    var slideDuration = 2500;

    // モバイル
    if (window.matchMedia && window.matchMedia('screen and (max-width: 600px)').matches) {
      console.log('モバイル');
      $('.top .content')
        .css({
          opacity: 0,
          top: 0,
        })
        .animate({
          opacity: 1,
          top: '50%',
        }, slideDuration, 'easeInOutBack');
    }

    // タブレット・PC
    else {
      console.log('タブレット・PC');
      $('.nav .list')
        .css({
          right: '-100%',
        })
        .animate({
          right: 0,
        }, slideDuration, 'easeInOutBack');

      $('.top .content')
        .css({
          left: '-100%',
        }).animate({
        left: '5%',
      }, slideDuration, 'easeInOutBack');
    }
  }



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
   * ロゴホバー切り替え
   */

  //twitter
  $('.logo-switching img[alt="twitter"]').on({
    'mouseenter': function () {
      $(this).attr('src', 'img/logo/Logo blue.svg');
    },

    'mouseleave': function () {
      $(this).attr('src', 'img/logo/Logo white.svg');
    },
  });

  //github
  $('.logo-switching img[alt="github"]').on({
    'mouseenter': function () {
      $(this).attr('src', 'img/logo/github-purple.png');
    },

    'mouseleave': function () {
      $(this).attr('src', 'img/logo/github-white.png');
    },
  });

  //qiita
  // $('.logo-switching img[alt="qiita"]').on({
  //   'mouseenter': function () {
  //     $(this).attr('src', '../img/logo/qiita.svg');
  //   },

  //   'mouseleave': function () {
  //     $(this).attr('src', '../img/logo/qiita-white.svg');
  //   },
  // });

  //email
  $('.logo-switching img[alt="email"]').on({
    'mouseenter': function () {
      $(this).attr('src', 'img/logo/mail-red.svg');
    },

    'mouseleave': function () {
      $(this).attr('src', 'img/logo/mail-white.svg');
    },
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

  function scroll(delay = false) {
    $('.scroll-fadein').each(function () {
      var $scrollFadeIn = $(this),
        scrollFadeInOffset = $scrollFadeIn.offset().top;

      fadeIn(delay);

      function fadeIn(delay) {
        var scrollAmount = $(window).scrollTop();

        if (scrollAmount > scrollFadeInOffset - windowHeight + 50) {
          if (delay) {
            setTimeout(function () {
              $scrollFadeIn.addClass('scrollin');
            }, 2500);
          } else {
            $scrollFadeIn.addClass('scrollin');
          }
        } else {
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
    perView: 1,
    peek: {
      before: 50,
      after: 50
    },
    perView: 4,
    breakpoints: {
      1500: {
        perView: 3
      },
      1024: {
        perView: 2
      },
      599: {
        perView: 1
      }
    },
    autoplay: 3000,
  });

  glide.mount();
});
