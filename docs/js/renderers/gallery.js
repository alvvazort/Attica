"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js";

const galleryRenderer = {
    asCardGallery: function (photos) {
        let galleryContainer = parseHTML('<div class= "photo-gallery"> </div>');
        for (let photo of photos) {
            let card = photoRenderer.asCard(photo);
            galleryContainer.appendChild(card);
        }
        return galleryContainer;
    }
};
export { galleryRenderer }