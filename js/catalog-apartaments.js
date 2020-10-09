//========== catalog-apartaments ========================
(function () {

    let body = document.querySelector('body');
    let filterButton = document.querySelector('.catalog-apartaments__filter-button');
    let popupFilter = document.querySelector('.popup-filter');
    let popupContent = popupFilter.querySelector('.popup-content');
    let catalogApartamentsFilter = popupFilter.querySelector('.catalog-apartaments__filter');
    let filterClose = popupFilter.querySelector('.filter__close');



    // ЗАКРЫТИЕ ФИЛЬТР ПОПАПА
    //-----------------
    let closeFilter = function () {
        body.classList.remove('body-lock');
        catalogApartamentsFilter.classList.remove('popup-inner-animation');
        popupFilter.classList.remove('popup-animation');
        let timeout = setTimeout(function () {

            popupFilter.classList.add('popup-filter--close');
        }, 300);
        document.removeEventListener('keydown', escPressButton);
    };

    let escPressButton = function (evt) {
        if (evt.code == 'Escape') {
            closeFilter();
        }
    };

    filterClose.addEventListener('click', closeFilter);
    filterClose.addEventListener('keyDown', function (evt) {
        if (evt.code == 'Enter') {
            closeFilter();
        }
    });

    popupContent.addEventListener('click', function (evt) {
        if (evt.target == popupContent) {
            closeFilter();
        }
    });
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



    // ОТКРЫТИЕ ФИЛЬТР ПОПАПА
    //----------------
    let openFilter = function () {
        body.classList.add('body-lock');
        popupFilter.classList.remove('popup-filter--close');
        let timeout = setTimeout(function () {
            catalogApartamentsFilter.classList.add('popup-inner-animation');
            popupFilter.classList.add('popup-animation');
        }, 50);
        document.addEventListener('keydown', escPressButton);
    };

    let enterPressRoomButton = function (evt) {
        if (evt.code == 'Enter') {
            openFilter();
        }

    };

    filterButton.addEventListener('click', openFilter);
    filterButton.addEventListener('keydown', enterPressRoomButton);

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



    // каталог номеров
    let apartamentsCatalog = [

        {
            class: 'econom',
            title: 'Эконом',
            photo: {
                catalog: 'catalog-econom.jpg'
            },
            sizes: {
                width: 90,
                depth: 70,
                height: 180
            },
            equipment: [{
                equipmentName: 'empty',
                equipmentTitle: 'Пустой номер'
            }],
            price: 100
        },
        {
            class: 'econom plus',
            title: 'Эконом плюс',
            photo: {
                catalog: 'catalog-econom-plus.jpg'
            },
            sizes: {
                width: 90,
                depth: 100,
                height: 180
            },
            equipment: [{
                    equipmentName: 'sunbed',
                    equipmentTitle: 'Лежак'
                },
                {
                    equipmentName: 'scratching',
                    equipmentTitle: 'Когтеточка'
                }
            ],
            price: 200
        },
        {
            class: 'comfort',
            title: 'Комфорт',
            photo: {
                catalog: 'catalog-comfort.jpg'
            },
            sizes: {
                width: 100,
                depth: 125,
                height: 180
            },
            equipment: [{
                    equipmentName: 'sunbed',
                    equipmentTitle: 'Лежак'
                },
                {
                    equipmentName: 'scratching',
                    equipmentTitle: 'Когтеточка'
                },
                {
                    equipmentName: 'game-complex',
                    equipmentTitle: 'Игровой комплекс - 3 яруса'
                }
            ],
            price: 250
        },
        {
            class: 'suite',
            title: 'Сьют',
            photo: {
                catalog: 'catalog-suite.jpg'
            },
            sizes: {
                width: 125,
                depth: 125,
                height: 180
            },
            equipment: [{
                    equipmentName: 'sunbed',
                    equipmentTitle: 'Лежак'
                },
                {
                    equipmentName: 'scratching',
                    equipmentTitle: 'Когтеточка'
                },
                {
                    equipmentName: 'game-complex',
                    equipmentTitle: 'Игровой комплекс - 3 яруса'
                }
            ],
            price: 350
        },
        {
            class: 'luxury',
            title: 'Люкс',
            photo: {
                catalog: 'catalog-luxury.jpg'
            },
            sizes: {
                width: 160,
                depth: 160,
                height: 180
            },
            equipment: [{
                    equipmentName: 'sunbed',
                    equipmentTitle: 'Лежак'
                },
                {
                    equipmentName: 'scratching',
                    equipmentTitle: 'Когтеточка'
                },
                {
                    equipmentName: 'game-complex',
                    equipmentTitle: 'Игровой комплекс - 3 яруса'
                },
                {
                    equipmentName: 'lodge',
                    equipmentTitle: 'Домик'
                }
            ],
            price: 500
        },
        {
            class: 'super luxury',
            title: 'Супер-Люкс',
            photo: {
                catalog: 'catalog-super-luxury.jpg'
            },
            sizes: {
                width: 180,
                depth: 160,
                height: 180
            },
            equipment: [{
                    equipmentName: 'sunbed',
                    equipmentTitle: 'Лежак'
                },
                {
                    equipmentName: 'scratching',
                    equipmentTitle: 'Когтеточка'
                },
                {
                    equipmentName: 'game-complex',
                    equipmentTitle: 'Игровой комплекс - 3 яруса'
                },
                {
                    equipmentName: 'lodge',
                    equipmentTitle: 'Домик'
                }
            ],
            price: 600
        }

    ];

    //вычесляет и вставляет в исходный массив площадь номера
    apartamentsCatalog.forEach(function (room) {
        room.sizes.area = parseFloat(((room.sizes.width * room.sizes.depth) / 10000).toFixed(2));
    });

    let customSelect = document.querySelector('.custom-select');
    let customSelectCurrent = customSelect.querySelector('.custom-select__current');
    let customSelectList = customSelect.querySelector('.custom-select__list');

    let catalogApartamentsList = document.querySelector('.catalog-apartaments__list');
    let catalogItem = document.querySelector('#catalog-item-template').content.querySelector('.catalog-item').cloneNode(true);

    //====================== Отрисовка карточек апартаментов ==================================
    let createCatalogItem = function (item) { // создание одного элемента каталога
        let fragment = document.createDocumentFragment();
        fragment = catalogItem.cloneNode(true);
        let itemImage = fragment.querySelector('.catalog-item__image');
        let itemTitle = fragment.querySelector('.catalog-item__title');
        let itemSize = fragment.querySelector('.catalog-item__size');
        let itemArea = fragment.querySelector('.catalog-item__area');
        let itemEquipmentList = fragment.querySelector('.equipment-list');
        // let itemEquipmentListItem = fragment.querySelector('.equipment-list__item');
        let itemPrice = fragment.querySelector('.catalog-item__price');
        let itemLink = fragment.querySelector('.catalog-item__link');

        itemImage.src = `img/apartaments-catalog/catalog-list/${item.photo.catalog}`;
        itemImage.alt += ` ${item.title}`;
        itemTitle.textContent = item.title;
        itemSize.textContent = `${item.sizes.width}x${item.sizes.depth}x${item.sizes.height}`;
        itemArea.textContent = `${(item.sizes.width * item.sizes.depth / 10000).toFixed(2)}`;
        itemPrice.textContent = `${item.price}`;

        itemLink.setAttribute('href', 'room.html');

        for (let i = 0; i < item.equipment.length; i++) {
            let equipmentItem = document.createElement('li');
            equipmentItem.classList.add('equipment-list__item');
            let equipmentImage = document.createElement('img');
            equipmentImage.classList.add('equipment-list__image');
            let equipmentTitle = document.createElement('p');
            equipmentTitle.classList.add('equipment-list__title');

            equipmentImage.src = `img/apartaments-catalog/equipment-icon/equipment-icon-${item.equipment[i].equipmentName}.svg`;
            equipmentItem.appendChild(equipmentImage);

            equipmentTitle.textContent = `${item.equipment[i].equipmentTitle}`;
            equipmentItem.appendChild(equipmentTitle);

            itemEquipmentList.appendChild(equipmentItem);
        }

        catalogApartamentsList.appendChild(fragment);
    }

    let insertCatalogItemsOnPage = function (arr) { // отрисовка всего каталога на страницу
        for (let i = 0; i < arr.length; i++) {
            createCatalogItem(arr[i]);
        }
    };



    let removeCatalogFromPage = function () { // удаление елементов каталога со страницы
        let allCatalogItems = catalogApartamentsList.querySelectorAll('.catalog-apartaments__item');
        allCatalogItems.forEach(element => {
            catalogApartamentsList.removeChild(element);
        });
    };



    // функция фильтрации каталога
    let catalogSorting = function (arr) {

        removeCatalogFromPage();

        let sortType = customSelectCurrent.querySelector('.custom-select__item').getAttribute('data-value');

        if (sortType == 'area-up') {
            arr.sort(function (prev, next) {
                return prev.sizes.area - next.sizes.area;
            });
        }
        if (sortType == 'area-down') {
            arr.sort(function (prev, next) {
                return next.sizes.area - prev.sizes.area;
            });
        }
        if (sortType == 'price-up') {
            arr.sort(function (prev, next) {
                return prev.price - next.price;
            });
        }
        if (sortType == 'price-down') {
            arr.sort(function (prev, next) {
                return next.price - prev.price;
            });
        }

        insertCatalogItemsOnPage(arr);
    };

    catalogSorting(apartamentsCatalog);

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    //============== Фильтры каталога ==================================

    let filterForm = document.querySelector('.filter__form');
    let filterButtonApply = filterForm.querySelector('.filter-buttons__apply');
    let filterButtonReset = filterForm.querySelector('.filter-buttons__reset');
    let priceInputs = filterForm.querySelectorAll('.price-input');


    let filterFunction = function () {

        // apartamentsCatalog.forEach(function (room) {
        //     //вычесляет и вставляет в исходный массив площадь номера
        //     room.sizes.area = parseFloat(((room.sizes.width * room.sizes.depth) / 10000).toFixed(2));
        // });
        let apartamentsCatalogCopy = apartamentsCatalog.slice();

        let newFilteredCatalog = [];

        // фильтр цены
        if (priceInputs[0].value || priceInputs[1].value) {
            newFilteredCatalog = apartamentsCatalogCopy.filter(function (room) {
                if (priceInputs[0].value && !priceInputs[1].value) {
                    return room.price >= priceInputs[0].value;
                } else if (priceInputs[1].value && !priceInputs[0].value) {
                    return room.price <= priceInputs[1].value;
                } else if (priceInputs[0].value && priceInputs[1].value) {
                    return room.price >= priceInputs[0].value && room.price <= priceInputs[1].value;
                }
            });
            apartamentsCatalogCopy = newFilteredCatalog.slice();
        }

        // фильтр площади
        let areaInputs = filterForm.querySelectorAll('.filter__area .filter__input:checked');
        if (areaInputs.length > 0) {
            newFilteredCatalog = [];
            areaInputs.forEach(function (element) {
                apartamentsCatalogCopy.forEach(function (room) {
                    if (element.value == room.sizes.area) {
                        newFilteredCatalog.push(room);
                    }
                });
            });
            apartamentsCatalogCopy = newFilteredCatalog.slice();
        }

        // фильтр оснащения
        let equipmentInputs = filterForm.querySelectorAll('.filter__equipment .filter__input:checked');
        if (equipmentInputs.length > 0) {
            newFilteredCatalog = [];

            newFilteredCatalog = apartamentsCatalogCopy.filter(function (item) {
                let control = [];
                item.equipment.forEach(function (eq) {
                    equipmentInputs.forEach(function (input) {
                        if (eq.equipmentName == input.value) {
                            control.push(1);
                        }
                    });
                });
                if (control.length == equipmentInputs.length) {
                    return item;
                }
            });
            apartamentsCatalogCopy = newFilteredCatalog.slice();
        }
        catalogSorting(apartamentsCatalogCopy);

        let popupFilter = document.querySelector('.popup-filter');

        if (!popupFilter.classList.contains('popup-filter--close')) {
            closeFilter();
        }
    };

    filterButtonApply.addEventListener('click', filterFunction);
    filterButtonReset.addEventListener('click', function () {
        catalogSorting(apartamentsCatalog);
    });

    //сделать кнопку очистки введенных данных в поле цены как в ДНС


    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    //============== Кастомный селектор сортировки ==================================

    let customSelectClose = function () { // закрыть селектор сортировки
        customSelect.classList.remove('custom-select--open');
        customSelectList.classList.add('custom-select__list--hidden');
    }

    let onEscPress = function (evt) { // закрытие селектора сортировки нажатием ESC 
        if (evt.code == 'Escape') {
            customSelectClose();
        }
    }

    let selectEvent = function (evt) { // событие выбора нового селектора
        if (evt.target.classList.contains('custom-select__item')) {
            let currentTarget = evt.target.cloneNode(true);
            currentTarget.removeAttribute('tabindex');
            customSelectCurrent.removeChild(customSelectCurrent.querySelector('.custom-select__item'));
            customSelectCurrent.appendChild(currentTarget);

            //отфильтрованные элементы на странице
            let roomsOnPage = catalogApartamentsList.querySelectorAll('.catalog-apartaments__item');
            let roomsForSorting = [];
            roomsOnPage.forEach(function (item) {
                apartamentsCatalog.forEach(function (el) {
                    if (item.querySelector('.catalog-item__title').textContent == el.title) {
                        roomsForSorting.push(el);
                    }
                });
            });
            catalogSorting(roomsForSorting);
        }
    };

    let customSelectAction = function () {
        customSelect.classList.toggle('custom-select--open');
        customSelectList.classList.toggle('custom-select__list--hidden');
        customSelectList.addEventListener('click', selectEvent);
        customSelectList.addEventListener('keydown', function (evt) {
            if (evt.code == 'Enter') {
                selectEvent(evt);
            }
        });

        if (customSelect.classList.contains('custom-select--open')) {
            document.addEventListener('keydown', onEscPress);
            document.addEventListener('click', function (evt) {
                if (!evt.target.classList.contains('custom-select__item')) {
                    customSelectClose();
                }
            });
        } else {
            document.removeEventListener('keydown', onEscPress);
        }

    };

    customSelect.addEventListener('click', customSelectAction);
    customSelect.addEventListener('keydown', function (evt) {
        if (evt.code == 'Enter') {
            customSelectAction();
        }
    });


})();