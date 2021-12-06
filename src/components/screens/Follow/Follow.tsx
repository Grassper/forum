import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";

import {
  DrawerParamList_,
  ProfileStackParamList_,
} from "@/root/src/components/navigations/Navigation";

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

export const Follow: React.FC<Props_> = () => {
  return <Box bg="white" flex="1" alignItems="center" />;
};
