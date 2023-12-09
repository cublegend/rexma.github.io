$(document).ready(function () {
    var isInEditMode = true;

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
            $('.resize-handle').addClass('visible').removeClass('hidden');
            $('.updown').addClass('visible').removeClass('hidden');
            $('#item14').addClass('visible').removeClass('hidden');
            $('#item15').addClass('visible').removeClass('hidden');
            $('.grid-item').each(function () {
                var $this = $(this);
                $this.data('originalTop', $this.offset().top);
                $this.data('originalLeft', $this.offset().left);
                $this.css('border-width', '5px');
            });
        } else {
            $('#item14').addClass('hidden').removeClass('visible');
            $('#item15').addClass('hidden').removeClass('visible');
            $('.resize-handle').addClass('hidden').removeClass('visible');
            $('.updown').addClass('hidden').removeClass('visible');
            $('.iframe-overlay').css('pointer-events', 'none');
            $('#toggleEditMode').text('Switch to Edit Mode');
            $('.grid-item').each(function () {
                $(this).css('border-width', '0px');
            });
        }
    }

    // Initial toggle to set to view mode
    toggleEditMode();

    $('#toggleEditMode').on('click', toggleEditMode);
});
