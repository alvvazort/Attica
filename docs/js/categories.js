"use strict";
import { categoriesAPI } from "/js/api/categories.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesRenderer } from "/js/renderers/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { categoryValidator } from "/js/validators/categories.js";


let urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get("category");

function main() {

    let galleryContainer = document.querySelector("#page-content-wrapper");
    categoriesAPI.getAll()
        .then(categories => {
            let gallery = categoriesRenderer.categoriesGallery(categories);            
            galleryContainer.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let createButton= document.querySelector("#Create-category");
    let formCategory= document.querySelector("#form-category");
    let inputCategory = document.querySelector("#input-category");
    let crear=document.querySelector("#crear");

    crear.style.display="none";
    inputCategory.style.display="none";

    createButton.onclick= function(event){
        if(crear.style.display == "none"){
            crear.style.display="block";
            inputCategory.style.display="block";
        }
    }
    
    formCategory.onsubmit=handleSubmit;


    if(category !== null){
        let box = document.getElementById("box-create-category");
        let text = document.getElementById("categories-text");
        box.style.display="none";
        text.style.display="none";

        
        categoriesAPI.getbyCategory(category)
        .then(categories =>{ //Cogemos la Id
            let categoryId;
            categoryId= categories[0].categoryId;

            let container= document.getElementById("container");
            photosAPI.getByCategoryId(categoryId)
            .then(photos => { // Cogemos fotos por categoría
                let gallery = galleryRenderer.asCardGallery(photos);
                container.appendChild(gallery);
            });
        });
    }
    // Buscador
    let formSearch= document.querySelector("#form-search");
    formSearch.onsubmit=handleSearch;
}

function handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = categoryValidator.validateCategory(formData);
    if (errors.length === 0) {
        categoriesAPI.getbyCategory(formData.get("category"))
        .then(categories => {
            let errorsDiv = document.getElementById("errors");
            console.log("Llega aqui");
            errorsDiv.innerHTML = "";
            
            let error= "Lo sentimos, esa categoría ya se encuentra en Attica."
            messageRenderer.showErrorMessage(error);
        }).catch(errors => sendSubmit(formData));
        
    }else{
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    
}

function sendSubmit(formData) {
    categoriesAPI.create(formData)
    .then(data => window.location.href = "categories.html")
    .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSearch(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    
    window.location.href = "categories.html?category="+formData.get("search");
}

document.addEventListener("DOMContentLoaded", main);