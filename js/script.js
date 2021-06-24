/* Слайдер */
$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        fade: true,
        cssEase: 'linear',
        speed: 1000,
/*         adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: true
                }
            }
        ]
      }); /* включение табов */
      $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
        /* переключение между контентом карточки */
    function toggleSlide(item) { 
      $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };  

        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back');

        //Modal Popup

        $('[data-modal=consultation]').on('click', function() {
            $('.overlay, #consultation').fadeIn();
        });
        $('.modal__close').on('click', function() {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        })

        $('.button_mini').each(function(i) {
            $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn();
            })
        });
//Валидация
        function validateForms(form){
            $(form).validate({
                rules: {
                    name: "required" ,
                    phone: "required" ,
                    email: {
                        required: true,
                        email: true
                    } 
                },
                messages: {
                    name: "Пожалуйста,введите свое имя",
                    phone: "Пожалуйста,введите свой телефон",
                    email: {
                      required: "Пожалуйста,введите свою почту",
                      email: "Неправильно введен адрес почты"
                    }
                  }
            });
        };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
//маска номера на форме
    $('input[name=phone]').mask("+3 (999) 999-99-99");
//отправка писем
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();  //class link(img)
        } else {
            $('.pageup').fadeOut();
        }    
    });
    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});
//wow script
    new WOW().init();
});