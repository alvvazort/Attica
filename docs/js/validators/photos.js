" use strict ";

import { commentsAPI } from "/js/api/comments.js";

let palabrasPerjudiciales = ['tonto','feo'];

const photoValidator = {
    validatePhoto: function (formData) {
        let errors = [];
        let title = formData.get("title");
        let description = formData.get("description");
        for(let palabra of palabrasPerjudiciales){
            if (title.includes(palabra) || description.includes(palabra)) {
                errors.push("No se permite hacer uso de lenguaje perjudicial.");
            }
        }

        return errors;
    }
};
export { photoValidator };