'use strict';


$(function () {
  //ヘッダーの高さ分、全体を下げる
  var height = $('#header').outerHeight();
  console.log(height);
  $("body").css('margin-top', height);


  //コンテンツをスライドインさせる
  $(".nav-list").animate({
    right: 0,
  }, 1500, 'easeInOutBack');

  $(".top .content").animate({
    left: "5%",
  }, 1500, 'easeInOutBack');

  //raindrops
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

  //ロゴのアニメーション
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
});
