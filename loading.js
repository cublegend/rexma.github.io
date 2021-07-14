// animate the side bar to cover the screen, change the text to something else
//after loaded animate the side bar back
$(window).on('load', ()=> {
    $("#sidebar").find(".wrapper").fadeIn("slow");
    $("#main-section").animate({
        paddingTop: "-=10%",
        opacity:"1"
    }, 700);

    if (window.location.pathname.includes("/index.html") ||
        !window.location.pathname.includes("html")) { //if doesn't include html means its on index.html
        $('#sidebar').animate({
            width:"40%",
            marginRight:"60%"
        }, "slow", start_scrolling);
        gear_anim();
        $('#gear').animate({
            right: "60%",
            width:"10%",
            top:"60%",
        }, "slow");
        $('.floating-text').animate({
            marginLeft: '0'
        }, 800)
    }
    else {
        $('#sidebar').animate({
            width:"20%",
            marginLeft:"80%"
        }, "slow");
        gear_anim();
        $('#gear').animate({
            left: "81%",
            top:"60%",
            width:"10%",
        }, "slow")
    }
    
})
$(".portfolio.subpage").on("click", () => {
    text_anim();
    $('#sidebar').animate({
        width:"100%",
        marginLeft:"0",
        backgroundColor: "#3a5c57"
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
        marginLeft:"0",
        backgroundColor: "white"
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
        top:"0"
    }, "slow")
}

function text_anim () {
    $("#sidebar").find(".wrapper").fadeOut("slow");
}