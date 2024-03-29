import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Button, Divider, HStack, Input, Spinner } from "native-base";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import isLength from "validator/es/lib/isLength";
import xssFilters from "xss-filters";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditReplies">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "AddAndEditReplies">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditReplies: React.FC<Props_> = ({ navigation, route }) => {
  const [reply, setReply] = React.useState("");

  const [isReplyValid, setReplyValid] = React.useState(false);
  const [replyErrorMsg, setReplyErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { action, ...comment } = route.params;
  const currentUser = React.useContext(UserContext).user;

  const handleSubmit = React.useCallback(async () => {
    if (
      isReplyValid &&
      currentUser.id &&
      comment.postId &&
      comment.subForumId &&
      comment.commentId
    ) {
      setLoading(true);
      const commentInput: createCommentHandlerInput_ = {
        content: reply,
        postId: comment.postId,
        communityId: comment.subForumId,
        authorId: currentUser.id,
        upvote: 0,
        downvote: 0,
        repliesCount: 0,
        commentedDate: new Date(),
        parentCommentId: comment.commentId,
      };

      const createCommentResponse = await createCommentHandler(commentInput);

      if (createCommentResponse) {
        navigation.goBack();
      }
      setLoading(false);
    } else {
      Alert.alert(replyErrorMsg);
    }
  }, [
    comment.commentId,
    comment.postId,
    comment.subForumId,
    currentUser.id,
    isReplyValid,
    navigation,
    reply,
    replyErrorMsg,
  ]);

  React.useEffect(() => {
    const validateReply = () => {
      if (isLength(reply, { min: 1, max: 2200 })) {
        setReplyValid(true);
        setReplyErrorMsg("");
      } else {
        setReplyValid(false);
        setReplyErrorMsg("Reply Content Shouldn't be empty");
      }
    };
    validateReply();
  }, [reply]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <Button
          _text={{ fontWeight: "600", color: "white" }}
          onPress={!loading ? handleSubmit : null}
          size="md"
          variant="unstyled"
        >
          {!loading ? (
            action === "Add" ? (
              "Post"
            ) : (
              "Update"
            )
          ) : (
            <Spinner color="white" />
          )}
        </Button>
      ),
    });
  }, [action, handleSubmit, navigation, loading]);

  const sanitizeReply = (text: string) => {
    setReply(xssFilters.inHTMLData(text));
  };

  return (
    <Box bg="white" style={styles.container}>
      <Box>
        <CommentCard hideCommentUserActions hideReplyButton {...comment} />
        <Divider />
      </Box>
      <Box bg="white" mt="2" py="4">
        <HStack alignItems="flex-start" justifyContent="center">
          <Input
            borderRadius="md"
            fontSize="sm"
            multiline
            onChangeText={sanitizeReply}
            placeholder="Type some goods!"
            placeholderTextColor="muted.400"
            value={reply}
            variant="unstyled"
            width="90%"
          />
        </HStack>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * api
 */
interface createCommentHandlerInput_ {
  content: string;
  postId: string;
  communityId: string;
  authorId: string;
  upvote: number;
  downvote: number;
  commentedDate: Date;
  repliesCount: number;
  parentCommentId: string;
}

const createCommentHandler = async (args: createCommentHandlerInput_) => {
  try {
    const { parentCommentId, ...input } = args;
    const createCommentData = (await API.graphql({
      query: createComment,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createComment_>;

    if (createCommentData.data?.createComment) {
      const createRelationInput = {
        parentCommentId: parentCommentId,
        childCommentId: createCommentData.data.createComment.id,
        postId: input.postId,
      };
      const createRelationship = (await API.graphql({
        query: createParentChildCommentRelationship,
        variables: { input: createRelationInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<createParentChildCommentRelationship_>;

      /**
       * increment replies for comment
       * increment total comment for user and community
       */
      await API.graphql({
        query: incrementCommentRepliesCount,
        variables: { id: parentCommentId },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.USERMETRICS.TOTALCOMMENTS.INCREMENT,
        variables: {
          id: input.authorId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.COMMUNITY.TOTALCOMMENTS.INCREMENT,
        variables: {
          id: input.communityId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      if (createRelationship.data?.createParentChildCommentRelationship) {
        return createRelationship.data.createParentChildCommentRelationship.id;
      }
    }
  } catch (err) {
    console.error(
      "Error occured while creating comment in add and edit replies page",
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

type createComment_ = {
  createComment?: {
    id: string;
  };
};

const createComment = /* GraphQL */ `
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`;

type createParentChildCommentRelationship_ = {
  createParentChildCommentRelationship?: {
    id: string;
  };
};

const createParentChildCommentRelationship = /* GraphQL */ `
  mutation createParentChildCommentRelationship(
    $input: CreateParentChildCommentRelationshipInput!
  ) {
    createParentChildCommentRelationship(input: $input) {
      id
    }
  }
`;

const incrementCommentRepliesCount = /* GraphQL */ `
  mutation incrementCommentRepliesCount($id: ID!) {
    incrementRepliesCount(id: $id) {
      id
    }
  }
`;

/**
 * community metrics
 */
const IncrementTotalCommentsCommunity = /* GraphQL */ `
  mutation incrementTotalCommentsCommunity($id: ID!) {
    incrementTotalCommentsCommunity(id: $id) {
      id
    }
  }
`;

/**
 * user metrics
 */

const IncrementTotalCommentsUserMetrics = /* GraphQL */ `
  mutation incrementTotalCommentsUserMetrics($id: ID!) {
    incrementTotalCommentsUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  COMMUNITY: {
    TOTALCOMMENTS: {
      INCREMENT: IncrementTotalCommentsCommunity,
    },
  },
  USERMETRICS: {
    TOTALCOMMENTS: {
      INCREMENT: IncrementTotalCommentsUserMetrics,
    },
  },
};
