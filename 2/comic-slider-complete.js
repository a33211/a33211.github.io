//!!!!! Рабостает с http://explosm.net/
'use strict';
(function() {
    window.comics = 3789;
    window.loadFlag = false;

    function throttle(fn, threshold, scope) {
        threshold || (threshold = 100);
        var last, deferTimer;
        return function() {
            var context = scope || this;
            var now = +new Date,
                args = arguments;
            if (last && now < last + threshold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    $(window).scroll(throttle(function() {
        var elements = $('body').find('#featured-comic').parent().children().last();
        var bottomObject = elements.offset().top + elements.outerHeight();
        var bottomWindow = $(window).scrollTop() + $(window).height();

        if (((bottomWindow + 10) > bottomObject) && !window.loadFlag) {
            window.comics--;
            request();
        }
    }));

    function request() {
        $.ajax({
            type: 'get',
            url: "http://explosm.net/comics/" + window.comics + "/",
            dataType: "html",
            beforeSend: function() {
                window.loadFlag = true;
            },
            success: function(data) {
                var referance = $(data).find('#main-comic').parent().attr('href');
                var regExpr = /(\/episode\/)/g;
                if (!regExpr.test(referance)) {
                    var src = $(data).find('#main-comic');
                    console.log('not an episode' + src[0].src);
                    var img = $('body').find('#featured-comic').parent().children().last();
                    if (src) {
                        var imgage = $("<img/>").attr("src", src[0].src).insertAfter(img).animate({
                            'margin-left': -100
                        }, 500);
                    }

                    var elements = $('body').find('#featured-comic').parent().children().last();
                    var bottomObject = elements.offset().top + elements.outerHeight();
                    var bottomWindow = $(window).scrollTop() + $(window).height();
                    if ((bottomWindow + 10) > bottomObject) {
                        window.comics--;
                        request();
                    }

                } else {
                    window.comics--;
                    request();
                }
                window.loadFlag = false;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.comics--;
                request();
                window.loadFlag = false;
            }
        })
    }
})()