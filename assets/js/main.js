
$(function() {

    var $window = $(window),
        $slide = $('.homeSlide'),
        $body = $('body'),
        win_height_padded = $window.height() * 1.1,
        isTouch = Modernizr.touch;

    if (isTouch) {
        $('.revealOnScroll').addClass('animated');
    }

    $window.on('scroll', revealOnScroll);



    //FadeIn all sections   
    $body.imagesLoaded(function() {

        adjustWindow();
//         destroyPreloader();
    });

    function adjustWindow() {

        // Init Skrollr
        var s = skrollr.init();

        // Get window size
        winH = $window.height();

        // Keep minimum height 550
        if (winH <= 550) {
            winH = 550;
        }

        // Resize our slides
        $slide.height(winH+50);

        // Refresh Skrollr after resizing our sections
        s.refresh($('.homeSlide'));

    }




    function revealOnScroll() {
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 1.1;

        // Showed...
        $(".revealOnScroll:not(.animated)").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
        // Hidden...
        $(".revealOnScroll.animated").each(function(index) {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (scrolled + win_height_padded < offsetTop) {
                $(this).removeClass('fadeInDown animated bounce')
            }
        });
    }

    revealOnScroll();

});