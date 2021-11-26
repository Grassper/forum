import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { ImagePickerButton } from "@/root/src/components/shared/Picker";
import { useToggle } from "@/root/src/hooks";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {
  isEdit?: boolean;
  name?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string;
  setProfileImageS3Key: (value: string) => void;
  setCoverImageS3Key: (value: string) => void;
}

const windowWidth = Dimensions.get("window").width;

export const SubForumCard: React.FC<Props_> = ({
  isEdit,
  name = "",
  description = "",
  profileImage,
  coverImage,
  setProfileImageS3Key,
  setCoverImageS3Key,
}) => {
  const navigation = useNavigation<NavigationProp_>();
  const [status, setStatus] = useToggle(true);

  const [percentage, setPercentage] = useState(0);
  const [coverLoader, toggleCoverLoader] = useToggle(false);
  const [profileLoader, toggleProfileLoader] = useToggle(false);

  return (
    <Box>
      <Box position="relative" height="115px">
        {coverImage ? (
          <Image
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: coverImage,
            }}
          />
        ) : (
          <Box
            width="100%"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Icon
              as={<Ionicons name="ios-image" />}
              size={6}
              color="muted.700"
            />
          </Box>
        )}
        {isEdit && !coverLoader && (
          <ImagePickerButton
            maxImageSize={15}
            imageWidth={110}
            imageHeight={110}
            aspectRatio={[4, 3]}
            setS3ImageKey={setCoverImageS3Key}
            setProgressPercentage={() => {}} // percentage progress
          />
        )}
      </Box>
      <Box alignItems="flex-start" justifyContent="center" bg="white">
        <Box position="relative">
          {profileImage ? (
            <Avatar
              bg="green.500"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              source={{
                uri: profileImage,
              }}
            />
          ) : (
            <Box
              bg="coolGray.200"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
            >
              <Icon
                as={<Ionicons name="ios-image" />}
                size={6}
                color="muted.700"
              />
            </Box>
          )}
          {isEdit && !profileLoader && (
            <ImagePickerButton
              maxImageSize={5}
              imageWidth={480}
              imageHeight={360}
              aspectRatio={[4, 3]}
              setS3ImageKey={setProfileImageS3Key}
              setProgressPercentage={() => {}} // percentage progress
            />
          )}
        </Box>
      </Box>
      {!isEdit && (
        <HStack bg="white" justifyContent="center" pb="4">
          <Box width="90%">
            <HStack
              mb="2"
              alignItems="flex-end"
              justifyContent="space-between"
              mt={isEdit ? "2" : "0"}
            >
              <HStack alignItems="center" space="2.5">
                <Text fontSize="md" fontWeight="500">
                  {name}
                </Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate("EditAndCreateSubForum", {
                      title: "Edit Subforum",
                    })
                  }
                >
                  <Icon
                    as={<Foundation name="pencil" />}
                    size={18}
                    color="eGreen.400"
                  />
                </Pressable>
              </HStack>

              <Button
                onPress={() => setStatus()}
                bg={status ? "tertiary.500" : "danger.500"}
                variant="unstyled"
                minWidth="24"
                borderRadius="50"
              >
                {status ? "Join" : "Exit"}
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
            <Text fontSize="sm">{description}</Text>
          </Box>
        </HStack>
      )}
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
