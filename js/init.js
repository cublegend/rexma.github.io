$(document).ready(function () {

    // Create grid cells
    for (let i = 0; i < 100; i++) {
        $('#grid').append('<div class="cell"></div>');
    }

    // Initialize grid items with absolute positions
    $('.grid-item').each(function (index) {
        // Append four resize handles to each grid item
        $(this).append('<div class="resize-handle ui-resizable-nw"></div>');
        $(this).append('<div class="resize-handle ui-resizable-ne"></div>');
        $(this).append('<div class="resize-handle ui-resizable-sw"></div>');
        $(this).append('<div class="resize-handle ui-resizable-se"></div>');

        $(this).append(['<button class="z-up updown">^</button> <button class="z-down updown">v</button>']);

        $(this).draggable({
            grid: [5, 5],
            snap: '.cell',
            snapMode: 'inner',
            containment: '#grid-container',
            cancel: '.resize-handle, .updown',
            start: function (event, ui) {
                var $this = $(this);

                // Check if the dragged item is in the selection
                if (!$this.hasClass('selected')) {
                    // If not, deselect all items and select only this one
                    $('.grid-item').removeClass('selected');
                    $this.addClass('selected');
                }

                // Store the selected items in the dragged item's data
                ui.helper.data('selectedItems', $('.selected'));
            },
            drag: function (event, ui) {
                var selectedItems = ui.helper.data('selectedItems');
                selectedItems.each(function () {
                    var $this = $(this);
                    if ($this[0] !== ui.helper[0]) {
                        var newTop = ui.position.top + ($this.data('originalTop') - ui.helper.data('originalTop'));
                        var newLeft = ui.position.left + ($this.data('originalLeft') - ui.helper.data('originalLeft'));
                        $this.css({ top: newTop, left: newLeft });
                    }
                });
            },
            stop: function (event, ui) {
                var selectedItems = ui.helper.data('selectedItems');
                selectedItems.each(function () {
                    var $this = $(this);
                    $this.data('originalTop', $this.offset().top);
                    $this.data('originalLeft', $this.offset().left);
                });
            }
        }).not('.profile-pic-container').resizable({
            grid: [5, 5],
            handles: {
                'nw': '.ui-resizable-nw',
                'ne': '.ui-resizable-ne',
                'sw': '.ui-resizable-sw',
                'se': '.ui-resizable-se'
            }
        }).data({
            'originalTop': $(this).offset().top,
            'originalLeft': $(this).offset().left
        });
    });

    $('.profile-pic-container').resizable({
        aspectRatio: 1
    });
});
