$(function () {
    console.log($('#active-menu')[0]);
    $('#active-menu')[0].innerHTML = $('.active')[0].innerHTML;
});

$('nav>a').click(function (e) {
    e.preventDefault();

    // Change Nav Appearance
    $('.active').addClass("transitioning");
    $(this).addClass("active");
    $('#active-menu')[0].innerHTML = $(this)[0].innerHTML;
    console.log($(this)[0].innerHTML);
    $('.transitioning').removeClass("active");
    $('.transitioning').removeClass("transitioning");
    
    // start skills animation
    if ($(this)[0].innerHTML == "Skills") {
        setTimeout(function () {
            typeSkills();
        }, 1000);
    }
    
    // Change Page
    $('.show-card').addClass("hide-card");
    $('.show-card').removeClass("show-card");
    $('#' + $(this)[0].innerHTML).removeClass("hide-card");
    $('#' + $(this)[0].innerHTML).addClass("show-card");
});

typeSkills = function () {
    typer(".static", 100)
        .empty()
        .line("I know ...")
        .pause(400)
        .end(function (e) {
            $('.lang-icons').addClass("show");
            $('.lang-icons').removeClass("hide");
        });
};

var replaceLang = function (selector, iconClass) {
    $(selector).innerHTML = "<i class=\"lang-icon " + iconClass + "\"></i>";
};