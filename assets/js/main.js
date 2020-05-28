var isProjectHover = false;
var previousBackgroundText = '';

function setBackgroundText(text, italic=false) {
  // check if the text isn't already that
  if ($('.background-text').first().text() !== text) {
    // set the previous text so we can revert
    previousBackgroundText = $('.background-text').first().text();
    // replace the text
    $('.background-text').text(text.replace(/\s/g, ''));

    if (italic) {
      // italicize background text
      $('.background-text').css("font-style", "italic")
    } else {
      $('.background-text').css("font-style", "normal")
    }
  }
}

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
    console.log('isProjectHover:' + isProjectHover)
    if (!isProjectHover) {
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

      setBackgroundText(mostVisible.backgroundText)
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
      isProjectHover = true;
      setBackgroundText($(this).attr("data-background-text"), true)
      // uncomment to use marquee while hover and otherwise pause it
      // $('.marquee-inner').css('animation-play-state', 'running')
  }
  function hideVideo(e) {
      $('video', this).get(0).pause(); 
      $('video', this).css("filter", "brightness(0.5)")
      isProjectHover = false;
      setBackgroundText(previousBackgroundText)
      // uncomment to use marquee while hover and otherwise pause it
      // $('.marquee-inner').css('animation-play-state', 'paused')
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