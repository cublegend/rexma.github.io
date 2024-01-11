// parameters
const fontSizeVW = 0.9;
const fontRadiusRatio = 60;
const animationDuration = 800;
const initialRadius = 5;
const radiusIncrement = 6.5;
const backgroundSpeed = 0.5;
const foregroundSpeed = 1;
const titles = ["TREAT TEAM • ", "THE TREEE FACTORY • ",
    "SAME THING • ",
    "THESEUS ORBITAL STATION • ", "MUSIC • "];

function initCurvedText($curvedText, radius) {
    $curvedText.css("min-width", "initial");
    $curvedText.css("min-height", "initial");
    var text = $curvedText.text();
    var html = "";
    Array.from(text).forEach(function (letter) {
        html += `<span>${letter}</span>`;
    });
    $curvedText.html(html);
    var $letters = $curvedText.find("span");

    $letters.css({
        position: "absolute",
        height: `${radius}px`,
        bottom: "50%",
        left: "50%",
        transformOrigin: "bottom center"
    });

    var angleOffset = 360 / $letters.length;
    $letters.each(function (idx, el) {
        $(el).css({
            transform: `translate(-50%) rotate(${idx * angleOffset}deg)`
        })
    });
}

function calculateRatio() {
    const ratio = $(window).width() > $(window).height() ? $(window).width() : $(window).height();
    return ratio;
}

function createCurvedText(text, originalRadiusVW, id) {
    const $curvedTextContainer = $(`<div class="curved-text rotating" id=${id}></div>`);
    $('.background').append($curvedTextContainer);

    function updateCurvedText() {
        const ratio = calculateRatio();
        let pxRadius = originalRadiusVW * ratio / 100;
        // calculate font size
        let fontSize = pxRadius / fontRadiusRatio + fontSizeVW * ratio / 100;
        // calculate number of repetitions for each title based on font length and radius
        let repeatNTimes = Math.ceil(2 * pxRadius * Math.PI / (text.length * fontSize));

        $curvedTextContainer.text(text.repeat(repeatNTimes));
        $curvedTextContainer.css({
            animationDuration: `${animationDuration}s`,
            animationDirection: id % 2 ? "normal" : "reverse",
            fontSize: `${fontSize}px`
        });

        initCurvedText($curvedTextContainer, pxRadius);
    }

    updateCurvedText(); // Initial setup

    $(window).resize(updateCurvedText); // Update on window resize
}

$(document).ready(function () {
    for (let i = 0; i < 10; i++) {
        let titleIdx = i % titles.length;
        createCurvedText(titles[titleIdx], initialRadius + i * radiusIncrement, i);
    }
});

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

// Scroll Animation
$(window).on('scroll', function () {
    var viewportHeight = $(window).height();
    var shrinkFactor = 0.15;
    var viewportTop = viewportHeight * shrinkFactor;
    var viewportBottom = viewportHeight - viewportTop;

    $('.animated-section').each(function () {
        var elementHeight = $(this).outerHeight();
        var elementTop = $(this).offset().top - $(window).scrollTop();
        var elementBottom = elementTop + elementHeight;
        var opacity = 1;

        // Element is above the effective viewport
        if (elementTop < viewportTop) {
            opacity = Math.max(0, (elementBottom - viewportTop) / elementHeight);
        }

        // Element is below the effective viewport
        else if (elementBottom > viewportBottom) {
            opacity = Math.max(0, (viewportBottom - elementTop) / elementHeight);
        }

        $(this).css('opacity', opacity);
    });
});


$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};