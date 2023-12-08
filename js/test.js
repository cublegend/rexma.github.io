$(document).ready(function () {
    var selectBox = $('<div class="select-box"></div>'),
        selectProhibited = false,
        isSelecting = false,
        startx, starty;

    // Create grid cells
    for (let i = 0; i < 100; i++) {
        $('#grid').append('<div class="cell"></div>');
    }

    $('.grid-item').mousedown(function () {
        selectProhibited = true;
    });
    $('.grid-item').mouseup(function () {
        selectProhibited = false;
    });

    // Initialize grid items with absolute positions
    $('.grid-item').each(function (index) {
        $(this).draggable({
            grid: [5, 5],
            snap: '.cell',
            snapMode: 'inner',
            containment: '#grid-container',
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
                'se': '.resize-handle' // Specify the custom handle class
            }
        }).data({
            'originalTop': $(this).offset().top,
            'originalLeft': $(this).offset().left
        });
    });
    $('.profile-pic-container').resizable({
        aspectRatio: 1
    });

    //////////////////// selection box logic

    // Append the select box element to the container
    $('#grid-container').append(selectBox);
    // Mouse down event to start the selection
    $(document).mousedown(function (e) {
        if (selectProhibited) return; // Skip if dragging or resizing
        isSelecting = true;
        $('.grid-item').removeClass('selected');
        startx = e.pageX;
        starty = e.pageY;
        selectBox.css({
            'left': startx,
            'top': starty,
            'width': 0,
            'height': 0
        }).show();
    });

    // Mouse move event to adjust the size of the selection box
    $(document).mousemove(function (e) {
        if (!isSelecting) return;

        var movex = e.pageX,
            movey = e.pageY,
            width = Math.abs(movex - startx),
            height = Math.abs(movey - starty),
            newx = (movex < startx) ? (startx - width) : startx,
            newy = (movey < starty) ? (starty - height) : starty;

        selectBox.css({
            'width': width,
            'height': height,
            'left': newx,
            'top': newy
        });

        // Select items that intersect with the select box
        $('.grid-item').each(function () {
            if (isIntersecting(selectBox[0], this)) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    });

    // Mouse up event to finalize the selection
    $(document).mouseup(function () {
        if (isSelecting) {
            selectBox.hide();
            isSelecting = false;
        }
    });

    // Function to check if two elements are intersecting
    function isIntersecting(box, item) {
        var boxRect = box.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();

        return !(itemRect.left > boxRect.right ||
            itemRect.right < boxRect.left ||
            itemRect.top > boxRect.bottom ||
            itemRect.bottom < boxRect.top);
    }
});
