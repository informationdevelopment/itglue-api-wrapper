const fetch = require('node-fetch');

exports.createAuthFetch = apiKey => async (url, options = {}) => {
    options.headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/vnd.api+json',
        ...options.headers,
    };
    return fetch(url, options);
};
