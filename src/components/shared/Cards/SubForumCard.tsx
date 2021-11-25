import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Storage } from "aws-amplify";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Progress,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Alert, Dimensions, Platform, StyleSheet } from "react-native";
import uuid from "react-native-uuid";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { useToggle } from "@/root/src/hooks";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {
  isEdit?: boolean;
  name?: string;
  description?: string;
}

const windowWidth = Dimensions.get("window").width;

export const SubForumCard: React.FC<Props_> = ({
  isEdit,
  name = "",
  description = "",
}) => {
  const navigation = useNavigation<NavigationProp_>();
  const [status, setStatus] = useToggle(true);
  const [profile, setProfile] = useState<string>();
  const [wallPaper, setWallPaper] = useState<string>();

  const [percentage, setPercentage] = useState(0);
  const [coverLoader, toggleCoverLoader] = useToggle(false);
  const [profileLoader, toggleProfileLoader] = useToggle(false);

  const verifyPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient Permissions!",
          "Sorry, we need these permissions to make this work!'",
          [{ text: "Okay" }]
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async (
    aspect: [number, number],
    callback: (data: string) => void
  ) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 1,
    });

    let uploadedUrl = await handleImagePicked(result);

    if (uploadedUrl) {
      Storage.get(uploadedUrl)
        .then((result) => callback(result))
        .catch((err) => console.log(err));
    }
  };

  const handleImagePicked = async (
    pickerResult: ImagePicker.ImagePickerResult
  ) => {
    try {
      if (pickerResult.cancelled) {
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage(
          `IMG-${format(new Date(), "yyyyMMdd")}-EF${uuid.v4()}`,
          img
        );
        return uploadUrl;
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Upload failed");
    }
  };

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = (filename: string, img: any) => {
    return Storage.put(filename, img, {
      level: "public",
      progressCallback(progress) {
        const calculated = parseInt(
          // @ts-ignore
          (progress.loaded / progress.total) * 100,
          10
        );
        setPercentage(calculated);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  return (
    <Box>
      <Box position="relative" height="115px">
        {wallPaper ? (
          <Image
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: wallPaper,
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
          <Pressable
            onPress={() =>
              pickImage([4, 3], (imageUrl) => {
                toggleCoverLoader(true);
                setWallPaper(imageUrl);
                toggleCoverLoader(false);
              })
            }
          >
            <Box
              bg="eGreen.400"
              p="2"
              borderRadius="full"
              position="absolute"
              bottom="72.5"
              right="2.5"
            >
              <Icon
                as={<MaterialIcons name="motion-photos-on" />}
                size={18}
                color="white"
              />
            </Box>
          </Pressable>
        )}
      </Box>
      <Box alignItems="flex-start" justifyContent="center" bg="white">
        <Box position="relative">
          {profile ? (
            <Avatar
              bg="green.500"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              source={{
                uri: profile,
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
            <Pressable
              onPress={() =>
                pickImage([1, 1], (imageUrl) => {
                  toggleProfileLoader();
                  setProfile(imageUrl);
                  toggleProfileLoader();
                })
              }
              zIndex="999"
            >
              <Box
                bg="eGreen.400"
                p="2"
                borderRadius="full"
                position="absolute"
                bottom="0"
                right="0"
              >
                <Icon
                  as={<MaterialIcons name="motion-photos-on" />}
                  size={18}
                  color="white"
                />
              </Box>
            </Pressable>
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
