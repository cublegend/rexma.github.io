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

// position overlay menu items
$(document).ready(function () {
    $('.menu-item').hover(function () {
        // When mouse enters
        var hoverText = $(this).find('.menu-item-title').attr('data-hover-text');
        $(this).find('.menu-item-title').addClass('glitch').text(hoverText);
    }, function () {
        // When mouse leaves
        var originalText = $(this).find('.menu-item-title').attr('data-hover-text');
        $(this).find('.menu-item-title').removeClass('glitch').text(originalText);
    });
});

$(document).ready(function () {
    function positionOverlay(id, initWidth, initHeight, initLeft, initTop) {
        var containerWidth = $('#background').width();
        var containerHeight = $('#background').height();
        var img = new Image();
        id += ' .menu-item';
        img.src = $('#background-img').attr('src');

        img.onload = function () {
            var imgWidth = img.width;
            var imgHeight = img.height;
            var bgScale = Math.max(containerWidth / imgWidth, containerHeight / imgHeight);

            var scaledImgWidth = imgWidth * bgScale;
            var scaledImgHeight = imgHeight * bgScale;

            var dx = (scaledImgWidth - containerWidth) / 2;
            var dy = (scaledImgHeight - containerHeight);

            // Now, calculate the overlay position
            var overlayX = initLeft * bgScale;
            var overlayY = initTop * bgScale;

            $('#background-img').css({
                width: scaledImgWidth + 'px',
                height: scaledImgHeight + 'px',
                left: -dx + 'px',
                top: -dy + 'px',
                zIndex: '-1'
            });

            $(id).css({
                left: overlayX + 'px',
                top: overlayY + 'px',
                width: initWidth * bgScale + 'px',
                height: initHeight * bgScale + 'px'
            });
        };
    }

    positionOverlay('#1', 200, 158, 190, 455);
    positionOverlay('#2', 200, 158, 446, 500);
    positionOverlay('#3', 280, 218, 190, 735);
    positionOverlay('#4', 160, 106, 715, 540);
    setTimeout(() => {
        drawLines('.menu-item');
    }, 0);
    $(window).resize(function () {
        positionOverlay('#1', 200, 160, 190, 455);
        positionOverlay('#2', 200, 160, 446, 500);
        positionOverlay('#3', 280, 220, 190, 735);
        positionOverlay('#4', 160, 108, 715, 540);
        setTimeout(() => {
            drawLines('.menu-item');
        }, 0);
    });
});

