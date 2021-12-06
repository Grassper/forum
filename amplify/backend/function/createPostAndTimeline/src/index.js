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

exports.handler = async (event, context, callback) => {
  // check user making request id and passed ids are equal and it exist in db

  // check communityId exist in db

  // sorting using timestamp

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
      tags: event.arguments.tags,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      postedDate: event.arguments.postedDate,
      ...postStats,
    };
  } else if (
    event.arguments.type === "AUDIO" ||
    event.arguments.type === "VIDEO" ||
    event.arguments.type === "IMAGE"
  ) {
    if (!event.arguments.mediaS3Key) {
      callback(
        `post type of ${event.arguments.type} should contain mediaS3Key`,
        null
      );
    }

    postInput = {
      type: event.arguments.type,
      content: event.arguments.content,
      mediaS3Key: event.arguments.mediaS3Key,
      tags: event.arguments.tags,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      postedDate: event.arguments.postedDate,
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
      tags: event.arguments.tags,
      authorId: event.arguments.authorId,
      communityId: event.arguments.communityId,
      postedDate: event.arguments.postedDate,
      ...postStats,
    };
  } else {
    callback(
      "post type should be any of text, audio, video, image, poll",
      null
    );
  }

  try {
    const postResponse = await makeAppSyncRequest(
      { input: postInput },
      createPost
    );
    const post = postResponse.data?.createPost;

    if (post) {
      // list members for communityId

      const listMembersResponse = await makeAppSyncRequest(
        { communityId: post.communityId, limit: 100000 },
        listMembersOfCommunity
      );

      if (listMembersResponse.data?.listUserCommunityRelationShips) {
        const members =
          listMembersResponse.data.listUserCommunityRelationShips.items;

        // creating timeline for users

        await Promise.all(
          members.map((entry) =>
            createTimelineForAUser({ userId: entry.userId, postId: post.id })
          )
        );
      }
    }

    return post;
  } catch (err) {
    console.log("error creating post: ", err);
  }
};

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

  const { data } = await axios({
    method: "POST",
    url: appsyncUrl,
    data: req.body,
    headers: req.headers,
  });

  return data;
};

const createTimelineForAUser = async ({ userId, postId }) => {
  const createTimelineResponse = await makeAppSyncRequest(
    { input: { userId, postId } },
    createTimeline
  );
  return createTimelineResponse;
};

const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      communityId
    }
  }
`;

const listMembersOfCommunity = /* GraphQL */ `
  query listMembersByCommunity($communityId: ID, $limit: Int) {
    listUserCommunityRelationShips(
      filter: {
        communityId: { eq: $communityId }
        isDeleted: { attributeExists: false }
      }
      limit: $limit
    ) {
      items {
        userId
      }
    }
  }
`;

const createTimeline = /* GraphQL */ `
  mutation CreateTimeline(
    $input: CreateTimelineInput!
    $condition: ModelTimelineConditionInput
  ) {
    createTimeline(input: $input, condition: $condition) {
      id
      userId
      postId
    }
  }
`;
