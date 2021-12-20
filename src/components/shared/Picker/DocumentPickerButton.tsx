import { AntDesign } from "@expo/vector-icons";
import { Storage } from "aws-amplify";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { Box, Icon, Pressable, Text } from "native-base";
import React from "react";
import { Alert, Platform } from "react-native";
import DocumentPicker from "react-native-document-picker";
import uuid from "react-native-uuid";

import {
  fetchAssetFromUri,
  FileSizeChecker,
  ImageCompressor,
} from "@/root/src/utils/helpers";

interface Props_ {
  postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
  setMediaS3Key: (uploadKey: string) => void;
}

export const DocumentPickerButton: React.FC<Props_> = ({
  postType,
  setMediaS3Key,
}) => {
  const [progressPercentage, setProgressPercentage] = React.useState<number>(0);
  const [uploading, setUploading] = React.useState(false);
  const [uploadingError, setUploadingError] = React.useState(false);

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

  const handlePicker = async () => {
    /**
     * Todo implement permission
     */

    if (postType === "Video" || postType === "Image") {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
    }

    const timeStamp = format(new Date(), "yyyyMMdd");

    const uploadKeyFormat = {
      Image: `IMG-${timeStamp}-EF${uuid.v4()}.jpg`,
      Audio: `AUD-${timeStamp}-EF${uuid.v4()}.mp3`,
      Video: `VID-${timeStamp}-EF${uuid.v4()}.mp4`,
    };

    let uploadedS3Key = "";

    if (postType === "Image") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.85,
      });

      if (!result.cancelled) {
        const isFileSizeAllowed = await FileSizeChecker(result.uri, 15); // allowed size in mb

        if (!isFileSizeAllowed) {
          return;
        }

        const compressedUrl = await ImageCompressor(result.uri, 1080, 1080);

        uploadedS3Key = await handlePickedAsset(
          compressedUrl,
          uploadKeyFormat[postType]
        );
      }
    }

    if (postType === "Video") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
      });

      if (!result.cancelled) {
        const isFileSizeAllowed = await FileSizeChecker(result.uri, 15); // allowed size in mb

        if (!isFileSizeAllowed) {
          return;
        }

        uploadedS3Key = await handlePickedAsset(
          result.uri,
          uploadKeyFormat[postType]
        );
      }
    }

    if (postType === "Audio") {
      try {
        let pickerResult = await DocumentPicker.pickSingle({
          type: DocumentPicker.types.audio,
        });

        /**
         * checking allowed file size
         */

        const isFileSizeAllowed = await FileSizeChecker(pickerResult.uri, 15); // allowed size in 15 mb before compression

        if (!isFileSizeAllowed) {
          return;
        }

        uploadedS3Key = await handlePickedAsset(
          pickerResult.uri,
          uploadKeyFormat[postType]
        );
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          return;
        } else {
          throw err;
        }
      }
    }
    if (uploadedS3Key) {
      setMediaS3Key(uploadedS3Key);
      setUploading(false);
      setUploadingError(false);
    }
  };

  const handlePickedAsset = async (assetUri: string, key: string) => {
    try {
      setUploading(true);
      setUploadingError(false);
      setProgressPercentage(0);

      const asset = await fetchAssetFromUri(assetUri);

      /**
       * Filenaming convention - IMG-20211125-UUID.jpg
       */

      const uploadUrl = await uploadImage(key, asset);

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
        setUploading(false);
        setUploadingError(true);
        console.error("Error while uploading assets in post screen", error);
        return error.response;
      });
  };

  return (
    <Box bottom="35" left="25" position="absolute">
      <Pressable onPress={handlePicker}>
        <Box
          alignItems="center"
          bg="eGreen.400"
          borderRadius="sm"
          height="60"
          justifyContent="center"
          width="60"
        >
          {!uploading && !uploadingError && progressPercentage !== 100 && (
            <Icon as={<AntDesign name="plus" />} color="white" size="sm" />
          )}
          {uploading && !uploadingError && (
            <Text color="white" fontSize="lg" fontWeight="semibold">
              {progressPercentage}%
            </Text>
          )}
          {!uploading && !uploadingError && progressPercentage === 100 && (
            <Icon as={<AntDesign name="check" />} color="white" size="sm" />
          )}
        </Box>
      </Pressable>
    </Box>
  );
};
