import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import React from "react";

const FormField = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multiline,
  editable,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.textInput, otherStyles]}
        multiline={multiline}
        textAlignVertical="top"
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        editable={editable}
      />
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 1,

    padding: 10,
    backgroundColor: "#fff",
  },
  textInput: {
    width: "100%",
    height: "100%",
    textAlignVertical: "top", // Aligns text to the top of the TextInput
  },
});
