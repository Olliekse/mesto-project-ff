(()=>{"use strict";var e={34:(e,t,r)=>{e.exports=r.p+"958ca69033b68d70e528.jpg"},267:(e,t,r)=>{e.exports=r.p+"3e09cbb2d8b5fb0e59f7.jpg"},476:(e,t,r)=>{e.exports=r.p+"ead72fa1161cbef271c6.jpg"},731:(e,t,r)=>{e.exports=r.p+"997aa7bea2a6e24e6100.jpg"},601:(e,t,r)=>{e.exports=r.p+"f9d32bd5bdb38dc22d78.jpg"},990:(e,t,r)=>{e.exports=r.p+"67dad5e7626b2651f2b8.jpg"}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.p="",r.d({},{bO:()=>A,eB:()=>I,UM:()=>B});var o=document.getElementById("name"),n=document.getElementById("job"),c=document.querySelector(".profile__edit-btn-box"),a=document.querySelector(".profile__name"),u=document.querySelector(".profile__job"),i=document.getElementById("pic-link"),l=document.getElementById("place-name"),p=document.querySelector(".popup_type_profile"),s=document.querySelector(".popup_type_card"),d=document.querySelector(".popup_type_photo"),f=(document.querySelector(".popup_type_delete"),document.querySelector(".popup_type_avatar")),m=document.getElementById("card-template").content,v=document.querySelector(".popup__photo-text"),y=document.querySelector("#photo"),_=document.querySelector(".cards"),S=(document.querySelector(".popup__form"),document.querySelector(".popup__input"),document.querySelector(".profile__photo-wrapper"));function g(e){e.remove()}function b(e){e.classList.toggle("card__heart_active")}function h(e,t,r,o){var n=m.querySelector(".card").cloneNode(!0),c=n.querySelector("#delete-btn"),a=n.querySelector(".card__image"),u=n.querySelector(".card__text"),i=n.querySelector("#heart-like");return u.textContent=e.name,a.alt=e.name,a.src=e.link,c.addEventListener("click",(function(){return t(n)})),i.addEventListener("click",(function(){r(i)})),a.addEventListener("click",(function(){o(e.link,e.name)})),n}function q(e){_.prepend(e)}var E={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"popup__btn_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function L(e){"Escape"===e.key&&C(document.querySelector(".popup_opened"))}function x(e){e.classList.add("popup_opened"),document.addEventListener("keydown",L)}function C(e){var t=Array.from(e.querySelectorAll(".popup__input")),r=Array.from(e.querySelectorAll(".popup__input-error"));e.classList.remove("popup_opened"),document.removeEventListener("keydown",L),t.forEach((function(e){e.classList.remove(E.inputErrorClass)})),r.forEach((function(e){e.classList.remove(E.errorClass)}))}r(601),r(34),r(990),r(267),r(731),r(476),console.log("Fetching data...");var k={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"bf321f60-bcd3-46d4-bcab-24d55df9bc76","Content-Type":"application/json"}};function j(e,t){y.src=e,y.alt=t,v.textContent=t,x(d)}fetch("".concat(k.baseUrl,"/cards"),{headers:k.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))})).then((function(e){console.log("Received data from server: ".concat(e)),e.forEach((function(e){q(h({name:e.name,link:e.link},g,b,j))}))})).catch((function(e){console.log("Error retrieving data from server: ".concat(e))})),c.addEventListener("click",(function(){var e=a.textContent,t=u.textContent;o.value=e,n.value=t,w(p,E),x(p)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&C(e)}))})),document.querySelector(".profile__add-btn").addEventListener("click",(function(){w(s,E),x(s)})),document.querySelector('[name="profile-form"]').addEventListener("submit",(function(e){e.preventDefault(),a.textContent=o.value,u.textContent=n.value,C(p)})),document.querySelector('[name="add-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=i.value;q(h({name:l.value,link:t},g,b,j)),e.target.reset(),C(s)}));var B=function(e,t,r,o){var n=e.querySelector(".".concat(t.id,"-input-error"));n.classList.add(o.errorClass),t.classList.add(o.inputErrorClass),n.textContent=r},A=function(e,t,r){var o=e.querySelector(".".concat(t.id,"-input-error"));o.classList.remove(r.errorClass),t.classList.remove(r.inputErrorClass),o.textContent=""},M=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.disabled=!1):(t.classList.add(r.inactiveButtonClass),t.disabled=!0)},w=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((function(r){A(e,r,t)})),M(r,o,t)},I=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);M(r,o,t),r.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,r){if(t.validity.valid)A(e,t,r);else if(t.validity.patternMismatch){var o=t.dataset.errorPatternMessage;B(e,t,o,r)}else if(t.validity.valueMissing){var n=t.dataset.errorMessage;B(e,t,n,r)}else if(t.validity.typeMismatch){var c=t.dataset.errorTypeMessage;B(e,t,c,r)}else if(t.validity.tooShort){var a=t.value.length,u=t.minLength,i=t.dataset.errorMinlengthMessage.replace("{entered}",a).replace("{minlength}",u);B(e,t,i,r)}else if(t.validity.tooLong){var l=t.value.length,p=t.maxLength,s=t.dataset.errorMaxlengthMessage.replace("{entered}",l).replace("{maxlength}",p);B(e,t,s,r)}else t.setCustomValidity("")}(e,n,t),M(r,o,t)}))}))};S.addEventListener("click",(function(){w(f,E),x(f)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),I(t,e)}))}(E)})();