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
        <VStack alignItems="center" space="4" mt="5">
          <HStack width="100%" space="8">
            <Item
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "StackNav",
                  params: {
                    screen: "ChooseSubForum",
                    params: {
                      postType: "Text",
                      action: "Add",
                      hideUpload: true,
                    },
                  },
                });
                onClose();
              }}
              iconName="ios-text"
              iconSize="20px"
              postType="Write"
            />
            <Item
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "StackNav",
                  params: {
                    screen: "ChooseSubForum",
                    params: { postType: "Image", action: "Add" },
                  },
                });
                onClose();
              }}
              iconName="ios-image"
              iconSize="20px"
              postType="Image"
            />
            <Item
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "StackNav",
                  params: {
                    screen: "ChooseSubForum",
                    params: {
                      postType: "Video",
                      action: "Add",
                    },
                  },
                });

                onClose();
              }}
              iconName="ios-videocam"
              iconSize="20px"
              postType="Video"
            />
            {/* <Item
              onPress={() => {
                navigation.navigate("Application", {
                  screen: "StackNav",
                  params: {
                    screen: "ChooseSubForum",
                    params: { postType: "Audio", action: "Add" },
                  },
                });
                onClose();
              }}
              iconName="mic"
              iconSize="22px"
              postType="audio"
            /> */}
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
  iconName: "stats-chart" | "ios-text" | "ios-image" | "mic" | "ios-videocam";
  iconSize: string;
  postType: string;
}

const Item: React.FC<Items_> = ({ onPress, iconName, postType, iconSize }) => {
  return (
    <VStack space="1.5" alignItems="center">
      <Pressable onPress={onPress}>
        <Box
          bg="green.200"
          alignItems="center"
          width="50px"
          height="50px"
          justifyContent="center"
          borderRadius="full"
        >
          <Icon
            as={<Ionicons name={iconName} />}
            size={iconSize}
            color="coolGray.800"
          />
        </Box>
      </Pressable>
      <Text color="coolGray.500">{postType}</Text>
    </VStack>
  );
};
