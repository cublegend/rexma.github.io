// parameters
const fontSizeVW = 1.5;
const fontRadiusRatio = 15;
const animationDuration = 800;
const titles = ["TREAT TEAM • TREAT TEAM • TREAT TEAM • ", "THE TREEE FACTORY • THE TREEE FACTORY • ",
    "SAME THING • SAME THING • SAME THING • SAME THING • ",
    "THESEUS ORBITAL STATION • THESEUS ORBITAL STATION • ", "MUSIC • MUSIC • MUSIC • MUSIC • MUSIC • "];

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

function createCurvedText(text, originalRadiusVW, id) {
    const $curvedTextContainer = $('<div class="curved-text rotating"></div>').text(text);
    $(document.body).append($curvedTextContainer);

    function updateCurvedText() {
        const ratio = $(window).width() > $(window).height() ? $(window).height() : $(window).width();
        let radius = originalRadiusVW * ratio / 100;

        $curvedTextContainer.css({
            animationDuration: `${animationDuration}s`,
            animationDirection: id % 2 ? "normal" : "reverse",
            fontSize: `${radius / fontRadiusRatio + fontSizeVW * ratio / 100}px`
        });

        initCurvedText($curvedTextContainer, radius);
    }

    updateCurvedText(); // Initial setup

    $(window).resize(updateCurvedText); // Update on window resize
}

$(document).ready(function () {
    for (let i = 0; i < 6; i++) {
        let titleIdx = i % titles.length;
        createCurvedText(titles[titleIdx], 13 + i * 9, i);
    }
});

