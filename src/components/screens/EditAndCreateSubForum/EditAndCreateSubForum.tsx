import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Icon,
  Image,
  Input,
  Pressable,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { ImagePickerButton } from "@/root/src/components/shared/Picker";
import { colors } from "@/root/src/constants";
import { useToggle } from "@/root/src/hooks";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

type RouteProp_ = RouteProp<RootStackParamList, "EditAndCreateSubForum">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "EditAndCreateSubForum"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

const windowWidth = Dimensions.get("window").width;

export const EditAndCreateSubForum: React.FC<Props_> = ({
  navigation,
  route,
}) => {
  const { title } = route.params;

  const [forum, setForum] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [profileImageS3Key, setProfileImageS3Key] = React.useState("");
  const [coverImageS3Key, setCoverImageS3Key] = React.useState("");

  const [signedProfile, setSignedProfile] = React.useState("");
  const [signedCover, setSignedCover] = React.useState("");

  const [coverLoader, toggleCoverLoader] = useToggle(false);
  const [profileLoader, toggleProfileLoader] = useToggle(false);

  React.useEffect(() => {
    (async () => {
      if (profileImageS3Key) {
        const signedImage = await SignS3ImageKey(profileImageS3Key);
        if (signedImage) {
          setSignedProfile(signedImage);
        }
      }
    })();
  }, [profileImageS3Key]);

  React.useEffect(() => {
    (async () => {
      if (coverImageS3Key) {
        const signedImage = await SignS3ImageKey(coverImageS3Key);
        if (signedImage) {
          setSignedCover(signedImage);
        }
      }
    })();
  }, [coverImageS3Key]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => navigation.navigate("SubForum")}
        >
          {title === "Edit Subforum" ? "Save" : "Create"}
        </Button>
      ),
      headerLeft: () =>
        title === "Create Subforum" ? (
          <HeaderProfileIcon />
        ) : (
          <Pressable
            onPress={() => navigation.goBack()}
            ml="3"
            alignItems="center"
            justifyContent="center"
          >
            <AntDesign name="arrowleft" size={24} color={colors.white} />
          </Pressable>
        ),
    });
  }, [navigation, title]);

  return (
    <Box style={styles.container}>
      <Box position="relative" height="115px">
        {signedCover ? (
          <Image
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: signedCover,
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
        {!coverLoader && (
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
          {signedProfile ? (
            <Avatar
              bg="green.500"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              source={{
                uri: signedProfile,
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
          {!profileLoader && (
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
      <Box style={styles.wrapper} bg="white">
        <Box style={styles.inputContainer}>
          <FormControl isRequired>
            <FormControl.Label mb="3">Forum Name</FormControl.Label>
            <Input
              bg="coolGray.100"
              p="4"
              value={forum}
              onChangeText={setForum}
              borderRadius="md"
              placeholder="Mechkeys"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              You must provide username
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="4" isRequired>
            <FormControl.Label mb="3">Description</FormControl.Label>
            <Input
              bg="coolGray.100"
              p="4"
              mb="2"
              minHeight="125"
              maxHeight="150"
              multiline
              maxLength={140}
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              borderRadius="md"
              placeholder="We talk about keyboards"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
            <FormControl.HelperText>
              Crispy introduction about forum
            </FormControl.HelperText>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});
