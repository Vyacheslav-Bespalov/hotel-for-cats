'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        

        let mobileMenuButton = document.querySelector('.header__menu-button'),
        header = document.querySelector('.header');

        mobileMenuButton.addEventListener('click', function () {
            header.classList.toggle('header--mobile-menu-active');
        });


        // =========== swiper slider ===========================

        // ============== слайдер номеров =======================
        let apartamentSlider = new Swiper('.apartaments__slider', {
            // Optional parameters
            loop: true,

            speed: 200,
            spaceBetween: 90,

            breakpoints: {
                // when window width is >= 1366px
                1366: {
                    spaceBetween: 190
                }
            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })


        // ============== слайдер отзывов =======================
        let feedbackSlider = new Swiper('.feedback__slider', {
            // Optional parameters
            loop: true,

            speed: 200,
            spaceBetween: 90,


            breakpoints: {
                // when window width is >= 610px
                610: {
                    slidesPerView: 1.5,
                    spaceBetween: 30
                },
                // when window width is >= 768px
                // 768: {
                //     slidesPerView: 1.5,
                //     spaceBetween: 30
                // },
                // when window width is >= 1025px
                1025: {
                    slidesPerView: 2,
                    // width: '470px',
                    spaceBetween: 30
                },
                // when window width is >= 1366px
                1366: {
                    slidesPerView: 2.4,
                    // width: '470px',
                    spaceBetween: 30
                }

            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })

        //============================================================




        // ========= яндекс карты ============================

        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                    center: [59.938635, 30.323118],
                    zoom: 16,
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Котейка',
                    balloonContent: 'Адрес: Санкт-Петербург,ул Большая Конюшенная, д 19<br> Режим работы: Ежедневно, с 9:00 до 20:00<br> Телефон: 8 (800) 333-55-99'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '../img/map-pin.svg',
                    // Размеры метки.
                    iconImageSize: [54, 98],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-30, -68]
                });

            //     myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            //         hintContent: 'Собственный значок метки с контентом',
            //         balloonContent: 'А эта — новогодняя',
            //         iconContent: '12'
            //     }, {
            //         // Опции.
            //         // Необходимо указать данный тип макета.
            //         iconLayout: 'default#imageWithContent',
            //         // Своё изображение иконки метки.
            //         iconImageHref: 'images/ball.png',
            //         // Размеры метки.
            //         iconImageSize: [48, 48],
            //         // Смещение левого верхнего угла иконки относительно
            //         // её "ножки" (точки привязки).
            //         iconImageOffset: [-24, -24],
            //         // Смещение слоя с содержимым относительно слоя с картинкой.
            //         iconContentOffset: [15, 15],
            //         // Макет содержимого.
            //         iconContentLayout: MyIconContentLayout
            //     });

            myMap.geoObjects
                .add(myPlacemark);
            //     .add(myPlacemarkWithContent);

            myMap.behaviors.disable('scrollZoom'); //отключает масштабирование скроллом мыши
        });

    });
    





})();