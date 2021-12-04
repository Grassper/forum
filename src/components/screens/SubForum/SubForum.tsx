import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Button } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<SubForumStackParamList_, "SubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<SubForumStackParamList_, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const SubForum: React.FC<Props_> = ({ navigation, route }) => {
  const { subForumId } = route.params;

  const [subForum, getSubForum] = React.useState<Community>();

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const currentUser = React.useContext(UserContext).user;

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      const listPostInput: listPostByCommunityIdFetchInput_ = {
        id: subForumId,
        limit: 10,
        sortDirection: "DESC",
      };

      const getCommunityData = await getCommunityFetch(subForumId);
      const listPostData = await listPostByCommunityIdFetch(listPostInput);

      if (getCommunityData && isActive) {
        getSubForum(getCommunityData);
      }

      if (listPostData && isActive) {
        setPosts(listPostData.items);
        setNextToken(listPostData.nextToken);
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [subForumId]);

  useFocusEffect(populateContent);

  const handlePagination = async () => {
    if (nextToken) {
      const listPostInput: listPostByCommunityIdFetchInput_ = {
        id: subForumId,
        limit: 10,
        sortDirection: "DESC",
        nextToken,
      };

      const responseData = await listPostByCommunityIdFetch(listPostInput);

      if (responseData) {
        setPosts((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        subForum?.creatorId &&
        currentUser.id === subForum.creatorId && (
          <Button
            size="md"
            _text={{ fontWeight: "600", color: "eGreen.400" }}
            variant="unstyled"
            onPress={() => {
              navigation.navigate("SubForumMod");
            }}
          >
            Manage
          </Button>
        ),
    });
  }, [currentUser.id, navigation, subForum]);

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
        authorId={item.author.id}
        contentText={item.content}
        avatarUrl={item.author.profileImageUrl}
        timeStamp={item.postedDate}
        mediaS3Key={item.mediaS3Key}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={PostCardRenderer}
        ListHeaderComponent={() => (
          <SubForumCard
            id={subForum?.id}
            name={subForum?.name}
            description={subForum?.description}
            profileImageS3Key={subForum?.profileImageS3Key}
            coverImageS3Key={subForum?.bannerImageS3Key}
            _version={subForum?._version}
            creatorId={subForum?.creatorId}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={() => handlePagination()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const getCommunityFetch = async (id: string) => {
  try {
    const getCommunityData = (await API.graphql({
      query: getCommunity,
      variables: { id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<getCommunity>;

    if (getCommunityData.data?.getCommunity) {
      const community = getCommunityData.data.getCommunity;
      return community;
    }
  } catch (err) {
    console.error(
      "Error occured while fetching community in subforum screen",
      err
    );
  }
};

interface listPostByCommunityIdFetchInput_ {
  id: string;
  limit: number;
  sortDirection: "ASC" | "DESC";
  nextToken?: string;
}

const listPostByCommunityIdFetch = async (
  input: listPostByCommunityIdFetchInput_
) => {
  try {
    const listCommunityData = (await API.graphql({
      query: listPostByCommunityId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listPostByCommunityId_>;

    if (listCommunityData.data?.getCommunity) {
      const { posts } = listCommunityData.data.getCommunity;
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

interface getCommunity {
  getCommunity?: Community;
}

interface Community {
  id: string;
  description: string;
  name: string;
  profileImageS3Key: string;
  bannerImageS3Key: string;
  creatorId: string;
  _version: number;
}

const getCommunity = /* GraphQL */ `
  query getCommunity($id: ID!) {
    getCommunity(id: $id) {
      id
      description
      name
      profileImageS3Key
      bannerImageS3Key
      creatorId
      _version
    }
  }
`;

interface listPostByCommunityId_ {
  getCommunity?: {
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
}

const listPostByCommunityId = /* GraphQL */ `
  query ListPostByCommunityId(
    $id: ID!
    $nextToken: String
    $sortDirection: ModelSortDirection
    $limit: Int
  ) {
    getCommunity(id: $id) {
      posts(
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
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
        }
        nextToken
      }
    }
  }
`;
