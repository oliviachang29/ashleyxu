function calculateVisibilityForDiv(div$) {
    var windowHeight = $(window).height(),
        docScroll = $(document).scrollTop(),
        divPosition = div$.offset().top,
        divHeight = div$.height(),
        hiddenBefore = docScroll - divPosition,
        hiddenAfter = (divPosition + divHeight) - (docScroll + windowHeight);

    if ((docScroll > divPosition + divHeight) || (divPosition > docScroll + windowHeight)) {
        return 0;
    } else {
        var result = 100;

        if (hiddenBefore > 0) {
            result -= (hiddenBefore * 100) / divHeight;
        }

        if (hiddenAfter > 0) {
            result -= (hiddenAfter * 100) / divHeight;
        }

        return result;
    }
}

function initJS() {
  const PAGE_HEIGHT = $(document).height() - $(window).height()
  $(window).scroll(function(){
    // line becomes shorter as user scrolls
    // var strikethrough = $("#strikethrough");
    // var width = ((1 - ($(window).scrollTop() / PAGE_HEIGHT)) * 100).toString() + "%";
    // strikethrough.css("width", width);

    var results = []

    $('section').each(function () {
        var div$ = $(this);
        results.push({
          id: div$.attr('id'),
          backgroundText: div$.attr('data-background-text'),
          visibility: Math.round(calculateVisibilityForDiv(div$))
        })
    });

    var mostVisible = {visibility: 0};
    results.forEach(function(item, index) {
      if (item.visibility > mostVisible.visibility) {
        mostVisible = item;
      }
    })

    if ($('.background-text').first().text() !== mostVisible.backgroundText) {
      $('.background-text').text(mostVisible.backgroundText);
    }

  });

  // unveil images
  $('.lazy').unveil({
        offset: 200,
        placeholder: '/assets/images/lazy.jpg',
        debug: true
    }).on('loaded.unveil', function () {
        this.style.opacity = 1;
    });

  // play videos on hover
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

  // var video = videojs("project-page-video");
  // video.load()

}
// executes this stuff before load
// $(function() {
//     const swup = new Swup();
//     swup.on('contentReplaced', function() {
//         initJS()
//     });
// });

initJS()