import { AntDesign } from "@expo/vector-icons";
import { Storage } from "aws-amplify";
import { format } from "date-fns";
import * as DocumentPicker from "expo-document-picker";
import { Box, Icon, Pressable, Text } from "native-base";
import React from "react";
import { Alert } from "react-native";
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

  const handlePicker = async () => {
    /**
     * Todo implement permission
     */

    const pickerType = {
      Image: "image/jpeg",
      Audio: "audio/mpeg",
      Video: "video/mp4",
    };

    const timeStamp = format(new Date(), "yyyyMMdd");

    const uploadKeyFormat = {
      Image: `IMG-${timeStamp}-EF${uuid.v4()}.jpg`,
      Audio: `AUD-${timeStamp}-EF${uuid.v4()}.mp3`,
      Video: `VID-${timeStamp}-EF${uuid.v4()}.mp4`,
    };

    let uploadedS3Key = "";

    if (postType !== "Poll" && postType !== "Text") {
      let pickerResult = await DocumentPicker.getDocumentAsync({
        type: pickerType[postType],
      });

      if (pickerResult.type !== "cancel") {
        /**
         * checking allowed file size
         */

        const isFileSizeAllowed = await FileSizeChecker(pickerResult.uri, 15); // allowed size in 15 mb before compression

        if (!isFileSizeAllowed) {
          return;
        }

        /**
         * checking post type
         */
        if (postType === "Image") {
          /**
           * compressing image and save jpeg
           */
          const compressedUrl = await ImageCompressor(
            pickerResult.uri,
            1080,
            1080
          );
          /**
           * Upload compressed image to s3
           */

          uploadedS3Key = await handlePickedAsset(
            compressedUrl,
            uploadKeyFormat[postType]
          );
        }

        if (postType === "Audio") {
          uploadedS3Key = await handlePickedAsset(
            pickerResult.uri,
            uploadKeyFormat[postType]
          );
        }

        if (postType === "Video") {
          uploadedS3Key = await handlePickedAsset(
            pickerResult.uri,
            uploadKeyFormat[postType]
          );
        }

        if (uploadedS3Key) {
          setMediaS3Key(uploadedS3Key);
          setUploading(false);
          setUploadingError(false);
        }
      }
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
    <Box position="absolute" bottom="35" left="25">
      <Pressable onPress={handlePicker}>
        <Box
          bg="eGreen.400"
          borderRadius="sm"
          width="60"
          height="60"
          alignItems="center"
          justifyContent="center"
        >
          {!uploading && !uploadingError && progressPercentage !== 100 && (
            <Icon as={<AntDesign name="plus" />} size="sm" color="white" />
          )}
          {uploading && !uploadingError && (
            <Text color="white" fontWeight="semibold" fontSize="lg">
              {progressPercentage}%
            </Text>
          )}
          {!uploading && !uploadingError && progressPercentage === 100 && (
            <Icon as={<AntDesign name="check" />} size="sm" color="white" />
          )}
        </Box>
      </Pressable>
    </Box>
  );
};
