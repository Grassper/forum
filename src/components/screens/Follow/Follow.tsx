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
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  ProfileStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { FollowCard } from "@/root/src/components/shared/Cards";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList_, "Follow">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<ProfileStackParamList_, "Follow">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const Follow: React.FC<Props_> = ({ route }) => {
  const title = route.params?.title;
  const routeUserId = route.params?.routeUserId;
  const [usersList, setUsersList] = React.useState<
    (FollowersItems_ | FollowingItems_)[]
  >([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const [loading, setLoading] = React.useState(false);

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (routeUserId) {
        setLoading(true);
        if (title === "Following") {
          const followingInput: UserRelationshipFetchInput_ = {
            limit: 10,
            id: routeUserId,
            relationship: "FOLLOWING",
          };

          const responseData = await UserRelationshipFetch(followingInput);

          if (responseData && isActive) {
            setUsersList(responseData.items);
            setNextToken(responseData.nextToken);
          }
          if (isActive) {
            setLoading(false);
          }
        } else if (title === "Followers") {
          const followersInput: UserRelationshipFetchInput_ = {
            limit: 10,
            id: routeUserId,
            relationship: "FOLLOWERS",
          };

          const responseData = await UserRelationshipFetch(followersInput);

          if (responseData && isActive) {
            setUsersList(responseData.items);
            setNextToken(responseData.nextToken);
          }
          if (isActive) {
            setLoading(false);
          }
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [routeUserId, title]);

  useFocusEffect(populateContent);

  const FollowerCardRenderer: ListRenderItem<FollowersItems_> = ({ item }) => {
    return (
      <FollowCard
        id={item.follower.id}
        username={item.follower.username}
        avatarUrl={item.follower.profileImageUrl}
      />
    );
  };

  const FollowingCardRenderer: ListRenderItem<FollowingItems_> = ({ item }) => {
    return (
      <FollowCard
        id={item.followee.id}
        username={item.followee.username}
        avatarUrl={item.followee.profileImageUrl}
      />
    );
  };

  const handlePagination = async () => {
    if (nextToken && routeUserId) {
      if (title === "Following") {
        const followingInput: UserRelationshipFetchInput_ = {
          limit: 10,
          id: routeUserId,
          nextToken,
          relationship: "FOLLOWING",
        };

        const responseData = await UserRelationshipFetch(followingInput);

        if (responseData) {
          setUsersList((prevState) => [...prevState, ...responseData.items]);
          setNextToken(responseData.nextToken);
        }
      } else if (title === "Followers") {
        const followersInput: UserRelationshipFetchInput_ = {
          limit: 10,
          id: routeUserId,
          nextToken,
          relationship: "FOLLOWERS",
        };

        const responseData = await UserRelationshipFetch(followersInput);
        if (responseData) {
          setUsersList((prevState) => [...prevState, ...responseData.items]);
          setNextToken(responseData.nextToken);
        }
      }
    }
  };

  return (
    <Box style={styles.container} bg="white" pt="4">
      {!loading ? (
        <>
          {title === "Following" ? (
            <FlatList
              data={usersList as FollowingItems_[]}
              renderItem={FollowingCardRenderer}
              keyExtractor={(item) => item.followee.id}
              onEndReached={() => handlePagination()}
            />
          ) : (
            <FlatList
              data={usersList as FollowersItems_[]}
              renderItem={FollowerCardRenderer}
              keyExtractor={(item) => item.follower.id}
              onEndReached={() => handlePagination()}
            />
          )}
        </>
      ) : (
        <ScrollView>
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
        </ScrollView>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * api calls
 */
interface UserRelationshipFetchInput_ {
  id: string;
  limit: number;
  nextToken?: string;
  relationship: "FOLLOWERS" | "FOLLOWING";
}

const UserRelationshipFetch = async (args: UserRelationshipFetchInput_) => {
  try {
    const { relationship, ...input } = args;

    if (relationship === "FOLLOWING") {
      const listFollowingUserData = (await API.graphql({
        query: GetFollowingByUserId,
        variables: input,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<GetFollowingByUserId_>;

      if (listFollowingUserData.data?.getUser) {
        const followingData = listFollowingUserData.data.getUser.followees;
        return followingData;
      }
    } else if (relationship === "FOLLOWERS") {
      const listFollowersUserData = (await API.graphql({
        query: GetFollowersByUserId,
        variables: input,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<GetFollowersByUserId_>;

      if (listFollowersUserData.data?.getUser) {
        const followersData = listFollowersUserData.data.getUser.followers;
        return followersData;
      }
    }
  } catch (err) {
    console.error(
      "Error occured while fetch the following in follow screen",
      err
    );
  }
};

interface GetFollowingByUserId_ {
  getUser?: {
    followees: {
      items: FollowingItems_[];
      nextToken: string;
    };
  };
}

interface GetFollowersByUserId_ {
  getUser?: {
    followers: {
      items: FollowersItems_[];
      nextToken: string;
    };
  };
}

interface FollowingItems_ {
  followee: {
    id: string;
    username: string;
    profileImageUrl: string;
  };
}

interface FollowersItems_ {
  follower: {
    id: string;
    username: string;
    profileImageUrl: string;
  };
}

const GetFollowingByUserId = /* GraphQL */ `
  query getFollowing($id: ID!, $nextToken: String, $limit: Int) {
    getUser(id: $id) {
      followees(
        limit: $limit
        nextToken: $nextToken
        sortDirection: DESC
        filter: { isDeleted: { attributeExists: false } }
      ) {
        items {
          followee {
            id
            username
            profileImageUrl
          }
        }
        nextToken
      }
    }
  }
`;

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
        nextToken
      }
    }
  }
`;
