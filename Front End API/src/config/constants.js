require('dotenv').config({path: '../.env'})

console.log('DOTENV FRONT' + process.env.REST_URL);

module.exports = {
    COOKIE_SECRET : 'as898y(*Oy9 nNJS(Auo aw@E', 
    PORT: 3030,
    REST_API_URL: process.env.REST_URL || 'http://127.0.0.1:3000',
    // REST_API_URL:'http://backend:3000', 
};

