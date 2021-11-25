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
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

export type RootDrawerParamList = {
  StackNavigator: undefined;
  drawerProfile: { userId: string };
  drawerBlocked_Accounts: { title: "Blocked Accounts" };
  drawerBookmarks: { title: "Bookmarks" };
  EditAndCreateSubForum: { title: "Create Subforum" };
};

const DrawerNavigator = createDrawerNavigator<RootDrawerParamList>();

type NavigationProp_ = DrawerNavigationProp<RootDrawerParamList>;

const CustomDrawerContent = () => {
  const [lightMode, setLightMode] = useState(true);

  const {
    user: { profileImageUrl, username, id },
  } = React.useContext(UserContext);

  const navigation = useNavigation<NavigationProp_>();
  return (
    <DrawerContentScrollView style={styles.container}>
      <Box alignItems="center" justifyContent="center">
        <Box
          width="100px"
          height="100px"
          bg="amber.100"
          borderRadius="full"
          overflow="hidden"
        >
          <SvgUri
            uri={
              profileImageUrl ||
              "https://avatars.dicebear.com/api/micah/default.svg"
            }
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
          {username}
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
              Home
            </Text>
          )}
          onPress={() => navigation.navigate("StackNavigator")}
          icon={({ focused }) => (
            <Icon
              as={<AntDesign name="home" />}
              size={5}
              ml="3"
              color={focused ? "red" : "black"}
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
              My Profile
            </Text>
          )}
          onPress={() => navigation.navigate("drawerProfile", { userId: id })} // pass id of current user
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
          onPress={() =>
            navigation.navigate("drawerBookmarks", { title: "Bookmarks" })
          }
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
            drawerActiveTintColor: "red",
          }}
        />
        <DrawerNavigator.Screen
          name="drawerProfile"
          component={Profile}
          options={{
            title: "",
            drawerActiveTintColor: "red",
          }}
        />
        <DrawerNavigator.Screen
          name="drawerBlocked_Accounts"
          component={Follow}
          options={{
            title: "Blocked Accounts",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          }}
        />
        <DrawerNavigator.Screen
          name="drawerBookmarks"
          component={Bookmark}
          options={{
            title: "Bookmarks",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          }}
        />
        <DrawerNavigator.Screen
          name="EditAndCreateSubForum"
          component={EditAndCreateSubForum}
          options={{
            title: "Create Subforum",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
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
