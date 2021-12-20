import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

export const ChatCard: React.FC = () => {
  return (
    <Pressable onPress={() => {}}>
      <Box
        alignItems="center"
        bg="white"
        borderBottomColor="border.400"
        borderBottomWidth="1"
        py="4"
      >
        <Box width="90%">
          <HStack alignItems="center" space={3}>
            <Box
              bg="amber.100"
              borderRadius="full"
              height="40px"
              overflow="hidden"
              width="40px"
            >
              <SvgUri
                height="100%"
                uri="https://avatars.dicebear.com/api/micah/ram.svg?mouth=smile&baseColor=apricot"
                width="100%"
              />
            </Box>
            <VStack>
              <Text _dark={{ color: "warmGray.50" }} bold color="coolGray.800">
                Ferdinand
              </Text>
              <Text _dark={{ color: "warmGray.200" }} color="coolGray.600">
                Add me as your friend
              </Text>
            </VStack>
            <Spacer />
            <VStack>
              <Text
                _dark={{ color: "warmGray.50" }}
                alignSelf="flex-start"
                color="coolGray.800"
                fontSize="xs"
              >
                3.21 pm
              </Text>
              <Box
                alignItems="center"
                alignSelf="flex-end"
                bg="green.500"
                borderRadius="full"
                height="20px"
                justifyContent="center"
                width="20px"
              >
                <Text bold color="white" fontSize="xs">
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
