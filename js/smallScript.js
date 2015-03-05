var $tabs = $('.tabs > .tab');
var $images = $('.tabs > .tab > img');
var $containters = $('.containers > .container');
$tabs.on('click', function () {
    var $tab = $(this);
    var $image = $tab.find('img');
    $containters
        .removeClass('active')
        .eq($tabs.index($tab))
        .addClass('active');
    $tabs.removeClass('active');
    $images.removeClass('animated rotateIn');
    $tab.addClass('active');
    $image.addClass('animated rotateIn');
});