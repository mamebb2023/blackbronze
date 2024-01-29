// JS
$(document).ready(function () {
  // Slider
  $('.slider-img').on('click', function () {
    $('.slider-img').removeClass('active');
    setTimeout(() => {
      $(this).toggleClass('active');
    }, 200);
  });

  // window Scroll animations
  $(window).scroll(function () {
    var velocity = 0.5;
    var pos = $(window).scrollTop();

    // header background
    $('header').each(function () {
      var height =  Math.round(pos * velocity);
      $(this).css('backgroundPosition', 'center -' + height + 'px');
    });

    // .head sticky effect
    if (pos >= 500) $('.head').addClass('fixed');
    else $('.head').removeClass('fixed');
  });
});