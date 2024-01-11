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
    // Assuming different color palettes are determined by section ID or another attribute
    var sectionId = $section.attr('id');

    switch (sectionId) {
        case 'section1':
            changeColorPalette('#FFFFFF', '#000000'); // Example: white background, black text
            break;
        case 'section2':
            changeColorPalette('#000000', '#FFFFFF'); // Example: black background, white text
            break;
        // Add more cases as needed
    }
}

function changeColorPalette(backgroundColor, textColor) {
    $('body').css('background-color', backgroundColor);
    $('.curved-text').find('span').css('color', textColor);
    $('.title-section').css('color', textColor);
}
