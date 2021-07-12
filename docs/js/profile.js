"use strict";
import { photosAPI } from "/js/api/photos.js";
import { usersAPI } from "/js/api/users.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { userRenderer } from "/js/renderers/user.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main() {

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    let galleryContainer = document.querySelector("div.container");
    if (sessionManager.getLoggedId() != userId) {
        photosAPI.getAllReversebyUserId(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        });
    }else{
        photosAPI.getAllPrivatebyUserId(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        });
    }
    
    let wrapper= document.querySelector("#page-content-wrapper");
    usersAPI.getById(userId)
        .then(user => {
            let sideprofile = userRenderer.userProfile(user[0]);
            wrapper.appendChild(sideprofile);
        })
}

function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}


document.addEventListener("DOMContentLoaded", main);