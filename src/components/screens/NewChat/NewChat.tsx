import { GraphQLResult } from "@aws-amplify/api-graphql";
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
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { UserContext } from "@/root/src/context";
import { useDebounce } from "@/root/src/hooks";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "NewChat">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

interface Props_ {
  navigation: NavigationProp_;
}

interface UserCard_ {
  id: string;
  username: string;
  profileImageUrl: string;
}

export const NewChat: React.FC<Props_> = ({ navigation }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [profiles, setProfiles] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const currentUser = React.useContext(UserContext).user;

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

  const UserCardRenderer: ListRenderItem<UserCard_> = ({ item }) => {
    return (
      <UserCard
        id={item.id}
        username={item.username}
        avatarUrl={item.profileImageUrl}
        onPress={async () => {
          if (currentUser.id && item.id) {
            const chatRoomId = await ChatRoomCreationFetch({
              userId: item.id,
              currentUserId: currentUser.id,
            });

            if (chatRoomId) {
              navigation.navigate("ChatRoom", {
                title: item.username,
                imageUri: item.profileImageUrl,
                roomId: chatRoomId,
              });
            }
          }
        }}
      />
    );
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

/**
 * * messaging
 * Todo-6: when user try to create the chat room for same user block
 * Todo-6: when user click the user card in user list check if chat room exist between two users. if exist pass the chatroom id
 */

interface ChatRoomCreationFetchInput_ {
  userId: string;
  currentUserId: string;
}

const ChatRoomCreationFetch = async (input: ChatRoomCreationFetchInput_) => {
  try {
    /**
     * creating chatroom
     * chatroom id pattern --> currentUserId#EF#anotherUserId
     * checking chatroom between user already exist query for currentUserId#EF#anotherUserId && anotherUserId#EF#currentUserId
     */

    const isCheckChatRoomExistInput = {
      chatRoomId1: `${input.currentUserId}#EF#${input.userId}`,
      chatRoomId2: `${input.userId}#EF#${input.currentUserId}`,
    };

    const isCheckChatRoomExist = (await API.graphql({
      query: CheckChatRoomExist,
      variables: isCheckChatRoomExistInput,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<checkChatRoomExist_>;

    const isCheckChatRoomExistItems =
      isCheckChatRoomExist.data?.listChatRooms?.items;

    if (isCheckChatRoomExistItems?.length === 1) {
      return isCheckChatRoomExistItems[0].id;
    }

    const createdChatRoom = (await API.graphql({
      query: CreateChatRoom,
      variables: { input: { id: `${input.currentUserId}#EF#${input.userId}` } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateChatRoom_>;

    if (createdChatRoom.data?.createChatRoom) {
      const chatRoomId = createdChatRoom.data?.createChatRoom.id;

      // adding user to created chatroom
      (await API.graphql({
        query: CreateChatRoomRelationship,
        variables: {
          input: {
            userId: input.userId,
            chatRoomId: chatRoomId,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateChatRoomRelationship_>;

      // adding current authenticated user to created chatroom
      (await API.graphql({
        query: CreateChatRoomRelationship,
        variables: {
          input: {
            userId: input.currentUserId,
            chatRoomId: chatRoomId,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateChatRoomRelationship_>;

      return chatRoomId;
    }
  } catch (err) {
    console.error("Error occured while creating ChatRoom", err);
  }
};

interface CreateChatRoom_ {
  createChatRoom?: { id: string };
}

const CreateChatRoom = /* GraphQL */ `
  mutation CreateChatRoom($input: CreateChatRoomInput!) {
    createChatRoom(input: $input) {
      id
    }
  }
`;

interface CreateChatRoomRelationship_ {
  createUserChatRoomRelationship?: {
    id: string;
    userId: string;
    chatRoomId: string;
  };
}

const CreateChatRoomRelationship = /* GraphQL */ `
  mutation CreateChatRoomRelationship(
    $input: CreateUserChatRoomRelationshipInput!
  ) {
    createUserChatRoomRelationship(input: $input) {
      id
      userId
      chatRoomId
    }
  }
`;

interface checkChatRoomExist_ {
  listChatRooms?: {
    items: {
      id: string;
    }[];
  };
}

const CheckChatRoomExist = /* GraphQL */ `
  query checkChatRoomExist($chatRoomId1: ID!, $chatRoomId2: ID!) {
    listChatRooms(
      filter: {
        or: [{ id: { eq: $chatRoomId1 } }, { id: { eq: $chatRoomId2 } }]
      }
    ) {
      items {
        id
      }
    }
  }
`;
