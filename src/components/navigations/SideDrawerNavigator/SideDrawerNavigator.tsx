import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Auth } from "aws-amplify";
import {
  Box,
  HStack,
  Icon,
  MoonIcon,
  Pressable,
  SunIcon,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { Home } from "@/root/src/components/screens/Home";
import { AuthContext, UserContext } from "@/root/src/context";

const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [lightMode, setLightMode] = useState(true);
  const { setAuthState } = React.useContext(AuthContext);

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
          <SvgUri uri={profileImageUrl} width="100%" height="100%" />
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
          <HStack alignSelf="center" alignItems="center">
            {lightMode ? (
              <SunIcon size="4" mr="2" mt="1" />
            ) : (
              <MoonIcon size="4" mr="2" mt="1" />
            )}
            <Text fontSize="xs" fontFamily="body" color="black" mt="1">
              {lightMode ? "Light" : "Dark"}
            </Text>
          </HStack>
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
              Profile
            </Text>
          )}
          onPress={() =>
            props.navigation.navigate("Application", {
              screen: "Profile",
              params: {
                userId: id,
              },
            })
          }
          icon={({ color }) => (
            <Icon
              as={<AntDesign name="profile" size={24} color="black" />}
              size={"20px"}
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
              Privacy Policy
            </Text>
          )}
          onPress={() =>
            Linking.openURL("https://www.eforum.io/policies/privacy-policy")
          }
          icon={({ color }) => (
            <Icon
              as={<AntDesign name="Safety" size={24} color="black" />}
              size={"20px"}
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
              Terms of use
            </Text>
          )}
          onPress={() =>
            Linking.openURL("https://www.eforum.io/policies/terms-of-use")
          }
          icon={({ color }) => (
            <Icon
              as={
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="black"
                />
              }
              size={"20px"}
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
              Sign Out
            </Text>
          )}
          onPress={async () => {
            await Auth.signOut();
            setAuthState("LOGGEDOUT");
          }}
          icon={({ color }) => (
            <Icon
              as={<AntDesign name="logout" size={24} color="black" />}
              size={"20px"}
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
    fontFamily: "lm",
    marginLeft: -18,
    fontSize: 14,
  },
  headerTitleStyle: {
    fontFamily: "lm",
  },
};

export const SideDrawerNavigator = () => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={defaultDrawerOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNavigator.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Home",
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
