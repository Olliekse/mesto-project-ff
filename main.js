(()=>{"use strict";var e={34:(e,t,n)=>{e.exports=n.p+"958ca69033b68d70e528.jpg"},267:(e,t,n)=>{e.exports=n.p+"3e09cbb2d8b5fb0e59f7.jpg"},476:(e,t,n)=>{e.exports=n.p+"ead72fa1161cbef271c6.jpg"},731:(e,t,n)=>{e.exports=n.p+"997aa7bea2a6e24e6100.jpg"},601:(e,t,n)=>{e.exports=n.p+"f9d32bd5bdb38dc22d78.jpg"},990:(e,t,n)=>{e.exports=n.p+"67dad5e7626b2651f2b8.jpg"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}n.p="";var o=document.getElementById("name"),r=document.getElementById("job"),c=document.querySelector(".profile__edit-btn-box"),u=document.querySelector(".profile__name"),a=document.querySelector(".profile__job"),d=document.getElementById("pic-link"),p=document.getElementById("place-name"),l=document.querySelector(".popup_type_profile"),i=document.querySelector(".popup_type_card"),m=document.querySelector(".popup_type_photo"),s=document.getElementById("card-template").content,f=document.querySelector(".popup__photo-text"),v=document.querySelector("#photo"),y=document.querySelector(".cards");function _(e){e.remove()}function b(e){e.classList.toggle("card__heart_active")}function k(e,t,n,o){var r=s.querySelector(".card").cloneNode(!0),c=r.querySelector("#delete-btn"),u=r.querySelector(".card__image"),a=r.querySelector(".card__text"),d=r.querySelector("#heart-like");return a.textContent=e.name,u.alt=e.name,u.src=e.link,c.addEventListener("click",(function(){return t(r)})),d.addEventListener("click",(function(){n(d)})),u.addEventListener("click",(function(){o(e.link,e.name)})),r}function x(e){y.prepend(e)}function g(e){"Escape"===e.key&&S(document.querySelector(".popup_opened"))}function q(e){e.classList.add("popup_opened"),document.addEventListener("keydown",g)}function S(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",g)}function E(e,t){v.src=e,v.alt=t,f.textContent=t,q(m)}[{name:"Йорк",link:n(601)},{name:"Лидс",link:n(34)},{name:"Тур",link:n(990)},{name:"Экс-ан-Прованс",link:n(267)},{name:"Нижний Новгород",link:n(731)},{name:"Белград",link:n(476)}].forEach((function(e){return x(k(e,_,b,E))})),c.addEventListener("click",(function(){var e=u.textContent,t=a.textContent;o.value=e,r.value=t,q(l)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&S(e)}))})),document.querySelector('[name="profile-form"]').addEventListener("submit",(function(e){e.preventDefault(),u.textContent=o.value,a.textContent=r.value,S(l)})),document.querySelector('[name="add-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=d.value;x(k({name:p.value,link:t},_,b,E)),e.target.reset(),S(i)}))})();