var $tabs = $('.tabs > .tab');
var $images = $('.tabs > .tab > img');
var $containters = $('.containers > .container');
$tabs.on('click', function () {
    var $self = $(this);
    var $image = $self.find('img');
    $containters
        .removeClass('active')
        .eq($tabs.index($self))
        .addClass('active');
    $tabs.removeClass('active');
    $images.removeClass('animated fadeOut');
    $self.addClass('active');
    $image.addClass('animated fadeOut');
});
