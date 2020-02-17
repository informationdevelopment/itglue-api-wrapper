const fetch = require('node-fetch');

exports.createAuthFetch = (baseUrl, apiKey) => async (url, options = {}) => {
    options.headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/vnd.api+json',
        ...options.headers,
    };
    const url = new URL(path, baseUrl);
    return fetch(url.href, options);
};
