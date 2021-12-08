import { Entypo } from "@expo/vector-icons";
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

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

export interface Props_ {
  onPress?: () => void;
  profileImageS3Key?: string;
  name?: string;
  members?: number;
  hideDivider?: boolean;
  hideMembers?: boolean;
  hideNavArrow?: boolean;
}

export const CommunityTile: React.FC<Props_> = ({
  hideDivider,
  hideMembers,
  hideNavArrow,
  onPress,
  members,
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
                  "Ef"
                </Text>
              </Avatar>
            ) : (
              <Skeleton width="40px" height="40px" borderRadius="full" />
            )}
            <VStack>
              {name ? (
                <Text
                  color="coolGray.800"
                  _dark={{ color: "warmGray.50" }}
                  fontWeight="500"
                >
                  {name}
                </Text>
              ) : (
                <Skeleton height="20px" width="250px" />
              )}
              {!hideMembers && (
                <>
                  {members ? (
                    <Text
                      color="coolGray.600"
                      _dark={{ color: "warmGray.200" }}
                      fontSize="xs"
                    >
                      {members} Members
                    </Text>
                  ) : (
                    <Skeleton height="20px" width="150px" mt="2" />
                  )}
                </>
              )}
            </VStack>
            <Spacer />
            {!hideNavArrow && name && (
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
