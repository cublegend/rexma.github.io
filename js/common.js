function removeAllSelection() {
    $('.grid-item').removeClass('selected');
    $('.resize-handle').removeClass('handle-selected');
    $('.updown').removeClass('handle-selected');
}

function addToSelection(element) {
    $(element).addClass('selected');
    $(element).find('.resize-handle').addClass('handle-selected');
    $(element).find('.updown').addClass('handle-selected');
}