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
          isRequired: true,
          attributes: [],
        },
        email: {
          name: "email",
          isArray: false,
          type: "String",
          isRequired: true,
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
        postLikes: {
          name: "postLikes",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        postLoves: {
          name: "postLoves",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        postSupport: {
          name: "postSupport",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        postDislike: {
          name: "postDislike",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        profileViews: {
          name: "profileViews",
          isArray: false,
          type: "Int",
          isRequired: true,
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
          isRequired: true,
          attributes: [],
        },
        user: {
          name: "user",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        commentUpvotes: {
          name: "commentUpvotes",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        commentDownvotes: {
          name: "commentDownvotes",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        activeDays: {
          name: "activeDays",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        lastActiveDay: {
          name: "lastActiveDay",
          isArray: false,
          type: "AWSDate",
          isRequired: true,
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
  version: "085dbf4fb410d78e0aa30cb3e20053f4",
};
