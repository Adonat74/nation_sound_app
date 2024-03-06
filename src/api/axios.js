import axios from 'axios';

// Créé 2 instances d'axios, l'une pour l'api en node.js et l'autre pour drupal en Headless CMS
// instances que l'on peut appeler à chaque fois que l'on en a besoin dans le code

const nodeAPI = axios.create({
    baseURL: 'https://nation-sound-api.onrender.com'
});

const drupalAPI = axios.create({
    baseURL: 'https://nation-sound.infinityfreeapp.com/jsonapi/node'
});


export {
    nodeAPI,
    drupalAPI
};