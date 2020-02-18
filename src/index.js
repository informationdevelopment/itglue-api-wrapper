const { createFactory } = require('./factory');
const { buildEndpoints } = require('./endpoints');

module.exports.createClient = (apiKey, baseUrl = 'https://api.itglue.com') => {
    const factory = createFactory(apiKey, baseUrl);
    return buildEndpoints(factory);
};
