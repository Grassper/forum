import { Feather, FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Center,
  Flex,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useRef } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type RouteProp_ = RouteProp<RootStackParamList, "ChatRoom">;

type NavigationProp_ = StackNavigationProp<RootStackParamList, "ChatRoom">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface ChatCard_ {
  align: "left" | "right";
}

const ChatCard: React.FC<ChatCard_> = ({ align }) => {
  return (
    <Box pb="4" alignItems={align === "left" ? "flex-start" : "flex-end"}>
      <Box
        maxWidth="60%"
        px="3"
        pt="2"
        pb="3"
        bg={align === "left" ? "white" : "green.500"}
        borderRadius="5"
      >
        <VStack>
          <Text
            color={align === "left" ? "coolGray.600" : "white"}
            fontWeight="500"
          >
            Hi nice to meet you too. hope soon we can take a project together!
          </Text>
          <Text
            fontSize="xs"
            color={align === "left" ? "coolGray.600" : "white"}
            alignSelf="flex-end"
            mt="1"
          >
            11.30 am
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export const ChatRoom: React.FC<Props_> = ({ route }) => {
  const [Comment, setComment] = React.useState("");
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const { imageUri } = route.params;

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
          </Flex>
        </Box>
      ),
    });
  }, [imageUri, navigation]);

  return (
    <Box flex="1">
      <ImageBackground
        source={require("@/root/assets/images/chatroomWallpaper.jpg")}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ y: 0 })
          }
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

        <Box bg="transparent" py="1" justifyContent="center">
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
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
