import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({ user }) => {
  return (
    <View style={styles.headerContaner}>
      <Text style={styles.title}>
        Welcome, <Text style={styles.username}>{user.name}</Text>
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContaner: {
    width: "100%",
    marginLeft: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 15,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  },
  username: {
    fontSize: 18,
    fontStyle: "normal",
    fontFamily: "Poppins-Bold",
  },
});
