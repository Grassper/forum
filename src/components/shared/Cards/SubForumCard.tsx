import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { UserContext } from "@/root/src/context";
import { useToggle } from "@/root/src/hooks";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

interface Props_ {
  id?: string;
  name?: string;
  description?: string;
  profileImageS3Key?: string;
  coverImageS3Key?: string;
  _version?: number;
  creatorId?: string;
}

const windowWidth = Dimensions.get("window").width;

export const SubForumCard: React.FC<Props_> = ({
  id,
  name,
  description,
  profileImageS3Key,
  coverImageS3Key,
  creatorId,
  _version,
}) => {
  const [status, setStatus] = useToggle(true);

  const [signedProfile, setSignedProfile] = React.useState("");
  const [signedCover, setSignedCover] = React.useState("");

  const currentUser = React.useContext(UserContext).user;
  const navigation = useNavigation();

  const signImage = React.useCallback(async () => {
    if (profileImageS3Key) {
      const signedImage = await SignS3ImageKey(profileImageS3Key);
      if (signedImage) {
        setSignedProfile(signedImage);
      }
    }
    if (coverImageS3Key) {
      const signedImage = await SignS3ImageKey(coverImageS3Key);
      if (signedImage) {
        setSignedCover(signedImage);
      }
    }
  }, [profileImageS3Key, coverImageS3Key]);

  React.useEffect(() => {
    signImage();
  }, [signImage]);

  return (
    <Box>
      <Box position="relative" height="115px">
        {signedCover ? (
          <Image
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: signedCover,
            }}
          />
        ) : (
          <Skeleton width="100%" alignItems="center" height="100%" />
        )}
      </Box>
      <Box alignItems="flex-start" justifyContent="center" bg="white">
        <Box position="relative">
          {signedProfile ? (
            <Avatar
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              source={{
                uri: signedProfile,
              }}
            />
          ) : (
            <Skeleton
              bg="coolGray.200"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
            />
          )}
        </Box>
      </Box>
      <HStack bg="white" justifyContent="center" pb="4">
        <Box width="90%">
          <HStack
            mb="2"
            alignItems="flex-end"
            justifyContent="space-between"
            mt="0"
          >
            <HStack alignItems="center" space="2.5">
              <Box>
                {name ? (
                  <Text fontSize="md" fontWeight="500">
                    e/{name}
                  </Text>
                ) : (
                  <Skeleton height="20px" width="150px" mt="2" />
                )}
              </Box>
              {id && creatorId && creatorId === currentUser.id && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("SubForumStack", {
                      screen: "EditAndCreateSubForum",
                      params: {
                        title: "Edit Subforum",
                        action: "Edit",
                        subForumId: id,
                        name,
                        description,
                        profileImageS3Key,
                        bannerImageS3Key: coverImageS3Key,
                        _version,
                      },
                    });
                  }}
                >
                  <Icon
                    as={<Foundation name="pencil" />}
                    size={18}
                    color="eGreen.400"
                  />
                </Pressable>
              )}
            </HStack>

            {id && creatorId && creatorId !== currentUser.id && (
              <Button
                onPress={() => setStatus()}
                bg={status ? "tertiary.500" : "danger.500"}
                variant="unstyled"
                minWidth="24"
                borderRadius="50"
              >
                {status ? "Join" : "Exit"}
              </Button>
            )}
          </HStack>
          <HStack alignItems="center" mb="2">
            <Text fontSize="sm" color="blueGray.500">
              7,629 Members
            </Text>
            <Box bg="blueGray.500" style={styles.separatorDot} />
            <Text fontSize="sm" color="blueGray.500">
              273 Posts
            </Text>
          </HStack>
          <Box>
            {description ? (
              <Text fontSize="sm">{description}</Text>
            ) : (
              <>
                <Skeleton height="20px" width="100%" mb="2" />
                <Skeleton height="20px" width="80%" mb="2" />
                <Skeleton height="20px" width="85%" />
              </>
            )}
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});
