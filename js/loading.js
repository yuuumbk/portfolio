'use strict';

var $loading = $('.is-loading, .loading'),
  $content = $('.wrapper');

$loading.css({ display: 'block' });
$content.css({ display: 'none' });

$(function () {

  /**
   * ローディング画面
   * 要素が全てパース完了したら画面を切り替える
   */

  changeDisplay();

  /**
   * ローディング画面と通常画面を切り替える
   */
  function changeDisplay() {
    $(window).trigger('scroll');
    $content.css({ display: 'block' });
    $loading.delay(500).fadeOut();
  }
});