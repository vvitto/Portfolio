$(document).ready(function(){
    setInterval(function(){
        $(".preloader").animate({
            opacity: 0.0
        }, 700, function(){
            $('.preloader').css("display", "none");
        });
    }, 500);


    $('.parallax-window').parallax({imageSrc: 'assets/bg2.jpg'});
    $('.parallax-window2').parallax({imageSrc: 'assets/avatar.jpg'});

    new WOW().init();

    var sec = [];
    $("section").each(function(){
        sec.push($(this).position().top);V
    });


    function getActiveSection(){
        var activeArea = $(window).scrollTop() + $(window).height() / 2;
        for(var i = sections.length - 1; i >= 0; i--){
            if(activeArea > sections.eq(i).position().top){
                return i;
            }
        }
    }

    var trigger = $(".header__menu-toggle");
    var j = 0;
    var sections = $("section");
    var activeArea = $(window).scrollTop() + $(window).height() / 2;
    var activeSec = getActiveSection();
    
    var menu_items = $(".header__menu-item");
    var leftMargin = $(menu_items).eq(activeSec).position().left;

    $(trigger).css('left', leftMargin);
    var lastItem = activeSec;
    $(window).scroll(function(){
        activeSec = getActiveSection();
        
        if(activeSec != lastItem){
            var menu_items = $(".header__menu-item");
            var leftMargin = $(menu_items).eq(activeSec).position().left;
            $(trigger).animate({'left': leftMargin}, 300);
            lastItem = activeSec;
        }
    });

    $(menu_items).on("click", function(){
        var selectSection = $(this).attr("id");
        $('html,body').animate({
            scrollTop: $("section." + selectSection).offset().top - 80
        }, 1000);
    });


    $(".preview__arrow_down").on("click", function(){
        $('html,body').animate({
            scrollTop: $("section.about").offset().top - 80
        }, 1000);
    });
    $(".preview__button").on("click", function(){
        $('html,body').animate({
            scrollTop: $("section.contacts").offset().top - 80
        }, 1000);
    });

    $(".header__menu-trigger").click(function(){
        $(".header__menu-item").slideToggle();
    });
    $(".header__menu-item").click(function(){
        if($(window).width() <= 680){
            $(".header__menu-item").slideToggle();    
        }
    });



    $(".submit").on("click", function(){
        if($("form input[name='name']").val() == ""){
            $("form input[name='name']").css("background-color", "#f46242");
        }else if($("form input[name='email']").val() == ""){
            $("form input[name='email']").css("background-color", "#f46242");
        }else if($("form textarea[name='message'").val() == ""){
            $("form textarea[name='message'").css("background-color", "#f46242");
        }else{

            var name = $(".form input[name='name']").val();
            var email = $(".form input[name='email']").val();
            var text = $(".form textarea").val();
            var message = "Имя: " + name + "Email: " + email + "Сообщение: " + text;
            $.ajax({
                url: "https://formspree.io/vvitto123@gmail.com", 
                method: "POST",
                data: {message: message},
                dataType: "json",
                success: function(){
                    $(".submit").val("Сообщение было получено, скоро я с вами свяжусь)");
                    $('.submit').attr("disabled", true);
                    $(".submit").css('background-color', "#41f49b");
                }
            });
        }
    });

    $("form input, form textarea").on("focus", function(e){
        $(e.target).css("background-color", "#ededed");
    });



    //viewer


    $(".works__examples-item").on("click", function(e){
        var num = $(e.target).parent().data('item');
        var overlayer = document.createElement("div");
        overlayer.className = "viwer-Overlayer";
        var body = document.querySelector(".page-wrapper");
        body.appendChild(overlayer);
    });
    

    $('.slider-wrapper').slick({
        infinite: true,
        appendArrows: $(".slider__arrow"),
        prevArrow: $(".slider__arrow-prev"),
        nextArrow: $(".slider__arrow-next"),
        appendDost: $(".slick-dots"),
        dots: true
    });
    
});
