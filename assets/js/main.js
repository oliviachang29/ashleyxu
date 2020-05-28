const PAGE_HEIGHT = $(document).height() - $(window).height()
$(window).scroll(function(){
	var strikethrough = $("#strikethrough");
	var width = ((1 - ($(window).scrollTop() / PAGE_HEIGHT)) * 100).toString() + "%";
	strikethrough.css("width", width);
});

$('.lazy').unveil({
      offset: 200,
      placeholder: '/assets/images/lazy.jpg',
      debug: true
  }).on('loaded.unveil', function () {
      this.style.opacity = 1;
  });

var figure = $(".singlevidjs").hover( hoverVideo, hideVideo );
function hoverVideo(e) {  
    $('video', this).get(0).play();
    $('video', this).css("filter", "brightness(0.7)")
}
function hideVideo(e) {
    $('video', this).get(0).pause(); 
    $('video', this).css("filter", "brightness(0.5)")
}

// don't load videos on mobile
// if (jQuery.browser.mobile) {
//   $('.no-load-mobile').each(function() {
//     $(this).find('')
//   })
// }