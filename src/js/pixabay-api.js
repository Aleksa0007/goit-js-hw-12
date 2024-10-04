import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

const apiKey = "46140865-1cf24fb63bb06dafc67be25f6";

export async function searchImages(searchString, page) {

    const searchParams = new URLSearchParams({
        key : apiKey,
        q : searchString,
        image_type : "photo",
        orientation : "horizontal",
        safesearch : true,
        page: page,
        per_page: 15,
    });

    return await axios.get(`/api/?${searchParams}`);
}