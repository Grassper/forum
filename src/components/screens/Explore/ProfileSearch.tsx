import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { API } from "aws-amplify";
import { Box } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FollowCard } from "@/root/src/components/shared/Cards";
import { NoResults } from "@/root/src/components/shared/Icons";
import { colors } from "@/root/src/constants";

import { TabNavigatorExploreContext } from "./context";

export const ProfileSearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);
  const navigation = useNavigation();
  const [profiles, setProfiles] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);
  const [searching, setSearching] = React.useState(false);

  const [resultsNotFound, setResultsNotFound] = React.useState(false);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (searchValue) {
        if (profiles.length === 0 && !resultsNotFound) {
          setSearching(true);
        }
        const searchUsersInput: searchUsersFetchInput_ = {
          username: searchValue,
        };

        const responseData = await searchUsersFetch(searchUsersInput);
        if (responseData) {
          if (responseData.items.length === 0) {
            setResultsNotFound(true);
          } else {
            setResultsNotFound(false);
            setProfiles(responseData.items);
            setNextToken(responseData.nextToken);
          }
        }
        if (searching) {
          setSearching(false);
        }
      } else {
        setProfiles([]);
        setResultsNotFound(false);
        setNextToken("");
      }
    };
    fetchCall();
  }, [profiles.length, resultsNotFound, searchValue, searching]);

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
      const searchUsersInput: searchUsersFetchInput_ = {
        limit: 10,
        username: searchValue,
        nextToken,
      };

      const responseData = await searchUsersFetch(searchUsersInput);

      if (responseData) {
        setProfiles((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };
  const ProfileCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <FollowCard
        avatarUrl={item.profileImageUrl}
        id={item.id}
        onPress={() =>
          navigation.dispatch(
            StackActions.push("Application", {
              screen: "Profile",
              params: { userId: item.id },
            })
          )
        }
        username={item.username}
      />
    );
  };

  if (!isStateReady || searching) {
    return (
      <ScrollView>
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
        <FollowCard />
      </ScrollView>
    );
  }

  if (resultsNotFound) {
    return <NoResults />;
  }

  return (
    <Box bg={colors.white} pt="4" style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={8}
        onEndReached={() => handlePagination()}
        renderItem={ProfileCardRenderer}
        windowSize={5}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
/**api calls */
interface searchUsersFetchInput_ {
  limit?: number;
  nextToken?: string;
  username: string;
}
const searchUsersFetch = async (input: searchUsersFetchInput_) => {
  try {
    const listSearchUserData = (await API.graphql({
      query: searchUsers,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<searchUsers_>;
    if (listSearchUserData.data?.listUsers) {
      const userSearchData = listSearchUserData.data.listUsers;

      return userSearchData;
    }
  } catch (err) {
    console.error("Error occured while searching users in explore screen", err);
  }
};
/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface searchUsers_ {
  listUsers?: ListUsers;
}

interface ListUsers {
  items: Item[];
  nextToken: string;
}

interface Item {
  profileImageUrl: string;
  username: string;
  id: string;
}

const searchUsers = /* GraphQL */ `
  query searchUsers($limit: Int, $nextToken: String, $username: String) {
    listUsers(
      limit: $limit
      nextToken: $nextToken
      filter: { username: { contains: $username } }
    ) {
      items {
        profileImageUrl
        username
        id
      }
      nextToken
    }
  }
`;
