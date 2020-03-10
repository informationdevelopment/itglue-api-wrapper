const { createAuthFetch } = require('./auth-fetch');
const { getURLSearchParams } = require('./url');

module.exports.createFactory = (apiKey, baseUrl) => {
    const fetchJson = createAuthFetch(apiKey);

    return {
        createIndex: endpoint => (options, pageSize = 100) => ({
            async * [Symbol.asyncIterator]() {
                const url = new URL(endpoint, baseUrl);
                const params = getURLSearchParams(options);
                params.set('page[size]', pageSize);
                url.search = `?${params.toString()}`;
                let link = url.href;
                do {
                    const json = await fetchJson({ resource: link });
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

        createShow: endpoint => async (id, options) => {
            const params = getURLSearchParams(options);
            const json = await fetchJson({
                resource: `${endpoint}/${id}`,
                baseUrl,
                urlSearchParams: params,
            });
            return json.data;
        },

        createUpdate: endpoint => async (id, data) => {
            const json = await fetchJson({
                resource: `${endpoint}/${id}`,
                baseUrl,
                method: 'PATCH',
                body: { data },
            });
            return json.data;
        },
    };
};
