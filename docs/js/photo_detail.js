"use strict";

import { photosAPI } from "/js/api/photos.js";
import { commentsAPI } from "/js/api/comments.js";
import { ratesAPI } from "/js/api/rates.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { comentariosValidator } from "/js/validators/comments.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
function main() {
    let photoContainer = document.querySelector("#container");
    photosAPI.getById(photoId)
        .then(photos => {
            let photoDetails = photoRenderer.asDetails(photos[0]);
            photoContainer.appendChild(photoDetails);
            let deleteBtn = photoDetails.querySelector("#button-delete");
            deleteBtn.onclick = handleDelete;
            let sendComment= photoDetails.querySelector("#send-comment");
            if(sessionManager.getLoggedId() == null){
                sendComment.style.display="none";
            }else{
                
                sendComment.onsubmit=handleSubmitComment;
            }

            let rate1 = photoDetails.querySelector("#star-1-"+photoId);
            let rate2 = photoDetails.querySelector("#star-2-"+photoId);
            let rate3 = photoDetails.querySelector("#star-3-"+photoId);
            let rate4 = photoDetails.querySelector("#star-4-"+photoId);
            let rate5 = photoDetails.querySelector("#star-5-"+photoId);
            rate1.onclick= function(){sendRate(photos[0], 1);};
            rate2.onclick= function(){sendRate(photos[0], 2);};
            rate3.onclick= function(){sendRate(photos[0], 3);};
            rate4.onclick= function(){sendRate(photos[0], 4);};
            rate5.onclick= function(){sendRate(photos[0], 5);};

        })
        .catch(error => messageRenderer.showErrorMessage(error));

}
function sendRate(photo, rate){
    

    ratesAPI.getById(sessionManager.getLoggedId(), photoId)
    .then(rates =>{
        console.log("Hace el error");
        let errorsDiv = document.getElementById("errors");
        let error = "Los usuarios pueden valorar una foto solo una vez.";
        errorsDiv.innerHTML = "";
        messageRenderer.showErrorMessage(error);
    }).catch(errores =>{

        let formData = new FormData();
        formData.append("userId", photo.userId);
        formData.append("date", photo.date);
        formData.append("rate", (photo.rate+rate));
        formData.append("numRaters", (photo.numRaters+1));
        formData.append("title", photo.title);
        formData.append("description", photo.description);
        formData.append("url", photo.url);
        formData.append("visibility", photo.visibility);
        ratesAPI.create(sessionManager.getLoggedId(),photo.photoId)
        .then(data => {
            photosAPI.update(photo.photoId, formData)
            .then(data => window.location.href = "photo_detail.html?photoId="+photoId)
            .catch(error => messageRenderer.showErrorAsAlert(error));
        })
        .catch(error => messageRenderer.showErrorMessage(error));
        
    })

    
}
function handleDelete(event) {
    
    
    commentsAPI.getByPhotoId(photoId)
        .then(data =>{
            let errorsDiv = document.getElementById("errors");
            let error="Áttica no permite eliminar o poner la publicación en privado si hay comentarios en la imagen.";
            errorsDiv.innerHTML = "";
            messageRenderer.showErrorMessage(error);
        })
        .catch(errors =>{
            let answer = confirm("¿Realmente quieres borrar esta imagen?");
            if (answer) {
                photosAPI.delete(photoId)
                    .then(data => window.location.href = "index.html ")
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
        });
    
    
    
}

function handleSubmitComment(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);
    let errors = comentariosValidator.validateComentario(formData);

    if (errors.length == 0) {
        commentsAPI.create(formData)
            .then(data => window.location.href = "photo_detail.html?photoId="+photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
    }else{
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
}


document.addEventListener("DOMContentLoaded", main);