"use strict";

import { BASE_URL, requestOptions } from './common.js';
const ratesAPI = {
    getById: function (userId,photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .get(`${BASE_URL}/rates/${userId}/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    create: function (userId,photoId) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/rates/${userId}/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
};

export { ratesAPI };