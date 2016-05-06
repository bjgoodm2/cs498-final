$(document).ready(function() {
    $('#fullpage').fullpage({
        css3:true,
        scrollBar:true,
        normalScrollElements: '.modal',
        afterRender: function () {
            //on page load, start the slideshow
            slideTimeout = setInterval(function () {
                $.fn.fullpage.moveSlideRight();
            }, 5000);
        }

    }); // end fullpage
    //$.fn.fullpage.destroy('all');
    $(".scrollTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});