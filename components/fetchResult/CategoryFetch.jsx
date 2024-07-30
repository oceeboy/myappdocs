import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryFetch = ({ categories }) => {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Books: {item.books.join(", ")}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryFetch;

const styles = StyleSheet.create({});
