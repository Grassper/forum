import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export const FileSizeChecker = async (
  imageUri: string,
  allowedSizeInMb: number
) => {
  const fileInfo = await getFileInfo(imageUri);

  if (!fileInfo?.size) {
    Alert.alert("Can't select this file as the size is unknown.");
    return false;
  }

  const isFileSizeAllowed = await isLessThanTheMB(
    fileInfo.size,
    allowedSizeInMb
  );

  if (!isFileSizeAllowed) {
    Alert.alert(`Image size must be smaller than ${allowedSizeInMb}MB!`);
    return false;
  }

  return true;
};

const getFileInfo = async (fileURI: string) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
  return isOk;
};
