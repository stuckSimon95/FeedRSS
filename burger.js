const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        console.log(nav);
        nav.classList.toggle('nav-active');
    });
}

navSlide();
