import { Feather, FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Center, Flex, Icon, Input, Text } from "native-base";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

import { ChatCard } from "./ChatCard";

type RouteProp_ = RouteProp<RootStackParamList, "ChatRoom">;

type NavigationProp_ = StackNavigationProp<RootStackParamList, "ChatRoom">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const ChatRoom: React.FC<Props_> = ({ route }) => {
  const [Comment, setComment] = React.useState("");
  const navigation = useNavigation();
  const scrollViewRef: React.RefObject<ScrollView> = React.createRef();

  const { imageUri, title } = route.params;

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
            {/* <Avatar
              bg="green.500"
              size="35px"
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            /> */}
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <Box bg="transparent" py="1" justifyContent="center" safeAreaBottom>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              bgColor="transparent"
            >
              <Input
                bg="white"
                p="3"
                width="80%"
                multiline
                value={Comment}
                onChangeText={setComment}
                borderRadius="md"
                placeholder="Type here.."
                placeholderTextColor="muted.400"
                fontSize="sm"
                variant="unstyled"
                onFocus={() => scrollViewRef.current?.scrollToEnd()}
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
        </KeyboardAvoidingView>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
