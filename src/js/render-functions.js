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