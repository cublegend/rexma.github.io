// glitch effect
$(document).ready(function () {
    setTimeout(() => {
        drawLines('body');
    }, 0);
    $(window).resize(function () {
        setTimeout(() => {
            drawLines('body');
        }, 0);
    });

    // parallax effect
    $('.scroll-container').scroll(function () {
        var scroll = $('.scroll-container').scrollTop();
        $('.parallax-container').each(function () {
            var speed = $(this).attr('data-speed');
            $(this).css({
                'transform': 'translateY(' + (-scroll * speed) + 'px)'
            });

        });
    });
});

$(document).ready(function () {
    $('.foreground-content img').each(function () {
        $(this).css('top', `${Math.random() * 30 + 25}%`);
        $(this).css('left', `${Math.random() * 50 + 10}%`);
        $(this).css('width', `${Math.random() * 10 + 10}%`);
    });
});


