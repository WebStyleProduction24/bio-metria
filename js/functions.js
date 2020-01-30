function placeholder(e){e.length&&e.placeholder()}function checkForSliders(){$(".preview ul").length&&(previewSlider=new Array,$(".preview ul").each(function(e,n){previewSlider[e]=$(n).bxSlider(featuresToysSlideConfig)}))}function popup(e,n){if(e.length)return r_popup=e.fancybox(n),r_popup}function mobileNav(){$(".nav-main").length&&$(window).width()<=1023&&($("body").on("swipeleft swiperight",function(){$(".menu-icon").trigger("click")}),$("body").on("click touchend",function(e){0===$(e.target).closest(".navigation").length&&$(".navigation.active").length&&$(".menu-icon").trigger("click")}))}function yandexMap(){$("#map").length&&$.getScript("http://api-maps.yandex.ru/2.0/?load=package.full&amp;lang=ru-RU",function(){function e(){n=new ymaps.Map("map",{center:[55.75396,37.620393],zoom:10}),o=new ymaps.Placemark([37.620393,37.620393],{hintContent:"Москва!",balloonContent:"Москва"}),n.geoObjects.add(o)}var n,o;ymaps.ready(e)})}function mobileZoom(){$(window).width()<=1240&&$('meta[name="viewport"]').attr("content","width=device-width, initial-scale=1, user-scalable=no")}function googleMap(){function e(){var e={center:new google.maps.LatLng(50.4501,30.523400000000038),disableDefaultUI:!0,zoom:11,navigationControl:!1,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,panControl:!0,zoomControl:!0};n=new google.maps.Map(document.getElementById("map"),e);var i=0,l=new Array;for(i;i<a;i++)l[i]=new google.maps.Marker({position:new google.maps.LatLng(t[i].lat,t[i].lng),map:n,icon:o})}if($("#map").length){var n,o="img/map-pimp.png",t=[{icon:o,lat:50.4501,lng:30.523400000000038}],a=$(t).length;google.maps.event.addDomListener(window,"load",e)}}function mainSliderInit(){$(".slider__list").length&&$(".slider__list").slick({prevArrow:'<a class="slick-arrow-prev" />',nextArrow:'<a class="slick-arrow-next" />',dots:!0})}popupCfg={wrapCSS:"popup",padding:["0","0","0","0"],scrolling:"visible"},$(document).on("ready",function(){placeholder($("input[placeholder], textarea[placeholder]"))});
$(document).ready(function(){


	$('.slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  });


	$(".equipment-slider").slick({
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300, 
    slidesToShow: 4,
    slidesToScroll: 4
  });

  var $status = $('.product-images__info');
  var $slickElement = $('.product-images'); 

  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      var count = (slick.slideCount < 10) ? "0" + slick.slideCount : slick.slideCount;
      $status.text(i + ' / ' + count); 
    });

  $slickElement.slick({
    autoplay: true,
    dots: false, 
    arrows: true
  });

  $('.product-tab__item').on('click', function(){
   $('.product-tab__item').removeClass('product-tab__item-active');
   $(this).addClass('product-tab__item-active');
   $('.product-tab__content').hide();
   var id = $(this).data('id'); 
   $('.product-tab__content[data-id='+id+']').show();
 });


  if($(window).width() < 992) {
    $('.header-menu').addClass('drawer-nav');
    setTimeout(function(){
      $('.drawer').drawer();
    }, 100)
  } else {
    $('.header-menu').removeClass('drawer-nav');
  }
});


$( window ).resize(function() {

  if($(window).width() < 992) {
    $('.drawer').drawer(); 
  } else {
    $('.header-menu').removeClass('drawer-nav');
  }

});


window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if($('.social_blue').size() > 0) {
   if($('.social_blue').offset().top > ($('.header').height() - 250)) {
    $('.social_blue').removeClass('social_blue');
  } else {
    $('.social_blue').addClass('social_blue');  
  }
}
}