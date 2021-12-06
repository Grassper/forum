import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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

interface Props_ {}

export const Follow: React.FC<Props_> = () => {
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
