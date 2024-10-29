(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}};e.d({},{bO:()=>U,eB:()=>N,UM:()=>T});var t={};e.r(t),e.d(t,{bO:()=>U,eB:()=>N,UM:()=>T});var n=document.getElementById("name"),r=document.getElementById("job"),o=document.querySelector(".profile__edit-btn-box"),c=document.querySelector(".profile__name"),a=document.querySelector(".profile__job"),i=document.querySelector(".profile__photo"),u=document.querySelector(".profile__photo-wrapper"),l=document.getElementById("pic-link"),s=document.getElementById("place-name"),d=document.querySelector(".popup_type_profile"),f=document.querySelector(".popup_type_card"),p=document.querySelector(".popup_type_photo"),m=document.querySelector(".popup_type_delete"),h=document.querySelector(".popup_type_avatar"),v=document.getElementById("card-template").content,y=document.querySelector(".popup__photo-text"),_=document.querySelector("#photo"),g=document.querySelector(".cards"),S=(document.querySelector(".popup__form"),document.querySelector(".popup__input"),document.querySelector(".popup__input_type_avatar"));console.log("Fetching data...");var E={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"bf321f60-bcd3-46d4-bcab-24d55df9bc76","Content-Type":"application/json"}},b=function(){return fetch("".concat(E.baseUrl,"/cards"),{headers:E.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))},k=function(){return fetch("".concat(E.baseUrl,"/users/me"),{headers:E.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))},q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"popup__btn_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function L(e){"Escape"===e.key&&x(document.querySelector(".popup_opened"))}function C(e){e.classList.add("popup_opened"),document.addEventListener("keydown",L)}function x(e,t){var n=Array.from(e.querySelectorAll(".popup__input")),r=Array.from(e.querySelectorAll(".popup__input-error"));e.classList.remove("popup_opened"),document.removeEventListener("keydown",L),n.forEach((function(e){e.classList.remove(q.inputErrorClass)})),r.forEach((function(e){e.classList.remove(q.errorClass)})),t&&e.addEventListener("transitionend",t,{once:!0})}function j(e){var n=e.dataset.id;C(m),m.addEventListener("submit",(function(){var r;(r=n,fetch("".concat(E.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:E.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))).then((function(){e.remove(),b().then((function(e){var r=e.filter((function(e){return e._id!==n}));g.innerHTML="",r.forEach((function(e){var n=P({name:e.name,link:e.link,id:e.id},j,A,t.handleImageClick);M(n);var r=n.querySelector("#delete-btn");k().then((function(t){t._id===e.owner._id?r.style.display="block":r.style.display="none"})).catch((function(e){console.error(e)}))}))})).catch((function(e){console.error("Error updating server data: ".concat(e))}))})).catch((function(e){console.error("Error deleting card: ".concat(e))})),x(m),k().then((function(e){var t=g.children;Array.from(t).forEach((function(t){var n=t.querySelector("#delete-btn"),r=t.dataset.id;b().then((function(t){var o=t.find((function(e){return e._id===r}));o&&e._id===o.owner._id?n.style.display="block":n.style.display="none"})).catch((function(e){console.error(e)}))}))})).catch((function(e){console.error(e)}))}))}function A(e,t,n){e.classList.toggle("card__heart_active");var r=e.parentNode.querySelector(".card__like-count");(function(e,t){var n="".concat(E.baseUrl,"/cards/likes/").concat(e);return fetch(n,{method:t?"DELETE":"PUT",headers:E.headers}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error updating like status: ".concat(e))}))})(t,n).then((function(e){var t=e.likes.length;r.textContent=t.toString()})).catch((function(e){console.log("Error updating like status: ".concat(e))}))}function P(e,t,n,r){var o=v.querySelector(".card").cloneNode(!0),c=o.querySelector("#delete-btn"),a=o.querySelector(".card__image"),i=o.querySelector(".card__text"),u=o.querySelector("#heart-like"),l=u.parentNode.querySelector(".card__like-count");return e.id&&(o.dataset.id=e.id),i.textContent=e.name,a.alt=e.name,a.src=e.link,b().then((function(t){var n=t.find((function(t){return t._id===e.id}));n&&(l.textContent=n.likes.length.toString(),k().then((function(e){var t=n.likes.some((function(t){return t._id===e._id}));u.classList.toggle("card__heart_active",t),e._id===n.owner._id?c.style.display="block":c.style.display="none"})).catch((function(e){console.error(e)})))})).catch((function(e){console.error(e)})),c.addEventListener("click",(function(){t(o)})),u.addEventListener("click",(function(){n(u,o.dataset.id,u.classList.contains("card__heart_active"))})),a.addEventListener("click",(function(){r(e.link,e.name)})),o}function M(e){g.prepend(e)}function B(e,t){_.src=e,_.alt=t,y.textContent=t,C(p)}b().then((function(e){e.forEach((function(e){M(P({name:e.name,link:e.link,id:e._id},j,A,B))}))})).catch((function(e){console.log("Error retrieving data from server: ".concat(e))})),k().then((function(e){console.log("Received user info from server: ".concat(e)),c.textContent=e.name,a.textContent=e.about,i.src=e.avatar})).catch((function(e){console.log("Error retrieving user info: ".concat(e))})),o.addEventListener("click",(function(){var e=c.textContent,t=a.textContent;n.value=e,r.value=t,w(d,q),C(d)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&x(e)}))})),document.querySelector(".profile__add-btn").addEventListener("click",(function(){w(f,q),C(f)})),document.querySelector('[name="profile-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=n.value,o=r.value,i=e.target.querySelector(".popup__btn");i.textContent="Сохранение...",function(e,t){return fetch("".concat(E.baseUrl,"/users/me"),{method:"PATCH",headers:E.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))}(t,o).then((function(e){console.log("User info updated: ".concat(e)),c.textContent=e.name,a.textContent=e.about})).catch((function(e){console.error("Error updating user info: ".concat(e))})).finally((function(){x(d,(function(){i.textContent="Сохранить"}))}))})),document.querySelector('[name="add-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=l.value,n=s.value;f.querySelector(".popup__btn").textContent="Создание...";var r={name:n,link:t};(function(e,t){return fetch("".concat(E.baseUrl,"/cards"),{method:"POST",headers:E.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e.likes=[],e})).catch((function(e){console.log("Error: ".concat(e))}))})(r.name,r.link).then((function(e){if(e){var t=P({name:e.name,link:e.link,id:e._id,likes:e.likes},j,A,B);M(t);var n=t.querySelector("#delete-btn");k().then((function(t){t._id===e.owner._id?n.style.display="block":n.style.display="none"})).catch((function(e){console.error(e)}))}else console.error("Error adding card: No data returned")})).catch((function(e){console.error("Error adding card: ".concat(e))})).finally((function(){x(f,(function(){f.querySelector(".popup__btn").textContent="Создать"}))})),e.target.reset()})),document.querySelector('[name="avatar-form"]').addEventListener("submit",(function(e){e.preventDefault();var t=S.value;i.src=t;var n,r=e.target.querySelector(".popup__btn");r.textContent="Сохранение...",(n=t,fetch("".concat(E.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:E.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log("Error: ".concat(e))}))).then((function(e){console.log("Avatar updated: ".concat(e)),i.src=e.avatar})).catch((function(e){console.error("Error updating avatar: ".concat(e)),i.src=previousAvatarSrc})).finally((function(){x(h,(function(){r.textContent="Сохранить"}))}))}));var T=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-input-error"));o.classList.add(r.errorClass),t.classList.add(r.inputErrorClass),o.textContent=n},U=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-input-error"));r.classList.remove(n.errorClass),t.classList.remove(n.inputErrorClass),r.textContent=""},O=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},w=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){U(e,n,t)})),O(n,r,t)},N=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);O(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){if(t.validity.valid)U(e,t,n);else if(t.validity.patternMismatch){var r=t.dataset.errorPatternMessage;T(e,t,r,n)}else if(t.validity.valueMissing){var o=t.dataset.errorMessage;T(e,t,o,n)}else if(t.validity.typeMismatch){var c=t.dataset.errorTypeMessage;T(e,t,c,n)}else if(t.validity.tooShort){var a=t.value.length,i=t.minLength,u=t.dataset.errorMinlengthMessage.replace("{entered}",a).replace("{minlength}",i);T(e,t,u,n)}else if(t.validity.tooLong){var l=t.value.length,s=t.maxLength,d=t.dataset.errorMaxlengthMessage.replace("{entered}",l).replace("{maxlength}",s);T(e,t,d,n)}else t.setCustomValidity("")}(e,o,t),O(n,r,t)}))}))};u.addEventListener("click",(function(){w(h,q),C(h)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),N(t,e)}))}(q)})();