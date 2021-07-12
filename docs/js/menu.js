"use strict";

import { sessionManager } from "/js/utils/session.js";
import { parseHTML } from "/js/utils/parseHTML.js";



function main() {
    $(document).ready(function () {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("menuDisplayed");
        });
    });
    showUser();
    addLogoutHandler();
}
function showUser() {
    let autenticador = document.getElementById("autentication");
    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        let loginButton = document.getElementById("id-IniciarSesión");
        let logupButton = document.getElementById("id-Registrarse");
        loginButton.style.display="none";
        logupButton.style.display="none";

        let profileButton= document.getElementById("id-Perfil-Button");
        profileButton.href="profile.html?userId="+sessionManager.getLoggedId();
        
        autenticador.textContent = "@"+username;
    } else {
        let profileButton= document.getElementById("id-Perfil-Button");
        let logoutButton = document.getElementById("navbar-logout");
        let uploadButton = document.getElementById("id-subir-imágen");
        logoutButton.style.display="none";
        profileButton.style.display="none";
        uploadButton.style.display="none";
    }
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("navbar-logout");
    logoutButton.addEventListener("click", function() {
        sessionManager.logout();
        window.location.href = " index.html ";
    });
}

document.addEventListener("DOMContentLoaded", main);