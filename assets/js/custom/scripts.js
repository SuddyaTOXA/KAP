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
                //for box-wrap animate
                console.log("afterLoad--" + "anchorLink: " + anchorLink + " index: " + index );
                var box = $('#section' + index + ' .box-wrap');
                console.log(box);
                box.each(function (index) {
                    if (!(box.eq(index).hasClass('show'))) {
                        box.eq(index).addClass('show');
                        console.log('show');
                    }
                });
            }
        });
        $('.nav-list a').on('click', function () {
            var list = $(this).parents('.nav-list').find('li');
            list.removeClass('active');
            $(this).parent().addClass('active');
        })
    }
    
    //for valentine animate

});