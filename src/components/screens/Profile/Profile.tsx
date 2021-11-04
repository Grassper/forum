import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

import { About } from "./About";
import { Comments } from "./Comment";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type RouteProp_ = RouteProp<RootStackParamList, "Profile">;
type NavigationProp_ = StackNavigationProp<RootStackParamList, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = ({ navigation, route }) => {
  const userId = route.params?.userId;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userId && userId !== "1" ? ( // checking our user id with incoming user id
          <Icon
            as={<Ionicons name="ellipsis-vertical" />}
            size={5}
            mr="2"
            color="black"
          />
        ) : (
          <Button
            size="md"
            _text={{ fontWeight: "600", color: "eGreen.400" }}
            variant="unstyled"
            onPress={() => navigation.navigate("EditProfile")}
          >
            Edit
          </Button>
        ),
    });
  }, [navigation, userId]);

  return (
    <View style={styles.container}>
      <ProfileCard userId={userId} />
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "mr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white, elevation: 0 },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            width: windowWidth / 6,
            left: windowWidth / 12,
            height: 2,
          },
        }}
      >
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Comments" component={Comments} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
