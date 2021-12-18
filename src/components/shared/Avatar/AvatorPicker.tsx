import * as Crypto from "expo-crypto";
import { Box, Pressable } from "native-base";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { SvgUri } from "react-native-svg";

interface AvatorItem {
  id: string;
  collectionName: string;
}

const AvatorCollection: AvatorItem[] = [
  {
    id: "1",
    collectionName: "adventurer",
  },
  {
    id: "2",
    collectionName: "big-ears",
  },
  {
    id: "3",
    collectionName: "avataaars",
  },
  {
    id: "4",
    collectionName: "big-smile",
  },
  {
    id: "5",
    collectionName: "micah",
  },
  {
    id: "6",
    collectionName: "miniavs",
  },
  {
    id: "7",
    collectionName: "open-peeps",
  },
  {
    id: "8",
    collectionName: "personas",
  },
];

interface Props_ {
  about: string;
  setProfileUrl: (value: string) => void;
}

export const AvatorPicker: React.FC<Props_> = ({ about, setProfileUrl }) => {
  // set debouncedValue

  const [aboutHash, setAboutHash] = React.useState(
    "a937e654c37e0fe28b7a214ea4226c886da6e563da81fd5e77fd73b65d020c2c"
  );

  React.useEffect(() => {
    let isActive = true;
    const calculateHash = async () => {
      if (about) {
        try {
          const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            about
          );

          if (isActive) {
            setAboutHash(digest);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    calculateHash();
    return () => {
      isActive = false;
    };
  }, [about]);

  const RenderItem: ListRenderItem<AvatorItem> = ({ item }) => {
    const diceBearUrl = `https://avatars.dicebear.com/api/${item.collectionName}/${aboutHash}.svg`;
    return (
      <Pressable mx="4" my="2" onPress={() => setProfileUrl(diceBearUrl)}>
        <Box
          height="80px"
          width="80px"
          borderRadius="full"
          bgColor="amber.50"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
        >
          <SvgUri
            uri={diceBearUrl}
            width="100%"
            height="100%"
            shouldRasterizeIOS
          />
        </Box>
      </Pressable>
    );
  };

  return (
    <Box height="100px" overflow="hidden" mt="4">
      <FlatList
        updateCellsBatchingPeriod={100}
        showsHorizontalScrollIndicator={false}
        data={AvatorCollection}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        horizontal
        initialNumToRender={3}
        maxToRenderPerBatch={3}
      />
    </Box>
  );
};
