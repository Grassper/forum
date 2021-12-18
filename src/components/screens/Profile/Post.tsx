import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "aws-amplify";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
} from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

import { TabNavigatorUserContext } from "./Context";

export const Posts: React.FC = () => {
  const routeUserId = React.useContext(TabNavigatorUserContext);

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      const listPostInput: listPostByUserIdFetchInput_ = {
        id: routeUserId,
        currentUserId: currentUser.id,
        limit: 10,
        sortDirection: "DESC",
      };

      const responseData = await listPostByUserIdFetch(listPostInput);
      if (responseData) {
        setPosts(responseData.items);
        setNextToken(responseData.nextToken);
      }
    };
    fetchCall();
  }, [currentUser.id, routeUserId]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
        setStateReady(true);
      });
      return () => task.cancel();
    }, [populateContent])
  );

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
        id={item.id}
        subForum={item.community.name}
        subForumId={item.community.id}
        type={
          (item.type.charAt(0) +
            item.type.slice(1).toLowerCase()) as PostCardProps_["type"]
        }
        username={item.author.username}
        contentText={item.content}
        authorId={item.author.id}
        avatarUrl={item.author.profileImageUrl}
        timeStamp={item.postedDate}
        mediaS3Key={item.mediaS3Key}
        userPostMetric={item.userPostMetric}
      />
    );
  };

  if (!isStateReady) {
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

  return (
    <FlatList
      data={posts}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={100}
      renderItem={PostCardRenderer}
      keyExtractor={(item) => item.id}
      onEndReached={() => handlePagination()}
    />
  );
};

/**
 * api calls
 */
interface listPostByUserIdFetchInput_ {
  id: string;
  limit: number;
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
