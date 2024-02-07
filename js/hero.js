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

    function positionImage() {
        var containerWidth = $('#background').width();
        var containerHeight = $('#background').height();
        // make a copy of the original image to get the real dimensions
        var img = new Image();
        img.src = $('#background-img').attr('src');

        img.onload = function () { // wait for the image to load
            var imgWidth = img.width;
            var imgHeight = img.height;
            var bgScale = Math.max(containerWidth / imgWidth, containerHeight / imgHeight);

            $('#background-img').css({
                width: imgWidth * bgScale + 'px',
                height: imgHeight * bgScale + 'px'
            });
        };
    }


    function positionOverlay(id, initWidth, initHeight, initLeft, initBottom) {
        var containerWidth = $('#background').width();
        var containerHeight = $('#background').height();
        id += ' .menu-item';
        // make a copy of the original image to get the real dimensions
        var img = new Image();
        img.src = $('#background-img').attr('src');

        img.onload = function () { // wait for the image to load
            var imgWidth = img.width;
            var imgHeight = img.height;
            var bgScale = Math.max(containerWidth / imgWidth, containerHeight / imgHeight);
            // Now, calculate the overlay position
            var overlayX = initLeft * bgScale;
            var overlayY = initBottom * bgScale;
            console.log(overlayX, overlayY);
            $(id).css({
                left: overlayX + 'px',
                bottom: overlayY + 'px',
                width: initWidth * bgScale + 'px',
                height: initHeight * bgScale + 'px'
            });
        };
    }
    positionImage();
    positionOverlay('#1', 200, 158, 190, 420);
    positionOverlay('#2', 200, 158, 446, 377);
    positionOverlay('#3', 280, 218, 190, 87);
    positionOverlay('#4', 160, 106, 715, 390);
    setTimeout(() => {
        drawLines('.menu-item');
    }, 0);
    $(window).resize(function () {
        positionImage();
        positionOverlay('#1', 200, 158, 190, 420);
        positionOverlay('#2', 200, 158, 446, 377);
        positionOverlay('#3', 280, 218, 190, 87);
        positionOverlay('#4', 160, 106, 715, 390);
        setTimeout(() => {
            drawLines('.menu-item');
        }, 0);
    });
});

$(document).ready(function () {
    $('.menu-item').on('click', function () {
        var id = $(this).parent().attr('id');
        // switch to page
        switch (id) {
            case '1':
                window.location.href = 'game.html';
                break;
            case '2':
                window.location.href = 'music.html';
                break;
            case '3':
                window.location.href = 'photo.html';
                break;
            case '4':
                window.location.href = 'contact.html';
                break;
        }
    });
});

