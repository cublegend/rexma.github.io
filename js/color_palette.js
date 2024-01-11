$(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();

    $('.content-section').each(function () {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();

        // Check if the current scroll position is within the section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Change the color palette based on this section
            changeColorPaletteForSection($(this));
        }
    });
});

function changeColorPaletteForSection($section) {
    var palette = $section.data('palette');
    document.documentElement.className = palette;
}
