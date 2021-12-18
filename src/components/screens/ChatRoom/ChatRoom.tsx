import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Feather } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, HStack, Text } from "native-base";
import React from "react";
import {
  FlatList,
  InteractionManager,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import { SvgUri } from "react-native-svg";

import { Observable } from "@/root/node_modules/zen-observable-ts";
import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { UserContext } from "@/root/src/context";

import { ChatCard } from "./ChatCard";
import { InputField } from "./InputField";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "ChatRoom">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "ChatRoom">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const ChatRoom: React.FC<Props_> = ({ route, navigation }) => {
  const flatListRef: React.RefObject<FlatList> = React.createRef();

  const { imageUri, title, roomId } = route.params;

  const [messages, setMessages] = React.useState<Item[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");

  const currentUser = React.useContext(UserContext).user;

  React.useEffect(() => {
    if (roomId) {
      const subscription = API.graphql({
        query: onCreateMessageByChatRoomId,
        variables: { chatRoomId: roomId },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      }) as Observable<object>;
      subscription.subscribe({
        next: (payload: {
          value: GraphQLResult<onCreateMessageByChatRoomId_>;
        }) => {
          /**
           * check if message exist
           * update the received message to current messages
           */

          const subscriptionMessage = payload.value.data?.onMessageByChatRoomId;
          if (subscriptionMessage) {
            setMessages((prevState) => [subscriptionMessage, ...prevState]);
          }
        },
        error: (error) => console.warn(error),
      });

      // @ts-ignore
      return subscription.unsubscribe;
    }
  }, [roomId]);

  const populateContent = React.useCallback(() => {
    const fetchCall = async () => {
      if (roomId) {
        const listMessageInput: ListMessageFetchInput_ = {
          limit: 10,
          chatRoomId: roomId,
        };

        const responseData = await ListMessageFetch(listMessageInput);
        if (responseData) {
          setMessages(responseData.items);
          setNextToken(responseData.nextToken);
        }
      }
    };
    fetchCall();
  }, [roomId]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        populateContent();
      });
      return () => {
        task.cancel();
      };
    }, [populateContent])
  );

  const ChatCardRenderer: ListRenderItem<Item> = ({ item }) => {
    return (
      <ChatCard
        content={item.content}
        timeStamp={item.createdAt}
        align={item.userId === currentUser.id ? "right" : "left"}
      />
    );
  };

  const handlePagination = async () => {
    if (nextToken && roomId) {
      const listMessageInput: ListMessageFetchInput_ = {
        limit: 10,
        chatRoomId: roomId,
        nextToken,
      };

      const responseData = await ListMessageFetch(listMessageInput);

      if (responseData) {
        setMessages((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Feather
          name="chevron-left"
          size={30}
          color="green"
          mr="100"
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: () => (
        <Box>
          <HStack alignItems="center">
            <Box
              width="35px"
              height="35px"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri uri={imageUri} width="100%" height="100%" />
            </Box>
            <Text
              fontSize="sm"
              fontWeight="400"
              ml="2"
              textTransform="capitalize"
            >
              {title}
            </Text>
          </HStack>
        </Box>
      ),
    });
  }, [imageUri, navigation, title]);

  return (
    <Box flex="1" bg="green.900">
      <Box alignItems="center" style={styles.container} py="4">
        <Box width="95%">
          <FlatList
            ref={flatListRef}
            data={messages}
            inverted
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={100}
            renderItem={ChatCardRenderer}
            keyExtractor={(item) => item.id}
            onEndReached={handlePagination}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Box>
      <InputField chatRoomId={roomId} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

interface ListMessageFetchInput_ {
  chatRoomId: string;
  limit: number;
  nextToken?: string;
}

const ListMessageFetch = async (input: ListMessageFetchInput_) => {
  try {
    const listMessageResponseData = (await API.graphql({
      query: listMessagesByChatRoom,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listMessagesByChatRoom_>;

    if (listMessageResponseData.data?.messagesByChatRoom) {
      return listMessageResponseData.data?.messagesByChatRoom;
    }
  } catch (err) {
    console.error("Error occured while listing by chatroom id", err);
  }
};

/**
 * todo 4: grapqhl subscriptions
 * todo 5: subscribe to the message by when user visit the screen
 */

interface listMessagesByChatRoom_ {
  messagesByChatRoom?: MessagesByChatRoom;
}

interface MessagesByChatRoom {
  items: Item[];
  nextToken: string;
}

interface Item {
  id: string;
  content: string;
  chatRoomId: string;
  createdAt: Date;
  userId: string;
}

const listMessagesByChatRoom = /* GraphQL */ `
  query listMessagesByChatRoom(
    $chatRoomId: ID!
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomId: $chatRoomId
      sortDirection: DESC
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        chatRoomId
        createdAt
        userId
      }
      nextToken
    }
  }
`;

interface onCreateMessageByChatRoomId_ {
  onMessageByChatRoomId?: {
    id: string;
    content: string;
    chatRoomId: string;
    userId: string;
    createdAt: Date;
  };
}

const onCreateMessageByChatRoomId = /* GraphQL */ `
  subscription onCreateMessageByChatRoomId($chatRoomId: ID!) {
    onMessageByChatRoomId(chatRoomId: $chatRoomId) {
      id
      content
      chatRoomId
      userId
      createdAt
    }
  }
`;
