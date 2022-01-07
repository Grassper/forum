/* Amplify Params - DO NOT EDIT
	API_EFORUM_GRAPHQLAPIENDPOINTOUTPUT
	API_EFORUM_GRAPHQLAPIIDOUTPUT
	API_EFORUM_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};

/**
 * *Todo-1: custom resolvers
 * *Todo-2: update graphql schema
 * *Todo-3: create transaction table
 */

/**
 * * lambda function todo
 * Todo-1: check both users are exist
 * Todo-2: validate coin amount in the requests
 * Todo-3: call the increment handler with the coin amount
 * Todo-4: create the transaction records
 * Todo-4: send the access message
 */
