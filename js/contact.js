$(document).ready(function () {
    $('.airplane').each(function () {
        // play hover animation with random interval
        var $airplane = $(this);
        var interval = Math.random() * 2 + 3;
        console.log('interval: ' + interval);
        $airplane.css('animation', `hover linear ${interval}s infinite`);
    });
    setTimeout(() => {
        drawLines('body');
    }, 0);
    $(window).resize(function () {
        setTimeout(() => {
            drawLines('body');
        }, 0);
    });
});
