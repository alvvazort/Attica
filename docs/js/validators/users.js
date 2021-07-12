" use strict ";

let palabrasPerjudiciales = ['tonto','feo','gilipollas','puta','gordo'];

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let nickName = formData.get("username");
        let password = formData.get("password");
        for(let palabra of palabrasPerjudiciales){
            if (firstName.includes(palabra) || lastName.includes(palabra) || nickName.includes(palabra)) {
                errors.push("No se permite hacer uso de lenguaje perjudicial.");
            }
        }

        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("El nombre y los apellidos deben tener más de 3 caracteres");
        }
        if(nickName.length>20){
            errors.push("El nombre de usuario debe tener menos de 20 caracteres");
        }
        if(password.length<6){
            errors.push("La contraseña debe tener más de 6 caracteres");
        }
        return errors;
    },
    validateEdit: function (formData) {
        let errors = [];
        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let description= formData.get("description")
        for(let palabra of palabrasPerjudiciales){
            if (firstName.includes(palabra) || lastName.includes(palabra) || description.includes(palabra)) {
                errors.push("No se permite hacer uso de lenguaje perjudicial.");
            }
        }

        if (firstName.length < 3 || lastName.length < 3) {
            errors.push("The first and last name should have more than 3 characters");
        }
        
        return errors;
    },
    validateLogin: function (formData) {
        let errors = [];
        let nickName = formData.get("username");
        let password = formData.get("password");
        
        if(nickName.length>20){
            errors.push("Nickname should have less than 20 characters");
        }
        if(password.length<6){
            errors.push("Password should have more than 6 charachters");
        }
        return errors;
    }
};
export { userValidator };