import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
      <Actionsheet.Content bg="eGreen.400">
        <VStack alignItems="center" space="4">
          <Text color="white" fontWeight="500" fontSize="xl" mb="4">
            Create a Post
          </Text>
          <HStack width="100%" space="4" mb="4">
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("AddAndEditPost", {
                    postType: "Image",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="white"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<MaterialCommunityIcons name="image" />}
                    size={6}
                    color="black"
                  />
                </Box>
              </Pressable>
              <Text color="white">IMAGE</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("AddAndEditPost", {
                    postType: "Audio",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="white"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<MaterialCommunityIcons name="microphone" />}
                    size={6}
                    color="black"
                  />
                </Box>
              </Pressable>
              <Text color="white">AUDIO</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("AddAndEditPost", {
                    postType: "Video",
                    action: "Add",
                  });
                }}
              >
                <Box
                  bg="white"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<MaterialCommunityIcons name="video-plus" />}
                    size={6}
                    color="black"
                  />
                </Box>
              </Pressable>
              <Text color="white">VIDEO</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("AddAndEditPost", {
                    postType: "Text",
                    action: "Add",
                    hideUpload: true,
                  });
                }}
              >
                <Box
                  bg="white"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<MaterialCommunityIcons name="text-box-outline" />}
                    size={6}
                    color="black"
                  />
                </Box>
              </Pressable>
              <Text color="white">TEXT</Text>
            </VStack>
            <VStack space="1.5" alignItems="center">
              <Pressable
                onPress={() => {
                  navigation.push("AddAndEditPost", {
                    postType: "Poll",
                    action: "Add",
                    hideUpload: true,
                  });
                }}
              >
                <Box
                  bg="white"
                  alignItems="center"
                  width="50px"
                  height="50px"
                  justifyContent="center"
                  borderRadius="full"
                >
                  <Icon
                    as={<MaterialCommunityIcons name="poll-box" />}
                    size={6}
                    color="black"
                  />
                </Box>
              </Pressable>
              <Text color="white">POLL</Text>
            </VStack>
          </HStack>
          <Box>
            <Pressable onPress={onClose}>
              <Icon
                as={<MaterialIcons name="cancel" />}
                size={6}
                color="white"
              />
            </Pressable>
          </Box>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
