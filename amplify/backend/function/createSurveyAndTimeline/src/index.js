/* Amplify Params - DO NOT EDIT
	API_EFORUM_GRAPHQLAPIENDPOINTOUTPUT
	API_EFORUM_GRAPHQLAPIIDOUTPUT
	API_EFORUM_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
const AWS = require("aws-sdk");

const isLength = require("validator/es/lib/isLength");
const matches = require("validator/es/lib/matches");
const isAfter = require("date-fns/isAfter");
const parseISO = require("date-fns/parseISO");

const urlParse = require("url").URL;
const appsyncUrl = process.env.API_EFORUM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

/**
 * Todo-1: get survey questions and answers from request, startdate, endDate, userId, communityId
 * Todo-2: validate question characters to 140 chars and answers to 39 chars, answers maximum 5 minimum two
 * Todo-3: graphql schema for q&a and timeline and list community followers, increment user and community metrics
 * Todo-4: create questiona and answers and timeline
 * Todo-5: return poll question
 */
// while creating survey answers create it parallely

const validateContent = async (Content, minLength, maxLength) => {
  if (
    isLength(Content, { min: minLength, max: maxLength }) &&
    matches(
      Content,
      `^[A-Za-z][A-Za-z0-9 _|.,!]{${minLength},${maxLength}}$`,
      "m"
    )
  ) {
    return true;
  } else {
    return false;
  }
};

exports.handler = async (event, context, callback) => {
  let surveyQuestion = "";
  let surveyAnswers = [];
  let startDate = "";
  let endDate = "";
  let userId = "";
  let communityId = "";

  /**
   * question
   * answers ["string"]
   * startDate
   * endDate
   * userId
   * communityId
   */

  // survey questions validation
  if (event.arguments.question) {
    if (validateContent(event.arguments.question, 10, 140)) {
      surveyQuestion = event.arguments.question;
    } else {
      callback(
        `Survey question should be mininum 10 characters and
       maximum 140 characters and shouldn't contain
       special characters other than _|.,!`,
        null
      );
    }
  } else {
    callback(`Survey should contain survey questions`, null);
  }

  // survey answers validation
  if (
    event.arguments.answers &&
    Array.isArray(event.arguments.answers) &&
    event.arguments.answers.length >= 2 &&
    event.arguments.answers.length <= 5
  ) {
    event.arguments.answers.forEach((entry) => {
      if (validateContent(entry, 3, 30)) {
        surveyAnswers.push(entry);
      } else {
        callback(
          `Survey answers should be minimum 3 characters and maximum 30 characters and shouldn't contain
          special characters other than _|.,!`,
          null
        );
      }
    });
  } else {
    callback(
      `Survey should contain arrays for survey answers length between 2 and 5`,
      null
    );
  }

  // start date and end date validation.
  // start date should be greater than current date

  if (
    event.arguments.startDate &&
    event.arguments.endDate &&
    isAfter(
      parseISO(event.arguments.startDate),
      parseISO(event.arguments.endDate)
    )
  ) {
    startDate = event.arguments.startDate;
    endDate = event.arguments.endDate;
  } else {
    callback(`Survey start date be less than survey end date`, null);
  }

  // user and community id exist and user is member of that community and validate

  if (event.arguments.userId && event.arguments.communityId) {
    try {
      const isUserForumRelationExit = await makeAppSyncRequest(
        {
          userId: event.arguments.userId,
          communityId: event.arguments.communityId,
        },
        CheckUserForumRelation
      );

      const isUserForumRelationExistItems =
        isUserForumRelationExit.data?.listUserCommunityRelationShips.items;
      if (
        isUserForumRelationExistItems &&
        isUserForumRelationExistItems.length === 1
      ) {
        userId = event.arguments.userId;
        communityId = event.arguments.communityId;
      } else {
        callback(
          "can't able to create survey in community user doesn't exist in community"
        );
      }
    } catch (e) {
      callback(`Error occurred while checking user joined in community`, null);
    }
  } else {
    callback(`Survey should contain user and community id`, null);
  }

  try {
    // creating survey questions

    const createSurveyQuestionInput = {
      content: surveyQuestion,
      userId: userId,
      communityId: communityId,
      startDate: startDate,
      endDate: endDate,
    };

    const createdSurveyQuestion = await makeAppSyncRequest(
      { input: createSurveyQuestionInput },
      createSurveyQuestion
    );

    const createdSurveyQuestionId =
      createdSurveyQuestion.data?.createSurveyQuestion.id;

    // creating survey answers

    if (createdSurveyQuestionId) {
      await Promise.all(
        surveyAnswers.map(async (entry) => {
          const createSurveyAnswerInput = {
            content: entry,
            surveyQuestionId: createdSurveyQuestionId,
            userId: userId,
            communityId: communityId,
            voteCount: 0,
          };

          await makeAppSyncRequest(
            { input: createSurveyAnswerInput },
            createSurveyAnswer
          );
        })
      );

      // creating survey timeline for users

      // list members for communityId
      const listMembersResponse = await makeAppSyncRequest(
        { communityId: communityId, limit: 100000 },
        listMembersOfCommunity
      );

      if (listMembersResponse.data?.listUserCommunityRelationShips) {
        const members =
          listMembersResponse.data.listUserCommunityRelationShips.items;

        // creating timeline for users

        await Promise.all(
          members.map((entry) =>
            createSurveyTimelineForAUser({
              userId: entry.userId,
              surveyQuestionId: createdSurveyQuestionId,
            })
          )
        );
      }
    }
    return createdSurveyQuestion;
  } catch (err) {
    callback("Error occured while creating survey", null);
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

const createSurveyTimelineForAUser = async ({ userId, surveyQuestionId }) => {
  const createSurveyTimelineResponse = await makeAppSyncRequest(
    { input: { userId, surveyQuestionId } },
    createSurveyTimeline
  );
  return createSurveyTimelineResponse;
};

const createSurveyQuestion = /* GraphQL */ `
  mutation createSurveyQuestion($input: CreateSurveyQuestionInput!) {
    createSurveyQuestion(input: $input) {
      id
    }
  }
`;

const createSurveyAnswer = /* GraphQL */ `
  mutation createSurveyAnswer($input: CreateSurveyAnswerInput!) {
    createSurveyAnswer(input: $input) {
      id
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

const createSurveyTimeline = /* GraphQL */ `
  mutation createSurveyTimeline(
    $input: CreateSurveyTimelineInput!
    $condition: ModelSurveyTimelineConditionInput
  ) {
    createSurveyTimeline(input: $input, condition: $condition) {
      id
      userId
      surveyQuestionId
    }
  }
`;

const CheckUserForumRelation = /* GraphQL */ `
  query ListUserCommunityRelationShips($userId: ID!, $communityId: ID!) {
    listUserCommunityRelationShips(
      filter: {
        isDeleted: { attributeExists: false }
        userId: { eq: $userId }
        communityId: { eq: $communityId }
      }
    ) {
      items {
        id
        userId
        communityId
      }
    }
  }
`;
