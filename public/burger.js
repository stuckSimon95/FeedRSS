const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    $('.nav-links li').hide();
    // toggle NAV
    burger.addEventListener('click', () => {
        
        nav.classList.toggle('nav-active');
        //$('.nav-links').toggle('nav-active');

        // animate links
        navLinks.forEach((link, index) => {
        if(link.style.animation){
            link.style.animation = '';
        } else {
            link.style.animation = 'navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s';
        }
        });

        burger.classList.toggle('toggle');

        if(nav.classList.contains('nav-active'))
        {
            $('.nav-links li').show();
        }
        else{
            $('.nav-links li').hide();
        }
    });
}

navSlide();

/* $('.burger').click(function() {
    if ( ! $(this).hasClass('active')) 
    {
        $('li.active').removeClass('active');
        $(this).addClass('active');
        offsetTop = $(this).offset().top - $('.nav').offset().top;
        offsetLeft = $(this).offset().left - $('.nav').offset().left;
        $('.nav-background').animate({
            top: offsetTop,
            left: offsetLeft,
            right: $('.nav').width() - $(this).width() - offsetLeft,
            bottom: $('.nav').height() - $(this).height() - offsetTop 
        }, 'slow', 'linear');
    }
}); */
