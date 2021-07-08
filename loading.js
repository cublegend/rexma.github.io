// animate the side bar to cover the screen, change the text to something else
//after loaded animate the side bar back
$(window).on('load', ()=> {
    $("#sidebar").find(".wrapper").fadeIn("slow");
    $("#main-section").animate({
        paddingTop: "0%",
        opacity:"1"
    }, 700);

    if (window.location.pathname.includes("/index.html")) {
        $('#sidebar').animate({
            width:"40%",
            marginRight:"60%"
        }, "slow");
        gear_anim();
        $('#gear').animate({
            right: "60%",
            width:"10%",
        }, "slow")
    }
    else {
        $('#sidebar').animate({
            width:"20%",
            marginLeft:"80%"
        }, "slow");
        gear_anim();
        $('#gear').animate({
            left: "81%",
            width:"10%",
        }, "slow")
    }
    
})
$(".portfolio.subpage").on("click", () => {
    text_anim();
    $('#sidebar').animate({
        width:"100%",
        marginLeft:"0"
    }, "slow",()=> {
        window.location = "./portfolio.html"
    });
    gear_anim_load();
})
$(".blog.subpage").on("click", () => {
    text_anim();
    $('#sidebar').animate({
        width:"100%",
        marginLeft:"0"
    }, "slow",()=> {
        window.location = "./blog.html"
    });
    gear_anim_load();
})
$(".home.subpage").on("click", () => {
    text_anim();
    $('#sidebar').animate({
        width:"100%",
        marginLeft:"0"
    }, "slow",()=> {
        window.location = "./index.html"
    });
    gear_anim_load();
})

$("#gear").on("click", ()=> {
   gear_anim();
})

function gear_anim () {
    $("#gear").css("animation", "rotate 1s linear forwards");
    $('#gear').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $("#gear").css('animation', '');
    });
}

function gear_anim_load() {
    gear_anim();
    $('#gear').animate({
        left: "0",
        right: "0",
        width:"20%",
    }, "slow")
}

function text_anim () {
    $("#sidebar").find(".wrapper").fadeOut("slow");
}