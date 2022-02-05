import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Skeleton } from "@/root/src/components/shared/Skeleton";

interface State_ {
  about: string;
  userMetrics: {
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
  };
}

interface Props_ {
  routeUserId: string;
}

export const About: React.FC<Props_> = ({ routeUserId }) => {
  const [about, setAbout] = React.useState<State_>();

  /**
   * todo update about from global state
   */

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
          setAbout(userData.data.getUser);
        }
      } catch (err) {
        console.error(
          "error while fetching user about data in about tab in profile page",
          err
        );
      }
    };

    fetchCall();

    return () => {
      isActive = false;
    };
  }, [routeUserId]);

  React.useEffect(populateContent, [populateContent]);

  return (
    <Box alignItems="center" bg="white" style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Box>
          {about?.about ? (
            <Text mb="8" numberOfLines={4}>
              {about?.about}
            </Text>
          ) : (
            <Box alignItems="center">
              <Skeleton height="20px" mb="5px" width="85%" />
              <Skeleton height="20px" mb="5px" width="95%" />
              <Skeleton height="20px" mb="5px" width="70%" />
            </Box>
          )}
        </Box>

        <HStack flexWrap="wrap" justifyContent="space-between" mb="5">
          {about?.userMetrics && about.userMetrics.postLikes >= 0 ? (
            <StatsItem name="Post Likes" value={about.userMetrics.postLikes} />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postLoves >= 0 ? (
            <StatsItem name="Post Loves" value={about.userMetrics.postLoves} />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postSupports >= 0 ? (
            <StatsItem
              name="Post Supports"
              value={about.userMetrics.postSupports}
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postDislikes >= 0 ? (
            <StatsItem
              name="Post Dislikes"
              value={about.userMetrics.postDislikes}
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.commentUpvotes >= 0 ? (
            <StatsItem
              name="Comment Ups"
              value={about.userMetrics.commentUpvotes}
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.commentDownvotes >= 0 ? (
            <StatsItem
              name="Comment Downs"
              value={about.userMetrics.commentDownvotes}
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.activeDays >= 0 ? (
            <StatsItem
              name="Active Days"
              value={about.userMetrics.activeDays}
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.profileViews >= 0 ? (
            <StatsItem
              name="Profile Views"
              value={about.userMetrics.profileViews}
            />
          ) : (
            <StatsItem />
          )}
        </HStack>
      </ScrollView>
    </Box>
  );
};

interface StatsItem_ {
  value?: number;
  name?: string;
}

const StatsItem: React.FC<StatsItem_> = ({ value, name }) => {
  return (
    <VStack alignItems="center" mb="3" width="50%">
      <Box>
        {value !== undefined && value >= 0 ? (
          <Text
            color="eGreen.400"
            fontSize="md"
            fontWeight="600"
            marginBottom="1"
          >
            {value}
          </Text>
        ) : (
          <Skeleton height="20px" mb="5px" width="80px" />
        )}
      </Box>
      <Box>
        {name ? (
          <Text color="coolGray.700">{name}</Text>
        ) : (
          <Skeleton height="20px" mb="5px" width="150px" />
        )}
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    flex: 1,
  },
});

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
      about
      userMetrics {
        postLikes
        postLoves
        postSupports
        postDislikes
        profileViews
        commentUpvotes
        commentDownvotes
        activeDays
      }
    }
  }
`;
