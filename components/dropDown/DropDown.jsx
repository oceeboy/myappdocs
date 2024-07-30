import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Dropdown = ({ options, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>
          {selectedOption ? selectedOption.label : "Select a Category"}
        </Text>
        <Icon
          name={showDropdown ? "arrow-drop-up" : "arrow-drop-down"}
          size={24}
        />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  dropdownHeaderText: {
    fontWeight: "bold",
  },
  dropdownContent: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default Dropdown;
