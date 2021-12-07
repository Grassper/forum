import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Comment">,
  DrawerNavigationProp<DrawerParamList_>
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
      <CommentCard {...comment} hideReplyButton hideCommentUserActions />

      <Box alignItems="center" bg="white" mt="2" pt="4">
        <Flex width="90%" flexDirection="row" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Replies
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            {comment.repliesCount}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export const Comment: React.FC<Props_> = ({ route }) => {
  const comment = route.params;

  const [childComments, setChildComments] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const [loading, setLoading] = React.useState(false);

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (comment.commentId) {
        setLoading(true);
        const listCommentInput: listChildCommentsByParentCommentIdFetch_ = {
          parentCommentId: comment.commentId,
          limit: 10,
        };
        const commentData = await listChildCommentsByParentCommentIdFetch(
          listCommentInput
        );

        if (commentData && isActive) {
          setChildComments(commentData.items);
          setNextToken(commentData.nextToken);
        }
        if (isActive) {
          setLoading(false);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [comment.commentId]);

  useFocusEffect(populateContent);

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
        commentAuthorId={commentData.author.id}
        username={commentData.author.username}
        avatarUrl={commentData.author.profileImageUrl}
        subForum={commentData.community.name}
        subForumId={commentData.community.id}
        contentText={commentData.content}
        postId={commentData.postId}
        commentId={commentData.id}
        timeStamp={commentData.commentedDate}
        repliesCount={commentData.repliesCount}
      />
    );
  };

  return (
    <Box style={styles.container}>
      {!loading ? (
        <FlatList
          data={childComments}
          renderItem={CommentCardRenderer}
          keyExtractor={(item) => item.childComment.id}
          onEndReached={() => handlePagination()}
          ListHeaderComponent={() => <CommentHeader {...comment} />}
        />
      ) : (
        <ScrollView>
          <CommentCard {...comment} hideReplyButton hideCommentUserActions />
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
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </Flex>
          </Box>
        </ScrollView>
      )}
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
  limit: number;
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
