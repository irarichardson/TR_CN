$('.hoverDiv').each(function () {
    var $content = $(this).find('.content').show();

    $content.css("margin-top", -1 * $content.height());
}).hover(function () {
    var $content = $(this).find('.content');

    $content.animate({
        "margin-top": -1 * ($content.height() - 60)
    }, 100);
}, function () {
    var $content = $(this).find('.content');

    $content.animate({
        "margin-top": -1 * $content.height()
    }, 100);
});


$('.hoverDiv').click(function () {
    var cont = $(this).find('.content');
    cont.animate({
        "margin-top" : 0
    }, 200);
});