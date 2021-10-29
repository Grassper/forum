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
const apiKey = process.env.API_EFORUM_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event, _, callback) => {
  let postInput;
  let postStats = {
    likes: 0,
    loves: 0,
    supports: 0,
    disLikes: 0,
  };

  if (event.arguments.type === "TEXT") {
    postInput = {
      type: event.arguments.type,
      content: event.arguments.content,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      ...postStats,
    };
  } else if (
    event.arguments.type === "AUDIO" ||
    event.arguments.type === "VIDEO" ||
    event.arguments.type === "IMAGE"
  ) {
    if (!event.arguments.mediaUrl) {
      callback(
        `post type of ${event.arguments.type} should contain mediaUrl`,
        null
      );
    }
    postInput = {
      type: event.arguments.type,
      content: event.arguments.content,
      mediaUrl: event.arguments.mediaUrl,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      ...postStats,
    };
  } else if (event.arguments.type === "POLL") {
    if (!event.arguments.poll) {
      callback(
        `post type of ${event.arguments.type} should contain arrays of poll`,
        null
      );
    }
    postInput = {
      type: event.arguments.type,
      content: event.arguments.content,
      poll: event.arguments.poll,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      ...postStats,
    };
  } else {
    callback(
      "post type should be any of text, audio, video, image, poll",
      null
    );
  }

  try {
    const req = new AWS.HttpRequest(appsyncUrl, region);
    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
      query: createPost,
      variables: { input: postInput },
    });

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const graphqlData = await axios({
      method: "POST",
      url: appsyncUrl,
      data: req.body,
      headers: req.headers,
    });

    const body = {
      message: "successfully created post!",
    };
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    console.log("error creating post: ", err);
  }
};

const createPost = `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      type
      content
      mediaUrl
      poll {
        id
        content
        votes
      }
      likes
      loves
      supports
      disLikes
      authorId
      communityId
      author {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      community {
        id
        name
        description
        bannerImageUrl
        profileImageUrl
        type
        creatorId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      comments {
        nextToken
        startedAt
      }
      userPostMetric {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;

const createTimeline = `
  mutation CreateTimeline(
    $input: CreateTimelineInput!
    $condition: ModelTimelineConditionInput
  ) {
    createTimeline(input: $input, condition: $condition) {
      id
      userId
      postId
      user {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      post {
        id
        type
        content
        mediaUrl
        likes
        loves
        supports
        disLikes
        authorId
        communityId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
