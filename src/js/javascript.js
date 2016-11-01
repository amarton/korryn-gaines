var gainesTimeline = {
	init: function(){
		gainesTimeline.scrollFunctions();
		gainesTimeline.timeTicker();
		//gainesTimeline.share();
	},
	share: function(){
		$(".icon-twitter").on("click", function(){
			var tweet = ""; //Tweet text
			var url = ""; //Interactive URL
			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
		});
		$(".icon-facebook").on("click", function(){
			var picture = ""; //Picture URL
			var title = ""; //Post title
			var description = ""; //Post description
			var url = ""; //Interactive URL
	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
		});
	},
	scrollFunctions: function() {
		$('.button').on('click', function() {
			var toSlide = $(this).data('toslide');
			$('.slide--'+toSlide).scrollTop(0);
			$('html,body').animate({
				scrollTop: $('.slide--'+toSlide).offset().top},
			'fast');
		});
	},
	timeTicker: function() {
		var recCircle = $('.svgPhone__recCircle');
		var sec = $('.svgPhone__text--sec');
		var min = $('.svgPhone__text--min');
		var hr = $('.svgPhone__text--hr');
		var newSec, newMin, newHr;
		setInterval(function(){
			recCircle.toggleClass('blink');
		}, 500);
		setInterval(function(){			
			newSec = Number(sec.text()) + 1;
			if (newSec < 10) {
				sec.text('0' + newSec);
			} else if (newSec === 60) {
				sec.text('00');
				newMin = Number(min.text()) + 1;
				if (newMin < 10) {
					min.text('0' + newMin);
				} else if (newMin === 60) {
					min.text('00');
					newHr = Number(hr.text()) + 1;
					if (newHr < 10) {
						hr.text('0' + newHr);
					} else {
						hr.text(newHr);
					}
				} else {
					min.text(newMin);
				}
			} else {
				sec.text(newSec);
			}
		}, 1000);
	},
	setTime: function(slide) {
		if (slide === 0) {
			// $('.svgPhone__text tspan', svg.root()).text('00:00:00');
		}
	}
};
$(document).ready(function(){
	gainesTimeline.init();
	console.log("connected");
});
