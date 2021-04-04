'use strict';


$(function () {
  //ヘッダーの高さ分、全体を下げる
  // var height = $('#header').outerHeight();
  // console.log(height);
  // $("body").css('margin-top', height);
});
$(function () {


  /**
   * ローディング画面
   */
  //HTML側で実装
  // var $window = $(window);
  // $(".is-loading, .loading").css({ display: 'block' });
  // $(".wrapper").css({ display: 'none' });
});

$(document).ready(function () {
  changeDisplay();
});

//10秒経ってもロードが完了しなければ表示する
$(function () {
  setTimeout(changeDisplay, 10000);
});

//ローディング画面と通常画面を切り替える
function changeDisplay() {
  $(".wrapper").css({ display: 'block' });
  $(".is-loading").delay(900).fadeOut(800);
  $(".loading").delay(600).fadeOut(300);
}



$(function () {
  /**
   * コンテンツのスライドイン
   */
  var slideDuration = 2000;
  $(".nav-list").animate({
    right: 0,
  }, slideDuration, 'easeInOutBack');

  $(".top .content").animate({
    left: "5%",
  }, slideDuration, 'easeInOutBack');



  /**
   * raindrops
   */
  $('.rain').raindrops({
    color: '#444',
    waveLength: 200,
    frequency: 3,
    waveHeight: 50,
    density: 0,
    rippleSpeed: 0.002,
    canvasWidth: 1200,
    canvasHeight: 100,
    positionBottom: 0,
    positionLeft: 0
  });



  /**
   * ロゴホバー切り替え
   */

  //twitter
  $('.logo img[alt="twitter"]').on({
    'mouseenter': function () {
      $(this).attr('src', '../img/logo/Logo blue.svg');
    },

    'mouseleave': function () {
      $(this).attr('src', '../img/logo/Logo white.svg');
    }
  });

  //github
  $('.logo img[alt="github"]').on({
    'mouseenter': function () {
      $(this).attr('src', '../img/logo/github-purple.png');
    },

    'mouseleave': function () {
      $(this).attr('src', '../img/logo/github-white.png');
    }
  });

  //qiita
  $('.logo img[alt="qiita"]').on({
    'mouseenter': function () {
      $(this).attr('src', '../img/logo/qiita.svg');
    },

    'mouseleave': function () {
      $(this).attr('src', '../img/logo/qiita-white.svg');
    }
  });

  //email
  $('.logo img[alt="email"]').on({
    'mouseenter': function () {
      $(this).attr('src', '../img/logo/mail-red.svg');
    },

    'mouseleave': function () {
      $(this).attr('src', '../img/logo/mail-white.svg');
    }
  });



  /**
   * 画面に入ったらフェードインする
   */


});
