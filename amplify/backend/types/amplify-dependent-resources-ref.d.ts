export type AmplifyDependentResourcesAttributes = {
  api: {
    eforum: {
      GraphQLAPIIdOutput: "string";
      GraphQLAPIEndpointOutput: "string";
    };
  };
  auth: {
    eforum2f3f8584: {
      IdentityPoolId: "string";
      IdentityPoolName: "string";
      UserPoolId: "string";
      UserPoolArn: "string";
      UserPoolName: "string";
      AppClientIDWeb: "string";
      AppClientID: "string";
      CreatedSNSRole: "string";
    };
  };
  function: {
    createPostAndTimeline: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
  storage: {
    eforumdev: {
      BucketName: "string";
      Region: "string";
    };
  };
};
