" use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { sessionManager } from "/js/utils/session.js";


const userRenderer = {
    userProfile: function (user) {
        let html=
        `<div id="sidebar-profile">
            <div class="class-photo-image-profile">
                <img  class="image-profile"
                src="/docs/images/FotosPerfil/image.png"
                alt="Profile picture">
                <h1>${user.username}</h1>
            </div>
            <ul>
                <li>
                    <div class="user">Nombre: </div>${user.firstName}
                </li>
                <li>
                    <div class="user">Apellidos: </div>${user.lastName}
                </li>
                <li>
                    <div class="user">Email: </div>${user.email}

                </li>
                <li id=descripcion>

                </li>
                </br>
                <div class="class-button-log" id="editarPerfil">
                    <a class="button-text" href="edit_profile.html">
                        Editar perfil
                    </a>
                </div>
            </ul>
        
        
        </div>`

        let sideprofile = parseHTML(html);
        loadPictureProfile(sideprofile, user.avatarUrl);
        loadEditButton(sideprofile,user.userId);
        loadDescription(sideprofile,user);
        return sideprofile;
    }
}

function loadPictureProfile(sideprofile, avatarUrl){
    let imgProf= sideprofile.querySelector("img.image-profile");
    if(avatarUrl === null){
        imgProf.src="/docs/images/FotosPerfil/pngegg.png";
    }else{
        imgProf.src= avatarUrl;
    }

}

function loadEditButton(sideprofile,userId) {
    
    if (sessionManager.getLoggedId() !== userId) {
        let edit = sideprofile.querySelector("#editarPerfil");
        edit.style.display="none";
    }
}
function loadDescription(sideprofile,user) {
    let description = sideprofile.querySelector("#descripcion");
    if (user.description === null){
        if (sessionManager.getLoggedId() == user.userId) {
            description.textContent="Edita el perfil para añadir una descripción";
        }
    }else{
        description.textContent=user.description;
    }
    
}

export { userRenderer };