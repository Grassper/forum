import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { API } from "aws-amplify";
import { format } from "date-fns";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import { InteractionManager } from "react-native";
import { SvgUri } from "react-native-svg";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { UserContext } from "@/root/src/context";

interface Props_ {
  routeUserId: string;
}

interface State_ {
  profileImageUrl: string;
  username: string;
  createdAt: Date;
  userMetrics: {
    followers: number;
    following: number;
    totalPosts: number;
  };
  followers: {
    items: {
      id: string;
      followerId: string;
      followeeId: string;
    }[];
  };
}

export const ProfileCard: React.FC<Props_> = ({ routeUserId }) => {
  const [relationship, setRelationship] = useState<"FOLLOW" | "NOTFOLLOW">(
    "NOTFOLLOW"
  );

  const navigation = useNavigation();

  const {
    user: { id },
  } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState<State_>();

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      try {
        // check user data for user id passed using route params
        const userData = (await API.graphql({
          query: getUser,
          variables: { id: routeUserId, currentUserId: id },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as GraphQLResult<getUser_>;

        if (userData.data?.getUser) {
          setProfile(userData.data.getUser);
          const followersItems = userData.data.getUser.followers.items;
          if (
            followersItems.length === 1 &&
            followersItems[0].followerId === id
          ) {
            setRelationship("FOLLOW");
          }
        }
      } catch (err) {
        console.error("error while fetching user data in profile page", err);
      }
    };

    fetchCall();
  }, [id, routeUserId]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
      });
      return () => task.cancel();
    }, [populateContent])
  );

  const RelationshipHandler = () => {
    if (routeUserId && id && routeUserId !== id) {
      if (relationship === "NOTFOLLOW") {
        setRelationship("FOLLOW");

        // create relationship call
        FollowRelationshipFetch({
          followeeId: routeUserId,
          followerId: id,
          action: "ADD",
        });
      } else {
        setRelationship("NOTFOLLOW");

        // delete relationship call
        FollowRelationshipFetch({
          followeeId: routeUserId,
          followerId: id,
          action: "DELETE",
        });
      }
    }
  };

  return (
    <Box alignItems="center" mt="5">
      {
        <Box
          bg={profile?.profileImageUrl ? "amber.100" : "transparent"}
          borderRadius="full"
          height="80px"
          mb="10px"
          overflow="hidden"
          width="80px"
        >
          {profile?.profileImageUrl ? (
            <SvgUri height="100%" uri={profile.profileImageUrl} width="100%" />
          ) : (
            <Skeleton height="100%" width="100%" />
          )}
        </Box>
      }
      <Box>
        {profile?.username ? (
          <Text fontFamily="heading" fontSize="22px" mb="5px">
            {profile.username}
          </Text>
        ) : (
          <Skeleton height="20px" mb="5px" width="150px" />
        )}
      </Box>
      <Box>
        {profile?.createdAt ? (
          <Text fontSize="12px" mb="15px">
            Joined {format(new Date(profile.createdAt), "MMM yyyy")}
          </Text>
        ) : (
          <Skeleton height="20px" mb="15px" width="100px" />
        )}
      </Box>

      {routeUserId && routeUserId !== id && profile?.userMetrics && (
        // checking our user id with incoming user id to show follow button
        <Button
          bg={relationship === "NOTFOLLOW" ? "tertiary.500" : "danger.500"}
          borderRadius="50"
          mb="5"
          minWidth="24"
          onPress={RelationshipHandler}
          variant="unstyled"
        >
          {relationship === "NOTFOLLOW" ? "Follow" : "Unfollow"}
        </Button>
      )}
      <HStack alignItems="center" justifyContent="center" mb="15px">
        {profile?.userMetrics && profile.userMetrics.followers >= 0 ? (
          <StatsCard
            count={profile.userMetrics.followers}
            countName="Followers"
            onPress={() => {
              navigation.dispatch(
                StackActions.push("Application", {
                  screen: "Follow",
                  params: { title: "Followers", routeUserId },
                })
              );
            }}
          />
        ) : (
          <StatsCard />
        )}

        {profile?.userMetrics && profile.userMetrics.following >= 0 ? (
          <StatsCard
            count={profile.userMetrics.following}
            countName="Following"
            onPress={() => {
              navigation.dispatch(
                StackActions.push("Application", {
                  screen: "Follow",
                  params: { title: "Following", routeUserId },
                })
              );
            }}
          />
        ) : (
          <StatsCard />
        )}

        {profile?.userMetrics && profile.userMetrics.totalPosts >= 0 ? (
          <StatsCard count={profile.userMetrics.totalPosts} countName="Posts" />
        ) : (
          <StatsCard />
        )}
      </HStack>
    </Box>
  );
};

interface StatsCard_ {
  onPress?: () => void;
  count?: number;
  countName?: string;
}

const StatsCard: React.FC<StatsCard_> = ({ onPress, count, countName }) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        alignItems="center"
        justifyContent="center"
        minWidth="80px"
        mx="10px"
      >
        <Box>
          {count !== undefined && count >= 0 ? (
            <Text fontSize="16px" fontWeight="600" lineHeight="24px" mb="5px">
              {count}
            </Text>
          ) : (
            <Skeleton height="20px" mb="5px" width="80px" />
          )}
        </Box>
        <Box>
          {countName ? (
            <Text
              color="eGreen.400"
              fontSize="14px"
              fontWeight="500"
              lineHeight="21px"
            >
              {countName}
            </Text>
          ) : (
            <Skeleton height="20px" mb="5px" width="80px" />
          )}
        </Box>
      </VStack>
    </Pressable>
  );
};

/**
 * api
 */

interface CreateFollowRelationshipFetchInput_ {
  followerId: string;
  followeeId: string;
}

interface DeleteFollowRelationshipFetchInput_ {
  id: string;
  followerId: string;
  followeeId: string;
  isDeleted: boolean;
}

interface FollowRelationshipFetchInput_ {
  followerId: string;
  followeeId: string;
  action: "ADD" | "DELETE";
}

const FollowRelationshipFetch = async (
  input: FollowRelationshipFetchInput_
) => {
  try {
    // check if follow relationship exist

    const isRelationshipExist = (await API.graphql({
      query: CheckFollowRelationship,
      variables: {
        followeeId: input.followeeId,
        followerId: input.followerId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckFollowRelationship_>;

    const isRelationshipExistItems =
      isRelationshipExist.data?.listFollowRelationships.items;

    // if relationship doesnt exist, create on
    if (
      isRelationshipExistItems &&
      isRelationshipExistItems.length === 0 &&
      input.action === "ADD"
    ) {
      const createRelationshipInput: CreateFollowRelationshipFetchInput_ = {
        followeeId: input.followeeId,
        followerId: input.followerId,
      };

      const createdRelationship = (await API.graphql({
        query: CreateFollowRelationship,
        variables: {
          input: createRelationshipInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateFollowRelationship_>;

      if (createdRelationship.data?.createFollowRelationship) {
        /**
         * increment follower metrics in followee users metrics
         * increment following metrics in follower users metrics
         */

        await API.graphql({
          query: MetricsQueryPicker.FOLLOWERS.INCREMENT,
          variables: {
            id: input.followeeId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker.FOLLOWING.INCREMENT,
          variables: {
            id: input.followerId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return createdRelationship.data.createFollowRelationship.id;
      }
    } else if (
      isRelationshipExistItems &&
      isRelationshipExistItems.length === 1 &&
      input.action === "DELETE"
    ) {
      const deletedRelationshipInput: DeleteFollowRelationshipFetchInput_ = {
        id: isRelationshipExistItems[0].id,
        followeeId: input.followeeId,
        followerId: input.followerId,
        isDeleted: true,
      };

      const deletedRelationship = (await API.graphql({
        query: DeleteFollowRelationship,
        variables: {
          input: deletedRelationshipInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<DeleteFollowRelationship_>;

      if (deletedRelationship.data?.updateFollowRelationship) {
        /**
         * decrement follower metrics in followee users metrics
         * decrement following metrics in follower users metrics
         */

        await API.graphql({
          query: MetricsQueryPicker.FOLLOWERS.DECREMENT,
          variables: {
            id: input.followeeId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker.FOLLOWING.DECREMENT,
          variables: {
            id: input.followerId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return deletedRelationship.data.updateFollowRelationship.id;
      }
    }
  } catch (err) {
    console.error(
      "Error occured while creating or deleting follow relationship in profile card",
      err
    );
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

/**
 * Todo-2: followers and following metrics resolvers
 */

/**
 * if user click follow button create the user follow relationships.
 * increment follower metrics in followee users metrics
 * increment following metrics in follower users metrics
 */

/**
 * if user click unfollow button delete the user follow relationships.
 * decrement follower metrics in followee users metrics
 * decrement following metrics in follower users metrics
 */

type getUser_ = {
  getUser?: State_;
};

const getUser = /* GraphQL */ `
  query GetUser($id: ID!, $currentUserId: ID!) {
    getUser(id: $id) {
      profileImageUrl
      username
      createdAt
      userMetrics {
        followers
        following
        totalPosts
      }
      followers(
        filter: {
          isDeleted: { attributeExists: false }
          followerId: { eq: $currentUserId }
        }
      ) {
        items {
          id
          followerId
          followeeId
        }
      }
    }
  }
`;

interface CreateFollowRelationship_ {
  createFollowRelationship: Item;
}

interface DeleteFollowRelationship_ {
  updateFollowRelationship: Item;
}

interface CheckFollowRelationship_ {
  listFollowRelationships: { items: Item[] };
}

interface Item {
  id: string;
  followerId: string;
  followeeId: string;
}

const CreateFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship($input: CreateFollowRelationshipInput!) {
    createFollowRelationship(input: $input) {
      id
      followerId
      followeeId
    }
  }
`;

const DeleteFollowRelationship = /* GraphQL */ `
  mutation UpdateFollowRelationship($input: UpdateFollowRelationshipInput!) {
    updateFollowRelationship(input: $input) {
      id
      followerId
      followeeId
    }
  }
`;

const CheckFollowRelationship = /* GraphQL */ `
  query CheckFollowRelationship($followeeId: ID!, $followerId: ID!) {
    listFollowRelationships(
      filter: {
        isDeleted: { attributeExists: false }
        followeeId: { eq: $followeeId }
        followerId: { eq: $followerId }
      }
    ) {
      items {
        id
        followerId
        followeeId
      }
    }
  }
`;

/**
 * user metrics
 */

const IncrementFollowersUserMetrics = /* GraphQL */ `
  mutation incrementFollowersUserMetrics($id: ID!) {
    incrementFollowersUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementFollowersUserMetrics = /* GraphQL */ `
  mutation decrementFollowersUserMetrics($id: ID!) {
    decrementFollowersUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementFollowingUserMetrics = /* GraphQL */ `
  mutation incrementFollowingUserMetrics($id: ID!) {
    incrementFollowingUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementFollowingUserMetrics = /* GraphQL */ `
  mutation decrementFollowingUserMetrics($id: ID!) {
    decrementFollowingUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  FOLLOWERS: {
    INCREMENT: IncrementFollowersUserMetrics,
    DECREMENT: DecrementFollowersUserMetrics,
  },
  FOLLOWING: {
    INCREMENT: IncrementFollowingUserMetrics,
    DECREMENT: DecrementFollowingUserMetrics,
  },
};
