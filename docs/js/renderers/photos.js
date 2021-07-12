" use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { commentsAPI } from "/js/api/comments.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";



const photoRenderer = {
    asCard: function (photo) {
        let html =
            `<div class="class-photo-block">
        <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a id="report" class="dropdown-item" href="photo_detail.html?photoId=${photo.photoId}">Ir a la publicación</a>
            </div>
        </div>
        <div class="class-photo-block-profile">
            <a href="profile.html?userId=${photo.userId}" style="color:black">
                <div class="class-pic-user">
                    <div class="prof-user">
                        <img class="class-photo-image-profile" 
                        alt="User pic profile">
                        <span class="class-photo-user user-updater">
                        ${photo.userId} 
                    </span>
                    </div>
                </div>
            </a>
        </div>
        <a href= "photo_detail.html?photoId=${photo.photoId}" style="color:black">
        <div class="class-photo-image-block">
            <img class="class-photo-image" 
            src="${photo.url}"
            alt="${photo.description}">
        </div>
        </a>
        <div class="class-photo-header-block">
            <h3 id="rate" class="class-photo-score">4.5</h3>
            <img class="comments" src="/docs/images/icons/Comments.png"/>
            <a id="button-edit" href="edit_photo.html?photoId=${photo.photoId}"><img class= "comments"src="/docs/images/icons/lapiz.png"/></a>
        </div>
        <a href= "photo_detail.html?photoId=${photo.photoId}" style="color:black">
        <div class="class-photo-header-block">
            <h2 class="class-photo-title">${photo.title}</h2>
        </div>
        <div class="class-metadata-block">
            <div class="class-photo-description"><div class="user user-updater">${photo.userId} </div>${photo.description}</div>
        </div>
        <div id="bloque-de-comentarios" class="class-metadata-block">
            <ul id="lista-de-comentarios" class="class-comments">
                <div id="numero-comentarios" class="class-show-comments"></div>
            </ul>
        </div>
        </a>
        </div>`;
        let card = parseHTML(html);
        loadRate(card,photo);
        loadUserCard(card, photo.userId);
        loadoptionsbuttons(card, photo.userId);
        loadComments(card,photo.photoId, true);
        return card;
    },
    asDetails: function (photo) {
        let html = `<div class="class-photo-block">
        <div class="class-photo-block-profile">
            <a href="profile.html?userId=${photo.userId}" style="color:black">
                <div class="class-pic-user">
                    <div class="prof-user">
                        <img class="class-photo-image-profile" 
                        alt="User pic profile">
                        <span class="class-photo-user user-updater">
                        ${photo.userId} 
                    </span>
                    </div>
                </div>
            </a>
        </div>
        <div class="class-photo-image-block">
            <img class="class-photo-image" 
            src="${photo.url}"
            alt="${photo.description}">
        </div>
        <div class="class-photo-header-block">
            <div class="stars">
                <form action="">
                <input class="star star-5" id="star-5-${photo.photoId}" type="radio" name="star"/>
                <label class="star star-5" for="star-5-${photo.photoId}"></label>
                <input class="star star-4" id="star-4-${photo.photoId}" type="radio" name="star"/>
                <label class="star star-4" for="star-4-${photo.photoId}"></label>
                <input class="star star-3" id="star-3-${photo.photoId}" type="radio" name="star"/>
                <label class="star star-3" for="star-3-${photo.photoId}"></label>
                <input class="star star-2" id="star-2-${photo.photoId}" type="radio" name="star"/>
                <label class="star star-2" for="star-2-${photo.photoId}"></label>
                <input class="star star-1" id="star-1-${photo.photoId}" type="radio" name="star"/>
                <label class="star star-1" for="star-1-${photo.photoId}"></label>
                </form>
            </div>
            <h3 id="rate" class="class-photo-score">4.5</h3>
            <img class="comments" src="/docs/images/icons/Comments.png"/>
            <a id="button-edit" href="edit_photo.html?photoId=${photo.photoId}"><img class= "comments"src="/docs/images/icons/lapiz.png"/></a>
            <a href="#"><img class="comments" id="button-delete" src="/docs/images/icons/bin.png"/></a>
        </div>
        <div class="class-photo-header-block">
            <h2 class="class-photo-title">${photo.title}</h2>
        </div>
        <div class="class-metadata-block">
            <div class="class-photo-description"><div class="user user-updater">${photo.userId} </div>${photo.description}</div>
        </div>
        <div id="bloque-de-comentarios" class="class-metadata-block">
            <ul id="lista-de-comentarios" class="class-comments">
                
            </ul>
        </div>
        <form id="send-comment">
            <input required type="text" name= "comment" placeholder=" Añade aquí tu comentario" style="width:100%;"></input>
        </form>
        </div>`;
        let photoDetails = parseHTML(html);
        loadRate(photoDetails,photo);
        loadUserCard(photoDetails, photo.userId);
        loadoptionsbuttonsDetails(photoDetails, photo.userId);
        loadComments(photoDetails,photo.photoId, false);
        return photoDetails;
    }
};
function loadRate(card, photo){
    let rate= card.querySelector("#rate");
    if(photo.numRaters !=0){
        rate.textContent= (photo.rate/photo.numRaters).toFixed(1);
    }else{
        rate.textContent=0;
    }
    

}

function loadUserCard(card, userId) {
    usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username + " ";
            let img = card.querySelector("img.class-photo-image-profile");
            if (users[0].avatarUrl !== null) {
                img.src = users[0].avatarUrl;
            } else {
                img.src = "/docs/images/FotosPerfil/pngegg.png";
            }

            let div = card.querySelector("div.user-updater");
            let span = card.querySelector("span.user-updater");
            span.textContent = username;
            div.textContent = username;
        });
}

function loadoptionsbuttonsDetails(photo,userId) {

    if (sessionManager.getLoggedId() !== userId) {
        let edit = photo.querySelector("#button-edit");
        let deletebutton = photo.querySelector("#button-delete");
        edit.style.display="none";
        deletebutton.style.display="none";
    }

}


function loadoptionsbuttons(photo,userId) {
    
    if (sessionManager.getLoggedId() !== userId) {
        let edit = photo.querySelector("#button-edit");
        edit.style.display="none";
    }

}
function loadComments(card,photoId,bool){
    commentsAPI.getByPhotoId(photoId)
    .then(comments => choose(card, comments, bool));
}
function choose(card, comments,bool){
    if(bool){
        if(comments.length>2){
            let numComments= card.querySelector("#numero-comentarios");
            numComments.textContent="Ver los "+(comments.length-2)+" comentarios";
        }
        renderTwoComments(card, comments);
    }else{
        renderComments(card,comments);
    }
}

function renderTwoComments(card, comments){
    let listComments = card.querySelector("#lista-de-comentarios");
    if(comments.length>2){
        for(let i =0; i<2;i++){
            usersAPI.getById(comments[i].userId)
            .then(users => {
                let html=
                    `<li class="class-comment">
                            <div class="user">${users[0].username}</div> ${comments[i].comment}
                        </li>
                    `;
                let commentLi = parseHTML(html);
                listComments.appendChild(commentLi);
            });
        }
    }else if(comments.length>=1){
        for(let comment of comments){
            usersAPI.getById(comment.userId)
            .then(users => {
                let html=
                    `<li class="class-comment">
                            <div class="user">${users[0].username}</div> ${comment.comment}
                        </li>
                    `;
                let commentLi = parseHTML(html);
                listComments.appendChild(commentLi);
            });
        }
    }
    
}
function renderComments(card, comments){
    let listComments = card.querySelector("#lista-de-comentarios");
    for(let comment of comments){
        usersAPI.getById(comment.userId)
        .then(users => {
            let html=
                `<li class="class-comment">
                        <div class="user">${users[0].username}</div> ${comment.comment}
                    </li>
                `;
            let commentLi = parseHTML(html);
            listComments.appendChild(commentLi);
        });
    }
}
  

export { photoRenderer };