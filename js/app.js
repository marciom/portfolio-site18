const $window = $(window);
const $menu = $('.main-menu-toggle li');
const $socialMedia = $('.socialMedia ul li');
const $home = $('#home');
const $mainNav = $('.main-nav');

// Horizontal smooth scroll
$('.pagination > a').on('click', function (event) {
  const $anchor = $(this);

  $('.cardWrapper').stop().animate({
    scrollLeft: $($anchor.attr('href')).offset().left
  }, 1000);
  event.preventDefault();

});

// Global smooth scroll
$('a[href*="#"]').on('click', function(event){
  // store current hash
  const target = this.hash;

  // prevent default behaviour
  event.preventDefault();

  // smooth scroll animation
  $('html, body').animate({
    scrollTop: $(target).offset().top
  }, 1000);

  // update location in the navbar with stored hash
  window.location.hash = target;
});

// Show/Hide main menu
$('.main-menu-toggle').on("click", toggleMenu);

function toggleMenu(event) {
  event.preventDefault();

  $('.main-nav').toggleClass('open');
}

// Changes color of hamburger menu so it can be seen on white background.
$window.scroll(function() {
  if ($window.scrollTop() > $home.height() - 50){
    $menu.addClass('bkg-drk-gray');
    $socialMedia.addClass('bkg-drk-gray');
  } else {
    $menu.removeClass('bkg-drk-gray');
    $socialMedia.removeClass('bkg-drk-gray');
  };
});