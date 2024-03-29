import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Button } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { PostFallback } from "@/root/src/components/shared/Icons";
import { ReportCommunity } from "@/root/src/components/shared/Report";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "SubForum">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const SubForum: React.FC<Props_> = ({ navigation, route }) => {
  const { subForumId } = route.params;

  const [subForum, setSubForum] = React.useState<Community>();
  const [reportModal, setReportModal] = React.useState(false);

  const [posts, setPosts] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const [isStateReady, setStateReady] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const [loading, setLoading] = React.useState(false);
  const [noPostToShow, setNoPostToShow] = React.useState(false);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (posts.length === 0 && !noPostToShow) {
        setLoading(true);
      }

      const listPostInput: listPostByCommunityIdFetchInput_ = {
        id: subForumId,
        currentUserId: currentUser.id,
        sortDirection: "DESC",
      };

      const getCommunityInput: getCommunityFetch_ = {
        id: subForumId,
        currentUserId: currentUser.id,
      };

      const getCommunityData = await getCommunityFetch(getCommunityInput);
      const listPostData = await listPostByCommunityIdFetch(listPostInput);

      if (getCommunityData) {
        setSubForum(getCommunityData);
      }

      if (listPostData) {
        if (listPostData.items.length === 0) {
          setNoPostToShow(true);
        } else {
          setNoPostToShow(false);
          setPosts(listPostData.items);
          setNextToken(listPostData.nextToken);
        }
      }
      if (loading) {
        setLoading(false);
      }
    };
    fetchCall();
  }, [currentUser.id, loading, noPostToShow, posts.length, subForumId]);

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
      const listPostInput: listPostByCommunityIdFetchInput_ = {
        id: subForumId,
        currentUserId: currentUser.id,
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
      headerLeft: () => <BackButton color="eGreen.400" />,
      headerRight: () =>
        subForum?.creatorId &&
        currentUser.id !== subForum.creatorId && (
          <Button
            _text={{ fontWeight: "600", color: "eGreen.400" }}
            onPress={() => setReportModal(true)}
            size="md"
            variant="unstyled"
          >
            Help
          </Button>
        ),
    });
  }, [currentUser.id, navigation, reportModal, subForum]);

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
        <SubForumCard />
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
    return (
      <View style={styles.container}>
        {subForum && (
          <ReportCommunity
            communityId={subForum.id}
            reportModal={reportModal}
            setReportModal={setReportModal}
          />
        )}
        <SubForumCard
          _version={subForum?._version}
          coverImageS3Key={subForum?.bannerImageS3Key}
          creatorId={subForum?.creatorId}
          description={subForum?.description}
          id={subForum?.id}
          members={subForum?.members}
          name={subForum?.name}
          profileImageS3Key={subForum?.profileImageS3Key}
          totalMembers={subForum?.totalMembers}
          totalPosts={subForum?.totalPosts}
        />
        <PostFallback />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {subForum && (
        <ReportCommunity
          communityId={subForum.id}
          reportModal={reportModal}
          setReportModal={setReportModal}
        />
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <SubForumCard
            _version={subForum?._version}
            coverImageS3Key={subForum?.bannerImageS3Key}
            creatorId={subForum?.creatorId}
            description={subForum?.description}
            id={subForum?.id}
            members={subForum?.members}
            name={subForum?.name}
            profileImageS3Key={subForum?.profileImageS3Key}
            totalMembers={subForum?.totalMembers}
            totalPosts={subForum?.totalPosts}
          />
        )}
        maxToRenderPerBatch={8}
        onEndReached={() => handlePagination()}
        renderItem={PostCardRenderer}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

interface getCommunityFetch_ {
  id: string;
  currentUserId: string;
}

const getCommunityFetch = async (input: getCommunityFetch_) => {
  try {
    const getCommunityData = (await API.graphql({
      query: getCommunity,
      variables: input,
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
  currentUserId: string;
  limit?: number;
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
  totalMembers: number;
  totalPosts: number;
  members: { items: { userId: string }[] };
}

const getCommunity = /* GraphQL */ `
  query getCommunity($id: ID!, $currentUserId: ID!) {
    getCommunity(id: $id) {
      id
      description
      name
      profileImageS3Key
      bannerImageS3Key
      creatorId
      _version
      totalMembers
      totalPosts
      members(
        filter: {
          isDeleted: { attributeExists: false }
          userId: { eq: $currentUserId }
        }
      ) {
        items {
          userId
        }
      }
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
  userPostMetric: UserPostMetric;
}

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
}

const listPostByCommunityId = /* GraphQL */ `
  query ListPostByCommunityId(
    $id: ID!
    $currentUserId: ID!
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
