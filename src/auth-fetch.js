const fetch = require('node-fetch');

module.exports.createAuthFetch = apiKey => async (url, method = 'GET', body) => {
    options = {
        method,
        body,
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/vnd.api+json',
        },
    };
    return fetch(url, options);
};
