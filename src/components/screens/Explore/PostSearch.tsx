import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "aws-amplify";
import { Box, Image } from "native-base";
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

import { TabNavigatorExploreContext } from "./context";

export const PostSearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (searchValue) {
        const searchPostInput: searchPostsFetchInput_ = {
          limit: 10,
          currentUserId: currentUser.id,
          searchcontent: searchValue,
        };

        const responseData = await searchPostsFetch(searchPostInput);
        if (responseData) {
          setPosts(responseData.items);
          setNextToken(responseData.nextToken);
        }
      } else {
        setPosts([]);
        setNextToken("");
      }
    };
    fetchCall();
  }, [currentUser.id, searchValue]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
        setStateReady(true);
      });
      return () => task.cancel();
    }, [populateContent])
  );

  const handlePagination = async () => {
    if (nextToken && searchValue) {
      const listPostInput: searchPostsFetchInput_ = {
        searchcontent: searchValue,
        currentUserId: currentUser.id,
        limit: 10,
        nextToken,
      };

      const responseData = await searchPostsFetch(listPostInput);

      if (responseData) {
        setPosts((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

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
    <Box bg="white">
      {posts.length ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={8}
          onEndReached={() => handlePagination()}
          renderItem={PostCardRenderer}
          windowSize={5}
        />
      ) : (
        <Image
          alt="Alternate Text"
          height="100%"
          resizeMode="stretch"
          source={require("@/root/assets/images/empty-data.jpg")}
          width="100%"
        />
      )}
    </Box>
  );
};

/**
 * api calls
 */
interface searchPostsFetchInput_ {
  searchcontent: string;
  limit: number;
  currentUserId: string;
  nextToken?: string;
}

const searchPostsFetch = async (input: searchPostsFetchInput_) => {
  try {
    const listSearchUserData = (await API.graphql({
      query: listPostByContent,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<searchPosts_>;

    if (listSearchUserData.data?.listPosts) {
      const postSearchData = listSearchUserData.data.listPosts;
      return postSearchData;
    }
  } catch (err) {
    console.error("Error occured while search posts in explore screen", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface searchPosts_ {
  listPosts?: ListPosts;
}

interface ListPosts {
  items: Item[];
  nextToken: string;
}

interface Item {
  id: string;
  type: string;
  content: string;
  mediaS3Key: null;
  postedDate: Date;
  author: Author;
  community: Community;
  userPostMetric: UserPostMetric;
}

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
}

interface Author {
  id: string;
  username: string;
  profileImageUrl: string;
}

interface Community {
  name: string;
  id: string;
}

const listPostByContent = /* GraphQL */ `
  query listPostByContent(
    $searchcontent: String
    $currentUserId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listPosts(
      limit: $limit
      filter: { content: { contains: $searchcontent } }
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
`;
