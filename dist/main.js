(()=>{"use strict";var e={34:(e,t,n)=>{e.exports=n.p+"958ca69033b68d70e528.jpg"},267:(e,t,n)=>{e.exports=n.p+"3e09cbb2d8b5fb0e59f7.jpg"},476:(e,t,n)=>{e.exports=n.p+"ead72fa1161cbef271c6.jpg"},731:(e,t,n)=>{e.exports=n.p+"997aa7bea2a6e24e6100.jpg"},601:(e,t,n)=>{e.exports=n.p+"f9d32bd5bdb38dc22d78.jpg"},990:(e,t,n)=>{e.exports=n.p+"67dad5e7626b2651f2b8.jpg"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}function o(e){"Escape"===e.key&&c(document.querySelector(".popup_opened"))}function r(e){e.classList.add("popup_opened"),document.addEventListener("keydown",o)}function c(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",o)}function u(e){e.remove()}function d(e,t){var n=k.querySelector(".card").cloneNode(!0),o=n.querySelector("#delete-btn"),c=n.querySelector(".card__image"),u=n.querySelector(".card__text"),d=n.querySelector("#heart-like");return u.textContent=e.name,c.alt=e.name,c.src=e.link,o.addEventListener("click",(function(){return t(n)})),d.addEventListener("click",(function(){d.classList.toggle("card__heart_active")})),c.addEventListener("click",(function(){q.src=e.link,q.alt=e.name,E.textContent=e.name,r(b)})),n}function p(e){x.prepend(e)}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.d({},{Tp:()=>k,vY:()=>x,jW:()=>q,qI:()=>E,t9:()=>b});var a=[{name:"Йорк",link:n(601)},{name:"Лидс",link:n(34)},{name:"Тур",link:n(990)},{name:"Экс-ан-Прованс",link:n(267)},{name:"Нижний Новгород",link:n(731)},{name:"Белград",link:n(476)}],l=document.getElementById("name"),i=document.getElementById("job"),m=document.querySelector(".profile__name"),s=document.querySelector(".profile__job"),f=document.getElementById("pic-link"),v=document.getElementById("place-name"),y=document.querySelector(".popup_type_profile"),_=document.querySelector(".popup_type_card"),b=document.querySelector(".popup_type_photo"),k=document.getElementById("card-template").content,E=document.querySelector(".popup__photo-text"),q=document.querySelector("#photo"),x=document.querySelector(".cards");a.forEach((function(e){return p(d(e,u))})),document.querySelector(".profile__edit-btn-box").addEventListener("click",(function(){var e=m.textContent,t=s.textContent;l.value=e,i.value=t,r(y)})),document.querySelector(".popup__close").addEventListener("click",(function(){c(y)})),document.querySelector(".profile__add-btn").addEventListener("click",(function(){r(_)})),document.getElementById("popup-close").addEventListener("click",(function(){c(_)})),document.getElementById("popup-photo-close").addEventListener("click",(function(){c(b)})),document.querySelector('[name="profile-form"]').addEventListener("submit",(function(e){e.preventDefault(),m.textContent=l.value,s.textContent=i.value,c(y)})),document.querySelector('[name="add-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=f.value;p(d({name:v.value,link:t},u)),f.value="",v.value="",c(_)}))})();