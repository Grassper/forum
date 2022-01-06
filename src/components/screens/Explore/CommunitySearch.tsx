import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { API } from "aws-amplify";
import { Box, Image } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from "react-native";

import { CommunityTile } from "@/root/src/components/shared/Tile";
import { colors } from "@/root/src/constants";

import { TabNavigatorExploreContext } from "./context";

export const CommunitySearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);
  const [community, setCommunity] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);

  const navigation = useNavigation();

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (searchValue) {
        const searchUsersInput: searchCommunityFetchInput_ = {
          limit: 10,
          searchcommunityvalue: searchValue,
        };

        const responseData = await searchCommunityFetch(searchUsersInput);
        if (responseData) {
          setCommunity(responseData.items);
          setNextToken(responseData.nextToken);
        }
      } else {
        setCommunity([]);
        setNextToken("");
      }
    };
    fetchCall();
  }, [searchValue]);

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
      const searchUsersInput: searchCommunityFetchInput_ = {
        limit: 10,
        searchcommunityvalue: searchValue,
        nextToken,
      };

      const responseData = await searchCommunityFetch(searchUsersInput);

      if (responseData) {
        setCommunity((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };
  const CommunityCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <CommunityTile
        hideDivider
        members={item.totalMembers}
        name={item.name}
        onPress={() => {
          navigation.dispatch(
            StackActions.push("Application", {
              screen: "SubForum",
              params: {
                subForumId: item.id,
                title: item.name,
              },
            })
          );
        }}
        profileImageS3Key={item.profileImageS3Key}
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
      </ScrollView>
    );
  }

  return (
    <Box bg={colors.white} pt="4" style={styles.container}>
      {community.length ? (
        <FlatList
          data={community}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={8}
          onEndReached={() => handlePagination()}
          renderItem={CommunityCardRenderer}
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

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});

/**api calls */
interface searchCommunityFetchInput_ {
  limit: number;
  nextToken?: string;
  searchcommunityvalue: string;
}
const searchCommunityFetch = async (input: searchCommunityFetchInput_) => {
  try {
    const listSearchCommunityData = (await API.graphql({
      query: searchCommunity,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<searchCommunity_>;
    if (listSearchCommunityData.data?.listCommunitys) {
      const communitySearchData = listSearchCommunityData.data.listCommunitys;

      return communitySearchData;
    }
  } catch (err) {
    console.error(
      "Error occured while searching community in explore screen",
      err
    );
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface searchCommunity_ {
  listCommunitys?: ListCommunitys;
}

interface ListCommunitys {
  items: Item[];
  nextToken: string;
}

interface Item {
  id: string;
  profileImageS3Key: string;
  name: string;
  owner: string;
  totalMembers: number;
}

const searchCommunity = /* GraphQL */ `
  query searchCommunity(
    $searchcommunityvalue: String
    $nextToken: String
    $limit: Int
  ) {
    listCommunitys(
      limit: $limit
      filter: { name: { contains: $searchcommunityvalue } }
      nextToken: $nextToken
    ) {
      items {
        id
        profileImageS3Key
        name
        owner
        totalMembers
      }
      nextToken
    }
  }
`;
