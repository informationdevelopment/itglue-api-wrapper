const { createAuthFetch } = require('./auth-fetch');
const { getURLSearchParams } = require('./url');

exports.createFactory = (apiKey, baseUrl) => {
    const fetch = createAuthFetch(apiKey);

    return {
        createIndex: endpoint => (params = {}, pageSize = 100) => ({
            async * [Symbol.asyncIterator]() {
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
                    link = json.links && json.links.next;
                } while (link);
            },

            async toArray(count = Infinity) {
                const result = [];
                const iterator = this[Symbol.asyncIterator]();
                while (result.length < count) {
                    const { value, done } = await iterator.next();
                    if (done) break;
                    result.push(value);
                }
                return result;
            },
        }),
    };
};
