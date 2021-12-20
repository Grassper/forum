import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import React from "react";

export const MessageIcon: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Icon
      as={<FontAwesome color="black" name="send-o" size={24} />}
      color="coolGray.600"
      mr="4"
      onPress={() => navigation.navigate("Application", { screen: "ChatList" })}
      size={"20px"}
    />
  );
};
