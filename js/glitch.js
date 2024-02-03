function drawLines() {
    $('.line').remove(); // Removes all elements with class 'line'
    $('.menu-item').each(function () {
        const linesCount = $(this).height() / 10;
        for (let i = 0; i < linesCount; i++) {
            const time = Math.random() * 5;
            $('<div>', {
                class: `line line-${i}`,
                css: {
                    top: `${i * 10}px`,
                    animation: `lines ${time}s infinite`
                }
            }).appendTo($(this));
        }
    });

}

$(document).ready(function () {
    $('.text').each(function () {
        var randomDuration = Math.random() * 2 + 1;
        $(this).css('animation', `skew ${randomDuration}s infinite`);
    });
    $('.text').each(function () {
        randomFlash($(this));
    });
});

function randomFlash(thisElement) {
    var randomInterval = Math.random() * 5000 + 1000; // Random interval between 1 and 6 seconds
    var display = thisElement.css('display');
    thisElement.css('display', 'none');
    setTimeout(() => {
        thisElement.css('display', display);
    }, 0.05);
    setTimeout(() => {
        randomFlash(thisElement);
    }, randomInterval);
}

