import { useNavigation } from "@react-navigation/native";
import { Box, Pressable } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { UserContext } from "@/root/src/context";

export const ProfileIcon: React.FC = () => {
  const {
    user: { profileImageUrl, id },
  } = React.useContext(UserContext);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Application", {
          screen: "Profile",
          params: { userId: id },
        })
      }
    >
      <Box
        bg="amber.100"
        borderRadius="full"
        height="8"
        ml="4"
        overflow="hidden"
        width="8"
      >
        <SvgUri
          height="100%"
          uri={
            profileImageUrl ||
            "https://avatars.dicebear.com/api/micah/default.svg"
          }
          width="100%"
        />
      </Box>
    </Pressable>
  );
};
