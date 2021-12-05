import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { useDebounce } from "@/root/src/hooks";

/**
 * todo 1: search reimplement and update the flatlist
 * todo 2: write onclick functin for click the item in the
 *  flatlist which create the chatroom for that personalize
 * todo3: navigate to that newly created chatroom if that chatroom already exist use that one
 *
 *
 */
type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "NewChat">,
  DrawerNavigationProp<DrawerParamList_>
>;

interface Props_ {
  Navigation: NavigationProp_;
}

interface UserCard_ {
  id: string;
  username: string;
  profileImageUrl: string;
}

const UserCardRenderer: ListRenderItem<UserCard_> = ({ item }) => {
  return (
    <UserCard
      id={item.id}
      username={item.username}
      avatarUrl={item.profileImageUrl}
    />
  );
};

export const NewChat: React.FC<Props_> = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [profiles, setProfiles] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (debouncedSearchTerm) {
        const searchUsersInput: searchUsersFetchInput_ = {
          limit: 10,
          username: debouncedSearchTerm,
        };

        const responseData = await searchUsersFetch(searchUsersInput);
        if (responseData && isActive) {
          setProfiles(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [debouncedSearchTerm]);

  useFocusEffect(populateContent);

  const handlePagination = async () => {
    if (nextToken && debouncedSearchTerm) {
      const searchUsersInput: searchUsersFetchInput_ = {
        limit: 10,
        username: debouncedSearchTerm,
        nextToken,
      };

      const responseData = await searchUsersFetch(searchUsersInput);

      if (responseData) {
        setProfiles((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };
  return (
    <Box style={styles.container} bg="white" alignItems="center">
      <Box alignItems="center" width="90%" py="15px">
        <SearchBar value={searchValue} setValue={setSearchValue} />
        <Box my="4" width="100%">
          <FlatList
            data={profiles}
            renderItem={UserCardRenderer}
            keyExtractor={(item) => item.id}
            onEndReached={() => handlePagination()}
          />
        </Box>
      </Box>
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
