import { GraphQLResult } from "@aws-amplify/api-graphql";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Button } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList_, "JoinedSubForum">,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList_, "HomeDrawer">,
    CompositeNavigationProp<
      StackNavigationProp<StackParamList_, "BottomTabNav">,
      StackNavigationProp<RootStackParamList_, "Application">
    >
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const JoinedSubForum: React.FC<Props_> = ({ navigation }) => {
  const currentUser = React.useContext(UserContext).user; // this context provided current login user

  const [communities, setCommunities] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);

  const handlePagination = async () => {
    if (nextToken) {
      const listCommunityInput: listCommunityByUserIdFetchInput_ = {
        id: currentUser.id,
        limit: 10,
        sortDirection: "DESC",
        nextToken,
      };

      const responseData = await listCommunityByUserIdFetch(listCommunityInput);

      if (responseData) {
        setCommunities((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      const listCommunityInput: listCommunityByUserIdFetchInput_ = {
        id: currentUser.id,
        limit: 10,
        sortDirection: "DESC",
      };

      const responseData = await listCommunityByUserIdFetch(listCommunityInput);
      if (responseData) {
        setCommunities(responseData.items);
        setNextToken(responseData.nextToken);
      }
    };
    fetchCall();
  }, [currentUser]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
        setStateReady(true);
      });
      return () => task.cancel();
    }, [populateContent])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderProfileIcon />,
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          variant="unstyled"
          onPress={() =>
            navigation.push("EditAndCreateSubForum", {
              title: "Create Subforum",
              action: "Add",
            })
          }
        >
          Create
        </Button>
      ),
    });
  }, [navigation]);

  const CommunityTileRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <CommunityTile
        name={item.community.name}
        profileImageS3Key={item.community.profileImageS3Key}
        members={item.community.totalMembers}
        hideDivider
        onPress={() =>
          navigation.navigate("SubForum", {
            subForumId: item.community.id,
            title: item.community.name,
          })
        }
      />
    );
  };

  if (!isStateReady) {
    return (
      <ScrollView>
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
      </ScrollView>
    );
  }

  return (
    <Box bg="white" alignItems="center" style={styles.container}>
      <Box width="100%" style={styles.container}>
        <FlatList
          data={communities}
          renderItem={CommunityTileRenderer}
          keyExtractor={(item) => item.community.id}
          onEndReached={() => handlePagination()}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * Todo-5: if no community joined, created or moderated by users
 */

/**
 * api calls
 */

interface listCommunityByUserIdFetchInput_ {
  id: string;
  limit: number;
  sortDirection: "ASC" | "DESC";
  nextToken?: string;
}

const listCommunityByUserIdFetch = async (
  input: listCommunityByUserIdFetchInput_
) => {
  try {
    const listCommunityData = (await API.graphql({
      query: listCommunityByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listCommunityByUserId_>;

    if (listCommunityData.data?.getUser) {
      const { communities } = listCommunityData.data.getUser;
      return communities;
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

interface listCommunityByUserId_ {
  getUser?: {
    communities: {
      items: Item[];
      nextToken: string;
    };
  };
}

interface Item {
  community: Community;
}

interface Community {
  id: string;
  name: string;
  profileImageS3Key: string;
  totalMembers: number;
}

const listCommunityByUserId = /* GraphQL */ `
  query listCommunityByUserId(
    $id: ID!
    $limit: Int
    $sortDirection: ModelSortDirection
    $nextToken: String
  ) {
    getUser(id: $id) {
      communities(
        limit: $limit
        sortDirection: $sortDirection
        nextToken: $nextToken
        filter: { isDeleted: { attributeExists: false } }
      ) {
        items {
          community {
            id
            name
            profileImageS3Key
            totalMembers
          }
        }
        nextToken
      }
    }
  }
`;
