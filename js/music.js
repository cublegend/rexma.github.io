$(document).ready(function () {
    var sectionHeight = $('.scroll-content').height(); // assume all same height
    $('.scroll-content').each(function () {
        var $this = $(this);
        var sectionStart = $this.offset().top;
        var sectionEnd = sectionStart + sectionHeight;
        $('.scroll-container').on('scroll', function () {
            var scrollPosition = $('.scroll-container').scrollTop() + $('.scroll-container').offset().top;
            if (scrollPosition >= sectionStart - sectionHeight &&
                scrollPosition <= sectionStart) {
                var scrollAmount = scrollPosition - sectionStart;
                $this.find('h1').css('opacity', 1 + scrollAmount / sectionHeight);
            } else if (scrollPosition > sectionStart &&
                scrollPosition <= sectionEnd) {
                var scrollAmount = scrollPosition - sectionStart;
                $this.find('h1').css('opacity', 1 - scrollAmount / sectionHeight);
            }

            // video transitions
            var video = $this.find('.background-video');
            if (scrollPosition >= sectionStart - sectionHeight
                && scrollPosition <= sectionStart) {
                video.css('opacity', 1 + scrollAmount / sectionHeight * 2);

            } else if (scrollPosition > sectionStart &&
                scrollPosition <= sectionEnd) {
                var scrollAmount = scrollPosition - sectionStart;
                video.css('opacity', 1 - scrollAmount / sectionHeight * 2);
            }

            // video pointer-events control
            // play video when in view
            if (scrollPosition >= sectionStart - 50
                && scrollPosition <= sectionEnd) {
                video.css('pointer-events', 'auto');
                video[0].play();
            } else {
                video.css('pointer-events', 'none');
                video[0].pause();
            }
        });
    });

    $('.scroll-content').first().find('.background-video').css({
        'opacity': 1,
        'pointer-events': 'auto'
    });

    // when fullscreen video events are detected, set opacity to 1
    $('.background-video').each(function () {
        var $this = $(this);
        $this.on('fullscreenchange', function () {
            $this.css('opacity', 1);
        });
    });

});
