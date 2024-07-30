import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const BookFetch = ({ books, handleDeleteBook }) => {
  return (
    <View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Title: {item.title}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Published Year: {item.publishedYear}</Text>
            <Text>Categories: {item.categories.join(", ")}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteBook(item.$id, item.categories[0])}
            />
          </View>
        )}
      />
    </View>
  );
};

export default BookFetch;

const styles = StyleSheet.create({});
