import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Post">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "Post">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface PostHeader_ {
  id?: string;
  type?: string;
  content?: string;
  mediaS3Key?: string;
  postedDate?: Date;
  author?: Author_;
  community?: Community_;
}

const PostHeader: React.FC<PostHeader_> = (post) => {
  const Type = post.type
    ? post.type?.charAt(0) + post.type?.slice(1).toLowerCase()
    : undefined;

  return (
    <Box>
      <PostCard
        id={post?.id}
        subForum={post.community?.name}
        type={Type as PostCardProps_["type"]}
        username={post.author?.username}
        contentText={post.content}
        avatarUrl={post.author?.profileImageUrl}
        timeStamp={post.postedDate}
        mediaS3Key={post.mediaS3Key}
        postPage
        hidePostNavigation
      />

      <Box alignItems="center" bg="white" mt="2" pt="4">
        <Flex width="90%" flexDirection="row" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Comments
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            253k
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export const Post: React.FC<Props_> = ({ route }) => {
  const Data = [
    { key: 1, replyExists: true },
    { key: 2, replyExists: false },
    { key: 3, replyExists: true },
  ];

  const { postId } = route.params;

  const [post, setPost] = React.useState<Post_>();

  React.useEffect(() => {
    (async () => {
      if (postId) {
        const postData = await getPostByPostIdFetch({ id: postId });
        if (postData) {
          setPost(postData);
        }
      }
    })();
  }, [postId]);

  return (
    <Box style={styles.container}>
      <FlatList
        data={Data}
        renderItem={(item) => (
          <CommentCard replyExists={item.item.replyExists} />
        )}
        ListHeaderComponent={() => <PostHeader {...post} />}
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
interface getPostByPostIdFetchInput_ {
  id: string;
}

const getPostByPostIdFetch = async (input: getPostByPostIdFetchInput_) => {
  try {
    const listCommunityData = (await API.graphql({
      query: getPostByPostId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<getPostByPostId_>;

    if (listCommunityData.data?.getPost) {
      const post = listCommunityData.data.getPost;
      return post;
    }
  } catch (err) {
    console.error(
      "Error occured while fetching post using post id in post screen",
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

interface getPostByPostId_ {
  getPost?: Post_;
}

interface Post_ {
  id: string;
  type: string;
  content: string;
  mediaS3Key: string;
  postedDate: Date;
  author: Author_;
  community: Community_;
}

interface Author_ {
  username: string;
  profileImageUrl: string;
}

interface Community_ {
  name: string;
}

const getPostByPostId = /* GraphQL */ `
  query getPostByPostId($id: ID!) {
    getPost(id: $id) {
      id
      type
      content
      mediaS3Key
      postedDate
      author {
        username
        profileImageUrl
      }
      community {
        name
      }
    }
  }
`;
