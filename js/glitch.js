function drawLines() {
    $('.line').remove(); // Removes all elements with class 'line'
    $('.menu-item').each(function () {
        const linesCount = $(this).height() / 10;
        console.log($(this));
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
    })

}
