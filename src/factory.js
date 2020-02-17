const { createAuthFetch } = require('./auth-fetch');
const { getURLSearchParams } = require('./url');

exports.createFactory = (apiKey, baseUrl) => endpoint => {
    const fetch = createAuthFetch(apiKey);
    return {
        index: async function * (params = {}, pageSize = 500) {
            const url = new URL(endpoint, baseUrl);
            let currentPage = 1, done = false;
            do {
                params.page = {
                    size: pageSize,
                    number: currentPage++,
                };
                const querystring = getURLSearchParams(params).toString();
                url.search = `?${querystring}`;
                const res = await fetch(url);
                let json = null;
                json = await res.json();
                for (let datum of json.data) {
                    yield datum;
                }
                if (!json.meta['next-page']) {
                    done = true;
                }
            } while (!done);
        },
    };
};
