"use strict";
import { sessionManager } from "/js/utils/session.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";

let loggedId=sessionManager.getLoggedId();

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
    let boton = document.querySelector("#id-boton-log");
    boton.onclick= function(){
        if(sessionManager.isLogged()){
            console.log("si");
        }else{
            console.log("no");
        }
    }
    if(loggedId == null){
        photosAPI.getAll()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }else{
        photosAPI.getAllReverse(loggedId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }
    
}

function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}


document.addEventListener("DOMContentLoaded", main);