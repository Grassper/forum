import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

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
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("ChooseSubForum", {
                    postType: "Image",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="green.200"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<Ionicons name="ios-image" />}
                    size={"20px"}
                    color="coolGray.800"
                  />
                </Box>
              </Pressable>
              <Text color="coolGray.500">IMAGE</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("ChooseSubForum", {
                    postType: "Audio",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="green.200"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<Ionicons name="mic" />}
                    size={"22px"}
                    color="coolGray.800"
                  />
                </Box>
              </Pressable>
              <Text color="coolGray.500">AUDIO</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("ChooseSubForum", {
                    postType: "Video",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="green.200"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<Ionicons name="ios-videocam" />}
                    size={"20px"}
                    color="coolGray.800"
                  />
                </Box>
              </Pressable>
              <Text color="coolGray.500">VIDEO</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("ChooseSubForum", {
                    postType: "Text",
                    action: "Add",
                    hideUpload: true,
                  });
                }}
              >
                <Box
                  bg="green.200"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<Ionicons name="ios-text" />}
                    size={"20px"}
                    color="coolGray.800"
                  />
                </Box>
              </Pressable>
              <Text color="coolGray.500">TEXT</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("ChooseSubForum", {
                    postType: "Poll",
                    action: "Add",
                    hideUpload: true,
                  });
                }}
              >
                <Box
                  bg="green.200"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<Ionicons name="stats-chart" />}
                    size={"20px"}
                    color="coolGray.800"
                  />
                </Box>
              </Pressable>
              <Text color="coolGray.500">POLL</Text>
            </VStack>
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

const styles = StyleSheet.create({
  cancelIcon: {
    transform: [{ rotate: "45deg" }],
  },
});
