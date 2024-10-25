(()=>{"use strict";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{bO:()=>A,eB:()=>j,UM:()=>x});var t=document.getElementById("name"),r=document.getElementById("job"),o=document.querySelector(".profile__edit-btn-box"),n=document.querySelector(".profile__name"),c=document.querySelector(".profile__job"),a=document.getElementById("pic-link"),i=document.getElementById("place-name"),l=document.querySelector(".popup_type_profile"),u=document.querySelector(".popup_type_card"),s=document.querySelector(".popup_type_photo"),d=(document.querySelector(".popup_type_delete"),document.querySelector(".popup_type_avatar")),p=document.getElementById("card-template").content,f=document.querySelector(".popup__photo-text"),m=document.querySelector("#photo"),v=document.querySelector(".cards"),y=(document.querySelector(".popup__form"),document.querySelector(".popup__input"),document.querySelector(".profile__photo-wrapper"));console.log("Fetching data...");var _={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"bf321f60-bcd3-46d4-bcab-24d55df9bc76","Content-Type":"application/json"}};function h(e){console.log("cardElement:",e);var t,r=e.dataset.id;console.log("Deleting card with ID ".concat(r)),(t=r,fetch("".concat(_.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:_.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))).then((function(){console.log("Card deleted successfully"),e.remove(),console.log("Card element removed from DOM"),getInitialCardsApi().then((function(e){console.log("Received updated cards data");var t=e.filter((function(e){return e._id!==r}));console.log("Updated cards data filtered"),renderCards(t),console.log("Cards rendered")})).catch((function(e){console.error("Error updating server data: ".concat(e))}))})).catch((function(e){console.error("Error deleting card: ".concat(e))}))}function g(e){e.classList.toggle("card__heart_active")}function E(e,t,r,o){console.log("item._id:",e._id);var n=p.querySelector(".card").cloneNode(!0),c=n.querySelector("#delete-btn"),a=n.querySelector(".card__image"),i=n.querySelector(".card__text"),l=n.querySelector("#heart-like");return e._id&&(n.dataset.id=e._id),i.textContent=e.name,a.alt=e.name,a.src=e.link,c.addEventListener("click",(function(){t(n)})),l.addEventListener("click",(function(){r(l)})),a.addEventListener("click",(function(){o(e.link,e.name)})),n}function S(e){v.prepend(e)}var q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"popup__btn_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function b(e){"Escape"===e.key&&C(document.querySelector(".popup_opened"))}function L(e){e.classList.add("popup_opened"),document.addEventListener("keydown",b)}function C(e){var t=Array.from(e.querySelectorAll(".popup__input")),r=Array.from(e.querySelectorAll(".popup__input-error"));e.classList.remove("popup_opened"),document.removeEventListener("keydown",b),t.forEach((function(e){e.classList.remove(q.inputErrorClass)})),r.forEach((function(e){e.classList.remove(q.errorClass)}))}function k(e,t){m.src=e,m.alt=t,f.textContent=t,L(s)}fetch("".concat(_.baseUrl,"/cards"),{headers:_.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return console.log(e),e})).catch((function(e){console.log("Error: ".concat(e))})).then((function(e){console.log("Received data from server: ".concat(e)),e.forEach((function(e){S(E({name:e.name,link:e.link},h,g,k))}))})).catch((function(e){console.log("Error retrieving data from server: ".concat(e))})),o.addEventListener("click",(function(){var e=n.textContent,o=c.textContent;t.value=e,r.value=o,M(l,q),L(l)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&C(e)}))})),document.querySelector(".profile__add-btn").addEventListener("click",(function(){M(u,q),L(u)})),document.querySelector('[name="profile-form"]').addEventListener("submit",(function(e){e.preventDefault(),n.textContent=t.value,c.textContent=r.value,C(l)})),document.querySelector('[name="add-form"]').addEventListener("submit",(function(e){e.preventDefault();var t,r,o=a.value,n={name:i.value,link:o};(t=n.name,r=n.link,fetch("".concat(_.baseUrl,"/cards"),{method:"POST",headers:_.headers,body:JSON.stringify({name:t,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))).then((function(e){console.log("Card added to server: ".concat(e)),S(E(n,h,g,k))})).catch((function(e){console.error("Error adding card: ".concat(e))})),e.target.reset(),C(u)}));var x=function(e,t,r,o){var n=e.querySelector(".".concat(t.id,"-input-error"));n.classList.add(o.errorClass),t.classList.add(o.inputErrorClass),n.textContent=r},A=function(e,t,r){var o=e.querySelector(".".concat(t.id,"-input-error"));o.classList.remove(r.errorClass),t.classList.remove(r.inputErrorClass),o.textContent=""},B=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.disabled=!1):(t.classList.add(r.inactiveButtonClass),t.disabled=!0)},M=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((function(r){A(e,r,t)})),B(r,o,t)},j=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);B(r,o,t),r.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,r){if(t.validity.valid)A(e,t,r);else if(t.validity.patternMismatch){var o=t.dataset.errorPatternMessage;x(e,t,o,r)}else if(t.validity.valueMissing){var n=t.dataset.errorMessage;x(e,t,n,r)}else if(t.validity.typeMismatch){var c=t.dataset.errorTypeMessage;x(e,t,c,r)}else if(t.validity.tooShort){var a=t.value.length,i=t.minLength,l=t.dataset.errorMinlengthMessage.replace("{entered}",a).replace("{minlength}",i);x(e,t,l,r)}else if(t.validity.tooLong){var u=t.value.length,s=t.maxLength,d=t.dataset.errorMaxlengthMessage.replace("{entered}",u).replace("{maxlength}",s);x(e,t,d,r)}else t.setCustomValidity("")}(e,n,t),B(r,o,t)}))}))};y.addEventListener("click",(function(){M(d,q),L(d)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),j(t,e)}))}(q)})();