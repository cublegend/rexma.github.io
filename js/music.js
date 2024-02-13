$(document).ready(function () {
    $('.menu').scroll(function () {
        $('.title').each(function (idx, title) {
            var titleMid = $(this).offset().top + $(this).height() / 2;
            var backgroundVideo = $('.background-video').eq(idx);
            var top = $('.menu').offset().top;
            var center = $('.menu').height() / 2 + top;
            if (titleMid <= center && titleMid >= top) {
                var opacity = 1 - (center - titleMid) / (center - top);
                backgroundVideo.css('opacity', opacity);
            } else if (titleMid > center && titleMid <= top + $('.menu').height()) {
                var opacity = 1 - (titleMid - center) / (top + $('.menu').height() - center);
                backgroundVideo.css('opacity', opacity);
            }
            if (backgroundVideo.css('opacity') < 0.3) {
                backgroundVideo.get(0).pause();
                backgroundVideo.css({
                    'opacity': 0,
                    'pointer-events': 'none'
                });
            } else if (backgroundVideo.css('opacity') > 0.8) {
                backgroundVideo.get(0).play();
                backgroundVideo.css({
                    'opacity': 1,
                    'pointer-events': 'auto'
                });
            }

        });
    });

    $('.background-video').first().css('opacity', 1);
    $('.background-video').first().get(0).play();

});

// glitch effect
// $(document).ready(function () {
//     setTimeout(() => {
//         drawLines('body');
//     }, 0);
//     $(window).resize(function () {
//         setTimeout(() => {
//             drawLines('body');
//         }, 0);
//     });
// });