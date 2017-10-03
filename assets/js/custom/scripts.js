function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [{"featureType":"all","elementType":"all","stylers":[{"hue":"#008eff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"0"},{"lightness":"0"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-60"},{"lightness":"-20"}]}],
        {name: 'Styled Map'});

    var image = 'site/img/geo.png';
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

    // for smooth scroll
    // if ( $('[data-menuanchor]').length ) {
    //     console.log("scroll")
    //     smoothScroll.init({
    //         selector: '.smooth-scroll, [data-menuanchor]', // Selector for links (must be a class, ID, data attribute, or element tag)
    //         speed: 2500, // Integer. How fast to complete the scroll in milliseconds
    //         easing: 'easeInQuad', // Easing pattern to use
    //         // offset: 130 // Integer. How far to offset the scrolling anchor location in pixels
    //     });
    // }

    var myList = [
        'main',
        'tax-disputes',
        'conflict',
        'winner',
        'necessary',
        'trusting-us',
        'full-construction',
        'get-started',
        'how-working',
        'price-formation',
        'will-work',
        'trust-us',
        'our-practice',
        'contact'
    ];

    if ($('#fullpage').length) {
        var box = $('.section'),
            respHeight = 0;

        function fullpageCustomInitialize(respHeight) {
            $('#fullpage').fullpage({
                anchors: myList,
                css3: false,
                keyboardScrolling: false,
                verticalCentered: true,
                scrollingSpeed: 700,
                scrollBar: true,
                autoScrolling: false,
                responsiveHeight: respHeight,
                responsiveWidth: 1024,
                onLeave: function(index, nextIndex, direction){
                    //for box-wrap animate
                    var box = $('#section' + index + ' .box-wrap');
                    box.removeClass('show');

                    // for line animate
                    var line = $('#section' + index + ' .line');
                    if (!($('#section' + index).hasClass('section-sides'))) {
                        line.removeClass('show');
                    }

                    // for list animate
                    var list = $('#section' + index + ' .how-work-number');
                    list.removeClass('show');

                    //for sides section animate
                    if ($('#section' + index).hasClass('section-sides')) {
                        var sidesSlide = $('.section-sides'),
                            sidesLine = sidesSlide.find('.line'),
                            sidesArrow = sidesSlide.find('.side-arrow');
                        // sidesImg = sidesSlide.find('.side-img');

                        sidesLine.removeClass('show');
                        sidesArrow.removeClass('show');
                        // sidesImg.removeClass('show');
                    }

                },
                afterLoad: function (anchorLink, index) {
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
                                // console.log('Add class active to: ' + anchor);
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

        // fullpageCustomInitialize(maxH);
        $(window).on('load', function () {
            if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
                if ($(window).width() > 1024) {
                    setTimeout(function () {
                        var maxH = maxHeight(box);
                        fullpageCustomInitialize(maxH);
                    }, 300);
                }
            } else {
                if (!($('body').hasClass('mob-device'))) {
                    $('body').addClass('mob-device');
                }
            }
        });

        $(window).on('resize', function () {
            if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
                var maxH = maxHeight(box);
                if ($('body').hasClass('mob-device')) {
                    $('body').removeClass('mob-device');
                }
                if ($(window).width() > 1024) {
                    setTimeout(function () {
                        var maxH = maxHeight(box);
                        if ($('html').hasClass('fp-enabled')) {
                            $.fn.fullpage.destroy('all');
                        }
                        fullpageCustomInitialize(maxH);
                    }, 300);
                } else {
                    if ($('html').hasClass('fp-enabled')) {
                        $.fn.fullpage.destroy('all');
                    }
                }
            } else {
                if (!($('body').hasClass('mob-device'))) {
                    $('body').addClass('mob-device');
                }
                if ($('html').hasClass('fp-enabled')) {
                    $.fn.fullpage.destroy('all');
                }
            }

        });
    }

    //for left menu
    $('.nav-list a').on('click', function () {
        var list = $(this).parents('.nav-list').find('li');
        list.removeClass('active');
        $(this).parent().addClass('active');
    })

    //for mob menu
    $('.mobile-menu a').on('click', function () {
        event.preventDefault();
        var anchor = $(this).parent().attr('data-menuanchor');

        $('html,body').animate({
            scrollTop: $('[data-anchor = '+ anchor +']').offset().top - 49
        }, 500);
        setTimeout(function () {
            $('.mobile-menu-toggle').toggleClass('active');
            $('.mobile-menu-box').toggleClass('showing');
            $(document.body).toggleClass('overflow');
        }, 350);
    });

    if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
        // if ($(window).width() > 1024) {}

    } else {
        var section = $('.section');
        myList.forEach(function(item, i) {
            section.eq(i).attr('data-anchor', item);
        });
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
            if (!(fileBox.hasClass('open'))) {
                fileBox.addClass('open');
            }
            fileList.empty();
            fileCount.text(count);

            for (var i = 0; i < count; ++i) {
                fileList.append('<li>'+ $(this).get(0).files[i].name +'<i class="fa fa-times" aria-hidden="true"></i><script>$(".fa-times").on("click", function () { $(this).parents("li").remove(); })</script></li>')
            }
        } else {
            if (fileBox.hasClass('open')) {
                fileBox.removeClass('open');
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
            if (fileBox.hasClass('open')) {
                fileBox.removeClass('open');
            }
        }
    });


    //for review slider
    $(window).on('load resize', function () {
        if($('.reviews-slider')) {
            var sliders = $('.reviews-slider'),
                width = $(window).width();
                setTimeout(function () {
                    sliders.each(function (i) {
                        var boxWrap = sliders.eq(i).find('.reviews-list'),
                            boxInner = boxWrap.find('.review-box'),
                            box = boxWrap.find('.review-text'),
                            boxHeader = boxWrap.find('.review-header-box'),
                            boxHeight = maxHeight(box) + 86,
                            boxHeaderHeight = maxHeight(boxHeader);
                        if (boxHeight < 372) {
                            boxHeight = 372;
                        }
                        boxInner.outerHeight(boxHeight + boxHeaderHeight);
                        boxWrap.height(boxHeight + boxHeaderHeight);
                    })
                }, 100)
        }
    });

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

    //for with-whom section
    $(window).on('load resize', function () {
        var widthW = $(window).width(),
            tableW = $('.with-whom .with-whom-table'),
            cellWF = tableW.find('.with-whom-cell.first'),
            cellWM = tableW.find('.with-whom-cell.middle');

        if (widthW > 1024) {
            if (!(cellWF.hasClass('move'))) {
                cellWF.addClass('move');
                cellWM.removeClass('move');
                cellWF.prependTo(tableW);
            }
        } else {
            if (!(cellWM.hasClass('move'))) {
                cellWM.addClass('move');
                cellWF.removeClass('move');
                cellWM.prependTo(tableW);
            }
        }
    });


    //for person form
    $('.icon-letter.person, .close-form').on('click', function () {
        var section = $(this).parents('.section'),
            openPersonForm = section.find('.with-whom-cell.show'),
            personForm = $(this).parents('.with-whom-cell');

        openPersonForm.removeClass('show');

        if ($(this).hasClass('person')) {
            if(!(personForm.hasClass('show'))) {
                personForm.addClass('show');
            }
        } else if ($(this).hasClass('close-form')) {
            if(personForm.hasClass('show')) {
                personForm.removeClass('show');
            }
        }
    });


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
        autoClose: true,
        startDate: new Date()
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
    // var forms =  $(".custom-form");
    // forms.each(function () {
    //     $(this).validate({
    //         errorClass: 'error',
    //         errorPlacement: function(error, element) { },
    //         rules: {
    //             field1: {
    //                 required: true
    //             },
    //             field2: {
    //                 required: true,
    //                 minlength: 7
    //             }
    //         }
    //     });
    // })

    if ($('.nav-list').length) {
        var nav = $('.nav'),
            last = $('.last-section'),
            lastH = last.height(),
            boxAnimate = $('.orange-box'),
            prev = $('.penultimate-section'),
            sectionMap = $('.section-map').height();

        boxAnimate.height(lastH)
        console.log(lastH);

        $(window).scroll(function() {
            // for btn up
            if  ($(window).scrollTop() == $(document).height() - $(window).height()) {
                if (!(nav.hasClass('show'))) {
                    boxAnimate.addClass('animate');
                    nav.addClass('show');
                    setTimeout(function () {
                        boxAnimate.removeClass('animate');
                    }, 350);
                }
            }
            if  ($(window).scrollTop() < $(document).height() - sectionMap * 2) {
                // if (!(nav.hasClass('show'))) {
                if (nav.hasClass('show')) {
                    nav.removeClass('show');
                }
            }

        });
    }


});