$(window).on('load', function () {
    $('#transition-screen').delay(200).fadeOut(10);
});

$(document).ready(function () {
    // copy the banner 3 times to create the infinite effect
    var banner = $('#banner img');
    var bannerWidth = banner.width();
    var bannerCopy = banner.clone();
    var bannerCopy2 = banner.clone();
    var bannerCopy3 = banner.clone();
    banner.parent().append(bannerCopy);
    banner.parent().append(bannerCopy2);
    banner.parent().append(bannerCopy3);
    bannerCopy.css({
        'left': bannerWidth - 1 // -1 to prevent small gaps
    });
    bannerCopy2.css({
        'left': -bannerWidth + 1
    });
    bannerCopy3.css({
        'left': bannerWidth * 2 - 2
    });
});

$(document).ready(function () {
    // Animate the banner
    var animateBanner = function (banner) {
        var bannerWidth = banner.width();
        var initialLeft = parseInt(banner.css('left'), 10);
        banner.animate({
            left: '-=' + bannerWidth / 10 // actually completing the animation in 10*1000 = 10s
        }, 1000, 'linear', function () {
            if (!banner.isInViewport()) {
                banner.css('left', initialLeft + bannerWidth * 3);
            }
            animateBanner(banner);
        });
    };

    // Apply the animation to each banner
    $('#banner img').each(function () {
        animateBanner($(this));
    });
});

// Check if an element is in the viewport
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

