$(document).ready(function () {
    //////////////////// selection box logic
    var selectBox = $('<div class="select-box"></div>'),
    selectProhibited = false,
    isSelecting = false,
    startx, starty;

    $('.grid-item').mousedown(function () {
        selectProhibited = true;
    });
    $('.grid-item').mouseup(function () {
        selectProhibited = false;
    });

    // Append the select box element to the container
    $('#grid-container').append(selectBox);
    // Mouse down event to start the selection
    $(document).mousedown(function (e) {
        if (selectProhibited) return; // Skip if dragging or resizing
        isSelecting = true;
        removeAllSelection();
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
                addToSelection(this);
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