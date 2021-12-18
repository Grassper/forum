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
import { FlatList, ListRenderItem, ScrollView, StyleSheet } from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Post">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "Post">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface PostHeader_ {
  id?: string;
  type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  authorId?: string;
  subForumId?: string;
  timeStamp?: Date;
  contentText?: string;
  mediaS3Key?: null | string;
  userPostMetric?: UserPostMetric;
}

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
}

const PostHeader: React.FC<PostHeader_> = (post) => {
  return (
    <Box>
      <PostCard
        id={post.id}
        subForum={post.subForum}
        subForumId={post.subForumId}
        type={post.type}
        username={post.username}
        authorId={post.authorId}
        contentText={post.contentText}
        avatarUrl={post.avatarUrl}
        timeStamp={post.timeStamp}
        userPostMetric={post.userPostMetric}
        mediaS3Key={post.mediaS3Key}
        postPage
        hidePostNavigation
      />

      <Box alignItems="center" bg="white" mt="2" pt="4">
        <HStack width="90%" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Comments
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export const Post: React.FC<Props_> = ({ route }) => {
  const postData = route.params;

  const [comments, setComments] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const currentUser = React.useContext(UserContext).user;
  const [loading, setLoading] = React.useState(false);

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (postData.id) {
        setLoading(true);
        const listCommentInput: listCommentsByPostIdFetch_ = {
          postId: postData.id,
          currentUserId: currentUser.id,
          limit: 10,
        };
        const commentData = await listCommentsByPostIdFetch(listCommentInput);

        if (commentData && isActive) {
          setComments(commentData.items);
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
  }, [currentUser.id, postData.id]);

  useFocusEffect(populateContent);

  const handlePagination = async () => {
    if (nextToken && postData.id) {
      const listCommentInput: listCommentsByPostIdFetch_ = {
        postId: postData.id,
        currentUserId: currentUser.id,
        limit: 10,
        nextToken,
      };

      const commentData = await listCommentsByPostIdFetch(listCommentInput);

      if (commentData) {
        setComments((prevState) => [...prevState, ...commentData.items]);
        setNextToken(commentData.nextToken);
      }
    }
  };

  const CommentCardRenderer: ListRenderItem<Item> = ({ item }) => {
    const comment = item.childComment;
    return (
      <CommentCard
        username={comment.author.username}
        avatarUrl={comment.author.profileImageUrl}
        subForum={comment.community.name}
        subForumId={comment.community.id}
        contentText={comment.content}
        postId={comment.postId}
        commentId={comment.id}
        timeStamp={comment.commentedDate}
        repliesCount={comment.repliesCount}
        commentAuthorId={comment.author.id}
        userCommentMetric={comment.userCommentMetric}
      />
    );
  };

  return (
    <Box style={styles.container}>
      {!loading ? (
        <FlatList
          data={comments}
          renderItem={CommentCardRenderer}
          keyExtractor={(item) => item.childComment.id}
          onEndReached={() => handlePagination()}
          ListHeaderComponent={() => <PostHeader {...postData} />}
        />
      ) : (
        <ScrollView>
          <PostCard postPage hidePostNavigation {...postData} />
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
interface listCommentsByPostIdFetch_ {
  postId: string;
  limit: number;
  currentUserId: string;
  nextToken?: string;
}

const listCommentsByPostIdFetch = async (input: listCommentsByPostIdFetch_) => {
  try {
    const listCommentsData = (await API.graphql({
      query: listCommentsByPostId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listCommentsByPostId_>;

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

interface listCommentsByPostId_ {
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
  userCommentMetric: userCommentMetric_;
  repliesCount: number;
}

interface userCommentMetric_ {
  items: { type: "UPVOTE" | "DOWNVOTE" }[];
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

const listCommentsByPostId = /* GraphQL */ `
  query ListParentChildCommentRelationship(
    $postId: ID!
    $nextToken: String
    $limit: Int
    $currentUserId: ID!
  ) {
    listParentChildCommentRelationships(
      filter: {
        postId: { eq: $postId }
        parentCommentId: { attributeExists: false }
      }
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
          userCommentMetric(
            filter: { isDeleted: { attributeExists: false } }
            userId: { eq: $currentUserId }
          ) {
            items {
              type
            }
          }
        }
      }
      nextToken
    }
  }
`;
