import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  Text,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "EditProfile">;

interface Props_ {
  navigation: NavigationProp_;
}

export const EditProfile: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => navigation.navigate("Profile", { userId: undefined })} // pass undefined for current user
        >
          Save
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.container}>
        <Box alignItems="center" justifyContent="center" my="4">
          <Box position="relative">
            <Avatar
              bg="green.500"
              size="xl"
              source={{
                uri: "https://randomuser.me/api/portraits/women/49.jpg",
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
            <Pressable onPress={() => {}}>
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
          </Box>
        </Box>
        <FormControl isRequired>
          <FormControl.Label mb="3">User Name</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            value={userName}
            onChangeText={setUserName}
            borderRadius="md"
            placeholder="John joe."
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            You must provide username
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="4">
          <FormControl.Label mb="3">About</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            mb="2"
            minHeight="175"
            multiline
            maxLength={300}
            numberOfLines={4}
            value={about}
            onChangeText={setAbout}
            borderRadius="md"
            placeholder="About (optional)"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <FormControl.HelperText>
            Introduce Yourself to community
          </FormControl.HelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
