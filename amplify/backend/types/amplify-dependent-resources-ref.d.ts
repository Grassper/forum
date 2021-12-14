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
    createSurveyAndTimeline: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
  storage: {
    s3905aa3fd: {
      BucketName: "string";
      Region: "string";
    };
  };
};
