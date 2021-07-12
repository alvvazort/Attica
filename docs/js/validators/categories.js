" use strict ";

let palabrasPerjudiciales = ['tonto','feo'];

const categoryValidator = {
    validateCategory: function (formData) {
        let errors = [];
        let category = formData.get("category");
        for(let palabra of palabrasPerjudiciales){
            if (category.includes(palabra)) {
                errors.push("No se permite hacer uso de lenguaje perjudicial.");
            }
        }

        return errors;
    }
};
export { categoryValidator };