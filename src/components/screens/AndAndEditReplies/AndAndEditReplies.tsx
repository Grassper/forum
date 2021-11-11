import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Divider, Flex, Icon, Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { CommentCard } from "@/root/src/components/screens/Post/CommentCard";

type RouteProp_ = RouteProp<RootStackParamList, "AndAndEditReplies">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "AndAndEditReplies"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AndAndEditReplies: React.FC<Props_> = () => {
  const [Reply, setReply] = React.useState("");

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
            bg="muted.100"
            p="4"
            width="80%"
            multiline
            value={Reply}
            onChangeText={setReply}
            borderRadius="md"
            placeholder="Your comment"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <Flex
            bg="eGreen.400"
            width="10"
            ml="2"
            height="10"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
          >
            <Icon as={<FontAwesome name="send" />} size={4} color="white" />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
