import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";

import { TabNavigatorUserContext } from "./Context";

export const Posts: React.FC = () => {
  const routeUserId = React.useContext(TabNavigatorUserContext);

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const populateContent = React.useCallback(async () => {
    const listPostInput: listPostByUserIdFetchInput_ = {
      id: routeUserId,
      limit: 10,
      sortDirection: "DESC",
    };

    const responseData = await listPostByUserIdFetch(listPostInput);
    if (responseData) {
      setPosts((prevState) => [...prevState, ...responseData.items]);
      setNextToken(responseData.nextToken);
    }
  }, [routeUserId]);

  React.useEffect(() => {
    populateContent();
  }, [populateContent]);

  const handlePagination = React.useCallback(async () => {
    if (nextToken) {
      const listPostInput: listPostByUserIdFetchInput_ = {
        id: routeUserId,
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
  }, [nextToken, routeUserId]);

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
        avatarUrl={item.author.profileImageUrl}
        timeStamp={item.postedDate}
        mediaS3Key={item.mediaS3Key}
      />
    );
  };

  return (
    <FlatList
      data={posts}
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
    username: string;
    profileImageUrl: string;
  };
  community: {
    id: string;
    name: string;
  };
}

const listPostByUserId = /* GraphQL */ `
  query listPostByUserId(
    $id: ID!
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
            username
            profileImageUrl
          }
          community {
            name
            id
          }
        }
        nextToken
      }
    }
  }
`;
