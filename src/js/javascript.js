var gainesTimeline = {
	init: function(){
		gainesTimeline.scrollFunctions();
		gainesTimeline.mediaButtons();
		gainesTimeline.timeTicker();
		gainesTimeline.share();	
		gainesTimeline.onResize();	
	},
	onResize: function() {
		var rtime;
		var timeout = false;
		var delta = 200;
		$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
				timeout = true;
				setTimeout(resizeend, delta);
			}
		});

		function resizeend() {
			if (new Date() - rtime < delta) {
				setTimeout(resizeend, delta);
			} else {
				timeout = false;
				$('html, body').animate({
					scrollTop: $('.slide--0').offset().top},
				'fast');
			}
		}
	},
	share: function(){
		$(".icon-twitter").on("click", function(){
			var tweet = "Explore newly released evidence in the death of Korryn Gaines"; //Tweet text
			var url = "http://data.baltimoresun.com/news/korryn-gaines/images/facebook-thumb.png"; //Interactive URL
			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
		});
		$(".icon-facebook").on("click", function(){
			var picture = "http://data.baltimoresun.com/news/korryn-gaines/images/facebook-thumb.png"; //Picture URL
			var title = "The 6-hour Standoff of Korryn Gaines"; //Post title
			var description = "Explore newly released evidence in the death of Korryn Gaines"; //Post description
			var url = "http://data.baltimoresun.com/news/korryn-gaines/"; //Interactive URL
	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
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
	},
	scrollFunctions: function() {
		$('.button--dir').on('click', function() {
			var toSlide = $(this).data('toslide');
			$('.slide--'+toSlide).scrollTop(0);
			$('html, body').animate({
				scrollTop: $('.slide--'+toSlide).offset().top},
			'fast');
		});
	},
	mediaButtons: function() {
		$('.mediaButton--main').on('click', function() {
			var currSlide = $(this).data('slide');
			$('.mediaList--' + currSlide + ' .mediaButton.active').removeClass('active');
			$(this).addClass('active');
			var currMedia = $('.media__item--' + currSlide);
			var nextMedia = $('.media__item--' + currSlide + '--' + $(this).data('media'));
			stopVids();
			currMedia.removeClass('active');
			nextMedia.addClass('active');
		});
		$('.mediaButton--lightbox').on('click', function() {
			stopVids();
			var currSlide = $(this).data('slide');
			var docNum = $(this).data('docnum');
			$('.mediaOverlay--' + currSlide + '--' + docNum).fadeIn();
			switch(docNum) {
				case 0:
					DV.load("https://www.documentcloud.org/documents/3212766-Gaines-Previous-Arrest-Report.js", {
						sidebar: false,
						text: false,
						container: "#DV-viewer-3212766-Gaines-Previous-Arrest-Report",
						responsive: true
					});
					break;
				case 1:
					DV.load("https://www.documentcloud.org/documents/3212765-Warrant-Kareem-Courtney.js", {
						sidebar: false,
						text: false,
						container: "#DV-viewer-3212765-Warrant-Kareem-Courtney",
						responsive: true
					});
					break;
				case 2:
					DV.load("https://www.documentcloud.org/documents/3212763-Warrant-Gaines-Standoff.js", {
						sidebar: false,
						text: false,
						container: "#DV-viewer-3212763-Warrant-Gaines-Standoff",
						responsive: true
					});
					break;
				case 3:
					DV.load("https://www.documentcloud.org/documents/3212762-Ruby-Statement.js", {
						sidebar: false,
						text: false,
						container: "#DV-viewer-3212762-Ruby-Statement",
						responsive: true
					});
					break;
				case 4:
					DV.load("https://www.documentcloud.org/documents/3212761-Shellenberger-Letter.js", {
						sidebar: false,
						text: false,
						container: "#DV-viewer-3212761-Shellenberger-Letter",
						responsive: true
					});
					break;
				default:
					break;
			}
		});
		function stopVids() {
			var currSlide = $(this).data('slide');
			var currMedia = $('.media__item--' + currSlide);
			var nextMedia = $('.media__item--' + currSlide + '--' + $(this).data('media'));
			var player;
			var iframes = $('.media__item.active iframe');
			for(var i = 0;i < iframes.length;i++) {
				player = $f(iframes[i]);
				player.api('pause');
			};
		}
		$('.button--exit').on('click', function(){
			$('.mediaOverlay').fadeOut();
		});
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				$('.mediaOverlay').fadeOut();
			}
		});
		// $('.mediaOverlay').on('click', function(){
		// 	$('.mediaOverlay').fadeOut();
		// });
	}
};
$(document).ready(function(){
	gainesTimeline.init();
	console.log("connected");
});
