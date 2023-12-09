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

        $(this).append(['<div class="z-up updown">^</div> <div class="z-down updown">v</div>']);

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
                    removeAllSelection();
                    addToSelection(this);
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
            },
            start: function (event, ui) {
                var $this = $(this);

                // Check if the resized item is in the selection
                if (!$this.hasClass('selected')) {
                    // If not, deselect all items and select only this one
                    $('.grid-item').removeClass('selected');
                    $('.resize-handle').removeClass('resize-handle-selected');
                    $this.addClass('selected');
                    $(this).find('.resize-handle').addClass('resize-handle-selected');
                }

                // Store the selected items in the resized item's data
                ui.helper.data('selectedItems', $('.selected'));
            },
        }).data({
            'originalTop': $(this).offset().top,
            'originalLeft': $(this).offset().left
        });
    });

    $('.profile-pic-container').resizable({
        aspectRatio: 1
    });
});
