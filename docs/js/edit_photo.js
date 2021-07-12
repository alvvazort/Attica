"use strict";
import { photosAPI } from "/js/api/photos.js";
import { commentsAPI } from "/js/api/comments.js";
import { categoriesAPI } from "/js/api/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { photoValidator } from "/js/validators/photos.js"


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;


function main() {
    if (photoId !== null) {
        loadCurrentPhoto();
    }

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;
}

function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    let categoryInput = document.getElementById("input-category");
    pageTitle.textContent = "Edita la foto";
    photosAPI.getById(photoId)
        .then(photos => { // Cogemos una foto por la id de la url y metemos los datos en los inputs, para ahora modificarlos
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;

            categoriesAPI.getbyCategoryId(currentPhoto.categoryId) //Obtenemos el nombre de la categoría para cargarlo en la página
                .then(categories => { //Cogemos el nombre
                    categoryInput.value = categories[0].category;
                });
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let categoryId;
    let errors = photoValidator.validatePhoto(formData);
    formData.append("userId", sessionManager.getLoggedId());
    if (currentPhoto === null) { // Creating a new photo
        // Add the current user 's ID
        let category = formData.get("categoryId"); //Obtenemos el nombre de la categoría
        if (errors.length === 0) {
            photosAPI.getAllPrivatebyUserId(sessionManager.getLoggedId())
                .then(photos => {
                    if (photos.length >= 2) {
                        let errorsDiv = document.getElementById("errors");
                        let error = "Un usuario no puede tener más de 2 fotos."
                        errorsDiv.innerHTML = "";
                        messageRenderer.showErrorMessage(error);
                    } else {
                        if(category!=''){
                            categoriesAPI.getbyCategory(category)
                                .then(categories => { //cogemos la Id
                                    categoryId = categories[0].categoryId;
                                    console.log("llega a hacer el get de categoria ya creada");
                                    formData.set("categoryId", categoryId);

                                    photosAPI.create(formData)
                                        .then(data => window.location.href = "index.html")
                                        .catch(error => messageRenderer.showErrorMessage(error));
                                })
                                .catch(error => {
                                    let formData2 = new FormData();
                                    formData2.append("category", category);
                                    categoriesAPI.create(formData2)
                                        .then(
                                            categoriesAPI.getbyCategory(category)
                                                .then(categories => { //cogemos la Id
                                                    categoryId = categories[0].categoryId;
                                                    formData.set("categoryId", categoryId);

                                                    photosAPI.create(formData)
                                                        .then(data => window.location.href = "index.html")
                                                        .catch(error => messageRenderer.showErrorMessage(error));
                                                })
                                        );
                                });
                        }else{
                            formData.set("categoryId", 9);
                            photosAPI.create(formData)
                                        .then(data => window.location.href = "index.html")
                                        .catch(error => messageRenderer.showErrorMessage(error));
                        }
                            
                    }
                }).catch(error => {
                    if(category!=''){
                        categoriesAPI.getbyCategory(category)
                        .then(categories => { //cogemos la Id
                            categoryId = categories[0].categoryId;
                            console.log("llega a hacer el get de categoria ya creada");
                            formData.set("categoryId", categoryId);

                            photosAPI.create(formData)
                                .then(data => window.location.href = "index.html")
                                .catch(error => messageRenderer.showErrorMessage(error));
                        })
                        .catch(error => {
                            let formData2 = new FormData();
                            formData2.append("category", category);
                            categoriesAPI.create(formData2)
                                .then(
                                    categoriesAPI.getbyCategory(category)
                                        .then(categories => { //cogemos la Id
                                            categoryId = categories[0].categoryId;
                                            formData.set("categoryId", categoryId);

                                            photosAPI.create(formData)
                                                .then(data => window.location.href = "index.html")
                                                .catch(error => messageRenderer.showErrorMessage(error));
                                        })
                                );
                        }

                        );
                    }else{
                        formData.set("categoryId", 9);
                            photosAPI.create(formData)
                                        .then(data => window.location.href = "index.html")
                                        .catch(error => messageRenderer.showErrorMessage(error));
                    }
                        
                });

        } else {
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
            for (let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }



    } else { // Updating an existing photo
        formData.append("userId", currentPhoto.userId);
        formData.append("date", currentPhoto.date);
        formData.append("rate", currentPhoto.rate);
        formData.append("numRaters", currentPhoto.numRaters);
        let errors = photoValidator.validatePhoto(formData);
        if (formData.get("visibility") == 'Private') {
            commentsAPI.getByPhotoId(photoId)
                .then(data => {
                    let errorsDiv = document.getElementById("errors");
                    let error = "Áttica no permite eliminar o poner la publicación en privado si hay comentarios en la imagen.";
                    errorsDiv.innerHTML = "";
                    messageRenderer.showErrorMessage(error);
                })
                .catch(errores => {
                    if (errors.length === 0) {
                        let category = formData.get("categoryId"); //Obtenemos el nombre de la categoría
                        if(category!=''){
                            categoriesAPI.getbyCategory(category)
                                .then(categories => { //cogemos la Id
                                    categoryId = categories[0].categoryId;
                                    formData.set("categoryId", categoryId);

                                    photosAPI.update(photoId, formData)
                                        .then(data => window.location.href = "index.html")
                                        .catch(error => messageRenderer.showErrorMessage(error));
                                })
                                .catch(error => {
                                    let formData2 = new FormData();
                                    formData2.append("category", category);
                                    categoriesAPI.create(formData2)
                                        .then(
                                            categoriesAPI.getbyCategory(category)
                                                .then(categories => { //cogemos la Id
                                                    categoryId = categories[0].categoryId;
                                                    formData.set("categoryId", categoryId);
                                                    photosAPI.update(photoId, formData)
                                                        .then(data => window.location.href = "index.html")
                                                        .catch(error => messageRenderer.showErrorMessage(error));
                                                })
                                        )
                                }

                                );
                        }else{
                            formData.set("categoryId", 9);
                            photosAPI.update(photoId, formData)
                                                        .then(data => window.location.href = "index.html")
                                                        .catch(error => messageRenderer.showErrorMessage(error));
                        }
                            
                    } else {

                        let errorsDiv = document.getElementById("errors");
                        errorsDiv.innerHTML = "";
                        for (let error of errors) {
                            messageRenderer.showErrorMessage(error);
                        }

                    }
                });
        } else {
            if (errors.length === 0) {
                let category = formData.get("categoryId"); //Obtenemos el nombre de la categoría
                if(category!=''){
                    categoriesAPI.getbyCategory(category)
                    .then(categories => { //cogemos la Id
                        categoryId = categories[0].categoryId;
                        formData.set("categoryId", categoryId);

                        photosAPI.update(photoId, formData)
                            .then(data => window.location.href = "index.html")
                            .catch(error => messageRenderer.showErrorMessage(error));
                    })
                    .catch(error => {
                        let formData2 = new FormData();
                        formData2.append("category", category);
                        categoriesAPI.create(formData2)
                            .then(
                                categoriesAPI.getbyCategory(category)
                                    .then(categories => { //cogemos la Id
                                        categoryId = categories[0].categoryId;
                                        formData.set("categoryId", categoryId);
                                        photosAPI.update(photoId, formData)
                                            .then(data => window.location.href = "index.html")
                                            .catch(error => messageRenderer.showErrorMessage(error));
                                    })
                            )
                        });
                }else{
                    formData.set("categoryId", 9);
                    photosAPI.update(photoId, formData)
                        .then(data => window.location.href = "index.html")
                        .catch(error => messageRenderer.showErrorMessage(error));
                }
                
            } else {

                let errorsDiv = document.getElementById("errors");
                errorsDiv.innerHTML = "";
                for (let error of errors) {
                    messageRenderer.showErrorMessage(error);
                }

            }
        }


    }
}




document.addEventListener("DOMContentLoaded", main);