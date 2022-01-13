import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import React from "react";
import { FlatList, ListRenderItem, ScrollView } from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { PostFallback } from "@/root/src/components/shared/Icons";
import { UserContext } from "@/root/src/context";

interface Props_ {
  routeUserId: string;
}

export const Posts: React.FC<Props_> = ({ routeUserId }) => {
  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const [loading, setLoading] = React.useState(false);
  const [noPostToShow, setNoPostToShow] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (posts.length === 0 && !noPostToShow) {
        setLoading(true);
      }

      const listPostInput: listPostByUserIdFetchInput_ = {
        id: routeUserId,
        currentUserId: currentUser.id,
        sortDirection: "DESC",
      };

      const responseData = await listPostByUserIdFetch(listPostInput);
      if (responseData) {
        if (responseData.items.length === 0) {
          setNoPostToShow(true);
        } else {
          setNoPostToShow(false);
          setPosts(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
      if (loading) {
        setLoading(false);
      }
    };
    fetchCall();
  }, [currentUser.id, loading, noPostToShow, posts.length, routeUserId]);

  React.useEffect(populateContent, [populateContent]);

  const handlePagination = React.useCallback(async () => {
    if (nextToken) {
      const listPostInput: listPostByUserIdFetchInput_ = {
        id: routeUserId,
        currentUserId: currentUser.id,
        limit: 10,
        sortDirection: "DESC",
        nextToken,
      };

      const responseData = await listPostByUserIdFetch(listPostInput);

      if (responseData) {
        setPosts((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  }, [currentUser.id, nextToken, routeUserId]);

  const PostCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <PostCard
        authorId={item.author.id}
        avatarUrl={item.author.profileImageUrl}
        contentText={item.content}
        id={item.id}
        mediaS3Key={item.mediaS3Key}
        subForum={item.community.name}
        subForumId={item.community.id}
        timeStamp={item.postedDate}
        type={
          (item.type.charAt(0) +
            item.type.slice(1).toLowerCase()) as PostCardProps_["type"]
        }
        username={item.author.username}
        userPostMetric={item.userPostMetric}
      />
    );
  };

  const keyExtractor = React.useCallback((item) => item.id, []);

  if (loading) {
    return (
      <ScrollView>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollView>
    );
  }

  if (noPostToShow) {
    return <PostFallback />;
  }

  return (
    <FlatList
      data={posts}
      initialNumToRender={3}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={5}
      onEndReached={handlePagination}
      renderItem={PostCardRenderer}
      updateCellsBatchingPeriod={100}
      windowSize={5}
    />
  );
};

/**
 * api calls
 */
interface listPostByUserIdFetchInput_ {
  id: string;
  limit?: number;
  sortDirection: "ASC" | "DESC";
  currentUserId: string;
  nextToken?: string;
}

const listPostByUserIdFetch = async (input: listPostByUserIdFetchInput_) => {
  try {
    const listCommunityData = (await API.graphql({
      query: listPostByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listPostByUserId_>;

    if (listCommunityData.data?.getUser) {
      const { posts } = listCommunityData.data.getUser;
      return posts;
    }
  } catch (err) {
    console.error("Error occured while listing community in joined forum", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface listPostByUserId_ {
  getUser?: {
    posts: {
      items: Item[];
      nextToken: string;
    };
  };
}

interface Item {
  id: string;
  type: string;
  content: string;
  mediaS3Key: null | string;
  postedDate: Date;
  author: {
    id: string;
    username: string;
    profileImageUrl: string;
  };
  community: {
    id: string;
    name: string;
  };
  userPostMetric?: UserPostMetric;
}

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
}

const listPostByUserId = /* GraphQL */ `
  query listPostByUserId(
    $id: ID!
    $currentUserId: ID!
    $limit: Int
    $sortDirection: ModelSortDirection
    $nextToken: String
  ) {
    getUser(id: $id) {
      posts(
        limit: $limit
        sortDirection: $sortDirection
        nextToken: $nextToken
      ) {
        items {
          id
          type
          content
          mediaS3Key
          postedDate
          author {
            id
            username
            profileImageUrl
          }
          community {
            name
            id
          }
          userPostMetric(
            filter: { isDeleted: { attributeExists: false } }
            userId: { eq: $currentUserId }
          ) {
            items {
              type
            }
          }
        }
        nextToken
      }
    }
  }
`;
