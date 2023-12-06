$(document).ready(function () {
    // Get the container's dimensions
    var containerWidth = $('#grid-container').width();
    var containerHeight = $('#grid-container').height();

    // Calculate the drag increments as 5% of the container's dimensions
    var incrementWidth = containerWidth * 0.1;
    var incrementHeight = containerHeight * 0.1;
    // Create grid cells
    for (let i = 0; i < 100; i++) {
        $('#grid').append('<div class="cell"></div>');
    }

    // Initialize grid items with absolute positions
    $('.grid-item').each(function (index) {
        $(this).css({
            top: (index * 10) + '%', // Adjust as necessary
            left: '0%', // Adjust as necessary
            position: 'absolute',
            width: '10%',
            height: '10%'
        }).draggable({
            grid: [5, 5],
            snap: '.cell',
            snapMode: 'inner',
            containment: '#grid-container'
        }).resizable({
            grid: [incrementWidth / 2, incrementHeight / 2],
        });
    });
});
