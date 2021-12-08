import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
  Flex,
  Icon,
  MoonIcon,
  Pressable,
  SunIcon,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { DrawerParamList_ } from "@/root/src/components/navigations/Navigation";
import {
  ProfileStackNavigator,
  StackNavigator,
  SubForumStackNavigator,
} from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

const DrawerNavigator = createDrawerNavigator<DrawerParamList_>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [lightMode, setLightMode] = useState(true);

  const {
    user: { profileImageUrl, username },
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
              Sign Out
            </Text>
          )}
          onPress={() => {
            Auth.signOut();
          }}
          icon={({ color }) => (
            <Icon
              as={<FontAwesome name="sign-out" size={24} color="black" />}
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
              as={<MaterialIcons name="policy" size={24} color="black" />}
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
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

export const SideDrawerNavigator = () => {
  return (
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
      <DrawerNavigator.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon as={<Feather name="user" />} size={5} ml="3" color={color} />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="SubForumStack"
        component={SubForumStackNavigator}
        options={() => ({
          drawerLabel: "Joined Forums",
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
          drawerIcon: ({ color }) => (
            <Icon
              as={<AntDesign name="pluscircleo" />}
              size={"18px"}
              ml="3"
              color={color}
            />
          ),
        })}
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
