import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar, HStack, Pressable, Text } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { colors } from "@/root/src/constants";

interface Props_ {}

interface FollowCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

const Data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    username: "Aafreen Khan",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    username: "Sujitha Mathur",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    username: "Anci Barroco",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    username: "Aniket Kumar",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    username: "Kiara",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];

const FollowCard: React.FC<FollowCard_> = ({ username, avatarUrl }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Profile");
      }}
    >
      <HStack alignItems="center" justifyContent="space-between" my="2">
        <HStack space={3} alignItems="center">
          <Avatar
            bg="green.500"
            size="md"
            source={{
              uri: avatarUrl,
            }}
          >
            <Text
              fontSize="md"
              fontFamily="body"
              fontWeight="600"
              color="white"
            >
              {username.charAt(0).toUpperCase() || "Ef"}
            </Text>
          </Avatar>
          <Text
            fontSize="sm"
            fontFamily="body"
            fontWeight="500"
            color="muted.900"
          >
            {username}
          </Text>
        </HStack>
        <Entypo name="chevron-small-right" size={24} color="black" />
      </HStack>
    </Pressable>
  );
};

const FollowCardRenderer: ListRenderItem<FollowCard_> = ({ item }) => {
  return (
    <FollowCard
      id={item.id}
      username={item.username}
      avatarUrl={item.avatarUrl}
    />
  );
};

export const Follow: React.FC<Props_> = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FlatList
          data={Data}
          renderItem={FollowCardRenderer}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
