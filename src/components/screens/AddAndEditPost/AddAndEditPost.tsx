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
  Text,
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

interface PollType_ {
  content: string;
}

export const AddAndEditPost: React.FC<Props_> = ({ navigation, route }) => {
  const [Content, setContent] = React.useState("");
  const [PollTitle, setPollTitle] = React.useState("");
  const [Option, setOption] = React.useState("");
  const [Polls, setPoll] = React.useState<PollType_[]>([]);

  const { hideUpload, postType } = route.params;

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
    <VStack
      style={styles.container}
      bg="white"
      justifyContent={postType !== "Poll" ? "space-between" : "flex-start"}
    >
      <CommunityTile hideDivider hideMembers />
      {postType === "Poll" && (
        <Box bg="white" alignItems="center">
          <Box width="90%">
            <Input
              multiline
              numberOfLines={2}
              value={PollTitle}
              onChangeText={setPollTitle}
              borderRadius="md"
              placeholder="Title"
              placeholderTextColor="muted.400"
              fontSize="md"
              fontWeight="500"
              variant="unstyled"
            />
            <Box mt="2">
              {Polls.map((entry, index) => {
                return (
                  <Text
                    key={`poll-${index}`}
                    p="3"
                    bg="muted.100"
                    mb="2"
                    alignItems="center"
                    borderRadius="5"
                  >
                    {entry.content}
                  </Text>
                );
              })}
            </Box>
            {Polls.length <= 2 && (
              <Input
                bg="muted.100"
                p="4"
                maxLength={30}
                value={Option}
                onChangeText={setOption}
                borderRadius="md"
                placeholder="Add Option"
                placeholderTextColor="muted.400"
                fontSize="sm"
                variant="unstyled"
                InputRightElement={
                  <Button
                    bg="eGreen.400"
                    width="1/6"
                    rounded="none"
                    height="full"
                    onPress={() => {
                      setPoll((prev) => [...prev, { content: Option }]);
                      setOption("");
                    }}
                  >
                    <Icon
                      as={<AntDesign name="plus" />}
                      size={4}
                      color="white"
                    />
                  </Button>
                }
              />
            )}
            <Input
              mt="2"
              width="90%"
              multiline
              value={Content}
              onChangeText={setContent}
              borderRadius="md"
              placeholder="Purpose of this poll"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
          </Box>
        </Box>
      )}
      {postType !== "Poll" && (
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
      )}
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
