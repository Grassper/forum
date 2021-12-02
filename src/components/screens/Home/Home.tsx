import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Icon, Image } from "native-base";
import React, { useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "Explore">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_>,
    DrawerNavigationProp<DrawerParamList_>
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

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (id) {
        const listPostInput: listTimelineByUserIdFetchInput_ = {
          id: id,
          limit: 10,
          sortDirection: "DESC",
        };

        const responseData = await listTimelineByUserIdFetch(listPostInput);
        if (responseData && isActive) {
          setPosts(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [id]);

  useFocusEffect(populateContent);

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
      headerLeft: () => <HeaderProfileIcon />,
      headerRight: () => (
        <Box mr="3">
          <Icon
            as={<Ionicons name="search-outline" />}
            size={"20px"}
            ml="3"
            color="muted.900"
          />
        </Box>
      ),
      headerTitle: () => (
        <Image
          size="28px"
          resizeMode={"cover"}
          borderRadius={100}
          source={require("@/root/assets/images/logo.png")}
          alt="Eforum logo"
        />
      ),
    });
  }, [navigation, profileImageUrl]);

  const PostCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <PostCard
        id={item.post.id}
        subForum={item.post.community.name}
        subForumId={item.post.community.id}
        type={
          (item.post.type.charAt(0) +
            item.post.type.slice(1).toLowerCase()) as PostCardProps_["type"]
        }
        username={item.post.author.username}
        contentText={item.post.content}
        avatarUrl={item.post.author.profileImageUrl}
        timeStamp={item.post.postedDate}
        mediaS3Key={item.post.mediaS3Key}
      />
    );
  };

  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={HandleBottomSheet} />
      <FlatList
        data={posts}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.post.id}
        onEndReached={() => handlePagination()}
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
    username: string;
    profileImageUrl: string;
  };
  community: {
    id: string;
    name: string;
  };
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
              username
              profileImageUrl
            }
            community {
              name
              id
            }
          }
        }
        nextToken
      }
    }
  }
`;
