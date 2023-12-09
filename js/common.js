function removeAllSelection() {
    if (!$('.grid-item').hasClass('selected')) return;
    $('.grid-item').removeClass('selected');
    $('.resize-handle').removeClass('handle-selected');
    $('.updown').removeClass('handle-selected');
}

function addToSelection(element) {
    if ($(element).hasClass('selected')) return;
    console.log('addToSelection');
    $(element).addClass('selected');
    $(element).find('.resize-handle').addClass('handle-selected');
    $(element).find('.updown').addClass('handle-selected');
}