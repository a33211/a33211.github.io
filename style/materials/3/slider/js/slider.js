"use strict";
(function() {
    var slideWidth = 910;
    var slideAnimateTime = 400;
    var slideShowNext = 2000;
    var slideNextDelay = 5000;
    var lastSlide = "3";

    function Slider(holder, images) {
        this._$holder = $(holder);
        this._images = images.slice();
        this._slidesInterval = null;
        this._sleepTimeout = null;

        // these variable will be initialized after _generateMarkup();
        this._$sliderMenu = null;
        this._$menuItems  = null;
        this._$sliderTube = null;
        this._$previousMenuItem = null;
        this._generateMarkup();

        var self = this;
        this._$sliderMenu.on("click", ".slider-menu-item", function() {
            clearInterval(self._slidesInterval);
            clearTimeout(self._sleepTimeout);

            self.showSlide( $(this) );

            self._sleepTimeout = setTimeout(self._start.bind(self), slideNextDelay);
        });

        this._start();
    }

    Slider.prototype._generateMarkup = function() {
        this._$holder.append('<div class="slider-menu">');
        this._$sliderMenu = this._$holder.find("div");

        this._$sliderMenu.append($("<div>").attr("data-slider-slide-number", 0))
            .append($("<div>").attr("data-slider-slide-number", 1))
            .append($("<div>").attr("data-slider-slide-number", 2))
            .append($("<div>").attr("data-slider-slide-number", 3));
        this._$menuItems = this._$sliderMenu.find("div");
        this._$menuItems.addClass("slider-menu-item");

        this._$holder.append('<div class="slider-main">');
        var $sliderMain = this._$holder.find("div.slider-main");

        $sliderMain.append('<div class="slider-tube">');
        this._$sliderTube = $sliderMain.find("div.slider-tube");

        for (var i = 0; i < this._images.length; ++i) {
            this._$sliderTube.append( $( "<div>" ).addClass("slider-slide").append( $( "<img>" ).attr( "src", this._images[i] ) ) );
        }

        this._$previousMenuItem = this._$menuItems.eq(0);
        this.showSlide(this._$previousMenuItem);
    };
    Slider.prototype._start = function() {
        this._slidesInterval = setInterval( this.showNext.bind(this), slideShowNext);
    };

    Slider.prototype.showSlide = function ($menuItem) {
        var slideIndex = $menuItem.attr("data-slider-slide-number");


        this._$previousMenuItem.css("background-color", "");
        this._$previousMenuItem.removeClass("active");

        $menuItem.css("background-color", "orange");
        $menuItem.addClass("active");
        this._$previousMenuItem = $menuItem;

        this._$sliderTube.stop().animate({
            'margin-left': -slideWidth * slideIndex + 'px'
        }, slideAnimateTime);
    };
    Slider.prototype.showNext = function() {

        var $nextMenuItem;

        if (this._$previousMenuItem.attr("data-slider-slide-number") === lastSlide) {
            $nextMenuItem = this._$menuItems.eq(0);
        } else {
            $nextMenuItem = this._$previousMenuItem.next();
        }
        this.showSlide($nextMenuItem);
    };

    window.Slider = Slider;
})();