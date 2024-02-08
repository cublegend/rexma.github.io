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
    function positionTextElementRandomly(element) {
        const randomY = Math.random() * 100;
        const randomX = Math.random() * 100;
        element.css('top', `${randomY}%`);
        element.css('left', `${randomX}%`);
    }
    $('.text-container').each(function () {
        const textToSpread = $(this).attr('data-text');
        const numberOfElements = 25;
        let fontSize = $(this).attr('data-font-size') || 20;
        let blur = $(this).attr('data-blur') || 0;
        $(this).css('font-size', `${fontSize}em`);
        $(this).css('filter', `blur(${blur}px)`);
        for (let i = 0; i < numberOfElements; i++) {
            const textElement = $('<span class="text-element"></span>');
            textElement.text(textToSpread);
            $(this).append(textElement);
            positionTextElementRandomly(textElement);
        }
    });
    $('.foreground-content img').each(function () {
        $(this).css('top', `${Math.random() * 30 + 25}%`);
        $(this).css('left', `${Math.random() * 50 + 10}%`);
        $(this).css('width', `${Math.random() * 10 + 10}%`);
    });
});


