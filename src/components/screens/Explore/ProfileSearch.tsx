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
import { colors } from "@/root/src/constants";

import { TabNavigatorExploreContext } from "./context";

export const ProfileSearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);
  const navigation = useNavigation();
  const [profiles, setProfiles] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (searchValue) {
        const searchUsersInput: searchUsersFetchInput_ = {
          limit: 10,
          username: searchValue,
        };

        const responseData = await searchUsersFetch(searchUsersInput);
        if (responseData) {
          setProfiles(responseData.items);
          setNextToken(responseData.nextToken);
        }
      } else {
        setProfiles([]);
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

  if (!isStateReady) {
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

  return (
    <Box bg={colors.white} pt="4" style={styles.container}>
      <FlatList
        data={profiles}
        initialNumToRender={5}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={5}
        onEndReached={() => handlePagination()}
        renderItem={ProfileCardRenderer}
        updateCellsBatchingPeriod={100}
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
  limit: number;
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
