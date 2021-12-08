import { GraphQLResult } from "@aws-amplify/api-graphql";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
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
  BottomTabParamList_,
  DrawerParamList_,
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "ChatList">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_, "BottomTabNav">,
    CompositeNavigationProp<
      DrawerNavigationProp<DrawerParamList_, "StackNav">,
      StackNavigationProp<RootStackParamList_, "Application">
    >
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const ChatList: React.FC<Props_> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = React.useState<ChatRooms_["items"]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const currentUser = React.useContext(UserContext).user;

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (currentUser.id) {
        const ListChatRoomInput: ListChatRoomFetchInput_ = {
          id: currentUser.id,
          limit: 10,
        };

        const responseData = await ListChatRoom(ListChatRoomInput);
        if (responseData && isActive) {
          setChatRooms(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [currentUser.id]);

  const handlePagination = async () => {
    if (nextToken && currentUser.id) {
      const ListChatRoomInput: ListChatRoomFetchInput_ = {
        id: currentUser.id,
        limit: 10,
        nextToken,
      };

      const responseData = await ListChatRoom(ListChatRoomInput);

      if (responseData) {
        setChatRooms((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  useFocusEffect(populateContent);

  const ChatCardRenderer: ListRenderItem<ChatRoomsItem_> = ({ item }) => {
    const pickOppositeUser = item.chatRoom.users.items.filter(
      (entry) => entry.user.id !== currentUser.id
    );

    return (
      <UserCard
        id={item.chatRoom.id}
        username={pickOppositeUser[0].user.username}
        avatarUrl={pickOppositeUser[0].user.profileImageUrl}
        onPress={() => {
          navigation.navigate("ChatRoom", {
            title: pickOppositeUser[0].user.username,
            imageUri: pickOppositeUser[0].user.profileImageUrl,
            roomId: item.chatRoom.id,
          });
        }}
      />
    );
  };

  return (
    <Box style={styles.container} bg="white" alignItems="center">
      <Box alignItems="center" width="95%" py="15px">
        <Box width="100%">
          <FlatList
            data={chatRooms}
            renderItem={ChatCardRenderer}
            keyExtractor={(item) => item.chatRoom.id}
            onEndReached={() => handlePagination()}
          />
        </Box>
      </Box>

      <FloatingActionButton
        onPress={() => navigation.push("NewChat")}
        screen="ChatList"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});

/**
 * api calls
 */

interface ListChatRoomFetchInput_ {
  id: string;
  nextToken?: string;
  limit: number;
}

const ListChatRoom = async (input: ListChatRoomFetchInput_) => {
  try {
    const responseData = (await API.graphql({
      query: ListUserChatRooms,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<ListUserChatRooms_>;

    const chatRoomList = responseData.data?.getUser?.chatRooms;

    if (chatRoomList) {
      return chatRoomList;
    }
  } catch (err) {
    console.error("Error occured while listing chat rooms for user", err);
  }
};

/**
 * Graphql queries and types
 */

interface ListUserChatRooms_ {
  getUser?: { chatRooms: ChatRooms_ };
}

interface ChatRooms_ {
  items: ChatRoomsItem_[];
  nextToken: string;
}

interface ChatRoomsItem_ {
  chatRoom: ChatRoom_;
}

interface ChatRoom_ {
  id: string;
  users: Users_;
}

interface Users_ {
  items: UsersItem_[];
}

interface UsersItem_ {
  user: User_;
}

interface User_ {
  username: string;
  id: string;
  profileImageUrl: string;
}

const ListUserChatRooms = /* GraphQL */ `
  query getUserChatRooms($id: ID!, $nextToken: String, $limit: Int) {
    getUser(id: $id) {
      chatRooms(sortDirection: DESC, nextToken: $nextToken, limit: $limit) {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  username
                  id
                  profileImageUrl
                }
              }
            }
          }
        }
        nextToken
      }
    }
  }
`;
