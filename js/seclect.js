$(function(){
	// 类目显示
	function show(item){
			item.mousemove(function() {
				$(this).css("background","#9d9d9d");
				$(this).children(".details").show();
			});
	}
	function hidden(item){
		item.mouseout(function() {
				$(this).css("background","#6d6b6c");
				$(this).children(".details").hide();
			});
	}
	show($(".navigation"));
	hidden($(".navigation"));
	$(".details").mousemove(function(){
		$(this).show();
	})
})
	

 $(function ($, window, document, undefined) {
    
    Slider = function (container, options) {

        if (!container) return;

        var options = options || {},
            currentIndex = 0,
            cls = options.activeControllerCls,
            delay = options.delay,
            isAuto = options.auto,
            controller = options.controller,
            event = options.event,
            interval,
            slidesWrapper = container.children().first(),
            slides = slidesWrapper.children(),
            length = slides.length,
            childWidth = container.width(),
            totalWidth = childWidth * slides.length;

        function mode() {
            var wrapper = container.children().first();

            options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css({
                'position': 'absolute',
                'left': 0,
                'top': 0
            })
                .first().siblings().hide();
        }

        function autoPlay() {
            interval = setInterval(function () {
                triggerPlay(currentIndex);
            }, options.time);
        }

        function triggerPlay(cIndex) {
            var index;

            (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
            play(index, options.mode);
        }
        function play(index, mode) {
            slidesWrapper.stop(true, true);
            slides.stop(true, true);

            mode == 'slide' ? (function () {
                if (index > currentIndex) {
                    slidesWrapper.animate({
                        left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                    }, delay);
                } else if (index < currentIndex) {
                    slidesWrapper.animate({
                        left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                    }, delay);
                } else {
                    return;
                }
            })() : (function () {
                if (slidesWrapper.children(':visible').index() == index) return;
                slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
            })();

            try {
                controller.children('.' + cls).removeClass(cls);
                controller.children().eq(index).addClass(cls);
            } catch (e) { }

            currentIndex = index;

            options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
        }
        function stop() {
            clearInterval(interval);
        }

        //prev frame
        function prev() {
            stop();

            currentIndex == 0 ? triggerPlay(length - 2) : triggerPlay(currentIndex - 2);

            isAuto && autoPlay();
        }
        function next() {
            stop();

            currentIndex == length - 1 ? triggerPlay(-1) : triggerPlay(currentIndex);

            isAuto && autoPlay();
        }
        return {
            prev: function () {
                prev();
            },
            next: function () {
                next();
            }
        }
    };

}(jQuery, window, document));
