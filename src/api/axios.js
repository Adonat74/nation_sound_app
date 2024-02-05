import axios from 'axios';

const nodeAPI = axios.create({
    baseURL: 'http://localhost:3001'
});

const drupalAPI = axios.create({
    baseURL: 'http://localhost/drupal10/jsonapi/node'
});


export {
    nodeAPI,
    drupalAPI
};