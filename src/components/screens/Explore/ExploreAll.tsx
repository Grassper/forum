import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Ionicons } from "@expo/vector-icons";
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { API } from "aws-amplify";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

interface Props_ {}

export const ExploreAll: React.FC<Props_> = () => {
  const [isStateReady, setStateReady] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const navigation = useNavigation();

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const [loading, setLoading] = React.useState(false);
  const [noTimelineToShow, setNoTimelineToShow] = React.useState(false);
  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (posts.length === 0 && !noTimelineToShow) {
        setLoading(true);
      }
      const exploreAllPostInput: exploreAllFetchInput_ = {
        currentUserId: currentUser.id,
      };

      const responseData = await exploreAllFetch(exploreAllPostInput);
      if (responseData) {
        if (responseData.items.length === 0) {
          setNoTimelineToShow(true);
        } else {
          setNoTimelineToShow(false);
          setPosts(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
      if (loading) {
        setLoading(false);
      }
    };
    fetchCall();
  }, [currentUser.id, loading, noTimelineToShow, posts.length]);

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
    if (nextToken) {
      const listPostInput: exploreAllFetchInput_ = {
        currentUserId: currentUser.id,
        limit: 10,
        nextToken,
      };

      const responseData = await exploreAllFetch(listPostInput);

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
  if (!isStateReady || loading) {
    return (
      <ScrollView>
        <Box alignItems="center" bg={colors.white} width="100%">
          <Box py="15px" width="90%">
            <Pressable
              onPress={() => {
                navigation.dispatch(
                  StackActions.push("Application", {
                    screen: "Explore",
                  })
                );
              }}
            >
              <HStack alignItems="center" bg="muted.100" py="3">
                <Icon
                  as={<Ionicons name="search-outline" />}
                  color="muted.400"
                  ml="3"
                  size={18}
                />
                <Text color="muted.400" ml="3">
                  search
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </Box>
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

  if (noTimelineToShow) {
    return (
      <Box style={styles.container}>
        <Box alignItems="center" bg={colors.white} width="100%">
          <Box py="15px" width="90%">
            <Pressable
              onPress={() => {
                navigation.dispatch(
                  StackActions.push("Application", {
                    screen: "Explore",
                  })
                );
              }}
            >
              <HStack alignItems="center" bg="muted.100" py="3">
                <Icon
                  as={<Ionicons name="search-outline" />}
                  color="muted.400"
                  ml="3"
                  size={18}
                />
                <Text color="muted.400" ml="3">
                  search
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box bg={colors.white} style={styles.container}>
      <Box style={styles.container}>
        <Box alignItems="center" bg={colors.white} width="100%">
          <Box py="15px" width="90%">
            <Pressable
              onPress={() => {
                navigation.dispatch(
                  StackActions.push("Application", {
                    screen: "Explore",
                  })
                );
              }}
            >
              <HStack alignItems="center" bg="muted.100" py="3">
                <Icon
                  as={<Ionicons name="search-outline" />}
                  color="muted.400"
                  ml="3"
                  size={18}
                />
                <Text color="muted.400" ml="3">
                  search
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </Box>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={8}
          onEndReached={() => handlePagination()}
          renderItem={PostCardRenderer}
          windowSize={5}
        />
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * api calls
 */

interface exploreAllFetchInput_ {
  limit?: number;
  currentUserId: string;
  nextToken?: string;
}

const exploreAllFetch = async (input: exploreAllFetchInput_) => {
  try {
    const listPostData = (await API.graphql({
      query: listAllPost,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<showPosts_>;

    if (listPostData.data?.listPosts) {
      const postData = listPostData.data.listPosts;
      return postData;
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

export interface showPosts_ {
  listPosts?: ListPosts;
}

export interface ListPosts {
  items: Item[];
  nextToken: string;
}

export interface Item {
  id: string;
  type: string;
  content: string;
  mediaS3Key: null;
  postedDate: Date;
  author: Author;
  community: Community;
  userPostMetric: UserPostMetric;
}

export interface Author {
  id: string;
  username: string;
  profileImageUrl: string;
}

export interface Community {
  name: string;
  id: string;
}

export interface UserPostMetric {
  items: any[];
}

const listAllPost = /* GraphQL */ `
  query ListAllPost($limit: Int, $nextToken: String, $currentUserId: ID!) {
    listPosts(limit: $limit, nextToken: $nextToken) {
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
