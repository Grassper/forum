import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import React from "react";

export const MessageIcon: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Icon
      as={<FontAwesome name="send-o" size={24} color="black" />}
      size={"20px"}
      mr="4"
      color="coolGray.600"
      onPress={() => navigation.navigate("Application", { screen: "ChatList" })}
    />
  );
};
