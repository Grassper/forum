import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Divider, Flex, Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditReplies">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "AddAndEditReplies">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditReplies: React.FC<Props_> = ({ navigation, route }) => {
  const [Reply, setReply] = React.useState("");

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
        <CommentCard hideReplyButton hideCommentUserActions />
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
            value={Reply}
            onChangeText={setReply}
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
