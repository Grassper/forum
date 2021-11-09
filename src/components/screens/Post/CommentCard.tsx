import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Avatar, Box, HStack, Icon, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props_ {}

export const CommentCard: React.FC<Props_> = () => {
  return (
    <Box
      alignItems="center"
      bg="white"
      py="4"
      borderBottomWidth="1"
      borderBottomColor="border.400"
    >
      <Box width="90%">
        <HStack alignItems="center" justifyContent="space-between" mb="3">
          <HStack alignItems="center" space="3">
            <Pressable onPress={() => {}}>
              <Avatar
                bg="green.500"
                width="38"
                height="38"
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
            </Pressable>
            <Box>
              <Text fontWeight="500">Anthony</Text>
              <HStack alignItems="center">
                <Text fontSize="xs" color="blueGray.500">
                  in e/Mechkeys
                </Text>
                <Box bg="blueGray.500" style={styles.separatorDot} />
                <Text fontSize="xs" color="blueGray.500">
                  Nov 14
                </Text>
              </HStack>
            </Box>
          </HStack>
          <Icon
            as={<Ionicons name="ellipsis-vertical" />}
            size={5}
            color="muted.500"
          />
        </HStack>
        <Text mb="4">
          You know you're in love when you cant't fall asleep because reality is
          finally better than your dreams
        </Text>
        <Box>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack space="3" alignItems="center">
              <Pressable onPress={() => {}}>
                <Icon
                  as={<AntDesign name="caretcircleoup" />}
                  size={5}
                  color="muted.500"
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Box style={styles.downVoteIcon}>
                  <Icon
                    as={<AntDesign name="caretcircleoup" />}
                    size={5}
                    color="muted.500"
                  />
                </Box>
              </Pressable>
            </HStack>
            <Pressable onPress={() => {}}>
              <Box>
                <Text>Reply</Text>
              </Box>
            </Pressable>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  downVoteIcon: {
    transform: [{ rotate: "180deg" }],
  },
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});
