// Flatten an object by wrapping nested keys with a scope.
module.exports.getURLSearchParams = function(params) {
    function flattenObjectEntries(entries, scope = []) {
            return entries.reduce((acc, [key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return [...acc, ...flattenObjectEntries(Object.entries(value), [key, ...scope])];
                }
                else {
                    const qualifiedKey = scope.reduce((acc, val) => `${val}[${acc}]`, key);
                    return [...acc, [qualifiedKey, value]];
                }
            }, [])
    }

    return new URLSearchParams(flattenObjectEntries(Object.entries(params)));
};
