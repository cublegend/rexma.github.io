$(document).ready(function() {
    $("#num1").on('click', () => {
        $('.AR').css("display", "block");
        $("#num2").animate({
            left: "+=100%",
            opacity: 0
        }, "slow");
        $("#num3").animate({
            left: "-=50%",
            top: "+=100%",
            opacity: 0
        }, "slow");
        setTimeout(() => {
            $("#num1").animate({
                left: "+=5%",
                top: "+=10%"
            }, "slow", () => {
                $("#num1").animate({
                    left: "-=50%",
                    top: "-=100%"
                }, 800);
                $(".circle").animate({
                    width: "+=500vh",
                    height: "+=500vh",
                    top: "-=250vh",
                    left: "-=250vh"
                }, 800, () => {
                    $('.circle').css("z-index", "-10"); // set the z index so that i can click on other things
                    $(".button-cover").animate({
                        borderRadius: "50%"
                    }, "slow")
                });
                $(".AR").animate({
                    paddingTop: "-=10%",
                    opacity:"1"
                }, 600);
            });
            
        }, 200);
    });
    $("#num2").on('click', () => {
        $("#num1").animate({
            left: "-=50%",
            top:"-=100%",
            opacity: 0
        }, "slow");
        $("#num3").animate({
            left: "-=50%",
            top: "+=100%",
            opacity: 0
        }, "slow");
    });
    $("#num3").on('click', () => {
        $("#num2").animate({
            left: "+=100%",
            opacity: 0
        }, "slow");
        $("#num1").animate({
            left: "-=50%",
            top: "-=100%",
            opacity: 0
        }, "slow");
    });
})

function back_to_menu() {
    console.log("we're back!");
}