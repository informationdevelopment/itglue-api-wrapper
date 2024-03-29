module.exports.buildEndpoints = (factory) => ({
    configurations: {
        index: factory.createIndex("/configurations"),
        show: factory.createShow("/configurations"),
        relatedItems: {
            create: factory.createCreate((id, data) => ({
                resource: `/configurations/${id}/relationships/related_items`,
                data,
            })),
            bulkDestroy: factory.createBulkDestroy((id, data) => ({
                resource: `/configurations/${id}/relationships/related_items`,
                data,
            })),
        },
    },

    contacts: {
        index: factory.createIndex("/contacts"),
        show: factory.createShow("/contacts"),
        relatedItems: {
            create: factory.createCreate((id, data) => ({
                resource: `/contacts/${id}/relationships/related_items`,
                data,
            })),
            bulkDestroy: factory.createBulkDestroy((id, data) => ({
                resource: `/contacts/${id}/relationships/related_items`,
                data,
            })),
        },
    },

    flexibleAssets: {
        index: factory.createIndex("/flexible_assets"),
        show: factory.createShow("/flexible_assets"),
        create: factory.createCreate("/flexible_assets"),
        update: factory.createUpdate("/flexible_assets"),
        bulkUpdate: factory.createBulkUpdate("/flexible_assets"),
        destroy: factory.createDestroy("/flexible_assets"),
    },

    flexibleAssetFields: {
        update: factory.createUpdate("/flexible_asset_fields"),
    },

    locations: {
        index: factory.createIndex("/locations"),
        show: factory.createShow("/locations"),
    },

    organizations: {
        index: factory.createIndex("/organizations"),
        show: factory.createShow("/organizations"),
    },
});
