"use strict";
import { BASE_URL, requestOptions } from "./common.js";

const photosAPI = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllReverse: function (userId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/user/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllReversebyUserId: function (userId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/users/photos/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getAllPrivatebyUserId: function (userId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/user/photos/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getById: function (photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    getByCategoryId: function (categoryId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/categories/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/photos`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    update: function (photoId, formData) {
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/photos/${photoId}`, formData,
                    requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    delete: function (photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }


};

export { photosAPI };