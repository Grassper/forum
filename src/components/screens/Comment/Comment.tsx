import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Flex, HStack, Text } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Comment">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "Comment">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface CommentHeader_ {
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  postId?: string;
  contentText?: string;
  commentId?: string;
  timeStamp?: Date;
  repliesCount?: number;
  commentAuthorId?: string;
}

const CommentHeader: React.FC<CommentHeader_> = (comment) => {
  return (
    <Box>
      <CommentCard {...comment} hideCommentUserActions hideReplyButton />

      <Box alignItems="center" bg="white" mt="2" py="4">
        <HStack alignItems="flex-end" width="90%">
          <Text color="eGreen.400" fontWeight="500">
            Replies
          </Text>
          <Text color="eGreen.400" fontSize="xs" fontWeight="500" ml="1">
            {comment.repliesCount}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export const Comment: React.FC<Props_> = ({ route, navigation }) => {
  const comment = route.params;

  const [childComments, setChildComments] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [noCommentsToShow, setNoCommentsToShow] = React.useState(false);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (comment.commentId) {
        if (childComments.length === 0 && !noCommentsToShow) {
          setLoading(true);
        }
        const listCommentInput: listChildCommentsByParentCommentIdFetch_ = {
          parentCommentId: comment.commentId,
        };
        const commentData = await listChildCommentsByParentCommentIdFetch(
          listCommentInput
        );

        if (commentData) {
          if (commentData.items.length === 0) {
            setNoCommentsToShow(true);
          } else {
            setNoCommentsToShow(false);
            setChildComments(commentData.items);
            setNextToken(commentData.nextToken);
          }
        }
        if (loading) {
          setLoading(false);
        }
      }
    };
    fetchCall();
  }, [childComments.length, comment.commentId, loading, noCommentsToShow]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
        setStateReady(true);
      });
      return () => task.cancel();
    }, [populateContent])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  const handlePagination = async () => {
    if (nextToken && comment.commentId) {
      const listPostInput: listChildCommentsByParentCommentIdFetch_ = {
        parentCommentId: comment.commentId,
        limit: 10,
        nextToken,
      };

      const commentData = await listChildCommentsByParentCommentIdFetch(
        listPostInput
      );

      if (commentData) {
        setChildComments((prevState) => [...prevState, ...commentData.items]);
        setNextToken(commentData.nextToken);
      }
    }
  };

  const CommentCardRenderer: ListRenderItem<Item> = ({ item }) => {
    const commentData = item.childComment;
    return (
      <CommentCard
        avatarUrl={commentData.author.profileImageUrl}
        commentAuthorId={commentData.author.id}
        commentId={commentData.id}
        contentText={commentData.content}
        postId={commentData.postId}
        repliesCount={commentData.repliesCount}
        subForum={commentData.community.name}
        subForumId={commentData.community.id}
        timeStamp={commentData.commentedDate}
        username={commentData.author.username}
      />
    );
  };

  if (!isStateReady || loading) {
    return (
      <ScrollView>
        <CommentCard {...comment} hideCommentUserActions hideReplyButton />
        <Box alignItems="center" bg="white" mt="2" pt="4">
          <Flex width="100%">
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Flex>
        </Box>
      </ScrollView>
    );
  }

  return (
    <Box style={styles.container}>
      <FlatList
        data={childComments}
        keyExtractor={(item) => item.childComment.id}
        ListHeaderComponent={() => <CommentHeader {...comment} />}
        maxToRenderPerBatch={8}
        onEndReached={() => handlePagination()}
        renderItem={CommentCardRenderer}
        windowSize={5}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * api calls
 */
interface listChildCommentsByParentCommentIdFetch_ {
  parentCommentId: string;
  limit?: number;
  nextToken?: string;
}

const listChildCommentsByParentCommentIdFetch = async (
  input: listChildCommentsByParentCommentIdFetch_
) => {
  try {
    const listCommentsData = (await API.graphql({
      query: listChildCommentsByParentCommentId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listChildCommentsByParentCommentId_>;

    if (listCommentsData.data?.listParentChildCommentRelationships) {
      const comments =
        listCommentsData.data?.listParentChildCommentRelationships;
      return comments;
    }
  } catch (err) {
    console.error("Error occured while listing comment using post id", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface listChildCommentsByParentCommentId_ {
  listParentChildCommentRelationships?: ListParentChildCommentRelationships;
}

interface ListParentChildCommentRelationships {
  items: Item[];
  nextToken: string;
}

interface Item {
  childComment: ChildComment;
}

interface ChildComment {
  id: string;
  content: string;
  postId: string;
  author: Author;
  commentedDate: Date;
  community: Community;
  repliesCount: number;
}

interface Author {
  id: string;
  username: string;
  profileImageUrl: string;
}

interface Community {
  id: string;
  name: string;
}

const listChildCommentsByParentCommentId = /* GraphQL */ `
  query ListParentChildCommentRelationship(
    $parentCommentId: ID!
    $nextToken: String
    $limit: Int
  ) {
    listParentChildCommentRelationships(
      filter: { parentCommentId: { eq: $parentCommentId } }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        childComment {
          id
          content
          postId
          author {
            id
            username
            profileImageUrl
          }
          commentedDate
          community {
            id
            name
          }
          repliesCount
        }
      }
      nextToken
    }
  }
`;
