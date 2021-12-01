import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Skeleton } from "@/root/src/components/shared/Skeleton";

import { TabNavigatorUserContext } from "./Context";

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

export const About: React.FC = () => {
  const routeUserId = React.useContext(TabNavigatorUserContext);
  const [about, setAbout] = React.useState<State_>();

  /**
   * todo update about from global state
   */

  const populateContent = React.useCallback(async () => {
    try {
      // check user data for user id passed using route params
      const userData = (await API.graphql({
        query: getUser,
        variables: { id: routeUserId },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<getUser_>;

      if (userData.data?.getUser) {
        setAbout(userData.data.getUser);
      }
    } catch (err) {
      console.error(
        "error while fetching user about data in about tab in profile page",
        err
      );
    }
  }, [routeUserId]);

  React.useEffect(() => {
    populateContent();
  }, [populateContent]);

  return (
    <Box style={styles.wrapper} alignItems="center" bg="white">
      <ScrollView style={styles.container}>
        <Box>
          {about?.about ? (
            <Text numberOfLines={4} mb="8">
              {about?.about}
            </Text>
          ) : (
            <Box alignItems="center">
              <Skeleton height="20px" width="85%" mb="5px" />
              <Skeleton height="20px" width="95%" mb="5px" />
              <Skeleton height="20px" width="70%" mb="5px" />
            </Box>
          )}
        </Box>

        <HStack flexWrap="wrap" justifyContent="space-between" mb="5">
          {about?.userMetrics && about.userMetrics.postLikes >= 0 ? (
            <StatsItem value={about.userMetrics.postLikes} name="Post Likes" />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postLoves >= 0 ? (
            <StatsItem value={about.userMetrics.postLoves} name="Post Loves" />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postSupports >= 0 ? (
            <StatsItem
              value={about.userMetrics.postSupports}
              name="Post Supports"
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.postDislikes >= 0 ? (
            <StatsItem
              value={about.userMetrics.postDislikes}
              name="Post Dislikes"
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.commentUpvotes >= 0 ? (
            <StatsItem
              value={about.userMetrics.commentUpvotes}
              name="Comment Ups"
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.commentDownvotes >= 0 ? (
            <StatsItem
              value={about.userMetrics.commentDownvotes}
              name="Comment Downs"
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.commentDownvotes >= 0 ? (
            <StatsItem
              value={about.userMetrics.commentDownvotes}
              name="Comment Downs"
            />
          ) : (
            <StatsItem />
          )}
          {about?.userMetrics && about.userMetrics.activeDays >= 0 ? (
            <StatsItem
              value={about.userMetrics.activeDays}
              name="Active Days"
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
    <VStack width="50%" alignItems="center" mb="3">
      <Box>
        {value !== undefined && value >= 0 ? (
          <Text
            color="eGreen.400"
            fontWeight="600"
            fontSize="md"
            marginBottom="1"
          >
            {value}
          </Text>
        ) : (
          <Skeleton height="20px" width="80px" mb="5px" />
        )}
      </Box>
      <Box>
        {name ? (
          <Text color="coolGray.700">{name}</Text>
        ) : (
          <Skeleton height="20px" width="150px" mb="5px" />
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
