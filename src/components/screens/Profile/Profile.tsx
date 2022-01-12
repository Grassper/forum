import { Ionicons } from "@expo/vector-icons";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import { Icon, Menu, Pressable } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { ReportUser } from "@/root/src/components/shared/Report";
import { colors } from "@/root/src/constants";
import { AuthContext, UserContext } from "@/root/src/context";

import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Profile">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const Profile: React.FC<Props_> = ({ navigation, route }) => {
  const routeUserId = route.params.userId;
  const [reportModal, setReportModal] = React.useState(false);

  const {
    user: { id },
  } = React.useContext(UserContext); // this context provided current login user
  const { setAuthState } = React.useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color="eGreen.400" />,
      headerRight: () => (
        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Icon
                  as={<Ionicons name="ellipsis-vertical" />}
                  color="black"
                  mr="2"
                  size={5}
                />
              </Pressable>
            );
          }}
          width="125px"
        >
          {routeUserId && routeUserId !== id ? ( // checking our user id with incoming user id
            <Menu.Item onPress={() => setReportModal(true)}>Report</Menu.Item>
          ) : (
            <>
              <Menu.Item onPress={() => navigation.navigate("EditProfile")}>
                Edit Profile
              </Menu.Item>
              <Menu.Item onPress={() => navigation.navigate("Info")}>
                Info
              </Menu.Item>
              <Menu.Item
                onPress={async () => {
                  await Auth.signOut();
                  setAuthState("LOGGEDOUT");
                }}
              >
                Sign out
              </Menu.Item>
            </>
          )}
        </Menu>
      ),
    });
  }, [id, navigation, routeUserId, setAuthState]);

  const GetPosts = React.useCallback(
    () => <Posts routeUserId={routeUserId} />,
    [routeUserId]
  );
  const GetHeader = React.useCallback(
    () => <ProfileCard routeUserId={routeUserId} />,
    [routeUserId]
  );
  return (
    <View style={styles.container}>
      {routeUserId && routeUserId !== id && (
        <ReportUser
          reportModal={reportModal}
          setReportModal={setReportModal}
          userId={routeUserId}
        />
      )}

      <FlatList
        data={[]}
        ListFooterComponent={GetPosts}
        ListHeaderComponent={GetHeader}
        renderItem={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
