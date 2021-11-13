import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Avatar,
  Box,
  Fab,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { MessageRootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type NavigationProp_ = StackNavigationProp<
  MessageRootStackParamList,
  "ChatList"
>;

interface Props_ {}

const ChatCard: React.FC = () => {
  const Navigation = useNavigation<NavigationProp_>();
  return (
    <Pressable
      onPress={() => {
        Navigation.push("ChatRoom");
      }}
    >
      <Box
        alignItems="center"
        bg="white"
        py="4"
        borderBottomWidth="1"
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <HStack alignItems="center" space={3}>
            <Avatar
              bg="green.500"
              size="40px"
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            >
              <Text
                fontSize="sm"
                fontFamily="body"
                fontWeight="600"
                color="white"
              >
                {"sujitha".charAt(0).toUpperCase() || "Ef"}
              </Text>
            </Avatar>
            <VStack>
              <Text color="coolGray.800" _dark={{ color: "warmGray.50" }} bold>
                Ferdinand
              </Text>
              <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                Add me as your friend
              </Text>
            </VStack>
            <Spacer />
            <VStack>
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                alignSelf="flex-start"
              >
                3.21 pm
              </Text>
              <Box
                borderRadius="full"
                bg="green.500"
                width="20px"
                alignItems="center"
                justifyContent="center"
                height="20px"
                alignSelf="flex-end"
              >
                <Text fontSize="xs" color="white" bold>
                  2
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

export const ChatList: React.FC<Props_> = () => {
  return (
    <Box style={styles.container}>
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <Fab
        placement="bottom-right"
        bg="eGreen.400"
        variant="unstyled"
        bottom={"100px"}
        size="lg"
        icon={<AntDesign name="plus" size={24} color="white" />}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
