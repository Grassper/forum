import { Entypo, Feather } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, Icon, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { Follow } from "@/root/src/components/screens/Follow";
import { Profile } from "@/root/src/components/screens/Profile";
import { Saved } from "@/root/src/components/screens/Saved";

const DrawerNavigator = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const DrawerNavigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Box alignItems="center" justifyContent="center">
        <Avatar
          bg="green.500"
          size="lg"
          source={{
            uri: "https://randomuser.me/api/portraits/women/49.jpg",
          }}
        >
          <Text fontSize="md" fontFamily="body" fontWeight="600" color="white">
            Dk
          </Text>
        </Avatar>
        <Text
          fontSize="xl"
          fontFamily="heading"
          color="black"
          lineHeight="lg"
          mt="1"
        >
          Diana Kiev
        </Text>
        <Text fontSize="xs" fontFamily="body" color="black" mt="1">
          Light
        </Text>
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
            DrawerNavigation.navigate("Profile", { userId: undefined })
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
            DrawerNavigation.navigate("Follow", { title: "Blocked Accounts" })
          }
          icon={() => (
            <Icon as={<Entypo name="block" />} size={5} ml="3" color="black" />
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
              Saved
            </Text>
          )}
          onPress={() => DrawerNavigation.navigate("Saved")}
          icon={() => (
            <Icon
              as={<Feather name="bookmark" />}
              size={5}
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
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Profile"
    >
      <DrawerNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "",
        }}
      />
      <DrawerNavigator.Screen name="Blocked Accounts" component={Follow} />
      <DrawerNavigator.Screen name="Saved" component={Saved} />
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
