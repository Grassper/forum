import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";

import { AuthContext_, UserContext_ } from "@/root/src/context";

export const RegisterUserInDb = async (
  currentUser: any,
  updateUser: UserContext_["updateUser"],
  setAuthState: AuthContext_["setAuthState"]
) => {
  try {
    if (currentUser) {
      // check user exist in db
      const userData = (await API.graphql({
        query: getUser,
        variables: { id: currentUser.attributes.sub },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<getUser_>;

      if (userData.data?.getUser) {
        // if user already exist set state and return
        const { profileImageUrl, coins, about, _version } =
          userData.data.getUser;

        updateUser({
          id: currentUser.attributes.sub,
          username: currentUser.username,
          email: currentUser.attributes.email,
          about,
          profileImageUrl,
          coins,
          _version,
        });

        setAuthState("LOGGEDIN");
        return;
      }

      // if user is not registered. register user to db
      const newUser = {
        id: currentUser.attributes.sub,
        username: currentUser.username,
        email: currentUser.attributes.email,
        profileImageUrl: `https://avatars.dicebear.com/api/micah/${currentUser.attributes.sub}.svg`, // for user profile replace space with dash
        coins: 1000,
        about: "Hooray, Finally i'm am here",
      };

      const newUserMetrics = {
        id: currentUser.attributes.sub,
        postLikes: 0,
        postLoves: 0,
        postSupports: 0,
        postDislikes: 0,
        profileViews: 0,
        commentUpvotes: 0,
        commentDownvotes: 0,
        followers: 0,
        following: 0,
        totalPosts: 0,
        totalComments: 0,
        totalSurveys: 0,
        communitiesJoined: 0,
        communitiesModerating: 0,
        activeDays: 0,
        lastActiveDay: new Date().toISOString(),
      };

      await API.graphql({
        query: createUser,
        variables: { input: newUser },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: createUserMetrics,
        variables: { input: newUserMetrics },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      updateUser({
        id: currentUser.attributes.sub,
        username: currentUser.username,
        email: currentUser.attributes.email,
        about: newUser.about,
        profileImageUrl: newUser.profileImageUrl,
        coins: newUser.coins,
        _version: 1,
      });

      setAuthState("LOGGEDIN");
    }
  } catch (err) {
    console.log("Error occured while registering user in db", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type getUser_ = {
  getUser?: {
    id: string;
    profileImageUrl: string;
    coins: number;
    about: string;
    _version: number;
  };
};

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      profileImageUrl
      about
      coins
      _version
    }
  }
`;

const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

const createUserMetrics = /* GraphQL */ `
  mutation createUserMetrics($input: CreateUserMetricsInput!) {
    createUserMetrics(input: $input) {
      id
    }
  }
`;
