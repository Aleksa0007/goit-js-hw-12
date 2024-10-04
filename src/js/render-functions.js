import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery-container a', {
    captionsData: 'alt',
    captionDelay: 250,
});

const gallery = document.querySelector(".gallery-container");

export function refreshUI(images, reset) {

    const htmlMarkup = images
    .map((image) => 
        `<li class="gallery-item">
            <a class="gallery-link" href="${image["largeImageURL"]}">
                <img class="gallery-image" src="${image["webformatURL"]}" alt="${image["tags"]}" width=""/>
                <div class="small-container">
                <div class="text-div"><p class="image-info-title">Likes</p><span class="image-info-value">${image["likes"]}</span></div>
                <div class="text-div"><p class="image-info-title">Views</p><span class="image-info-value">${image["views"]}</span></div>
                <div class="text-div"><p class="image-info-title">Comments</p><span class="image-info-value">${image["comments"]}</span></div>
                <div class="text-div"><p class="image-info-title">Downloads</p><span class="image-info-value">${image["downloads"]}</span></div>
                </div>
            </a>
        </li>`)
    .join("");
    

    if(reset == false) {
        gallery.insertAdjacentHTML("beforeend", htmlMarkup);
    } else {
        gallery.innerHTML = htmlMarkup;
    }

    lightbox.refresh();
}

export function clearUI() {
    gallery.innerHTML = "";

    lightbox.refresh();
}

export function scrollToPage(page) {
    if(page == 1) {
        return;
    }

    let i = 15 * (page - 1) + 6;
    let elements = gallery.querySelectorAll('li');

    console.log(elements.length);

    if(elements.length < i) {
       return;
    }
    
    let elementRect = elements[i].getBoundingClientRect();

    console.log(elementRect);

    window.scrollBy({
        top: elementRect.top,
        left: 0,
        behavior: "smooth",
    });
}




// 1. Делаем addEventListener по клику
// 2. При каждом нажатии кнопки приходит 15 изображений на экран
//    - Значение в инпуте форма запоминает
//    - Начальное значение параметра page=1. Следующее +=1
// 3. После - появляется кнопка внизу экрана с названием Load more. До этого 
//  кнопка скрыта и не появляется, пока форма не загрузится до конца.
// 5. Под Load more появляется индикатор загрузки.
// 6. При изменении запроса - page снова =1


// 1. Бекэнд возвращает переменную totalHits с количеством изображений.
// 2. Когда коллекция закончилась, прячется кнопка Load more и появляется Alert
//  с текстом "We're sorry, but you've reached the end of search results."


//  -Прокрутка страницы-
// 1. Плавная прокрутка после загрузки страницы.
//   - Для этого получаем высоту каждой карточки в функции  getBoundingClientRect
//   - Используем метод  window.scrollBy  на две высоты карты галлереи.