"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";
import { usersAPI } from "/js/api/users.js";

function main() {
    let registerForm = document.getElementById("register-form"); /* ID DEL FORM */
    registerForm.onsubmit = handleSubmitRegister;
}
function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);

    usersAPI.getByUsername(formData.get("username"))
        .then(data => {
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
            let error = "Ese nombre de usuario ya existe.";
            messageRenderer.showErrorMessage(error);

        }).catch(error => {
            if (errors.length === 0) {
                sendRegister(formData);

            } else {
                let errorsDiv = document.getElementById("errors");
                errorsDiv.innerHTML = "";
                for (let error of errors) {
                    messageRenderer.showErrorMessage(error);
                }
            }
        });


}

function sendRegister(formData) {
    authAPI.register(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html ";
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


document.addEventListener("DOMContentLoaded", main);