var isProjectHover = false;
var previousBackgroundText = '';
const PAGE_HEIGHT = $(document).height() - $(window).height()
// video players
var players = {}
var player_id = ''

function homePage() {
  if (players[player_id]) {
    players[player_id].dispose()
  }

  $(window).scroll(function(){
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

      // set background text based on the most visible div
      var mostVisible = {visibility: 0};
      results.forEach(function(item, index) {
        if (item.visibility > mostVisible.visibility) {
          mostVisible = item;
        }
      })

      setBackgroundText(mostVisible.backgroundText)
    }

  });

  // play videos on hover
  var figure = $(".singlevidjs").hover( hoverVideo, hideVideo );

  // don't load videos on mobile
  if (!jQuery.browser.mobile) {
    $('.no-load-mobile').each(function() {
      $('source', this).each(function() {
        $(this).attr('src', $(this).attr('data-src'))
      })
      $(this).load()
    })
  }

}

function hoverVideo(e) {  
  $('video', this).get(0).play();
  $('video', this).css("filter", "brightness(0.7)")
  isProjectHover = true;
  $('html, body').css("background-color", $(this).attr("data-primary-color"))
  setBackgroundText($(this).attr("data-background-text"), true)

  $('.marquee-inner').css('animation-duration', '7s')
}

function hideVideo(e) {
  $('video', this).get(0).pause(); 
  $('video', this).css("filter", "brightness(0.5)")
  isProjectHover = false;
  setBackgroundText(previousBackgroundText)

  // uncomment to change color back to default
  // $('html, body').css("background-color", defaultBackgroundColor)
  
  $('.marquee-inner').css('animation-duration', '40s')
}

function setBackgroundText(text, italic=false) {
  // check if the text isn't already that
  if ($('.background-text').first().text() !== text) {
    // set the previous text so we can revert
    previousBackgroundText = $('.background-text').first().text();
    // replace the text
    $('.background-text').text(text.replace(/\W/g, ''));

    if (italic) {
      // italicize background text
      $('.background-text').css("font-style", "italic")
    } else {
      $('.background-text').css("font-style", "normal")
    }
  }
}

// calculate what percent of a div is visible
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
        // subtract the part that's been scrolled past
        if (hiddenBefore > 0) {
            result -= (hiddenBefore * 100) / divHeight;
        }
        // subtract the part that hasn't been scrolled to yet
        if (hiddenAfter > 0) {
            result -= (hiddenAfter * 100) / divHeight;
        }

        return result;
    }
}

function projectPage() {
  var player_id = $('.project-page-video').attr('id')
  players[player_id] = videojs(player_id)
}

function pageHandler() {
  // unveil images
  $('.lazy').unveil({
      offset: 200,
      placeholder: '/assets/images/lazy.jpg',
      debug: true
  }).on('loaded.unveil', function () {
      this.style.opacity = 1;
  });
  
  if (window.location.pathname == '/') {
    homePage()
  } else {
    projectPage()
  }
}

// executes this stuff before load
$(function() {
    const swup = new Swup();
    swup.on('contentReplaced', function() {
      pageHandler()
    });
});

pageHandler()