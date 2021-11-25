import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Box, Icon, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function ImagePickerExample() {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Box position="relative">
      <Avatar
        bg="green.500"
        mt="-20"
        ml={windowWidth * 0.025}
        size="xl"
        source={{
          uri: image,
        }}
      >
        <Text fontSize="md" fontFamily="body" fontWeight="600" color="white">
          Dk
        </Text>
      </Avatar>
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
    </Box>
  );
}
