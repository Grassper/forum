import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, IIconProps } from "native-base";
import React from "react";

interface Props_ {
  color?: IIconProps["color"];
}

export const BackButton: React.FC<Props_> = ({ color }) => {
  const navigation = useNavigation();
  return (
    <Icon
      as={<Ionicons name="arrow-back" />}
      color={color ?? "white"}
      ml="2"
      onPress={() => navigation.goBack()}
      size={"25px"}
    />
  );
};
