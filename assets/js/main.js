$('#fullpage').fullpage({
// 		//options here
// 		// autoScrolling:true,
	scrollHorizontally: true,
	navigation: true,
	navigationPosition: 'right',
	scrollOverflow: false,
    afterRender: function(){
        $('video').get(0).play();    
    }
});

// $('#fullpage').pagepiling({
// 	direction: 'horizontal',
// 	afterRender: function(){
// 		//playing the video
// 		$('video').get(0).play();
// 	}
// });

// $(document).on('scroll', function() {
//     if($(this).scrollTop()>=$('#contact').position().top){
//         $('.nav-color-control').css({
//         	color: 'black !important'
//         })
//     } else {
//     	$('.nav-color-control').css({
//         	color: 'white !important'
//         })
//     }
// })