$(document).ready(function () {
    var titles = $('.container_solid .title_wrapper h1');
    var backgrounds = $('.container_image');
    var imageNames = ['img6.jpg', 'img5.jpg', 'background.jpg'];
    $(titles).each(function (index, title) {
        // set background that matches the index to be the image
        $(backgrounds[index]).css('background-image', `url("./resource/photo/${imageNames[index]}")`);
        $(title).css('background-image', `url("./resource/photo/${imageNames[index]}")`);
    });
});