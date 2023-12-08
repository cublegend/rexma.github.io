$(document).ready(function () {
    var savedLayout = localStorage.getItem('savedLayout');

    if (savedLayout) {
        savedLayout = JSON.parse(savedLayout);

        for (var itemId in savedLayout) {
            if (savedLayout.hasOwnProperty(itemId)) {
                var itemData = savedLayout[itemId];
                $('#' + itemId).css({
                    top: itemData.top,
                    left: itemData.left,
                    width: itemData.width,
                    height: itemData.height
                });
            }
        }
    }
});

document.getElementById('saveLayoutButton').addEventListener('click', function () {
    var layoutData = {};

    $('.grid-item').each(function () {
        var $item = $(this);
        var itemId = $item.attr('id'); // Assuming each item has a unique ID

        layoutData[itemId] = {
            top: $item.css('top'),
            left: $item.css('left'),
            width: $item.css('width'),
            height: $item.css('height')
        };
    });

    // Save the layout data in localStorage
    localStorage.setItem('savedLayout', JSON.stringify(layoutData));
    alert('Layout saved!');
});
