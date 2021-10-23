export const schema = {
  models: {
    User: {
      name: "User",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        username: {
          name: "username",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        email: {
          name: "email",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        UserMetrics: {
          name: "UserMetrics",
          isArray: false,
          type: {
            model: "UserMetrics",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "userUserMetricsId",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Users",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    UserMetrics: {
      name: "UserMetrics",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        commentUpvotes: {
          name: "commentUpvotes",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        commentDownvotes: {
          name: "commentDownvotes",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        activeDays: {
          name: "activeDays",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        lastActiveDay: {
          name: "lastActiveDay",
          isArray: false,
          type: "AWSDate",
          isRequired: false,
          attributes: [],
        },
        profileViews: {
          name: "profileViews",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        badges: {
          name: "badges",
          isArray: true,
          type: "String",
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
        },
        coins: {
          name: "coins",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        user: {
          name: "user",
          isArray: false,
          type: "ID",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "UserMetrics",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "a88c10d1eee9f1d4a10f5a04c5410e6e",
};
