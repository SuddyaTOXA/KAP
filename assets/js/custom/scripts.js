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
                        } else {
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
    $('input[name=files]').on('change', function () {
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
        // for (var i = 0; i < count; ++i) {
        //     names.push($(this).get(0).files[i].name);
        // }
        // for (var i = 0; i < $(this).get(0).files.length; ++i) {
        //     fileList.add('<li>'+ $(this).get(0).files[i].name +'</li>');
        // }
        // console.log(names);
        // $('input[name=file]').val(names);
        // names.each(function () {
        //     console.log($(this));
        // })
    })

});