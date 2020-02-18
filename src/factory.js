const { createAuthFetch } = require('./auth-fetch');
const { getURLSearchParams } = require('./url');

exports.createFactory = (apiKey, baseUrl) => {
    const fetch = createAuthFetch(apiKey);
    return {
        createIndex: endpoint => async function * (params = {}, pageSize = 500) {
            const url = new URL(endpoint, baseUrl);
            const urlSearchParams = getURLSearchParams(params);
            urlSearchParams.set('page[size]', pageSize);
            url.search = `?${urlSearchParams.toString()}`;
            let link = url.href;
            do {
                const res = await fetch(link);
                if (!res.ok) {
                    throw new Error(`IT Glue API failure: HTTP ${res.status} ${res.statusText}`);
                }
                const json = await res.json();
                for (let datum of json.data) {
                    yield { ...datum, meta: json.meta };
                }
                link = json.links.next;
            } while (link);
        },
    };
};
