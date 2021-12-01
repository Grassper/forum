import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Text } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "ChooseSubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "ChooseSubForum">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const ChooseSubForum: React.FC<Props_> = ({ navigation, route }) => {
  const currentUser = React.useContext(UserContext).user;

  const [communities, setCommunities] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

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

  const populateContent = React.useCallback(async () => {
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
  }, [currentUser]);

  React.useEffect(() => {
    populateContent();
  }, [populateContent]);

  const CommunityTileRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <CommunityTile
        name={item.community.name}
        profileImageS3Key={item.community.profileImageS3Key}
        hideDivider
        onPress={() => {
          navigation.navigate("AddAndEditPost", {
            ...route.params,
            name: item.community.name,
            profileImageS3Key: item.community.profileImageS3Key,
            communityId: item.community.id,
          });
        }}
      />
    );
  };

  return (
    <Box style={styles.container} bg="white" alignItems="center">
      <Box pt="15px" width="90%" mb="1.5">
        <Text mb="4" fontSize="md">
          Post to
        </Text>
        <SearchBar />
      </Box>
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
      ) {
        items {
          community {
            id
            name
            profileImageS3Key
          }
        }
        nextToken
      }
    }
  }
`;
