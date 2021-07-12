"use strict";

let palabrasPerjudiciales = ['tonto','feo'];

const comentariosValidator = {
    validateComentario: function (formData) {

        let errors = [];
        let comentarioTexto = formData.get("comment");
        for(let palabra of palabrasPerjudiciales){
            if (comentarioTexto.includes(palabra)) {
                errors.push("No se permite hacer uso de lenguaje perjudicial.");
            }
        }
        return errors;
    }
};
export { comentariosValidator };