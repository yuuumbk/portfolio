'use strict';

// $(function () {
//   //ヘッダーの高さ分、全体を下げる
//   var height = $('#header').outerHeight();
//   console.log(height);
//   $("body").css('margin-top', height);
// });

$(function(){
  //ナビゲーションをスライドインさせる
  $(".nav-list").animate({
    right: 0,
  }, 1500, 'easeInOutBack');

  $(".top .content").animate({
    left: "5%",
  }, 1500, 'easeInOutBack');
});