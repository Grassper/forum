import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Divider, Flex, Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";
import { dummyData } from "@/root/src/data/dummyData";

type RouteProp_ = RouteProp<RootStackParamList, "AddAndEditComment">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "AddAndEditComment"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditComment: React.FC<Props_> = ({ navigation, route }) => {
  const [Comment, setComment] = React.useState("");

  const { action } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => {}}
        >
          {action === "Add" ? "Post" : "Update"}
        </Button>
      ),
    });
  }, [action, navigation]);

  return (
    <Box style={styles.container} bg="white">
      <Box>
        <PostCard
          id={dummyData[0].id}
          subForum={dummyData[0].subForum}
          type={dummyData[0].type}
          username={dummyData[0].username}
          contentText={dummyData[0].contentText}
          avatarUrl={dummyData[1].avatarUrl}
          timeStamp={dummyData[0].timeStamp}
          mediaUrl={dummyData[0].mediaUrl}
          poll={dummyData[0].poll}
          postPage
          hidePostNavigation
          hidePostUserActions
        />
        <Divider />
      </Box>
      <Box bg="white" py="4" mt="2">
        <Flex
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Input
            width="90%"
            multiline
            value={Comment}
            onChangeText={setComment}
            borderRadius="md"
            placeholder="Type some goods!"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
        </Flex>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
