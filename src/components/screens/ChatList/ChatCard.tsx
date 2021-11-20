import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;
export const ChatCard: React.FC = () => {
  const Navigation = useNavigation<NavigationProp_>();
  return (
    <Pressable
      onPress={() => {
        Navigation.push("ChatRoom", {
          title: "Ferdinand",
          imageUri:
            "https://avatars.dicebear.com/api/micah/ram.svg?mouth=smile&baseColor=apricot",
        });
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
            <Box
              width="40px"
              height="40px"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri
                uri="https://avatars.dicebear.com/api/micah/ram.svg?mouth=smile&baseColor=apricot"
                width="100%"
                height="100%"
              />
            </Box>
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
