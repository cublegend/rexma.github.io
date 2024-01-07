$(document).ready(function() {
    // Create a ring for each word
    createRingFromWord('Hello', 100, 1);
    createRingFromWord('World', 150, 2);
    createRingFromWord('This', 200, 3);
});

function createRingFromWord(word, radius, id) {
    const container = $('<div class="rotating"></div>');
    container.attr('id', '#ring-'+ id);
    // Set the animation duration and direction
    const direction = id % 2 ? 'normal' : 'reverse';
    const rotationDuration = 10000/radius;
    container.css('animation-duration', rotationDuration + 's');
    container.css('animation-direction', direction);
    
    $(document.body).append(container);

    // Create a div for each letter
    for (let i = 0; i < word.length; i++) {
        const div = $('<div class="ring-div rotating"></div>').text(word[i]);
        div.css('animation-duration', rotationDuration + 's');
        const dir = (direction === 'normal') ? 'reverse' : 'normal';
        div.css('animation-direction', dir);
        container.append(div);
    }

    // Position each div in a ring
    const divs = container.children();
    const angleStep = 360 / divs.length;

    divs.each(function(index) {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle * Math.PI / 180);
        const y = radius * Math.sin(angle * Math.PI / 180);

        $(this).css({
            'left': '50%',
            'top': '50%',
            'margin-left': (x - $(this).width() / 2) + 'px', // Adjust for div size
            'margin-top': (y - $(this).height() / 2) + 'px' // Adjust for div size
        });
    });
}
