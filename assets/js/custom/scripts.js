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
            disableDefaultUI: true,
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
    if ($('#fullpage').length) {
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
            verticalCentered: false,
            scrollingSpeed: 700,
            scrollBar: true,
            afterLoad: function(anchorLink, index){
                //for left menu
                function clearList() {
                    var navList = $('.nav-list li');
                        navList.removeClass('active');
                }
                var navList = $('.nav-list li');
                    navList.each(function (i) {
                        var item = navList.eq(i),
                            anchor = item.data('menuanchor');
                            if(anchor == anchorLink) {
                                if (!(item.hasClass('active'))) {
                                    clearList();
                                    item.addClass('active');
                                    console.log('Add class active to: '+ anchor);    
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
                    line.each(function (i) {
                        if (!(line.eq(i).hasClass('show'))) {
                            line.eq(i).addClass('show');
                        }
                    });
            }
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
                    fileList.append('<li>'+ $(this).get(0).files[i].name +'</li>')
                }
            } else {
                if (fileBox.hasClass('show')) {
                    fileBox.removeClass('show');
                }
            }
    });

    //for review slider
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
    })
});