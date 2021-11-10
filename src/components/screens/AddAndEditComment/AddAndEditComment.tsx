import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Divider, Flex, Icon, Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { Data as DummyData } from "@/root/src/components/screens/SubForum";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";

type RouteProp_ = RouteProp<RootStackParamList, "AddAndEditComment">;

type NavigationProp_ = StackNavigationProp<
  RootStackParamList,
  "AddAndEditComment"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const AddAndEditComment: React.FC<Props_> = () => {
  const [Comment, setComment] = React.useState("");

  return (
    <Box style={styles.container} bg="white">
      <Box>
        <PostCard
          id={DummyData[0].id}
          subForum={DummyData[0].subForum}
          type={DummyData[0].type}
          username={DummyData[0].username}
          contentText={DummyData[0].contentText}
          avatarUrl={DummyData[0].avatarUrl}
          timeStamp={DummyData[0].timeStamp}
          mediaUrl={DummyData[0].mediaUrl}
          poll={DummyData[0].poll}
          postPage
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
            bg="muted.100"
            p="4"
            width="80%"
            multiline
            value={Comment}
            onChangeText={setComment}
            borderRadius="md"
            placeholder="We talk about keyboards"
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
