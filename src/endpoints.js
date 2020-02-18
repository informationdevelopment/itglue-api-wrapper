module.exports.buildEndpoints = factory => ({
    organizations: {
        index: factory.createIndex('/organizations'),
        show: factory.createShow('/organizations'),
    },
});
