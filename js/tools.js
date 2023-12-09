$(document).ready(function() {
    $('.z-up').click(function() {
        var container = $(this).closest('.grid-item');
        var currentZIndex = parseInt(container.css('z-index'));
        if (currentZIndex > 9) return;
        container.css('z-index', currentZIndex + 1);
    });

    $('.z-down').click(function() {
        var container = $(this).closest('.grid-item');
        var currentZIndex = parseInt(container.css('z-index'));
        if (currentZIndex < 3) return;
        container.css('z-index', currentZIndex - 1);
    });
});
