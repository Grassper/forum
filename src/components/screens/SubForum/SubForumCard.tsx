import { Avatar, Box, Button, HStack, Image, Text } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { useToggle } from "@/root/src/hooks";

interface Props_ {}

const windowWidth = Dimensions.get("window").width;

export const SubForumCard: React.FC<Props_> = () => {
  const [value, toggleValue] = useToggle(true);
  return (
    <Box>
      <Image
        width="100%"
        height="115"
        alt="fallback text"
        source={{
          uri: "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?cs=srgb&dl=pexels-soumil-kumar-735911.jpg&fm=jpg",
        }}
        fallbackSource={{
          uri: "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?cs=srgb&dl=pexels-fox-1038916.jpg&fm=jpg",
        }}
      />
      <Box bg="white">
        <Avatar
          bg="green.500"
          mt="-20"
          ml={windowWidth * 0.025}
          size="xl"
          source={{
            uri: "https://images.pexels.com/photos/4792716/pexels-photo-4792716.jpeg?cs=srgb&dl=pexels-anete-lusina-4792716.jpg&fm=jpg",
          }}
        >
          <Text fontSize="md" fontFamily="body" fontWeight="600" color="white">
            Dk
          </Text>
        </Avatar>
      </Box>
      <HStack bg="white" justifyContent="center" pb="4">
        <Box width="90%">
          <HStack mb="2" alignItems="flex-end" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="500">
              MechKeys
            </Text>
            <Button
              onPress={() => toggleValue()}
              bg={value ? "tertiary.500" : "danger.500"}
              variant="unstyled"
              minWidth="24"
              borderRadius="50"
            >
              {value ? "Join" : "Exit"}
            </Button>
          </HStack>
          <HStack alignItems="center" mb="2">
            <Text fontSize="sm" color="blueGray.500">
              7,629 Members
            </Text>
            <Box bg="blueGray.500" style={styles.separatorDot} />
            <Text fontSize="sm" color="blueGray.500">
              273 Posts
            </Text>
          </HStack>
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et ma
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});
