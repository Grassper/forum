import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import React from "react";

// import { FlatList } from "react-native";
// import { SwipeListView } from "react-native-swipe-list-view";
import {
  DrawerParamList_,
  ProfileStackParamList_,
} from "@/root/src/components/navigations/Navigation";
// import { FollowCardRenderer } from "@/root/src/components/shared/CardRenderer";
// import { SearchBar } from "@/root/src/components/shared/SearchBar";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList_, "Follow">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<ProfileStackParamList_, "Follow">;

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

export const Follow: React.FC<Props_> = () => {
  return (
    <Box bg="white" flex="1" alignItems="center">
      <Box width="90%" pt="20px">
        {/* <SearchBar /> */}
      </Box>
      <Box mt="4" width="100%" flex="1">
        {/* <FlatList
          data={UserData}
          renderItem={FollowCardRenderer}
          keyExtractor={(item) => item.id}
        /> */}
      </Box>
    </Box>
  );
};
