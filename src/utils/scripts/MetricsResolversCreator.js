/**
 * Todo-1: create array of object for custom resolvers.
 * Todo-2: create custom resolvers req res mapping template in resolvers folder
 * Todo-3: save req and res template to resolvers file
 * Todo-4: map created customresolvers.json file in stacks
 */

const fs = require("fs");

const customResources = require("../../../amplify/backend/api/eforum/stacks/CustomResources.json");

const ResolverInput = [
  {
    resolverName: "TotalPostsUserMetrics",
    dataSourceName: "UserMetricsTable",
    fieldName: "totalPosts",
  },
  {
    resolverName: "TotalCommentsUserMetrics",
    dataSourceName: "UserMetricsTable",
    fieldName: "totalComments",
  },
  {
    resolverName: "CommunitiesJoinedUserMetrics",
    dataSourceName: "UserMetricsTable",
    fieldName: "communitiesJoined",
  },
  {
    resolverName: "CommunitiesModeratingUserMetrics",
    dataSourceName: "UserMetricsTable",
    fieldName: "communitiesModerating",
  },
  {
    resolverName: "TotalPostsCommunity",
    dataSourceName: "CommunityTable",
    fieldName: "totalPosts",
  },
  {
    resolverName: "TotalMembersCommunity",
    dataSourceName: "CommunityTable",
    fieldName: "totalMembers",
  },
  {
    resolverName: "TotalCommentsCommunity",
    dataSourceName: "CommunityTable",
    fieldName: "totalComments",
  },
  {
    resolverName: "TotalModeratorsCommunity",
    dataSourceName: "CommunityTable",
    fieldName: "totalModerators",
  },
];

const CustomResourcesArray = [];

const TemplatesMapper = (fieldName, type) => {
  const MapperResult = {
    request: "",
    response: "",
  };
  if (type === "INCREMENT") {
    MapperResult.request = `{
        "version" : "2017-02-28",
        "operation" : "UpdateItem",
        "key" : {
        ## If object "id" should come from GraphQL arguments, change to $util.dynamodb.toDynamoDBJson($ctx.args.id)
            "id" : $util.dynamodb.toDynamoDBJson($ctx.args.id)
        },
        "update" : {
            "expression" : "ADD ${fieldName} :plusOne",
            "expressionValues" : {
                ":plusOne" : { "N" : "1" }
            }
        }
    }`;
  } else if (type === "DECREMENT") {
    MapperResult.request = `{
        "version" : "2017-02-28",
        "operation" : "UpdateItem",
        "key" : {
        ## If object "id" should come from GraphQL arguments, change to $util.dynamodb.toDynamoDBJson($ctx.args.id)
            "id" : $util.dynamodb.toDynamoDBJson($ctx.args.id)
        },
        "update" : {
            "expression" : "ADD ${fieldName} :minusOne",
            "expressionValues" : {
                ":minusOne" : { "N" : "-1" }
            }
        }
    }`;
  }
  MapperResult.response = "$utils.toJson($ctx.result)";
  return MapperResult;
};

const CreateResolversTemplates = () => {
  ResolverInput.forEach((entry) => {
    const resolverTemplateIncrement = TemplatesMapper(
      entry.fieldName,
      "INCREMENT"
    );
    const resolverTemplateDecrement = TemplatesMapper(
      entry.fieldName,
      "DECREMENT"
    );
    fs.writeFile(
      `Mutation.increment${entry.resolverName}.req.vtl`,
      resolverTemplateIncrement.request,
      function (err) {
        if (err) throw err;
        console.log(
          `increment${entry.resolverName} request increment template is saved`
        );
      }
    );
    fs.writeFile(
      `Mutation.increment${entry.resolverName}.res.vtl`,
      resolverTemplateIncrement.response,
      function (err) {
        if (err) throw err;
        console.log(
          `increment${entry.resolverName} response increment template is saved`
        );
      }
    );
    fs.writeFile(
      `Mutation.decrement${entry.resolverName}.req.vtl`,
      resolverTemplateDecrement.request,
      function (err) {
        if (err) throw err;
        console.log(
          `decrement${entry.resolverName} request decrement template is saved`
        );
      }
    );
    fs.writeFile(
      `Mutation.decrement${entry.resolverName}.res.vtl`,
      resolverTemplateDecrement.response,
      function (err) {
        if (err) throw err;
        console.log(
          `decrement${entry.resolverName} response decrement template is saved`
        );
      }
    );

    const stackIncrementTemplate = {
      Type: "AWS::AppSync::Resolver",
      Properties: {
        ApiId: {
          Ref: "AppSyncApiId",
        },
        DataSourceName: entry.dataSourceName,
        TypeName: "Mutation",
        FieldName: `increment${entry.resolverName}`,
        RequestMappingTemplateS3Location: {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/" +
              `Mutation.increment${entry.resolverName}.req.vtl`,
            {
              S3DeploymentBucket: {
                Ref: "S3DeploymentBucket",
              },
              S3DeploymentRootKey: {
                Ref: "S3DeploymentRootKey",
              },
            },
          ],
        },
        ResponseMappingTemplateS3Location: {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/" +
              `Mutation.increment${entry.resolverName}.res.vtl`,
            {
              S3DeploymentBucket: {
                Ref: "S3DeploymentBucket",
              },
              S3DeploymentRootKey: {
                Ref: "S3DeploymentRootKey",
              },
            },
          ],
        },
      },
    };

    const stackDecrementTemplate = {
      Type: "AWS::AppSync::Resolver",
      Properties: {
        ApiId: {
          Ref: "AppSyncApiId",
        },
        DataSourceName: entry.dataSourceName,
        TypeName: "Mutation",
        FieldName: `decrement${entry.resolverName}`,
        RequestMappingTemplateS3Location: {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/" +
              `Mutation.decrement${entry.resolverName}.req.vtl`,
            {
              S3DeploymentBucket: {
                Ref: "S3DeploymentBucket",
              },
              S3DeploymentRootKey: {
                Ref: "S3DeploymentRootKey",
              },
            },
          ],
        },
        ResponseMappingTemplateS3Location: {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/" +
              `Mutation.decrement${entry.resolverName}.res.vtl`,
            {
              S3DeploymentBucket: {
                Ref: "S3DeploymentBucket",
              },
              S3DeploymentRootKey: {
                Ref: "S3DeploymentRootKey",
              },
            },
          ],
        },
      },
    };

    CustomResourcesArray.push([
      `QueryIncrement${entry.resolverName}`,
      stackIncrementTemplate,
    ]);

    CustomResourcesArray.push([
      `QueryDecrement${entry.resolverName}`,
      stackDecrementTemplate,
    ]);
  });
};

const CustomResourcesMapper = () => {
  const stackResult = customResources;
  CustomResourcesArray.forEach((entry) => {
    stackResult.Resources[entry[0]] = entry[1];
  });
  fs.writeFile(
    `CustomResources.json`,
    JSON.stringify(stackResult),
    function (err) {
      if (err) throw err;
      console.log(`custom stack created`);
    }
  );
};

CreateResolversTemplates();
CustomResourcesMapper();
