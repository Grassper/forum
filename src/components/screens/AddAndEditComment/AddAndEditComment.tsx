import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  ScrollView,
  Spinner,
} from "native-base";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import isLength from "validator/es/lib/isLength";
import xssFilters from "xss-filters";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditComment">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "AddAndEditComment">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditComment: React.FC<Props_> = ({ navigation, route }) => {
  const [comment, setComment] = React.useState("");

  const [isCommentValid, setCommentValid] = React.useState(false);
  const [commentErrorMsg, setCommentErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const currentUser = React.useContext(UserContext).user;

  const { action, ...post } = route.params;

  const handleSubmit = React.useCallback(async () => {
    if (isCommentValid && currentUser.id && post.id && post.subForumId) {
      setLoading(true);
      const commentInput: createCommentHandlerInput_ = {
        content: comment,
        postId: post.id,
        communityId: post.subForumId,
        authorId: currentUser.id,
        upvote: 0,
        downvote: 0,
        repliesCount: 0,
        commentedDate: new Date(),
      };

      const createCommentResponse = await createCommentHandler(commentInput);

      if (createCommentResponse) {
        navigation.goBack();
      }
      setLoading(false);
    } else {
      Alert.alert(commentErrorMsg);
    }
  }, [
    comment,
    commentErrorMsg,
    currentUser.id,
    isCommentValid,
    navigation,
    post.id,
    post.subForumId,
  ]);

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

  React.useEffect(() => {
    const validateComment = () => {
      if (isLength(comment, { min: 1, max: 2200 })) {
        setCommentValid(true);
        setCommentErrorMsg("");
      } else {
        setCommentValid(false);
        setCommentErrorMsg("Comment Content Shouldn't be empty");
      }
    };
    validateComment();
  }, [comment]);

  const sanitizeComment = (text: string) => {
    setComment(xssFilters.inHTMLData(text));
  };

  return (
    <Box bg="white" style={styles.container}>
      <ScrollView>
        <Box>
          <PostCard {...post} hidePostNavigation hidePostUserActions postPage />
          <Box py="2" />
          <Divider />
        </Box>
        <Box bg="white" mt="2" py="4">
          <HStack alignItems="flex-start" justifyContent="center">
            <Input
              borderRadius="md"
              fontSize="sm"
              multiline
              onChangeText={sanitizeComment}
              placeholder="Type some goods!"
              placeholderTextColor="muted.400"
              value={comment}
              variant="unstyled"
              width="90%"
            />
          </HStack>
        </Box>
      </ScrollView>
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
  repliesCount: number;
  commentedDate: Date;
}

const createCommentHandler = async (input: createCommentHandlerInput_) => {
  try {
    const createCommentData = (await API.graphql({
      query: createComment,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createComment_>;

    if (createCommentData.data?.createComment) {
      const createRelationInput = {
        childCommentId: createCommentData.data?.createComment.id,
        postId: input.postId,
      };
      const createRelationship = (await API.graphql({
        query: createParentChildCommentRelationship,
        variables: { input: createRelationInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<createParentChildCommentRelationship_>;

      if (createRelationship.data?.createParentChildCommentRelationship) {
        /**
         * increment total comment in current user and community
         */

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

        return createRelationship.data.createParentChildCommentRelationship.id;
      }
    }
  } catch (err) {
    console.error(
      "Error occured while creating comment in add and edit comment page",
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
