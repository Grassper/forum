import { GraphQLResult } from "@aws-amplify/api-graphql";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import React, { useState } from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import logo from "@/root/assets/images/splash.png";
import {
  BottomTabParamList_,
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import {
  MessageIcon,
  ProfileIcon,
} from "@/root/src/components/shared/HeaderIcon";
import { Image } from "@/root/src/components/shared/Image";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "Home">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_, "BottomTabNav">,
    StackNavigationProp<RootStackParamList_, "Application">
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const Home: React.FC<Props_> = ({ navigation }) => {
  const {
    user: { profileImageUrl, id },
  } = React.useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);

  const memoPost = React.useMemo(() => posts, [posts]);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (id) {
        const listPostInput: listTimelineByUserIdFetchInput_ = {
          id: id,
          limit: 10,
          sortDirection: "DESC",
        };

        const responseData = await listTimelineByUserIdFetch(listPostInput);
        if (responseData) {
          setPosts(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
    };
    fetchCall();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
        setStateReady(true);
      });
      return () => {
        task.cancel();
      };
    }, [populateContent])
  );

  const handlePagination = async () => {
    if (nextToken && id) {
      const listPostInput: listTimelineByUserIdFetchInput_ = {
        id: id,
        limit: 10,
        sortDirection: "DESC",
        nextToken,
      };

      const responseData = await listTimelineByUserIdFetch(listPostInput);

      if (responseData) {
        setPosts((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  const HandleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ProfileIcon />,
      headerTitle: () => (
        <Image
          borderRadius={100}
          resizeMode={"contain"}
          size="30px"
          source={logo}
        />
      ),
      headerRight: () => <MessageIcon />,
    });
  }, [navigation, profileImageUrl]);

  const PostCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <PostCard
        authorId={item.post.author.id}
        avatarUrl={item.post.author.profileImageUrl}
        contentText={item.post.content}
        id={item.post.id}
        mediaS3Key={item.post.mediaS3Key}
        subForum={item.post.community.name}
        subForumId={item.post.community.id}
        timeStamp={item.post.postedDate}
        type={
          (item.post.type.charAt(0) +
            item.post.type.slice(1).toLowerCase()) as PostCardProps_["type"]
        }
        username={item.post.author.username}
        userPostMetric={item.post.userPostMetric}
      />
    );
  };
  const keyExtractor = React.useCallback((item) => item.post.id, []);
  if (!isStateReady) {
    return (
      <ScrollView>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={HandleBottomSheet} />
      <FlatList
        data={memoPost}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={8}
        onEndReached={handlePagination}
        renderItem={PostCardRenderer}
        windowSize={5}
      />
      <FloatingActionButton onPress={HandleBottomSheet} screen="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * api calls
 */
interface listTimelineByUserIdFetchInput_ {
  id: string;
  limit: number;
  sortDirection: "ASC" | "DESC";
  nextToken?: string;
}

const listTimelineByUserIdFetch = async (
  input: listTimelineByUserIdFetchInput_
) => {
  try {
    const listCommunityData = (await API.graphql({
      query: listTimelineByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listTimelineByUserId_>;

    if (listCommunityData.data?.getUser) {
      const { timeLine } = listCommunityData.data.getUser;
      return timeLine;
    }
  } catch (err) {
    console.error("Error occured while fetching timeline in home", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface listTimelineByUserId_ {
  getUser?: {
    timeLine: {
      items: Item[];
      nextToken: string;
    };
  };
}

interface Item {
  post: Post;
}

interface Post {
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

const listTimelineByUserId = /* GraphQL */ `
  query listTimelineByUserId(
    $id: ID!
    $limit: Int
    $sortDirection: ModelSortDirection
    $nextToken: String
  ) {
    getUser(id: $id) {
      timeLine(
        limit: $limit
        sortDirection: $sortDirection
        nextToken: $nextToken
      ) {
        items {
          post {
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
              userId: { eq: $id }
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
  }
`;
