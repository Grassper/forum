import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
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

import { DrawerParamList_ } from "@/root/src/components/navigations/Navigation";
import { StackNavigator } from "@/root/src/components/navigations/StackNavigator";
import { UserContext } from "@/root/src/context";

const DrawerNavigator = createDrawerNavigator<DrawerParamList_>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [lightMode, setLightMode] = useState(true);

  const {
    user: { profileImageUrl, username, id },
  } = React.useContext(UserContext);

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
        <DrawerItemList {...props} />
        <DrawerItem
          style={styles.drawerItem}
          label={({ color }) => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color={color}
              ml="-4"
            >
              My Profile
            </Text>
          )}
          onPress={() => {
            props.navigation.jumpTo("StackNav", {
              screen: "Profile",
              params: { userId: id }, // pass id of current user
            });
          }}
          icon={({ color }) => (
            <Icon as={<Feather name="user" />} size={5} ml="3" color={color} />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={({ color }) => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color={color}
              ml="-4"
            >
              Blocked Accounts
            </Text>
          )}
          onPress={() => {
            props.navigation.jumpTo("StackNav", {
              screen: "Follow",
              params: { title: "Blocked Accounts" },
            });
          }}
          icon={({ color }) => (
            <Icon
              as={<Entypo name="block" />}
              size={"18px"}
              ml="3"
              color={color}
            />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={({ color }) => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color={color}
              ml="-4"
            >
              Bookmarks
            </Text>
          )}
          onPress={() => {
            props.navigation.jumpTo("StackNav", {
              screen: "Bookmark",
            });
          }}
          icon={({ color }) => (
            <Icon
              as={<Feather name="bookmark" />}
              size={"19px"}
              ml="3"
              color={color}
            />
          )}
        />
        <DrawerItem
          style={styles.drawerItem}
          label={({ color }) => (
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color={color}
              ml="-4"
            >
              Create Subforum
            </Text>
          )}
          onPress={() => {
            props.navigation.jumpTo("StackNav", {
              screen: "EditAndCreateSubForum",
              params: { title: "Create Subforum", action: "Add" },
            });
          }}
          icon={({ color }) => (
            <Icon
              as={<AntDesign name="pluscircleo" />}
              size={"18px"}
              ml="3"
              color={color}
            />
          )}
        />
      </Box>
    </DrawerContentScrollView>
  );
};

const defaultDrawerOptions = {
  drawerActiveBackgroundColor: "#fef3c760",
  drawerActiveTintColor: "#18181b",
  drawerLabelStyle: {
    fontFamily: "mm",
    marginLeft: -18,
    fontSize: 14,
  },
};

export const SideDrawerNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        screenOptions={defaultDrawerOptions}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <DrawerNavigator.Screen
          name="StackNav"
          component={StackNavigator}
          options={{
            drawerLabel: "Home",
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                as={<AntDesign name="home" />}
                size={5}
                ml="3"
                color={color}
              />
            ),
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
