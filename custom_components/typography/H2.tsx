import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import FONTSIZES from "../../config/FONTSIZES";
import COLORS from "../../config/COLORS";

interface H2Props {
  style?: TextStyle;
  children?: React.ReactNode;
}

const H2: React.FC<H2Props> = ({ style, children }) => {
  return <Text style={[styles.bodyText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  bodyText: {
    fontSize: FONTSIZES.XL,
    fontFamily: "Bitter-ExtraBold",
    color: COLORS.DARKBG,
  },
});

export default H2;
