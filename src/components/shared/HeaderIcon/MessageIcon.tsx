import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import React from "react";

export const MessageIcon: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Icon
      as={<Feather name="message-square" />}
      color="coolGray.600"
      mr="4"
      onPress={() => navigation.navigate("Application", { screen: "ChatList" })}
      size={"22px"}
    />
  );
};
