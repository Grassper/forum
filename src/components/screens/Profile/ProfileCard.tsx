import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "aws-amplify";
import { format } from "date-fns";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { UserContext } from "@/root/src/context";
import { useToggle } from "@/root/src/hooks";

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
}

export const ProfileCard: React.FC<Props_> = ({ routeUserId }) => {
  const [value, toggleValue] = useToggle(true);

  const {
    user: { id },
  } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState<State_>();

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      try {
        // check user data for user id passed using route params
        const userData = (await API.graphql({
          query: getUser,
          variables: { id: routeUserId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as GraphQLResult<getUser_>;

        if (userData.data?.getUser && isActive) {
          setProfile(userData.data.getUser);
        }
      } catch (err) {
        console.error("error while fetching user data in profile page", err);
      }
    };

    fetchCall();

    return () => {
      isActive = false;
    };
  }, [routeUserId]);

  useFocusEffect(populateContent);

  return (
    <Box alignItems="center" mt="5">
      {
        <Box
          width="80px"
          height="80px"
          bg={profile?.profileImageUrl ? "amber.100" : "transparent"}
          borderRadius="full"
          overflow="hidden"
          mb="10px"
        >
          {profile?.profileImageUrl ? (
            <SvgUri uri={profile.profileImageUrl} width="100%" height="100%" />
          ) : (
            <Skeleton width="100%" height="100%" />
          )}
        </Box>
      }
      <Box>
        {profile?.username ? (
          <Text fontFamily="heading" fontSize="22px" mb="5px">
            {profile.username}
          </Text>
        ) : (
          <Skeleton height="20px" width="150px" mb="5px" />
        )}
      </Box>
      <Box>
        {profile?.createdAt ? (
          <Text fontSize="12px" mb="15px">
            Joined {format(new Date(profile.createdAt), "MMM yyyy")}
          </Text>
        ) : (
          <Skeleton height="20px" width="100px" mb="15px" />
        )}
      </Box>

      {routeUserId && routeUserId !== id && profile?.userMetrics && (
        // checking our user id with incoming user id to show follow button
        <Button
          onPress={() => toggleValue()}
          bg={value ? "tertiary.500" : "danger.500"}
          variant="unstyled"
          mb="5"
          minWidth="24"
          borderRadius="50"
        >
          {value ? "Follow" : "Unfollow"}
        </Button>
      )}
      <HStack alignItems="center" justifyContent="center" mb="15px">
        {profile?.userMetrics && profile.userMetrics.followers >= 0 ? (
          <StatsCard
            onPress={() => {}}
            count={profile.userMetrics.followers}
            countName="Followers"
          />
        ) : (
          <StatsCard />
        )}

        {profile?.userMetrics && profile.userMetrics.following >= 0 ? (
          <StatsCard
            onPress={() => {}}
            count={profile.userMetrics.following}
            countName="Following"
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
            <Skeleton height="20px" width="80px" mb="5px" />
          )}
        </Box>
        <Box>
          {countName ? (
            <Text
              fontSize="14px"
              fontWeight="500"
              lineHeight="21px"
              color="eGreen.400"
            >
              {countName}
            </Text>
          ) : (
            <Skeleton height="20px" width="80px" mb="5px" />
          )}
        </Box>
      </VStack>
    </Pressable>
  );
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type getUser_ = {
  getUser?: State_;
};

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      profileImageUrl
      username
      createdAt
      userMetrics {
        followers
        following
        totalPosts
      }
    }
  }
`;
