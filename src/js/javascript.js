var dataproject = {
	init: function(){
		//dataproject.share();
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
	// This function requires jQuery. It takes two classes as arguments, input as strings with the period in front.
	// This function takes one vertically scrollable div that includes multiple child divs and "snaps" the scroll
	// behavior to the nearest child div.
	// Right now, it is very limited to child divs of this specific style:
	// width: $widthPct; height: 0; padding-bottom: $widthPct;
	// Developing this further to have different child divs should not be a trememndous amount of work.
	// I may get around to that in the near future.
	scrollSnap: function(scrollDivClass, childDivClass) {
		var scrollDiv = $(scrollDivClass);
		var childDivs = $(childDivClass);
		var childDivWidth = $(childDivs[0]).width();
		var animating = false;
		var currDiv, newDiv, currDivPos, newDivPos, divNum;
		// On window resize, the childDivWidth is recalculated. This is a potentially wasteful and unnecessary function
		// that I may phase out in the future. It is a soft patch for user resizing behavior.
		var resizeId;
		$(window).resize(function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(doneResizing, 500);
		});
		function doneResizing() {
			childDivWidth = $(childDivs[0]).width();
		};
		// The on scroll function is set on a timeout to help reduce site load.
		scrollDiv.on('scroll', function() {
			clearTimeout($.data(this, 'scrollTimer'));
			if (!animating) {
				$.data(this, 'scrollTimer', setTimeout(function() {
					animating = true;
					divNum = Math.round(scrollDiv.scrollTop() / childDivWidth);
					scrollDiv.animate({
						scrollTop: divNum * childDivWidth + 'px'
					}, 250);
					setTimeout(function() { animating = false; }, 300);
					// Insert call to function to run on scroll end here.
					return false;
				}, 200));
			}
		});
	}
}
$(document).ready(function(){
	dataproject.init();
	console.log("connected");
});
