module.exports.buildEndpoints = factory => ({
    configurations: {
        index: factory.createIndex('/configurations'),
        show: factory.createShow('/configurations'),
    },

    contacts: {
        index: factory.createIndex('/contacts'),
        show: factory.createShow('/contacts'),
    },

    organizations: {
        index: factory.createIndex('/organizations'),
        show: factory.createShow('/organizations'),
    },

    locations: {
        index: factory.createIndex('/locations'),
        show: factory.createShow('/locations'),
    },
});
