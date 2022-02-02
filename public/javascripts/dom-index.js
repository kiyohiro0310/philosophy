$(document).ready(function(){
    $('#title').hide();
    $('#subheader').hide();
    $('.link-sea').hide();
    $('.link-forest').hide();
    $('.link-warning').hide();
    $('#img_text').hide();

    $('#title').fadeIn(800);
    $('#subheader').delay(800).fadeIn(800);
    $('.link-sea').delay(1000).fadeIn(800);
    $('.link-forest').delay(1200).fadeIn(800);
    $('.link-warning').delay(1400).fadeIn(800);

    $(window).scroll(function () {
        $('#area').each(function(i){
            var bottom_of_object = $(this).offset().top + ($(this).outerHeight()/4);
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},500);

            }
        });
        $('#outer').each(function(){
            var bottom_of_object = $(this).offset().top + ($(this).outerHeight()/2);
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},500);
            }
        })
    });

    //mouse event
    $('.description-sea').hide();
    $('.description-forest').hide();
    $('.description-warning').hide();

    $('#left-arrow').on('mouseover', function(){
        $('.sea').toggleClass('show');
    });
    $('#left-arrow').on('mouseout', function(){
        $('.sea').toggleClass('show');
    });
    $('#right-arrow').on('mouseover', function(){
        $('.forest').toggleClass('show');
    });
    $('#right-arrow').on('mouseout', function(){
        $('.forest').toggleClass('show');
    });
    //sea
    $('.link-sea').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-sea').show();

    });
    $('#close-sea').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-sea').hide();
    });
    //forest
    $('.link-forest').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-forest').show();
    });
    $('#close-forest').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-forest').hide();
    });
    //warning
    $('.link-warning').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-warning').show();
    });
    $('#close-warning').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.description-warning').hide();
    });
        //top_header

    $('#th_login').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.login-form').fadeIn(300);
    })
    $('#lf_close').on('click', function(){
        $('.tree').toggleClass('dark');
        $('.login-form').hide();
    })
    $('#close_btn').on('click', function(){
        $('.create-comp').hide();
    })
    $('#account_img img').on('mouseover', function(){
        $('#img_text').show();
    })
    $('#account_img img').on('mouseout', function(){
        $('#img_text').hide();
    })

});

