import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

interface Props_ {}

export const Posts: React.FC<Props_> = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
        <View style={styles.postCard}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.utils}>
            <View style={styles.postMeta}>
              <Text style={styles.metaText}>Posted in #OneYearClub</Text>
              <View style={styles.separatorDot} />
              <Text style={styles.metaText}>Nov 30</Text>
            </View>
            <Ionicons
              style={styles.ellipsis}
              name="ellipsis-horizontal"
              size={20}
              color={colors.gray}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  ellipsis: {
    marginRight: 5,
  },
  metaText: {
    color: colors.green,
    fontFamily: "mr",
    fontSize: 14,
    lineHeight: 21,
  },
  post: {
    color: colors.black,
    fontFamily: "mr",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 5,
  },
  postCard: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 7.5,
    paddingBottom: 7.5,
  },
  postMeta: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  separatorDot: {
    backgroundColor: colors.green,
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
  utils: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
