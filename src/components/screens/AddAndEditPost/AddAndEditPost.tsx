import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Button,
  Center,
  Icon,
  Input,
  Pressable,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { CommunityTile } from "@/root/src/components/shared/Tile";

type RouteProp_ = RouteProp<RootStackParamList, "AddAndEditPost">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "AddAndEditPost"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditPost: React.FC<Props_> = ({ navigation, route }) => {
  const [Content, setContent] = React.useState("");

  const { hideUpload } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => {}}
        >
          Next
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <VStack style={styles.container} bg="white" justifyContent="space-between">
      <CommunityTile hideDivider hideMembers />
      <Box bg="white" alignItems="center" height={hideUpload ? "90%" : "75%"}>
        <Input
          width="90%"
          multiline
          value={Content}
          onChangeText={setContent}
          borderRadius="md"
          placeholder="Craft your post!"
          placeholderTextColor="muted.400"
          fontSize="sm"
          variant="unstyled"
        />
      </Box>
      {!hideUpload && (
        <Center height="15%">
          <Box width="90%">
            <Pressable
              p="8"
              bg="white"
              borderWidth="1"
              borderColor="eGreen.400"
              borderStyle="dotted"
              borderRadius="sm"
              width="60"
              alignSelf="flex-start"
              height="60"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={<AntDesign name="plus" />}
                size="sm"
                color="green.500"
              />
            </Pressable>
          </Box>
        </Center>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
