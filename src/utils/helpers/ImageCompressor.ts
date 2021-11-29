import * as ImageManipulator from "expo-image-manipulator";

export const ImageCompressor = async (
  imageUri: string,
  width: number,
  height: number
) => {
  const blob = await fetchAssetFromUri(imageUri);

  const compress = compressSizer(blob.size);

  /**
   * Todo check resize functionality
   */

  let resize;
  if (height === width) resize = { height: 480, width: 480 };
  else if (height > width) resize = { height: 480 };
  else resize = { width: 720 };

  const compressedPhoto = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize }],
    {
      compress,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return compressedPhoto.uri;
};

export const fetchAssetFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

const compressSizer = (size: number) => {
  const MB = size / Math.pow(1024, 2);
  if (Math.round(MB) === 0) return 1; // conversion size "" -> ""
  if (Math.round(MB) === 1) return 0.9;
  if (Math.round(MB) === 2) return 0.8;
  if (Math.round(MB) === 3) return 0.7;
  if (Math.round(MB) === 4) return 0.6;
  if (Math.round(MB) >= 5) return 0.5;
  if (Math.round(MB) >= 10) return 0.4;
  if (Math.round(MB) >= 15) return 0.3;
  if (Math.round(MB) >= 20) return 0.2;
  if (Math.round(MB) >= 25) return 0.1;
};
