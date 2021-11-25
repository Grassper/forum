import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import { SvgUri } from "react-native-svg";
import { SwipeListView } from "react-native-swipe-list-view";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { FollowCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { UserData } from "@/root/src/data/userData";

type RouteProp_ = RouteProp<RootStackParamList, "Follow">;

type NavigationProp_ = StackNavigationProp<RootStackParamList, "Follow">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface Props_ {}

const RenderHiddenItem = () => {
  return (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="red.400"
        borderRadius="2"
        justifyContent="center"
        onPress={() => {}} // delete function here
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export const Follow: React.FC<Props_> = ({ navigation, route }) => {
  const { title } = route.params;

  navigation.setOptions({
    headerLeft: () =>
      title === "Blocked Accounts" ? (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          ml="3"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width="8"
            height="8"
            bg="amber.100"
            borderRadius="full"
            overflow="hidden"
          >
            <SvgUri
              uri="https://avatars.dicebear.com/api/micah/asdf.svg"
              width="100%"
              height="100%"
            />
          </Box>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.goBack()}
          ml="3"
          alignItems="center"
          justifyContent="center"
        >
          <AntDesign name="arrowleft" size={24} color="#17D7A0" />
        </Pressable>
      ),
  });
  return (
    <Box bg="white" flex="1" alignItems="center">
      <Box width="90%" pt="20px">
        <SearchBar />
      </Box>
      <Box mt="4" width="100%" flex="1">
        {title !== "Blocked Accounts" ? (
          <FlatList
            data={UserData}
            renderItem={FollowCardRenderer}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <SwipeListView
            data={UserData}
            renderItem={FollowCardRenderer}
            keyExtractor={(item) => item.id}
            renderHiddenItem={RenderHiddenItem}
            rightOpenValue={-70}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        )}
      </Box>
    </Box>
  );
};
