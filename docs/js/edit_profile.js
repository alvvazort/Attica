"use strict";
import { usersAPI } from "/js/api/users.js";
import { userValidator } from "/js/validators/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";

let userId = sessionManager.getLoggedId();
let user = sessionManager.getLoggedUser();


function main() {

    if (userId !== null) {
        loadCurrentUser();
    } else{ //Si no estas autenticado, se te redirige a crearte la cuenta
        window.location.href = "register.html"
    }

    let editForm = document.getElementById("edit-profile-form");
    editForm.onsubmit = handleSubmitPhoto;
}

function loadCurrentUser() {
    let avatarUrl = document.getElementById("avatarUrl");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let descriptionInput = document.getElementById("input-description");
    
    usersAPI.getById(userId)
        .then(users => { // Cogemos una foto por la id de la url y metemos los datos en los inputs, para ahora modificarlos
            let currentUser = users[0];
            avatarUrl.value = currentUser.avatarUrl;
            firstName.value = currentUser.firstName;
            lastName.value = currentUser.lastName;
            email.value = currentUser.email;
            descriptionInput.value = currentUser.description;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", user.userId);
    let errors = userValidator.validateEdit(formData);

    if (errors.length == 0) {
        usersAPI.update(userId, formData)
        .then(data => window.location.href = "profile.html?userId="+userId)
        .catch(error =>  messageRenderer.showErrorMessage(error));
    }else{
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    
    
}




document.addEventListener("DOMContentLoaded", main);