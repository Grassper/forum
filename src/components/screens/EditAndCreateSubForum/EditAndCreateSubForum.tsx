import { AntDesign } from "@expo/vector-icons";
import { DrawerActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Button,
  FormControl,
  Input,
  Pressable,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import { colors } from "@/root/src/constants";

type RouteProp_ = RouteProp<RootStackParamList, "EditAndCreateSubForum">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "EditAndCreateSubForum"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const EditAndCreateSubForum: React.FC<Props_> = ({
  navigation,
  route,
}) => {
  const { title } = route.params;

  const [forum, setForum] = React.useState("");
  const [description, setDescription] = React.useState("");

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
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            ml="3"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width="8"
              height="8"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri
                uri="https://avatars.dicebear.com/api/micah/asdf.svg"
                width="100%"
                height="100%"
              />
            </Box>
          </Pressable>
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
      <SubForumCard isEdit />
      <Box style={styles.wrapper} bg="white">
        <Box style={styles.inputContainer}>
          <FormControl isRequired>
            <FormControl.Label mb="3">Forum Name</FormControl.Label>
            <Input
              bg="muted.100"
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
              bg="muted.100"
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
