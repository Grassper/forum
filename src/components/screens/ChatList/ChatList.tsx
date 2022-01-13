import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  CompositeNavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { MessageFallback } from "@/root/src/components/shared/Icons";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "ChatList">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const ChatList: React.FC<Props_> = ({ navigation }) => {
  const [chatRooms, setChatRooms] = React.useState<ChatRooms_["items"]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [isStateReady, setStateReady] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const [loading, setLoading] = React.useState(false);

  const [noChatRooms, setNoChatRooms] = React.useState(false);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (currentUser.id) {
        if (chatRooms.length === 0 && !noChatRooms) {
          setLoading(true);
        }
        const ListChatRoomInput: ListChatRoomFetchInput_ = {
          id: currentUser.id,
        };

        const responseData = await ListChatRoom(ListChatRoomInput);
        if (responseData) {
          if (responseData.items.length === 0) {
            setNoChatRooms(true);
          } else {
            setNoChatRooms(false);
            setChatRooms(responseData.items);
            setNextToken(responseData.nextToken);
          }
        }
        if (loading) {
          setLoading(false);
        }
      }
    };
    fetchCall();
  }, [chatRooms.length, currentUser.id, loading, noChatRooms]);

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
      headerLeft: () => <BackButton color="eGreen.400" />,
    });
  }, [navigation]);

  const ChatCardRenderer: ListRenderItem<ChatRoomsItem_> = ({ item }) => {
    const pickOppositeUser = item.chatRoom.users.items.filter(
      (entry) => entry.user.id !== currentUser.id
    );

    return (
      <UserCard
        avatarUrl={pickOppositeUser[0].user.profileImageUrl}
        id={item.chatRoom.id}
        onPress={() => {
          navigation.push("ChatRoom", {
            title: pickOppositeUser[0].user.username,
            imageUri: pickOppositeUser[0].user.profileImageUrl,
            roomId: item.chatRoom.id,
          });
        }}
        username={pickOppositeUser[0].user.username}
      />
    );
  };

  const keyExtractor = React.useCallback((item) => item.chatRoom.id, []);

  if (!isStateReady || loading) {
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
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
        <CommunityTile hideDivider />
      </ScrollView>
    );
  }

  if (noChatRooms) {
    return (
      <>
        <MessageFallback />
        <FloatingActionButton
          onPress={() => navigation.push("NewChat")}
          screen="ChatList"
        />
      </>
    );
  }

  return (
    <Box alignItems="center" bg="white" style={styles.container}>
      <Box alignItems="center" py="15px" width="95%">
        <Box width="100%">
          <FlatList
            data={chatRooms}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={8}
            onEndReached={handlePagination}
            renderItem={ChatCardRenderer}
            windowSize={5}
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
  limit?: number;
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
