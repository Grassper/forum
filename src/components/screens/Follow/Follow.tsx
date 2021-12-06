import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box } from "native-base";
import React from "react";

import {
  DrawerParamList_,
  ProfileStackParamList_,
} from "@/root/src/components/navigations/Navigation";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList_, "Follow">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<ProfileStackParamList_, "Follow">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const Follow: React.FC<Props_> = ({ navigation, route }) => {
  const title = route.params?.title;
  const routeUserId = route.params?.routeUserId;
  const [usersList, setUsersList] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (title === "Following") {
        const follwersInput: followingFetchInput_ = {
          limit: 10,
          id: routeUserId,
          nextToken,
        };

        const responseData = await followingFetch(follwersInput);
        if (responseData && isActive) {
          setUsersList(responseData.items);
          // setNextToken(responseData.items.);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [title]);
  return <Box bg="white" flex="1" alignItems="center" />;
};

// {
//   "id": "be7cb66a-9a35-4581-b570-a791cb1c3e0b"
// }

const GetFollowersByUserId = /* GraphQL */ `
  query getFollowers($id: ID!, $nextToken: String, $limit: Int) {
    getUser(id: $id) {
      followers(
        nextToken: $nextToken
        limit: $limit
        sortDirection: DESC
        filter: { isDeleted: { attributeExists: false } }
      ) {
        items {
          follower {
            id
            username
            profileImageUrl
          }
        }
      }
    }
  }
`;

/**
 * api calls
 */
interface followingFetchInput_ {
  limit: number;
  id: string;
  nextToken?: string;
}

const followingFetch = async (input: followingFetchInput_) => {
  try {
    const listFollowingUserData = (await API.graphql({
      query: GetFollowingByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<GetFollowingByUserId_>;

    if (listFollowingUserData.data?.getUser) {
      const followingData = listFollowingUserData.data.getUser.followees;
      return followingData;
    }
  } catch (err) {
    console.error(
      "Error occured while fetch the following in follow screen",
      err
    );
  }
};

interface GetFollowingByUserId_ {
  getUser?: GetUser;
}

interface GetUser {
  followees: Followees;
}

interface Followees {
  items: Item[];
}

interface Item {
  followee: Followee;
}

interface Followee {
  id: string;
  username: string;
  profileImageUrl: string;
}

const GetFollowingByUserId = /* GraphQL */ `
  query getFollowing($id: ID!, $nextToken: String, $limit: Int) {
    getUser(id: $id) {
      followees(limit: $limit, nextToken: $nextToken) {
        items {
          followee {
            id
            username
            profileImageUrl
          }
        }
      }
    }
  }
`;
