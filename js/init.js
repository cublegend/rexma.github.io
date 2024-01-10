// parameters
const fontSizeVW = 1.3;
const fontRadiusRatio = 40;
const animationDuration = 800;
const initialRadius = 13;
const radiusIncrement = 9;
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

function createCurvedText(text, originalRadiusVW, id) {
    const $curvedTextContainer = $(`<div class="curved-text rotating" id=${id}></div>`);
    $(document.body).append($curvedTextContainer);

    function updateCurvedText() {
        const ratio = $(window).width() > $(window).height() ? $(window).height() : $(window).width();
        let pxRadius = originalRadiusVW * ratio / 100;
        // calculate font size
        let fontSize = pxRadius / fontRadiusRatio + fontSizeVW * ratio / 100;
        // calculate number of repetitions for each title based on font length and radius
        let repeatNTimes = Math.round(2 * pxRadius * Math.PI / (text.length * fontSize));

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

// calculate the mouse position as the radius to the center of the page
$(document).on("mousemove", function (e) {
    const x = e.pageX - $(window).width() / 2;
    const y = e.pageY - $(window).height() / 2;
    const radius = Math.sqrt(x * x + y * y);
    // convert radius into vw
    const ratio = $(window).width() > $(window).height() ? $(window).height() : $(window).width();
    const radiusVW = radius * 100 / ratio;
    // highlight the text that has the closest radius to the mouse
    let idx = Math.round((radiusVW - initialRadius) / radiusIncrement);
    if (idx < 0) idx = 0;
    if (idx > 9) idx = 9;
    // fade in the highlighted text
    $(".curved-text").removeClass("highlighted");
    $(`#${idx}`).addClass("highlighted");

});

