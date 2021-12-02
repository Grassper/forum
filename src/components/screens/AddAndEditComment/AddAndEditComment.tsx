import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Button, Divider, Flex, Input, ScrollView } from "native-base";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditComment">,
  DrawerNavigationProp<DrawerParamList_>
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

  const currentUser = React.useContext(UserContext).user;

  const { action, ...post } = route.params;

  const handleSubmit = React.useCallback(async () => {
    if (isCommentValid && currentUser.id && post.id && post.subForumId) {
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
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={handleSubmit}
        >
          {action === "Add" ? "Post" : "Update"}
        </Button>
      ),
    });
  }, [action, handleSubmit, navigation]);

  React.useEffect(() => {
    const validateComment = () => {
      if (
        isLength(comment, { min: 1, max: 2200 }) &&
        matches(comment, "^[A-Za-z][A-Za-z0-9 _|.,!]{1,2200}$", "m")
      ) {
        setCommentValid(true);
        setCommentErrorMsg("");
      } else {
        setCommentValid(false);
        setCommentErrorMsg("Comment Content Shouldn't be empty");
      }
    };
    validateComment();
  }, [comment]);

  return (
    <Box style={styles.container} bg="white">
      <ScrollView>
        <Box>
          <PostCard {...post} postPage hidePostNavigation hidePostUserActions />
          <Divider />
        </Box>
        <Box bg="white" py="4" mt="2">
          <Flex
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Input
              width="90%"
              multiline
              value={comment}
              onChangeText={setComment}
              borderRadius="md"
              placeholder="Type some goods!"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
          </Flex>
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
