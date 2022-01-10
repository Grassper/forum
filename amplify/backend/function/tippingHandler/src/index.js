/* Amplify Params - DO NOT EDIT
	API_EFORUM_GRAPHQLAPIENDPOINTOUTPUT
	API_EFORUM_GRAPHQLAPIIDOUTPUT
	API_EFORUM_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
const AWS = require("aws-sdk");

const urlParse = require("url").URL;

const appsyncUrl = process.env.API_EFORUM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

exports.handler = async (event, _, callback) => {
  // input
  // amount
  // fromUserID
  // toUserId
  // reason

  if (!event.arguments.fromUserId) {
    return callback("Request should contain from user ID");
  }

  if (!event.arguments.toUserId) {
    return callback("Request should contain to user ID");
  }

  if (!event.arguments.amount) {
    return callback("Request should contain amount");
  }

  if (event.identity.sub !== event.arguments.fromUserId) {
    return callback("Access Denied Can't to send amount from another User id");
  }

  // checking sending and receiving id
  if (event.arguments.fromUserId === event.arguments.toUserId) {
    return callback("User Can't tip amount to their own account id");
  }

  // validate coin amount
  if (event.arguments.amount >= 1000 || event.arguments.amount <= 0) {
    return callback("Tipping amount should between 1 to 999 Ef");
  }

  // checking both users exist & from users has sufficient amount
  try {
    const isBothUsersExistAndCheckAmount = await CheckBothUsersExist(
      event.arguments.fromUserId,
      event.arguments.toUserId,
      event.arguments.amount
    );
    if (!isBothUsersExistAndCheckAmount) {
      return callback(
        "Anyone of provided users doesn't exist or from users doesn't have enough amount"
      );
    }
  } catch (err) {
    return callback(err);
  }

  // increment handler - amount in from and + amount in to
  try {
    await TippingIncreDecreHandler(
      event.arguments.fromUserId,
      event.arguments.toUserId,
      event.arguments.amount
    );
  } catch (err) {
    return callback(err);
  }

  // create the transaction records

  try {
    await makeAppSyncRequest(
      {
        input: {
          value: event.arguments.amount,
          fromUserId: event.arguments.fromUserId,
          toUserId: event.arguments.toUserId,
          reason: event.arguments.reason,
        },
      },
      CreateTransaction
    );
  } catch (err) {
    return callback(err);
  }

  // response with updated from user info
  try {
    const response = await makeAppSyncRequest(
      { fromUserId: event.arguments.fromUserId },
      GetFromUserInfo
    );

    return response.data?.getUser;
  } catch (err) {
    return callback(err);
  }
};

const CheckBothUsersExist = async (fromUserId, toUserId, amount) => {
  try {
    const response = await makeAppSyncRequest(
      { fromUserId, toUserId },
      CheckUsersExistQuery
    );

    if (response.data) {
      const { fromUser, toUser } = response.data;
      if (fromUser !== null && toUser !== null && fromUser.coins >= amount) {
        return true;
      }
      return false;
    } else {
      throw Error("CheckUsersExistQuery Response doesn't contain data");
    }
  } catch (err) {
    throw Error(err);
  }
};

const CheckUsersExistQuery = /* GraphQL */ `
  query CheckUsersExist($fromUserId: ID!, $toUserId: ID!) {
    fromUser: getUser(id: $fromUserId) {
      id
      username
      coins
    }
    toUser: getUser(id: $toUserId) {
      id
      username
    }
  }
`;

const GetFromUserInfo = /* GraphQL */ `
  query CheckUsersExist($fromUserId: ID!) {
    getUser(id: $fromUserId) {
      id
      username
      coins
      email
    }
  }
`;

const CreateTransaction = /* GraphQL */ `
  mutation createTransaction($input: CreateCoinTransactionInput!) {
    createCoinTransaction(input: $input) {
      id
    }
  }
`;

const TippingIncreDecreHandler = async (fromUserId, toUserId, amount) => {
  try {
    await makeAppSyncRequest(
      {
        id: fromUserId,
        value: amount,
      },
      DecrementCoinsUser
    );

    await makeAppSyncRequest(
      {
        id: toUserId,
        value: amount,
      },
      IncrementCoinsUser
    );

    return true;
  } catch (err) {
    throw Error(err);
  }
};

const IncrementCoinsUser = /* GraphQL */ `
  mutation incrementCoinsUser($id: ID!, $value: Int!) {
    incrementCoinsUser(id: $id, value: $value) {
      id
      coins
    }
  }
`;

const DecrementCoinsUser = /* GraphQL */ `
  mutation decrementCoinsUser($id: ID!, $value: Int!) {
    decrementCoinsUser(id: $id, value: $value) {
      id
      coins
    }
  }
`;

const makeAppSyncRequest = async (variables, query) => {
  const req = new AWS.HttpRequest(appsyncUrl, region);
  req.method = "POST";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query,
    variables,
  });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  try {
    const response = await axios({
      method: "POST",
      url: appsyncUrl,
      data: req.body,
      headers: req.headers,
    });

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (err) {
    throw Error(err);
  }
};
