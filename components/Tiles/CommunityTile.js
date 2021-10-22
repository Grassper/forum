import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CommunityTile = ({image}) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
       
        {image ? (
          <Image
            style={{ width: 50, height: 50, flex: 0.1,borderRadius:25 }}
            source={{
              uri: image,
            }}
          />
        ) : null}
        <View style={styles.textContainer}><Text>main title</Text><Text>subTitle</Text></View>
   
      <Text></Text>
    </View></View>
  );
};

export default CommunityTile;

const styles = StyleSheet.create({
     textContainer:{}
});
