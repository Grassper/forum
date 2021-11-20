import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Divider, Flex, Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

type RouteProp_ = RouteProp<RootStackParamList, "AndAndEditReplies">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "AndAndEditReplies"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AndAndEditReplies: React.FC<Props_> = ({ navigation, route }) => {
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
