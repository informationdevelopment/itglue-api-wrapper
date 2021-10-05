const { createAuthFetch } = require("./auth-fetch");
const { getURLSearchParams } = require("./url");

function processEndpoint(endpoint, args) {
    if (typeof endpoint === "function") {
        return endpoint(...args);
    }

    let data;
    let resource = endpoint;

    if (typeof args[args.length - 1] === "object") {
        data = args.pop();
    }

    if (args.length === 1) {
        resource = `${endpoint}/${args[0]}`;
    }

    return { resource, data };
}

module.exports.createFactory = (apiKey, baseUrl) => {
    const fetchJson = createAuthFetch(apiKey);

    return {
        createIndex:
            (endpoint) =>
            (options, pageSize = 100) => ({
                async *[Symbol.asyncIterator]() {
                    const url = new URL(endpoint, baseUrl);
                    const params = getURLSearchParams(options);
                    params.set("page[size]", pageSize);
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

        createShow:
            (endpoint) =>
            async (...args) => {
                const { resource, data } = processEndpoint(endpoint, args);
                const params = getURLSearchParams(data);

                const json = await fetchJson({
                    resource,
                    baseUrl,
                    urlSearchParams: params,
                });
                return json;
            },

        createCreate:
            (endpoint) =>
            async (...args) => {
                const { resource, data } = processEndpoint(endpoint, args);

                const json = await fetchJson({
                    resource,
                    baseUrl,
                    method: "POST",
                    body: { data },
                });
                return json;
            },

        createUpdate:
            (endpoint) =>
            async (...args) => {
                const { resource, data } = processEndpoint(endpoint, args);

                const json = await fetchJson({
                    resource,
                    baseUrl,
                    method: "PATCH",
                    body: { data },
                });
                return json;
            },

        createBulkUpdate:
            (endpoint) =>
            async (...args) => {
                const { resource, data } = processEndpoint(endpoint, args);

                const json = await fetchJson({
                    resource,
                    baseUrl,
                    method: "PATCH",
                    body: { data },
                });
                return json;
            },

        createDestroy:
            (endpoint) =>
            async (...args) => {
                const { resource } = processEndpoint(endpoint, args);

                await fetchJson({
                    resource,
                    baseUrl,
                    method: "DELETE",
                    selector: (res) => res.status === 204,
                });
            },

        createBulkDestroy:
            (endpoint) =>
            async (...args) => {
                const { resource, data } = processEndpoint(endpoint, args);

                await fetchJson({
                    resource,
                    baseUrl,
                    method: "DELETE",
                    body: { data },
                    selector: (res) => res.status === 200,
                });
            },
    };
};
