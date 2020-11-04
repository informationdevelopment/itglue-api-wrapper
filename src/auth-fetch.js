const fetch = require('node-fetch');

const defaultSelector = async res => await res.json();

module.exports.createAuthFetch = apiKey => async (
    {
        resource,
        baseUrl,
        urlSearchParams,
        method = 'GET',
        body,
        selector = defaultSelector,
    } = {}
) => {
    const url = new URL(resource, baseUrl);
    if (urlSearchParams) {
        url.search = `?${urlSearchParams.toString()}`;
    }
    options = {
        method,
        ...(body ? { body: JSON.stringify(body) } : {}),
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/vnd.api+json',
        },
    };
    const res = await fetch(url.href, options);
    if (!res.ok) {
        throw new Error(`IT Glue API failure: HTTP ${res.status} ${res.statusText}`);
    }
    return selector(res);
};
