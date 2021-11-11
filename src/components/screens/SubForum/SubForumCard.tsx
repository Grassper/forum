import { Foundation, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
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
  name = "e/Mechkeys",
  description = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma`,
}) => {
  const navigation = useNavigation<NavigationProp_>();
  const [value, toggleValue] = useToggle(true);
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/women/49.jpg"
  );
  const [wallPaper, setWallPaper] = useState(
    "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?cs=srgb&dl=pexels-soumil-kumar-735911.jpg&fm=jpg"
  );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const pickWallPaperImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setWallPaper(result.uri);
    }
  };
  return (
    <Box>
      <Box position="relative">
        <Image
          width="100%"
          height="115"
          alt="fallback text"
          source={{
            uri: wallPaper,
          }}
          fallbackSource={{
            uri: wallPaper,
          }}
        />
        {isEdit && (
          <Pressable onPress={pickWallPaperImage}>
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
          <Avatar
            bg="green.500"
            mt="-20"
            ml={windowWidth * 0.025}
            size="xl"
            source={{
              uri: image,
            }}
          >
            <Text
              fontSize="md"
              fontFamily="body"
              fontWeight="600"
              color="white"
            >
              Dk
            </Text>
          </Avatar>
          {isEdit && (
            <Pressable onPress={pickImage}>
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
                onPress={() => toggleValue()}
                bg={value ? "tertiary.500" : "danger.500"}
                variant="unstyled"
                minWidth="24"
                borderRadius="50"
              >
                {value ? "Join" : "Exit"}
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
