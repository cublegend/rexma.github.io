$(document).ready(function () {
    var sectionHeight = $('.scroll-content').height(); // assume all same height
    $('.scroll-content').each(function () {
        var $this = $(this);
        var sectionStart = $this.offset().top;
        var sectionEnd = sectionStart + sectionHeight;
        $('.scroll-container').on('scroll', function () {
            var scrollPosition = $('.scroll-container').scrollTop() + $('.scroll-container').offset().top;
            if (scrollPosition >= sectionStart - sectionHeight &&
                scrollPosition <= sectionStart) {
                var scrollAmount = scrollPosition - sectionStart;
                $this.css('opacity', 1 + scrollAmount / (sectionHeight / 2));
            } else if (scrollPosition > sectionStart &&
                scrollPosition <= sectionEnd) {
                var scrollAmount = scrollPosition - sectionStart;
                $this.css('opacity', 1 - scrollAmount / (sectionHeight / 2));
            }
        });
    });
});
