$(document).ready(function () {
    var isInEditMode = false;

    // Initialize draggable and resizable (disabled initially)
    $('.grid-item').draggable({ disabled: true });
    $('.grid-item').resizable({ disabled: true });

    // Toggle edit/view mode
    function toggleEditMode() {
        isInEditMode = !isInEditMode;

        // Enable/disable draggable and resizable
        $('.grid-item').draggable('option', 'disabled', !isInEditMode);
        $('.grid-item').resizable('option', 'disabled', !isInEditMode);

        // Toggle overlay to enable/disable interaction with iframes
        if (isInEditMode) {
            $('.iframe-overlay').css('pointer-events', 'all');
            $('#toggleEditMode').text('Switch to View Mode');
        } else {
            $('.iframe-overlay').css('pointer-events', 'none');
            $('#toggleEditMode').text('Switch to Edit Mode');
        }
    }

    $('#toggleEditMode').on('click', toggleEditMode);
});
