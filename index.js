import{a as g,S as L,i as p}from"./assets/vendor-mdVVRe9K.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();g.defaults.baseURL="https://pixabay.com";const w="46140865-1cf24fb63bb06dafc67be25f6";async function S(o,s){const l=new URLSearchParams({key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15});return await g.get(`/api/?${l}`)}const h=new L(".gallery-container a",{captionsData:"alt",captionDelay:250}),i=document.querySelector(".gallery-container");function x(o,s){const l=o.map(e=>`<li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" width=""/>
                <div class="small-container">
                <div class="text-div"><p class="image-info-title">Likes</p><span class="image-info-value">${e.likes}</span></div>
                <div class="text-div"><p class="image-info-title">Views</p><span class="image-info-value">${e.views}</span></div>
                <div class="text-div"><p class="image-info-title">Comments</p><span class="image-info-value">${e.comments}</span></div>
                <div class="text-div"><p class="image-info-title">Downloads</p><span class="image-info-value">${e.downloads}</span></div>
                </div>
            </a>
        </li>`).join("");s==!1?i.insertAdjacentHTML("beforeend",l):i.innerHTML=l,h.refresh()}function q(){i.innerHTML="",h.refresh()}function P(o){if(o==1)return;let s=15*(o-1)+2,l=i.querySelectorAll("li");if(console.log(l.length),l.length<s)return;let e=l[s].getBoundingClientRect();console.log(e),window.scrollBy({top:e.top,left:0,behavior:"smooth"})}const y=document.querySelector("form"),d=document.querySelector(".loader-container"),a=document.querySelector(".btn-load-more"),u=document.querySelector(".end-of-gallery");let v="",r=0,m=0,f=0;window.addEventListener("load",o=>{a.style.display="none",u.style.display="none",console.log("page is fully loaded")});y.addEventListener("submit",o=>{o.preventDefault();const s=y.elements.search.value.trim();s!==""&&(v=s,r=1,b(s,r,!0))});a.addEventListener("click",o=>{o.preventDefault(),r+=1,b(v,r,!1)});async function b(o,s,l){d.style.display="flex",a.style.display="none",l==!0&&(q(),f=0);try{const e=await S(o,s);console.log(e);const t=e.data.hits;m=e.data.totalHits,f+=t.length,f>=m?(a.style.display="none",u.style.display="flex"):(a.style.display="block",u.style.display="none"),t.length===0?p.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(x(t,l),P(r)),d.style.display="none"}catch(e){console.log(e),p.info({title:"Error",message:"Oops. Something went wrong."}),d.style.display="none"}}
//# sourceMappingURL=index.js.map
