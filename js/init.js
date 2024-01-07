$(document).ready(function() {
    // Create a ring for each word
    createRingFromWord('tst', 10);
    createRingFromWord('hah', 15);
    createRingFromWord('eme', 20);
    createRingFromWord('se ', 25);
    createRingFromWord('e t', 30);
    createRingFromWord('utr', 35);
    createRingFromWord('she', 40);
    createRingFromWord(' ie', 45);
});

function createRingFromWord(word, radiusRaw) {
    // The radius is a percentage of the screen width or height, whichever is smaller
    const ratio = $(window).width() > $(window).height() ? $(window).height() : $(window).width();
    
    const updateRingDivs = () => {
        const angleStep = 360 / divs.length;

        divs.each(function(index) {
            const angle = index * angleStep;
            const x = radiusRaw * Math.cos(angle * Math.PI / 180) * ratio / 100;
            const y = radiusRaw * Math.sin(angle * Math.PI / 180) * ratio / 100;
            $(this).css({
                'left': '50%', 
                'top': '50%',
                'margin-left': (x - $(this).width() / 2) + 'px',
                'margin-top': (y - $(this).height() / 2) + 'px'
            });
        });
    };

    const container = $('<div class="rotating ring-container"></div>');

    // Set the animation duration and direction
    const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
    const rotationDuration = 1000 / radiusRaw;
    container.css({
        'animation-duration': rotationDuration + 's',
        'animation-direction': direction
    });

    $(document.body).append(container);

    // Create a div for each letter
    for (let i = 0; i < word.length; i++) {
        const div = $('<div class="ring-div rotating"></div>').text(word[i]);
        const dir = (direction === 'normal') ? 'reverse' : 'normal';
        div.css({
            'animation-duration': rotationDuration + 's',
            'animation-direction': dir
        });
        container.append(div);
    }

    const divs = container.children();
    updateRingDivs(); // Initial positioning

    // Adjust on window resize
    $(window).resize(updateRingDivs);
}
