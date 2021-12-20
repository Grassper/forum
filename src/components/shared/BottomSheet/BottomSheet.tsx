import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface Props_ {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<Props_> = ({ isOpen, onClose }) => {
  const navigation = useNavigation();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg="white">
        <VStack alignItems="center" mt="5" space="4">
          <HStack space="8" width="100%">
            <Item
              iconName="ios-text"
              iconSize="20px"
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "ChooseSubForum",
                  params: {
                    postType: "Text",
                    action: "Add",
                    hideUpload: true,
                  },
                });
                onClose();
              }}
              postType="Write"
            />
            <Item
              iconName="ios-image"
              iconSize="20px"
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "ChooseSubForum",
                  params: { postType: "Image", action: "Add" },
                });
                onClose();
              }}
              postType="Image"
            />
            <Item
              iconName="ios-videocam"
              iconSize="20px"
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "ChooseSubForum",
                  params: {
                    postType: "Video",
                    action: "Add",
                  },
                });

                onClose();
              }}
              postType="Video"
            />
            <Item
              iconName="mic"
              iconSize="22px"
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "ChooseSubForum",
                  params: { postType: "Audio", action: "Add" },
                });
                onClose();
              }}
              postType="audio"
            />
            <Item
              iconName="ios-library"
              iconSize="22px"
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "ChooseSubForum",
                  params: {
                    postType: "Poll",
                    action: "Add",
                    hideUpload: true,
                  },
                });
                onClose();
              }}
              postType="Survey"
            />
          </HStack>
          <Box>
            <Pressable onPress={onClose}>
              <Box>
                <Text color="eGreen.400" pt="2">
                  Cancel
                </Text>
              </Box>
            </Pressable>
          </Box>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

interface Items_ {
  onPress: () => void;
  iconName: "ios-library" | "ios-text" | "ios-image" | "mic" | "ios-videocam";
  iconSize: string;
  postType: string;
}

const Item: React.FC<Items_> = ({ onPress, iconName, postType, iconSize }) => {
  return (
    <VStack alignItems="center" space="1.5">
      <Pressable onPress={onPress}>
        <Box
          alignItems="center"
          bg="green.200"
          borderRadius="full"
          height="50px"
          justifyContent="center"
          width="50px"
        >
          <Icon
            as={<Ionicons name={iconName} />}
            color="coolGray.800"
            size={iconSize}
          />
        </Box>
      </Pressable>
      <Text color="coolGray.500">{postType}</Text>
    </VStack>
  );
};
