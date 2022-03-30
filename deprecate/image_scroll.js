
function start_scrolling () {
    var images1 = $(".home-image#first");
    var images2 = $(".home-image#second");
    
    setInterval(() => {
        scroll_line(images1, 0.2);
        scroll_line(images2, 0.1);
    }, 1);
}

function scroll_line(images, speed) {
    var limit = $("#sidebar").width();

    images.each((index)=> {
        images.eq(index).offset({top: images.eq(index).offset().top, left: images.eq(index).offset().left - speed});
        if (images[index].getBoundingClientRect().right < limit) {
            let i_end = (index + images.length - 1) % images.length;
            images.eq(index).offset({top: images.eq(index).offset().top, left: images[i_end].getBoundingClientRect().right});
        }
    });
}
