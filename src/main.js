import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { searchImages } from "./js/pixabay-api.js";

import { refreshUI, clearUI, scrollToPage } from "./js/render-functions.js";

const form = document.querySelector(`form`);
const loader = document.querySelector(`.loader-container`);
const btnLoadMore = document.querySelector(`.btn-load-more`);
const endOfGallery = document.querySelector(`.end-of-gallery`);
let searchString = "";
let currentPage = 0;
let totalHits = 0;
let loadedItems = 0;

window.addEventListener("load", (event) => {
    
    btnLoadMore.style.display = `none`;
    endOfGallery.style.display = `none`;

    console.log("page is fully loaded");
});

form.addEventListener("submit", event => {
    event.preventDefault();
    
    const searchValue = form.elements.search.value.trim();
    if(searchValue === ""){
        return 
    }

    searchString = searchValue;
    currentPage = 1;

    loadImages(searchValue, currentPage, true);

})

btnLoadMore.addEventListener("click", event => {
    event.preventDefault();
    console.log(btnLoadMore);

    currentPage += 1;

    loadImages(searchString, currentPage, false);
})

function loadImages(searchString, page, reset) {

    loader.style.display = 'flex';
    btnLoadMore.style.display = `none`;

    if(reset == true){
        clearUI();
        loadedItems = 0;
    }

    searchImages(searchString, page)

    .then((jsonImages) => {

        const images = jsonImages["data"]["hits"];
        totalHits = jsonImages["data"]["totalHits"];
        loadedItems += images.length;

        console.log(jsonImages);

        if(loadedItems >= totalHits) {
            btnLoadMore.style.display = `none`;
            endOfGallery.style.display = `flex`;
        } else {
            btnLoadMore.style.display = `block`;
            endOfGallery.style.display = `none`;
        }

        if(images.length === 0) {
            iziToast.info({
                title: "Info",
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
        } else {
            refreshUI(images, reset);
            scrollToPage(currentPage);
        }
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loader.style.display = `none`;
    })

}