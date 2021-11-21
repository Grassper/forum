import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { useToggle } from "@/root/src/hooks";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {
  userId?: string;
}

export const ProfileCard: React.FC<Props_> = ({ userId }) => {
  const navigation = useNavigation<NavigationProp_>();
  const [value, toggleValue] = useToggle(true);
  return (
    <Box alignItems="center" mt="5">
      <Box
        width="80px"
        height="80px"
        bg="amber.100"
        borderRadius="full"
        overflow="hidden"
        mb="10px"
      >
        <SvgUri
          uri="https://avatars.dicebear.com/api/micah/jessy.svg?mouth=smile"
          width="100%"
          height="100%"
        />
      </Box>

      <Text fontFamily="heading" fontSize="22px" mb="5px">
        Diana Kiev
      </Text>
      <Text fontSize="12px" mb="15px">
        Joined Oct 2021
      </Text>
      {userId &&
        userId !== "1" && ( // checking our user id with incoming user id to show follow button
          <Button
            onPress={() => toggleValue()}
            bg={value ? "tertiary.500" : "danger.500"}
            variant="unstyled"
            mb="5"
            minWidth="24"
            borderRadius="50"
          >
            {value ? "Follow" : "Unfollow"}
          </Button>
        )}
      <HStack alignItems="center" justifyContent="center" mb="15px">
        <StatsCard
          onPress={() => {
            navigation.navigate("Follow", { title: "Followers" });
          }}
          count="862"
          countName="Followers"
        />
        <StatsCard
          onPress={() => {
            navigation.navigate("Follow", { title: "Following" });
          }}
          count="862"
          countName="Followers"
        />
        <StatsCard count="52" countName="Posts" />
      </HStack>
    </Box>
  );
};

interface StatsCard_ {
  onPress?: () => void;
  count: string;
  countName: string;
}

const StatsCard: React.FC<StatsCard_> = ({ onPress, count, countName }) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        alignItems="center"
        justifyContent="center"
        minWidth="80px"
        mx="10px"
      >
        <Text fontSize="16px" fontWeight="600" lineHeight="24px" mb="5px">
          {count}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="500"
          lineHeight="21px"
          color="eGreen.400"
        >
          {countName}
        </Text>
      </VStack>
    </Pressable>
  );
};
