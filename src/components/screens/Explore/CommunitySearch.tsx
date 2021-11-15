import {
  Avatar,
  Box,
  HStack,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props_ {}

const ChatCard: React.FC = () => {
  return (
    <Pressable onPress={() => {}}>
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
              <Text
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                fontWeight="500"
              >
                e/Mechkeys
              </Text>
              <Text
                color="coolGray.600"
                _dark={{ color: "warmGray.200" }}
                fontSize="xs"
              >
                1.6M Members
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

export const CommunitySearch: React.FC<Props_> = () => {
  return (
    <ScrollView style={styles.container}>
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
