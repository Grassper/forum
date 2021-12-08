import { Feather } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Center, Flex, Text } from "native-base";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";

import { ChatCard } from "./ChatCard";
import { InputField } from "./InputField";

/**
 * todo 1: create the chatroom
 */
type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "ChatRoom">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "ChatRoom">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const ChatRoom: React.FC<Props_> = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef: React.RefObject<ScrollView> = React.createRef();

  const { imageUri, title, roomId } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box>
          <Flex direction="row" alignItems="center">
            <Feather
              name="chevron-left"
              size={30}
              color="white"
              mr="100"
              onPress={() => navigation.goBack()}
            />
            <Box
              width="35px"
              height="35px"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri uri={imageUri} width="100%" height="100%" />
            </Box>
            <Text color="white" fontSize="md" fontWeight="500" ml="2">
              {title}
            </Text>
          </Flex>
        </Box>
      ),
    });
  }, [imageUri, navigation, title]);

  return (
    <Box flex="1">
      <ImageBackground
        source={require("@/root/assets/images/chatroomWallpaper.jpg")}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          <Center>
            <Flex width="90%" pt="4">
              <ChatCard align="right" />
              <ChatCard align="left" />
              <ChatCard align="right" />
              <ChatCard align="right" />
              <ChatCard align="left" />
              <ChatCard align="right" />
            </Flex>
          </Center>
        </ScrollView>
        <InputField
          onFocus={() => scrollViewRef.current?.scrollToEnd()}
          chatRoomId={roomId}
        />
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
