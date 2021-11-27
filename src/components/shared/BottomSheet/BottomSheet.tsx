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
import { StyleSheet } from "react-native";

import { NavigationProp_ } from "@/root/src/components/navigations/Navigation";

interface Props_ {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<Props_> = ({ isOpen, onClose }) => {
  const navigation = useNavigation<NavigationProp_>();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg="white">
        <VStack alignItems="center" space="4" mt="5">
          <HStack width="100%" space="4">
            <Item
              onPress={() => {
                onClose(),
                  navigation.push("ChooseSubForum", {
                    postType: "Image",
                    action: "Add",
                  });
              }}
              iconName="ios-image"
              iconSize="20px"
              postType="image"
            />

            <Item
              onPress={() => {
                navigation.push("ChooseSubForum", {
                  postType: "Audio",
                  action: "Add",
                }),
                  onClose();
              }}
              iconName="mic"
              iconSize="22px"
              postType="audio"
            />

            <Item
              onPress={() => {
                navigation.push("ChooseSubForum", {
                  postType: "Video",
                  action: "Add",
                }),
                  onClose();
              }}
              iconName="ios-videocam"
              iconSize="20px"
              postType="video"
            />

            <Item
              onPress={() => {
                navigation.push("ChooseSubForum", {
                  postType: "Text",
                  action: "Add",
                  hideUpload: true,
                }),
                  onClose();
              }}
              iconName="ios-text"
              iconSize="20px"
              postType="text"
            />

            <Item
              onPress={() => {
                navigation.push("ChooseSubForum", {
                  postType: "Poll",
                  action: "Add",
                  hideUpload: true,
                }),
                  onClose();
              }}
              iconName="stats-chart"
              iconSize="20px"
              postType="poll"
            />
          </HStack>
          <Box>
            <Pressable onPress={onClose}>
              <Box style={styles.cancelIcon}>
                <Icon as={<Ionicons name="add" />} size={6} color="muted.700" />
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
      <Text color="coolGray.500" textTransform="uppercase">
        {postType}
      </Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    transform: [{ rotate: "45deg" }],
  },
});
