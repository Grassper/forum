import { MaterialIcons } from "@expo/vector-icons";
import { Storage } from "aws-amplify";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { Box, Icon, Pressable } from "native-base";
import React from "react";
import { Alert, Platform } from "react-native";
import uuid from "react-native-uuid";

import {
  fetchImageFromUri,
  FileSizeChecker,
  ImageCompressor,
} from "@/root/src/utils/helpers";

interface Props_ {
  maxImageSize: number;
  imageWidth: number;
  imageHeight: number;
  setProgressPercentage: (value: number) => void;
  setS3ImageKey: (value: string) => void;
  aspectRatio: [number, number];
}

export const ImagePickerButton: React.FC<Props_> = ({
  maxImageSize,
  setProgressPercentage,
  setS3ImageKey,
  imageWidth,
  imageHeight,
  aspectRatio,
}) => {
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

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 0.85,
    });

    if (!result.cancelled) {
      /**
       * checking allowed file size
       */
      const isFileSizeAllowed = await FileSizeChecker(result.uri, maxImageSize); // allowed size in mb

      if (!isFileSizeAllowed) {
        return;
      }

      /**
       * compressing image and save jpeg
       */
      const compressedUrl = await ImageCompressor(
        result.uri,
        imageWidth,
        imageHeight
      );

      /**
       * Upload compressed image to s3
       */

      const uploadedS3Key = await handleImagePicked(compressedUrl);

      /**
       * S3 signing
       */
      if (uploadedS3Key) {
        setS3ImageKey(uploadedS3Key);
      }
    }
  };

  const handleImagePicked = async (imageUri: string) => {
    try {
      setProgressPercentage(0);

      const img = await fetchImageFromUri(imageUri);

      /**
       * Filenaming convention - IMG-20211125-UUID.jpg
       */

      const uploadUrl = await uploadImage(
        `IMG-${format(new Date(), "yyyyMMdd")}-EF${uuid.v4()}.jpg`,
        img
      );

      return uploadUrl;
    } catch (err) {
      console.log("Error while handling picked image", err);

      Alert.alert("Upload failed");
    }
  };

  const uploadImage = (filename: string, img: any) => {
    // custom prefix

    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        const calculated = parseInt(
          // @ts-ignore
          (progress.loaded / progress.total) * 100,
          10
        );
        setProgressPercentage(calculated);
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
    <Pressable onPress={pickImage}>
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
  );
};
