function initMap() {
        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [{"featureType":"all","elementType":"all","stylers":[{"hue":"#008eff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"0"},{"lightness":"0"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-60"},{"lightness":"-20"}]}],
            {name: 'Styled Map'});

        var image = 'img/geo.png';
        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: mapLat, lng: mapLng},
            zoom: 14,
            // disableDefaultUI: true,
            // zoomControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            mapTypeControlOptions: {
                mapTypeIds: ['styled_map']
            }
        });

        var beachMarker = new google.maps.Marker({
            position: {lat: mapLat, lng: mapLng},
            map: map,
            icon: image
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
}

jQuery(document).ready(function($) {
    function maxHeight(box) {
        var maxHeight = 0;
        box.each(function () {
            if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        });
        return maxHeight;
    }

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-box').toggleClass('showing');
        // $('.header').toggleClass('active');
        $(document.body).toggleClass('overflow');
    });

    if ($('#fullpage').length) {
        var box = $('.section'),
            maxH = maxHeight(box),
            respHeight = 0;

        function fullpageCustomInitialize(respHeight) {
            $('#fullpage').fullpage({
                anchors: [
                    'firstPage',
                    'secondPage',
                    '3rdPage',
                    '4thPage',
                    '5thPage',
                    '6thPage',
                    '7thPage',
                    '8thPage',
                    '9thPage',
                    '10thPage',
                    '11thPage',
                    '12thPage',
                    '13thPage',
                    '14thPage'
                ],
                keyboardScrolling: false,
                verticalCentered: true,
                scrollingSpeed: 700,
                scrollBar: true,
                responsiveHeight: respHeight,
                responsiveWidth: 1024,
                afterLoad: function (anchorLink, index) {
                    console.log('Current slide: ' + anchorLink);
                    //for left menu
                    function clearList() {
                        var navList = $('.nav-list li');
                        navList.removeClass('active');
                    }

                    var navList = $('.nav-list li');
                    navList.each(function (i) {
                        var item = navList.eq(i),
                            anchor = item.data('menuanchor');
                        if (anchor == anchorLink) {
                            if (!(item.hasClass('active'))) {
                                clearList();
                                item.addClass('active');
                                console.log('Add class active to: ' + anchor);
                            }

                        }
                    });

                    //for box-wrap animate
                    var box = $('#section' + index + ' .box-wrap');
                    box.each(function (i) {
                        if (!(box.eq(i).hasClass('show'))) {
                            box.eq(i).addClass('show');
                        }
                    });

                    // for line animate
                    var line = $('#section' + index + ' .line');
                    var delayL = 200;
                    if (!($('#section' + index).hasClass('section-sides'))) {
                        line.each(function (i) {
                            setTimeout(function () {
                                if (!(line.eq(i).hasClass('show'))) {
                                    line.eq(i).addClass('show');
                                }
                            }, i * delayL);
                        });
                    }

                    // for list animate
                    var list = $('#section' + index + ' .how-work-number');
                    var delay = 200;
                    list.each(function (i) {
                        setTimeout(function () {
                            if (!(list.eq(i).hasClass('show'))) {
                                list.eq(i).addClass('show');
                            }
                        }, i * delay);
                    });

                    //for sides section animate
                    if ($('#section' + index).hasClass('section-sides')) {
                        var sidesSlide = $('.section-sides'),
                            sidesLine = sidesSlide.find('.line'),
                            sidesArrow = sidesSlide.find('.side-arrow'),
                            sidesImg = sidesSlide.find('.side-img');

                        sidesLine.each(function (i) {
                            if (!(sidesLine.eq(i).hasClass('show'))) {
                                sidesLine.addClass('show');
                            }
                        });
                        sidesArrow.each(function (i) {
                            if (!(sidesArrow.eq(i).hasClass('show'))) {
                                sidesArrow.addClass('show');
                            }
                        });
                        sidesImg.each(function (i) {
                            if (!(sidesImg.eq(i).hasClass('show'))) {
                                sidesImg.addClass('show');
                            }
                        });

                    }
                }
            });

        }

        fullpageCustomInitialize(maxH);

        $(window).on('resize', function () {
            var maxH            = maxHeight(box);

            setTimeout(function () {
                if ( $('html').hasClass('fp-enabled') ) {
                    $.fn.fullpage.destroy('all');
                }
                fullpageCustomInitialize(maxH);
            }, 10);
        });

        //for left menu
        $('.nav-list a').on('click', function () {
            var list = $(this).parents('.nav-list').find('li');
            list.removeClass('active');
            $(this).parent().addClass('active');
        })
    }

    //for input file
    $('input.input-file').on('change', function () {
        var names = [],
            count = $(this).get(0).files.length,
            fileParent =  $(this).parents('.custom-form'),
            fileBox = fileParent.find('.file-list-box'),
            fileCount = fileParent.find('.file-count'),
            fileList =fileParent.find('.file-list');

            if (count > 0) {
                if (!(fileBox.hasClass('show'))) {
                    fileBox.addClass('show');
                }
                fileList.empty();
                fileCount.text(count);

                for (var i = 0; i < count; ++i) {
                    fileList.append('<li>'+ $(this).get(0).files[i].name +'<i class="fa fa-times" aria-hidden="true"></i><script>$(".fa-times").on("click", function () { $(this).parents("li").remove(); })</script></li>')
                }
            } else {
                if (fileBox.hasClass('show')) {
                    fileBox.removeClass('show');
                }
            }
    });
    $('.file-list').on('click', function () {
        var fileParent =  $(this).parents('.custom-form'),
            fileBox = fileParent.find('.file-list-box'),
            fileCount = fileParent.find('.file-count'),
            fileList =fileParent.find('.file-list li'),
            count = fileList.length;
            if (count > 0) {
                fileCount.text(count);
            } else {
                if (fileBox.hasClass('show')) {
                    fileBox.removeClass('show');
                }
            }
    });


    // $(".fa-times").on("click", function () {
    //     $(this).parents("li").remove();
    //     var count = $(this).parents(".file-list").find('li').length;
    //     $(this).parents(".file-list-box").find(".file-count").text(count);
    // });
    //for review slider
    // $(window).on('load resize', function () {
    //     if($('.reviews-slider')) {
    //         var sliders = $('.reviews-slider');
    //             sliders.each(function (i) {
    //                 var boxWrap = sliders.eq(i).find('.review-box'),
    //                     box = boxWrap.addClass('test-show').find('.review-text'),
    //                     boxHeight = maxHeight(box) + 86;
    //                     if (boxHeight < 372) {
    //                         boxHeight = 372;
    //                     }
    //                     setTimeout(function () {
    //                         boxWrap.removeClass('test-show').height(boxHeight);
    //                     }, 200);
    //             })
    //     }
    // });
    $(window).on('load', function () {
        $('.reviews-nav li').on('click', function () {
            var slider = $(this).parents('.reviews-slider'),
                boxList = slider.find('.review-box'),
                navList = slider.find('.reviews-nav li'),
                id = $(this).data('reviewNavId'),
                slide = slider.find('[data-review-id="'+ id +'"]');


                if(!($(this).hasClass('current-item'))) {
                    //for nav
                    navList.removeClass('current-item');
                    $(this).addClass('current-item');
                    //for slide
                    boxList.fadeOut(200);
                    boxList.removeClass('show');
                    setTimeout(function () {
                        slide.fadeIn(350);
                    },250 );
                    setTimeout(function () {
                        slide.addClass('show');
                    },600 );
                }
        });
    });

    //for person form
    $('.icon-letter.person').on('click', function () {
        if(!($(this).hasClass('show'))) {
            var personForm = $(this).parents('.person-box').next();
            personForm.addClass('show');
        }
    });

    //for tooltip
    // $('span.tooltip-icon').each(function() {
    //     var el = $(this),
    //         title = el.attr('title');
    //     if (title && title != '') {
    //         el.attr('title', '').append('<div>' + title + '</div>');
    //         setTimeout(function () {
    //             var width = el.find('div').width();
    //             var height = el.find('div').height();
    //             el.hover(
    //                 function() {
    //                     el.find('div')
    //                         .clearQueue()
    //                         .delay(200)
    //                         .animate({width: width + 20, height: height + 20}, 200).show(200)
    //                         .animate({width: width, height: height}, 200);
    //                 },
    //                 function() {
    //                     el.find('div')
    //                         .animate({width: width + 20, height: height + 20}, 250)
    //                         .animate({width: 'hide', height: 'hide'}, 250);
    //                 }
    //             ).mouseleave(function() {
    //                 if (el.children().is(':hidden')) el.find('div').clearQueue();
    //             });
    //         },300);
    //
    //     }
    // });

    //for popup
    if ($('.open-popup')) {
        $('.open-popup').magnificPopup({
            type: 'inline',
            preloader: false
        });
    }

    //for call back btn
    if ($('.coll-back-btn')) {
        setTimeout(function () {
            $('.coll-back-btn').fadeIn(350);
        }, 3000);
    }

    $('.datepicker-here').datepicker({
        autoClose: true
    });

    //for tooltip
    function toolTip () {
        var targets = $( '[rel~=tooltip]' ),
            target  = false,
            tooltip = false,
            title   = false;

        targets.bind( 'mouseenter', function() {
            target  = $( this );
            tip     = target.attr( 'title' );
            if (target.hasClass('error-text')) {
                tooltip = $( '<div id="tooltip" class="req"></div>' );
            } else {
                tooltip = $( '<div id="tooltip"></div>' );
            }


            if( !tip || tip == '' )
                return false;

            target.removeAttr( 'title' );
            tooltip.css( 'opacity', 0 )
                .html( tip )
                .appendTo( 'body' );

            var init_tooltip = function()
            {
                if( $( window ).width() < tooltip.outerWidth() * 1.5 ) {
                    tooltip.css('max-width', $(window).width() / 2);
                } else {
                    tooltip.css('max-width', 340);
                }

                var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                    pos_top  = target.offset().top - tooltip.outerHeight() - 20;

                if( pos_left < 0 ) {
                    pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                    tooltip.addClass( 'left' );

                } else {
                    tooltip.removeClass('left');
                }

                if( pos_left + tooltip.outerWidth() > $( window ).width() ) {
                    pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                    tooltip.addClass( 'right' );
                } else {
                    tooltip.removeClass('right');
                }

                if( pos_top < 0 ) {
                    var pos_top  = target.offset().top + target.outerHeight();
                    tooltip.addClass( 'top' );
                } else {
                    tooltip.removeClass('top');
                }

                tooltip.css( { left: pos_left, top: pos_top } )
                    .animate( { top: '+=10', opacity: 1 }, 50 );
            };

            init_tooltip();
            $( window ).resize( init_tooltip );

            var remove_tooltip = function()
            {
                tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
                {
                    $( this ).remove();
                });

                target.attr( 'title', tip );
            };

            target.bind( 'mouseleave', remove_tooltip );
            tooltip.bind( 'click', remove_tooltip );
        });
    };
    toolTip();

    // initialize validate plugin on the form
    $(".custom-form").validate({
        errorClass: 'error',
        errorPlacement: function(error, element) { },
        rules: {
            field1: {
                required: true
            },
            field2: {
                required: true,
                minlength: 7
            }
        }
    });

});