import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ text, type, onPress, image }) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.buttonSquare} onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {image ? (
            <Image
              style={{ width: 30, height: 30, flex: 0.1 }}
              source={{
                uri: image,
              }}
            />
          ) : null}
          {text ? (
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={[
                  styles.buttonText,
                  { color: type.includes("d") ? "white" : "#0cbf76" },
                ]}
              >
                {text}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
  },
  solidButton: {
    width: "92%",
    height: 45,
    maxWidth: 800,
    backgroundColor: "#0cbf76",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0cbf76",
  },
  outlinedButton: {
    width: "92%",
    height: 45,
    maxWidth: 800,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0cbf76",
  },
  buttonSquare: {
    width: "25%",
    height: 45,
    maxWidth: 200,
    backgroundColor: "#0cbf76",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
    // paddingLeft: 20,
    // paddingRight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0cbf76",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});
