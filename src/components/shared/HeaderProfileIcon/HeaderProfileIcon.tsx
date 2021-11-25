import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Pressable } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { UserContext } from "@/root/src/context";

export const HeaderProfileIcon: React.FC = () => {
  const navigation = useNavigation();

  const {
    user: { profileImageUrl },
  } = React.useContext(UserContext);

  return (
    <Box ml="3">
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Box
          width="8"
          height="8"
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
      </Pressable>
    </Box>
  );
};
