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
                  color="white"
                  fontFamily="body"
                  fontSize="sm"
                  fontWeight="600"
                >
                  "Ef"
                </Text>
              </Avatar>
            ) : (
              <Skeleton borderRadius="full" height="40px" width="40px" />
            )}
            <VStack>
              {name ? (
                <Text
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
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
                      _dark={{ color: "warmGray.200" }}
                      color="coolGray.600"
                      fontSize="xs"
                    >
                      {members} Members
                    </Text>
                  ) : (
                    <Skeleton height="20px" mt="2" width="150px" />
                  )}
                </>
              )}
            </VStack>
            <Spacer />
            {!hideNavArrow && name && (
              <HStack space="4">
                <Icon
                  as={<Entypo name="chevron-small-right" />}
                  color="black"
                  size={"20px"}
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
