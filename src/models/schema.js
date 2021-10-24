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
        coins: {
          name: "coins",
          isArray: false,
          type: "Int",
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
        postSupports: {
          name: "postSupports",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        postDislikes: {
          name: "postDislikes",
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
        User: {
          name: "User",
          isArray: false,
          type: {
            model: "User",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "userMetricsUserId",
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
  version: "ab73cc52813b9210ed7956723a860f60",
};
