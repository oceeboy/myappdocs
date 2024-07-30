import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ otherStyles, title, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, otherStyles]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
});
