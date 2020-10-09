(function () {

    let galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 16,
        slidesPerView: 3,
        breakpoints: {
            // when window width is >= 1366px
            1366: {
                direction: 'vertical',
                height: 396,
                spaceBetween: 30
            }
        },
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        thumbs: {
            swiper: galleryThumbs,
        },
    });

})();