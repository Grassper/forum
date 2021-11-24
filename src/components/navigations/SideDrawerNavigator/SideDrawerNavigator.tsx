import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  Box,
  Flex,
  Icon,
  MoonIcon,
  Pressable,
  SunIcon,
  Text,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { StackNavigator } from "@/root/src/components/navigations/StackNavigator";
import { Bookmark } from "@/root/src/components/screens/Bookmark";
import { EditAndCreateSubForum } from "@/root/src/components/screens/EditAndCreateSubForum";
import { Follow } from "@/root/src/components/screens/Follow";
import { Profile } from "@/root/src/components/screens/Profile";

type RootDrawerParamList = {
  StackNavigator: undefined;
  drawerProfile: { userId?: string };
  drawerBlocked_Accounts: { title: "Blocked Accounts" };
  drawerBookmarks: undefined;
  EditAndCreateSubForum: { title: "Create Subforum" };
};

const DrawerNavigator = createDrawerNavigator<RootDrawerParamList>();

type NavigationProp_ = DrawerNavigationProp<RootDrawerParamList>;
const CustomDrawerContent = () => {
  const [lightMode, setLightMode] = useState(true);
  const navigation = useNavigation<NavigationProp_>();
  return (
    <DrawerContentScrollView style={styles.container}>
      <Box alignItems="center" justifyContent="center">
        {/* <Avatar
          bg="green.500"
          size="lg"
          source={{
            uri: "https://randomuser.me/api/portraits/women/49.jpg",
          }}
        >
          <Text fontSize="md" fontFamily="body" fontWeight="600" color="white">
            Dk
          </Text>
        </Avatar>*/}
        <Box
          width="100px"
          height="100px"
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
        <Text
          fontSize="xl"
          fontFamily="heading"
          color="black"
          lineHeight="lg"
          mt="1"
        >
          Diana Kiev
        </Text>
        <Pressable
          onPress={() => {
            setLightMode(!lightMode);
          }}
        >
          <Flex direction="row" alignSelf="center" alignItems="center">
            {lightMode ? (
              <SunIcon size="4" mr="2" mt="1" />
            ) : (
              <MoonIcon size="4" mr="2" mt="1" />
            )}
            <Text fontSize="xs" fontFamily="body" color="black" mt="1">
              {lightMode ? "Light" : "Dark"}
            </Text>
          </Flex>
        </Pressable>
      </Box>

      <Box mt="8">
        <DrawerItem
          style={styles.drawerItem}
          label={() => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color="black"
              ml="-4"
            >
              My Profile
            </Text>
          )}
          onPress={() =>
            navigation.navigate("drawerProfile", { userId: undefined })
          } // pass undefined for current user
          icon={() => (
            <Icon as={<Feather name="user" />} size={5} ml="3" color="black" />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={() => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color="black"
              ml="-4"
            >
              Blocked Accounts
            </Text>
          )}
          onPress={() =>
            navigation.navigate("drawerBlocked_Accounts", {
              title: "Blocked Accounts",
            })
          }
          icon={() => (
            <Icon
              as={<Entypo name="block" />}
              size={"18px"}
              ml="3"
              color="black"
            />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={() => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color="black"
              ml="-4"
            >
              Bookmarks
            </Text>
          )}
          onPress={() => navigation.navigate("drawerBookmarks")}
          icon={() => (
            <Icon
              as={<Feather name="bookmark" />}
              size={"19px"}
              ml="3"
              color="black"
            />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={() => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color="black"
              ml="-4"
            >
              Create Subforum
            </Text>
          )}
          onPress={() =>
            navigation.navigate("EditAndCreateSubForum", {
              title: "Create Subforum",
            })
          }
          icon={() => (
            <Icon
              as={<AntDesign name="pluscircleo" />}
              size={"18px"}
              ml="3"
              color="black"
            />
          )}
        />
      </Box>
    </DrawerContentScrollView>
  );
};

export const SideDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator drawerContent={() => <CustomDrawerContent />}>
        <DrawerNavigator.Screen
          name="StackNavigator"
          component={StackNavigator}
          options={{
            title: "",
            headerShown: false,
          }}
        />
        <DrawerNavigator.Screen
          name="drawerProfile"
          component={Profile}
          options={{
            title: "",
          }}
        />
        <DrawerNavigator.Screen
          name="drawerBlocked_Accounts"
          component={Follow}
          options={{
            title: "Blocked Accounts",
          }}
        />
        <DrawerNavigator.Screen
          name="drawerBookmarks"
          component={Bookmark}
          options={{
            title: "Bookmarks",
          }}
        />
        <DrawerNavigator.Screen
          name="EditAndCreateSubForum"
          component={EditAndCreateSubForum}
          options={{
            title: "Create Subforum",
          }}
        />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 30 },
  drawerItem: {
    borderRadius: 0,
    marginVertical: -2,
    paddingVertical: 0,
  },
});
