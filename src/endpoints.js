exports.buildEndpoints = factory => ({
    organizations: {
        index: factory.createIndex('/organizations'),
    },
});
