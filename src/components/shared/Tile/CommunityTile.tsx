import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";

import { SignS3ImageKey } from "@/root/src/utils/helpers";

export interface Props_ {
  onPress: () => void;
  profileImageS3Key: string;
  name: string;
  hideDivider?: boolean;
  hideMembers?: boolean;
  hideFavorites?: boolean;
}

export const CommunityTile: React.FC<Props_> = ({
  hideDivider,
  hideMembers,
  hideFavorites,
  onPress,
  name,
  profileImageS3Key,
}) => {
  const [signedProfileImage, setSignedProfileImage] = React.useState("");

  React.useEffect(() => {
    (async () => {
      if (profileImageS3Key) {
        const signedImage = await SignS3ImageKey(profileImageS3Key);
        if (signedImage) {
          setSignedProfileImage(signedImage);
        }
      }
    })();
  }, [profileImageS3Key]);

  return (
    <Pressable onPress={onPress}>
      <Box alignItems="center" bg="white" py="4">
        <Box width="90%">
          <HStack alignItems="center" space={3}>
            {signedProfileImage ? (
              <Avatar
                bg="green.500"
                size="40px"
                source={{
                  uri: signedProfileImage,
                }}
              >
                <Text
                  fontSize="sm"
                  fontFamily="body"
                  fontWeight="600"
                  color="white"
                >
                  {name.charAt(0).toUpperCase() || "Ef"}
                </Text>
              </Avatar>
            ) : (
              <Box
                bg="coolGray.200"
                width="40px"
                height="40px"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
              >
                <Icon
                  as={<Ionicons name="ios-image" />}
                  size={3}
                  color="muted.700"
                />
              </Box>
            )}
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                fontWeight="500"
              >
                e/{name}
              </Text>
              {!hideMembers && (
                <Text
                  color="coolGray.600"
                  _dark={{ color: "warmGray.200" }}
                  fontSize="xs"
                >
                  1.6M Members
                </Text>
              )}
            </VStack>
            <Spacer />
            {!hideFavorites && (
              <HStack space="4">
                <Icon
                  as={<Entypo name="chevron-small-right" />}
                  size={"20px"}
                  color="black"
                />
              </HStack>
            )}
          </HStack>
        </Box>
      </Box>
      {!hideDivider && <Divider />}
    </Pressable>
  );
};
